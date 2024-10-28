import { Component, OnInit } from '@angular/core';
import { TodoItemsService } from '../../todo-items.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TodoItemInterface } from '../../interfaces/todo-item.interface';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  public todoItems!: any;

  first: number = 0;

  rows: number = 10;

  currentPage: number = 1;

  total: number = 0;

  cols!: { field: string; header: string }[];

  constructor(
    private readonly service: TodoItemsService,
    public router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.service.findAllByUserId().subscribe((res) => {
      this.todoItems = res.items;
      this.total = res.totalCount;
    });

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'title', header: 'Título' },
      { field: 'description', header: 'Descrição' },
      { field: 'changeCompleted', header: 'Completar' },
      { field: 'edit', header: 'Editar' },
      { field: 'delete', header: 'Deletar' },
    ];
  }

  changeCompleted(todoItem: TodoItemInterface): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja finalizar a tarefa?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        todoItem.isCompleted = true;
        this.service.update(todoItem, todoItem.id!).subscribe(() => {
          this.service
            .findAllByUserId(this.currentPage, this.rows)
            .subscribe((res) => {
              this.todoItems = res.items;
              this.total = res.totalCount;
            });
        });
      },
      reject: () => {},
    });
  }

  toEdit(id: number): void {
    this.router.navigateByUrl(`/inicio/editar/${id}`);
  }

  handleDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir este registro?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.service.delete(id).subscribe(() => {
          this.service
            .findAllByUserId(this.currentPage, this.rows)
            .subscribe((res) => {
              this.todoItems = res.items;
              this.total = res.totalCount;
            });
        });
      },
      reject: () => {},
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.currentPage = event.page + 1;
    this.service
      .findAllByUserId(this.currentPage, this.rows)
      .subscribe((res) => {
        this.todoItems = res.items;
        this.total = res.totalCount;
      });
  }
}
