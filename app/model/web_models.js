
let connectionPool = require('../setups/database').connectionPool;

//TODO: meter id como default
//Modales para apis del cliente
exports.createClient = (name, lastName, user, pass, active, mail, phone, documento ) => {
  let statement = 'insert into payco.clients (name, lastName, user, pass, active,mail, phone, documento) values (?, ?, ?, ?, ?, ?, ?, ?)';
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
  let statement = 'select id from pyco.clients ORDER BY id DESC LIMIT 1'; 
  return connectionPool.query(statement)
}
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
  let statement = 'insert into payco.wallets (id, clientId, monto, lasAct) values (DEFAULT, ?, 0, ? )';
  return connectionPool.query(statement,[ clientId, lasAct]);
};
exports.updateWallet = (phone, documento, amount) => {
  let statement = 'update payco.users set amount=? where documento=? and phone=? ';
  return connectionPool.query(statement,[amount, documento, phone ]);
};
exports.getLastIdWallet=()=>{
  let statement = 'select id from payco.wallets ORDER BY id DESC LIMIT 1'; 
  return connectionPool.query(statement)
}
exports.addNewMov = ( walletId, movements, desc, type, timestap, status) => {
  let statement = 'insert into payco.movements (id, walletId, movements, desc, type, timestap, status) values (DEFAULT, ?, ?, ?, ?, ?, ? )';
  return connectionPool.query(statement,[walletId, movements, desc,type, timestap, status]);
};

//Recargar billetera
exports.getAmount=(phone, documento)=>{
  let statement = 'select amount from payco.wallets where documento=? and phone=?'; 
  return connectionPool.query(statement,[documento,phone])
}
exports.getIdWalletByPhone=(phone, documento)=>{
  let statement = 'select id from payco.wallets where documento=? and phone=?'; 
  return connectionPool.query(statement,[documento,phone])
}
exports.getWalletInfo=(walletId)=>{
  let statement = 'select * from payco.wallets where wallet_id=?'; 
  return connectionPool.query(statement,[walletId])
}
exports.updateWallet = (token, idMovement) => {
  let statement = 'update payco.movements set status=1 where token = ?, idMovement = ? ';
  return connectionPool.query(statement,[token, idMovement]);
};