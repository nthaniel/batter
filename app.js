function init() {
  var svg = d3.select("svg");
  g = svg.append("g");

  var particles = generate();

  function glitter(data) {
    // DATA JOIN
    var particles = g.selectAll("circle")
      .data(data);

    // UPDATE
    // particles.attr("class", "update");

    // ENTER
    particles.enter().append("circle")
      .attr("class", "sparkle")
      .attr("cx", function(d) { return 1000*d; })
      .attr("cy", "100px")
      .attr("r", "5px")
      .merge(particles)
      .attr("cx", function(d) { return d; });

    // ENTER + UPDATE

    // EXIT
  }

  function generate() {
    return [ Math.random(), Math.random(), Math.random() ];
  }

  glitter(particles);


  // create user icon - cartoon magnet

  // somehow: dots attract towards user on condition(plugged in)

  // add particles: fall continuously from top
  setInterval(function(){
    console.log('intervaled')
    glitter(generate());
    // grab screen width
    // pick a few random places on top of screen
    // create sparkle dots
    // fall at same speed
  }, 1000)
}




navigator.getBattery().then(function(battery) {
  console.log(battery);

  battery.addEventListener('chargingchange', function(){
    console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
  });

});



init();