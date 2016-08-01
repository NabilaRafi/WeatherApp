function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);

  var timeOfDay = (h < 12) ? " AM" : " PM";
  h = (h <= 12) ? h : h - 12;

  document.getElementById('time').innerHTML = h + ":" + m + timeOfDay;
  t = setTimeout(function() {
    startTime()
  }, 500);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getDate() {
  var months = new Array();
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";

  var days = new Array();
  days[0] = "Sunday";
  days[1] = "Monday";
  days[2] = "Tuesday";
  days[3] = "Wednesday";
  days[4] = "Thursday";
  days[5] = "Friday";
  days[6] = "Saturday";

  var d = new Date();
  var curr_day = days[d.getDay()];
  var curr_date = d.getDate();
  var m = d.getMonth(); //Months are zero based
  var curr_month = months[m];
  var curr_year = d.getFullYear();
  var obj = document.getElementById('date');
  obj.innerHTML = curr_day + ", " + curr_month + " " + curr_date

}

function init() {
  startTime();
  getDate();
  navigator.geolocation.getCurrentPosition(startWeather);
}

function startWeather(position) {
  
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  
  jQuery(document).ready(function($) {
    $.ajax({
      url: "https://api.forecast.io/forecast/7fa872912245327ebd26b60bfebdc458/" + lat + "," + long,
      dataType: "jsonp",
      success: function(parsed_json) {

        var icons = new Array();
        //cloud
        icons[0] = "http://i.imgur.com/UsiPlHp.png";

        //rain
        icons[1] = "http://i.imgur.com/nGxqQ4c.png";

        //sunny
        icons[2] = "http://i.imgur.com/EhQS9Bh.png";

        //thunderstorm
        icons[3] = "http://i.imgur.com/Cdl3CVf.png";

        var CurrentForecast = parsed_json['currently'];
        var DailyForecast = parsed_json['daily'].data[0];
        var condition = CurrentForecast["icon"];
        var current = CurrentForecast["temperature"];
        var high = DailyForecast["temperatureMax"];
        var low = DailyForecast["temperatureMin"];
        var img = "";

        switch (condition) {

          case "clear-day":
            img = icons[2];
            break;
          case "clear-night":
            img = icons[2];
            break;
          case "rain":
            img = icons[1];
            break;
          case "snow":
            img = icons[1];
            break;
          case "sleet":
            img = icons[1];
            break;
          case "wind":
            img = icons[1];
            break;
          case "fog":
            img = icons[1];
            break;
          case "cloudy":
            img = icons[0];
            break;
          case "partly-cloudy-day":
            img = icons[0];
            break;
          case "partly-cloudy-night":
            img = icons[0];
            break;
          case "thunderstorm":
            img = icons[3];
            break;
        }

        document.getElementById('weatherIcon').innerHTML = "<img src='" + img + "' alt='" + condition + "' />";
        document.getElementById('cTemp').innerHTML = "<span class='tempLabel'>Current</span><br/>" + current + '&deg;F';
        document.getElementById('hTemp').innerHTML = "<span class='tempLabel'>High</span><br/>" + high + '&deg;F';
        document.getElementById('lTemp').innerHTML = "<span class='tempLabel'>Low</span><br/>" + low +'&deg;F';
          
      }
        
    });
  });
}