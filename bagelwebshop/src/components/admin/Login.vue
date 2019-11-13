<template>
    <v-container>
        <v-row>
            <v-col offset-md="4" md="4" xs="12">
                <h2> Admin Login</h2>
                <div class="pa-2 info2">
                    <v-text-field
                            label="Email"
                            outlined
                            v-model="email"
                            required
                    ></v-text-field>
                    <v-text-field
                            label="Password"
                            outlined
                            v-model="password"
                            required
                            :append-icon="show1 ? 'visibility' : 'visibility_off'"
                            @click:append="show1 = !show1"
                            :type="show1 ? 'text' : 'password'"
                    ></v-text-field>
                    <v-btn @click.prevent="signIn()" class="addbtn" >
                        <v-icon >lock_open</v-icon>
                        Login
                    </v-btn>
                    <v-btn to="/" color="incomplete" >
                        Cancel
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import firebase from 'firebase'
    import 'firebase/firestore'

    export default {
        name: "Login",
        data() {
            return {
                email:'',
                password:'',
                show1: false,
            }
        },
        methods: {
            signIn()
            {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
                    this.$router.replace('/admin')
                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if(errorCode === 'auth/wrong-password')
                    {
                        alert("Wrong password")
                    }
                    else
                    {
                         alert(errorMessage)
                    }
                    console.log(error)
                })
            },

        }
    }
</script>

<style lang="scss" scoped>
    .info2
    {
        border: map_get($colorz, orange) 3px solid ;
        border-radius: 2%;
    }

    .addbtn
    {
        background-color:map_get($colorz, orange) !important;
        margin: 10px 45% 10px 5px;
    }

</style>