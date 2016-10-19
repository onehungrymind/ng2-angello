import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsersService, StoriesService, STORY_TYPES, STORY_STATUSES } from '../../shared';
import { FormGroup } from '@angular/forms';
import {
  listAreaAnimation,
  detailAreaAnimation,
  detailContentAnimation,
  repeaterAnimation
} from './storyboard.animations.ts';

@Component({
  selector: 'app-storyboard',
  templateUrl: 'storyboard.component.html',
  styleUrls: ['storyboard.component.css'],
  animations: [listAreaAnimation, detailAreaAnimation, detailContentAnimation, repeaterAnimation]
})
export class StoryboardComponent implements OnInit {
  name: string = 'storyboard';
  animationState: string = 'detailsShown';
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
    private usersService: UsersService,
    private cd: ChangeDetectorRef
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
        this.cd.detectChanges();
        console.log('RESULT', result);
      }, (reason) => {
        console.log('REASON', reason);
      });
  }

  setCurrentStory(story) {
    this.currentStoryId = story.id;
    this.currentStory = story;
    this.editedStory = Object.assign({}, this.currentStory);
  };

  getStories() {
    this.storiesService.all()
      .then(result => {
        this.stories = (result !== 'null') ? result : [];
        this.cd.detectChanges();
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

  setAnimationState(state) {
    this.animationState = state;
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

  updateStories(story) {
    return this.stories.map((s: any) => s.id === story.id ? story : s);
  }

  insertAdjacent(target, event, insertBefore) {
    var story = event.data;

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

    this.stories = this.updateStories(story);
  };

  finalizeDrop(event) {
    this.storiesService.update(event.data.id, event.data)
      .then(result => {
        this.stories = this.updateStories(event.data);
        console.log('RESULT', result);
      }, (reason) => {
        console.log('REASON', reason);
      });
  };

  changeStatus(event, status) {
    event.data.status = status.name;

    this.stories = this.updateStories(event.data);
  };

  trackById (index: number, value: any) {
    console.log('id: ', value.id)
    return value.id;
  };

}
