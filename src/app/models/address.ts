export class Address {
  country: "";
  door_number: "";
  floor_number: "";
  lat: "";
  lng: "";
  locality: "";
  location:"";
  street_name: "";
  state: "";
  street_number: "";
  sublocality: "";
  zip: ""
    
  public asignarValores(init?: Partial<Address>) {
      Object.assign(this, init)
  }
}
