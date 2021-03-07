import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Cloth3Page } from './cloth3.page';

describe('Cloth3Page', () => {
  let component: Cloth3Page;
  let fixture: ComponentFixture<Cloth3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cloth3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Cloth3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
