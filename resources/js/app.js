require('./bootstrap');
import 'es6-promise/auto'
import axios from 'axios'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import colors from 'vuetify/es5/util/colors'
import VueAuth from '@websanova/vue-auth'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import auth from './auth'
import router from './router'

// Set Vue globally
window.Vue = Vue

Vue.use(VeeValidate)

// Set Vue router
Vue.router = router
Vue.use(VueRouter)

// Set Vue authentication
Vue.use(VueAxios, axios)
axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api/v1`
Vue.use(VueAuth, auth)

Vue.use(Vuetify, {
    theme: {
        primary: colors.orange.darken3,
        secondary: colors.red.lighten4,
        accent: colors.indigo.base
    }
})

// Load Index
Vue.component('main-app', require('./Main.vue').default)
new Vue({
    el: '#app',
    router
});
