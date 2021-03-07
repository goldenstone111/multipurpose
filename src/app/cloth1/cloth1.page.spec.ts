import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Cloth1Page } from './cloth1.page';

describe('Cloth1Page', () => {
  let component: Cloth1Page;
  let fixture: ComponentFixture<Cloth1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cloth1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Cloth1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
