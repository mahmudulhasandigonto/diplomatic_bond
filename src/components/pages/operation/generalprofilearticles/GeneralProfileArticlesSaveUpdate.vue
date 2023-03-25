<template>
<div class="asset-form">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="container-fluid">
        <form class="form-group" @submit.prevent="generalprofilearticlesSaveUpdate()">
            <div class="row">
                <div class="col-12">
                    <b-tabs v-model="tabIndex" ref="wizard">
                        <b-tab title="General" class="asset-form-panel">
                            <div class="row">
                               <div class="col-md-6 col-12 col-sm-6" active>
                                    <p>
                                        <label class="required"> <b>Sl No.</b></label>
                                        <model-list-select class="form-control mb-1" :list="productList" v-model="entity.quarterId" option-value="oid" optionText="quarterName" placeholder="Select Quarter Name" v-validate="'required'" name="Quarter"/> 
                                    </p>
                            
                                    <p>
                                        <label class="required"> <b>Passbook/Exemption User Name</b></label>
                                        <model-list-select class="form-control mb-1" :list="generalprofileList" v-model="entity.generalProfileTransactionOid" option-value="oid" optionText="nameOfHolder" placeholder="Select Passbook/Exemption User Name" v-validate="'required'" name="General Profile"/>
                                        <small v-show="errors.has('GeneralProfile')" class="help is-danger"><i v-show="errors.has('GeneralProfile')" class="fa fa-exclamation-circle"></i>{{ errors.first('GeneralProfile') }} </small>
                                    </p>
                                     <!-- <p>
                                        <label class="required"> <b>Passbook/Exemption User Name</b></label>
                                        <input class="form-control mb-1" v-model="entity.generalProfileTransactionOid" option-value="oid" optionText="nameOfHolder" placeholder="Select Quantity" v-validate="'required'" name="HolderName"/>
                                        <small v-show="errors.has('HolderName')" class="help is-danger"><i v-show="errors.has('HolderName')" class="fa fa-exclamation-circle"></i>{{ errors.first('HolderName') }} </small>
                                    </p> -->
                                    <p>
                                        <label class="required"> <b>Product Name</b></label>
                                        <model-list-select class="form-control mb-1" :list="productList" v-model="entity.productOid" option-value="oid" optionText="name" placeholder="Select Product Name" v-validate="'required'" name="Product"/>
                                        <small v-show="errors.has('Product')" class="help is-danger"><i v-show="errors.has('Product')" class="fa fa-exclamation-circle"></i>{{ errors.first('Product') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Quantity</b></label>
                                        <input class="form-control mb-1" v-model="entity.quantity" option-value="name" optionText="name" placeholder="Select Quantity" v-validate="'required'" name="Quantity"/>
                                        <small v-show="errors.has('Quantity')" class="help is-danger"><i v-show="errors.has('Quantity')" class="fa fa-exclamation-circle"></i>{{ errors.first('Quantity') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Weight</b></label>
                                        <input class="form-control mb-1" v-model="entity.weight" option-value="name" optionText="name" placeholder="Weight" v-validate="'required'" name="Weight"/>
                                        <small v-show="errors.has('Weight')" class="help is-danger"><i v-show="errors.has('Weight')" class="fa fa-exclamation-circle"></i>{{ errors.first('Weight') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Pieces</b></label>
                                        <input class="form-control mb-1" v-model="entity.pieces" option-value="name" optionText="name" placeholder="Pieces" v-validate="'required'" name="Pieces"/>
                                        <small v-show="errors.has('Pieces')" class="help is-danger"><i v-show="errors.has('Pieces')" class="fa fa-exclamation-circle"></i>{{ errors.first('Pieces') }} </small>
                                   </p>
                                   <p>
                                        <label class="required"> <b>Value USD</b></label>
                                        <input class="form-control mb-1" v-model="entity.valueUSD" option-value="name" optionText="name" placeholder="Value USD" v-validate="'required'" name="Value USD"/>
                                        <small v-show="errors.has('Value USD')" class="help is-danger"><i v-show="errors.has('Value USD')" class="fa fa-exclamation-circle"></i>{{ errors.first('Value USD') }} </small>
                                   </p>
                               </div>
                                <div class="col-md-6 col-12 col-sm-6">
                                    <p>
                                        <label class="required"> <b>Consume Quantity</b></label>
                                        <input class="form-control mb-1" v-model="entity.consumeQuantity" option-value="name" optionText="name" placeholder="Consume Quantity" v-validate="'required'" name="Consume Quantity"/>
                                        <small v-show="errors.has('Consume Quantity')" class="help is-danger"><i v-show="errors.has('Consume Quantity')" class="fa fa-exclamation-circle"></i>{{ errors.first('Consume Quantity') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Consume Weight</b></label>
                                        <input class="form-control mb-1" v-model="entity.consumeWeight" option-value="name" optionText="name" placeholder="Consume Weight" v-validate="'required'" name="Consume Weight"/>
                                        <small v-show="errors.has('Consume Weight')" class="help is-danger"><i v-show="errors.has('Consume Weight')" class="fa fa-exclamation-circle"></i>{{ errors.first('Consume Weight') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Consume Pieces</b></label>
                                        <input class="form-control mb-1" v-model="entity.consumePieces" option-value="name" optionText="name" placeholder="Consume Pieces" v-validate="'required'" name="Consume Pieces"/>
                                        <small v-show="errors.has('Consume Pieces')" class="help is-danger"><i v-show="errors.has('Consume Pieces')" class="fa fa-exclamation-circle"></i>{{ errors.first('Consume Pieces') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Consume USD</b></label>
                                        <input class="form-control mb-1" v-model="entity.consumeUSD" option-value="name" optionText="name" placeholder="Consume USD" v-validate="'required'" name="Consume USD"/>
                                        <small v-show="errors.has('Consume USD')" class="help is-danger"><i v-show="errors.has('Consume USD')" class="fa fa-exclamation-circle"></i>{{ errors.first('Consume USD') }} </small>
                                    </p>
                                </div>
                            </div>
                             <!--
                            <div class="text-center mt-3">
                                <div class=" button-tooltip">
                                    <span class="btn btn-blue btn-sm" @click="tabIndex++">
                                        <i class="fa fa-arrow-right"></i>
                                    </span>
                                    <span class="button-tooltiptext"> Next</span>
                                </div>
                            </div>
                            -->
                        </b-tab>
                        <!--
                        <b-tab title="Contacts" class="asset-form-panel">
                            <div class="row">
                                <div class="col-md-6 col-12 col-sm-6 mb-4">                                    
                                    <label><b>Branch Manager</b></label>
                                    <contact :ctype="'Bank'" @inputData="updateSnackbarInfo"/>
                                    <model-list-select class="form-control" :list="contactList" v-model="entity.branchmanageroid" option-value="oid" optionText="name" placeholder="Select a Branch Manager..."/>
                                </div>
                                <div class="col-md-6 col-12 col-sm-6">
                                    <contactData :ctitle="'Branch Manager'" :oid="entity.branchmanageroid"/>
                                    <hr>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-12 col-sm-6">                                        
                                    <label><b>Relationship Manager</b></label>
                                    <contact :ctype="'Bank'" @inputData="updateSnackbarInfo"/>
                                    <model-list-select class="form-control" :list="contactList" v-model="entity.relationshipmanageroid" option-value="oid" optionText="name" placeholder="Select a Relationship Manager..."/>
                                </div>
                                <div class="col-md-6 col-12 col-sm-6"> 
                                    <contactData :ctitle="'Relationship Manager'" :oid="entity.relationshipmanageroid"/>          
                                </div>
                            </div>
                            <div class="text-center mt-3">
                                <div class="button-tooltip">
                                    <span class="btn btn-blue btn-sm" @click="tabIndex--">
                                        <i class="fa fa-arrow-left"></i>
                                    </span>
                                    <span class="button-tooltiptext">Previous</span>
                                </div>
                            </div>
                        </b-tab>
                        -->
                    </b-tabs>
                </div>
            </div>   
            <div class="text-center mt-3">
                <button class="btn btn-success button-width ripple mr-3" @submit.prevent="generalprofilearticlesSaveUpdate()">
                    {{buttonText}}
                </button>
                <router-link tag="button" class="btn btn-danger button-width ripple" :to="{name:'GeneralProfileArticles'}" >
                    Cancel
                </router-link>
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
            generalprofileList:[],
            productList:[],
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
            this.getGeneralProfile();
            this.getProduct();
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getGeneralProfileArticles(this.$route.params.id)
            } else {                
                this.buttonText = "Save"
            }      
        },
        getGeneralProfileArticles(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.operation_generalprofilearticles_v1_get_by_oid, body);
            lumos_client.onPost(url.operation_generalprofilearticles_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier(this.entity);
                this.getGeneralProfile();
                this.getProduct();
            }).catch(error =>{
            });
        },
        getGeneralProfile(){
            let body = {};
            let req = constant.getRequest(url.master_generalprofile_v1_get_list, body);
            lumos_client.onPost(url.master_generalprofile_v1_get_list, req)
            .then(result => {
                this.generalprofileList = result['data']['body']['data'];
            }).catch(error => {
            });
        },
        getProduct(){
            let body = {};
            let req = constant.getRequest(url.master_product_v1_get_list, body);
            lumos_client.onPost(url.master_product_v1_get_list, req)
            .then(result => {
                this.productList = result['data']['body']['data'];
            }).catch(error => {
            });
        },
        generalprofilearticlesSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.operation_generalprofilearticles_v1_update;                
                } else {    
                    http_url = url.operation_generalprofilearticles_v1_save;
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
                        this.messageText = "General Profile Articles Updated Successfully";
                        setTimeout( () => this.$router.push({name:'GeneralProfileArticles'}), 3000);
                    } else {
                        this.messageText = "General Profile Articles Saved Successfully";
                        setTimeout( () => this.entity = {
                            branchmanageroid: "",
                            relationshipmanageroid: "",
                            type: "Issuing Product"
                        }, 2000 )
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
</style>
