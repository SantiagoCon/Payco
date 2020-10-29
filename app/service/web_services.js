fs = require('fs'); // Guardar las imagenes en el servidor                                            
let moment = require('moment-timezone'); //Libreria para obtener tiempo segun zona horaria            
let webModel = require('../model/web_model'); //Importa de administrative_model
var mail = require('../helpers/mail');                       
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
  await webModel.addNewMov(walletId[0].id, 0, "Wallet created",0, timestap, 1);
  return walletId[0].id;
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
  console.log("actualizando billetera")
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
  let id= await webModel.getClientIdByPhone(phone, documento);
  console.log(id)
  let amountNow = await webModel.getWalletByClientId(id[0].id);
  console.log(amountNow)
  await webModel.updateWallet(id[0].id, parseInt(amount)+parseInt(amountNow[0].monto));
  return webModel.addNewMov(amountNow[0].id, parseInt(amount)+parseInt(amountNow[0].monto), "charge account", 0, timestap, 1);
};
//consultar saldo
exports.getCash =async(phone, documento) => {
  var return_data={};
  let id= await  webModel.getClientIdByPhone(phone, documento);
  console.log(id)
  let amountNow = await webModel.getWalletByClientId(id[0].id);
  console.log("dinero: "+amountNow[0].monto)
  return_data.monto=amountNow[0].monto;
  return_data.movements= await webModel.getAllMovementsByWalletsId(amountNow[0].id);
  return return_data;
};
//pagar 
exports.newMovement = async(walletId, amount) => {
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
  var clientId= await webModel.getWalletInfo(walletId)
  console.log(clientId)
  var email = await webModel.getClientByid(clientId[0].clientId);
  console.log(email)
  var token = Math.round( Math.random() * 999999 );
  await webModel.addNewMov(walletId, amount, token, 1, timestap, 0);
  let id = await webModel.getLastIdMovement();
  return mail.sendToken.sendEmail(
   email[0].mail, 
   'Confirmacion de compra',
    email[0].name,
    token,
    id[0].id
    );
  
   
};

exports.makePayment = async(token, idMovement) => {
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
  var amount = await webModel.getMovementtInfo(token, idMovement);
  var amountNow = await webModel.getWalletInfo(amount[0].walletId);
  console.log(amountNow)
  console.log(parseInt (amountNow[0].monto) - parseInt(amount[0].movements))
  if(parseInt (amountNow[0].monto) - parseInt(amount[0].movements)>=0){
    await webModel.updateWalletByWalletId(amount[0].walletId, parseInt (amountNow[0].monto) - parseInt(amount[0].movements));
    return webModel.updateMov(token, idMovement);
  }else{
    return webModel.updateMov();
  }
};