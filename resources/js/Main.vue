<template>
    <v-app>
        <v-toolbar app dark color="orange darken-3">
            <v-toolbar-title>BNI Promo</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat v-if="!$auth.check()" v-for="route in routes.unlogged" v-bind:key="route.path"
                       :to="{ name : route.path }">{{route.name}}
                </v-btn>
                <v-btn flat v-if="$auth.check()" v-for="route in routes.user" v-bind:key="route.path"
                       :to="{ name : route.path }">{{route.name}}
                </v-btn>
                <v-btn flat v-if="$auth.check()" @click.prevent="$auth.logout()">Logout</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-container fluid grid-list-xl>
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer app></v-footer>
    </v-app>
</template>
<script>
    export default {
        data() {
            return {
                routes: {
                    // UNLOGGED
                    unlogged: [
                        {name: 'Login', path: 'login'},
                        {name: 'Register', path: 'register'}
                    ],
                    // LOGGED USER
                    user: [
                        {name: 'Dashboard', path: 'dashboard'}
                    ]
                }
            }
        }
    }
</script>
