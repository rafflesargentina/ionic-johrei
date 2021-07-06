import { TestBed } from '@angular/core/testing';

import { NotificacionesAppService } from './notificaciones-app.service';

describe('NotificacionesAppService', () => {
  let service: NotificacionesAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacionesAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
