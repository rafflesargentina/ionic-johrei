import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormAncestroPage } from './form-ancestro.page';

describe('FormAncestroPage', () => {
  let component: FormAncestroPage;
  let fixture: ComponentFixture<FormAncestroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAncestroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormAncestroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
