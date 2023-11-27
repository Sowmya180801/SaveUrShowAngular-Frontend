import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowfeedComponent } from './showfeed.component';

describe('ShowfeedComponent', () => {
  let component: ShowfeedComponent;
  let fixture: ComponentFixture<ShowfeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowfeedComponent]
    });
    fixture = TestBed.createComponent(ShowfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
