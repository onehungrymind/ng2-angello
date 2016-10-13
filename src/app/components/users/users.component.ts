import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})
export class UsersComponent implements OnInit {

  newUser = { name: '', email: '' };
  users = [];
  userForm: any;

  constructor(private usersService: UsersService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({users: null});

    this.getUsers();
  }

  buildForm() {
    const control = this.userForm.controls['users'] = this.fb.array([]);

    this.users.forEach(user => {
      control.push(this.fb.group({
        name: [user.name],
        email: [user.email],
        id: [user.id]
      }));
    })
  }

  showMessages(field) {
    return field.touched && field.dirty && field.invalid;
  };

  resetForm(newUserForm) {
    newUserForm.markAsPristine();
    newUserForm.markAsUntouched();
  };

  getUsers() {
    this.usersService.all()
      .then(result => {
        this.users = (result !== 'null') ? result : [];
        this.buildForm();
        console.log('RESULT', result);
      }, function (reason) {
        console.log('ERROR', reason);
      });
  };

  addUser(newUserForm) {
    this.usersService.create(Object.assign({}, this.newUser))
      .then(result => {
        this.getUsers();
        this.newUser = { name: '', email: '' };
        this.resetForm(newUserForm);
        console.log('RESULT', result);
      }, function (reason) {
        console.log('ERROR', reason);
      });
  };

  updateUser(user) {
    if (user.valid) {
      this.usersService.update(user.value.id, user.value)
        .then(result => {
          console.log('RESULT', result);
        }, function (reason) {
          console.log('ERROR', reason);
        });
    }
  };

  removeUser(id) {
    this.usersService.destroy(id)
      .then(result => {
        this.getUsers();
        console.log('RESULT', result);
      }, function (reason) {
        console.log('ERROR', reason);
      });
  };
}


