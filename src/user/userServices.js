var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.listUserDBService = () => {
   return new Promise(function myFn(resolve, reject) {
      userModel.find(function getresult(errorvalue, result) {
         resolve({ status: true, msg: result })
      })
   })
}

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {

      var userModelData = new userModel();

      userModelData.firstname = userDetails.firstname;
      userModelData.lastname = userDetails.lastname;
      userModelData.email = userDetails.email;
      userModelData.password = userDetails.password;
      var encrypted = encryptor.encrypt(userDetails.password);
      userModelData.password = encrypted;

      userModel.findOne({ email: userDetails.email }, function getresult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: true, msg: "Datos Invalidos" });
         }
         if (result != undefined && result != null) {
            reject({ status: true, msg: "Ese correo ya existe" });
         }
         else {



            userModelData.save(function resultHandle(error, result) {
               resolve({ status:true, msg: result });
            });
         }

      });

   });
}

module.exports.loginuserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: userDetails.email }, function getresult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "Datos Invalidos" });
         }
         else {
            if (result != undefined && result != null) {
               var decrypted = encryptor.decrypt(result.password);

               if (decrypted !== userDetails.password) {
                  resolve({ status: true, msg: "Usuario Validado" });
               }
               else {
                  reject({ status: false, msg: "Falla en validacion de usuario" });
               }
            }
            else {
               reject({ status: false, msg: "Detalles de usuario invalido" });
            }
         }
      });
   });
}

module.exports.searchUser = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {

      userModel.findOne({ email: userDetails }, function getresult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "Datos invalidos" });
         }
         else {
            if (result !== null && result.email == userDetails) {
               resolve({ status: true, msg: result })
            }
            reject({ status: true, msg: "Usuario encontrado" })
         }
      })

   })
}

module.exports.updateUserDBService = (userId, userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOneAndUpdate({ email: userId }, userDetails, function getresult(errorvalue, result) {


         if (errorvalue) {
            reject({ status: false, msg: "Datos invalidos" })
         }

         if(result == null && result == undefined){
            reject({ status: false, msg: "Usuario no encontrado" })
         }

         else {

            resolve({ status: true, msg: "Datos actualizados" });
         }


      })

   })
}

module.exports.deleteUserDBService = (userId) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOneAndDelete({ email: userId }, function getresult(errorvalue, result) {

         console.log(result)


         if (errorvalue) {
            reject({ status: false, msg: "Datos invalidos" })
         }

         if (result == null && result == undefined){
            reject({ status: false, msg: "Usuario no encontrado" })
         }

         else {

            resolve({ status: true, msg: "Usuario eliminado" });
         }


      })

   })
}