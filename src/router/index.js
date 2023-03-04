import { createRouter, createWebHistory } from 'vue-router'
import Tablero from '../views/Tablero.vue'
import ControlAltaClientes from '../views/ControlAltaClientes.vue'
import ListadeClientes from '../views/ListadeClientes.vue'
import DeposANoConsiderar from '../views/DeposaNoConsiderar.vue'
import NPAConsiderar from '../views/NPaConsiderar.vue'
import DimensionesContenedores from '../views/DimensionesContenedores.vue'
import MovimientosContenedores from '../views/MovimientosDeContenedores.vue'
import ListaContenedores from '../views/Containers.vue'
import ListaPyR from '../views/PisosyRevistimiento.vue'
import ListaBUI from '../views/BreveUsoInterno.vue'
import ListadePrecioBUI from '../views/TListadePrecioBUI.vue'
import ListaConstSeco from "../views/ConstSeco.vue"
import Tablas from '../views/Tablas.vue'
import Login from "../views/Login.vue"
import ListaRubrosVtas from "../views/RubrosVentas.vue"
import SetsDeVentas from "../views/TSetsVentas.vue"
import FamiliaDeArticulos from "../views/TFamiliaArticulos.vue"
import VincularArticuloAFamilia from "../views/TVincularArticuloAFamilia.vue"
import ConstSecoArmadoConfig1 from "../views/TCSArmadoConfig1.vue"
import ConstSecoArmadoConfig2 from "../views/TCSArmadoConfig2.vue"
import ConstSecoNombresConfiguraciones from "../views/TCSNombresConfig.vue"
import RowaPlanCanje from "../views/RowaPlanCanje.vue"

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
    path: '/pisosyrevistimiento',
    name: 'Lista de precio - Pisos y Revistimiento con Stock',
    component: ListaPyR,
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
