
const net = require('net');
const { parseStateMachine, packet } = require('../protocol');

net.createServer(function (socket) {
  const psm = new parseStateMachine({
    callBack: (data) => {
      console.log(data);
      socket.write(packet('ok'));
    }
  })
  socket.on('data', psm.run.bind(psm));
  socket.on('error', (data) => {
    console.log(data)
  })
}).listen(8080);

