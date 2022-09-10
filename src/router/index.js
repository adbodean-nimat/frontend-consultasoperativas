import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ControlAltaClientes from '../views/ControlAltaClientes.vue'
import ListadeClientes from '../views/ListadeClientes.vue'
import DeposANoConsiderar from '../views/DeposaNoConsiderar.vue'
import NPAConsiderar from '../views/NPaConsiderar.vue'
import DimensionesContenedores from '../views/DimensionesContenedores.vue'
import MovimientosContenedores from '../views/MovimientosDeContenedores.vue'
import ListaContenedores from '../views/Containers.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: true,
    meta: {
      title: 'Inicio - Tablero',
      metaTags: [
        {
          name: 'Tablero'
        }      ]
    }
  },
  //{
  //  path: '/prueba',
  //  name: 'Prueba',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //component: () => import(/* webpackChunkName: "about" */ '../views/PruebaView.vue')
  //},
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
    path: '/deposanoconsiderar',
    name: 'Deposito a No Considerar',
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
    path: '/npaconsiderar',
    name: 'NP a Considerar',
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
    path: '/dimensionescontenedores',
    name: 'Dimensiones aprox. de contenedores',
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
    path: '/movimientosdecontenedores',
    name: 'Movimientos de contenedores',
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
