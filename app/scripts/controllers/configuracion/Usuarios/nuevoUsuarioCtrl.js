'use strict';
angular
  .module('softvApp')
  .controller('nuevoUsuarioCtrl', function ($state, usuarioFactory, globalService,ngNotify ,$uibModal, $filter, rolFactory, encuestasFactory) {

    this.$onInit = function () {
      rolFactory.GetRolList().then(function (data) {
        vm.Roles = data.GetRolListResult;
        usuarioFactory.GetConsultaIdentificacionUsuario(0, '').then(function (result) {
          vm.Indentificaciones = result.GetConsultaIdentificacionUsuarioResult;
          encuestasFactory.GetMuestra_DistribuidoresEncList().then(function (data) {
            vm.distribuidores = data.GetMuestra_DistribuidoresEncListResult;
          });
        });
      });
    };

    function muestraplazas() {
      encuestasFactory.Muestra_PlazaEnc(vm.distribuidor.Clv_Plaza).then(function (data) {
        console.log(data.GetMuestra_PlazaEncListResult);
        vm.plazas = data.GetMuestra_PlazaEncListResult;
      });

    }

    function agregaRelacion() {

      usuarioFactory.GetAgregaEliminaRelCompaniaUsuario(vm.IdUser, vm.plaza.id_compania, 1)
        .then(function (response) {
          ngNotify.set('Relación agregada','success');
          usuarioFactory.GetAgregaEliminaRelCompaniaUsuario(vm.IdUser, 0, 3)
            .then(function (result) {
              vm.relaciones = result.GetAgregaEliminaRelCompaniaUsuarioResult;
            });
        });  
    }

    function eliminarelacion(x) {
      usuarioFactory.GetAgregaEliminaRelCompaniaUsuario(vm.IdUser, x.id_compania, 2)
        .then(function (response) {
          ngNotify.set('Se eliminó la relación','warn');
          usuarioFactory.GetAgregaEliminaRelCompaniaUsuario(vm.IdUser, 0, 3)
            .then(function (result) {
              vm.relaciones = result.GetAgregaEliminaRelCompaniaUsuarioResult;

            });
        });
    }



    function Guardar() {

      var Parametros = {
        'Clave': 0,
        'Clv_Usuario': vm.Clave,
        'Domicilio': '',
        'Colonia': '',
        'FechaIngreso': $filter('date')(vm.fechaingreso, 'dd/MM/yyyy'),
        'FechaSalida': $filter('date')(vm.fechabaja, 'dd/MM/yyyy'),
        'Activo': vm.activo,
        'Pasaporte': vm.pass2,
        'Clv_TipoUsuario': vm.rol.IdRol,
        'CATV': false,
        'Facturacion': true,
        'Boletos': false,
        'Mizar_AN': 0,
        'RecibeMensaje': vm.recibemensaje,
        'NotaDeCredito': 0,
        'Clv_IdentificacionUsuario': vm.identificacion.Clave,
        'RecibeMensajeDocumentos': 0,
        'Nombre': vm.Nombre
      };

      usuarioFactory.GetAddUsuarioSoftv(Parametros).then(function (data) {
        vm.IdUser = data.GetAddUsuarioSoftvResult.Clave;
        vm.blockForm=true;
        vm.blockrelaciones=false;
        vm.blocksave = true;

        ngNotify.set('El usuario se ha guardado correctamente ,ahora puedes asignar el acesso a distribuidores/plazas','success');
      });
    }


    var vm = this;
    vm.Guardar = Guardar;
    vm.muestraplazas = muestraplazas;
    vm.agregaRelacion = agregaRelacion;
    vm.eliminarelacion = eliminarelacion;
    vm.IdUser = 0;
    vm.blockForm=false;
    vm.blockrelaciones=true;
    vm.titulo='Nuevo usuario';
    vm.blocksave = false;
    vm.oculta=true;
  
  });
