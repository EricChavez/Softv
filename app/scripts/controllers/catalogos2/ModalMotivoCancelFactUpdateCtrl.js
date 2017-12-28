angular
  .module('softvApp')
  .controller('ModalMotivoCancelFactUpdateCtrl', function (CatalogosFactory, $uibModalInstance, logFactory, ngNotify, $state, Clv_motivo) {
   
    function initData(){
      var ObjMotivo = {
        'Clv_Motivo':  Clv_motivo,
        'Descripcion': '',
        'Bandera': 0,    
        'op': 0
      };
      CatalogosFactory.GetBuscaMotivosFacturaCancelada(ObjMotivo).then(function(data){
        var Motivo = data.GetBuscaMotivosFacturaCanceladaResult[0];
        vm.Descripcion = Motivo.Descripcion;
        vm.Clave = Motivo.Clv_motivo;
      });
    }

    function SaveMotivo(){
        var ObjMotivo = {
            'Clv_Motivo': vm.Clave,
            'Bandera': 0 , 
            'Descripcion': vm.Descripcion
        };
        CatalogosFactory.GetMODMOTIVOSFACTURACANCELACION(ObjMotivo).then(function(data){
            if(data.GetMODMOTIVOSFACTURACANCELACIONResult == 1){    

              var log={
                'Modulo':'home.catalogos',
                'Submodulo':'home.motivos.CancelacionFactura',
                'Observaciones':'Se editó motivo de cancelación factura ',
                'Comando':JSON.stringify(ObjMotivo),
                'Clv_afectada':vm.Clave
            };    
            logFactory.AddMovSist(log).then(function(result){ console.log('add'); });
                ngNotify.set('CORRECTO, se guardó un motivo de cancelación de factura.', 'success');
                $state.reload('home.motivos.CancelacionFactura');
                cancel();
            }else{
                ngNotify.set('ERROR, al guardar un motivo de cancelación de factura.', 'warn');
            }
        });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    vm.Titulo = ' Editar Motivo de Cancelacion de Factura';
    vm.Icono = 'fa fa-pencil-square-o';
    vm.cancel = cancel;
    vm.SaveMotivo = SaveMotivo;
    vm.blockForm = false;
    vm.blocksave = false;
    vm.blockdelete = true;
    initData();

  });