<template>
   <v-container>
       <v-row>
           <v-col offset-md="1" md="5">
               <h1>Menu Items</h1>
               <div class="pa-2 info2">
               <v-simple-table id="menu-table">
                   <template v-slot:default>
                       <thead>
                       <tr>
                           <th class="text-left" style="width:70%">Name of item</th>
                           <th class="text-left" style="width: 100px">Price</th>
                           <th class="text-left" style="width: 100px">Add to Basket</th>
                       </tr>
                       </thead>
                       <tbody>
                       <tr v-for="item in menuItems" :key="item.name">
                           <td>
                               <span id="td_name">{{ item.name }}</span><br>
                               <span id="menu_item_description">{{ item.description }}</span>
                           </td>
                           <td>{{ item.price }}</td>
                           <td>
                               <v-btn small text @click="addToBasket(item)">
                                   <v-icon color="orange">add_box</v-icon>
                               </v-btn>
                           </td>
                       </tr>
                       </tbody>
                   </template>
               </v-simple-table>
               </div>
           </v-col>
           <v-col offset-md="1" md="4">
               <h1>CURRENT BASKET</h1>
            <div class="pa-2 info2">
                <v-simple-table id="menu-table">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left" style="width:30%">Quantity</th>
                        <th class="text-left" style="width: 40%">Name of item</th>
                        <th class="text-left" style="width: 15%">Size</th>
                        <th class="text-left" style="width: 15%">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in basket" :key="item.name">
                        <td>
                            <v-icon color="orange" @click="increaseQtn(item)">add_box</v-icon>
                            {{ item.quantity }}
                            <v-icon color="orange" @click="decreaseQtn(item)">indeterminate_check_box</v-icon>
                        </td>
                        <td>{{ item.name }}</td>
                        <td> {{ item.size }}</td>
                        <td> {{ item.price }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
                <v-divider></v-divider>
                <v-row  id="basket_checkout" class="mt-4" style="margin:0">
                    <v-col>
                        <p>Subtotal:</p>
                        <p>Delivery:</p>
                        <p>Total Amount:</p>
                    </v-col>
                    <v-col class="text-right">
                        <p>{{ subTotal }} DDK</p>
                        <p> 40 DDK</p>
                        <p><b>{{total}} DDK</b></p>
                    </v-col>
                </v-row>
                <v-row style="margin:0">
                        <v-spacer></v-spacer>
                        <v-btn color="orange" @click="addCheckoutItem">
                            Checkout
                        </v-btn>
                </v-row>
            </div>
           </v-col>
       </v-row>
   </v-container>
</template>

<script>
    export default {
        data () {
            return {
               basketDump:[],
            }
        },
        beforeCreate()
            {
                this.$store.dispatch('setMenuItems')
            },
        methods:
            {

                addCheckoutItem() {
                  this.$store.dispatch('setCheckoutItem')
                },
                addToBasket(item) {
                    this.basketDump.push({
                        name:item.name,
                        price: item.price,
                        quantity:1
                    });
                    this.$store.commit('addBasketItems', this.basketDump);
                    this.basketDump = [];
                },
                increaseQtn(item) {
                    item.quantity++;
                },
                decreaseQtn(item)
                {
                    this.$store.commit('BasketCountDown');
                    item.quantity--;

                    if (item.quantity === 0)
                    {
                        this.basket.splice(this.basket.indexOf(item), 1)
                    }
                }
            },
            computed: {
                menuItems() {
                    //return this.$store.state.basketItems
                    return this.$store.getters.getMenuItems
                },
                basket() {
                    //return this.$store.state.basketItems
                    return this.$store.getters.getBasketItems
                },
                basketNumber()
                {
                  return this.$store.getters.getBasketNumber
                },
                subTotal() {
                    var subCost = 0;
                    for(var items in this.basket)
                    {
                        var individualItem = this.basket[items];
                        subCost += individualItem.quantity * individualItem.price
                    }
                    return subCost;
                },
                total () {
                    var deliveryPrice = 40;
                    var totalCost = this.subTotal;
                    return totalCost + deliveryPrice;
                }
            }
    }
</script>

<style lang="scss" scoped>
    .col h1{
        @include info_mixin(5px, map-get($colorz, white), 10px, 5px, map_get($colorz, primary));
        font-weight: bold;
        text-transform: uppercase;
        font-size: 16px;
        text-align: right;
    }
    .col:last-child h1
    {
        text-align: left;
    }

    .info2
    {
        background-color: white;
    }
    tr th
    {
        font-weight: 300;
    }
    #td_name
    {
        font-weight: bold;
    }
    tr td
    {
        padding: 10px 10px 10px 16px;
    }
    #menu_item_description
    {
        font-style: italic;
        font-weight: 300;
        color: map_get($colorz, darkgrey);
        font-size: 13px;
    }
    #basket_checkout
    {
        font-size:13px;
    }
    #basket_checkout p:first-child
    {
        line-height: 2px;
    }
</style>