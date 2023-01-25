import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
})
export class InputFieldComponent {
  @Input()
  label: string = '';
  @Input()
  type: string = 'text';
  @Input()
  id: string = '';
  @Input()
  placeholder: string = '';
  @Input()
  value: string = '';
  @Input()
  name: string = '';
  @Input()
  required: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  control!: FormControl;
  @Input()
  error: string | null = null;

  @Output() valueChange = new EventEmitter<string>();
}
