interface tooltipType {
  object: {
    properties: {
      [key: string]: number | string;
    };
  };
}

export const returnTooltip = ({ object }: tooltipType) => {
  // do nothing if the object doens't have the data properties
  if (!object || !object.properties) return null;
  const { properties } = object;
  let str;

  return {
    html: properties.toString(),
  };
};
