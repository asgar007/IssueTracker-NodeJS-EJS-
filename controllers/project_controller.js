const Issue = require('../Models/issue');
const Project = require('../Models/project');


module.exports.home = async function(req, res){
    try{
        const projects = await Project.find({});
        return res.render('home',{
            title: 'Home',
            projects: projects
        });

    }catch(err){
        console.log('Error in Loading home Page: ',err);
    }
};

module.exports.create = async function(req, res){
    try{
        const project = await Project.findOne({ name: req.body.name });
        if(!project){
            await Project.create(req.body);
            return res.redirect('back');
        }
        else{
            // ideally should be erorr msg
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error in Creating Project: ',err);
    }
}

module.exports.projectDetails = async function(req, res){
    // load projects and issues 
    try{
        const projects = await Project.find({});
        const issues = await Issue.find({});
        return res.render('project-details',{
            title: 'project-details',
            projects: projects,
            issues: issues
        });

    }catch(err){
        console.log('Error in Loading Project details Page: ',err);
    }
}

var projectId; // not good way 
module.exports.createForm = (req, res) => {
    // console.log(req.params.id);
    projectId = req.params.id;
    return res.render('create-issue',{
        title: 'create-issue',
        projectId: projectId
    })
}

module.exports.fillForm = async (req, res) => {
    
    try{
        const issue = await Issue.findOne({ title: req.body.title });
        if(!issue){
            await Issue.create({
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                project: projectId
            });
            return res.redirect('back');
        }
        else{
            // ideally should be erorr msg
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error in Creating Issue: ',err);
    }
}