import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

import { Document } from "src/app/models/document"
import { BaseCRUDService } from "./base-crud.service"

@Injectable({
    providedIn: "root"
})

export class DocumentosService extends BaseCRUDService {
  documento:Document = new Document();
  documentos: Document[] = [];

  constructor(
    public httpClient:HttpClient
  ) {
      super(httpClient)

      this.setEndpoint("documents")
  }
}
