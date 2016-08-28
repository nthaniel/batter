function init() {
  // var svg = d3.select("svg");


  // // function force(alpha) {
  // //   nodes = sim.nodes();
  // //   for (var i = 0, n = nodes.length, node, k = alpha * 0.1; i < n; ++i) {
  // //     node = nodes[i];
  // //     node.vx -= node.x * k;
  // //     node.vy -= node.y * k;
  // //   }
  // // }

  // var nodes = [
  //   {"id": "Myriel", "group": 1},
  //   {"id": "Napoleon", "group": 1},
  //   {"id": "Mlle.Baptistine", "group": 1},
  //   {"id": "Mme.Magloire", "group": 1},
  // ];

  // var sim = d3.forceSimulation(nodes)
  //   // .force("charge", d3.forceManyBody())
  //   // .force("link", d3.forceLink().id(function(d) { return d.id; }))
  //   .force("center", d3.forceCenter([300, 300]));

  // var node = svg.append("g")
  //   .attr("class", "nodes")
  //   .selectAll("circle")
  //   .data(nodes)
  //   .enter().append("circle")
  //     .attr("r", 5)
  //     .attr("fill", "gold");
  
  // sim
  //   .on('tick', ticked)
  //   .on('end', () => console.log('end'));

  // function ticked() {
  //   node
  //     .attr("cx", function(d) { return d.x; })
  //     .attr("cy", function(d) { return d.y; });
  // }

var svg = d3.select("svg");
var width = +svg.attr("width");
var height = +svg.attr("height");

var nodes = d3.range(50).map((_, i) => ({id: i, x: width * Math.random(), y: -50 * Math.random()}));
var count = nodes.length;

var simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody().strength(() => 0.5))
    .force("yposition", d3.forceY(height).strength(() => 0.03))
    .force("xposition", d3.forceX(width / 2).strength(() => 0.005))
    .alpha(0.1)
    .alphaDecay(0)
    // alphaDecay is supposed to be between [0, 1]...
    // I wanted acceleration though, so we'll need to remove nodes fast
    .velocityDecay(0.6);


  var drawNodes = (nodes) => { 
    return svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
        .attr("r", 5)
        .attr("fill", "gold");
  };

  var node = drawNodes(nodes);

  simulation
      .nodes(nodes)
      .on("tick", ticked);

  function ticked() {
    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  setInterval(() => {
    var nodes2 = d3.range(20).map((_, i) => ({id: count + i, x: width * Math.random(), y: -50 * Math.random()}));
    count += 50;
    drawNodes(nodes2);
    node = d3.selectAll("circle");
    nodes = nodes.concat(nodes2);
    simulation.nodes(nodes).on("tick", ticked);
  }, 500);
}

init();