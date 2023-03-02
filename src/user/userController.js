var userService = require('./userServices');

var listUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        var result = await userService.listUserDBService();

        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        }
        else {
            res.send({ "status": false, "message": "Error listando" });
        }
    }
    catch (err) {
        console.log(err)
    }
}

var createUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        var result = await userService.createUserDBService(req.body);
        console.log("status" + result);

        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    }
    catch (err) {
        res.send({ "status": false, "message": err.msg });
        
    }
}


var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        var result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var searchUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.searchUser(req.params.email);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var updateUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        var result = await userService.updateUserDBService(req.params.email, req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        }
        else {
            res.send({ "status": false, "message": result.msg });
        }
    }
    catch (error) {
        res.send({ "status": false, "message": error.msg });
    }
}

var deleteUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        var result = await userService.deleteUserDBService(req.params.email);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        }
        else {
            res.send({ "status": false, "message": result.msg });
        }
    }
    catch (error) {
        res.send({ "status": false, "message": error.msg });
    }
}


module.exports = { listUserControllerFunc, createUserControllerFunc, loginUserControllerFunc, searchUserControllerFunc, updateUserControllerFunc, deleteUserControllerFunc };