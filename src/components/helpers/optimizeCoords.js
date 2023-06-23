export const optimizeCoords = (positionData) => {
  //   console.log(positionData.latitude);
  const modifiedLatitude = positionData.latitude.toFixed(3);
  const modifiedLongitude = positionData.longitude.toFixed(3);

  const modifiedCords = `Latitude: ${modifiedLatitude}; Longitude: ${modifiedLongitude}`;
  return modifiedCords;
};
