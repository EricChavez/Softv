'use strict';

angular
    .module('softvApp')
    .controller('ModalCambioAparatosIgualCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state, ObjOrdenSer){

        function initdata(){

        }
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.cancel = cancel;
        initdata();
        console.log(ObjOrdenSer);
    });