'use strict';

var _ = require('lodash');
var Note = require('./note.model');

// Get list of things
exports.index = function(req, res) {
  Note.find()
  .populate('_owner', '_id name email')
  .exec(function (err, notes) {
    if(err) { return handleError(res, err); }
    return res.json(200, notes);
  });
};
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /notes              ->  index
 * POST    /notes              ->  create
 * GET     /notes/:id          ->  show
 * PUT     /notes/:id          ->  update
 * DELETE  /notes/:id          ->  destroy
 */

// Get a single thing
exports.show = function(req, res) {
  Note.findById(req.params.id)
  .populate('_owner', '_id name email')
  .exec(function (err, note) {
    if(err) { return handleError(res, err); }
    if(!note) { return res.send(404); }
    return res.json(note);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Note.create(req.body, function(err, note) {
    if(err) { return handleError(res, err); }
    return res.json(201, note);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Note.findById(req.params.id, function (err, note) {
    if (err) { return handleError(res, err); }
    if(!note) { return res.send(404); }
    var updated = _.merge(note, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, note);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Note.findById(req.params.id, function (err, note) {
    if(err) { return handleError(res, err); }
    if(!note) { return res.send(404); }
    note.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}