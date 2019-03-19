import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelDialogBoxComponent } from './label-dialog-box.component';

describe('LabelDialogBoxComponent', () => {
  let component: LabelDialogBoxComponent;
  let fixture: ComponentFixture<LabelDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
