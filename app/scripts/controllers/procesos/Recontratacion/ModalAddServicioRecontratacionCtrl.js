'use strict';

angular
    .module('softvApp')
    .controller('ModalAddServicioRecontratacionCtrl', function(RecontratacionFactory, CatalogosFactory, CatalogosRedIPFactory, $uibModalInstance, $uibModal, ngNotify, $state, $localStorage, ObjCliente){
        
        function initData(){
            CatalogosFactory.GetMuestraTipSerPrincipal_SERList().then(function(data){
                vm.TipoServicioList = data.GetMuestraTipSerPrincipal_SERListResult;
            });
            var ObjCliente2 = {
                'Op': 0,
                'IdContrato': ObjCliente.IdContrato,
                'ContratoCompania': ''
            };
            console.log(ObjCliente2);
            RecontratacionFactory.GetInfoContratoEnBaja(ObjCliente2).then(function(data){
                console.log(data);
                var Cliente = data.GetInfoContratoEnBajaResult;
                vm.IdContrato = Cliente.CONTRATO;
                vm.IdCompania = Cliente.IdCompania;
                vm.Clv_Estado = Cliente.Clv_Estado;
                vm.Clv_Ciudad = Cliente.Clv_Ciudad;
                vm.Clv_Localidad = Cliente.Clv_Localidad;
                vm.Clv_Colonia = Cliente.Clv_Colonia;
                GetMedioList();
            });
        }

        function GetServiciosList(){
            if(vm.TipoServicio != undefined){
                vm.ServicioList = null;
                vm.AparatoList = null;
                vm.AparatosRecon = null;
                vm.ViewAparatos = false;
                vm.Medio = vm.MedioList[vm.MR];
                var Obj = {
                    'IdContrato': vm.IdContrato,
                    'Clv_TipSer': vm.TipoServicio.Clv_TipSerPrincipal
                };
                RecontratacionFactory.GetServiciosEnBaja(Obj).then(function(data){
                    console.log(data);
                    vm.ServicioList = data.GetServiciosEnBajaResult;
                });
            }else{
                vm.ServicioList = null;
                vm.AparatoList = null;
                vm.AparatosRecon = [];
                vm.ViewAparatos = false;
                vm.Medio = vm.MedioList[vm.MR];
            }
        }

        function SetServicio(){
            vm.AparatoList = null;
            vm.AparatosRecon = [];
            vm.ViewAparatos = false;
            vm.Medio = vm.MedioList[vm.MR];
        }

        function GetMedioList(){
            var ObjMedioList = {
                'Clv_Ciudad': vm.Clv_Ciudad,
                'Clv_Localidad': vm.Clv_Localidad,
                'Clv_Colonia': vm.Clv_Colonia,
            };
            console.log(ObjMedioList);
            CatalogosRedIPFactory.GetCatMedioByCiuLocCol(ObjMedioList).then(function(data){
                console.log(data);
                vm.MedioList = data.GetCatMedioByCiuLocColResult;
                vm.MedioList.push(MedioList);
                for(var i = 0; vm.MedioList.length > i; i ++){
                    if(vm.MedioList[i].IdMedio == 0){
                        vm.Medio = vm.MedioList[i];
                        vm.MR = i;
                        break
                    }
                }
                var count = 0;
                for (var i = 0; vm.MedioList.length > i; i ++){
                    if(vm.MedioList[i].Activo == 1){
                        count = count + 1;
                    }
                }
                if(count == 1){
                    vm.BlokMedioInst = true;
                    for (var i = 0; vm.MedioList.length > i; i ++){
                        if(vm.MedioList[i].Activo == 1){
                            vm.Medio = vm.MedioList[i];
                            break
                        }
                    }
                }
            });
        }

        function GetAparatoList(){
            vm.AparatoList = null;
            vm.AparatosRecon = [];
            vm.ViewAparatos = false;
            var ObjDet = {
                'ClvTipoServ': vm.TipoServicio.Clv_TipSerPrincipal,
                'Clv_Unicanet': vm.Servicio.Clv_UnicaNet,
                'IdMedio': (vm.Medio != undefined)? vm.Medio.IdMedio:0
            };
            console.log(ObjDet);
            RecontratacionFactory.GetListaAparatosEnBaja(ObjDet).then(function(data){
                console.log(data);
                vm.AparatoList = data.GetListaAparatosEnBajaResult;
                vm.ViewAparatos = (vm.AparatoList.length > 0)? true:false;
            });
            vm.AparatosRecon = [];
        }

        function SetAparatoList(){
            vm.ViewList = (vm.AparatosRecon.length > 0)? true:false;
        }

        function AddAparatoRecon(){
            if(vm.Aparato != undefined){
                if(ValidAparato(vm.Aparato.Clv_CableModem) == false){
                    /*console.log(AparatoReconTmp);*/
                    var AparatoReconListTmp = {
                        'MacCableModem': vm.Aparato.MacCableModem,
                        'IdArticulo': vm.Aparato.IdArticulo
                    };
                    var AparatoReconTmp = {
                        'ClvSession': vm.ClvSession,
                        'Clv_Cablemodem': vm.Aparato.Clv_CableModem,
                        'ContratoNet': vm.Aparato.ContratoNet,
                        'Clv_Unicanet': vm.Servicio.Clv_UnicaNet,
                        'ClvTipoServ': vm.TipoServicio.Clv_TipSerPrincipal,
                        'Clv_Servicio': vm.Servicio.Clv_Servicio,
                        'ClvOrden': 0,
                        'ClvDetalleOrd': 0
                    };
                    vm.AparatosReconList.push(AparatoReconListTmp);
                    vm.AparatosRecon.push(AparatoReconTmp);
                    console.log(vm.AparatosReconList);
                    console.log(vm.AparatosRecon);
                    SetAparatoList();
                }
            }
        }

        function ValidAparato(Clv_CableModem){
            var Check = 0;
            console.log(Clv_CableModem);
            if(vm.AparatosRecon.length > 0){
                for(var i = 0; vm.AparatosRecon.length > i; i++){
                    if(vm.AparatosRecon[i].Clv_CableModem == Clv_CableModem){
                        Check = Check + 1;
                    }
                }
            }
            return (Check > 0)? true:false;
        }

        function DeleteAparatoRecon(Clv_CableModem){
            for(var i = 0; vm.AparatosRecon.length > i; i++){
                if(vm.AparatosRecon[i].Clv_CableModem == Clv_CableModem){
                    vm.AparatosRecon.splice(i, 1);
                    SetAparatoList();
                    break;
                }
            }
        }

        function SaveRecontratacion(){
            if(vm.AparatosRecon.length == 0 && vm.ViewAparatos == false){
                SaveServicioRecontratacion()
            }else if(vm.AparatosRecon.length > 0 && vm.ViewAparatos == true){
                SaveServicioRecontratacion()
            }else if(vm.AparatosRecon.length == 0 && vm.ViewAparatos == true){
                ngNotify.set('ERROR, aun no se agrega ningún aparato.', 'warn');
            }
        }

        function SaveServicioRecontratacion(){
            var ObjRecontratacion = {
                'ClvSession': vm.ClvSession,
                'IdContrato': vm.IdContrato,
                'Clv_Unicanet': vm.Servicio.Clv_UnicaNet,
                'ClvTipoServ': vm.TipoServicio.Clv_TipSerPrincipal,
                'Clv_Servicio': vm.Servicio.Clv_Servicio,
                'IdMedio': vm.Medio.IdMedio,
            };
            console.log('Recon: ', ObjRecontratacion);
            RecontratacionFactory.GetAddServiciosEnBaja(ObjRecontratacion).then(function(data){
                console.log(data);
                vm.IdRecon = data.GetAddServiciosEnBajaResult;
                if(vm.IdRecon > 0){
                    if(vm.AparatoList.length > 0){
                        SaveAparatoRecontratacion();
                    }else{
                        ngNotify.set('CORRECTO, se agregó el servicio.', 'success');
                    }
                }else{
                    ngNotify.set('ERROR, al añadir un servicio.', 'warn');
                }
            });
        }

        function SaveAparatoRecontratacion(){
            console.log('Save Aparatos');
            vm.AparatosRecon.forEach(AddIdReconClvUnic);
            /*var ObjAparatos = {
                'IdRecon': vm.IdRecon,
            'ObjRecontratacion': vm.AparatosRecon
        }*/
            console.log(vm.AparatosRecon);
            RecontratacionFactory.GetAddApararoEnBaja(vm.AparatosRecon).then(function(data){
                console.log(data);
            });
        }

        function AddIdReconClvUnic(item, index){
            vm.AparatosRecon[index].IdRecon = vm.IdRecon;
        }

        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.BlokMedioInst = false;
        var MedioList = {
            'IdMedio': 0,
            'Descripcion': 'Definir en la instalación',
            'Activo': true
        };
        vm.AparatosReconList = [];
        vm.AparatosRecon = [];
        vm.ViewAparatos = false;
        console.log('2');
        console.log(ObjCliente);
        vm.ClvSession = ObjCliente.ClvSession;
        vm.SetServicio = SetServicio;
        vm.GetServiciosList = GetServiciosList;
        vm.GetAparatoList = GetAparatoList;
        vm.AddAparatoRecon = AddAparatoRecon;
        vm.DeleteAparatoRecon = DeleteAparatoRecon;
        vm.SaveRecontratacion = SaveRecontratacion;
        vm.Cancel = Cancel;
        console.log('3');
        initData();

    });