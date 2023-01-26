import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputFieldComponent } from 'src/app/shared/input-field/input-field.component';
import { SearchResults, UserError } from './types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loading: boolean = false;
  username: string = '';
  hasSearched: boolean = false;
  searchResults: SearchResults | null = null;

  @ViewChild('usernameInput') usernameInput!: InputFieldComponent;

  constructor() {}

  usernameSearchForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i),
    ]),
  });

  get usernameInvalid(): boolean {
    return (
      (this.usernameSearchForm.controls.username.touched ||
        this.usernameSearchForm.controls.username.dirty) &&
      this.usernameSearchForm.controls.username.invalid
    );
  }

  get hasNoResult(): boolean {
    return (
      this.hasSearched &&
      (!this.searchResults ||
        (this.searchResults?.user as UserError)?.message === 'Not Found')
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

  focusUsernameInput(event: Event): void {
    event.preventDefault();
    this.usernameInput.focus();
  }

  searchUser(event: Event) {
    event.preventDefault();
  }
}
