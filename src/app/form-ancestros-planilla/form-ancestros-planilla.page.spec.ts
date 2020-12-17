import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormAncestrosPlanillaPage } from './form-ancestros-planilla.page';

describe('FormAncestrosPlanillaPage', () => {
  let component: FormAncestrosPlanillaPage;
  let fixture: ComponentFixture<FormAncestrosPlanillaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAncestrosPlanillaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormAncestrosPlanillaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
