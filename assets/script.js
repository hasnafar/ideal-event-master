
//Declaring Global Variables

var ZIP_CITY="";
var CATEGORY="";
var DATA; //helper to debug from console

var LONG;
var LAT;

//Getting data from user


$(".search").on("click",function(){
    ZIP_CITY=$("#zip").val();
    CATEGORY=$("#category").val();
    $("#list-results").empty();   // Clear the list every time you click search so it can be repopulated
    displayData();

})

//Displaying data

function displayData(){

    //Getting Latitude and Longitude Data From Mapbox API

    const mapboxKey="pk.eyJ1IjoiYWlqYXptIiwiYSI6ImNra2ZwcDdvZTA2ZHoydW15NjFjcTF6cmwifQ.XLBRPPbiyXBl4BIAgUr0Qw";

    var zipURL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ZIP_CITY+"/US.json?access_token=pk.eyJ1IjoiYWlqYXptIiwiYSI6ImNra2ZwcDdvZTA2ZHoydW15NjFjcTF6cmwifQ.XLBRPPbiyXBl4BIAgUr0Qw";


    $.ajax({
        async: false, //wait till data is received
        type: 'GET',
        url: zipURL,
        success: function(data) {
        LONG=data.features[0].center[0];
        LAT=data.features[0].center[1];
        }
    });


    //Creating new map

    mapboxgl.accessToken=mapboxKey;


    var map=new mapboxgl.Map({
            container: "map", //selects div id
            style: "mapbox://styles/mapbox/light-v10", //from website
            center:[LONG,LAT], //user location
            zoom: 7 //starting zoom
    });
    
    

    //Creates url for events within 30 mile radius of long and lat given + category football + sort by ascending dates

    var url="https://app.ticketmaster.com/discovery/v2/events.json?radius=30&classificationName="+CATEGORY+"&sort=date,asc&apikey=pLOeuGq2JL05uEGrZG7DuGWu6sh2OnMz&latlong="+LAT+","+LONG;

    $.get(url,function(data){
        console.log(data);
        DATA=data;

        var numberOfEvents=data._embedded.events.length;

        //Getting Data and Formatting
        for (var i=0;i<numberOfEvents;i++) {

        var name=data._embedded.events[i].name;

        var date=data._embedded.events[i].dates.start.localDate;
        date=moment(date).format('dddd,  MMMM Do');

        var startTime=data._embedded.events[i].dates.start.localTime;
        startTime=moment(startTime,"HH:mm:ss").format('LT');

        var cityName=data._embedded.events[i]._embedded.venues[0].city.name;

        var ticketUrl=data._embedded.events[i].url;

        var venueLongitude=data._embedded.events[i]._embedded.venues[0].location.longitude;
        var venueLatitude=data._embedded.events[i]._embedded.venues[0].location.latitude;

    
        //Displaying Data
        
        
        $("#list-results").append(
            "<article>"+
            "<h5>"+name+"</h5>"+
            "<h6>"+date+" "+startTime+"</h6>"+
            "<h6>"+cityName+"</h6>"+
            "<a href="+ticketUrl+" target='_blank'>Get Tickets</a>"+
            "</article>"
        );
      
        
        //Adding location markers to mapbox map

        new mapboxgl.Marker()
            .setLngLat([venueLongitude,venueLatitude])
            .setPopup(new mapboxgl.Popup().setHTML("<p>"+name+"</p>"))
            .addTo(map);
        
        
        }
        
    })

}
