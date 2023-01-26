import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GithubService } from 'src/app/shared/github.service';
import { InputFieldComponent } from 'src/app/shared/input-field/input-field.component';
import { SearchResults, User, UserError } from './types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  loading: boolean = false;
  hasSearched: boolean = false;
  searchResults: SearchResults | null = null;

  @ViewChild('usernameInput') usernameInput!: InputFieldComponent;

  constructor(private github: GithubService) {}

  ngAfterViewInit(): void {
    this.usernameInput.focus();
  }

  usernameSearchForm = new FormGroup({
    username: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.pattern(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i),
    ]),
  });

  get usernameInvalid(): boolean {
    return (
      this.usernameSearchForm.controls.username.dirty &&
      this.usernameSearchForm.controls.username.invalid
    );
  }

  get hasNoResult(): boolean {
    return (
      this.hasSearched && (!this.searchResults || !this.searchResults.user)
    );
  }

  get getStateMessage(): string {
    if (this.loading) {
      return 'Loading...';
    } else if (this.hasNoResult) {
      return 'No results found.';
    } else {
      return 'Search for an username to see their details here.';
    }
  }

  get getUserAvatar(): string {
    return (this.searchResults?.user as User)?.avatar_url || '';
  }

  get getUserFullName(): string {
    return (this.searchResults?.user as User)?.name || '';
  }

  get getUserUsername(): string {
    return (this.searchResults?.user as User)?.login || '';
  }

  focusUsernameInput(event: Event): void {
    event.preventDefault();
    this.usernameInput.focus();
  }

  searchUser(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.usernameSearchForm.controls.username?.disable();
    this.github
      .getUser(this.usernameSearchForm.controls.username.value ?? '')
      .subscribe({
        next: (user) => {
          this.loading = false;
          this.hasSearched = true;
          this.searchResults = {
            searchString: this.usernameSearchForm.controls.username.value ?? '',
            user: user,
            date: new Date().toString(),
          };
        },
        error: (error: HttpErrorResponse) => {
          console.error('There was an error while searching for user', error);
          this.loading = false;
          this.hasSearched = true;
          this.searchResults = {
            searchString: this.usernameSearchForm.controls.username.value ?? '',
            user: null,
            date: new Date().toString(),
          };
        },
      })
      .add(() => {
        this.loading = false;
        this.usernameSearchForm.controls.username?.enable();
        this.hasSearched = true;
        if (this.searchResults) {
          this.github.addToSearchHistory(this.searchResults);
        }
      });
  }
}
