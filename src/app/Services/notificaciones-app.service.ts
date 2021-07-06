import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCRUDService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesAppService extends BaseCRUDService {

  private partialUrl = "notifications";
  
  constructor(
    public httpClient: HttpClient
  ) {
      super(httpClient)
      this.setEndpoint("notifications")
  }

  public markAsRead() {
      const body={}

      return this.httpClient.put(this.getEndpoint() + "/markAsRead",body,{})
  }
}
