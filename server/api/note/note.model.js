'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: String,
  body: String,
  _owner: {type: Number, ref: 'User'}
});

module.exports = mongoose.model('Note', NoteSchema); 