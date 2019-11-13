<template>
    <div>
        <v-app-bar
                app>
            <v-toolbar-title>

                <h2>ShoeShop</h2>
            </v-toolbar-title>
            <div style="margin: 10px" v-if="currentUser">
            <h4>{{ currentUser.email}}</h4>
            </div>
            <nav>
                <ul>
                    <router-link tag="li" to="/">All Shoes</router-link>
                    <router-link tag="li" to="/women">Women</router-link>
                    <router-link tag="li" to=/men>Men</router-link>
                </ul>
            </nav>
            <v-spacer></v-spacer>
            <nav>
                <ul>
                    <router-link v-if="currentUser" tag="li" to=/admin> <v-icon large class="icon">build</v-icon></router-link>
                    <router-link v-if="currentUser" tag="li" to=/orders> <v-icon  large class="icon">assignment</v-icon></router-link>

                    <router-link tag="li" to=/basket>
                        <v-badge>
                            <template v-slot:badge>{{basketNumber.toString()}}</template>
                            <v-icon  large class="icon">shopping_cart</v-icon>
                        </v-badge>
                    </router-link>

                    <router-link v-if="!currentUser" tag="li" to=/Login> <v-icon  large class="icon">lock</v-icon></router-link>
                    <v-btn text v-if="currentUser" tag="li" @click="signOut"><v-icon  large class="icon">lock_open</v-icon></v-btn>
                </ul>
            </nav>
        </v-app-bar>
    </div>
</template>

<script>
    import {db} from "../../firebase";
    import firebase from 'firebase'
    import 'firebase/firestore'
    import store from '../store.js'

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            store.dispatch('setUser', user)
        }
        else {
            store.dispatch('setUser',null)
        }
    });

    export default {
        name: "Nav",
        data: () => ({
            drawer: null,
            basketDump:[],

        }),
        methods:
            {
                signOut()
                {
                    firebase.auth().signOut().then(() => {
                        alert('Logged out');
                        this.$router.replace('/').catch(error => {
                            alert(error)
                        })
                    })
                },
                genderFilter: function () {
                    return this.menuItems.filter(function (item) {
                        return item.gender === 'Men' || item.gender === 'Both'
                    })
                },
            },
        computed:
            {
                currentUser()
                {
                    return this.$store.getters.currentUser
                },
                basket() {
                    return this.$store.getters.getBasketItems
                },
                basketNumber() {
                    return this.$store.getters.getBasketNumber
                },
            }
    }
</script>

<style lang="scss" scoped>
    nav ul{
        padding: 0;
        margin: 5px 0 0 25px;
        text-decoration: none;
        display: flex;
    }
    nav li{
        color:map-get($colorz, orange);
        margin: 0 15px 0 10px;
        list-style-type: none;
        cursor:pointer;
        font-size: 20px;
    }
    .icon
    {
        color: map-get($colorz, orange) !important;
    }
</style>