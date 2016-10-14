import { Component, OnInit } from '@angular/core';
import { UsersService, StoriesService, STORY_TYPES, STORY_STATUSES } from '../../shared';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-storyboard',
  templateUrl: 'storyboard.component.html',
  styleUrls: ['storyboard.component.css']
})
export class StoryboardComponent implements OnInit {
  name: string = 'storyboard';
  detailsVisible: boolean = true;
  currentStoryId: number = null;
  currentStory: {} = null;
  editedStory: {} = this.storiesService.getBlankStory();
  stories: {}[] = [];
  users: {}[] = [];
  statuses: {}[] = STORY_STATUSES;
  types: {}[] = STORY_TYPES;
  form: FormGroup;

  constructor(
    private storiesService: StoriesService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getStories();
    this.getUsers();
  }

  setForm(form) {
    this.form = form;
  }

  keys(object) {
    return Object.keys(object);
  }

  getUsers() {
    this.usersService.all()
      .then(result => {
        this.users = (result !== null && result.length > 0) ? result : [{
          name: 'Please create a user'
        }];
        console.log('RESULT', result);
      }, (reason) => {
        console.log('REASON', reason);
      });
  }

  setCurrentStory(story) {
    this.currentStoryId = story.id;
    this.currentStory = story;
    this.editedStory = Object.assign({}, this.currentStory);
    console.log('EDITED STORY: ', this.editedStory)
  };

  getStories() {
    this.storiesService.all()
      .then(result => {
        this.stories = (result !== 'null') ? result : [];
        console.log('RESULT', result);
      }, (reason) => {
        console.log('REASON', reason);
      });
  };

  createStory() {
    this.storiesService.create(this.editedStory)
      .then(result => {
        this.getStories();
        this.resetForm();
        console.log('RESULT', result);
      }, (reason) => {
        console.log('ERROR', reason);
      });
  };

  updateStory() {
    var fields = ['title', 'description', 'criteria', 'status', 'type', 'reporter', 'assignee'];

    fields.forEach((field) => {
      this.currentStory[field] = this.editedStory[field]
    });

    this.storiesService.update(this.currentStoryId, this.editedStory)
      .then(result => {
        this.getStories();
        this.resetForm();
        console.log('RESULT', result);
      }, (reason) => {
        console.log('REASON', reason);
      });
  };

  deleteStory(id) {
    this.storiesService.destroy(id)
      .then(result => {
        this.getStories();
        this.resetForm();
        console.log('RESULT', result);
      }, reason => {
        console.log('ERROR', reason);
      });
  };

  updateCancel() {
    this.resetForm();
  };

  showMessages(field) {
    return this.form
      ? this.form.controls[field].touched && this.form.controls[field].invalid
      : false;
  };

  resetForm() {
    this.currentStory = null;
    this.editedStory = {};

    this.form.markAsPristine();
    this.form.markAsUntouched();
  };

  setDetailsVisible(visible) {
    this.detailsVisible = visible;
  };

  isEmptyStatus(status) {
    var empty = true;
    if (this.stories) {
      this.stories.forEach((story: any) => {
        if (story.status === status) empty = false;
      });
    }

    return empty;
  };

  insertAdjacent(target, story, insertBefore) {
    if (target === story) return;

    var fromIdx = this.stories.indexOf(story);
    var toIdx = this.stories.indexOf(target);

    if (!insertBefore) toIdx++;

    if (fromIdx >= 0 && toIdx >= 0) {
      this.stories.splice(fromIdx, 1);

      if (toIdx >= fromIdx) toIdx--;

      this.stories.splice(toIdx, 0, story);

      story.status = target.status;
    }
  };

  finalizeDrop(story) {
    this.storiesService.update(story.id, story)
      .then(result => {
        console.log('RESULT', result);
      }, (reason) => {
        console.log('REASON', reason);
      });
  };

  changeStatus(story, status) {
    story.status = status.name;
  };

  trackById (index: number, value: any) {
    console.log('id: ', value.id)
    return value.id;
  };

}
