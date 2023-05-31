const express = require('express');
const projectController = require('../controllers/project_controller');
const router = express.Router();

router.get('/', projectController.home);
router.use('/project', require('./project'))
//any routes, access from here 

console.log('router loaded');
module.exports = router; 