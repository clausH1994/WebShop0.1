<template>
    <v-container>
        <v-row>
            <v-col offset-md="1" md="7">
                <h1>Orders</h1>
                <div class="pa-2 info2">
                    <v-row class="ma-0">
                        <v-col cols="12" md="1" class="pa-2">
                            <p class="font-weight-bold-1 darkgrey--text">
                                INFO:
                            </p>
                        </v-col>
                        <v-col cols="12" md="5" class="pa-2 pl-5">
                           <v-row align="center">
                               <div  class="complete status_box">COMPLETED</div>
                               <span class="font-weight-light caption pl-1">Done</span>
                           </v-row>

                            <v-row align="center">
                                <div class="inprogress status_box">IN-PROGRESS</div>
                                <span class="font-weight-light caption pl-1">Working on it</span>
                            </v-row>

                            <v-row align="center">
                                <div class="status_box incomplete">NOT STARTED</div>
                                <span class="font-weight-light caption pl-1">Not started yet</span>
                            </v-row>

                        </v-col>
                        <v-col cols="12" md="6" class="pa-2">
                            <v-row>
                                <div  class="complete status_box">COMPLETED</div>
                                <div class="inprogress status_box">IN-PROGRESS</div>
                                <div class="incomplete status_box ">NOT STARTED</div>
                            </v-row>
                          <v-row>
                              <p class="font-weight-light caption pl-1">
                                  <b> Single-Click </b> to switch stage: complete => inprogress => <b>Double-Click</b> the box to reset to "not started"
                              </p>
                              <v-icon color="grey">archive</v-icon>
                              <span>
                                  Archive to "hide" it from orders list
                              </span>
                          </v-row>
                        </v-col>
                    </v-row>
                </div>

                <!--- Orders list area -->
                    <div class="pa-2 info2">
                        <p class="font-weight-bold-1 pa-3 darkgrey--text">
                            ORDERS:
                        </p>
                    <v-simple-table id="menu-table">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-left" style="width:10%">Order nr.</th>
                                <th class="text-left" style="width:10%">QTY</th>
                                <th class="text-left" style="width:30%">Item</th>
                                <th class="text-left" style="width:10%">Size</th>
                                <th class="text-left" style="width:10%">Price</th>
                                <th class="text-left" style="width:10%">Status</th>
                                <th class="text-left" style="width:10%">Archive item</th>
                                <th class="text-left" style="width:10%">Remove</th>
                            </tr>
                            </thead>
                            <tbody class="font-weight-light">
                            <tr v-for="item in orderItems" :key="item.name">
                                <td>
                                    {{ item.orderNumber }}
                                </td>
                                <td class="py-3" >
                                    <p style="margin:0" v-for="subitem in item.orderLines" :key="subitem.id">{{ subitem.quantity }}</p>
                                </td>
                                <td class="py-3">
                                    <p style="margin:0" v-for="subitem in item.orderLines" :key="subitem.id">  {{ subitem.name }}</p>
                                </td>
                                <td class="py-3">
                                    <p style="margin:0" v-for="subitem in item.orderLines" :key="subitem.id">{{ subitem.size}}</p>
                                </td>
                                <td class="py-3">
                                    <p style="margin:0" v-for="subitem in item.orderLines" :key="subitem.id">{{ subitem.price}}</p>
                                </td>
                                <td>
                                    <div class="inprogress status_box">{{item.status}}</div>
                                </td>
                                <td>
                                    <v-btn small text @click="addToBasket(item)">
                                        <v-icon color="grey">archive</v-icon>
                                    </v-btn>
                                </td>
                                <td>
                                    <v-btn small text @click="deleteOrderItem(item.id)">
                                        <v-icon color="incomplete">delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>
            </v-col>
           <!-- <v-col offset-md="0" md="4">
                <h1>Revenue</h1>
                <div class="pa-2  info2">
                    Revenue
                </div>
                <div class="pa-2 mt-1 info2">
                    Comleted Orders
                </div>
            </v-col> -->
        </v-row>
    </v-container>
</template>

<script>
    import { dbOrderAdd } from "../../firebase";

    export default {
        data () {
            return {
                basketDump:[],
            }
        },
        beforeCreate() {
            this.$store.dispatch('setOrderItems')
        },
        methods:
            {
                deleteOrderItem(id)
                {
                  dbOrderAdd.doc(id).delete().then(() => {
                      console.log("stuff is deleted");
                  }).catch((error) =>  {

                  })
                },

                addToBasket(item) {
                    /*  if(this.basket.find(itemInArray => item.name === itemInArray.name))
                      {
                          item = this.basket.find(itemInArray => item.name === itemInArray.name);
                          this.increaseQtn(item);
                      }
                      else{
                      this.basket.push({
                          name:item.name,
                          price: item.price,
                          quantity:1
                      })
                      } */
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
                    item.quantity--;

                    if (item.quantity === 0)
                    {
                        this.basket.splice(this.basket.indexOf(item), 1)
                    }
                }
            },
        computed: {
            basket() {
                //return this.$store.state.basketItems
                return this.$store.getters.getBasketItems
            },
            orderItems()
                {
                    return this.$store.getters.getOrderItems
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
.status_box
{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 90px;
    font-size: 12px;
    border-radius: 2px;
    margin:5px 0;
    color:map_get($colorz, white);
    text-shadow: 1px 1px 1px #aaa;
}
</style>