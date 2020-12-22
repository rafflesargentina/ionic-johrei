import { Component, ViewChild } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { ToastController } from "@ionic/angular"
import { Router } from "@angular/router"
import { AuthService } from "../Services/authentication/auth.service"

declare let google:any

@Component({
    selector: "app-form-registro",
    templateUrl: "./form-registro.page.html",
    styleUrls: ["./form-registro.page.scss"],
})

export class FormRegistroPage {
  @ViewChild("passwordEyeRegister") passwordEye;
  @ViewChild("passwordEyeConfirmation") passwordEyeConfirm;

  public autocomplete:any;
  public datosForm:FormGroup;
  public iconpassword1 = "eye-off";
  public iconpassword2 = "eye-off";
  public map:any;
  public markers:any =[]; 
  public passwordTypeInput1 = "password";
  public passwordTypeInput2 = "password";
  public place:any;
  public submitted = false;

  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController
  ) { 
      this.datosForm = this.formBuilder.group({
          accepted: [null, Validators.required],
          address: this.formBuilder.group({
              country: ["", Validators.required],
              door_number: [""],
              floor_number: [""],
              lat: [""],
              lng: [""],
              locality: ["", Validators.required],
              location: ["", Validators.required],
              state: [""],
              street_name: [""],
              street_number: [""],
              sublocality:[""],
              zip: [""],
          }),
          contact: this.formBuilder.group({
              mobile: [null, Validators.required],
          }),
          document_number: [""],
          email: ["", Validators.required],      
          first_name: ["", Validators.required],
          frequenter:["0"],
          last_name : ["", Validators.required],
          member:["1"],
          password: ["", Validators.required],      
          password_confirmation:["", Validators.required]
      })  
  }

  ionViewDidEnter():void {
      this.initAutocomplete("pac-input")

      // Aristóbulo del Valle 1861 - Sede Central
      const position = {
          lat: -34.5384442,
          lng: -58.4837172
      }

      this.initMap("mapDiv", {
          center:position,
          zoom:15 ,
          options: {
              disableDefaultUI: true,
              scrollwheel: true,
              streetViewControl: false,
          }
      })
  }

  initMap(el:string, options):void {
      this.map = this.makeMap(el, options)

      const markerOptions = {
          draggable: true,
          map: this.map,
          position: options.center,
          zoom:5 ,
      }
    
      this.makeMarker(markerOptions)
  }

  makeMap(el:string, options:unknown):void {
      if(google){
          const mapEle: HTMLElement = document.getElementById(el)
          new google.maps.Map(mapEle, options)
      }
  }

  get f() { 
      return this.datosForm.controls
  }

  get contactControls() {
      return this.datosForm.get("contact")["controls"]
  }

  registrar() {
      this.submitted = true

      return this.authService.register(this.datosForm.value).subscribe(()=> {
          this.submitted = false
      }, ()=> {
          this.submitted = false
      })
  }

  // Esta función verifica si el tipo de campo es texto lo cambia a password y viceversa, 
  //además verificara el icono si es 'eye-off' lo cambiara a 'eye' y viceversa
  togglePasswordMode():void {
      this.passwordTypeInput1  =  this.passwordTypeInput1  ===  "text"  ?  "password"  :  "text"
      this.iconpassword1  =  this.iconpassword1  ===  "eye-off"  ?  "eye"  :  "eye-off"
      this.passwordEye.el.setFocus()
  }

  togglePasswordConfirmMode():void {
      this.passwordTypeInput2  =  this.passwordTypeInput2  ===  "text"  ?  "password"  :  "text"
      this.iconpassword2  =  this.iconpassword2  ===  "eye-off"  ?  "eye"  :  "eye-off"
      this.passwordEyeConfirm.el.setFocus()
  }

  cambio(event){
      if(event.detail.value === "member"){
          this.datosForm.patchValue({
              member: true,
              frequenter: false
          })
      }else{
          this.datosForm.patchValue({
              frequenter: true,
              member: false
          })
      }
  }


  initAutocomplete(el = "autocomplete", options = { types: ["geocode"], componentRestrictions: { country: "ar" }}, fields = ["address_components", "geometry", "icon", "name"]):void {
      // Create the autocomplete object, restricting the search predictions to geographical location types.
      this.autocomplete = new google.maps.places.Autocomplete(
          document.getElementById(el).getElementsByTagName("input")[0], options
      )

      // Avoid paying for data that you don't need by restricting the set of
      // place fields that are returned to just the address components.
      // Set the data fields to return when the user selects a place.
      this.autocomplete.setFields(fields)

      if (this.map) {
      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
          this.autocomplete.bindTo("bounds", this.map)
      }

      this.autocomplete.addListener("place_changed",()=>{
          this.place = this.autocomplete.getPlace()
          console.log(this.place)

          this.datosForm.controls.address.patchValue({ lat: this.place.geometry.location.lat() })
          this.datosForm.controls.address.patchValue({ lng: this.place.geometry.location.lng() })

          const marker = this.makeMarker({
              position: {lat: Number(this.place.geometry.location.lat()), lng: Number(this.place.geometry.location.lng())},
              map: this.map,
              draggable:true,
          })

          const bounds = new google.maps.LatLngBounds()
          bounds.extend(marker.getPosition())
          this.map.fitBounds(bounds)

          const zoomChangeBoundsListener = google.maps.event.addListenerOnce(this.map, "bounds_changed", function() {
              if ( this.getZoom() ){   // or set a minimum
                  this.setZoom(16)  // set zoom here
              }
          })

          setTimeout(function(){google.maps.event.removeListener(zoomChangeBoundsListener)}, 2000)

          this.fillInAddressForm(this.place.address_components)
      })
  }

  fillInAddressForm(addressComponents):void {
      const pickedAddress =  {
          street_number: ["street_number", "short_name"],
          route: ["street_name", "long_name"],
          locality: ["locality", "long_name"],
          administrative_area_level_1: ["state", "short_name"],
          country: ["country", "long_name"],
          postal_code: ["zip", "short_name"],
          sublocality_level_1: ["sublocality", "long_name"],
      }

      let addressType

      // Get each component of the address from the place details,
      // and then fill-in the corresponding field on the form.
      let direccion_completa = ""
      for (let i = 0; i < addressComponents.length; i++) {
          addressType = addressComponents[i].types[0]

          if (pickedAddress[addressType]) {
              direccion_completa = direccion_completa +" "+  addressComponents[i][pickedAddress[addressType][1]]+","

              if(addressType == "country") {
                  this.datosForm.controls.address.patchValue({ country: addressComponents[i][pickedAddress[addressType][1]] })
              }

              if(addressType == "locality") {
                  this.datosForm.controls.address.patchValue({ locality: addressComponents[i][pickedAddress[addressType][1]] })
              }

              if(addressType == "route") {
                  this.datosForm.controls.address.patchValue({ street_name: addressComponents[i][pickedAddress[addressType][1]] })
              }

              if(addressType == "street_number") {
                  this.datosForm.controls.address.patchValue({ street_number: addressComponents[i][pickedAddress[addressType][1]] })
              }

              if(addressType == "administrative_area_level_1") {
                  this.datosForm.controls.address.patchValue({ state: addressComponents[i][pickedAddress[addressType][1]] })
              }
          }
      }

      setTimeout(function () {
          document.getElementById("pac-input").click()
      }, 1000)
  }

  makeMarker(options) {
      const marker = new google.maps.Marker(options)
      this.markers.push(marker)
      return marker
  }
}
