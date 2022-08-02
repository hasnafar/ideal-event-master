var DATA;
const mapboxKey="pk.eyJ1IjoiYWlqYXptIiwiYSI6ImNra2ZwcDdvZTA2ZHoydW15NjFjcTF6cmwifQ.XLBRPPbiyXBl4BIAgUr0Qw";
var url="https://app.ticketmaster.com/discovery/v2/events.json?radius=30&sort=date,asc&apikey=pLOeuGq2JL05uEGrZG7DuGWu6sh2OnMz";


mapboxgl.accessToken=mapboxKey;


        var map=new mapboxgl.Map({
                container: "map", //selects div id
                style: "mapbox://styles/mapbox/light-v10", //from website
                center:[-74.484247,40.450363], //user location
                zoom: 9 //starting zoom
        });


        $.get(url,function(data){
            console.log(data);
            DATA=data;
})


