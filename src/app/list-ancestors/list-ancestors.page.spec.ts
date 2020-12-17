import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListAncestorsPage } from './list-ancestors.page';

describe('ListAncestorsPage', () => {
  let component: ListAncestorsPage;
  let fixture: ComponentFixture<ListAncestorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAncestorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListAncestorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
