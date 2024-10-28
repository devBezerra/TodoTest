import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ValidateRequired } from '../../../../shared/validators/required.validator';
import { TodoItemsService } from '../../todo-items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-add-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-add-dialog.component.html',
  styleUrl: './todo-add-dialog.component.scss',
})
export class TodoAddDialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(
    private readonly service: TodoItemsService,
    public router: Router
  ) {}

  public form: FormGroup = new FormGroup({
    title: new FormControl('', [ValidateRequired]),
    description: new FormControl('', [ValidateRequired]),
  });

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSubmit() {
    this.service.create(this.form.value).subscribe(() => {
        this.closeDialog();
    });
  }
}
