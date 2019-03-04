import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThrashComponent } from './thrash.component';

describe('ThrashComponent', () => {
  let component: ThrashComponent;
  let fixture: ComponentFixture<ThrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThrashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
