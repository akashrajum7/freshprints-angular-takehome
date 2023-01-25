import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loading: boolean = false;
  username: string = '';

  constructor() {}

  usernameSearchForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i),
    ]),
  });

  get usernameInvalid() {
    return (
      (this.usernameSearchForm.controls.username.touched ||
        this.usernameSearchForm.controls.username.dirty) &&
      this.usernameSearchForm.controls.username.invalid
    );
  }
}
