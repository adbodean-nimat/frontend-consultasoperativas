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
import ListadePrecioBUI from '../views/ListadePrecioBUI.vue'
import Tablas from '../views/Tablas.vue'
import Login from "../views/Login.vue";


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true,
    meta: {
      title: 'Login',
      metaTags: [
        {
          name: 'Login'
        }      ]
    }
  },
  {
    path: '/',
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
