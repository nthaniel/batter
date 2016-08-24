
function init() {
  var svg = d3.select("svg");
  g = svg.append("g");

  var sim = d3.forceSimulation();

  function force(alpha) {
    nodes = sim.nodes();
    for (var i = 0, n = nodes.length, node, k = alpha * 0.1; i < n; ++i) {
      node = nodes[i];
      node.vx -= node.x * k;
      node.vy -= node.y * k;
    }
  }

  function update(data) {
    // DATA JOIN
    var particles = g.selectAll("circle")
      .data(data, (d) => d);

    // ADD FORCE
    sim.force("attract", force())
      .nodes(particles);


    // ENTER
    particles.enter().append("circle")
      .attr("class", "sparkle")
      .attr("cx", function(d) { return 500*d; })
      .attr("cy", "-5px")
      .attr("r", "5px")
      .merge(particles)
      .transition()
        .duration(5000)
        .ease(d3.easeQuadIn)
        .attr('cy', '505px')
      .remove();
  }

  function genStartPoints(n = 5) {
    return Array(n).fill(1).map(Math.random);
  }

  // TODO
  // create user icon - cartoon magnet
    // force should attract or repel particles

  setInterval(function(){
    update(genStartPoints(Math.ceil(Math.random() * 5) + 2));
  }, 500)
}


navigator.getBattery().then(function(battery) {
  console.log(battery);

  battery.addEventListener('chargingchange', function(){
    console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
  });

});

init();