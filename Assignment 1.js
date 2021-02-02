// https://observablehq.com/@maginoku/assignment-1@204
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Assignment 1`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  main.variable(observer("Df")).define("Df", ["d3"], function(d3){return(
d3.csv('https://raw.githubusercontent.com/maginoku/Interactive-Data-Visualization/main/anscombe.csv', d3.autoType)
)});
  main.variable(observer()).define(["Df"], function(Df){return(
Df.columns
)});
  main.variable(observer("Plotly")).define("Plotly", ["require"], function(require){return(
require("https://cdn.plot.ly/plotly-latest.min.js")
)});
  main.variable(observer()).define(["Df","DOM","Plotly"], function(Df,DOM,Plotly)
{
  const data = [{ //only do the function once if you do it more than once you will come accross issues in the long run
    mode: 'markers',
    name: 'Anscomber Dataset I',
    type: 'scatter',
    x: Df.filter(element => element.dataset == 'I').map(element => element.x),
    y: Df.filter(element => element.dataset == 'I').map(element => element.y),
    marker: {
      size: 9,
      color: 'Salmon'
    }
  },
               {
    mode: 'markers',
    name: 'Anscomber Dataset II',
    type: 'scatter',
    x: Df.filter(element => element.dataset == 'II').map(element => element.x),
    y: Df.filter(element => element.dataset == 'II').map(element => element.y),
    xaxis: 'x2',
    yaxis: 'y2',
    marker: {
      size: 9,
      color: 'lightblue'
    }
  },
               {
    mode: 'markers',
    name: 'Anscomber Dataset III',
    type: 'scatter',
    x: Df.filter(element => element.dataset == 'III').map(element => element.x),
    y: Df.filter(element => element.dataset == 'III').map(element => element.y),
    xaxis: 'x3',
    yaxis: 'y3',
    marker: {
      size: 9,
      color: 'lavender'
    }
  },
               {
    mode: 'markers',
    name: 'Anscomber Dataset IV',
    type: 'scatter',
    x: Df.filter(element => element.dataset == 'IV').map(element => element.x),
    y: Df.filter(element => element.dataset == 'IV').map(element => element.y),
    xaxis: 'x4',
    yaxis: 'y4',
      marker: {
      size: 9,
      color: '#a3d76e'
    }
  }
               ];
  var layout = {
  xaxis3: {title: 'x Axis'}, //this is for the axis make sure you know which location to put the labels on
  xaxis4: {title: 'x Axis'},
  yaxis: {title: 'y Axis'},
  yaxis3: {title: 'y Axis'},
  grid: {rows: 2, columns: 2, pattern: 'independent'},
  };
  const div = DOM.element('div');
  Plotly.newPlot(div, data, layout);
  return div;
}
);
  return main;
}
