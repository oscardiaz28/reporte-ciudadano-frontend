export function getAddressComponents(addressComponents: google.maps.GeocoderAddressComponent[]) {
    let streetNumber = '';
    let route = '';
    let locality = '';
    let administrativeAreaLevel1 = '';
    let country = '';
    let postalCode = '';
  
    addressComponents.forEach(component => {
      const componentType = component.types[0];
  
      switch (componentType) {
        case 'street_number':
          streetNumber = component.long_name;
          break;
        case 'route':
          route = component.long_name;
          break;
        case 'locality':
          locality = component.long_name;
          break;
        case 'administrative_area_level_1':
          administrativeAreaLevel1 = component.long_name;
          break;
        case 'country':
          country = component.long_name;
          break;
        case 'postal_code':
          postalCode = component.long_name;
          break;
      }
    });
  
    return {
      streetNumber,
      route,
      locality,
      administrativeAreaLevel1,
      country,
      postalCode
    };
}