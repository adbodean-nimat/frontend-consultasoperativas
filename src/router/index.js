import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";

import Tablero from '../views/Tablero.vue'
import ConsultasOperativas from '../views/ConsultasOperativas.vue'
import Cartelerias from '../views/Cartelerias.vue'
import ControlAltaClientes from '../views/ControlAltaClientes.vue'
import ListadeClientes from '../views/ListadeClientes.vue'
import DeposANoConsiderar from '../views/TDeposaNoConsiderar.vue'
import NPAConsiderar from '../views/TNPaConsiderar.vue'
import DimensionesContenedores from '../views/TDimensionesContenedores.vue'
import MovimientosContenedores from '../views/TMovimientosDeContenedores.vue'
import ListaContenedores from '../views/Containers.vue'
import ListaPyR from '../views/PisosyRevestimiento.vue'
import ListaPyRConStock from '../views/PisosyRevestimientoCStock.vue'
import ListaBUI from '../views/BreveUsoInterno.vue'
import ListadePrecioBUI from '../views/TListadePrecioBUI.vue'
import ListaConstSeco from "../views/ConstSeco.vue"
import Tablas from '../views/Tablas.vue'
import Login from "../views/Login.vue"
import ListaRubrosVtas from "../views/RubrosVentas.vue"
import ListaSetsVtas from "../views/SetsVentas.vue"
import SetsDeVentas from "../views/TSetsVentas.vue"
import FamiliaDeArticulos from "../views/TFamiliaArticulos.vue"
import FamiliaDeArticulosDistribucion from "../views/TFamiliaArticulosDistribucion.vue"
import VincularArticuloAFamilia from "../views/TVincularArticuloAFamilia.vue"
import ConstSecoArmadoConfig1 from "../views/TCSArmadoConfig1.vue"
import ConstSecoArmadoConfig2 from "../views/TCSArmadoConfig2.vue"
import ConstSecoNombresConfiguraciones from "../views/TCSNombresConfig.vue"
import RowaPlanCanje from "../views/RowaPlanCanje.vue"
import VblesEntrNP from "../views/VblesEntrNP.vue"
import VblesEntrNPPR from "../views/VblesEntrNPPR.vue"
import ListaPrecioCostoDeReposicion from "../views/ListaPrecioCostoReposicion.vue"
import ListaPrecioVentaAlPublico from "../views/ListaPrecioVentaAlPublico.vue"
import ListaDistribucion from "../views/RVDistribucion.vue"
import ProductosParaDistribucion from "../views/TProductosDistribucion.vue"
import CartelCombo from "../views/CartelxCombo.vue"
import CartelM2 from "../views/CartelxM2.vue"
import CartelM2Saldo from "../views/CartelxM2Saldo.vue"
import CartelArticulo from "../views/CartelxCodArt.vue"
import CartelManual from "../views/CartelxManual.vue"
import RubrosVentas from "../views/TRubrosVentas.vue"
import WebNimat from "../views/WebNimat.vue"
import CategoriasWeb from "../views/CategoriasWeb.vue"
import ArticulosWeb from "../views/ArticulosWeb.vue"
import DeposANoConsiderarParaStockFisico from "../views/TDepositoANoConsiderarParaStockFisico.vue"
import ListaRubrosVtasAcopio from "../views/RubrosVentasAcopio.vue"
import ListaCombo from "../views/Combo.vue"
import ComprobantesAOmitir from "../views/TComprobantesAOmitir.vue"
import AcopioCementoLN from "../views/AcopioCemento.vue"
import RemitosVtas from "../views/TRemitosVtas.vue"
import STOCKNPOCCalesCementosPlasticor from "../views/CalesCementosPlasticor.vue"
import ArtCalesCementosPlasticor from "../views/TCalesCementosPlasticor.vue"
import ConsultasClientesCADPLATAFORMA from "../views/ClientesCADPlataforma.vue"
import npconproblemaei from "../views/NPConProblemaEI.vue"
import ConsultaInformesAcindar from "../views/InformesAcindar.vue"
import ConsultaInformesAcindarFechas from "../views/InformesAcindarFechas.vue"
import ClasifClientes from "../views/TClasifClientesAcindar.vue"
import AcindarComprobantes from "../views/TComprobantesAcindar.vue"
import EquivalCodFactorCant from "../views/TEquivalCodFactorCant.vue"
import ConsultaQR from "../views/ConsultaQR.vue"
import artsclasif5stockmanual from "../views/TArtsClasif5StockManual.vue"
import ConsultaOrdenesCompra from "../views/ConsultaOrdenesCompra.vue"
import GestionDeCompras from "../views/GestionCompras.vue"
import ParametrosDeCompras from "../views/ParametrosdeCompras.vue"
import InfoArticulosCompranCorrientemente from "../views/InfoArticulosCompranCorrientemente.vue"
import ChatBotAI from "../views/ChatBot.vue"
import GestionDeDistribucion from "../views/GestionDistribucion.vue"
import ParametrosDeDistribucion from "../views/ParametrosdeDistribucion.vue"
import ListadeClientesDistribucion from "../views/ListadeClientesDistribucion.vue"
import TiempoEntregasInmediata from "../views/TiempoEntregasInmediata.vue"
import RatioCompras from "../views/RatioCompras.vue"
import InfoArticulosCompranCorrientemente2 from '../views/InfoArticulosCompranCorrientemente2.vue'
import GestionDeFinanzas from '../views/GestionFinanzas.vue'
import ImportarMasivoFinanzas from '../views/ImportarMasivoFinanzas.vue'
import FinanzasView from '../views/FinanzasView.vue'
import ControlStockNPOC from '../views/ControlStockNPOC.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true,
    meta: {
      requiresAuth: false,
      title: 'Consultas Operativas - Login',
      metaTags: [
        {
          name: 'Login'
        }      ]
    }
  },
  {
    path: '/chatbot',
    name: 'ChatBot',
    component: ChatBotAI,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Chat Bot AI',
      metaTags: [
        {          name: 'Chat Bot AI'
        }      ]
    }
  },
  {
    path: '/',
    name: 'tablero',
    alias: '/tablero',
    component: Tablero,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tablero',
      metaTags: [
        {
          name: 'Tablero'
        }      ]
    }
  },
  {
    path: '/consultas',
    name: 'Consultas Operativas',
    component: ConsultasOperativas,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Consultas Operativas',
      metaTags: [
        {
          name: 'Consultas Operativas'
        }      ]
    }
  },
  {
    path: '/consultascadplataforma',
    name: 'Consultas Clientes entre CAD y Plataforma',
    component: ConsultasClientesCADPLATAFORMA,
    props: true,
    meta: {
      requiresAuth: true,
      roles: ["Administracion y Finanzas", "Sistemas"],
      title: 'Consultas Clientes entre CAD y Plataforma',
      metaTags: [
        {
          name: 'Consultas Clientes entre CAD y Plataforma'
        }      ]
    }
  },
  {
    path: '/consultainformesacindar',
    name: 'Consulta Informes de Acindar',
    component: ConsultaInformesAcindar,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Consulta informes de Acindar',
      metaTags: [
        {
          name: 'Consulta informes de Acindar'
        }
      ]
    }
  },
  {
    path: '/consultainformesacindarentrefechas',
    name: 'Consulta Informes de Acindar',
    component: ConsultaInformesAcindarFechas,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Consulta informes de Acindar',
      metaTags: [
        {
          name: 'Consulta informes de Acindar'
        }
      ]
    }
  },
  {
    path: '/consultaporqr',
    name: 'Consulta QR',
    component: ConsultaQR,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Consulta por QR',
      metaTags: [
        {
          name: 'Consulta por QR'
        }
      ]
    }
  },
  {
    path: '/consultatiempoentregasinmediata',
    name: 'Consulta - Tiempo Entregas Inmediata',
    component: TiempoEntregasInmediata,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Consulta - Tiempo Entregas Inmediata',
      metaTags: [
        {
          name: 'Consulta - Tiempo Entregas Inmediata'
        }
      ]
    }
  },
  {
    path: '/consultaordenescompra',
    name: 'Consulta Orden Compra',
    component: ConsultaOrdenesCompra,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Consulta Ordenes Compra',
      metaTags: [
        {
          name: 'Consulta Ordenes Compra'
        }
      ]
    }
  },
  {
    path: '/gestiondefinanzas',
    name: 'Gestión de Finanzas',
    component: GestionDeFinanzas,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Gestión de Finanzas',
      metaTags: [
        {
          name: 'Gestión de Finanzas',
        }      ]
    }
  },
  {
    path: '/gestiondefinanzas/panelfinanzas',
    name: 'Panel Finanzas',
    component: FinanzasView,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Panel Finanzas',
      metaTags: [
        {
          name: 'Panel Finanzas',
        }      ]
    }
  },
  {
    path: '/gestiondefinanzas/importarmasivofinanzas',
    name: 'Importar masivo de finanzas',
    component: ImportarMasivoFinanzas,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Importar masivo de finanzas',
      metaTags: [
        {
          name: 'Importar masivo de finanzas',
        }      ]
    }
  },
  {
    path: '/gestiondedistribucion',
    name: 'Gestión de Distribución',
    component: GestionDeDistribucion,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Gestión de Distribución',
      metaTags: [
        {
          name: 'Gestión de Distribución',
        }      ]
    }
  },
  {
    path: '/gestiondedistribucion/parametrosdedistribucion',
    name: 'Parametros de Distribución',
    component: ParametrosDeDistribucion, 
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Parametros de Distribución',
      metaTags: [
        {
          name: 'Parametros de Distribución',
        }      ]
    }
  },
  {
    path: '/gestiondedistribucion/listadeclientesdistribucion',
    name: 'Lista de Clientes de Distribución',
    component: ListadeClientesDistribucion, 
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de Clientes de Distribución',
      metaTags: [
        {
          name: 'Lista de Clientes de Distribución',
        }      ]
    }
  },
  {
    path: '/gestiondecompras',
    name: 'Gestión de Compras',
    component: GestionDeCompras,
    props: true,
    meta: {
      requiresAuth: true,
      roles: ["Sistemas", "Compras"],
      title: 'Gestión de Compras',
      metaTags: [
        {
          name: 'Gestión de Compras'
        }      ]
    }
  },
  {
    path: '/gestiondecompras/controlstocknpoc',
    name: 'Control Stock NP OC',
    component: ControlStockNPOC,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Control Stock NP OC',
      roles: ["Sistemas", "Compras"],
      metaTags: [
        {
          name: 'Control Stock NP OC'
        }      ]
    }
  },
  {
    path: '/gestiondecompras/parametrosdecompras',
    name: 'Parametros de Compras',
    component: ParametrosDeCompras,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Parametros de Compras',
      roles: ["Sistemas", "Compras"],
      metaTags: [
        {
          name: 'Parametros de Compras'
        }      ]
    }
  },
  {
    path: '/gestiondecompras/ratiocompras',
    name: 'Ratio de Compras',
    component: RatioCompras,
    props: true,
    meta: {
      requiresAuth: true,
      roles: ["Sistemas", "Compras"],
      title: 'Ratio de Compras',
      metaTags: [
        {
          name: 'Ratio de Compras'
        }      ]
    }
  },
  {
    path: '/gestiondecompras/infodearticulosquesecomprancorrientemente',
    name: 'Info de Artículos que se compran corrientemente',
    component: InfoArticulosCompranCorrientemente,
    props: true,
    meta: {
      requiresAuth: true,
      roles: ["Sistemas", "Compras"],
      title: 'Info de Artículos que se compran corrientemente',
      metaTags: [
        {
          name: 'Info de Artículos que se compran corrientemente',
        }      ]
    }
  },
  {
    path: '/gestiondecompras/infodearticulosquesecomprancorrientemente2',
    name: 'Info de Artículos que se compran corrientemente 2',
    component: InfoArticulosCompranCorrientemente2,
    props: true,
    meta: {
      requiresAuth: true,
      roles: ["Sistemas", "Compras"],
      title: 'Info de Artículos que se compran corrientemente 2',
      metaTags: [
        {
          name: 'Info de Artículos que se compran corrientemente 2',
        }      ]
    }
  },
  {
    path: '/cartelerias',
    name: 'Cartelería',
    component: Cartelerias,
    props: true,
    meta: {
      requiresAuth: true,
      roles: ["Sistemas", "Ventas"],
      title: 'Cartelería',
      metaTags: [
        {
          name: 'Cartelería'
        }      ]
    }
  },
  {
    path: '/cartelerias/combo',
    name: 'Cartel Combo',
    component: CartelCombo,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Cartel Combo',
      metaTags: [
        {
          name: 'Cartel Combo'
        }      ]
    }
  },
  {
    path: '/cartelerias/m2',
    name: 'Cartel M2',
    component: CartelM2,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Cartel M2',
      metaTags: [
        {
          name: 'Cartel M2'
        }      ]
    }
  },
  {
    path: '/cartelerias/m2saldo',
    name: 'Cartel M2 Saldo',
    component: CartelM2Saldo,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Cartel M2 Saldo',
      metaTags: [
        {
          name: 'Cartel M2 Saldo'
        }      ]
    }
  },
  {
    path: '/cartelerias/articulo',
    name: 'Cartel Articulo',
    component: CartelArticulo,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Cartel Articulo',
      metaTags: [
        {
          name: 'Cartel Articulo'
        }      ]
    }
  },
  {
    path: '/cartelerias/manual',
    name: 'Cartel Manual',
    component: CartelManual,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Cartel Manual',
      metaTags: [
        {
          name: 'Cartel Manual'
        }      ]
    }
  },
  {
    path: '/webnimat',
    name: 'Web NIMAT',
    component: WebNimat,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Web NIMAT',
      metaTags: [
        {
          name: 'Web NIMAT'
        }      ]
    }
  },
  {
    path: '/webnimat/categorias',
    name: 'Categorias',
    component: CategoriasWeb,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Web NIMAT - Categorias',
      metaTags: [
        {
          name: 'Web NIMAT - Categorias'
        }      ]
    }
  },
  {
    path: '/webnimat/articulos',
    name: 'Articulos',
    component: ArticulosWeb,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Web NIMAT - Articulos',
      metaTags: [
        {
          name: 'Web NIMAT - Articulos'
        }      ]
    }
  },
  {
    path: '/npconproblemaentregainmediata',
    name: 'Nota de pedido con problema - Entrega inmediata',
    component: npconproblemaei,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Nota de pedido con problema - Entrega inmediata',
      metaTags: [
        {
          name: 'Nota de pedido con problema - Entrega inmediata'
        }      ]
    }
  },
  {
    path: '/controlaltaclientes',
    name: 'Control Alta Clientes',
    component: ControlAltaClientes,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Control Alta Clientes',
      metaTags: [
        {
          name: 'Control Alta Clientes'
        }      ]
    }
  },
  {
    path: '/listadeclientes',
    name: 'Lista de Clientes',
    component: ListadeClientes,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de Clientes',
      metaTags: [
        {
          name: 'Lista de Clientes'
        }      ]
    }
  },
  {
    path: '/tablas',
    name: 'Tablas',
    component: Tablas,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tablas',
      metaTags: [
        {
          name: 'Tablas'
        }      ]
    }
  },
  {
    path: '/tabla/deposanoconsiderar',
    name: 'Tabla: Deposito a No Considerar',
    component: DeposANoConsiderar,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Deposito a No Considerar',
      metaTags: [
        {
          name: 'Deposito a No Considerar'
        }      ]
    }
  },
  {
    path: '/tabla/deposanoconsiderarparastockfisico',
    name: 'Tabla: Deposito a No Considerar para Stock Físico',
    component: DeposANoConsiderarParaStockFisico,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Deposito a No Considerar para Stock Físico',
      metaTags: [
        {
          name: 'Deposito a No Considerar para Stock Físico'
        }      ]
    }
  },
  {
    path: '/tabla/npaconsiderar',
    name: 'Tabla: NP a Considerar',
    component: NPAConsiderar,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'NP a Considerar',
      metaTags: [
        {
          name: 'NP a Considerar'
        }      ]
    }
  },
  {
    path: '/tabla/dimensionescontenedores',
    name: 'Tabla: Dimensiones aprox. de contenedores',
    component: DimensionesContenedores,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Dimensiones aprox. de contenedores',
      metaTags: [
        {
          name: 'Dimensiones aprox. de contenedores'
        }      ]
    }
  },
  {
    path: '/tabla/movimientosdecontenedores',
    name: 'Tabla: Movimientos de contenedores',
    component: MovimientosContenedores,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Movimientos de contenedores',
      metaTags: [
        {
          name: 'Movimientos de contenedores'
        }      ]
    }
  },
  {
    path: '/tabla/listadepreciobreveusointerno',
    name: 'Tabla: Lista de precio Breve Uso Interno',
    component: ListadePrecioBUI,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: Lista de precio Breve Uso Interno',
      metaTags: [
        {
          name: 'Tabla: Lista de precio Breve Uso Interno'
        }      ]
    }
  },
  {
    path: '/tabla/setsdeventas',
    name: 'Tabla: #01 - Sets de Ventas',
    component: SetsDeVentas,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: #01 - Sets de Ventas',
      metaTags: [
        {
          name: 'Tabla: #01 - Sets de Ventas'
        }      ]
    }
  },
  {
    path: '/tabla/familiadearticulos',
    name: 'Tabla: #02 - Familia de Articulos',
    component: FamiliaDeArticulos,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: #02 - Familia de Articulos',
      metaTags: [
        {
          name: 'Tabla: #02 - Familia de Articulos'
        }      ]
    }
  },
  {
    path: '/tabla/vinculararticuloafamilia',
    name: 'Tabla: #03 - Vincular Articulo a Familia',
    component: VincularArticuloAFamilia,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: #03 - Vincular Articulo a Familia',
      metaTags: [
        {
          name: 'Tabla: #03 - Vincular Articulo a Familia'
        }      ]
    }
  },
  {
    path: '/tabla/armadoconfig1',
    name: 'Tabla: Armado Config. 1',
    component: ConstSecoArmadoConfig1,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: Armado Config. 1',
      metaTags: [
        {
          name: 'Tabla: Armado Config. 1'
        }      ]
    }
  },
  {
    path: '/tabla/armadoconfig2',
    name: 'Tabla: Armado Config. 2',
    component: ConstSecoArmadoConfig2,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: Armado Config. 2',
      metaTags: [
        {
          name: 'Tabla: Armado Config. 2'
        }      ]
    }
  },
  {
    path: '/tabla/nombresconfiguraciones',
    name: 'Tabla: Nombres Configuraciones',
    component: ConstSecoNombresConfiguraciones,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: Nombres Configuraciones',
      metaTags: [
        {
          name: 'Tabla: Nombres Configuraciones'
        }      ]
    }
  },
  {
    path: '/tabla/productospdistribucion',
    name: 'Tabla: Productos para Distribucion',
    component: ProductosParaDistribucion,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: Productos para Distribucion',
      metaTags: [
        {
          name: 'Tabla: Productos para Distribucion'
        }      ]
    }
  },
  {
    path: '/tabla/rubrosventas',
    name: 'Tabla: Rubros Ventas',
    component: RubrosVentas,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: Rubros Ventas',
      metaTags: [
        {
          name: 'Tabla: Rubros Ventas'
        }      ]
    }
  },
  {
    path: '/tabla/familiaarticulosdistribucion',
    name: 'Tabla: Familia de articulos para Distribución',
    component: FamiliaDeArticulosDistribucion,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: Familia de articulos para Distribución',
      metaTags: [
        {
          name: 'Tabla: Familia de articulos para Distribución'
        }      ]
    }
  },
  {
    path: '/tabla/acopio/comprobantesaomitir',
    name: 'Tabla Acopio: Comprobantes a Omitir',
    component: ComprobantesAOmitir,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla Acopio: Comprobantes a Omitir',
      metaTags: [
        {
          name: 'Tabla Acopio: Comprobantes a Omitir'
        }      ]
    }
  },
  {
    path: '/tabla/acopio/remitosdeventas',
    name: 'Tabla Acopio: Remitos de Ventas',
    component: RemitosVtas,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla Acopio: Remitos de Ventas',
      metaTags: [
        {
          name: 'Tabla Acopio: Remitos de Ventas'
        }      ]
    }
  },
  {
    path: '/tabla/calescementosplasticor',
    name: 'Tabla: Articulos - Cales, Cementos, Plasticor',
    component: ArtCalesCementosPlasticor,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: Articulos - Cales, Cementos, Plasticor',
      metaTags: [
        {
          name: 'Tabla: Articulos - Cales, Cementos, Plasticor'
        }      ]
    }
  },
  {
    path: '/tabla/artsclasif5stockmanual',
    name: 'Tabla: Arts Clasif. 5 - Stock Manual para la WEB NIMAT',
    component: artsclasif5stockmanual,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: Arts Clasif. 5 - Stock Manual para la WEB NIMAT',
      metaTags: [
        {
          name: 'Tabla: Arts Clasif. 5 - Stock Manual para la WEB NIMAT'
        }      ]
    }
  },
  {
    path: '/tabla/informesacindar/clasifclientes',
    name: 'Tabla: Clasif. Clientes',
    component: ClasifClientes,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: Clasif. Clientes',
      metaTags: [
        {
          name: 'Tabla: Clasif. Clientes'
        }      ]
    }
  },
  {
    path: '/tabla/informesacindar/comprobantes',
    name: 'Tabla: Comprobantes',
    component: AcindarComprobantes,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: Comprobantes',
      metaTags: [
        {
          name: 'Tabla: Comprobantes'
        }      ]
    }
  },
  {
    path: '/tabla/informesacindar/equivalcodfactorcant',
    name: 'Tabla: Equival. Cod. y Factor Cant.',
    component: EquivalCodFactorCant,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Tabla: Equival. Cod. y Factor Cant.',
      metaTags: [
        {
          name: 'Tabla: Equival. Cod. y Factor Cant.'
        }      ]
    }
  },
  {
    path: '/containers',
    name: 'Lista de precio - Containers',
    component: ListaContenedores,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de precio - Containers',
      metaTags: [
        {
          name: 'Lista de precio - Containers'
        }      ]
    }
  },
  {
    path: '/pisosyrevestimiento',
    name: 'Lista de precio - Pisos y Revestimiento',
    component: ListaPyR,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de precio - Pisos y Revestimiento',
      metaTags: [
        {
          name: 'Lista de precio - Pisos y Revestimiento'
        }      ]
    }
  },
  {
    path: '/pisosyrevestimientoconstock',
    name: 'Lista de precio - Pisos y Revistimiento con Stock',
    component: ListaPyRConStock,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de precio - Pisos y Revistimiento con Stock',
      metaTags: [
        {
          name: 'Lista de precio - Pisos y Revistimiento con Stock'
        }      ]
    }
  },
  {
    path: '/breveusointerno',
    name: 'Lista de precio - Breve Uso Interno',
    component: ListaBUI,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de precio - Breve Uso Interno',
      metaTags: [
        {
          name: 'Lista de precio - Breve Uso Interno'
        }      ]
    }
  },
  {
    path: '/listaconstseco',
    name: 'Lista de precio - Const. Seco',
    component: ListaConstSeco,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de precio - Const. Seco',
      metaTags: [
        {
          name: 'Lista de precio - Const. Seco'
        }      ]
    }
  },
  {
    path: '/listarubrosvtas',
    name: 'Lista de precio - Rubros Ventas',
    component: ListaRubrosVtas,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de precio - Rubros Ventas',
      metaTags: [
        {
          name: 'Lista de precio - Rubros Ventas'
        }      ]
    }
  },
  {
    path: '/listarubrosvtasacopio',
    name: 'Lista de precio - Rubros Ventas Acopio',
    component: ListaRubrosVtasAcopio,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de precio - Rubros Ventas Acopio',
      metaTags: [
        {
          name: 'Lista de precio - Rubros Ventas Acopio'
        }      ]
    }
  },
  {
    path: '/listasetsvtas',
    name: 'Lista de precio - Sets Ventas',
    component: ListaSetsVtas,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de precio - Sets Ventas',
      metaTags: [
        {
          name: 'Lista de precio - Sets Ventas'
        }      ]
    }
  },
  {
    path: '/rowaplancanjexsiempre',
    name: 'Rowa - Plan canje por siempre',
    component: RowaPlanCanje,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Rowa - Plan canje por siempre',
      metaTags: [
        {
          name: 'Rowa - Plan canje por siempre'
        }      ]
    }
  },
  {
    path: '/vblesentrnp',
    name: 'Variables Entregas NP - General',
    component: VblesEntrNP,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Variables Entregas NP - General',
      metaTags: [
        {
          name: 'Variables Entregas NP - General'
        }      ]
    }
  },
  {
    path: '/vblesentrnppr',
    name: 'Variables Entregas NP - Pisos y revistimiento',
    component: VblesEntrNPPR,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Variables Entregas NP - Pisos y revistimiento',
      metaTags: [
        {
          name: 'Variables Entregas NP - Pisos y revistimiento'
        }      ]
    }
  },
  {
    path: '/listaprecioscostoreposicion',
    name: 'Lista de precios - Costo de reposición',
    component: ListaPrecioCostoDeReposicion,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de precios - Costo de reposición',
      metaTags: [
        {
          name: 'Lista de precios - Costo de reposición'
        }      ]
    }
  },
  {
    path: '/listapreciosventaalpublico',
    name: 'Lista de precios - Venta al público',
    component: ListaPrecioVentaAlPublico,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de precios - Venta al público',
      metaTags: [
        {
          name: 'Lista de precios - Venta al público'
        }      ]
    }
  },
  {
    path: '/listadodistribucion',
    name: 'Lista de precios - Distribución',
    component: ListaDistribucion,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de precios - Distribución',
      metaTags: [
        {
          name: 'Lista de precios - Distribución'
        }      ]
    }
  },
  {
    path: '/combo',
    name: 'Lista de precios - Combo',
    component: ListaCombo,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Lista de precios - Combo',
      metaTags: [
        {
          name: 'Lista de precios - Combo'
        }      ]
    }
  },
  {
    path: '/acopiocemento',
    name: 'Acopio - Cemento Loma Negra',
    component: AcopioCementoLN,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Acopio - Cemento Loma Negra',
      metaTags: [
        {
          name: 'Acopio - Cemento Loma Negra'
        }      ]
    }
  },
  {
    path: '/stocknpoc/calescementosplasticor',
    name: 'Stock NP OC - Cales, Cementos, Plasticor',
    component: STOCKNPOCCalesCementosPlasticor,
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Stock NP OC - Cales, Cementos, Plasticor',
      metaTags: [
        {
          name: 'Stock NP OC - Cales, Cementos, Plasticor'
        }      ]
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

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

    const payload = decodeJwt(token);

    // Si la ruta pide roles, validamos contra memberOf -> CN
    if (to.meta.roles?.length) {
      const memberOf = payload?.user?.memberOf ?? [];

      const groupCns = (Array.isArray(memberOf) ? memberOf : [memberOf])
        .map(extractCN)
        .filter(Boolean);

      //console.log("AD groups (CN):", groupCns);

      const ok = to.meta.roles.some(required => groupCns.includes(required));
      if (!ok) return { path: to.fullPath };
    }
  }

  // --- TITLE / METATAGS ---
  const nearestWithTitle = [...to.matched].reverse().find(r => r.meta?.title);
  const nearestWithMeta = [...to.matched].reverse().find(r => r.meta?.metaTags);
  const previousNearestWithMeta = [...from.matched].reverse().find(r => r.meta?.metaTags);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  else if (previousNearestWithMeta?.meta?.title) document.title = previousNearestWithMeta.meta.title;

  Array.from(document.querySelectorAll("[data-vue-router-controlled]"))
    .forEach(el => el.parentNode?.removeChild(el));

  if (!nearestWithMeta) return true;

  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");
      Object.keys(tagDef).forEach(k => tag.setAttribute(k, tagDef[k]));
      tag.setAttribute("data-vue-router-controlled", "");
      return tag;
    })
    .forEach(tag => document.head.appendChild(tag));

  return true;
});


export default router
