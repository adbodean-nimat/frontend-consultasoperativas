import { createRouter, createWebHistory } from 'vue-router'
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

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    props: true,
    meta: {
      title: 'Consultas Operativas - Login',
      metaTags: [
        {
          name: 'Login'
        }      ]
    }
  },
  {
    path: '/tablero',
    name: 'tablero',
    component: Tablero,
    props: true,
    meta: {
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
      title: 'Consultas Operativas',
      metaTags: [
        {
          name: 'Consultas Operativas'
        }      ]
    }
  },
  {
    path: '/cartelerias',
    name: 'Cartelería',
    component: Cartelerias,
    props: true,
    meta: {
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
      title: 'Web NIMAT - Articulos',
      metaTags: [
        {
          name: 'Web NIMAT - Articulos'
        }      ]
    }
  },
  {
    path: '/controlaltaclientes',
    name: 'Control Alta Clientes',
    component: ControlAltaClientes,
    props: true,
    meta: {
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
      title: 'Tabla: Familia de articulos para Distribución',
      metaTags: [
        {
          name: 'Tabla: Familia de articulos para Distribución'
        }      ]
    }
  },
  {
    path: '/containers',
    name: 'Lista de precio - Containers',
    component: ListaContenedores,
    props: true,
    meta: {
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
      title: 'Lista de precios - Combo',
      metaTags: [
        {
          name: 'Lista de precios - Combo'
        }      ]
    }
  }
]

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes
})

// ... 

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

// ...

export default router
