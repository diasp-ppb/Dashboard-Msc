const fs = require('fs');
const csv = require('fast-csv');
const HashMap = require('hashmap');

/*

const vehicleLocation = "vehicleLocation.csv"

const vehicles = new HashMap();

const stream = fs.createReadStream(vehicleLocation);

const csvStream = csv
    .parse({
        delimiter:';'
    })
    .on("data", function(data){
        if(data[0] == "Vehicle ID" || data[0] != "G-10120"){
            
        }else {
         let car = data[0];
         let udpdateAt = data[1];
         let latitude = data[2];
         let longitude = data[3];
         let route = data[4];
         let direction = data[5];
         let nextStop = data[6];

         let history  = vehicles.get(car);
         
         if(history == undefined) {
            let vec =  {
                id: car,
                path: [ {
                          latitude,
                          longitude,
                          nextStop,
                          udpdateAt,
                          route,
                          direction
                        }]
            }
            vehicles.set(car, vec);
         }
         else {
             history.path.push({
                latitude,
                longitude,
                nextStop,
                udpdateAt,
                route,
                direction
                })
         }
        }
    })
    .on("end", function(){
         console.log("done");
        buildPath();
        writeToFile("processedData/compactedVehicleLocation.json", vehicles);
    });

stream.pipe(csvStream);


function test() {
};


function buildPath(){
    let routes = [];
    let currentRoute = null;
    vehicles.forEach( function(value, key) {
        let path = value.path;
        let carID = value.id;
        
        path.forEach( function(element) {

            if(currentRoute == null) {
                currentRoute = {
                    direction:  element.direction,
                    route: element.route,
                    path: [{
                        lat: element.latitude,
                        lng: element.longitude,
                        tags: [element.udpdateAt, element.nextStop],
                    }]
                }
            }
            else {
                if(currentRoute.route != element.route || currentRoute.direction != element.direction) {
                    routes.push(currentRoute);
                    currentRoute = {
                        direction:  element.direction,
                        route: element.route,
                        path: [{
                            lat: element.latitude,
                            lng: element.longitude,
                            tags: [element.udpdateAt, element.nextStop],
                        }]
                    }
                }
                else {  
                    currentRoute.path.push({
                        lat: element.latitude,
                        lng: element.longitude,
                        tags: [element.udpdateAt, element.nextStop],
                    })
                }
            }
        })
        writeToFile("processedData/" + carID +"_trips.json", routes);
    })
}
*/


///GENERATE  DELAY POINTS 

/*
const vehicleTimelines = "Green-B_routeAdhrence.csv"

const timesTracks = [];
const stream = fs.createReadStream(vehicleTimelines);

const MAX_TIME = 5*60; // 4 minutes 


const csvStream = csv
    .parse({
        delimiter:';'
    })
    .on("data", function(data){
        if(data[0] == "Vehicle ID"){
            
        }else {
         let car = data[0];
         let nextStop = data[1];
         let udpdateAt = data[2];
         let scheduledArrivel = data[3];
         let predictedArrival = data[4];
        
         if( car && nextStop && udpdateAt != 'null'  && scheduledArrivel !== 'null' && predictedArrival !== 'null' ) {
            
            let t1 = new Date(scheduledArrivel.slice(0,19) + ".00");
            let t2 = new Date(predictedArrival.slice(0,19) + ".00");

            let delayTime = (t2 - t1) / 1000 ; 

            
            if(delayTime > MAX_TIME) {
                timesTracks.push( {
                    nextStop: nextStop,
                    udpdateAt: udpdateAt,
                    delayTime: delayTime
                })        
            }
         }
        }
    })
    .on("end", function(){
        console.log("done times delay");
        
        writeToFile("processedData/timeTrackGreen_B.json", timesTracks);
        readRouteAdhrence();
    });

stream.pipe(csvStream);

function readRouteAdhrence() {
const vehicleLocation = "vehicleLocation.csv"

const geoLocated  =  [];

const stream = fs.createReadStream(vehicleLocation);
let row = 1;
const csvStream = csv
    .parse({
        delimiter:';'
    })
    .on("data", function(data){
        if(data[0] == "Vehicle ID"){
            
        }else {
         let car = data[0];
         let udpdateAt = data[1];
         let latitude = data[2];
         let longitude = data[3];
         let route = data[4];
         let direction = data[5];
         let nextStop = data[6];
        
         if( row % 50000 == 0)
             console.log(row);
         row++
         let result = timesTracks.find(function(element) {
           return  element.udpdateAt == udpdateAt && nextStop == element.nextStop;
         });
         if(result) {
            result.lat = latitude;
            result.lng = longitude;
            geoLocated.push(result);
         }

        }
    })
    .on("end", function(){
         console.log("done find geo location");
        writeToFile("processedData/delaysGeoLocated.json", geoLocated);
    });

stream.pipe(csvStream);
}



*/

const data = require('./processedData/G-10120_trips');
const data2 = require('./processedData/delaysGeoLocated');
const nodes = [];
const polylines = [];

let count = 0;

    let trips = data.data;
    let positions = data2.data2;


    for(count; count < trips.length ; count++) {
    let element = trips[count];
    let polyline = [];

    element.path.forEach(function(node) {
        polyline.push([node.lat, node.lng]);
    });

    polylines.push(polyline);

    }

    
    positions.forEach(function(element) {

        let intensity = element.delayTime;
        let lat = element.lat;
        let lng = element.lng;
        
        nodes.push( [
                     lat,
                     lng,
                     intensity
                    ]
                  );
    })

writeToFile("processedData/polylines.json", polylines);
writeToFile("processedData/nodes.json", nodes);

function writeToFile(filepath, data) {
    try {
        fs.writeFileSync(filepath, JSON.stringify(data))
      } catch (err) {
        console.error(err)
      }
}




