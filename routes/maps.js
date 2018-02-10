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

  return router;
}



