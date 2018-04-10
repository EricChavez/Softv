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
    $localStorage,
    CatalogosFactory
  ) {
    this.$onInit = function() {
      reportesVariosFactory.mostrarTipServ().then(function(data) {
        vm.tipoServicios = data.GetTipServicioListResult;
        vm.ServicioDigitalInternet = data.GetTipServicioListResult[0];
      });
    };

    function GetReport() {
      if ( vm.Reporte === "DESCONECTADOS" ||  vm.Reporte === "SUSPENDIDOS") {
        var estatus = "";
        estatus =  vm.Reporte === "DESCONECTADOS" ? "D" : estatus;
        estatus =  vm.Reporte === "SUSPENDIDOS" ? "S" : estatus;
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

      if( vm.Reporte === "ALCORRIENTE" ||
      vm.Reporte === "ADELANTADOS" ||
      vm.Reporte === "PORINSTALAR"){
        var estatus =   vm.Reporte       
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
          tiposcliente: vm.responseparams.tiposcliente,
          OpOrdenar:1
          };
        reportesFactory.GetReportesVarios_1(obj).then(function(result){
          vm.rptpanel=true;
          vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReportesVarios_1Result);
      }); 
      }
      if(vm.Reporte === "INSTALACIONES" ||
      vm.Reporte === "CONTRATACIONES" ||
      vm.Reporte === "CANCELACIONES" ||
      vm.Reporte === "FUERAAREA" ){

        var data={
          fechasolInicial:$filter('date')(vm.fechainicio, 'yyyy/MM/dd'),
          fechasolFinal:$filter('date')(vm.fechafin, 'yyyy/MM/dd'),
          estatus:vm.Reporte,
          OpOrdenar:1,
          Clv_TipSer:2,
          distribuidores: vm.responseparams.distribuidores,
          plazas: vm.responseparams.plazas,
          ciudades: vm.responseparams.ciudades,
          localidades: vm.responseparams.localidades,
          colonias: vm.responseparams.colonias,
          servicios: vm.responseparams.servicios,
          periodos: vm.responseparams.periodos,
          tiposcliente: vm.responseparams.tiposcliente,
        };

        reportesFactory.GetReportesVarios_3(data).then(function(result){
          vm.rptpanel=true;
          vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReportesVarios_3Result);
      }); 

      }
    }

    function getFilters() { 
      vm.report = "RVDesconectados";    
      if (
        vm.Reporte === "DESCONECTADOS" ||
        vm.Reporte === "SUSPENDIDOS" ||
        vm.Reporte === "ALCORRIENTE" ||
        vm.Reporte === "ADELANTADOS" ||
        vm.Reporte === "PORINSTALAR"
      ) {
       
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
      if(vm.Reporte === "INSTALACIONES" ||
        vm.Reporte === "CONTRATACIONES" ||
        vm.Reporte === "CANCELACIONES" ||
        vm.Reporte === "FUERAAREA" 
      ){
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
      if(vm.Reporte === "CIUDAD"){
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

    function getmotivos(){
      var OjbMotivo = {
          'Clv_MOTCAN': 0,
          'MOTCAN': 0,
          'op': 3
        };
        CatalogosFactory.GetBuscaMotivoCancelacion(OjbMotivo).then(function(data){
          vm.MotivoCancelacionList = data.GetBuscaMotivoCancelacionResult;
        });
    }

    var vm = this;
    vm.getFilters = getFilters;
    vm.GetReport = GetReport;
    vm.responseparams = {};
    vm.showfilters = false;
    vm.rptpanel = false;
    vm.op = 0;
    vm.order = [];
    vm.Reporte='DESCONECTADOS';
    vm.listaStatus=[
      {clave:'C',nombre:'Contratado'},
      {clave:'I',nombre:'Instalado'},
      {clave:'D',nombre:'Desconectados'},
      {clave:'S',nombre:'Suspendidos'},
      {clave:'F',nombre:'Fuera de area'},
      {clave:'T',nombre:'Suspendidos Temporalmente'},
      {clave:'B',nombre:'Cancelados'},
    ]
    getFilters();
    getmotivos();
  });
