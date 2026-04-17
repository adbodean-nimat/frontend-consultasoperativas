import { createRouter, createWebHistory } from "vue-router";
import { getToken, clearToken } from "@/services/auth";
import { isTokenExpired, decodeJwt } from "@/services/jwt";

import Tablero from "@/views/Tablero.vue";
import ConsultasOperativas from "@/views/ConsultasOperativas.vue";
import Cartelerias from "@/views/Cartelerias.vue";
import ControlAltaClientes from "@/views/ControlAltaClientes.vue";
import ListadeClientes from "@/views/ListadeClientes.vue";
import DeposANoConsiderar from "@/views/TDeposaNoConsiderar.vue";
import NPAConsiderar from "@/views/TNPaConsiderar.vue";
import DimensionesContenedores from "@/views/TDimensionesContenedores.vue";
import MovimientosContenedores from "@/views/TMovimientosDeContenedores.vue";
import ListaContenedores from "@/views/Containers.vue";
import ListaPyR from "@/views/PisosyRevestimiento.vue";
import ListaPyRConStock from "@/views/PisosyRevestimientoCStock.vue";
import ListaBUI from "@/views/BreveUsoInterno.vue";
import ListadePrecioBUI from "@/views/TListadePrecioBUI.vue";
import ListaConstSeco from "@/views/ConstSeco.vue";
import Tablas from "@/views/Tablas.vue";
import Login from "@/views/Login.vue";
import ListaRubrosVtas from "@/views/RubrosVentas.vue";
import ListaSetsVtas from "@/views/SetsVentas.vue";
import SetsDeVentas from "@/views/TSetsVentas.vue";
import FamiliaDeArticulos from "@/views/TFamiliaArticulos.vue";
import FamiliaDeArticulosDistribucion from "@/views/TFamiliaArticulosDistribucion.vue";
import VincularArticuloAFamilia from "@/views/TVincularArticuloAFamilia.vue";
import ConstSecoArmadoConfig1 from "@/views/TCSArmadoConfig1.vue";
import ConstSecoArmadoConfig2 from "@/views/TCSArmadoConfig2.vue";
import ConstSecoNombresConfiguraciones from "@/views/TCSNombresConfig.vue";
import RowaPlanCanje from "@/views/RowaPlanCanje.vue";
import VblesEntrNPG from "@/views/VblesEntrNP.vue";
import VblesEntrNPPR from "@/views/VblesEntrNPPR.vue";
import ListaPrecioCostoDeReposicion from "@/views/ListaPrecioCostoReposicion.vue";
import ListaPrecioVentaAlPublico from "@/views/ListaPrecioVentaAlPublico.vue";
import ListaDistribucion from "@/views/RVDistribucion.vue";
import ProductosParaDistribucion from "@/views/TProductosDistribucion.vue";
import CartelCombo from "@/views/CartelxCombo.vue";
import CartelM2 from "@/views/CartelxM2.vue";
import CartelM2Saldo from "@/views/CartelxM2Saldo.vue";
import CartelArticulo from "@/views/CartelxCodArt.vue";
import CartelManual from "@/views/CartelxManual.vue";
import RubrosVentas from "@/views/TRubrosVentas.vue";
import WebNimat from "@/views/WebNimat.vue";
import CategoriasWeb from "@/views/CategoriasWeb.vue";
import ArticulosWeb from "@/views/ArticulosWeb.vue";
import DeposANoConsiderarParaStockFisico from "@/views/TDepositoANoConsiderarParaStockFisico.vue";
import ListaRubrosVtasAcopio from "@/views/RubrosVentasAcopio.vue";
import ListaCombo from "@/views/Combo.vue";
import ComprobantesAOmitir from "@/views/TComprobantesAOmitir.vue";
import AcopioCementoLN from "@/views/AcopioCemento.vue";
import RemitosVtas from "@/views/TRemitosVtas.vue";
import STOCKNPOCCalesCementosPlasticor from "@/views/CalesCementosPlasticor.vue";
import ArtCalesCementosPlasticor from "@/views/TCalesCementosPlasticor.vue";
import ConsultasClientesCADPLATAFORMA from "@/views/ClientesCADPlataforma.vue";
import npconproblemaei from "@/views/NPConProblemaEI.vue";
import ConsultaInformesAcindarFechas from "@/views/InformesAcindarFechas.vue";
import ClasifClientes from "@/views/TClasifClientesAcindar.vue";
import AcindarComprobantes from "@/views/TComprobantesAcindar.vue";
import EquivalCodFactorCant from "@/views/TEquivalCodFactorCant.vue";
import ConsultaQR from "@/views/ConsultaQR.vue";
import artsclasif5stockmanual from "@/views/TArtsClasif5StockManual.vue";
import ConsultaOrdenesCompra from "@/views/ConsultaOrdenesCompra.vue";
import GestionDeCompras from "@/views/GestionCompras.vue";
import ParametrosDeCompras from "@/views/ParametrosdeCompras.vue";
import InfoArticulosCompranCorrientemente from "@/views/InfoArticulosCompranCorrientemente.vue";
import ChatBotAI from "@/views/ChatBot.vue";
import GestionDeDistribucion from "@/views/GestionDistribucion.vue";
import ParametrosDeDistribucion from "@/views/ParametrosdeDistribucion.vue";
import ListadeClientesDistribucion from "@/views/ListadeClientesDistribucion.vue";
import TiempoEntregasInmediata from "@/views/TiempoEntregasInmediata.vue";
import RatioCompras from "@/views/RatioCompras.vue";
import InfoArticulosCompranCorrientemente2 from "@/views/InfoArticulosCompranCorrientemente2.vue";
import GestionDeFinanzas from "@/views/GestionFinanzas.vue";
import ImportarMasivoFinanzas from "@/views/ImportarMasivoFinanzas.vue";
import FinanzasView from "@/views/FinanzasView.vue";
import ControlStockNPOC from "@/views/ControlStockNPOC.vue";
import RecepcionProveedoresGrid from "@/views/RecepcionProveedores.vue";

