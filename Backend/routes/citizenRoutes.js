const express = require('express');
const router = express.Router();
const {
  getCitizens,
  deleteCitizen,
} = require('../controllers/citizenController');

router.route('/').get(getCitizens);
router.route('/:id').delete(deleteCitizen);

module.exports = router;
