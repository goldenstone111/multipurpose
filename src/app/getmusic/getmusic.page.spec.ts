import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetmusicPage } from './getmusic.page';

describe('GetmusicPage', () => {
  let component: GetmusicPage;
  let fixture: ComponentFixture<GetmusicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetmusicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetmusicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
