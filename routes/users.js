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

  router.post("/4/maps", (req, res) => {

    // console.log(req.body)
    // Map database entry
    let mapTitle = req.body.title;
    let mapLat = parseInt(req.body.mapObject.lat);
    let mapLng = parseInt(req.body.mapObject.lng);
    let mapCategory = "testing";
    let mapUserID = 4;

    //points database entry
    let markersCoord = req.body.markersCoord;
    let markerLat = 0;
    let markerLng = 0;
    let markerTitle = "All the markers title";
    let markerDescription = "I am a marker description";
    let markerImg = "I am an img ???";

    knex('maps')
      .returning(['id'])
      .insert({lat: mapLat, long: mapLng, title: mapTitle, category: mapCategory, user_id: mapUserID})
      .then((mapID) => {
        let markersInsert = [];
        for(let markerObject of markersCoord){
          let futurMarkerObject = {}

          futurMarkerObject.lat = parseInt(markerObject.latMarkerNew);
          futurMarkerObject.long = parseInt(markerObject.lngMarkerNew);
          futurMarkerObject.title = markerTitle;
          futurMarkerObject.description = markerDescription;
          futurMarkerObject.img = markerImg;
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
