<template>
<div class="asset-form">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="container-fluid">
        <form class="form-group" @submit.prevent="purchaseSaveUpdate()">
            <div class="row">
                <div class="col-12">
                    <b-tabs v-model="tabIndex" ref="wizard">
                        <b-tab title="Purchase" class="asset-form-panel">
                            <div class="row">
                               <div class="col-md-6 col-12 col-sm-6" active>
                                   
                                    <p>
                                        <label> <b>Warehouse Name</b></label>
                                        <model-list-select class="form-control mb-1" :list="warehouseinfoList" v-model="entity.warehouseOid" option-value="oid" optionText="warehouseName" placeholder="Select Warehouse Name" v-validate="'required'" name="Warehouse Name" :disabled="showWarehouse()"/>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Bill of Entry Number</b></label>
                                        <input class="form-control mb-1" v-model="entity.billOfEntryNo" option-value="name" optionText="name" placeholder="Bill of Entry Number" v-validate="'required'" name="Bill of Entry Number"/>
                                        <small v-show="errors.has('Bill of Entry Number')" class="help is-danger"><i v-show="errors.has('Bill of Entry Number')" class="fa fa-exclamation-circle"></i>{{ errors.first('Bill of Entry Number') }} </small>                                   
                                   </p> 
                                   <p>
                                        <label class="required"> <b>Bill of Entry Office Code</b></label>
                                        <model-list-select class="form-control mb-1" :list="officeList" v-model="entity.billOfEntryOfficeCode" option-value="oid" optionText="name" placeholder="Bill of Entry Office Code" v-validate="'required'" name="Bill of Entry Office Code"/>
                                        <small v-show="errors.has('Bill of Entry Office Code')" class="help is-danger"><i v-show="errors.has('Bill of Entry Office Code')" class="fa fa-exclamation-circle"></i>{{ errors.first('Bill of Entry Office Code') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Bill of Entry Date</b></label>
                                        <datepicker placeholder="Issue Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.billOfEntryDate" v-validate="'required'" name="Bill of Entry Date"></datepicker>
                                        <small v-show="errors.has('Bill of Entry Date')" class="help is-danger"><i v-show="errors.has('Bill of Entry Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('Bill of Entry Date') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Purchase Date</b></label>
                                        <datepicker placeholder="Purchase Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.purchaseDate" v-validate="'required'" name="Purchase Date"></datepicker>
                                        <small v-show="errors.has('Purchase Date')" class="help is-danger"><i v-show="errors.has('Purchase Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('Purchase Date') }} </small>
                                    </p>                                    
                               </div>
                               <div class="col-md-6 col-12 col-sm-6" active>  
                                    <p>
                                        <label class="required"> <b>Shipping Bill Number</b></label>
                                        <input class="form-control mb-1" v-model="entity.shippingBillNumber" option-value="name" optionText="name" placeholder="Shipping Bill Number" v-validate="'required'" name="Shipping Bill Number"/>
                                        <small v-show="errors.has('Shipping Bill Number')" class="help is-danger"><i v-show="errors.has('Shipping Bill Number')" class="fa fa-exclamation-circle"></i>{{ errors.first('Shipping Bill Number') }} </small>
                                    </p>                           
                                   <p>
                                        <label class="required"> <b>Shipping Bill Date</b></label>
                                        <datepicker placeholder="Shipping Bill Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.shippingBillDate" v-validate="'required'" name="Shipping Bill Date"></datepicker>
                                        <small v-show="errors.has('Shipping Bill Date')" class="help is-danger"><i v-show="errors.has('Shipping Bill Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('Shipping Bill Date') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Order Date</b></label>
                                        <datepicker placeholder="Order Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.orderDate" v-validate="'required'" name="Order Date"></datepicker>
                                        <small v-show="errors.has('Order Date')" class="help is-danger"><i v-show="errors.has('Order Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('Order Date') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Purchase Person</b></label>
                                        <input class="form-control" placeholder="Purchase Person" v-model="entity.purchasePerson" v-validate="'required'" name="Purchase Person" autocomplete="off">
                                        <small v-show="errors.has('Purchase Person')" class="help is-danger"><i v-show="errors.has('Purchase Person')" class="fa fa-exclamation-circle"></i>{{ errors.first('Purchase Person') }} </small>    
                                    </p>    
                               </div>
                                
                            </div>
                            <div class="col-12">
                                
                                <b>Purchase Details</b>
                                <span class="btn btn-bg-default button-tooltip"  @click="addDocument(entity.documents)">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                    <span class="button-tooltiptext">Add</span>
                                </span>
                                <b>Add Product</b>
                                <span class="btn btn-bg-default button-tooltip"  @click="addProduct()">
                                    <i class="fa fa-suitcase" aria-hidden="true"></i>
                                    <span class="button-tooltiptext">Add</span>
                                </span>
                                <div class="table-responsive no-padding">
                                    <table class="table table-bordered table-sm ">
                                        <tr class="table table-bordered text-center">
                                            <th class="required" style="width: 25%">Product Name</th>
                                            <th class="required" style="">Unit Price (US Dollar)</th>
                                            <th class="required" style="">Total Quantity</th>
                                            <th class="required" style="">Total Price (US Dollar)</th>
                                            <th style="">Action</th>
                                        </tr>
                                        <tr v-for="(document, index) in entity.documents" :key="index" class="">
                                            <td>
                                                <model-list-select :list="productList" v-model="document.productOid" v-validate="'required'" placeholder="Product Name" option-value="oid" optionText="productOid" name="Product Details"/>
                                                <small v-show="errors.has('Product Details')" class="help is-danger"><i v-show="errors.has('Product Details')" class="fa fa-exclamation-circle"></i>{{ errors.first('Product Details') }} </small>
                                            </td>
                                            <td>
                                                <input type="text" placeholder="Unit Price" class="form-control " v-model="document.unitValue" v-validate="'required'" name="Unit Price">
                                                <small v-show="errors.has('Unit Price')" class="help is-danger"><i v-show="errors.has('Unit Price')" class="fa fa-exclamation-circle"></i>{{ errors.first('Unit Price') }} </small>    
                                            </td>
                                            <td>
                                                <input type="text" placeholder="Total Quantity" class="form-control " v-model="document.totalQuantity" v-validate="'required'" name="Total Quantity">
                                                <small v-show="errors.has('Total Quantity')" class="help is-danger"><i v-show="errors.has('Total Quantity')" class="fa fa-exclamation-circle"></i>{{ errors.first('Total Quantity') }} </small>
                                            </td>
                                            <td>
                                                <input type="text" placeholder="Total Price" class="form-control " v-model="document.totalValue" v-validate="'required'" name="Total Price">
                                                <small v-show="errors.has('Total Price')" class="help is-danger"><i v-show="errors.has('Total Price')" class="fa fa-exclamation-circle"></i>{{ errors.first('Total Price') }} </small>
                                            </td>
                                            <td class="text-center" >
                                                <span class="btn btn-bg-danger button-tooltip mr-1 " @click="deleteConfirmation(index, document.generalProfileArticlesOid)">
                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                                    <span class="button-tooltiptext"> Delete</span>
                                                </span>
                                                <span class="btn btn-bg-success button-tooltip"  @click="addDocument(entity.documents)">
                                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                                    <span class="button-tooltiptext" >Add</span>
                                                </span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div> 
                        </b-tab>
                    </b-tabs>
                </div>
            </div>   
            <div class="text-center mt-3">
                <button class="btn btn-success button-width ripple mr-3" @submit.prevent="purchaseSaveUpdate()">
                    {{buttonText}}
                </button>
                <router-link tag="button" class="btn btn-danger button-width ripple" :to="{name:'Purchase'}" >
                    Cancel
                </router-link>
            </div> 
        </form>              
    </div>
    <v-app>
        <v-dialog  v-model="deleteConfirmationModel"  max-width="400" >
            <v-card>                                    
            <v-card-text>
            <h5>Are you sure, You want to delete purchase details?</h5>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="deleteItem()">
                Yes
                </v-btn>
                <v-btn color="red darken-1" flat="flat" @click.native="deleteConfirmationModel = false">
                No
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="addProductModel" max-width="700">
            <v-card>
                <form class="form-group" @submit.prevent="productSave()">
                    <div class="new-product">
                        <p>
                            <label class="required"> <b>Category Type </b></label>
                            <model-list-select class="form-control mb-1" :list="categoryList" v-model="entity1.categoryoid" option-value="oid" optionText="name" placeholder="Select Category Name" name="Category Type"/>
                        </p>
                        <p>
                            <label class="required"> <b>Product Name</b></label>
                            <input class="form-control mb-1" v-model="entity1.name" option-value="name" optionText="name" placeholder="Select Product" name="Product Name"/>
                        </p>
                        <p>
                            <label class="required"> <b>Description</b></label>
                            <input class="form-control mb-1" v-model="entity1.description" option-value="name" optionText="name" placeholder="Select Description" name="Description"/>
                        </p>
                        <p>
                            <label class="required"> <b>Weight</b></label>
                            <input class="form-control mb-1" v-model="entity1.weight" option-value="name" optionText="name" placeholder="Select Weight" name="Weight"/>
                        </p>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-success button-width ripple mr-3" @submit.prevent="productSave()">
                        {{buttonText}}
                        </button>
                        <v-btn class="btn btn-danger button-width ripple" flat="flat" @click.native="addProductModel = false">
                        Cancel
                        </v-btn>
                    </div>
                </form>
            </v-card>
        </v-dialog>
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
               "documents":[{
                   productOid: "",
                   unitQuantity: "",
                   unitValue: "", 
                   totalQuantity: "",
                   totalValue: ""
               } ],
               
            },
            entity1:{
                warehouseOid:""

            },
            productList:[],
            officeList:[],
            categoryList:[],
            warehouseinfoList:[],
            typeList:[],
            buttonText:'',
            deleteConfirmationModel: false,
            addProductModel:false,
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
        addItem(item) {
            item.push({
                label: "",
                value: ""
            });
        },
        showWarehouse(){
            if(localStorage.getItem("lumos_roleOid")==='aroofficer' || localStorage.getItem("lumos_roleOid")==='roofficer' || localStorage.getItem("lumos_roleOid") == 'warehouseadmin' || localStorage.getItem("lumos_roleOid") == 'warehouseoperation'){
                return true;
            }
        },
        addDocument(documents) {
            documents.push({
                tag : '',
                type: 'inner',
                show: false,
                value:'',
                valueDeterminate:''
            });
        },
        addProduct(){
            this.addProductModel = true;
        },
        deleteConfirmation(index, oid){
            this.deleteConfirmationModel = true
            this.itemIndex = index
            this.itemArticleOid = oid
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
        deleteItem() {   
            if(!this.$route.params.id){                
                this.entity.documents.splice(this.itemIndex, 1);
                this.deleteConfirmationModel = false
                return
            } 
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = url.operation_purchase_v1_delete;               
                let body = {oid: this.itemArticleOid}; 
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
                    this.messageText = "Purchase Details has been Successfully Deleted";
                    this.deleteConfirmationModel = false
                    this.getGeneralProfileTransaction(this.$route.params.id)                
           
                }).catch(error => {
                    this.$log.error(error)
                })               
            }); 
        },
        updateSnackbarInfo(variable){
            this.snackbar = true;
            this.color = variable.color;
            this.messageText = variable.messageText;
        },
        init(){
            this.getProductList();
            this.getOfficeList();
            this.getWarehouseList();
            this.getCategory();
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getPurchase(this.$route.params.id)
            } else {
                this.buttonText = "Buy"
            }      
        },
        productSave(){
                let http_url = ''; 
                http_url = url.master_product_v1_save;
                this.entity1.warehouseOid=localStorage.getItem("lumos_warehouseOid");
                let body = this.entity1
                let req = constant.getRequest(http_url, body); 
                lumos_client.onPost(http_url, req)
                .then(result => {
                    this.progressBar.loading = false;
                    this.progressBar.show = false;                
                    let res = result.data.header.responseCode;
                    this.addProductModel = false;
                    this.snackbar = true;
                    if (res != "200"){
                        this.color = "red"; 
                        this.messageText =  result.data.body.data;
                        return;
                    }
                    this.color = "success"; 
                   
                    this.messageText = "Product Saved Successfully";
                    setTimeout( () => this.entity1 = {
                    
                    }, 2000 )
                    this.getProductList();
                }).catch(error => {
                    this.$log.error(error)
                })        
        },
        getPurchase(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.operation_purchase_v1_get_by_oid, body);
            lumos_client.onPost(url.operation_purchase_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier(this.entity);
            }).catch(error =>{
            });
        },
        getProductList(){
            let body = {};
            let req = constant.getRequest(url.master_productdetails_v1_get_list, body);
            lumos_client.onPost(url.master_productdetails_v1_get_list, req)
            .then(result => {
                this.productList = result['data']['body']['data'];
            }).catch(error => {
            });
        },
        getOfficeList(){
            let body = {};
            let req = constant.getRequest(url.master_office_v1_get_list, body);
            lumos_client.onPost(url.master_office_v1_get_list, req)
            .then(result => {
                this.officeList = result['data']['body']['data'];
            }).catch(error => {
            });
        },
        getWarehouseList(){
            let body = {};
            let req = constant.getRequest(url.master_warehouseinfo_v1_get_list, body);
            lumos_client.onPost(url.master_warehouseinfo_v1_get_list, req)
            .then(result => {
                if(localStorage.getItem("lumos_roleOid")=='sa'){
                    this.warehouseinfoList = result['data']['body']['data'];
                } else {
                    let warehouseOid = localStorage.getItem("lumos_warehouseOid"); 
                    this.warehouseinfoList = result['data']['body']['data'].filter((x)=>{if(x.oid === warehouseOid){return x}});                
                    this.entity.warehouseOid = this.warehouseinfoList[0].oid;
                }
                           
            }).catch(error => {
            });
        },        
        purchaseSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.operation_purchase_v1_update;                
                } else {    
                    http_url = url.operation_purchase_v1_save;
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
                        this.messageText = "Purchase Updated Successfully";
                        setTimeout( () => this.$router.push({name:'Purchase'}), 3000);
                    } else {
                        this.messageText = "Purchase Saved Successfully";
                        setTimeout( () => this.entity = {
                           "documents":[{
                                            productOid: "",
                                            unitQuantity: "",
                                            unitValue: "", 
                                            totalQuantity: "",
                                            totalValue: ""
                                        }],
                        }, 2000 )
                    }
                }).catch(error => {
                    this.$log.error(error)
                })               
            }); 
        },
        modifier(entity){
            var obj = _.clone(entity);
            obj.documents = JSON.stringify(entity.documents);
            if(this.entity.billOfEntryDate){
                obj.billOfEntryDate = obj.billOfEntryDate.toISOString();
            }
            if(this.entity.shippingBillDate){
                obj.shippingBillDate = obj.shippingBillDate.toISOString();
            }
            if(this.entity.orderDate){
                obj.orderDate = obj.orderDate.toISOString();
            }
            if(this.entity.purchaseDate){
                obj.purchaseDate = obj.purchaseDate.toISOString();
            }
            return obj;
        },
        oidModifier(entity){
            if(this.entity.documents){
                this.entity.documents = JSON.parse(this.entity.documents);
            }
            if(this.entity.billOfEntryDate){
                this.entity.billOfEntryDate = new Date(this.entity.billOfEntryDate);
            }
            if(this.entity.shippingBillDate){
                this.entity.shippingBillDate = new Date(this.entity.shippingBillDate);
            }
            if(this.entity.orderDate){
                this.entity.orderDate = new Date(this.entity.orderDate);
            }
            if(this.entity.purchaseDate){
                this.entity.purchaseDate = new Date(this.entity.purchaseDate);
            }
        },
    }
}
</script>

<style scoped>
.table-responsive{
overflow-y:visible;
overflow-x:visible;
}
.isUpdatePage{
    cursor: default;
    pointer-events: none;
    opacity: 0.45;
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
