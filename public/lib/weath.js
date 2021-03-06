if ("geolocation" in navigator)
    {
        navigator.geolocation.getCurrentPosition(function (position))
        {
          loadWeather(position.coords.latitude "+",position.coords.longitude)
        
         });
    }
    else{
        loadWeather("Kolkata,In" , "");
        
    }

$(document).ready(function){
    setInterval(getWeather,10000);
    
});
function loadWeather(location,woeid){
    $.simpleWeather({
        location:location,
        woeid:woeid,
        unit:'c',
        success:function(weatther){
            city=weather.city;
            temp = weather.temp+'&deg;';
            wcode='<img class= "weathericon" src="images/weathericons/'+weather.code+'.svg">';
            wind ='<p>' +weather.wind.speed +'</p><p>'+weather.units.speed+'</p>';
            humidity = weather.humidity+'%';
            $(".location").text(city);
            $(".temparature").html(temp);
            $(".climate_bg").html(wind);
            $(".humidity").text(humidity);
        },
        error: function(error){
            $(".error").html('<p>'+error+'</p>');
        }
    });
}
