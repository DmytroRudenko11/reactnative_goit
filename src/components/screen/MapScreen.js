import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  const { position } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: position ? position.latitude : 50.436014498201764,
          longitude: position ? position.longitude : 30.55718373244726,
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
        {position && (
          <Marker title="I am here" coordinate={position} description="Hello" />
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
  },
});
