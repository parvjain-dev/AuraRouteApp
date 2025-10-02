// components/Map.js
import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Geojson, Marker } from "react-native-maps";

const MapComponent = ({
  initialRegion,
  onPress,
  onStartMarkerDragEnd,
  startMarker,
  endMarker,
  routeLayers,
}) => {
  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      initialRegion={initialRegion}
      onPress={onPress}
    >
      {startMarker && (
        <Marker
          coordinate={startMarker}
          pinColor="green"
          draggable // Make the marker draggable
          onDragEnd={onStartMarkerDragEnd}
        />
      )}
      {endMarker && <Marker coordinate={endMarker} pinColor="red" />}

      {routeLayers.map((layer, index) => (
        <Geojson
          key={index}
          geojson={layer.geojson}
          strokeColor={
            layer.type === "aura"
              ? "#00DD00"
              : layer.type === "loop"
              ? "#FF00FF"
              : "#888888"
          }
          strokeWidth={layer.type === "shortest" ? 3 : 5}
          lineDashPattern={layer.type === "shortest" ? [5, 10] : null}
        />
      ))}
    </MapView>
  );
};

export default MapComponent;
