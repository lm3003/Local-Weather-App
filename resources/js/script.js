$(document).ready(function () {
    var longitude = 0.00;
    var latitude = 0.00;
    var tempInC = 0.00;
    var tempInF = 0.00;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            longitude = parseFloat(position.coords.longitude);
            latitude = parseFloat(position.coords.latitude);
            $.ajax({
                url: "https://fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&lat=" + latitude,
                success: function (json) {
                    console.log(JSON.stringify(json));
                    $("#city-name").html(json.name);
                    $("#weather-description").html(json.weather[0].description);
                    $("#wind-speed").html(json.wind.speed + " knots");
                    $("#weather-image").attr("src", (json.weather[0].icon));
                    tempInC = json.main.temp;
                    tempInF = ((tempInC / 5) * 9) + 32;
                    $("#temp").html('<img src="https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366' +
                        '021399" alt="weather image" id="weather-image">' + tempInF.toFixed(2) + ' F <button class="btn btn-' +
                        'primary" id="toggleUnit">to Celsius</button>');

                }
            });
        });
    }

    $(document).on("click", "#toggleUnit", function(){
        if ($("#toggleUnit").text() === "to Celsius") {
            $("#temp").html('<img src="https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366' +
                '021399" alt="weather image" id="weather-image">' + tempInC.toFixed(2) + ' C <button class="btn btn-' +
                'primary" id="toggleUnit">to Fahrenheit</button>');
        } else {
            $("#temp").html('<img src="https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366' +
                '021399" alt="weather image" id="weather-image">' + tempInF.toFixed(2) + ' F <button class="btn btn-' +
                'primary" id="toggleUnit">to Celsius</button>');
        }
    });
});