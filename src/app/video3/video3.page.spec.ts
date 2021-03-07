import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Video3Page } from './video3.page';

describe('Video3Page', () => {
  let component: Video3Page;
  let fixture: ComponentFixture<Video3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Video3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Video3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
