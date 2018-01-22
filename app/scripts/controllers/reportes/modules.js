'use strict';
angular
	.module('softvApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home.reportes',
				abstract: true,
				template: '<div ui-view></div>'
			},
			{
				name: 'home.reportes.ciudadcartera',
				data: {
					pageTitle: 'SAC | REPORTES POR CIDAD Y CARTERA',
					permissions: {
						only: ['reporteporciudadycarteraSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reporteciudadcartera',
				templateUrl: 'views/reportes/reporteciudadcartera.html',
				controller: 'ReporteCuidadCarteraCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.cortes',
				data: {
					pageTitle: 'SAC | REPORTES DE CORTES',
					permissions: {
						only: ['cortesSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/cortes',
				templateUrl: 'views/reportes/ReporteCortes.html',
				controller: 'ReporteCortesCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.especiales',
				data: {
					pageTitle: 'SAC | REPORTES DE CORTES ESPECIALES',
					permissions: {
						only: ['cortesespecialesSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/especiales',
				templateUrl: 'views/reportes/ReporteSucursales.html',
				controller: 'ReporteSucursalesCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportesVarios',
				data: {
					pageTitle: 'SAC | REPORTES VARIOS',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/varios',
				templateUrl: 'views/reportes/reportesVarios2.html',
				controller: 'ReportesVarios2Ctrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.permanencia',
				data: {
					pageTitle: 'SAC | REPORTE DE PERMANENCIA',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/permanencia',
				templateUrl: 'views/reportes/reportePermanencia.html',
				controller: 'reportePermanenciaCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.suscriptores',
				data: {
					pageTitle: 'SAC | REPORTE DE SUSCRIPTORES',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/suscriptores',
				templateUrl: 'views/reportes/suscriptores.html',
				controller: 'suscriptoresCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.documentos',
				data: {
					pageTitle: 'SAC | REPORTE DE CLIENTES SIN DOCUMENTOS',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/clientesdocumentos',
				templateUrl: 'views/reportes/clientesDocumentos.html',
				controller: 'clientesDocumentosCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.prospectos',
				data: {
					pageTitle: 'SAC | REPORTE DE PROSPECTOS',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/prospectos',
				templateUrl: 'views/reportes/prospectos.html',
				controller: 'prospectosCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.hoteles',
				data: {
					pageTitle: 'SAC | REPORTE DE HOTELES',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/hoteles',
				templateUrl: 'views/reportes/hoteles.html',
				controller: 'hotelesCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.ordenesservicio',
				data: {
					pageTitle: 'SAC | REPORTE DE ORDENES DE SERVICIO',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/ordenenesdeservicio',
				templateUrl: 'views/reportes/reporteordenesServicio.html',
				controller: 'reporteOrdenesServicioCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.reportes',
				data: {
					pageTitle: 'SAC | REPORTES AREA TECNICA',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/reportesareatecnica',
				templateUrl: 'views/reportes/reportes.html',
				controller: 'reporteReportesCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.actividadestecnico',
				data: {
					pageTitle: 'SAC | REPORTES ACTIVIDADES DE TECNICO',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/actividadestecnico',
				templateUrl: 'views/reportes/actividadesTecnico.html',
				controller: 'reporteActividadesTecnicoCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.agendatecnico',
				data: {
					pageTitle: 'SAC | AGENDA ACTIVIDADES DE TECNICO',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/agendatecnico',
				templateUrl: 'views/reportes/agendaTecnico.html',
				controller: 'reporteAgendaTecnicoCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.devolucionalmacen',
				data: {
					pageTitle: 'SAC | DEVOLUCION DE APARATOS AL ALMACEN',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/devolucionalmacen',
				templateUrl: 'views/reportes/devolucionAlmacen.html',
				controller: 'reporteDevolucionAlmacenCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.pendientesrealizar',
				data: {
					pageTitle: 'SAC | PENDIENTES A REALIZAR',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/pendientesrealizar',
				templateUrl: 'views/reportes/reportePendientesRealizar.html',
				controller: 'reportePendientesRealizarCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.atenciotelefonica',
				data: {
					pageTitle: 'SAC | ATENCION TELEFONICA',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/atenciontelefonica',
				templateUrl: 'views/reportes/reporteAtencionTelefonica.html',
				controller: 'reporteAtencionTelefonicaCtrl',
				controllerAs: '$ctrl'
			}


			
		];
		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
