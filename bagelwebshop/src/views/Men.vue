<template>
    <v-container grid-list-xs>
        <v-snackbar v-model="basketAdded" top>
            {{snapText}}
            <v-btn text @click="basketAdded = false">
                Close
            </v-btn>
        </v-snackbar>
        <v-layout  align-center class="info_box" row wrap >
            <v-flex sm4 xs12  v-for="shoe in genderFilter">
                <div class="borderShoe">
                    <v-img class="imgbox" v-bind:src="shoe.image"></v-img>
                    <div class="textbox" >
                        <div style="display: flex">
                            <h1>{{shoe.name}}</h1>
                            <v-spacer></v-spacer>
                            <v-select
                                    :items="items"
                                    label="Shoe Size"
                                    outlined
                                    style="width:0; height: 20px;"
                                    v-model="size"
                            ></v-select>
                        </div>
                        <p>
                            {{shoe.description}}
                        </p>
                        <p class="pricetag">
                            {{shoe.price}}
                        </p>
                        <p class="genderTag" >{{shoe.gender}}</p>
                        <div style="display: flex; margin-top: -10px">

                            <v-spacer></v-spacer>
                            <v-btn outlined class="btnToBasket" @click="addToBasket(shoe, size)" @click.stop="basketAdded = true"> Add to Basket</v-btn>
                        </div>
                    </div>
                </div>
            </v-flex>


        </v-layout>
    </v-container>
</template>

<script>
    import {dbShoeAdd} from "../../firebase";

    export default {
        data: () => ({
            items: ['39', '40', '41', '42', '43'],
            basketDump:[],
            basketAdded: false,
            snapText: 'Shoe has been added to basket'
        }),
        beforeCreate() {
            this.$store.dispatch('setMenuItems')
        },
        methods: {
            addToBasket(item, size) {
                this.basketDump.push({
                    name:item.name,
                    price: item.price,
                    size: size,
                    quantity:1
                });
                this.$store.commit('addBasketItems', this.basketDump);
                this.basketDump = [];

            },
        },
        components: {

        },
        computed:
            {
                menuItems() {
                    return this.$store.getters.getMenuItems
                },
                genderFilter: function () {
                    return this.menuItems.filter(function (item) {
                        return item.gender === 'Men' || item.gender === 'Both'
                    })
                },
            }

    };
</script>
<style lang="scss">

    p
    {
        font-size: 14px;
        text-align: left;
        color: grey;
        margin-bottom: 5px !important;
    }
    .textbox
    {
        padding: 10px;
    }

    .info_box .flex h1{

        font-weight: bold;
        text-transform: capitalize;
        font-size: 16px;
        text-align: left;
    }

    .layout:first-child {
        height: 40vh;
    }

    .layout:last-child {
        height: 40vh;
    }
    .imgbox
    {
        height:200px;
        background-size: contain;

    }
    .pricetag
    {
        font-size: 16px;
        color: map-get($colorz, orange);
    }
    .genderTag
    {
        color: map-get($colorz, inprogress);
    }
    .btnToBasket
    {
        border-color: map_get($colorz, orange);
        color: map_get($colorz, orange) !important;
    }
    .borderShoe
    {
        border: 1px solid map_get($colorz, orange);
        border-radius: 2px;
        margin: 5px;
    }

</style>