import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Video2Page } from './video2.page';

describe('Video2Page', () => {
  let component: Video2Page;
  let fixture: ComponentFixture<Video2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Video2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Video2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
