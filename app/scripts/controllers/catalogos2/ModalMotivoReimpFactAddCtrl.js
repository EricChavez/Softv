angular
.module('softvApp')
.controller('ModalMotivoReimpFactAddCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){

    function SaveMotivo(){
        var ObjMotivo = {
            'Bandera': 1, 
            'Descripcion': vm.Descripcion
        };
        CatalogosFactory.GetNUEMOTIVOSFACTURACANCELACION(ObjMotivo).then(function(data){
            if(data.GetNUEMOTIVOSFACTURACANCELACIONResult == 1){    
                ngNotify.set('CORRECTO, se añadió un motivo de reimpresión de factura nuevo.', 'success');
                cancel();
            }else{
                ngNotify.set('ERROR, al añadir un motivo de reimpresión de factura nuevo.', 'warn');
            }
        });
    }

    function cancel() {
        $uibModalInstance.close();
    }

    var vm = this;
    vm.Titulo = 'Nuevo Motivo de Reimpresión';
    vm.Icono = 'fa fa-plus';
    vm.SaveMotivo = SaveMotivo;
    vm.cancel = cancel;

});