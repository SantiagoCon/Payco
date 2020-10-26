let Router = require('express').Router;
let webServices = require('../../service/web_services');


const ROUTER = Router();
//Servicios REST para usuarios
ROUTER.post('/createUser', (req, res)=>{
  webServices.createClient(req.body.name, req.body.lastName, req.body.user, req.body.pass, req.body.active,
      req.body.level).then((data)=>{
          res.status(200);
          res.json({message: 'User created succesfully'});
      }).catch((err)=>{
          console.log(err);
          res.status(500);
          res.json({ message: "Error when creating User" });
      });
});
ROUTER.put('/updateUser', (req, res)=>{
  webServices.updateClient(req.body.name, req.body.lastName, req.body.user, req.body.pass, req.body.active,
    req.body.level).then((data)=>{
          res.status(200);
          res.json({message: 'User updated succesfully'});
      }).catch((err)=>{
          console.log(err);
          res.status(500);
          res.json({ message: "Error when updating User" });
      });
});
ROUTER.delete('/deleteUser', (req, res)=>{
  webServices.deleteClient(req.body.id).then((data)=>{
          res.status(200);
          res.json({message: 'User deleted succesfully'});
      }).catch((err)=>{
          console.log(err);
          res.status(500);
          res.json({ message: "Error when deleting User" });
      });
});

 //Servicios REST para clientes
 ROUTER.post('/createClient', (req, res)=>{
  webServices.createClient(req.body.name, req.body.lastName, req.body.user, req.body.pass, req.body.active,
    req.body.email, req.body.phone, req.body.documento).then((data)=>{
          res.status(200);
          res.json({message: 'Client created succesfully'});
      }).catch((err)=>{
          console.log(err);
          res.status(500);
          res.json({ message: "Error when creating Client" });
      });
});
ROUTER.put('/updateClient', (req, res)=>{
  webServices.updateClient(req.body.name, req.body.lastName, req.body.user, req.body.pass, req.body.active,
    req.body.email, req.body.phone, req.body.documento).then((data)=>{
          res.status(200);
          res.json({message: 'Client updated succesfully'});
      }).catch((err)=>{
          console.log(err);
          res.status(500);
          res.json({ message: "Error when updating Client" });
      });
});
ROUTER.delete('/deleteClient', (req, res)=>{
  webServices.deleteClient(req.body.id).then((data)=>{
          res.status(200);
          res.json({message: 'Client deleted succesfully'});
      }).catch((err)=>{
          console.log(err);
          res.status(500);
          res.json({ message: "Error when deleting Client" });
      });
});

//Recargar billetera
ROUTER.put('/updateWallet', (req, res)=>{
  webServices.updateWallet(req.body.phone, req.body.documento, req.body.amount).then((data)=>{
          res.status(200);
          res.json({message: 'Wallet updated succesfully'});
      }).catch((err)=>{
          console.log(err);
          res.status(500);
          res.json({ message: "Error when updating Wallet" });
      });
});
//consultar saldo
ROUTER.get('/getCash', (req, res)=>{
  webServices.getCash(req.body.phone, req.body.documento).then((data)=>{
          res.status(200);
          res.json({amount: data[0].amount });
      }).catch((err)=>{
          console.log(err);
          res.status(500);
          res.json({ message: "Error when updating Wallet" });
      });
});
exports.router = ROUTER;


