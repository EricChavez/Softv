'use strict';

angular
    .module('softvApp')
    .controller('ModalCiudadEliminarCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state,logFactory, IdMunicipio){

        function initData(){
            CatalogosFactory.GetMuestraCiudadById(IdMunicipio).then(function(data){
                var Ciudad = data.GetMuestraCiudadByIdResult[0];
                vm.IdCiudad = Ciudad.Clv_Ciudad;
                vm.Ciudad = Ciudad.Nombre;
            });
            var ObjMunicipio = {
                'Op': 3,
                'Clv_Ciudad': IdMunicipio 
            };
            CatalogosFactory.GetMuestraRelEdoCd(ObjMunicipio).then(function(data){
                vm.RelEstList = data.GetMuestraRelEdoCdResult;
            });
        }

        function DeleteCiudad(){
            if(vm.RelEstList.length == 0){
                CatalogosFactory.DeleteCiudades_New(vm.IdCiudad).then(function(data){
                    if(data.DeleteCiudades_NewResult == -1){
                        ngNotify.set('CORRECTO, se eliminó la ciudad.', 'success');
                        var log={
                            'Modulo':'home.catalogos',
                            'Submodulo':'home.catalogos.ciudades',
                            'Observaciones':'Se eliminó registro ',
                            'Comando':'',
                            'Clv_afectada':vm.IdCiudad
                        };
    
                        logFactory.AddMovSist(log).then(function(result){ console.log('add'); });
                        cancel();
                    }else{
                        ngNotify.set('ERROR, al eliminar la ciudad.', 'warn');
                        /*$state.reload('home.catalogos.ciudades');*/
                        cancel();
                    }
                });
            }else{
                ngNotify.set('ERROR, No se puede eliminar, la ciudad cuenta con una o más relaciones.', 'warn');
            }
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.cancel = cancel;
        vm.DeleteCiudad = DeleteCiudad;
        initData();
    });