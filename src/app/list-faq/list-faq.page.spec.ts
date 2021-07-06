import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListFAQPage } from './list-faq.page';

describe('ListFAQPage', () => {
  let component: ListFAQPage;
  let fixture: ComponentFixture<ListFAQPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFAQPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListFAQPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
