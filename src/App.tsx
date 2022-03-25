import { useState, useRef } from 'react';
import { Map } from './map/deckgl';
import './App.css';
import { renderLayers } from './mapLayers';

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const [viewState, setViewState] = useState();
  const [layers, setLayers] = useState<any[]>([]);

  renderLayers({ setLayers });
  return (
    <div ref={appRef} className="App">
      <Map
        layers={layers}
        mapRef={mapRef}
        viewState={viewState}
        setViewState={setViewState}
      />
    </div>
  );
}

export default App;
