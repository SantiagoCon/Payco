
let connectionPool = require('../setups/database').connectionPool;


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