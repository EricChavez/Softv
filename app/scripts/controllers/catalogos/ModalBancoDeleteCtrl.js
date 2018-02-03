'use strict';

angular
    .module('softvApp')
    .controller('ModalBancoDeleteCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state, ObjBanco){

        function DeleteBanco(){
            CatalogosFactory.DeleteBanco(vm.IdBanco).then(function(data){
                if(data.DeleteBancoResult == -1){
                    ngNotify.set('CORRECTO, se eliminó el banco.', 'success');
                    cancel();
                }else{
                    ngNotify.set('ERROR, al eliminar el banco.', 'warn');
                    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.Banco = ObjBanco.Nombre;
        vm.IdBanco = ObjBanco.IdBanco;
        vm.DeleteBanco = DeleteBanco;
        vm.cancel = cancel;

    });