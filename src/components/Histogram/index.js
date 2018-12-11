import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientTealBlue } from '@vx/gradient';
import { AxisBottom } from '@vx/axis';

// import { letterFrequency } from '@vx/mock-data';
import { scaleBand, scaleLinear } from '@vx/scale';

// const data = letterFrequency.slice(5);
// console.log("data", data)
// accessors
// const x = d => d.letter;
// const y = d => +d.frequency * 100;

export default ({ data, width, height }) => {
  // bounds
  const xMax = width;
  const yMax = height - 120;

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(obj => obj.month),
    padding: 0.4
  });
  console.log("===Object.keys(data)", Object.keys(data))
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...data.map(obj => obj.posts.length))]
  });

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={"url(#teal)"} rx={14} />
      <Group top={40}>
        {data.map((obj, index) => {
          let numPosts = obj.posts.length
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(numPosts);
          const barX = xScale(obj.month);
          console.log("barX", barX, xScale(obj.month))
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${obj.month}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={event => {
                alert(`clicked: ${obj.month} number of posts: ${numPosts}`);
              }}
            />
          )
        })}
      </Group>
      <AxisBottom
         scale={xScale}
         top={yMax + 40}
         label={'Month'}
         stroke={'rgba(23, 233, 217, .8)'}
         tickTextFill={'rgba(23, 233, 217, .8)'}
       />
    </svg>
  );
};
