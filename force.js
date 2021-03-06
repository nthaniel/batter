function init() {

  var svg = d3.select("svg");
  var width = +svg.attr("width");
  var height = +svg.attr("height");
  var count = 0;
  var generations = 0;
  var nodes = [];
  var charging;

  navigator.getBattery().then(function(battery) {
    console.log(battery);
    charging = battery.charging;

    battery.addEventListener('chargingchange', function(){
      console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
      charging = !charging;
    });
  });

  var simulation = d3.forceSimulation()
    // .force("charge", d3.forceManyBody().strength(() => 0.5))
    .force("yposition", d3.forceY(height - 10).strength(() => 0.005))
    .force("xposition", d3.forceX(width / 2).strength(() => charging ? 0.005 : 0))
    .alpha(0.01)
    .alphaDecay(0)
    // alphaDecay is supposed to be between [0, 1]...
    // but to have acceleration, you need to have negative alpha?
    // but then this acceleration applies to new nodes too – not worth it
    // ***probably best to define your own force, with increasing attraction as you get closer to a point***
    .velocityDecay(0.01);

  function generateNodes(n) {
    count += n;
    return d3.range(n).map((_, i) => ({id: i, x: width * Math.random(), y: -50 * Math.random()}));
  }

  function drawNodes(nodes) { 
    return svg.append("g")
      .attr("class", "nodes" + generations)
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
        .attr("r", 5)
        .attr("fill", "gold")
      .transition()
        .duration(10000)
      .remove();
  }

  function ticked() {
    nodeElements
      .attr("cx", function(d) { return d ? d.x : 0; })
      .attr("cy", function(d) { return d ? d.y : 0; });
  }

  setInterval(() => {
    var newNodes = generateNodes(5);
    drawNodes(newNodes);
    nodeElements = d3.selectAll("circle");
    nodes = nodes.concat(newNodes);
    simulation.nodes(nodes).on("tick", ticked);
    svg.selectAll(`g[class=nodes${generations - 10000 / 500}]`).remove();
    generations++;
  }, 500);
}

init();