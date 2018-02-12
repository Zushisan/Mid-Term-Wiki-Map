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



  let map_ID = 0;
  router.post("/:id/maps", (req, res) => {

    // Map database entry
    let mapTitle = req.body.title;
    let mapLat = req.body.mapObject.lat.toString();
    let mapLng = req.body.mapObject.lng.toString();
    let mapCategory = "testing";
    let mapUserID = req.session.user_id;

    //points database entry
    let markersInfo = req.body.markersInfo;

    knex('maps')
      .returning(['id'])
      .insert({lat: mapLat, long: mapLng, title: mapTitle, category: mapCategory, user_id: mapUserID})
      .then((mapID) => {
        map_ID = mapID[0].id;
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

        return knex('user_map_contributor').insert({map_id: map_ID, user_id: mapUserID})

      }).then((results) => {
                res.json(results)
            });
  });


    router.get('/:id/maps/con', (req, res, next)=>{


    knex
    .select('*')
    .from('maps')
    .innerJoin('user_map_contributor','id','map_id')
    .where('user_map_contributor.user_id', req.params.id)
    .then((results)=>{
      console.log(results)
      res.json(results);
    })
  })




  router.get('/:id/maps/fav', (req, res, next)=>{

    knex
    .select('*')
    .from('maps')
    .innerJoin('user_map_favorite','id','map_id')
    .where('user_map_favorite.user_id', req.params.id)
    .then((results)=>{
      res.json(results);
    })
  })

// knex.from('users').innerJoin('accounts', 'users.id', 'accounts.user_id')


  router.post ('/:id/maps/:id/fav', (req, res, next)=>{

   knex
   .select('*')
   .from ('user_map_favorite')
   .where({user_id: req.body.userID, map_id: req.body.mapID})
   .then((results)=>{
     if (results == 0){
       return knex('user_map_favorite')
       .insert({user_id: req.body.userID, map_id: req.body.mapID})
        } else {
         return;
        }
     })
   .then((results)=>{
     res.status(200).send()
   })
  })










  return router;
}

// .returning(['id'])
//               .insert({lat: parseInt(markersCoord[0].latMarkerNew), long: parseInt(markersCoord[0].lngMarkerNew), title: markerTitle, description: markerDescription, img: markerImg, map_id: mapID[0].id})
