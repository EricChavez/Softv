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
                'Op':0,
                'OpOrdenar':0,				
                'distribuidores':responseparams.distribuidores,
                'plazas':responseparams.plazas,
                'ciudades':responseparams.ciudades,
                'localidades':responseparams.localidades,
                'colonias':responseparams.colonias,
                'servicios':responseparams.servicios,
                'periodos':responseparams.periodos,
                'tiposcliente':responseparams.tiposcliente

            }
            console.log(obj);
            return ;
            reportesFactory.GetReportesVarios_1(obj).then(function(result){

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
                { 'step': 9 ,  function :'getRangosFechas' }
              ]
              vm.report='RVDesconectados';
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
		