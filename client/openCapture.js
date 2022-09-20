const dgram = require('dgram');
const ip = require('ip');
const client = dgram.createSocket('udp4');

let msg = {
    clientAddress: ip.address(),
    serverAddress: '192.168.100.22',
    command: 'openCapture'
}

let msgToSend = JSON.stringify(msg);

client.send(msgToSend, 0, msgToSend.length, 4999, '192.168.100.22')