<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>

        <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
        ></v-text-field>

        <v-btn
            color="orange"
            :disabled="!valid || loading"
            @click="validate"
            block
        >
            Login
        </v-btn>
        <v-snackbar
            v-model="snackbar" bottom>
            {{ error === 'login_error' ? 'Email atau password salah. Silahkan dicek kembali' : 'Terjadi kesalahan, hubungi admin.'}}
            <v-btn
                color="pink"
                flat
                @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-form>
</template>
<script>
    export default {
        data() {
            return {
                valid: true,
                loading: false,
                snackbar: false,
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                password: '',
                passwordRules: [
                    v => !!v || 'Password is required'
                ],
                error: ''
            }
        },
        mounted() {
            //
        },
        methods: {
            validate() {
                if (this.$refs.form.validate()) {
                    this.login()
                }
            },
            login() {
                this.loading = true
                this.error = ''
                this.$auth.login({
                    data: {
                        email: this.email,
                        password: this.password
                    },
                    success: () => {
                        this.loading = false
                        // handle redirection
                        const redirectTo = 'dashboard'
                        this.$router.push({name: redirectTo})
                    },
                    error: (res) => {
                        this.loading = false
                        this.snackbar = true
                        this.error = res.response.data.error
                    },
                    rememberMe: true,
                    fetchUser: true
                })
            }
        }
    }
</script>
