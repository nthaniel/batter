navigator.getBattery().then(function(battery) {
  console.log(battery);

  battery.addEventListener('chargingchange', function(){
    console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
  });

});