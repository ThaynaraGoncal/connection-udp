let dgram = require('dgram');
let server = dgram.createSocket("udp4");

let capturesOpen = [];
 
server.on("message", function (msg, rinfo) {
  let message = JSON.parse(msg);

  console.log("###########################");
  console.log("Informacaoes da msg", rinfo);
  console.log("Mensagem recebida: ", message);

  switch(message.command) {
    case 'capturesOpen':
      sendCapturesOpen(message.ipClient, rinfo.port);
      break;
    case 'openCapture':
      openCapture(message.ipClient);
      break;
  }
    
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening
      ${address.address}:${address.port}`);

});

server.bind(1234);

function sendCapturesOpen(ipClient, portClient) {
  console.log("ip do cliente", ipClient);

  let msg = {
    capturesOpen: capturesOpen
  }

  let message = JSON.stringify(msg);

  server.send(message, 0, message.length, portClient, ipClient);
  
  console.log("CAPTURES OPEN: ", capturesOpen);
}

  function openCapture(ipClient) {
  if(!capturesOpen.length) {
    capturesOpen.push(ipClient)
  } else {
    let indexCapture = capturesOpen.indexOf(ipClient);

    if(indexCapture < 0) {
      capturesOpen.push(ipClient);
    }
  }
  
  console.log("CAPTURES OPEN: ", capturesOpen);
}

// sendCapturesOpen('192.168.100.21')

 