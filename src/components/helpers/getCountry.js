import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyBCXggptgMoAC1KBlfH1vahYPYhYDd7ZSU");

// export const getCountryFromCoordinates = async (latitude, longitude) => {
//   try {
//     const response = await Geocoder.from(latitude, longitude);
//     const addressComponent = response.results[0].address_components.find(
//       (component) => component.types.includes("country")
//     );
//     const country = addressComponent.long_name;
//     // console.log("Country:", country);
//     return country;
//   } catch (error) {
//     console.log("Error:", error);
//     return null;
//   }
// };

// export const getCountryFromCoordinates = async (latitude, longitude) => {
//   Geocoder.from(latitude, longitude)
//     .then((json) => {
//       var addressComponent = json.results[0].address_components[0];
//       console.log("func", addressComponent);
//     })
//     .catch((error) => console.warn(error));
// };
