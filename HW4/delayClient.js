
const net = require('net');
const { parseStateMachine, packet } = require('./protocol');

function test() {
  const socket = net.connect({ port: 8080 });
  socket.on('error', (data) => {
    console.log(data);
  });
  const psm = new parseStateMachine({
    callBack: (data) => {
      console.log('receiver: ', data);
    }
  })
  socket.on('data', psm.run.bind(psm));
  let data = packet('1');
  let i = 0;
  const id = setInterval(() => {
    if (!data.length) {
      socket.end();
      return clearInterval(id);
    }
    const packet = data.slice(0, 1);
    socket.write(packet);
    data = data.slice(1);
  }, 500);
}

test()