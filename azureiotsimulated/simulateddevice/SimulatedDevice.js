'use strict';

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;

var Message = require('azure-iot-device').Message;

var connectionString = 'HostName=CIS5850.azure-devices.net;DeviceId=myFirstNodeDevice;SharedAccessKey=0Gu3bijc/zLYKWae/rINMpmLBWJ/0evmQUbIr4f8/xg=';

var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

var connectCallback = function(err) {
    if (err) {
        console.log('Could not connect: ' + err);
    } else {
        console.log('Client connected');

        // Create a message and send it to the IoT Hub every second
        setInterval(function() {
            var windSpeed = 10 + (Math.random() * 20);
            var data = JSON.stringify({
                deviceId: 'myFirstNodeDevice',
                windSpeed: windSpeed
            });
            var message = new Message(data);
            console.log("Sending message: " + message.getData());
            client.sendEvent(message, printResultFor('send'));
        }, 1000);
    }
};

client.open(connectCallback);
