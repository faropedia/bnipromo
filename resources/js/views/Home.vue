<template>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-img
                    src="bni-logo.png"

                ></v-img>

                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">BNI Promo</h3>
                        <div>Selamat Datang di BNI Promo. Klik Login/Register untuk melihat akses promo.</div>
                    </div>
                </v-card-title>

                <v-card-actions>
                    <v-btn flat color="orange" :to="{name: 'login'}">Login</v-btn>
                    <v-btn flat color="orange" :to="{name: 'register'}">Register</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
