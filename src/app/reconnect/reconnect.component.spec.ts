import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconnectComponent } from './reconnect.component';

describe('ReconnectComponent', () => {
  let component: ReconnectComponent;
  let fixture: ComponentFixture<ReconnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReconnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