const routes = [
	{
		path: "/login",
		name: "Login",
		component: Login,
		props: true,
		meta: {
			requiresAuth: false,
			title: "Consultas Operativas - Login",
			metaTags: [
				{
					name: "Login",
				},
			],
		},
	},
	{
		path: "/chatbot",
		name: "ChatBot",
		component: ChatBotAI,
		props: true,
		meta: {
			requiresAuth: true,
			title: "Chat Bot AI",
			metaTags: [{ name: "Chat Bot AI" }],
		},
	},
	{
		path: "/",
		name: "tablero",
		alias: "/tablero",
		component: Tablero,
		props: true,
		meta: {
			requiresAuth: true,
			title: "Tablero",
			metaTags: [
				{
					name: "Tablero",
				},
			],
		},
	},
	{
		path: "/co",
		children: [
			{
				path: "",
				name: "consultasoperativas",
				component: ConsultasOperativas,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Consultas Operativas",
					back: true,
					metaTags: [
						{
							name: "Consultas Operativas",
						},
					],
				},
			},
			{
				path: "controlaltaclientes",
				name: "control-alta-clientes",
				component: ControlAltaClientes,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Control Alta Clientes",
					back: true,
					metaTags: [
						{
							name: "Control Alta Clientes",
						},
					],
				},
			},
			{
				path: "listadeclientes",
				name: "listadeclientes",
				component: ListadeClientes,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Lista de Clientes",
					back: true,
					metaTags: [
						{
							name: "Lista de Clientes",
						},
					],
				},
			},
			{
				path: "vblesentrnpg",
				name: "vblesentrnpg",
				component: VblesEntrNPG,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Variables Entregas NP - General",
					back: true,
					metaTags: [
						{
							name: "Variables Entregas NP - General",
						},
					],
				},
			},
			{
				path: "vblesentrnppr",
				name: "vblesentrnppr",
				component: VblesEntrNPPR,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Variables Entregas NP - Pisos y revistimiento",
					back: true,
					metaTags: [
						{
							name: "Variables Entregas NP - Pisos y revistimiento",
						},
					],
				},
			},
			{
				path: "listaprecioscostoreposicion",
				name: "listaprecioscostoreposicion",
				component: ListaPrecioCostoDeReposicion,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Lista de precios - Costo de reposición",
					back: true,
					metaTags: [
						{
							name: "Lista de precios - Costo de reposición",
						},
					],
				},
			},
			{
				path: "listapreciosventaalpublico",
				name: "listapreciosventaalpublico",
				component: ListaPrecioVentaAlPublico,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Lista de precios - Venta al público",
					back: true,
					metaTags: [
						{
							name: "Lista de precios - Venta al público",
						},
					],
				},
			},
			{
				path: "listaprecioscontainers",
				name: "listaprecioscontainers",
				component: ListaContenedores,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Lista de precio - Containers",
					back: true,
					metaTags: [
						{
							name: "Lista de precio - Containers",
						},
					],
				},
			},
			{
				path: "listapreciospisosyrevestimiento",
				name: "listapreciospisosyrevestimiento",
				component: ListaPyR,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Lista de precio - Pisos y Revestimiento",
					back: true,
					metaTags: [
						{
							name: "Lista de precio - Pisos y Revestimiento",
						},
					],
				},
			},
			{
				path: "listapreciospisosyrevestimientoconstock",
				name: "listapreciospisosyrevestimientoconstock",
				component: ListaPyRConStock,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Lista de precio - Pisos y Revistimiento con Stock",
					back: true,
					metaTags: [
						{
							name: "Lista de precio - Pisos y Revistimiento con Stock",
						},
					],
				},
			},
			{
				path: "listapreciosbreveusointerno",
				name: "listapreciosbreveusointerno",
				component: ListaBUI,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Lista de precio - Breve Uso Interno",
					back: true,
					metaTags: [
						{
							name: "Lista de precio - Breve Uso Interno",
						},
					],
				},
			},
			{
				path: "preciosconsumosconstseco",
				name: "preciosconsumosconstseco",
				component: ListaConstSeco,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Precios y Consumos - Const. Seco",
					back: true,
					metaTags: [
						{
							name: "Precios y Consumos - Const. Seco",
						},
					],
				},
			},
			{
				path: "listapreciosrubrosvtas",
				name: "listapreciosrubrosvtas",
				component: ListaRubrosVtas,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Lista de precio - Rubros Ventas",
					back: true,
					metaTags: [
						{
							name: "Lista de precio - Rubros Ventas",
						},
					],
				},
			},
			{
				path: "listapreciosrubrosvtasacopio",
				name: "listapreciosrubrosvtasacopio",
				component: ListaRubrosVtasAcopio,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Lista de precio - Rubros Ventas Acopio",
					back: true,
					metaTags: [
						{
							name: "Lista de precio - Rubros Ventas Acopio",
						},
					],
				},
			},
			{
				path: "listapreciossetsvtas",
				name: "listapreciossetsvtas",
				component: ListaSetsVtas,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Lista de precio - Sets Ventas",
					back: true,
					metaTags: [
						{
							name: "Lista de precio - Sets Ventas",
						},
					],
				},
			},
			{
				path: "listapreciosdistribucion",
				name: "listapreciosdistribucion",
				component: ListaDistribucion,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Lista de precios - Distribución",
					back: true,
					metaTags: [
						{
							name: "Lista de precios - Distribución",
						},
					],
				},
			},
			{
				path: "rowaplancanjexsiempre",
				name: "rowaplancanjexsiempre",
				component: RowaPlanCanje,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Rowa - Plan canje por siempre",
					back: true,
					metaTags: [
						{
							name: "Rowa - Plan canje por siempre",
						},
					],
				},
			},
			{
				path: "listaprecioscombo",
				name: "listaprecioscombo",
				component: ListaCombo,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Lista de precios - Combo",
					back: true,
					metaTags: [
						{
							name: "Lista de precios - Combo",
						},
					],
				},
			},
			{
				path: "acopiocementolomanegra",
				name: "acopiocementolomanegra",
				component: AcopioCementoLN,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Acopio - Cemento Loma Negra",
					back: true,
					metaTags: [
						{
							name: "Acopio - Cemento Loma Negra",
						},
					],
				},
			},
			{
				path: "stocknpoccalescementosplasticor",
				name: "stocknpoccalescementosplasticor",
				component: STOCKNPOCCalesCementosPlasticor,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Stock NP OC - Cales, Cementos, Plasticor",
					back: true,
					metaTags: [
						{
							name: "Stock NP OC - Cales, Cementos, Plasticor",
						},
					],
				},
			},
			{
				path: "consultaporqr",
				name: "consultaporqr",
				component: ConsultaQR,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Consulta por QR",
					back: true,
					metaTags: [
						{
							name: "Consulta por QR",
						},
					],
				},
			},
			{
				path: "npconproblemaentregainmediata",
				name: "npconproblemaentregainmediata",
				component: npconproblemaei,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Nota de pedido con problema - Entrega inmediata",
					back: true,
					metaTags: [
						{
							name: "Nota de pedido con problema - Entrega inmediata",
						},
					],
				},
			},
			{
				path: "consultaordencompra",
				name: "consultaordencompra",
				component: ConsultaOrdenesCompra,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Consulta Orden de compra",
					back: true,
					metaTags: [
						{
							name: "Consulta Orden de compra",
						},
					],
				},
			},
			{
				path: "consultatiempoentregasinmediata",
				name: "consultatiempoentregasinmediata",
				component: TiempoEntregasInmediata,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Consulta - Tiempo Entregas Inmediata",
					back: true,
					metaTags: [
						{
							name: "Consulta - Tiempo Entregas Inmediata",
						},
					],
				},
			},
		],
	},
	{
		path: "/ca",
		children: [
			{
				path: "",
				name: "cartelerias",
				component: Cartelerias,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Cartelería",
					back: true,
					metaTags: [
						{
							name: "Cartelería",
						},
					],
				},
			},
			{
				path: "combo",
				name: "carteleriascombo",
				component: CartelCombo,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Cartel Combo",
					back: true,
					metaTags: [
						{
							name: "Cartel Combo",
						},
					],
				},
			},
			{
				path: "m2",
				name: "carteleriasm2",
				component: CartelM2,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Cartel M2",
					back: true,
					metaTags: [
						{
							name: "Cartel M2",
						},
					],
				},
			},
			{
				path: "m2saldo",
				name: "carteleriasm2saldo",
				component: CartelM2Saldo,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Cartel M2 Saldo",
					back: true,
					metaTags: [
						{
							name: "Cartel M2 Saldo",
						},
					],
				},
			},
			{
				path: "articulo",
				name: "carteleriasarticulo",
				component: CartelArticulo,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Cartel Articulo",
					back: true,
					metaTags: [
						{
							name: "Cartel Articulo",
						},
					],
				},
			},
			{
				path: "manual",
				name: "carteleriasmanual",
				component: CartelManual,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Cartel Manual",
					back: true,
					metaTags: [
						{
							name: "Cartel Manual",
						},
					],
				},
			},
		],
	},
	{
		path: "/wn",
		children: [
			{
				path: "",
				name: "webnimat",
				component: WebNimat,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Web NIMAT",
					back: true,
					metaTags: [
						{
							name: "Web NIMAT",
						},
					],
				},
			},
			{
				path: "categorias",
				name: "webnimatcategorias",
				component: CategoriasWeb,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Web NIMAT - Categorias",
					back: true,
					metaTags: [
						{
							name: "Web NIMAT - Categorias",
						},
					],
				},
			},
			{
				path: "articulos",
				name: "webnimatarticulos",
				component: ArticulosWeb,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Web NIMAT - Articulos",
					back: true,
					metaTags: [
						{
							name: "Web NIMAT - Articulos",
						},
					],
				},
			},
		],
	},
	{
		path: "/cad",
		name: "consultascadplataforma",
		component: ConsultasClientesCADPLATAFORMA,
		props: true,
		meta: {
			requiresAuth: true,
			roles: ["Gerencia", "Administracion y Finanzas", "Sistemas"],
			title: "Consultas Clientes entre CAD y Plataforma",
			back: true,
			metaTags: [
				{
					name: "Consultas Clientes entre CAD y Plataforma",
				},
			],
		},
	},
	{
		path: "/cia",
		name: "Consulta Informes de Acindar",
		component: ConsultaInformesAcindarFechas,
		props: true,
		meta: {
			requiresAuth: true,
			roles: ["Gerencia", "Sistemas", "Compras"],
			title: "Consulta informes de Acindar",
			back: true,
			metaTags: [
				{
					name: "Consulta informes de Acindar",
				},
			],
		},
	},
	{
		path: "/gdf",
		children: [
			{
				path: "",
				name: "Gestión de Finanzas",
				component: GestionDeFinanzas,
				props: true,
				meta: {
					requiresAuth: true,
					roles: ["Gerencia", "Sistemas", "Administracion y Finanzas"],
					title: "Gestión de Finanzas",
					back: true,
					metaTags: [
						{
							name: "Gestión de Finanzas",
						},
					],
				},
			},
			{
				path: "panelfinanzas",
				name: "panelfinanzas",
				component: FinanzasView,
				props: true,
				meta: {
					requiresAuth: true,
					roles: ["Gerencia", "Sistemas", "Administracion y Finanzas"],
					title: "Panel Finanzas",
					back: true,
					metaTags: [
						{
							name: "Panel Finanzas",
						},
					],
				},
			},
			{
				path: "importarmasivofinanzas",
				name: "importarmasivofinanzas",
				component: ImportarMasivoFinanzas,
				props: true,
				meta: {
					requiresAuth: true,
					roles: ["Gerencia", "Sistemas", "Administracion y Finanzas"],
					title: "Importar masivo de finanzas",
					back: true,
					metaTags: [
						{
							name: "Importar masivo de finanzas",
						},
					],
				},
			},
		],
	},
	{
		path: "/gdd",
		children: [
			{
				path: "",
				name: "gestiondedistribucion",
				component: GestionDeDistribucion,
				props: true,
				meta: {
					requiresAuth: true,
					roles: ["Gerencia", "Sistemas", "Ventas"],
					title: "Gestión de Distribución",
					back: true,
					metaTags: [
						{
							name: "Gestión de Distribución",
						},
					],
				},
			},
			{
				path: "listadeclientesdistribucion",
				name: "listadeclientesdistribucion",
				component: ListadeClientesDistribucion,
				props: true,
				meta: {
					requiresAuth: true,
					roles: ["Gerencia", "Sistemas", "Ventas"],
					title: "Lista de Clientes de Distribución",
					back: true,
					metaTags: [
						{
							name: "Lista de Clientes de Distribución",
						},
					],
				},
			},
			{
				path: "parametrosdedistribucion",
				name: "Parametros de Distribución",
				component: ParametrosDeDistribucion,
				props: true,
				meta: {
					requiresAuth: true,
					roles: ["Gerencia", "Sistemas", "Ventas"],
					title: "Parametros de Distribución",
					back: true,
					metaTags: [
						{
							name: "Parametros de Distribución",
						},
					],
				},
			},
		],
	},
	{
		path: "/gdc",
		children: [
			{
				path: "",
				name: "gestiondecompras",
				component: GestionDeCompras,
				props: true,
				meta: {
					requiresAuth: true,
					roles: ["Gerencia", "Compras", "Exhibicion", "Sistemas"],
					title: "Gestión de Compras",
					back: true,
					metaTags: [
						{
							name: "Gestión de Compras",
						},
					],
				},
			},
			{
				path: "controlstocknpoc",
				name: "controlstocknpoc",
				component: ControlStockNPOC,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Control Stock NP OC",
					back: true,
					roles: ["Gerencia", "Sistemas", "Compras"],
					metaTags: [
						{
							name: "Control Stock NP OC",
						},
					],
				},
			},
			{
				path: "parametrosdecompras",
				name: "parametrosdecompras",
				component: ParametrosDeCompras,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Parametros de Compras",
					back: true,
					roles: ["Gerencia", "Sistemas", "Compras"],
					metaTags: [
						{
							name: "Parametros de Compras",
						},
					],
				},
			},
			{
				path: "ratiocompras",
				name: "ratiocompras",
				component: RatioCompras,
				props: true,
				meta: {
					requiresAuth: true,
					roles: ["Gerencia", "Sistemas", "Compras"],
					title: "Ratio de Compras",
					back: true,
					metaTags: [
						{
							name: "Ratio de Compras",
						},
					],
				},
			},
			{
				path: "infodearticulosquesecomprancorrientemente",
				name: "infodearticulosquesecomprancorrientemente",
				component: InfoArticulosCompranCorrientemente,
				props: true,
				meta: {
					requiresAuth: true,
					roles: ["Gerencia", "Sistemas", "Compras"],
					title: "Info de Artículos que se compran corrientemente",
					back: true,
					metaTags: [
						{
							name: "Info de Artículos que se compran corrientemente",
						},
					],
				},
			},
			{
				path: "infodearticulosquesecomprancorrientemente2",
				name: "infodearticulosquesecomprancorrientemente2",
				component: InfoArticulosCompranCorrientemente2,
				props: true,
				meta: {
					requiresAuth: true,
					roles: ["Gerencia", "Sistemas", "Compras"],
					title: "Info de Artículos que se compran corrientemente 2",
					back: true,
					metaTags: [
						{
							name: "Info de Artículos que se compran corrientemente 2",
						},
					],
				},
			},
			{
				path: "recepciondeproveedores",
				name: "recepciondeproveedores",
				component: RecepcionProveedoresGrid,
				props: true,
				meta: {
					requiresAuth: true,
					roles: ["Gerencia", "Sistemas", "Compras", "Exhibicion"],
					title: "Recepción de proveedores",
					back: true,
					metaTags: [
						{
							name: "Recepción de proveedores",
						},
					],
				},
			},
		],
	},
	{
		path: "/tabla",
		children: [
			{
				path: "",
				name: "Tablas",
				component: Tablas,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tablas",
					back: true,
					metaTags: [
						{
							name: "Tablas",
						},
					],
				},
			},
			{
				path: "deposanoconsiderar",
				name: "Tabla: Deposito a No Considerar",
				component: DeposANoConsiderar,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Deposito a No Considerar",
					back: true,
					metaTags: [
						{
							name: "Deposito a No Considerar",
						},
					],
				},
			},
			{
				path: "deposanoconsiderarparastockfisico",
				name: "Tabla: Deposito a No Considerar para Stock Físico",
				component: DeposANoConsiderarParaStockFisico,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Deposito a No Considerar para Stock Físico",
					back: true,
					metaTags: [
						{
							name: "Deposito a No Considerar para Stock Físico",
						},
					],
				},
			},
			{
				path: "npaconsiderar",
				name: "Tabla: NP a Considerar",
				component: NPAConsiderar,
				props: true,
				meta: {
					requiresAuth: true,
					title: "NP a Considerar",
					back: true,
					metaTags: [
						{
							name: "NP a Considerar",
						},
					],
				},
			},
			{
				path: "dimensionescontenedores",
				name: "Tabla: Dimensiones aprox. de contenedores",
				component: DimensionesContenedores,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Dimensiones aprox. de contenedores",
					back: true,
					metaTags: [
						{
							name: "Dimensiones aprox. de contenedores",
						},
					],
				},
			},
			{
				path: "movimientosdecontenedores",
				name: "Tabla: Movimientos de contenedores",
				component: MovimientosContenedores,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Movimientos de contenedores",
					back: true,
					metaTags: [
						{
							name: "Movimientos de contenedores",
						},
					],
				},
			},
			{
				path: "listadepreciobreveusointerno",
				name: "Tabla: Lista de precio Breve Uso Interno",
				component: ListadePrecioBUI,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: Lista de precio Breve Uso Interno",
					back: true,
					metaTags: [
						{
							name: "Tabla: Lista de precio Breve Uso Interno",
						},
					],
				},
			},
			{
				path: "setsdeventas",
				name: "Tabla: #01 - Sets de Ventas",
				component: SetsDeVentas,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: #01 - Sets de Ventas",
					back: true,
					metaTags: [
						{
							name: "Tabla: #01 - Sets de Ventas",
						},
					],
				},
			},
			{
				path: "familiadearticulos",
				name: "Tabla: #02 - Familia de Articulos",
				component: FamiliaDeArticulos,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: #02 - Familia de Articulos",
					back: true,
					metaTags: [
						{
							name: "Tabla: #02 - Familia de Articulos",
						},
					],
				},
			},
			{
				path: "vinculararticuloafamilia",
				name: "Tabla: #03 - Vincular Articulo a Familia",
				component: VincularArticuloAFamilia,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: #03 - Vincular Articulo a Familia",
					back: true,
					metaTags: [
						{
							name: "Tabla: #03 - Vincular Articulo a Familia",
						},
					],
				},
			},
			{
				path: "armadoconfig1",
				name: "Tabla: Armado Config. 1",
				component: ConstSecoArmadoConfig1,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: Armado Config. 1",
					back: true,
					metaTags: [
						{
							name: "Tabla: Armado Config. 1",
						},
					],
				},
			},
			{
				path: "armadoconfig2",
				name: "Tabla: Armado Config. 2",
				component: ConstSecoArmadoConfig2,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: Armado Config. 2",
					back: true,
					metaTags: [
						{
							name: "Tabla: Armado Config. 2",
						},
					],
				},
			},
			{
				path: "nombresconfiguraciones",
				name: "Tabla: Nombres Configuraciones",
				component: ConstSecoNombresConfiguraciones,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: Nombres Configuraciones",
					back: true,
					metaTags: [
						{
							name: "Tabla: Nombres Configuraciones",
						},
					],
				},
			},
			{
				path: "productospdistribucion",
				name: "Tabla: Productos para Distribucion",
				component: ProductosParaDistribucion,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: Productos para Distribucion",
					back: true,
					metaTags: [
						{
							name: "Tabla: Productos para Distribucion",
						},
					],
				},
			},
			{
				path: "rubrosventas",
				name: "Tabla: Rubros Ventas",
				component: RubrosVentas,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: Rubros Ventas",
					back: true,
					metaTags: [
						{
							name: "Tabla: Rubros Ventas",
						},
					],
				},
			},
			{
				path: "familiaarticulosdistribucion",
				name: "Tabla: Familia de articulos para Distribución",
				component: FamiliaDeArticulosDistribucion,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: Familia de articulos para Distribución",
					back: true,
					metaTags: [
						{
							name: "Tabla: Familia de articulos para Distribución",
						},
					],
				},
			},
			{
				path: "acopio/comprobantesaomitir",
				name: "Tabla Acopio: Comprobantes a Omitir",
				component: ComprobantesAOmitir,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla Acopio: Comprobantes a Omitir",
					back: true,
					metaTags: [
						{
							name: "Tabla Acopio: Comprobantes a Omitir",
						},
					],
				},
			},
			{
				path: "acopio/remitosdeventas",
				name: "Tabla Acopio: Remitos de Ventas",
				component: RemitosVtas,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla Acopio: Remitos de Ventas",
					back: true,
					metaTags: [
						{
							name: "Tabla Acopio: Remitos de Ventas",
						},
					],
				},
			},
			{
				path: "calescementosplasticor",
				name: "Tabla: Articulos - Cales, Cementos, Plasticor",
				component: ArtCalesCementosPlasticor,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: Articulos - Cales, Cementos, Plasticor",
					back: true,
					metaTags: [
						{
							name: "Tabla: Articulos - Cales, Cementos, Plasticor",
						},
					],
				},
			},
			{
				path: "artsclasif5stockmanual",
				name: "Tabla: Arts Clasif. 5 - Stock Manual para la WEB NIMAT",
				component: artsclasif5stockmanual,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: Arts Clasif. 5 - Stock Manual para la WEB NIMAT",
					back: true,
					metaTags: [
						{
							name: "Tabla: Arts Clasif. 5 - Stock Manual para la WEB NIMAT",
						},
					],
				},
			},
			{
				path: "informesacindar/clasifclientes",
				name: "Tabla: Clasif. Clientes",
				component: ClasifClientes,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: Clasif. Clientes",
					back: true,
					metaTags: [
						{
							name: "Tabla: Clasif. Clientes",
						},
					],
				},
			},
			{
				path: "informesacindar/comprobantes",
				name: "Tabla: Comprobantes",
				component: AcindarComprobantes,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: Comprobantes",
					back: true,
					metaTags: [
						{
							name: "Tabla: Comprobantes",
						},
					],
				},
			},
			{
				path: "informesacindar/equivalcodfactorcant",
				name: "Tabla: Equival. Cod. y Factor Cant.",
				component: EquivalCodFactorCant,
				props: true,
				meta: {
					requiresAuth: true,
					title: "Tabla: Equival. Cod. y Factor Cant.",
					back: true,
					metaTags: [
						{
							name: "Tabla: Equival. Cod. y Factor Cant.",
						},
					],
				},
			},
		],
	},
	{
		path: "/sessionexpired",
		name: "SessionExpired",
		component: () => import("@/views/SessionExpired.vue"),
		props: true,
		meta: {
			requiresAuth: false,
			title: "Sesión Expirada",
			metaTags: [
				{
					name: "Sesión Expirada",
				},
			],
		},
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("@/views/NotFound.vue"),
		props: true,
		meta: {
			requiresAuth: false,
			title: "Página no encontrada",
			metaTags: [
				{
					name: "Página no encontrada",
				},
			],
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

function extractCN(dn) {
	// dn ejemplo: "CN=Sistemas,OU=Sistemas,OU=Usuarios Prades,DC=prades,DC=local"
	const m = /^CN=([^,]+)(,|$)/i.exec(String(dn));
	return m ? m[1].trim() : null;
}

router.beforeEach((to, from) => {
	// --- AUTH / ROLES ---
	if (to.meta.requiresAuth) {
		const token = getToken();

		if (!token) {
			return { name: "Login", query: { redirect: to.fullPath } };
		}

		if (isTokenExpired(token)) {
			clearToken("expired");
			return { name: "SessionExpired" };
		}

		const payload = decodeJwt(token);
		//console.log(payload.user);
		// Si la ruta pide roles, validamos contra memberOf -> CN
		if (to.meta.roles?.length) {
			const memberOf = payload?.user?.memberOf ?? [];

			const groupCns = (Array.isArray(memberOf) ? memberOf : [memberOf])
				.map(extractCN)
				.filter(Boolean);

			//console.log("AD groups (CN):", groupCns);

			const ok = to.meta.roles.some((required) => groupCns.includes(required));
			//console.log(ok);
			if (!ok) return { path: to.fullPath };
		}
	}

	// --- TITLE / METATAGS ---
	const nearestWithTitle = [...to.matched].reverse().find((r) => r.meta?.title);
	const nearestWithMeta = [...to.matched]
		.reverse()
		.find((r) => r.meta?.metaTags);
	const previousNearestWithMeta = [...from.matched]
		.reverse()
		.find((r) => r.meta?.metaTags);

	if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
	else if (previousNearestWithMeta?.meta?.title)
		document.title = previousNearestWithMeta.meta.title;

	Array.from(document.querySelectorAll("[data-vue-router-controlled]")).forEach(
		(el) => el.parentNode?.removeChild(el),
	);

	if (!nearestWithMeta) return true;

	nearestWithMeta.meta.metaTags
		.map((tagDef) => {
			const tag = document.createElement("meta");
			Object.keys(tagDef).forEach((k) => tag.setAttribute(k, tagDef[k]));
			tag.setAttribute("data-vue-router-controlled", "");
			return tag;
		})
		.forEach((tag) => document.head.appendChild(tag));

	return true;
});

export default router;
