var promiseMysql = require('promise-mysql');
var dbconfig = require('../setups/database');

var connectionPool = promiseMysql.createPool(dbconfig.connection);
connectionPool.query('USE ' + dbconfig.database); // TODO: Esta linea vuelve a confirmar cual es la DB que vamos a utilizar, hay que ver si es necesaria o no

//TODO: meter id como default
//Modales para apis del cliente
exports.createClient = (name, lastName, user, pass, active, mail, phone, documento ) => {
  let statement = 'insert into payco.clients (name, lastName, user, pass, active, mail, phone, documento) values (?, ?, ?, ?, ?, ?, ?, ?)';
  return connectionPool.query(statement,[name, lastName, user, pass, active, mail, phone, documento]);
};
exports.updateClient = (name, lastName, user, pass, active, mail, phone, documento) => {
  let statement = 'update payco.clients set name=?, lastName=?, user=?, pass=?, active=?, mail=?, phone=?, documento=?';
  return connectionPool.query(statement,[name, lastName, user, pass, active, mail, phone, documento]);
};
exports.deleteClient = (id) => {
  let statement = 'delete from payco.clients where id=?';
  return connectionPool.query(statement,[id]);
};
exports.getLastIdClient=()=>{
  let statement = 'select id from payco.clients ORDER BY id DESC LIMIT 1'; 
  return connectionPool.query(statement)
}
exports.getClientIdByPhone=(phone, documento)=>{
  let statement = 'select id from payco.clients where documento=? and phone=?'; 
  console.log(statement,[ documento,phone])
  return connectionPool.query(statement,[ documento,phone])
};
exports.getClientByid=(id)=>{
  let statement = 'select * from payco.clients where id=?'; 

  return connectionPool.query(statement,[ id])
};
//Modales para apis del usuario
exports.createUser = (name, lastName, user, pass, active, level) => {
  let statement = 'insert into payco.users (name, lastName, user, pass, active, level) values (?, ?, ?, ?, ?, ?)';
  return connectionPool.query(statement,[name, lastName, user, pass, active, level]);
};
exports.updateUser = (name, lastName, user, pass, active, level) => {
  let statement = 'update payco.users set name=?, lastName=?, user=?, pass=?, active=?, level=? ';
  return connectionPool.query(statement,[name, lastName, user, pass, active, level]);
};
exports.deleteUser = (id) => {
  let statement = 'delete from payco.users where id=?';
  return connectionPool.query(statement,[id]);
};
//movimientos en wallet
exports.createWallet = ( clientId, lasAct) => {
  let statement = 'insert into payco.wallets (id, clientId, monto, lastAct) values (DEFAULT, ?, 0, ? )';
  return connectionPool.query(statement,[ clientId, lasAct]);
};
exports.updateWallet = (id, amount) => {
  let statement = 'update payco.wallets set monto=? where clientId=? ';
  return connectionPool.query(statement,[amount, id ]);
};
exports.updateWalletByWalletId = (id, amount) => {
  let statement = 'update payco.wallets set monto=? where id=? ';
  return connectionPool.query(statement,[amount, id ]);
};
exports.getLastIdWallet=()=>{
  let statement = 'select id from payco.wallets ORDER BY id DESC LIMIT 1'; 
  return connectionPool.query(statement)
}
exports.addNewMov = ( walletId, movements, descs, type, timestap, status) => {
  let statement = 'insert into payco.movements (id, walletId, movements, descs, type, timestap, status) values (DEFAULT, ?, ?, ?, ?, ?, ? )';
  return connectionPool.query(statement,[walletId, movements, descs,type, timestap, status]);
};

//Recargar billetera

exports.getWalletByClientId=(id )=>{
  let statement = 'select * from payco.wallets where clientId=? '; 
  return connectionPool.query(statement,[id])
}
exports.getWalletInfo=(walletId)=>{
  let statement = 'select * from payco.wallets where id=?'; 
  return connectionPool.query(statement,[walletId])
}
exports.getMovementtInfo = (token, idMovement) => {
  let statement = 'select * from payco.movements where descs = ? and id = ? ';
  return connectionPool.query(statement,[token, idMovement]);
};
exports.updateMov = (token, idMovement) => {
  let statement = 'update payco.movements set status=1 where descs = ? and id = ? ';
  return connectionPool.query(statement,[token, idMovement]);
};
exports.getLastIdMovement=()=>{
  let statement = 'select * from payco.movements ORDER BY id DESC LIMIT 1'; 
  return connectionPool.query(statement)
}
exports.getAllMovementsByWalletsId=(id)=>{
  let statement = 'select * from payco.movements where walletId=? ORDER BY id DESC '; 
  return connectionPool.query(statement,[id])
}