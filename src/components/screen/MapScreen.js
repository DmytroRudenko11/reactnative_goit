import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
// import { getCountryFromCoordinates } from "../helpers/getCountry";
export const MapScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);

  let country = "";

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      // country = getCountryFromCoordinates(
      //   location.coords.latitude,
      //   location.coords.longitude
      // );
      const coords = {
        // country,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setLocation(coords);
    })();
  }, []);

  const handlePositionSet = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    // country = getCountryFromCoordinates(latitude, longitude);
    const positionData = {
      // country,
      latitude,
      longitude,
    };

    setLocation(positionData);
    navigation.navigate("CreatePost", { positionData });
  };

  return (
    <View style={styles.container}>
      <MapView
        onPress={handlePositionSet}
        style={styles.mapStyle}
        region={{
          latitude: location ? location.latitude : 50.436014498201764,
          longitude: location ? location.longitude : 30.55718373244726,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}
        showsZoomControls={true}
        mapType="standard"
        minZoomLevel={3}
        maxZoomLevel={18}
        onMapReady={() => console.log("Map is ready")}
      >
        {location && (
          <Marker title="I am here" coordinate={location} description="Hello" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width - 32,
    height: Dimensions.get("window").height - 200,
    // width: 100%,
    // height: 80%,
  },
});
