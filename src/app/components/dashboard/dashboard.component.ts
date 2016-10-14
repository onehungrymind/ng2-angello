import { Component, OnInit } from '@angular/core';
import { StoriesService, STORY_TYPES, STORY_STATUSES } from '../../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  types = STORY_TYPES;
  statuses = STORY_STATUSES;
  stories: {}[] = [];

  constructor(private storiesService: StoriesService) { }

  ngOnInit() {
    this.storiesService.all()
      .then(stories => {
        this.stories = stories;
      });
  }

}
