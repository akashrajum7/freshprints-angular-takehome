import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { UserCardComponent } from './user-card/user-card.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavBarComponent,
    InputFieldComponent,
    PrimaryButtonComponent,
    UserCardComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    NavBarComponent,
    InputFieldComponent,
    PrimaryButtonComponent,
    UserCardComponent,
  ],
})
export class SharedModule {}
