/**
  output: [html]
  params: [x, y]
  deps: [
    'chart-utils.js',
    'https://cdn.jsdelivr.net/npm/d3@6',
    'https://cdn.jsdelivr.net/npm/@observablehq/plot@0.1',
  ]
**/


if (y && !Array.isArray(y)) y = [y];
if (!y) y = [];

const chartdata = x && y.length
 ? data.map(v => {
     const value = { x: convert(v[x]) };
     y.map((yv, i) => {
       value[`y${i}`] = convert(v[yv]);
     });
     return value;
   })
 : [];

html.appendChild(Plot.plot({
  marks: [y.map((_, i) =>
    Plot.line(chartdata, {
      x: x ? "x" : [],
      y: `y${i}`,
      stroke: d3.schemeTableau10[i],
    })
  )],
  x: {
    grid: true,
    inset: 10,
  },
  y: {
    grid: true,
    inset: 10,
    tickFormat: (d) => (d > 1000 ? d3.format('~s')(d) : d),
  },
  width: html.clientWidth,
  height: html.clientHeight,
  style: {
    background: hal9.isDark() ? "#222" : '',
    color: hal9.isDark() ? "white" : ''
  },
}));
