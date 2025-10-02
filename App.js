// App.js
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import { loadMapData, getAuraRoute, getLoopRoute } from "./services/api";
import MapComponent from "./components/Map";
import Loader from "./components/Loader";
import ControlPanel from "./components/ControlPanel";
import InitialButtons from "./components/InitialButtons";

export default function App() {
  const [appState, setAppState] = React.useState("INITIALIZING"); // INITIALIZING, READY, PLANNING_LOOP, PLANNING_A_TO_B
  const [prompt, setPrompt] = React.useState("Initializing...");

  const [initialRegion, setInitialRegion] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const [startMarker, setStartMarker] = React.useState(null);
  const [endMarker, setEndMarker] = React.useState(null);
  const [routeLayers, setRouteLayers] = React.useState([]);

  const [distance, setDistance] = React.useState("5");
  const [auras, setAuras] = React.useState({ greenery: 0.5, tranquility: 0.5 });

  React.useEffect(() => {
    (async () => {
      setPrompt("Finding your location...");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPrompt("Permission to access location was denied.");
        setIsLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.02,
      };
      setInitialRegion(region);
      setStartMarker(region); // Automatically set start marker

      setPrompt("Loading map data...");
      try {
        await loadMapData(region.latitude, region.longitude);
      } catch (error) {
        setPrompt("Failed to load map data.");
      } finally {
        setIsLoading(false);
        setAppState("READY");
        setPrompt("");
      }
    })();
  }, []);

  const handlePlanLoop = () => {
    setAppState("PLANNING_LOOP");
  };

  const handlePlanPointToPoint = () => {
    setAppState("PLANNING_A_TO_B");
    setPrompt("Set your destination by tapping the map.");
  };

  const handleMapClick = (e) => {
    if (appState === "PLANNING_A_TO_B") {
      const { coordinate } = e.nativeEvent;
      setEndMarker(coordinate);
      calculateAndDrawAToBRoute(startMarker, coordinate); // Instantly calculate
      setAppState("READY"); // Return to ready state after calculation
      setPrompt("");
    }
  };

  const handleFindLoopRoute = async () => {
    if (!startMarker) return;
    setAppState("READY");
    setIsLoading(true);
    try {
      const route = await getLoopRoute(
        startMarker.latitude,
        startMarker.longitude,
        parseFloat(distance) * 1000,
        auras
      );
      setRouteLayers([{ type: "loop", geojson: route.loop_route }]);
    } catch (error) {
      alert("Could not calculate loop route.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAndDrawAToBRoute = async (start, end) => {
    setIsLoading(true);
    setRouteLayers([]);
    try {
      const routes = await getAuraRoute(start, end, auras);
      setRouteLayers([
        { type: "shortest", geojson: routes.shortest_route },
        { type: "aura", geojson: routes.aura_route },
      ]);
    } catch (error) {
      alert("Could not calculate route.");
    } finally {
      setIsLoading(false);
    }
  };

  if (appState === "INITIALIZING") {
    return (
      <View style={styles.container}>
        <Loader visible={true} />
        <Text style={styles.promptText}>{prompt}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapComponent
        initialRegion={initialRegion}
        startMarker={startMarker}
        endMarker={endMarker}
        routeLayers={routeLayers}
        onPress={handleMapClick}
        onStartMarkerDragEnd={(e) => setStartMarker(e.nativeEvent.coordinate)}
      />

      {prompt !== "" && (
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>{prompt}</Text>
        </View>
      )}

      {appState === "READY" && (
        <InitialButtons
          onPlanLoop={handlePlanLoop}
          onPlanPointToPoint={handlePlanPointToPoint}
        />
      )}

      <ControlPanel
        visible={appState === "PLANNING_LOOP"}
        onClose={() => setAppState("READY")}
        onFindRoute={handleFindLoopRoute}
        mode={"loop"} // It's always loop mode when this panel is open
        distance={distance}
        onDistanceChange={setDistance}
        auras={auras}
        onAuraChange={(name, value) =>
          setAuras((prev) => ({ ...prev, [name]: value }))
        }
        findButtonDisabled={!startMarker}
      />

      <Loader visible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  promptContainer: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  promptText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
