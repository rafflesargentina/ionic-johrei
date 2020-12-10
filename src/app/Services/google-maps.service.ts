import { Injectable } from "@angular/core"

declare let google:any

@Injectable({
    providedIn: "root"
})

export class GoogleMapsService {
  public addressForm:any;

  public autocomplete:any;

  public autocompleteSearch = "";

  public geocoder:any;

  public geolocation:any;

  public infowindow:any;

  public map:any;

  public marker:any;

  public markers:any =[];

  public pickedAddressComponents = {
      street_number: ["street_number", "short_name"],
      route: ["street_name", "long_name"],
      locality: ["locality", "long_name"],
      administrative_area_level_1: ["state", "short_name"],
      country: ["country", "long_name"],
      postal_code: ["zip", "short_name"],
      sublocality_level_1: ["sublocality", "long_name"],
  }

  public place:any;

  constructor() {}

  centerMap() {
      return new Promise((resolve, reject)=> {
          if (!this.map) {
              return reject("No map found.")
          }

          this.marker.setVisible(false)
          if (!this.place.geometry) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              return reject("No details available for input: '" + this.place.name + "'")
          } else {
              // If the place has a geometry, then present it on a map.
              if (this.place.geometry.viewport) {
                  this.map.fitBounds(this.place.geometry.viewport)
              } else {
                  this.map.setCenter(this.place.geometry.location)
              }

              this.marker.setPosition(this.place.geometry.location)
              this.marker.setVisible(true)
          }

          return resolve(this.place.geometry)
      })
  }

  fillInAddressForm(addressComponents = this.place.address_components) {
      return new Promise((resolve, reject)=> {
          if (!this.addressForm) {
              return reject("There's no address form to fill.")
          }

          let addressType

          // Clear and enable the form fields.
          for (var component in this.pickedAddressComponents) {
              addressType = this.pickedAddressComponents[component][0]
              if (this.addressForm.controls[addressType]) {
	  const obj = {}
	  obj[addressType] = ""
                  this.addressForm.patchValue(obj)
              }

              //var el = document.getElementById(component)
              //if (el) {
              //el.disabled = false
              //}
          }

          // Get each component of the address from the place details,
          // and then fill-in the corresponding field on the form.
          for (let i = 0; i < addressComponents.length; i++) {
              addressType = addressComponents[i].types[0]
              if (this.pickedAddressComponents[addressType]) {
                  const val = addressComponents[i][this.pickedAddressComponents[addressType][1]]

                  component = this.pickedAddressComponents[addressType][0]
	    const obj = {}
	    obj[component] = val
	    this.addressForm.patchValue(obj)
              }
          }

          return resolve(this.addressForm)
      })
  }


  geocodeCoordinates(coordinates = this.geolocation) {
      return new Promise((resolve, reject) => {
          this.geocoder = new google.maps.Geocoder

          this.geocoder.geocode({ "location": coordinates }, (results, status)=> {
              if (status !== "OK") {
                  return reject(status)
              }

              if (!results) {
                  return reject(status)
              }

              return resolve(results)
          })
      })
  }

  handlePlaceChanged() {
      // Get the place details from the autocomplete object.
      this.place = this.autocomplete.getPlace()

      this.centerMap()
      this.fillInAddressForm()
      this.updateAddressFormCoordinates(this.place.geometry.location.toJSON())
  }

  handleMarkerClick(marker) {
      return marker.addListener("click", ()=> {
          this.infowindow.open(this.map, marker)
      })
  }

  handleMarkerDragend(event) {
      const coordinates = event.latLng.toJSON()
      this.geolocation = coordinates

      //this.geocodeCoordinates()
      //.then(results => {
      //var firstResult = results[0]
      //this.autocompleteSearch = firstResult.formatted_address
      //return this.fillInAddressForm(firstResult.address_components)
      //})

      this.updateAddressFormCoordinates(coordinates)
  }

  handleReverseGeocoding(geolocation = this.geolocation) {
      return this.geocodeCoordinates(geolocation)
          .then(results => {
              const firstResult = results[0]
              this.autocompleteSearch = firstResult.formatted_address

              this.updateAddressFormCoordinates(geolocation)

              return this.fillInAddressForm(firstResult.address_components)
          })
  }

  handleZoomChanged(event) {
  }

  initMap(el, options) {
      this.map = this.makeMap(el, options)

      this.map.addListener("zoom_changed", this.handleZoomChanged)

      const markerOptions = {
          draggable: true,
          map: this.map,
          position: options.center
      }

      this.marker = this.makeMarker(markerOptions)
      this.marker.addListener("dragend", (ev)=> this.handleMarkerDragend(ev))

      return Promise.resolve(this.map)
  }

  makeMap(el, options) {
      if (google) {
          return new google.maps.Map(document.getElementById(el), options)
      }
  }

  initAutocomplete(el = "autocomplete", options = { types: ["geocode"], componentRestrictions: { country: "ar" }}, fields = ["address_components", "geometry", "icon", "name"]) {
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

      // When the user selects an address from the drop-down, populate the address fields in the form.
      this.autocomplete.addListener("place_changed", ()=> this.handlePlaceChanged())

      return Promise.resolve(this.autocomplete)
  }

  makeMarker(options) {
      const marker = new google.maps.Marker(options)
      this.markers.push(marker)
      return marker
  }

  setAddressForm(form) {
      this.addressForm = form
  }

  updateAddressFormCoordinates(coordinates) {
      if (this.addressForm) {
          this.addressForm.patchValue({ lat: coordinates.lat, lng: coordinates.lng })
      }
  }
}
