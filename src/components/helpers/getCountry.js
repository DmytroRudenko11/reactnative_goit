import Geocoder, { PROVIDER_GOOGLE } from "react-native-geocoding";

// const { GOOGLE_API } = process.env;
Geocoder.init(PROVIDER_GOOGLE);

export const getCountryFromCoordinates = async (latitude, longitude) => {
  return Geocoder.from(latitude, longitude)
    .then((json) => {
      const { long_name: country } = json.results[0].address_components[3];
      const { long_name: region } = json.results[0].address_components[2];
      return { country, region };
    })
    .catch((error) => console.warn(error));
};
