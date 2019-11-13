<template>
    <v-container>

        <v-snackbar v-model="updatedSuccess" top>
            {{updatedText}}
            <v-btn text @click="updatedSuccess = false">
                Close
            </v-btn>
        </v-snackbar>


        <v-row>
            <v-col offset-md="1" md="10">
                <div class="pa-2 info2">
                    <v-simple-table id="menu-table">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th></th>
                                <th class="text-left" style="width:70%">Name of Shoe
                                <v-btn color="orange" small text to="/addNew">
                                    <v-icon>add</v-icon><span style="padding: 0 10px;">Add Shoe</span>
                                </v-btn></th>
                                <th class="text-left" style="width: 100px">Gender</th>
                                <th class="text-left" style="width: 100px">Color</th>
                                <th class="text-left" style="width: 100px">Price</th>
                                <th class="text-left" style="width: 100px">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in menuItems" :key="item.name">
                                <td id="td_adminItem_img">
                                    <v-img v-bind:src="item.image"></v-img>
                                </td>
                                <td>
                                    <span id="td_name">{{ item.name }}</span><br>
                                    <span id="menu_item_description">{{ item.description }}</span>
                                </td>
                                <td>{{ item.gender }}</td>
                                <td>{{ item.color }}</td>
                                <td>{{ item.price }}</td>
                                <td>
                                    <v-btn small text @click.stop="dialog= true" @click="editItem(item)">
                                        <v-icon color="orange">edit</v-icon>
                                    </v-btn>
                                </td>
                                <td>
                                    <v-btn small text @click="deleteItem(item.id)">
                                        <v-icon color="incomplete">delete_forever</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-dialog v-model="dialog" max-width="400">
                <v-card style="padding: 20px">

                    <h2>Edit Shoe</h2>
                    <div class="pa-2 info2">
                        <v-text-field
                                required
                                v-model="item.name"
                        ></v-text-field>
                        <v-text-field
                                required
                                v-model="item.description"
                        ></v-text-field>
                        <v-text-field
                                required
                                v-model="item.color"
                        ></v-text-field>
                        <v-text-field
                                required
                                v-model="item.price"
                        ></v-text-field>
                        <v-btn class="addbtn" @click="updateItem()" @click.stop="dialog= false">
                            Edit Shoe
                        </v-btn>
                        <v-btn color="incomplete" @click="dialog= false">
                            Cancel
                        </v-btn>
                    </div>


                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
    import { dbShoeAdd } from "../../firebase";

    export default {
        data () {
            return {
                basket:[],
                dialog:false,
                item: [],
                activeEditItem: null,
                updatedSuccess: false,
                updatedText: 'Shoe has been updated'
            }
        },
        beforeCreate() {
            this.$store.dispatch('setMenuItems')
        },
        methods: {
            editItem(item) {
                this.item = item;
                this.activeEditItem = item.id;
            },
            updateItem() {
              dbShoeAdd.doc(this.activeEditItem).update(this.item).then(() =>  {
                  this.updatedSuccess = true;
                  console.log("Document successfully updated")
              }).catch(function (error) {
                  console.error("error updating document: ", error)
              })
            },
            deleteItem(id){
                dbShoeAdd.doc(id).delete().then(function () {
                   // console.log("Deleted");
                }).catch(function (error) {
                    //console.error("error removing doc: ", error);
                });
                },
            },
        computed:
            {
                menuItems() {
                    return this.$store.getters.getMenuItems
                },
            }
    }
</script>

<style lang="scss" scoped>

    .addbtn
    {
        background-color:map_get($colorz, orange) !important;
        margin: 10px 15px 10px 5px;
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

    #td_adminItem_img
    {
        max-width: 40px;
        padding: 0;
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