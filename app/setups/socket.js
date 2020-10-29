const SOCKET_BROKER = require('socket.io');
const EVENTOS = require('../socket/eventos').onConnection;
const Net = require('net');
const port = 8080;
const server = new Net.Server();

exports.init = (server) => {
    const IO = SOCKET_BROKER(server);
    IO.on(EVENTOS.name, EVENTOS.handler);
};
server.listen(port, function () {
  console.log('Server listening for connection requests on socket localhost: ' + port);
});
server.on('connection', function (tcpSocket) {
  console.log('A new connection has been established.');
  tcpSocket.on('data', function (trama) {
    console.log("Datos recibidos: ");
    console.log(trama.toString());
    tcpSocket.write('OK');
  });
  tcpSocket.on('end', function () {
    console.log('Closing connection with the client');
  });
  tcpSocket.on('error', function (err) {
    console.log('Error: ' + err);
    tcpSocket.end();
  });
});