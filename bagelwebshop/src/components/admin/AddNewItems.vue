<template>
    <v-container>
        <v-row>
            <v-col offset-md="4" md="4">
                <h2> Add New Shoe</h2>
                <div class="pa-2 info2">
                   <v-text-field
                        label="Shoe Name"
                        required
                        v-model="name"
                ></v-text-field>
                    <v-text-field
                            label="Description"
                            required
                            v-model="description"
                    ></v-text-field>
                    <v-select
                            :items="genders"
                            label="Gender"
                            v-model="gender"
                    ></v-select>
                    <v-text-field
                            label="Shoe color"
                            required
                            v-model="color"
                    ></v-text-field>
                    <v-text-field
                            label="price"
                            required
                            v-model="price"
                    ></v-text-field>
                    <v-file-input label="file input" required @change="uploadImage"></v-file-input>
                    <v-btn class="addbtn" @click="addNewShoeItem" :disabled="btnDisable">
                        Add Shoe
                    </v-btn>
                    <v-btn color="incomplete" to="/admin">
                        Cancel
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { dbShoeAdd, fb } from "../../../firebase";

    export default {
        data() {

            return {
                name: '',
                description: '',
                price: '',
                genders:['Men', 'Women', 'Both'],
                image:null,
                btnDisable: true,

            };
        },
        methods:
            {
                uploadImage(e){
                    let file = e;
                    console.log(e);
                    var storageRef = fb.storage().ref('shoes/'+ file.name);
                    let uploadTask = storageRef.put(file);

                    uploadTask.on('state_changed', (snapshot) => {

                    }, (error) =>{

                        }, () => {
                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                this.image = downloadURL;
                                this.btnDisable = false;
                                console.log('file available at', downloadURL);
                            });
                        });
                },
                addNewShoeItem() {
                    dbShoeAdd.add({
                            name: this.name ,
                            description: this.description,
                            gender: this.gender,
                            color: this.color,
                            price: this.price,
                            image: this.image,
                    })

                }
            }
    }
</script>

<style lang="scss" scoped>


    .info2
    {
        border: map_get($colorz, orange) 1px solid;
    }

    .addbtn
    {
        background-color:map_get($colorz, orange) !important;
        margin: 10px 15px 10px 5px;
    }



</style>