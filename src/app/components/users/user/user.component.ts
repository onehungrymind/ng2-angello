import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { UsersService, StoriesService } from '../../../shared';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})
export class UserComponent implements OnInit {
  userId: string;
  user: {};
  stories: {};

  constructor(
    private usersService: UsersService,
    private storiesService: StoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getStoriesForUser();
    });
  }

  getStoriesForUser() {
    Promise.all([this.getUser(), this.getStories()])
      .then(([user, stories]) => {
        this.user = user;
        this.stories = this.getAssignedStories(this.userId, stories);
      });
  }

  getUser() {
    return this.usersService.fetch(this.userId);
  }

  getStories() {
    return this.storiesService.all();
  }

  getAssignedStories(userId, stories) {
    return stories.filter(story => story.assignee === userId);
  };

}
