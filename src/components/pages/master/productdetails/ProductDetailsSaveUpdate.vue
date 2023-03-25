<template>
    <div class="asset-form">
        <div class="loading" v-if="progressBar.loading"></div>
            <div class="container-fluid">
                <router-link :to="{ name: 'ProductDetails' }"  tag="span" class="button-tooltip pt-1 float-left">
                    <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
                <form class="form-group" @submit.prevent="productdetailsSaveUpdate()">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-6 col-xl-6">
                            <div class="new-product-info">
                                <div class="mt-3 ml-3 mr-3 mb-3">
                                    <div class="mb-3">
                                        <label class="required"> <b>Product Code</b></label>
                                        <input type="text" class="form-control mb-1" v-model="entity.productCode" placeholder=" Enter Product Code" v-validate="'required'" name="Product Code">
                                        <small v-show="errors.has('Product Code')" class="help is-danger"><i v-show="errors.has('Product Code')" class="fa fa-exclamation-circle"></i>{{ errors.first('Product Code') }} </small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="required"> <b>Product Name</b></label>
                                        <model-list-select class="form-control mb-1" :list="productList" v-model="entity.productOid" option-value="oid" optionText="name" placeholder="Select Product Name" v-validate="'required'" name="Product"/>
                                        <small v-show="errors.has('Product')" class="help is-danger"><i v-show="errors.has('Product')" class="fa fa-exclamation-circle"></i>{{ errors.first('Product') }} </small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="required"> <b>Warehouse Name</b></label>
                                        <model-list-select class="form-control mb-1" :list="warehouseinfoList" v-model="entity.warehouseOid" option-value="oid" optionText="warehouseName" placeholder="Select Warehouse Name" v-validate="'required'" name="Warehouse"/>
                                        <small v-show="errors.has('Warehouse')" class="help is-danger"><i v-show="errors.has('Warehouse')" class="fa fa-exclamation-circle"></i>{{ errors.first('Warehouse') }} </small>
                                    </div>
                                    <div class="text-center mt-4">
                                        <button class="btn btn-success button-width ripple mr-3" @submit.prevent="productdetailsSaveUpdate()">
                                            {{buttonText}}
                                        </button>
                                        <router-link tag="button" class="btn btn-danger button-width ripple" :to="{name:'ProductDetails'}" >
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
               
            },
            contactList:[],
            warehouseinfoList:[],
            productList:[],
            typeList:[],
            isUpdatePage: false,
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
        init()
        {
            this.getWarehouseInfo();
            this.getProduct();
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getProductDetails(this.$route.params.id)
                this.isUpdatePage = true
                this.disable = 'isUpdatePage'
                //entity.warehouseOid
                

            } else {                
                this.buttonText = "Save"
                localStorage.getItem("lumos_warehouseOid") == "NBROfficer";
            }      
        },
        getProductDetails(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.master_productdetails_v1_get_by_oid, body);
            lumos_client.onPost(url.master_productdetails_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier(this.entity);
                this.getCategory();
            }).catch(error =>{
            });
        },
        getWarehouseInfo(){
            let body = {};
            let req = constant.getRequest(url.master_warehouseinfo_v1_get_list, body);
            lumos_client.onPost(url.master_warehouseinfo_v1_get_list, req)
            .then(result => {
                if(localStorage.getItem("lumos_roleOid")==='aroofficer' || localStorage.getItem("lumos_roleOid")==='roofficer'){
                    let warehouseOid = localStorage.getItem("lumos_warehouseOid") 
                    this.warehouseinfoList = result['data']['body']['data'].filter((x)=>{if(x.oid === warehouseOid){return x}})                
                    this.entity.warehouseOid = this.warehouseinfoList[0].oid; 
                } else {
                    this.warehouseinfoList = result['data']['body']['data'];
                }
                          
            }).catch(error => {
            });
        },
        getProduct(){
            let body = {};
            let req = constant.getRequest(url.master_product_v1_get_list, body);
            lumos_client.onPost(url.master_product_v1_get_list, req)
            .then(result => {
                this.productList = result['data']['body']['data'];
                console.log(this.productList);                
            }).catch(error => {
            });
        },
        productdetailsSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.master_productdetails_v1_update;                
                } else {    
                    http_url = url.master_productdetails_v1_save;
                }                
                let body = this.modifier(this.entity); 
                // console.log(body);
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
                        this.messageText = "Product Details Updated Successfully";
                        setTimeout( () => this.$router.push({name:'ProductDetails'}), 3000);
                    } else {
                        this.messageText = "Product Details Saved Successfully";
                        setTimeout( () => this.entity = {
                           // branchmanageroid: "",
                           // relationshipmanageroid: "",
                           // type: "Issuing Product Details"
                        }, 2000 )
                        setTimeout( () => this.$router.push({name:'ProductDetails'}), 2000);
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
.new-product-info {
    background: white;
    padding: 10px 10px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.03);
    -webkit-box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%); 
    box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%);
} 
</style>
