import { LineLayer } from '@deck.gl/layers';
import { useEffect, useMemo } from 'react';

const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781],
  },
];

export const renderLayers = (props: renderLayersType) => {
  const { setLayers } = props;
  const lineLayer = useMemo(() => new LineLayer({ id: 'line-layer', data }), []);

  useEffect(() => {
    setLayers([lineLayer]);
  }, []);
};

interface renderLayersType {
  setLayers: React.Dispatch<React.SetStateAction<any[]>>;
}
