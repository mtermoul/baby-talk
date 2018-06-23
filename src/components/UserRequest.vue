<template>
    <v-container fill-height grid-list-lg>
        <v-layout>
            <v-flex xs6 sm4>
                <h3 class="headline">Request new content to be added</h3>
                <span>Please fill the form below and describe which content would like to see in our catalog list.</span>
                <v-spacer></v-spacer>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        max="120"
                        label="Your Name"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Your E-mail"
                        max="256"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="message"
                        label="Message"
                        max="256"
                        counter="256"
                        multi-line
                        required
                        :rules="messageRules"
                    ></v-text-field>

                    <v-btn color="success" :disabled="!valid" @click="submit">submit</v-btn>
                    <v-btn color="warning" @click="clear">clear</v-btn>
                </v-form>
            </v-flex>
            <v-flex xs6 sm7 offset-sm1>
                <h3 class="headline">Recent requests</h3>
                <v-spacer></v-spacer>
                <v-layout row wrap>
                    <v-flex sm4 v-for="(request, index) in userRequests" :key="'user-request-'+index">
                        <v-card>
                            <v-card-title primary-title class="subheading">
                                {{ request.name + ' (' + request.email + ')'}}
                            </v-card-title>
                            <v-card-text>
                                {{ request.message }}
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            message: '',
            messageRules: [
                v => !!v || 'Message is required'
            ]
        }
    },
    methods: {
        submit () {
            if (this.$refs.form.validate()) {
                const userRequest = {name: this.name, email: this.email, message: this.message}
                this.$store.dispatch('addUserRequest', userRequest)
                this.clear()
            }
        },
        clear () {
            this.$refs.form.reset()
        }
    },
    computed: {
        userRequests () {
            return this.$store.getters.userRequests
        }
    }
}
</script>
