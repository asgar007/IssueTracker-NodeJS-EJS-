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
module.exports.createForm = async (req, res) => {
    // console.log(req.params.id);
    projectId = req.params.id;
    const project = await Project.findOne({_id: projectId});
    return res.render('create-issue',{
        title: 'create-issue',
        project: project
    })
}

module.exports.fillForm = async (req, res) => {
    // console.log(req.project);
    try{
        const issue = await Issue.findOne({ title: req.body.title });
        if(!issue){
            await Issue.create({
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                // labels: [
                //     req.body.labels
                // ],
                project: projectId
                // project: req.project._id
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

module.exports.filter = async function(req, res){
    try{
        let filterValue = req.body.radioName;
        // console.log(filterValue);
        let projects;
        if(filterValue == 'description'){
            projects = await Project.find({})
            .sort({description: 1});
        }
        else if(filterValue == 'author'){
            projects = await Project.find({})
            .sort({author: 1});
        }
        else{
            projects = await Project.find({})
            .sort({name: 1})
        }
        // .sort({ req.body : 1 });

        const issues = await Issue.find({});
        return res.render('project-details',{
            title: 'project-details',
            projects: projects,
            issues: issues
        })

    }catch(err){
        console.log('Error in filtering projects: ',err);
    }
}

