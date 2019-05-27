<template>
    <div>
        <v-tabs
            v-model="active"
            slider-color="orange"
            grow
        >
            <v-tab key="info" ripple disabled>
                <v-icon>person</v-icon>
            </v-tab>
            <v-tab key="contact" ripple disabled>
                <v-icon>email</v-icon>
            </v-tab>
            <v-tab key="pass" ripple disabled>
                <v-icon>lock</v-icon>
            </v-tab>
            <v-tab key="done" ripple disabled>
                <v-icon>done_all</v-icon>
            </v-tab>
            <v-tab-item key="info">
                <v-card flat>
                    <v-card-text>
                        <v-text-field
                            v-model="first_name"
                            v-validate="'required'"
                            :error-messages="errors.collect('first_name')"
                            label="Nama Depan"
                            data-vv-name="first_name"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="last_name"
                            v-validate="'required'"
                            :error-messages="errors.collect('last_name')"
                            label="Nama Belakang"
                            data-vv-name="last_name"
                            required
                        ></v-text-field>
                        <v-layout wrap align-center>
                            <v-flex xs12 sm6 d-flex>
                                <v-select
                                    v-model="gender"
                                    v-validate="'required'"
                                    :error-messages="errors.collect('gender')"
                                    :items="items"
                                    label="Jenis Kelamin"
                                    data-vv-name="gender"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 d-flex>
                                <v-text-field
                                    v-model="age"
                                    v-validate="'required|numeric|max:2'"
                                    :error-messages="errors.collect('age')"
                                    label="Umur"
                                    data-vv-name="age"
                                    required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item key="contact">
                <v-card flat>
                    <v-card-text>
                        <v-text-field
                            v-model="email"
                            v-validate="'required|email'"
                            :error-messages="errors.collect('email')"
                            label="Email"
                            data-vv-name="email"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="phone"
                            v-validate="'required|numeric'"
                            :error-messages="errors.collect('phone')"
                            label="No Telepon"
                            data-vv-name="phone"
                            required
                        ></v-text-field>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item key="pass">
                <v-card flat>
                    <v-card-text>
                        <v-text-field
                            v-model="password"
                            v-validate="'required|min:6'"
                            :error-messages="errors.collect('password')"
                            label="Password"
                            data-vv-name="password"
                            type="password"
                            ref="password"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password_confirmation"
                            v-validate="'required|min:6|confirmed:password'"
                            :error-messages="errors.collect('password_confirmation')"
                            label="Konfirmasi Password"
                            data-vv-name="password_confirmation"
                            type="password"
                            required
                        ></v-text-field>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item key="done">
                <v-card flat>
                    <v-card-text>
                        <div style="text-align: center">
                            <v-icon size="200" color="success">done_all</v-icon>
                            <br>
                            <h1>Selamat!</h1>
                            Anda berhasil terdaftar di BNI Promo.
                        </div>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>

        <v-btn v-if="!done" :disabled="loading" @click="validate" block color="orange">Next</v-btn>
        <v-btn v-if="done" block color="success" :to="{name: 'login'}">Login</v-btn>

        <v-snackbar
            v-model="snackbar" bottom>
            Ada kesalahan. Silahkan coba lagi
            <v-btn
                color="pink"
                flat
                @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>
<script>
    export default {
        $_veeValidate: {
            validator: 'new'
        },
        data() {
            return {
                active: null,
                loading: false,
                done: false,
                snackbar: false,
                first_name: '',
                last_name: '',
                age: '',
                gender: '',
                items: [
                    {text: 'Laki-laki', value: 'men'},
                    {text: 'Perempuan', value: 'women'}
                ],
                email: '',
                phone: '',
                password: '',
                password_confirmation: '',
                error: '',
            }
        },
        methods: {
            validate() {
                const active = parseInt(this.active)
                switch (active) {
                    case 0: {
                        this.$validator.validateAll().then(_ => {
                            if (!this.errors.has('first_name') && !this.errors.has('last_name') &&
                                !this.errors.has('age') && !this.errors.has('gender')) {
                                this.$validator.reset()
                                setTimeout(() => {
                                    this.next()
                                }, 100);
                            }
                        })
                        break
                    }
                    case 1: {
                        this.$validator.validateAll().then(_ => {
                            if (!this.errors.has('email') && !this.errors.has('phone')) {
                                this.$validator.reset()
                                setTimeout(() => {
                                    this.next()
                                }, 100);
                            }
                        })
                        break
                    }
                    case 2: {
                        this.$validator.validateAll().then(valid => {
                            if (valid) {
                                this.register()
                            }
                        })
                        break
                    }
                }
            },
            next() {
                const active = parseInt(this.active)
                this.active = (active < 3 ? active + 1 : 0)
            },
            register() {
                this.loading = true
                this.done = false
                this.snackbar = false
                this.$auth.register({
                    data: {
                        first_name: this.first_name,
                        last_name: this.last_name,
                        email: this.email,
                        phone: this.phone,
                        password: this.password,
                        password_confirmation: this.password_confirmation,
                        age: this.age,
                        gender: this.gender
                    },
                    success: () => {
                        this.loading = false
                        this.done = true
                        this.next()
                    },
                    error: (res) => {
                        this.loading = false
                        this.error = res.response.data.error
                        this.snackbar = true
                    },
                    redirect: null
                })
            }
        }
    }
</script>
