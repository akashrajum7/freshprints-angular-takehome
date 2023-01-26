import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResults, User } from '../pages/home/types';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getUser(username: string) {
    return this.http.get<User>(`https://api.github.com/users/${username}`);
  }

  getSearchHistory(): SearchResults[] {
    const searchHistory = localStorage.getItem('searchHistory');
    return searchHistory ? JSON.parse(searchHistory) : [];
  }

  addToSearchHistory(searchResults: SearchResults) {
    const searchHistory = this.getSearchHistory();
    searchHistory.unshift(searchResults);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }

  clearSearchHistory() {
    localStorage.removeItem('searchHistory');
  }
}
