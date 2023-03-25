<template>
    <div class="asset-form">
        <div class="loading" v-if="progressBar.loading"></div>
            <div class="container-fluid">
                <router-link :to="{ name: 'Product' }"  tag="span" class="button-tooltip pt-1 float-left">
                    <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
                <form class="form-group" @submit.prevent="productSaveUpdate()">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-6 col-xl-6">  
                            <div class="new-product">
                                <div class="mt-3 ml-3 mr-3 mb-3">
                                    <div class="mb-3">
                                        <label class="required"> <b>Category Type </b></label>
                                        <model-list-select class="form-control mb-1" :list="categoryList" v-model="entity.categoryoid" option-value="oid" optionText="name" placeholder="Select Category Name" v-validate="'required'" name="Category Type"/>
                                        <small v-show="errors.has('Category Type')" class="help is-danger"><i v-show="errors.has('Category Type')" class="fa fa-exclamation-circle"></i>{{ errors.first('Category Type') }} </small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="required"> <b>Product Name</b></label>
                                        <input class="form-control mb-1" v-model="entity.name" option-value="name" optionText="name" placeholder="Product Name" v-validate="'required'" name="Product Name"/>
                                        <small v-show="errors.has('Product Name')" class="help is-danger"><i v-show="errors.has('Product Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('Product Name') }} </small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="required"> <b>Description</b></label>
                                        <input class="form-control mb-1" v-model="entity.description" option-value="name" optionText="name" placeholder="Product Description" v-validate="'required'" name="Description"/>
                                        <small v-show="errors.has('Description')" class="help is-danger"><i v-show="errors.has('Description')" class="fa fa-exclamation-circle"></i>{{ errors.first('Description') }} </small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="required"> <b>Weight</b></label>
                                        <input class="form-control mb-1" v-model="entity.weight" option-value="name" optionText="name" placeholder="Product Weight" v-validate="'required'" name="Weight"/>
                                        <small v-show="errors.has('Weight')" class="help is-danger"><i v-show="errors.has('Weight')" class="fa fa-exclamation-circle"></i>{{ errors.first('Weight') }} </small>
                                   </div>
                                   <div class="text-center mt-4">
                                        <button class="btn btn-success button-width ripple mr-3" @submit.prevent="productSaveUpdate()">
                                            {{buttonText}}
                                        </button>
                                        <router-link tag="button" class="btn btn-danger button-width ripple" :to="{name:'Product'}" >
                                            Cancel
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        <v-app>
            <v-flex>
                <div>
                    <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" :color="color">
                        {{messageText}}
                        <v-btn  flat @click="snackbar = false"> 
                        <i class="fa fa-window-close" aria-hidden="true"></i>   
                        </v-btn>
                    </v-snackbar>
                </div>
            </v-flex>
        </v-app>
    </div>    
</template>

<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import { ModelListSelect} from 'vue-search-select';
import contact from '@/components/Contact.vue';
import contactData from '@/components/ContactData.vue';
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker";
import * as _ from 'underscore';

export default {
    components: {
        ModelListSelect, Datepicker, contact, contactData
    },
    data(){
        return{
            entity:{
               // branchmanageroid: "",
               // relationshipmanageroid: "",
               // type: ""
            },
            contactList:[],
            categoryList:[],
            typeList:[],
            buttonText:'',
            statusList:[
                { name : "Active" }, 
                { name : "Inactive" }
            ],
            progressBar:{
                loading: false,
                show: false
            },
            size:"50px",
            snackbar: false,
            y: "bottom",
            x: "right",
            mode: "",
            color: "",
            timeout: 2000,
            messageText: "",
            tabIndex: 0
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        updateSnackbarInfo(variable){
            this.snackbar = true;
            this.color = variable.color;
            this.messageText = variable.messageText;
            //this.getContactList();
        },
        init(){
            this.getCategory();
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getProduct(this.$route.params.id)
            } else {                
                this.buttonText = "Save"
            }      
        },
        getProduct(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.master_product_v1_get_by_oid, body);
            lumos_client.onPost(url.master_product_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier(this.entity);
                this.getCategory();
            }).catch(error =>{
            });
        },
        getCategory(){
            let body = {};
            let req = constant.getRequest(url.master_category_v1_get_list, body);
            lumos_client.onPost(url.master_category_v1_get_list, req)
            .then(result => {
                this.categoryList = result['data']['body']['data'];
            }).catch(error => {
            });
        },
        productSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.master_product_v1_update;                
                } else {    
                    http_url = url.master_product_v1_save;
                }                
                let body = this.modifier(this.entity); 
                let req = constant.getRequest(http_url, body); 
                lumos_client.onPost(http_url, req)
                .then(result => {
                    this.progressBar.loading = false;
                    this.progressBar.show = false;                
                    let res = result.data.header.responseCode;
                    this.snackbar = true;
                    if (res != "200"){
                        this.color = "red"; 
                        this.messageText =  result.data.body.data;
                        return;
                    }
                    this.color = "success"; 
                    if(this.$route.params.id){
                        this.messageText = "Product Updated Successfully";
                        setTimeout( () => this.$router.push({name:'Product'}), 3000);
                    } else {
                        this.messageText = "Product Saved Successfully";
                        setTimeout( () => this.entity = {
                           
                        }, 2000 )
                        setTimeout( () => this.$router.push({name:'Product'}), 2000);
                    }
                }).catch(error => {
                    this.$log.error(error)
                })               
            }); 
        },
        modifier(entity){
            var obj = _.clone(entity);
            if(this.entity.dateForm){
                obj.dateForm = obj.dateForm.toISOString();
            }
            if(this.entity.dateTo){
                obj.dateTo = obj.dateTo.toISOString();
            }
            return obj;
        },
        oidModifier(entity){
            if(this.entity.dateForm){
                this.entity.dateForm = new Date(this.entity.dateForm);
            }
            if(this.entity.dateTo){
                this.entity.dateTo = new Date(this.entity.dateTo);
            }
        },
    }
}
</script>
<style scoped>
.disabled {
    pointer-events: none;
    cursor: not-allowed;

}
.new-product {
    background: white;
    padding: 10px 10px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.03);
    -webkit-box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%); 
    box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%);
} 
</style>
