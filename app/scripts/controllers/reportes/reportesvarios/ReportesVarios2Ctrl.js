"use strict";
angular
  .module("softvApp")
  .controller("ReportesVarios2Ctrl", function(
    $state,
    reportesFactory,
    reportesVariosFactory,
    $filter,
    globalService,
    $sce,
    $localStorage
  ) {
    this.$onInit = function() {
      reportesVariosFactory.mostrarTipServ().then(function(data) {
        vm.tipoServicios = data.GetTipServicioListResult;
        vm.ServicioDigitalInternet = data.GetTipServicioListResult[0];
      });
    };

    function GetReport() {
      if (vm.op === "DESCONECTADOS" || vm.op === "SUSPENDIDOS") {
        var estatus = "";
        estatus = vm.op === "DESCONECTADOS" ? "D" : estatus;
        estatus = vm.op === "SUSPENDIDOS" ? "S" : estatus;
        var obj = {
          estatus: estatus,
          Clv_TipSer: 2,
          distribuidores: vm.responseparams.distribuidores,
          plazas: vm.responseparams.plazas,
          ciudades: vm.responseparams.ciudades,
          localidades: vm.responseparams.localidades,
          colonias: vm.responseparams.colonias,
          servicios: vm.responseparams.servicios,
          periodos: vm.responseparams.periodos,
          tiposcliente: vm.responseparams.tiposcliente
        };

        reportesFactory.GetReportesVarios_2(obj).then(function(result) {
          vm.rptpanel = true;
          vm.url = $sce.trustAsResourceUrl(
            globalService.getUrlReportes() +
              "/Reportes/" +
              result.GetReportesVarios_2Result
          );
        });
      }

      /*  var obj=  {					
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
                vm.rptpanel=true;
                vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReportesVarios_1Result);
            }); */
    }

    function getFilters(op) {
      vm.op = op;
      if (
        op === "DESCONECTADOS" ||
        op === "SUSPENDIDOS" ||
        op === 3 ||
        op === 4
      ) {
        vm.report = "RVDesconectados";
        vm.order = [
          { step: 1, function: "getplazas" },
          { step: 2, function: "getEstadosByPlaza" },
          { step: 3, function: "getCiudadesByEstado" },
          { step: 4, function: "getLocalidadesByCiudades" },
          { step: 5, function: "getColoniasByLocalidad" },
          { step: 6, function: "getCallesByColonia" },
          { step: 7, function: "getServiciosRV" },
          { step: 8, function: "getTipoCliente" },
          { step: 9, function: "getPeriodos" },
          { step: 10, function: "getReporBtn" }
        ];             
        
      }
    }

    var vm = this;
    vm.getFilters = getFilters;
    vm.GetReport = GetReport;
    vm.responseparams = {};
    vm.showfilters = false;
    vm.rptpanel = false;
    vm.op = 0;
    vm.order = [];
  });
