import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Countries',
    component: () =>
      import(/* webpackChunkName: "Countries" */ '../views/Countries.vue'),
  },
  {
    path: '/:countryName',
    name: 'CountyDetails',
    component: () =>
      import(
        /* webpackChunkName: "CountyDetails" */ '../views/CountyDetails.vue'
      ),
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
