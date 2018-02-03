'use strict';
angular
	.module('softvApp')
	.controller('ReportesVarios2Ctrl', function($state,reportesFactory,reportesVariosFactory,$filter,globalService,$sce,$localStorage) {	
     
        this.$onInit = function() {
            reportesVariosFactory.mostrarTipServ().then(function (data) {
                vm.tipoServicios = data.GetTipServicioListResult;
                vm.ServicioDigitalInternet = data.GetTipServicioListResult[0];
                   
            });
        }

        function GetReport(){

          var obj=  {					
                'Clv_TipSer':2,			
                'Op':1,
                'OpOrdenar':1,				
                'distribuidores':vm.responseparams.distribuidores,
                'plazas':vm.responseparams.plazas,
                'ciudades':vm.responseparams.ciudades,
                'localidades':vm.responseparams.localidades,
                'colonias':vm.responseparams.colonias,
                'servicios':vm.responseparams.servicios,
                'periodos':vm.responseparams.periodos,
                'tiposcliente':vm.responseparams.tiposcliente
            }
            console.log(obj);
         
            reportesFactory.GetReportesVarios_1(obj).then(function(result){
                vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReportesVarios_1Result);
            });
        }

        function getFilters(op){
            vm.op=op;
          if(op===1||op===2 || op===3||op===4){
            vm.order=[
                { 'step': 1, function: 'getplazas'},
                { 'step': 2, function: 'getEstadosByPlaza' },
                { 'step': 3, function: 'getCiudadesByEstado' },
                { 'step': 4 ,  function :'getLocalidadesByCiudades' },
                { 'step': 5 ,  function :'getColoniasByLocalidad' },
                { 'step': 6 ,  function :'getCallesByColonia' },
                { 'step': 7 ,  function :'getServiciosRV' },
                { 'step': 8 ,  function :'getTipoCliente' },
                { 'step': 9 ,  function :'getPeriodos' },
                { 'step': 10 ,  function :'getRangosFechas' }
              ]
           if(op===1){
            vm.report='RVDesconectados';
           }  
           if(op===2){
            vm.report='RVSuspendidos';
           }
           if(op===3){
            vm.report='RVCorrinete';
           }  
           if(op===4){
            vm.report='RVAdelantados';
           }    
             
             
              
          }           
        }

        var vm=this; 
        vm.getFilters=getFilters;       
        vm.GetReport=GetReport;
        vm.responseparams={};
        vm.showfilters=false;      
        vm.op=0;        
        vm.order=[];
    });
		