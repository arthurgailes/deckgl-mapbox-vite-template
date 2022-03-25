// import React from 'react';
import DeckGL from "@deck.gl/react";
import { useState, useCallback, useRef, useEffect } from "react";

import { MapboxLayer } from "@deck.gl/mapbox";
import { MapboxAddons, basemaps } from "./MapboxAddons";
import { returnTooltip } from "./tooltip";
import { StaticMap, _MapContext as MapContext } from "react-map-gl";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

export const Map = function ({
  viewState,
  setViewState,
  appRef,
  layers,
  mapRef,
}: any) {
  useEffect(() => setViewState(INITIAL_VIEW_STATE), []);
  // DeckGL and mapbox will both draw into this WebGL context

  const setViewStateWithObject = useCallback(
    ({ viewState }) => setViewState(viewState),
    []
  );

  const [glContext, setGLContext] = useState();
  const deckRef = useRef({ deck: null });

  const onMapLoad = useCallback(() => {
    const map = mapRef.current.getMap();
    const { deck } = deckRef.current;

    // get the id of the first label layer
    const showLabel = map
      .getStyle()
      .layers.find((l: any) => l.type === "symbol").id;

    // You must initialize an empty deck.gl layer to prevent flashing
    map.addLayer(
      // This id has to match the id of the deck.gl layer
      new MapboxLayer({ id: "deckgl", deck }),
      showLabel
      // Optionally define id from Mapbox layer stack under which to add deck layer
      // 'before-layer-id',
    );
  }, []);

  return (
    <DeckGL
      ref={deckRef}
      id="deckgl"
      layers={layers}
      initialViewState={viewState}
      onViewStateChange={setViewStateWithObject}
      getTooltip={returnTooltip}
      ContextProvider={MapContext.Provider}
      controller
      onWebGLInitialized={setGLContext}
      glOptions={{
        /* To render vector tile polygons correctly */
        stencil: true,
      }}
    >
      {glContext && (
        /* This is important: Mapbox must be instantiated after the
          WebGLContext is available */
        <>
          <StaticMap
            id="mapbox_map"
            ref={mapRef}
            mapStyle={basemaps.Streets}
            // gl={glContext} // causes opacity problems
            mapboxApiAccessToken={import.meta.env.VITE_API_MAPBOX}
            onLoad={onMapLoad}
          />
          <MapboxAddons
            // gl={glContext} // causes opacity problems
            onMapLoad={onMapLoad}
            mapRef={mapRef}
            appRef={appRef}
            setViewState={setViewState}
            setViewStateWithObject={setViewStateWithObject}
          />
        </>
      )}
    </DeckGL>
  );
};
