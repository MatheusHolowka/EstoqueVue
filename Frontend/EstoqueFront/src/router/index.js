import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/default.vue'; // Layout padrão
import Login from '../views/login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Products from '../views/Products.vue';
import ProductLaunch from '../views/ProductLaunch.vue';
import ProductEdit from '../views/ProductEdit.vue'; // Página de edição de produto
import ProductAdd from '../views/ProductAdd.vue'; // Página de adicionar produto
import CategoryAdd from '../views/CategoryAdd.vue'; // Página de adicionar categoria

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    component: DefaultLayout, // Define o layout para rotas protegidas
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'produtos',
        name: 'Products',
        component: Products,
      },
      {
        path: 'produtos/add', // Rota para adicionar produto
        name: 'ProductAdd',
        component: ProductAdd,
      },
      {
        path: 'produtos/lancamento/:id',
        name: 'ProductLaunch',
        component: ProductLaunch,
      },
      {
        path: 'produtos/editar/:id', // Rota para edição de produto
        name: 'ProductEdit',
        component: ProductEdit,
      },
      {
        path: 'categorias/add', // Rota para adicionar categoria
        name: 'CategoryAdd',
        component: CategoryAdd,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware de autenticação para rotas protegidas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next('/'); // Redireciona para login se não houver token
  } else {
    next();
  }
});

export default router;
