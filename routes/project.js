const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller');
// const Project = require('../Models/project');

router.get('', (req, res)=>{
    return res.render('project',{
        title: 'create-project'
    });
});

router.post('/create', projectController.create);
router.get('/details', projectController.projectDetails);
router.get('/create-issue/:id', projectController.createForm);
router.post('/issue-form', projectController.fillForm);
router.post('/refine', projectController.filter);

module.exports = router; 