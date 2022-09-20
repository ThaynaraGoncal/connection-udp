const dgram = require('dgram');
const ip = require('ip');
const client = dgram.createSocket('udp4');

client.on("message", (msg, rinfo) => {
    let message = JSON.parse(msg);

    console.log("Informacao da msg", rinfo);
    console.log("Mensagem", message);
})

client.on("listening", () => {
    const address = client.address();
    console.log(`Client listening ${address.address}: ${address.port}`)
})

// client.bind(4321);

let msg = {
    clientAddress: ip.address(),
    serverAddress: '192.168.100.22',
    command: 'capturesOpen'
}

let msgToSend = JSON.stringify(msg);

client.send(msgToSend, 0, msgToSend.length, 4999, '192.168.100.22')