var express = require('express');
var router = express.Router();

var trackController = require('../controllers/track_controller');

/* RUTAS API */
var router = express.Router();

router.post('/tracks',            trackController.addTrack);

router.get('/tracks/:name'        trackController.findTrackByName)
router.post('/tracks/:name',      trackController.deleteTrackByName);

module.exports = router;	