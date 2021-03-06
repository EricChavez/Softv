'use strict';
angular
  .module('softvApp')
  .factory('ordenesFactory', function ($http, $q, globalService, $localStorage) {
    var factory = {};
    var paths = {
      plazas: '/Muestra_Compania_RelUsuario/GetMuestra_Compania_RelUsuarioList',
      usuarios: '/MUESTRAUSUARIOS/GetMUESTRAUSUARIOSList',
      colonias: '/uspConsultaColonias/GetuspConsultaColoniasList',
      buscarOrdenes: '/uspBuscaOrdSer_BuscaOrdSerSeparado2/GetuspBuscaOrdSer_BuscaOrdSerSeparado2List',
      buscarClientes: '/uspBuscaContratoSeparado2/GetuspBuscaContratoSeparado2List',
      buscarColonia: '/uspConsultaColoniasPorUsuario/GetuspConsultaColoniasPorUsuarioList',
      buscarCliPorContrato: '/BUSCLIPORCONTRATO_OrdSer/GetDeepBUSCLIPORCONTRATO_OrdSer',
      serviciosCliente: '/DameSerDelCliFac/GetDameSerDelCliFacList',
      dimeServicio: '/Dime_Que_servicio_Tiene_cliente/GetDime_Que_servicio_Tiene_clienteList',
      muestraTrabajo: '/MUESTRATRABAJOSPorTipoUsuario/GetMUESTRATRABAJOSPorTipoUsuarioList',
      getCiudadCamdo: '/CAMDO/GetllenaCiudadCamdoList',
      getLocalidadCamdo: '/CAMDO/GetllenaLocalidadCamdoList',
      getColoniaCamdo: '/CAMDO/GetllenaColoniaCamdoList',
      getCalleCamdo: '/CAMDO/GetllenaCalleCamdoList',
      addBitacoraReproceso: '/Bitacora/AddReprocesarEdoCuenta',
      addBitacoraReenviar: '/Bitacora/AddReenviarEdoCuenta',
      addOrdenServicio: '/OrdSer/AddOrdSer',
      validaOrden: '/VALIDAOrdenQueja/GetDeepVALIDAOrdenQueja',
      addDetalleOrden: '/DetOrdSer/AddDetOrdSer',
      addCambioDomicilio: '/CAMDO/AddCAMDO',
      consultaTablaServicios: '/BUSCADetOrdSer/GetBUSCADetOrdSerList',
      consultaCambioDomicilio: '/CAMDO/GetDeepCAMDO',
      getCableModemsCli: '/MuestraGuaBor/GetMUESTRACABLEMODEMSDELCLI_porOpcion',
      detalleCableModem: '/MuestraGuaBor/GetMUESTRACONTNET_PorOpcion',
      GetMUESTRAIPAQU_porSOL: '/MuestraGuaBor/GetMUESTRAIPAQU_porSOL',
      addIpaqu: '/IPAQU/AddIPAQU',
      AddIPAQUD: '/IPAQU/AddIPAQUD',
      guardaMotivoCancelacion: '/GuardaMotivoCanServ/GetDeepGuardaMotivoCanServ',
      MUESTRAAPARATOS_DISCPONIBLES: '/MUESTRAAPARATOS_DISCPONIBLES/GetMUESTRAAPARATOS_DISCPONIBLESList',
      AddSP_GuardaIAPARATOS: '/SP_GuardaIAPARATOS/AddSP_GuardaIAPARATOS',
      DeleteIPAQU: '/IPAQU/DeleteIPAQU',
      DeleteIPAQUD: '/IPAQU/DeleteIPAQUD',
      GetBorraMotivoCanServ2: '/GuardaMotivoCanServ/GetBorraMotivoCanServ2',
      GetuspContratoServList: '/uspContratoServ/GetuspContratoServList',
      GetDime_Que_servicio_Tiene_cliente: '/Dime_Que_servicio_Tiene_cliente/GetDime_Que_servicio_Tiene_cliente',
      GetDimeSiGrabaOrd: '/DimeSiGrabaOrd/GetDimeSiGrabaOrd',
      GetValida_DetOrden: '/Valida_DetOrden/GetValida_DetOrden',
      GetCheca_si_tiene_camdo: '/Checa_si_tiene_camdo/GetCheca_si_tiene_camdo',
      AddCambia_Tipo_cablemodem: '/Cambia_Tipo_cablemodem/AddCambia_Tipo_cablemodem',
      GetChecaMotivoCanServ: '/ChecaMotivoCanServ/GetChecaMotivoCanServ',
      GetConMotCanList: '/MotCan/GetConMotCanList',
      AddNueRelOrdenUsuario: '/NueRelOrdenUsuario/AddNueRelOrdenUsuario',
      MODORDSER: '/MODORDSER/GetDeepMODORDSER',
      PreejecutaOrden: '/OrdSer/GetOrdSer',
      GetDeepSP_GuardaOrdSerAparatos: '/SP_GuardaOrdSerAparatos/GetDeepSP_GuardaOrdSerAparatos',
      AddSP_LLena_Bitacora_Ordenes: '/SP_LLena_Bitacora_Ordenes/AddSP_LLena_Bitacora_Ordenes',
      Imprime_Orden: '/Imprime_Orden/GetDeepImprime_Orden',
      GetVALIDADECODERS: '/VALIDADECODERS/GetVALIDADECODERS',
      GetReporteOrdenServicio: '/OrdSer/GetReporteOrdenServicio',
      ConsultaOrdSer: '/ConsultaOrdSer/GetDeepConsultaOrdSer',
      MuestraRelOrdenesTecnicos: '/MuestraRelOrdenesTecnicos/GetMuestraRelOrdenesTecnicosList',
      AddInsertMotCanServ: '/InsertMotCanServ/AddInsertMotCanServ',
      GetSP_ValidaGuardaOrdSerAparatos: '/OrdSer/GetSP_ValidaGuardaOrdSerAparatos',
      GetValidaOrdSerManuales: '/ValidaOrdSerManuales/GetValidaOrdSerManuales',
      SP_StatusAparatos: '/OrdSer/GetSP_StatusAparatos',
      Getsp_validaEliminarOrden: '/OrdSer/Getsp_validaEliminarOrdenser',
      AddGuardaMovSist: '/GuardaMovSist/AddGuardaMovSist',
      DeleteOrdSer: '/OrdSer/DeleteOrdSer',
      AddMovSist: '/MovSist/AddMovSist',
      DeleteDetOrdSer: '/DetOrdSer/DeleteDetOrdSer',
      GetDameCitaOrdenQueja: '/OrdSer/GetDameCitaOrdenQueja',
      GetSP_InsertaTbl_NoEntregados: '/SP_InsertaTbl_NoEntregados/GetSP_InsertaTbl_NoEntregados',
      GetValidarNuevo: '/ValidarNuevo/GetValidarNuevo',
      Getsp_BorraArticulosAsignados: '/OrdSer/Getsp_BorraArticulosAsignados',
      MuestraMedioPorServicoContratado: '/MuestraMedioPorServicoContratado/GetMuestraMedioPorServicoContratadoList',
      MuestraArbolServiciosAparatosPorinstalar: '/MuestraArbolServiciosAparatosPorinstalar/GetMuestraArbolServiciosAparatosPorinstalarList',
      MuestraTipoAparato: '/MuestraTipoAparato/GetMuestraTipoAparatoList',
      MuestraServiciosRelTipoAparato: '/MuestraServiciosRelTipoAparato/GetMuestraServiciosRelTipoAparatoList', 
      MuestraAparatosDisponibles: '/MuestraAparatosDisponibles/GetMuestraAparatosDisponiblesList',
      AsignaAparatosAlServicio: '/AsignaAparatosAlServicio/GetAsignaAparatosAlServicioList'
    };



    factory.Getsp_BorraArticulosAsignados = function (clv_orden) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clv_orden': clv_orden
      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.Getsp_BorraArticulosAsignados, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };


    factory.GetValidarNuevo = function (ClvOrden) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'ClvOrden': ClvOrden,
        'Op': 0
      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetValidarNuevo, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };




    factory.GetSP_InsertaTbl_NoEntregados = function (ApaNoEntregados) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objSP_InsertaTbl_NoEntregados': ApaNoEntregados
      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetSP_InsertaTbl_NoEntregados, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };



    factory.GetDameCitaOrdenQueja = function (clv_queja_orden, opcion) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clv_queja_orden': clv_queja_orden,
        'opcion': opcion
      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetDameCitaOrdenQueja, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };



    factory.SP_StatusAparatos = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.SP_StatusAparatos, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };




    factory.DeleteDetOrdSer = function (Clave) {
      var deferred = $q.defer();
      var Parametros = {
        'Clave': Clave
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.DeleteDetOrdSer, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.Getsp_validaEliminarOrden = function () {


      var deferred = $q.defer();
      var Parametros = {
        'sp_validaEliminarOrdenEntity': {
          'ClvUsuario': $localStorage.currentUser.usuario,
          'Activo': 1
        }

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.post(globalService.getUrl() + paths.Getsp_validaEliminarOrden, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.AddMovSist = function (contrato, control, Pantalla, CLV_ORDEN) {
      var deferred = $q.defer();
      var Parametros = {
        'objMovSist': {
          'usuario': $localStorage.currentUser.usuario,
          'contrato': contrato,
          'Sistema': 'SOFTVWEB',
          'Pantalla': Pantalla,
          'control': control,
          'valorant': '',
          'valornuevo': CLV_ORDEN
        }

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddMovSist, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.AddGuardaMovSist = function (ClvOrdSer) {
      var deferred = $q.defer();
      var Parametros = {
        'objGuardaMovSist': {
          'Op': 0,
          'Usuario': $localStorage.currentUser.Usuario,
          'ClvOrdSer': ClvOrdSer
        }

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddGuardaMovSist, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.DeleteOrdSer = function (ClvOrdSer) {
      var deferred = $q.defer();
      var Parametros = {
        'clv_orden': ClvOrdSer

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.DeleteOrdSer, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };







    factory.GetValidaOrdSerManuales = function (ClvOrdSer) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvOrdSer': ClvOrdSer
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetValidaOrdSerManuales, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.GetSP_ValidaGuardaOrdSerAparatos = function (CLV_ORDEN, OPCION, STATUS, OP2, Clv_Tecnico) {
      var deferred = $q.defer();
      var Parametros = {
        'CLV_ORDEN': CLV_ORDEN,
        'OPCION': OPCION,
        'STATUS': STATUS,
        'OP2': OP2,
        'Clv_Tecnico': Clv_Tecnico
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetSP_ValidaGuardaOrdSerAparatos, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };





    factory.AddInsertMotCanServ = function (ClvOrdSer, Clv_MotCan) {
      var deferred = $q.defer();
      var Parametros = {
        'objInsertMotCanServ': {
          'ClvOrdSer': ClvOrdSer,
          'Clv_MotCan': Clv_MotCan
        }
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddInsertMotCanServ, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.GetMUESTRAIPAQU_porSOL = function (ClvDetOs, ClvOS) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvDetOs': ClvDetOs,
        'ClvOS': ClvOS
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetMUESTRAIPAQU_porSOL, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.MuestraRelOrdenesTecnicos = function (orden) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvOrdSer': orden
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.MuestraRelOrdenesTecnicos, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.ConsultaOrdSer = function (orden) {
      var deferred = $q.defer();
      var Parametros = {
        'Clv_Orden': orden
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.ConsultaOrdSer, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.GetReporteOrdenServicio = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'obj': {
          'Clv_TipSer': obj.Clv_TipSer,
          'op1': obj.op1,
          'op2': obj.op2,
          'op3': obj.op3,
          'op4': obj.op4,
          'op5': obj.op5,
          'StatusPen': obj.StatusPen,
          'StatusEje': obj.StatusEje,
          'StatusVis': obj.StatusVis,
          'Clv_OrdenIni': obj.Clv_OrdenIni,
          'Clv_OrdenFin': obj.Clv_OrdenFin,
          'Fec1Ini': '',
          'Fec1Fin': '',
          'Fec2Ini': '',
          'Fec2Fin': '',
          'Clv_Trabajo': obj.Clv_Trabajo,
          'Clv_Colonia': obj.Clv_Colonia,
          'OpOrden': obj.OpOrden,
          'IdCompania': obj.IdCompania,
          'clv_ciudad': obj.clv_ciudad,
          'clv_usuario': obj.clv_usuario
        }
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetReporteOrdenServicio, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };




    factory.GetVALIDADECODERS = function (ClvOrden) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvOrden': ClvOrden
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetVALIDADECODERS, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };






    factory.Imprime_Orden = function (ClvOrden) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvOrden': ClvOrden
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.Imprime_Orden, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };


    factory.AddSP_LLena_Bitacora_Ordenes = function (descripcion, ClvOrden) {
      var deferred = $q.defer();
      var Parametros = {
        'objSP_LLena_Bitacora_Ordenes': {
          'ClvTxtUsuario': $localStorage.currentUser.Usuario,
          'DescripcionMov': descripcion,
          'ClvOrden': ClvOrden
        }

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddSP_LLena_Bitacora_Ordenes, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };


    factory.GetDeepSP_GuardaOrdSerAparatos = function (ClvOrden) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvOrden': ClvOrden,
        'Op': 'M',
        'Status': 'E',
        'Op2': 0
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetDeepSP_GuardaOrdSerAparatos, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };


    factory.PreejecutaOrden = function (ClvOrden) {
      var deferred = $q.defer();
      var Parametros = {
        'clv_orden': ClvOrden
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.PreejecutaOrden, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };


    factory.MODORDSER = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvOrden': obj.ClvOrden,
        'ClvTipSer': obj.ClvTipSer,
        'Contrato': obj.Contrato,
        'FecSol': obj.FecSol,
        'FecEje': obj.FecEje,
        'Visita1': obj.Visita1,
        'Visita2': obj.Visita2,
        'Status': obj.Status,
        'ClvTecnico': obj.ClvTecnico,
        'Impresa': obj.Impresa,
        'ClvFactura': obj.ClvFactura,
        'Obs': obj.Obs,
        'ListadeArticulos': obj.ListadeArticulos
      };

      console.log(JSON.stringify(Parametros));
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.MODORDSER, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };






    factory.AddNueRelOrdenUsuario = function (ClvOrden) {
      var deferred = $q.defer();
      var Parametros = {
        'objNueRelOrdenUsuario': {
          'ClvOrden': ClvOrden,
          'ClvUsuario': $localStorage.currentUser.IdUsuario,
          'Status': 'P'
        }

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddNueRelOrdenUsuario, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };




    factory.GetConMotCanList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetConMotCanList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };

    factory.GetChecaMotivoCanServ = function (ClvOrden) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvOrden': ClvOrden
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetChecaMotivoCanServ, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };





    factory.AddCambia_Tipo_cablemodem = function (ClvOrden) {
      var deferred = $q.defer();
      var Parametros = {
        'objCambia_Tipo_cablemodem': {
          'ClvOrden': ClvOrden,
          'Tipo': 1
        }

      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddCambia_Tipo_cablemodem, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };







    factory.GetCheca_si_tiene_camdo = function (ClvOrden) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvOrden': ClvOrden
      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetCheca_si_tiene_camdo, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.GetValida_DetOrden = function (ClvOrden) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvOrden': ClvOrden
      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetValida_DetOrden, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };



    factory.GetDimeSiGrabaOrd = function (ClvOrden, Fecha) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvOrden': ClvOrden,
        'Guarda': 0,
        'Fecha': Fecha
      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetDimeSiGrabaOrd, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };



    factory.GetDime_Que_servicio_Tiene_cliente = function (Contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'Contrato': Contrato
      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetDime_Que_servicio_Tiene_cliente, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.GetuspContratoServList = function (contrato, tipser) {
      var deferred = $q.defer();
      var Parametros = {
        'Contrato': contrato,
        'TipSer': tipser
      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetuspContratoServList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.GetBorraMotivoCanServ2 = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'Clv_Orden': obj.Clv_Orden,
        'Clv_TipSer': obj.Clv_TipSer,
        'ContratoNet': obj.ContratoNet,
        'Clv_UnicaNet': obj.Clv_UnicaNet,
        'Op': 0

      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetBorraMotivoCanServ2, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.DeleteIPAQUD = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'Clave': obj.Clave,
        'Clv_Orden': obj.Clv_Orden,
        'Contratonet': obj.Contratonet,
        'Clv_UnicaNet': obj.Clv_UnicaNet,
        'Op': 0
      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.DeleteIPAQUD, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.DeleteIPAQU = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'Clave': obj.Clave,
        'Clv_Orden': obj.Clv_Orden,
        'Contratonet': obj.Contratonet,
        'Clv_UnicaNet': obj.Clv_UnicaNet,
        'Op': 0
      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.DeleteIPAQU, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.AddIPAQUD = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'objIPAQUD': {
          'Clave': obj.Clave,
          'Clv_Orden': obj.Clv_Orden,
          'Contratonet': obj.Contratonet,
          'Clv_UnicaNet': obj.Clv_UnicaNet,
          'Op': obj.Op,
          'Status': obj.Status
        }

      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddIPAQUD, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.MUESTRAAPARATOS_DISCPONIBLES = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'Op': obj.Op,
        'Trabajo': obj.Trabajo,
        'Contrato': obj.Contrato,
        'ClvTecnico': obj.ClvTecnico,
        'ClvOrden': obj.ClvOrden,
        'Clave': obj.Clave
      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.MUESTRAAPARATOS_DISCPONIBLES, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.AddSP_GuardaIAPARATOS = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'objSP_GuardaIAPARATOS': {
          'Clave': obj.Clave,
          'Trabajo': obj.Trabajo,
          'ClvOrden': obj.ClvOrden,
          'ContratoNet': obj.ContratoNet,
          'ClvAparato': obj.ClvAparato,
          'Op': obj.Op,
          'Status': obj.Status
        }

      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddSP_GuardaIAPARATOS, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };






    factory.guardaMotivoCancelacion = function (objeto) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.guardaMotivoCancelacion, JSON.stringify(objeto), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.addIpaqu = function (obIpaqu) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.addIpaqu, JSON.stringify(obIpaqu), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.detalleCableModem = function (modem) {
      var deferred = $q.defer();
      var Parametros = {
        'ContratoNet': modem.contrato,
        'Status': '',
        'Op': modem.op,
        'ClvOS': modem.orden,
        'ClvDetOs': modem.detalle
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.detalleCableModem, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getCableModemsCli = function (contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'Contrato': contrato,
        'Status': 'P',
        'Op': 14
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.getCableModemsCli, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.consultaCambioDomicilio = function (detalle, orden, contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'CLAVE': detalle,
        'Clv_Orden': orden,
        'CONTRATO': contrato

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.consultaCambioDomicilio, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.consultaTablaServicios = function (orden) {
      var deferred = $q.defer();
      var Parametros = {
        'Clv_Orden': orden
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.consultaTablaServicios, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.addCambioDomicilio = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'objCAMDO': {
          'CLAVE': obj.clv_detalle,
          'Clv_Orden': obj.clv_orden,
          'CONTRATO': obj.contrato,
          'Clv_Calle': obj.calle,
          'NUMERO': obj.numero,
          'ENTRECALLES': obj.entrecalles,
          'Clv_Colonia': obj.colonia,
          'TELEFONO': obj.telefono,
          'ClvTecnica': 0,
          'Clv_Ciudad': obj.ciudad,
          'Num_int': obj.numinterior,
          'Clv_Sector': 0,
          'Clv_Localidad': obj.localidad
        }
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.addCambioDomicilio, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.addDetalleOrden = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'objDetOrdSer': {
          'Clv_Orden': obj.clave,
          'Clv_Trabajo': obj.trabajo,
          'Obs': obj.observaciones,
          'SeRealiza': obj.seRealiza,
        }

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.post(globalService.getUrl() + paths.addDetalleOrden, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.validaOrden = function (contrato, servicio) {
      var deferred = $q.defer();
      var Parametros = {
        'Contrato': contrato,
        'TipSer': servicio,
        'Usuario': $localStorage.currentUser.usuario
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.validaOrden, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.addOrdenServicio = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'objOrdSer': {
          'Clv_TipSer': 0,
          'Contrato': obj.contrato,
          'Fec_Sol': obj.fecha,
          'Fec_Eje': '',
          'Visita1': '',
          'Visita2': '',
          'Status': 'P',
          'Clv_Tecnico': 0,
          'IMPRESA': 0,
          'Clv_FACTURA': 0,
          'Obs': obj.observaciones,
          'ListadeArticulos': ''
        }

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.addOrdenServicio, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getPlazas = function () {
      var deferred = $q.defer();
      var user = $localStorage.currentUser.idUsuario;
      var Parametros = {
        'ClvUsuario': user,
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.plazas, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getContratoReal = function (contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'ContratoCom': contrato,
        'Nombre': '',
        'Apellido_Paterno': '',
        'Apellido_Materno': '',
        'CALLE': '',
        'NUMERO': '',
        'ClvColonia': 0,
        'SetupBox': '',
        'IdUsuario': $localStorage.currentUser.idUsuario,
        'TipoSer': 0,
        'Op': 0
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.buscarClientes, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.addBitacoraReenviar = function (contrato) {
      var deferred = $q.defer();
      var user = $localStorage.currentUser.usuario;
      var Parametros = {
        'objReenviarEdoCuenta': {
          'Usuario': user,
          'Contrato': contrato
        }

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.addBitacoraReenviar, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.addBitacoraReproceso = function (contrato) {
      var deferred = $q.defer();
      var user = $localStorage.currentUser.usuario;
      var Parametros = {
        'objReprocesarEdoCuenta': {
          'Usuario': user,
          'Contrato': contrato
        }

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.addBitacoraReproceso, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getUsuarios = function () {
      var deferred = $q.defer();
      var Parametros = {
        'OP': 2
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.usuarios, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.buscarOrdenes = function (objOrd) {
      var deferred = $q.defer();
      var Parametros = {
        'Op': objOrd.op,
        'Clv_Orden': objOrd.orden,
        'Contrato': objOrd.contrato,
        'Nombre': objOrd.nombre,
        'Apellido_Paterno': objOrd.paterno,
        'Apellido_Materno': objOrd.materno,
        'CALLE': objOrd.calle,
        'NUMERO': objOrd.numero,
        'ClvColonia': objOrd.colonia,
        'IdCompania': objOrd.compania,
        'SetupBox': objOrd.setupbox,
        'ClvUsuario': $localStorage.currentUser.idUsuario,
        'STATUS': objOrd.status,
        'Auto': objOrd.auto
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.buscarOrdenes, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getColonias = function (idcomp) {
      var deferred = $q.defer();
      var Parametros = {
        'idcompania': idcomp
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.colonias, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getColoniasUser = function () {
      var deferred = $q.defer();
      var Parametros = {
        'IdUsuario': $localStorage.currentUser.idUsuario
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.buscarColonia, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.buscarClientes = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'ContratoCom': obj.contrato,
        'Nombre': obj.nombre,
        'Apellido_Paterno': obj.paterno,
        'Apellido_Materno': obj.materno,
        'CALLE': obj.calle,
        'NUMERO': obj.numero,
        'ClvColonia': obj.colonia,
        'SetupBox': obj.setupbox,
        'IdUsuario': $localStorage.currentUser.idUsuario,
        'TipoSer': 0,
        'Op': obj.op

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.buscarClientes, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.buscarCliPorContrato = function (contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'CONTRATO': contrato,
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.buscarCliPorContrato, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.serviciosCliente = function (contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'Contrato': contrato,
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.serviciosCliente, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.dimeServicio = function (contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'Contrato': contrato,
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.dimeServicio, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.muestraTrabajo = function (tipo, usua) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvTipSer': tipo,
        'TipoUser': usua
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.muestraTrabajo, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getCiudadCamdo = function (contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'CONTRATO': contrato
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.getCiudadCamdo, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getLocalidadCamdo = function (contrato, idCiudad) {
      var deferred = $q.defer();
      var Parametros = {
        'CONTRATO': contrato,
        'Clv_Ciudad': idCiudad
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.getLocalidadCamdo, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getColoniaCamdo = function (contrato, idLocalidad) {
      var deferred = $q.defer();
      var Parametros = {
        'CONTRATO': contrato,
        'Clv_Localidad': idLocalidad
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.getColoniaCamdo, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getCalleCamdo = function (contrato, idColonia) {
      var deferred = $q.defer();
      var Parametros = {
        'CONTRATO': contrato,
        'Clv_Colonia': idColonia
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.getCalleCamdo, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.MuestraMedioPorServicoContratado = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvUnicaNet': obj.ClvUnicaNet
      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.MuestraMedioPorServicoContratado, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.MuestraArbolServiciosAparatosPorinstalar = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'clv_orden': obj.clv_orden
      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.MuestraArbolServiciosAparatosPorinstalar, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.MuestraTipoAparato=function (obj) {
      var deferred = $q.defer();
      var Parametros = obj;

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.MuestraTipoAparato, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.MuestraServiciosRelTipoAparato=function (obj) {
      var deferred = $q.defer();
      var Parametros = obj;

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.MuestraServiciosRelTipoAparato, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.MuestraAparatosDisponibles= function (obj) {
      var deferred = $q.defer();

      var Parametros = {
        'clv_orden': obj.clv_orden,
        'Clv_Tecnico': obj.Clv_Tecnico,
        'idArticulo':obj.idArticulo
      };

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.MuestraAparatosDisponibles, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.AsignaAparatosAlServicio=function (obj) {
      var deferred = $q.defer();

      var Parametros = obj;

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AsignaAparatosAlServicio, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    return factory;
  });
