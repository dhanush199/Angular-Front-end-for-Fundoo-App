import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorDialogBoxComponent } from './collaborator-dialog-box.component';

describe('CollaboratorDialogBoxComponent', () => {
  let component: CollaboratorDialogBoxComponent;
  let fixture: ComponentFixture<CollaboratorDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
