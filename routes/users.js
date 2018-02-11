"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/:id/maps", (req, res) => {

    // console.log(req.body)
    // Map database entry
    let mapTitle = req.body.title;
    let mapLat = req.body.mapObject.lat.toString();
    let mapLng = req.body.mapObject.lng.toString();
    let mapCategory = "testing";
    let mapUserID = 4;

    //points database entry
    let markersInfo = req.body.markersInfo;
    // let markerLat = '';
    // let markerLng = '';
    // let markerTitle = "All the markers title";
    // let markerDescription = "I am a marker description";
    //let markerImg = "I am an img ???";

    knex('maps')
      .returning(['id'])
      .insert({lat: mapLat, long: mapLng, title: mapTitle, category: mapCategory, user_id: mapUserID})
      .then((mapID) => {
        let markersInsert = [];
        for(let markerKey in markersInfo){
          let markerObject = markersInfo[markerKey];
          let futurMarkerObject = {}

          futurMarkerObject.lat = markerObject.latMarkerNew.toString();
          futurMarkerObject.long = markerObject.lngMarkerNew.toString();
          futurMarkerObject.title = markerObject.newValue;
          futurMarkerObject.description = markerObject.newValueDesc;
          futurMarkerObject.img = markerObject.newValueImage;
          futurMarkerObject.map_id = mapID[0].id;

          markersInsert.push(futurMarkerObject);
        }

        return knex('points')
                .returning(['id'])
                .insert(markersInsert)
      }).then((results) => {

                res.json(results)
            });
  });

    // first insert the map, ID, COORD, USER ID, TITLE
    // THEN FOR EACH MARKER, INSERT WITH THE MAP ID


  return router;
}

// .returning(['id'])
//               .insert({lat: parseInt(markersCoord[0].latMarkerNew), long: parseInt(markersCoord[0].lngMarkerNew), title: markerTitle, description: markerDescription, img: markerImg, map_id: mapID[0].id})
