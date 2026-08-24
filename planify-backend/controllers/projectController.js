const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const newProject = new Project({
            ...req.body,
            owner: req.user.id
        });
        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user.id });
        res.json(projects);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};