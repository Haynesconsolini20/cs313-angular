import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTweetsComponent } from './sample-tweets.component';

describe('SampleTweetsComponent', () => {
  let component: SampleTweetsComponent;
  let fixture: ComponentFixture<SampleTweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleTweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
