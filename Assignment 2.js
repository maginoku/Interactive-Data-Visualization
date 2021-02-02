// https://observablehq.com/@maginoku/assignment-2/2@228
import define1 from "./e93997d5089d7165@2289.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Assignment 2`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  main.variable(observer("Plotly")).define("Plotly", ["require"], function(require){return(
require("https://cdn.plot.ly/plotly-latest.min.js")
)});
  const child1 = runtime.module(define1);
  main.import("radio", child1);
  const child2 = runtime.module(define1);
  main.import("slider", child2);
  main.variable(observer("old_faithful")).define("old_faithful", ["d3"], function(d3){return(
d3.tsv('https://raw.githubusercontent.com/maginoku/Interactive-Data-Visualization/main/Old_Faithful_data.tsv', d3.autoType)
)});
  main.variable(observer()).define(["old_faithful"], function(old_faithful){return(
old_faithful.columns
)});
  main.variable(observer("extract")).define("extract", ["old_faithful"], function(old_faithful){return(
attribute=>old_faithful.map(d=>d[attribute])
)});
  main.variable(observer("waiting")).define("waiting", ["extract"], function(extract){return(
extract("waiting")
)});
  main.variable(observer("eruptions")).define("eruptions", ["extract"], function(extract){return(
extract("eruptions")
)});
  main.variable(observer("data_extent")).define("data_extent", ["d3","waiting"], function(d3,waiting){return(
d3.extent(waiting)
)});
  main.variable(observer("binSize")).define("binSize", ["data_extent","n_bins"], function(data_extent,n_bins)
{
  const x_extent = data_extent;
  return (x_extent[1] - x_extent[0]) / n_bins;
}
);
  main.variable(observer("kernels")).define("kernels", function(){return(
{
  cosine: () => x => (x <= 1 ? (Math.PI / 4) * Math.cos((x * Math.PI) / 2) : 0),
  epanechnikov: () => x => (x <= 1 ? (3 / 4) * (1 - x * x) : 0),
  quartic: () => x => (x <= 1 ? (15 / 16) * (1 - x * x) ** 2 : 0),
  triweight: () => x => (x <= 1 ? (35 / 32) * (1 - x * x) ** 3 : 0),
  tricube: () => x => (x <= 1 ? (35 / 32) * (1 - x ** 3) ** 3 : 0),
  uniform: () => x => (x <= 1 ? 0.5 : 0),
  triangle: () => x => (x <= 1 ? 1 - x : 0)
}
)});
  main.variable(observer("kernel")).define("kernel", ["kernels","kernelname"], function(kernels,kernelname){return(
kernels[kernelname]()
)});
  main.variable(observer("kde")).define("kde", ["d3","binSize","band_width"], function(d3,binSize,band_width){return(
function kde(kernel, Xs, data) {
  return Xs.map(x =>
    d3.mean(
      data,
      d =>
        kernel(Math.abs(x - d) / (binSize * band_width)) /
        (binSize * band_width)
    )
  );
}
)});
  main.variable(observer("epanechnikov")).define("epanechnikov", function(){return(
function epanechnikov(bandwidth) {
  return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
}
)});
  main.variable(observer("density")).define("density", ["data_extent","extract","sort4","kde","kernel"], function(data_extent,extract,sort4,kde,kernel)
{
  const delta = (data_extent[1] - data_extent[0]) / extract(sort4).length;
  const X = new Array(extract(sort4).length + 1)
    .fill(0)
    .map((d, i) => data_extent[0] + i * delta);

  const Y = kde(kernel, X, extract(sort4));
  return { X, Y };
}
);
  main.variable(observer()).define(["md"], function(md){return(
md `### ----------------------------------------------------------------------------------------------`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Strip Plot`
)});
  main.variable(observer("viewof sort")).define("viewof sort", ["radio"], function(radio){return(
radio({
  options:[{label:"Waiting Time",value:"waiting"},{label:"Eruption Rate",value:"eruptions"}],
  value:"waiting"
})
)});
  main.variable(observer("sort")).define("sort", ["Generators", "viewof sort"], (G, _) => G.input(_));
  main.variable(observer()).define(["sort","eruptions","waiting","old_faithful","DOM","Plotly"], function(sort,eruptions,waiting,old_faithful,DOM,Plotly)
{
  let graphData = []
  if (sort === 'eruptions') { 
    graphData = eruptions
  } 
  else if (sort === 'waiting') { 
    graphData = waiting
  }
  
  let extract = attribute=>old_faithful.map(d=>d[attribute]);
  let yvalue = (jitterLength, jitterMax, jitterMin) => Array(jitterLength).fill(1).map(x => Math.random() * (jitterMax - jitterMin) + jitterMin);
 
  let scatterness = {
    mode: "markers",
    type: "scatter",
      x: graphData,
      y: yvalue(graphData.length, 1,-1),
      marker: {
            opacity: 0.5,
            color:  'rgb(0, 191, 128)',
            size: 12
        }
    };
  
  let data0 = [scatterness];
  let layout0 = {
    title: 'Waiting Time vs Eruption Rate',
    xaxis: {
      title: 'Please select one of the following choices to view the data!'
    },
    bargap: 0.1
    //bargap: 0.1
  };
  const config = {
    staticPlot: true,
    responsive: true,
    displayModeBar: false
  };
  const div = DOM.element('div');
  Plotly.newPlot(div, data0, layout0);
  return div;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Histogram Plot`
)});
  main.variable(observer("viewof sort1")).define("viewof sort1", ["radio"], function(radio){return(
radio({
  options:[{label:"Waiting Time",value:"waiting"},{label:"Eruption Rate",value:"eruptions"}],
  value:"waiting"
})
)});
  main.variable(observer("sort1")).define("sort1", ["Generators", "viewof sort1"], (G, _) => G.input(_));
  main.variable(observer()).define(["sort1","eruptions","waiting","old_faithful","DOM","Plotly"], function(sort1,eruptions,waiting,old_faithful,DOM,Plotly)
{
  let graphData = []
  if (sort1 === 'eruptions') { 
    graphData = eruptions
  } 
  else if (sort1 === 'waiting') { 
    graphData = waiting
  }
  
let extract = attribute=>old_faithful.map(d=>d[attribute]);
  let trace0 = {
      type: "histogram",
      x: graphData,
      marker: {
        color: '#afcbff',
        //size: binSize,
        line: {
            color:  "blue", 
            width: 0.7
        }
	    },
    };
  
  let data0 = [trace0];
  let layout0 = {
    title: "Waiting Time vs. Eruption Rate",
    xaxis: {
      title: "Please select one of the following choices to view the data!"
    },
    bargap: 0.09
  };
  const config = {
    staticPlot: true,
    responsive: true,
    displayModeBar: false
  };
  const div = DOM.element('div');
  Plotly.newPlot(div, data0, layout0);
  return div;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Box Plot`
)});
  main.variable(observer("viewof sort2")).define("viewof sort2", ["radio"], function(radio){return(
radio({
  options:[{label:"Waiting Time",value:"waiting"},{label:"Eruption Rate",value:"eruptions"}],
  value:"waiting"
})
)});
  main.variable(observer("sort2")).define("sort2", ["Generators", "viewof sort2"], (G, _) => G.input(_));
  main.variable(observer()).define(["sort2","eruptions","waiting","old_faithful","DOM","Plotly"], function(sort2,eruptions,waiting,old_faithful,DOM,Plotly)
{
  let graphData = []
  if (sort2 === 'eruptions') { 
    graphData = eruptions
  } 
  else if (sort2 === 'waiting') { 
    graphData = waiting
  }
  
  let extract = attribute=>old_faithful.map(d=>d[attribute]);
  let trace0 = {
      type: "box",
      x: graphData,
      marker: {
        color: '#fdcf76',
        line: {
            color:  "white", 
            width: 1
        }
	    },
    };
  
let data0 = [trace0];
  let layout0 = {
    title: "Waiting Time vs. Eruption Rate",
    xaxis: {
      title: "Please select one of the following choices to view the data!"
    }
  };
 
  const div = DOM.element('div');
  Plotly.newPlot(div, data0, layout0);
  return div;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Violin Plot`
)});
  main.variable(observer("viewof sort3")).define("viewof sort3", ["radio"], function(radio){return(
radio({
  options:[{label:"Waiting Time",value:"waiting"},{label:"Eruption Rate",value:"eruptions"}],
  value:"waiting"
})
)});
  main.variable(observer("sort3")).define("sort3", ["Generators", "viewof sort3"], (G, _) => G.input(_));
  main.variable(observer()).define(["sort3","eruptions","waiting","old_faithful","DOM","Plotly"], function(sort3,eruptions,waiting,old_faithful,DOM,Plotly)
{
  let graphData = []
  if (sort3 === 'eruptions') { 
    graphData = eruptions} 
  else if (sort3 === 'waiting') { 
    graphData = waiting}
  
   let extract = attribute=>old_faithful.map(d=>d[attribute]);
  let trace0 = {
      type: "violin",
      x: graphData,
      box: {
      visible: false
    },
    meanline: {
      visible: true
    },
      marker: {
        color: '#fa6e4f'
      },
    };
  
let data0 = [trace0];
  let layout0 = {
    title: "Waiting Time vs. Eruption Rate",
    xaxis: {
      title: "Please select one of the following choices to view the data!"
    }
  };
 
  const div = DOM.element('div');
  Plotly.newPlot(div, data0, layout0);
  return div;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md `## Density Plot`
)});
  main.variable(observer("viewof sort4")).define("viewof sort4", ["radio"], function(radio){return(
radio({
  options:[{label:"Waiting Time",value:"waiting"},{label:"Eruption Rate",value:"eruptions"}],
  value:"waiting"
})
)});
  main.variable(observer("sort4")).define("sort4", ["Generators", "viewof sort4"], (G, _) => G.input(_));
  main.variable(observer("viewof n_bins")).define("viewof n_bins", ["slider"], function(slider){return(
slider({
  min: 1,
  max: 100,
  step: 1,
  value: 20,
  title: "Number of Bins"
})
)});
  main.variable(observer("n_bins")).define("n_bins", ["Generators", "viewof n_bins"], (G, _) => G.input(_));
  main.variable(observer("viewof band_width")).define("viewof band_width", ["slider","n_bins"], function(slider,n_bins){return(
slider({
  min: 1,
  max: Math.round(n_bins / 4),
  step: 1,
  value: 1,
  title: "BandWidth",
  description: 'The wider the bin the smoother it will be.'
})
)});
  main.variable(observer("band_width")).define("band_width", ["Generators", "viewof band_width"], (G, _) => G.input(_));
  main.variable(observer("viewof kernelname")).define("viewof kernelname", ["radio"], function(radio){return(
radio({
  description: 'Please choose the desired kernel',
  options: [
    "cosine",
    "epanechnikov",
    "quartic",
    "triweight",
    "uniform",
    "triangle"
  ],
  value: 'epanechnikov'
})
)});
  main.variable(observer("kernelname")).define("kernelname", ["Generators", "viewof kernelname"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","extract","sort4","binSize","density","Plotly"], function(html,extract,sort4,binSize,density,Plotly)
{
  const Div = html`<div style="width:600px;height:450px;"></div>`;
  const trace = {
    x: extract(sort4),
    autobinx: false, // For Bin control in Histogram
    xbins: {
      size: binSize
    },
    histnorm: "probability density",
    type: 'histogram',
    marker: {
        color: '#D5AAFF',
        line: {
            color:  "4f3f84", 
            width: 1
        }
	    },
  };
  let trace1 = {
    type: "scatter",
    x: density.X,
    y: density.Y,
    marker: {
      color: "003041"
    }
  };

  const data = [trace, trace1];
  var layout = {
    bargap: 0.15
  };
  return Plotly.newPlot(Div, data, layout);
}
);
  return main;
}
