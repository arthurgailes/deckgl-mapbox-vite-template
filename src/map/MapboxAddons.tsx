import {
  FullscreenControl,
  NavigationControl,
  ScaleControl,
  StaticMap,
} from "react-map-gl";
import React, { useRef, useCallback, useMemo } from "react";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

const API_MAPBOX = import.meta.env.VITE_API_MAPBOX;
const navStyle = {
  position: "absolute",
  top: 50,
  right: 10,
};
const geoStyle = { ...navStyle, top: 10, zIndex: 0 };
const fullStyle = { ...navStyle, top: 140 };

export const MapboxAddons = ({
  mapRef,
  appRef,
  setViewState,
  setViewStateWithObject,
}: any) => {
  const geocoderContainerRef = useRef(null);

  return (
    <>
      <div ref={geocoderContainerRef} />
      {geocoderContainerRef && mapRef && (
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          countries="us"
          mapboxApiAccessToken={API_MAPBOX}
          onViewportChange={setViewStateWithObject}
          trackProximity
          reverseGeocode
        />
      )}
      <NavigationControl style={navStyle} onViewStateChange={setViewState} />
      <FullscreenControl style={fullStyle} container={appRef} />
      <ScaleControl
        maxWidth={100}
        unit="imperial"
        style={{ bottom: 25, right: 10 }}
      />
    </>
  );
};

// basemaps
export const basemaps = {
  Outdoors: "mapbox://styles/mapbox/outdoors-v11",
  Streets: "mapbox://styles/mapbox/streets-v11",
  Satellite: "mapbox://styles/mapbox/satellite-streets-v11",
  "Navigation Day": "mapbox://styles/mapbox/navigation-day-v1",
  "Streets - Extruded Buildings":
    "mapbox://styles/aeihousingcenter/ckvik5qdy7xmo14pbw0sfqb1t",
};
