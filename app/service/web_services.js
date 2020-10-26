fs = require('fs'); // Guardar las imagenes en el servidor                                            
let moment = require('moment-timezone'); //Libreria para obtener tiempo segun zona horaria            
let webModel = require('../model/web_model'); //Importa de administrative_model                       
let dateUtils = require('../helpers/date') //Libreria para fechas diferente a moment                  
let emailUtils = require('../helpers/email') //Libreria para enviar correos                    

//Servicios para apis del cliente
exports.createClient = (name, lastName, user, pass, active, level) => {
  return webModel.createClient(name, lastName, user, pass, active, level);
};
exports.updateClient = (name, lastName, user, pass, active, level) => {
  return webModel.updateClient(name, lastName, user, pass, active, level);
};
exports.deleteClient = (id) => {
  return webModel.deleteClient(id);
};

//Servicios para apis del usuario
exports.createClient = (name, lastName, user, pass, active, level) => {
  return webModel.createClient(name, lastName, user, pass, active, level);
};
exports.updateClient = (name, lastName, user, pass, active, level) => {
  return webModel.updateClient(name, lastName, user, pass, active, level);
};
exports.deleteClient = (id) => {
  return webModel.deleteClient(id);
};