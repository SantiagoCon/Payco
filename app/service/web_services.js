fs = require('fs'); // Guardar las imagenes en el servidor                                            
let moment = require('moment-timezone'); //Libreria para obtener tiempo segun zona horaria            
let webModel = require('../model/web_model'); //Importa de administrative_model                       
//Servicios para apis del cliente
exports.createClient = async(name, lastName, user, pass, active, mail, phone, documento) => {
  //***************************** VARIABLES LOCALES *******************************
  var hoy = new Date();         //Obtiene la fecha y hora actual                  *
  var dd = hoy.getDate();       //Guarda el número de día                         *
  var mm = hoy.getMonth() + 1;  //Guarda el mes                                   *
  var yyyy = hoy.getFullYear(); //Guarda el año                                   *
  var h = hoy.getHours();       //Guarda las horas                                *
  var m = hoy.getMinutes();     //Guarda los minutos                              *
  var s = hoy.getSeconds();     //Guarda los segundos                             *
  var horaActual = "";          //Cadena con la fecha y hora actuales             *
  var today = "";               //Fecha y hora actuales                           *
  var timestap = "";            //Guarda la fecha actual con formato específico   *
  //*******************************************************************************
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  today = yyyy + '-' + mm + '-' + dd;
  horaActual = h + ":" + m + ":" + s;
  timestap = moment(today + " " + horaActual, 'YYYY-MM-DD HH:mm:ss').tz('America/Chihuahua').format('YYYY-MM-DD HH:mm:ss');
  await webModel.createClient(name, lastName, user, pass, active, mail, phone, documento);
  let idClient= await webModel.getLastIdClient();
  await webModel.createWallet(idClient[0].id, timestap);
  let walletId=await webModel.getLastIdWallet();
  return webModel.addNewMov(walletId[0].id, 0, "Wallet created",0, timestap, 1);
};
exports.updateClient = (name, lastName, user, pass, active, mail, phone, documento) => {
  return webModel.updateClient(name, lastName, user, pass, active, mail, phone, documento);
};
exports.deleteClient = (id) => {
  return webModel.deleteClient(id);
};

//Servicios para apis del usuario
exports.createUser = (name, lastName, user, pass, active, level) => {
  return webModel.createUser(name, lastName, user, pass, active, level);
};
exports.updateUser = (name, lastName, user, pass, active, level) => {
  return webModel.updateUser(name, lastName, user, pass, active, level);
};
exports.deleteUser = (id) => {
  return webModel.deleteUser(id);
};

//Recargar billetera
exports.updateWallet = async(phone, documento, amount) => {
  //***************************** VARIABLES LOCALES *******************************
  var hoy = new Date();         //Obtiene la fecha y hora actual                  *
  var dd = hoy.getDate();       //Guarda el número de día                         *
  var mm = hoy.getMonth() + 1;  //Guarda el mes                                   *
  var yyyy = hoy.getFullYear(); //Guarda el año                                   *
  var h = hoy.getHours();       //Guarda las horas                                *
  var m = hoy.getMinutes();     //Guarda los minutos                              *
  var s = hoy.getSeconds();     //Guarda los segundos                             *
  var horaActual = "";          //Cadena con la fecha y hora actuales             *
  var today = "";               //Fecha y hora actuales                           *
  var timestap = "";            //Guarda la fecha actual con formato específico   *
  //*******************************************************************************
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  today = yyyy + '-' + mm + '-' + dd;
  horaActual = h + ":" + m + ":" + s;
  timestap = moment(today + " " + horaActual, 'YYYY-MM-DD HH:mm:ss').tz('America/Chihuahua').format('YYYY-MM-DD HH:mm:ss');
  let amountNow = webModel.getAmount(phone, documento);
  await webModel.updateWallet(phone, documento, amount+amountNow[0].amount);
  let walletId=await webModel.getIdWalletByPhone(phone, documento);
  return webModel.addNewMov(walletId[0].id, amount+amountNow[0].amount, "charge account", 0, timestap, 1);
};
//consultar saldo
exports.getCash =(phone, documento) => {
  return webModel.getAmount(phone, documento);
};