import React from "react";

const CONTAINER_X_PX_SIZE = 500;
const CONTAINER_Y_PX_SIZE = 500;

const YAxis = ({ size, scalingCoeff }) => {
  let skipCoeff = Math.trunc(size / 10) > 1 ? Math.trunc(size / 10) : 1;
  console.log("skipCoeff", skipCoeff);
  const generateDigits = () => {
    const acc = [];
    for (let i = -size; i < size; i += 1) {
      if (i % skipCoeff !== 0) {
        continue;
      }
      acc.push(
        <>
          <line
            x1={-0.5 * scalingCoeff}
            y1={i}
            x2={0.5 * scalingCoeff}
            y2={i}
            stroke="gray"
            strokeWidth={0.1 * scalingCoeff}
          />
          <text
            x={0.5 * scalingCoeff}
            y={i}
            fill="black"
            font-size={1 * scalingCoeff}
          >
            {i}
          </text>
        </>
      );
    }
    return acc;
  };

  return (
    <>
      <line
        x1="0"
        y1="-9999999"
        x2="0"
        y2="9999999"
        stroke="gray"
        strokeWidth={0.1 * scalingCoeff}
      />
      {generateDigits()}
    </>
  );
};

const calculateScalingCoeff = size => {
  const a = size / 10;
  if (a >= 10) {
    let acc = 0.1;
    while (size / acc >= 10) {
      acc *= 10;
    }
    return acc;
  }
  if (a < 1) {
    let acc = 0.1;
    while (size / acc <= 1) {
      acc *= 0.1;
    }
    return acc;
  }
  return 1;
};

const GraphRenderer = ({ rangeXFrom, rangeXTo }) => {
  //const centerCoords = [CONTAINER_X_PX_SIZE / 2, CONTAINER_Y_PX_SIZE / 2];
  const size = rangeXTo - rangeXFrom;
  const scalingCoeff = calculateScalingCoeff(size);
  console.log("scalingCoeff", scalingCoeff);

  const viewBoxCoeff = Math.abs(rangeXTo / rangeXFrom);

  return (
    <svg
      viewBox={`-${size / (2 * viewBoxCoeff)} -${size / 2} ${size} ${size}`}
      // viewBox="-300 -300 600 600"
    >
      <YAxis size={size} scalingCoeff={scalingCoeff} />
      <circle
        cx="0"
        cy="0"
        r={0.5 * scalingCoeff}
        stroke="black"
        stroke-width={0.1 * scalingCoeff}
        fill="red"
      />
      <circle
        cx="1"
        cy="0"
        r="0.1"
        stroke="black"
        stroke-width="0.1"
        fill="yellow"
      />
      <circle
        cx="-1"
        cy="0"
        r="0.1"
        stroke="black"
        stroke-width="0.1"
        fill="yellow"
      />
      <circle
        cx="5"
        cy="5"
        r="0.1"
        stroke="black"
        stroke-width="0.1"
        fill="green"
      />
      {/* <polyline
        fill="none"
        stroke="#0074d9"
        stroke-width="3"
        points="
       0.1,0.1
       20,60
       40,80
       60,20"
      /> */}
    </svg>
  );
};

export default GraphRenderer;
