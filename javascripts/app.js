/**
* SETUP
**/
var app = app || {};


/**
* MODELS
**/
app.Message = Backbone.Model.extend({
    url: function() {
         return 'https://iot.seeed.cc/v1/node/GroveTempHumD2/humidity?access_token=737bd86ee50a6e345251ba656343df20';
    },
    id: null,
    defaults: {
        success: false,
        errfor: {},
        coord: {
          lat: 25.048467,
          lon: 121.553963
        },
        main: {
            humidity: 0
        }
    }
});

/**
* VIEWS
**/
app.ContentView = Backbone.View.extend({
    el: '#map',
    events: {
    },
    // constructor
    initialize: function() {
        this.model = new app.Message();
        this.model.bind('change', this.render, this);

        this.model.fetch({
            success: function(model, response, options) {
                model.set('main', response)
            }
        });
    },
    render: function() {
        var coord = this.model.get('coord');
        var myLatLng = {lat: coord.lat, lng: coord.lon};

        var humidity = this.model.get('main').humidity;

        var map = new google.maps.Map(this.el, {
          zoom: 16,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Humidity: ' + humidity + '%'
        });
    }
});

$(document).ready(function(){
    app.contentView = new app.ContentView();
});
