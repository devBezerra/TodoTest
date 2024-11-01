import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAddDialogComponent } from './todo-add-dialog.component';

describe('TodoAddDialogComponent', () => {
  let component: TodoAddDialogComponent;
  let fixture: ComponentFixture<TodoAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
