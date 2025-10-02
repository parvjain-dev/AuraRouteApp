// services/api.js
const API_URL = "https://auraroute-app.onrender.com"; // Your Render URL

export const loadMapData = async (latitude, longitude) => {
  await fetch(`${API_URL}/set_location`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat: latitude, lng: longitude }),
  });
  return true;
};

export const getAuraRoute = async (start, end, auras) => {
  const response = await fetch(`${API_URL}/get_route`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ start, end, auras }), // Send auras
  });
  const data = await response.json();
  return {
    aura_route: JSON.parse(data.aura_route),
    shortest_route: JSON.parse(data.shortest_route),
  };
};

export const getLoopRoute = async (lat, lng, distance, auras) => {
  const response = await fetch(`${API_URL}/get_loop_route`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      start: { lat, lng },
      distance,
      auras, // Send auras
    }),
  });
  const data = await response.json();
  return {
    loop_route: JSON.parse(data.loop_route),
  };
};
