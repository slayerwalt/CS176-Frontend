
const net = require('net');
const { parseStateMachine, packet } = require('../protocol');
async function test() {
  const socket = net.connect({ port: 8080 });
  socket.on('error', (data) => {
    console.log(data);
  });
  const psm = new parseStateMachine({
    callBack: (data) => {
      console.log(data);
    }
  })
  socket.on('data', psm.run.bind(psm));
  let i = 0;
  const timer = setInterval(() => {
    socket.write(packet(String(i + 1)));
    i++ > 5 && (socket.end(), clearInterval(timer));
  }, 1000)
}

test()