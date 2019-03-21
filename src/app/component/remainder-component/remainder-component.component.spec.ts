import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainderComponentComponent } from './remainder-component.component';

describe('RemainderComponentComponent', () => {
  let component: RemainderComponentComponent;
  let fixture: ComponentFixture<RemainderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemainderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
