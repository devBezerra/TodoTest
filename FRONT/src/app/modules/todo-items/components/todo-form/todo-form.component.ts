import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidateRequired } from '../../../../shared/validators/required.validator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TodoItemsService } from '../../todo-items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoItemInterface } from '../../interfaces/todo-item.interface';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    CardModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent implements OnInit {
  id: number | null = null;
  todoItem?: TodoItemInterface;

  constructor(
    private readonly service: TodoItemsService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      if (this.id) {
        this.service.findById(this.id).subscribe((res) => {
          this.todoItem = res;
          this.form.patchValue(this.todoItem!);
        });
      }
    });
  }

  public form: FormGroup = new FormGroup({
    title: new FormControl('', [ValidateRequired]),
    description: new FormControl('', [ValidateRequired]),
    isCompleted: new FormControl(false),
  });

  back() {
    this.router.navigate(['/inicio']);
  }

  onSubmit() {
    if (this.id) {
      this.service
        .update({ ...this.form.value, id: this.id }, this.id)
        .subscribe(() => {
          this.back();
        });
    } else {
      this.service.create(this.form.value).subscribe(() => {
        this.back();
      });
    }
  }
}
