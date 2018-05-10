var map;
var dataSets = {    
    DistrictsGeoshapes: "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson",
    NeighborhoodNames: "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD",
    CrimesNY: "https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i/data",
    NYhousing: "https://catalog.data.gov/dataset/housing-new-york-units-by-building"
};
const NeighNames = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
const Geoshapes = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
var infoNeighborhood= [];

(function () {
    document.getElementById("Home").addEventListener("click", function () {
        $('#googleMapConteiner').show();
    });

    document.getElementById("Datos").addEventListener("click", function () {
        $('#googleMapConteiner').hide();

    });
})();


function getDataURL(URL){
    var data = $.get(NeighNames,function(){})
        .done(function(){
            var dataR = data.responseJSON.data;
            var coordLat,coordLng; 
            for (var i = 0; i < dataR.length; i++) {
                coordLat = dataR[i][9].split(" ")[1].split("(")[1];
                coordLng = dataR[i][9].split(" ")[2].split(")")[0];
                infoNeighborhood.push([coordLat, coordLng, dataR[i][10], dataR[i][16]]);
            }
            console.log(infoNeighborhood);

        })
        .fail(function(error){
            console.log(error);
        })
}
 
$("document").ready(function (){
    $("#getData").on("click",getDataURL)
})

function onGoogleMapResponse(){
    map = new google.maps.Map(document.getElementById('googleMapConteiner'),{
        center: {lat: 40.7291, lng: -73.9965},
        zoom: 10
    });

    map.data.loadGeoJson('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
    
    
    
    map.data.setStyle({
        fillColor: 'green',
        strokeWeight: 1
    });

    //map.data.overrideStyle(event.feature, {fillColor: 'red'});
    
    document.getElementById("marcadores").addEventListener("click", function () {

       /* var markers = infoNeighborhood.map(function(location, i) {
            location = {lat: parseFloat(infoNeighborhood[i][1]), lng: parseFloat(infoNeighborhood[i][0])};
            return new google.maps.Marker({
              position: location,
              label: infoNeighborhood[i][2]
            });
        });

        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
         */      
        var myLatLng, marker;
        for (var i = 0; i < infoNeighborhood.length; i++){
            myLatLng = {lat: parseFloat(infoNeighborhood[i][1]), lng: parseFloat(infoNeighborhood[i][0])};
            console.log(myLatLng);
            marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: infoNeighborhood[i][2]
            });
        }
        
    });
};

