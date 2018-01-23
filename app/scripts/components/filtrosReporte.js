'use strict';
var filtrosReporte = {
  bindings: {
    tipserv: '=',
    report: '=',
    order: '=',
    meses: '=',
    url: '=',
    responseparams: '=',
    showfilters: '='
  },
  controller: function (reportesVariosFactory, $localStorage, reportesFactory, trabajosFactory, $filter, globalService, $sce, atencionFactory, CatalogosFactory) {

    function getTipoServicios() {
      atencionFactory.getServicios().then(function (result) {
        vm.Tiposervicios = result.GetMuestraTipSerPrincipalListResult;
      });
    }

    function getServicios(tiposer) {
      var obj = {
        'Clv_TipSer': tiposer,
        'Clv_Servicio': 0,
        'Descripcion': '',
        'Clv_Txt': '',
        'Op': 2,
        'idcompania': 1
      }
      CatalogosFactory.GetServicios_NewList(obj).then(function (result) {
        var servicios = [];
        result.GetServicios_NewListResult.forEach(function (item) {
          if (item.Es_Principal == true) {
            servicios.push(item);
          }
        });
        setFilters('filtrar servicios', 'Todos los servicios', 'servicios seleccionados', 'Descripcion', 'Descripcion', servicios);
      });
    }

    function getDistribuidores() {
      reportesVariosFactory.mostrarDistribuidorByUsuario($localStorage.currentUser.idUsuario)
        .then(function (data) {
          setFilters('filtrar distribuidor', 'Todos los distribuidores', 'Distribuidores seleccionados', 'Nombre', 'Nombre', data.GetDistribuidorByUsuarioResult);
        });
    };

    function getplazas() {
      reportesVariosFactory.mostrarPlazaByDistribuidor($localStorage.currentUser.idUsuario, vm.options.selectedItems)
        .then(function (result) {
          setFilters('filtrar plazas', 'Todos las plazas', 'Plazas seleccionadas', 'razon_social', 'razon_social', result.GetPlazasByDistribuidorResult);
        });
    }

    function getTecnicosByPlaza(plazas, op) {
      if (op == 1) {
        reportesFactory.GetTecnicosCompania(plazas)
          .then(function (result) {
            vm.tecnicosAgenda = result.GetTecnicosCompaniaResult;
            vm.responseparams.tecnicosAgenda = vm.tecnicosAgenda;
          });
      } else {
        reportesFactory.GetTecnicosCompania(plazas)
          .then(function (result) {
            setFilters('filtrar técnicos', 'Todos las técnicos', 'técnicos seleccionadas', 'tecnico', 'tecnico', result.GetTecnicosCompaniaResult);
          });
      }
    }

    function muestraServicios() {
      vm.muestraservicios = true;
    }

    function getEstadosByPlaza() {
      reportesVariosFactory.mostrarEstadoByPlaza(vm.plazas)
        .then(function (result) {
          setFilters('filtrar estados', 'Todos las estados', 'estados seleccionadas', 'Nombre', 'Nombre', result.GetEstadosByplazaResult);
        });
    }

    function getTrabajos(tipser, tipord) {
      trabajosFactory.GetSoftv_GetTrabajoByClv_TipSer(tipser)
        .then(function (result) {
          setFilters('filtrar trabajos', 'Todos las trabajos', 'trabajos seleccionadas', 'descripcion', 'descripcion', result.GetSoftv_GetTrabajoByClv_TipSerResult);
        });
    }

    function getCiudadesByEstado(plazas, estados) {
      reportesVariosFactory.mostrarCiudad(plazas, estados).then(function (result) {
        setFilters('filtrar ciudades', 'Todos las ciudades', 'ciudades seleccionadas', 'nombre', 'nombre', result.GetCiudadesBy_PlazasEstadoResult);
      });
    }

    function setFilters(filterPlaceHolder, labelAll, labelSelected, labelShow, orderProperty, items) {
      vm.options = {
        filterPlaceHolder: filterPlaceHolder,
        labelAll: labelAll,
        labelSelected: labelSelected,
        labelShow: labelShow,
        orderProperty: orderProperty,
        items: items,
        selectedItems: []
      };
    }


    function getLocalidadesByCiudades(clv_usuario, Companias, Ciudades, Estados) {
      reportesVariosFactory.mostrarLocalidadByCiudad(clv_usuario, Companias, Ciudades, Estados).then(function (result) {
        setFilters('filtrar localidades', 'Todos las localidades', 'localidades seleccionadas', 'Nombre', 'Nombre', result.GetLocalidadesbyCiudadResult);
      });
    }

    function getColoniasByLocalidad(clv_usuario, Companias, Estados, Ciudades, Localidades) {
      reportesVariosFactory.mostrarColonia(clv_usuario, 0, Companias, Estados, Ciudades, Localidades).then(function (result) {
        setFilters('filtrar colonias', 'Todos las colonias', 'colonias seleccionadas', 'Nombre', 'Nombre', result.GetColoniasBy_Ciudad_LocalidadResult);
      });
    }

    function getCallesByColonia(clv_usuario, banderaLocalidad, banderaColonia, Distribuidores, Ciudades, Localidades, Colonias, Companias, Estados) {
      reportesVariosFactory.mostrarCalle(clv_usuario, 0, 0, Distribuidores, Ciudades, Localidades, Colonias, Companias, Estados)
        .then(function (result) {
          setFilters('filtrar calles', 'Todos las calles', 'calles seleccionadas', 'Nombre', 'Nombre', result.GetCallesBy_Ciudad_Localidad_ColoniaResult);
        });
    }

    function getTipoClientes() {
      reportesVariosFactory.mostrarTipoCliente().then(function (data) {
        setFilters('filtrar tipo cliente', 'Todos las tipo cliente', 'tipo cliente seleccionadas', 'Descripcion', 'Descripcion', data.GetTipoClienteListResult);
      });
    }

    function getPeriodos() {
      reportesVariosFactory.mostrarPeriodo().then(function (data) {
        setFilters('filtrar periodo', 'Todos los periodo', 'tipo periodo', 'Descripcion', 'Descripcion', data.GetPeriodosRepVarListResult);       
      });
    }

    function transfer(from, to, index) {
      if (index >= 0) {
        to.push(from[index]);
        from.splice(index, 1);
      } else {
        for (var i = 0; i < from.length; i++) {
          to.push(from[i]);
        }
        from.length = 0;
      }
    };

    function next(report) {
      vm.step = vm.step + 1;
      vm.order.forEach(function (item) {
        if (item.function === 'getplazas' && item.step == vm.step) {
          vm.distribuidores = vm.options.selectedItems;
          getplazas();
        }
        if (item.function === 'getRangosFechas' && item.step == vm.step) {

          vm.showfilters = true;
        }
        if (item.function === 'getEstadosByPlaza' && item.step == vm.step) {
          vm.plazas = vm.options.selectedItems;
          getEstadosByPlaza();
        }
        if (item.function === 'getReporBtn' && item.step == vm.step) {
          vm.showfilters = true;
        }
        if (item.function === 'getfiltroPeriodo' && item.step == vm.step) {
          vm.showfilters = true;
        }
        if (item.function === 'getServicios' && item.step == vm.step) {
          vm.muestraservicios = false;
          getServicios(vm.servicioPerm.Clv_TipSerPrincipal);
        }
        if (item.function === 'getServiciosRV' && item.step == vm.step) {
          vm.calles = vm.options.selectedItems;
          getServicios(vm.tipserv);
        }
        if (item.function === 'muestraServicios' && item.step == vm.step) {
          vm.plazas = vm.options.selectedItems;
          muestraServicios();
        }

        if (item.function === 'getfiltroPermanencia' && item.step == vm.step) {
          vm.servicios = vm.options.selectedItems;
          vm.showfilters = true;
        }
        if (item.function === 'muestrafiltroAgenda' && item.step == vm.step) {
          vm.plazas = vm.options.selectedItems;
          if (report === 'AGENDATECNICO') {
            getTecnicosByPlaza(vm.plazas, 1);
            vm.showfilters = true;
          } else {
            getTecnicosByPlaza(vm.plazas, 0);
          }

        }
        if (item.function === 'muestrafiltrotrabajos' && item.step == vm.step) {
          vm.tecnicosAgenda = vm.options.selectedItems;
          vm.muestrafiltrotrabajos = true;
          vm.tipserTrabajo = vm.Tiposervicios[1];
          vm.tipoOrden = vm.tipoOrdenList[1];
          getTrabajos(vm.Tiposervicios[1].Clv_TipSerPrincipal);
        }
        if (item.function === 'muestraRangosFecha' && item.step == vm.step) {
          if (report === 'DEVOLUCIONALMACEN') {
            vm.plazas = vm.options.selectedItems;
          }
          vm.showfilters = true;
        }
        if (item.function === 'getCiudadesByEstado' && item.step == vm.step) {
          vm.estados = vm.options.selectedItems;
          getCiudadesByEstado(vm.plazas, vm.estados);
        }
        if (item.function === 'getLocalidadesByCiudades' && item.step == vm.step) {
          vm.ciudades = vm.options.selectedItems;
          getLocalidadesByCiudades($localStorage.currentUser.idUsuario, vm.plazas, vm.ciudades, vm.estados);
        }
        if (item.function === 'getColoniasByLocalidad' && item.step == vm.step) {
          vm.localidades = vm.options.selectedItems;
          getColoniasByLocalidad($localStorage.currentUser.idUsuario, vm.plazas, vm.estados, vm.ciudades, vm.localidades);
        }
        if (item.function === 'getCallesByColonia' && item.step == vm.step) {
          vm.colonias = vm.options.selectedItems;
          getCallesByColonia($localStorage.currentUser.idUsuario, 0, 0, vm.distribuidores, vm.ciudades, vm.localidades, vm.colonias, vm.plazas, vm.estados);
        }
        if (item.function === 'getfiltrosOrden' && item.step == vm.step) {
          vm.calles = vm.options.selectedItems;
          vm.showfilters = true;
        }
        if (item.function === 'getfiltrosQuejas' && item.step == vm.step) {
          vm.calles = vm.options.selectedItems;
          vm.showfilters = true;
        }
        if(item.function === 'getTipoCliente' && item.step == vm.step){
          vm.servicios=vm.options.selectedItems;
          getTipoClientes();
        }
        if(item.function === 'getPeriodos' && item.step == vm.step){
          vm.tiposcliente=vm.options.selectedItems;
          getPeriodos();
        }
        if (item.function === 'getfiltrosAtencion' && item.step == vm.step) {
          vm.colonias = vm.options.selectedItems;
          vm.showfilters = true;
        } else {
          var par = {
            'distribuidores': vm.distribuidores,
            'plazas': vm.plazas,
            'ciudades': vm.ciudades,
            'localidades': vm.localidades,
            'colonias': vm.colonias,
            'calles': vm.calles,
            'estados': vm.estados,
            'servicios': vm.servicios,
            'tiposervicio': (vm.servicioPerm) ? vm.servicioPerm.Clv_TipSerPrincipal : 0,
            'tecnicosAgenda': vm.tecnicosAgenda,
            'tiposcliente':vm.tiposcliente,
            'servicios':vm.servicios
          }
          vm.responseparams = par;
        }
      });

    }

    var vm = this;
    vm.next = next;
    vm.transfer = transfer;
    vm.options = {};
    vm.step = 0;
    vm.muestraservicios = false;
    vm.muestrafiltrotrabajos = false;
    vm.getTrabajos = getTrabajos;    
    vm.plazas = [];
    vm.distribuidores = [];
    vm.tecnicos = [];
    vm.estados = [];
    vm.localidades = [];
    vm.ciudades = [];
    vm.colonias = [];
    vm.calles = [];
    vm.servicios = [];
    vm.tecnicosAgenda = [];
    vm.tiposcliente = [];
    vm.tipoOrdenList = [{
        'tipo': 'O',
        'nombre': 'Ordenes'
      },
      {
        'tipo': 'Q',
        'nombre': 'Reporte'
      },
      {
        'tipo': 'A',
        'nombre': 'Ambas'
      }
    ];

    getDistribuidores();
    getTipoServicios();
 
  },
  templateUrl: 'views/components/filtrosReporte.html',
  controllerAs: '$ctrl'
};
angular.module('softvApp').component('filtrosReporte', filtrosReporte);
