"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("points")
      .where("map_id", req.params.id)
      .then((results) => {
        let resultArray = [];
        resultArray.push(results);
        return knex
          .select("*")
          .from("maps")
          .where("id", req.params.id)
          .then((results) =>{
            resultArray.push(results);
            res.json(resultArray);
          });
    });
  });

    router.delete("/:id/points/:id", (req, res) => {
      console.log(req.body.mapID);
      console.log(req.body.pointID);


      knex('points')
      .where('id', req.body.pointID)
      .delete()
      .then((result) => {
        res.json(result);
      });

  });

     router.post("/:id/edit", (req, res) => {


    let mapLat = req.body.mapObject.lat.toString();
    let mapLng = req.body.mapObject.lng.toString();
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
      .where('id', req.body.mapID)
      .update({lat: mapLat, long: mapLng})
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

  return router;
}



