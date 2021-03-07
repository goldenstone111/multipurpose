import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Cloth2Page } from './cloth2.page';

describe('Cloth2Page', () => {
  let component: Cloth2Page;
  let fixture: ComponentFixture<Cloth2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cloth2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Cloth2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
