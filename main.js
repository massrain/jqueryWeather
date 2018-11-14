$(document).ready(function () {

    $("#btnSubmit").click(function () {
        $.addCity($('#cityname').val());
    });

    $("#list").on("click", ".button__close", function () {
        $(this).parents()[0].remove();
    });

    $(document).keypress(function (e) {
        if (e.which == 13) {
            //$.addCity($('#cityname').val());
             $.searchBox($('#searchbar').val().toLowerCase());
        }
    });

    $.searchBox = function (tbInput) { //contains search
        $(".button__close").not("[name*='"+tbInput+"']").parent().hide();
        $(".button__close[name*='"+tbInput+"']").parent().show();
        if (tbInput == '') $(".button__close").parent().show();
    }

    $.addCity = function (cityname) {
        var apiId = "472a64bfc5883ce2d96fa4b711af5090";
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&mode=json&units=metric&APPID=" + apiId, function (result) {
            var response = "<div class=\"box\">"
            response += "<button type=\"button\" class=\"button__close\" name=\""+result.name.toLowerCase()+"\"><span aria-hidden=\"true\">&times;</span></button>";
            response += "<h1>" + result.name + "</h1>";
            response += "<p style=\"margin-bottom: 0;margin-top: 0;font-size: 16px;\">" + result.weather[0].description;
            response += "<img class=\"img\" src='http://openweathermap.org/img/w/" + result.weather[0].icon + ".png'</p>";
            response += "<h1>" + Math.round(result.main.temp) + "&deg; C</h1>";
            response += "</div>";
            $('#cityname').val("");
            $("#boxcontainer").prepend(response);
        })
            .fail(function () {
                $('#cityname').val("");
                $(".row__alert").html("<div class='alert__notfound'>City is not found.</div>");
            });
    }
});