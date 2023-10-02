const App = require("../models/App");

const appList = async (req, res) => {
    const apps = await App.find({});
    res.json({
        status: "success",
        data: apps
    })
}

const createApp = async (req, res) => {
    const {appname} = req.query;
    if(appname){
        const app = await App.create({
            name: appname
        })
        return res.json({
            status: "success",
            data: app
        })
    }
    res.json({
        status: "Bad request",
        msg: "appname is required"
    })
}

module.exports = { appList, createApp }