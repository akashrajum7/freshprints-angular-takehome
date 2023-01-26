import { Component } from '@angular/core';
import { GithubService } from 'src/app/shared/github.service';
import { SearchResults } from '../home/types';
import { Statistics } from './types';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  constructor(private github: GithubService) {}

  get searchHistory(): SearchResults[] {
    return this.github.getSearchHistory();
  }

  get statistics(): Statistics {
    const avgFoundCount = this.searchHistory.reduce((acc, curr) => {
      return acc + (curr.user ? 1 : 0);
    }, 0);

    const avgNotFoundCount = this.searchHistory.reduce((acc, curr) => {
      return acc + (curr.user ? 0 : 1);
    }, 0);

    return {
      totalSearches: this.searchHistory.length,
      avgFoundPercent: (
        (avgFoundCount / this.searchHistory.length) *
        100
      ).toFixed(2),
      avgNotFoundPercent: (
        (avgNotFoundCount / this.searchHistory.length) *
        100
      ).toFixed(2),
    };
  }
}
