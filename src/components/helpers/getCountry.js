import Geocoder from "react-native-geocoding";

import { GOOGLE_API } from "@env";
Geocoder.init(GOOGLE_API);

export const getCountryFromCoordinates = async (latitude, longitude) => {
  return Geocoder.from(latitude, longitude)
    .then((json) => {
      const { long_name: country } = json.results[0].address_components[3];
      const { long_name: region } = json.results[0].address_components[2];
      return { country, region };
    })
    .catch((error) => console.warn(error));
};
