const express = require('express');
const router = express.Router();

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

router.get('/ds', (req, res) => {

    var socket = req.app.get('socketio');
    socket.emit('new-message', { message: "this is from api" });
    var spawn = require('child_process').spawn;


    var child = spawn('ansible-playbook', ['-i', 'inventories/hosts', 'launchbag_datascience.yml'], {cwd: '/home/rts/apps/launchbag'});

    var chunk = '';
    child.stdout.on("data", function(data) {
        chunk += data;
        socket.emit('ds', chunk);
    });
    child.stderr.on("data", function(data) {
        console.log("ps stderr: " + data);
    })

    response.data = {"users": "many"};
    res.json(response);
});

router.get('/elk', (req, res) => {
    
        var socket = req.app.get('socketio');
        socket.emit('new-message', { message: "this is from api" });
        var spawn = require('child_process').spawn;
    
    
        var child = spawn('ansible-playbook', ['-i', 'inventories/hosts', 'launchbag_elk.yml'], {cwd: '/home/rts/apps/launchbag'});
    
        var chunk = '';
        child.stdout.on("data", function(data) {
            chunk += data;
            socket.emit('elk', chunk);
        });
        child.stderr.on("data", function(data) {
            console.log("ps stderr: " + data);
        })
    
        response.data = {"users": "many"};
        res.json(response);
    });

module.exports = router;
