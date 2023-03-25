<template>
    <div class="asset-form">
        <div class="loading" v-if="progressBar.loading"></div>
            <div class="container-fluid">
                <router-link :to="{ name: 'WarehouseLimit' }"  tag="span" class="button-tooltip pt-1 float-left">
                    <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
                <form class="form-group" @submit.prevent="warehouseLimitSaveUpdate()">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-6 col-xl-6">
                            <div class="warehouse-limit">
                                <div class="mt-1 ml-3 mr-3 mb-2">
                                    <div class="mb-3">
                                        <label class="required"> <b>Warehouse Name</b></label>
                                        <!-- <input class="form-control" placeholder="Warehouse Oid" v-model="entity.warehouseOid"  name="Warehouse Oid" v-validate="'required'" autocomplete="off">  -->
                                        <model-list-select class="form-control mb-1" :list="warehouseinfoList" v-model="entity.warehouseOid" option-value="oid" optionText="warehouseName" placeholder="Select Warehouse Name" v-validate="'required'" name="Warehouse Name"/>
                                        <small v-show="errors.has('Warehouse Name')" class="help is-danger"><i v-show="errors.has('Warehouse Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('Warehouse Name') }} </small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="required"> <b>Fiscal Year</b> ( Hints: 2021-2022 )</label>
                                        <input class="form-control mb-1" v-model="entity.fiscalYear" placeholder="Fiscal Year" v-validate="'required'" name="Fiscal Year"/>
                                        <small v-show="errors.has('Fiscal Year')" class="help is-danger"><i v-show="errors.has('Fiscal Year')" class="fa fa-exclamation-circle"></i>{{ errors.first('Fiscal Year') }} </small>        
                                    </div>
                                    <div class="mb-3">
                                        <label class="required"> <b>From Date</b></label>
                                        <datepicker placeholder="From Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.fromDate" v-validate="'required'" name="From Date"></datepicker>
                                        <small v-show="errors.has('From Date')" class="help is-danger"><i v-show="errors.has('From Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('From Date') }} </small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="required"> <b>To Date</b></label>
                                        <datepicker placeholder="To Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.toDate" v-validate="'required'" name="To Date"></datepicker>
                                        <small v-show="errors.has('To Date')" class="help is-danger"><i v-show="errors.has('To Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('To Date') }} </small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="required"> <b>Allocated Value</b></label>
                                        <input class="form-control mb-1" v-model="entity.allocateValue" placeholder="Allocated Value" v-validate="'required'"  name="Allocated Value"/>
                                        <small v-show="errors.has('Allocated Value')" class="help is-danger"><i v-show="errors.has('Allocated Value')" class="fa fa-exclamation-circle"></i>{{ errors.first('Allocated Value') }} </small>
                                    </div>
                                    <!-- <div class="mb-3">
                                        <label > <b>Consumed Value</b></label>
                                        <input class="form-control mb-1" v-model="entity.consumeValue" placeholder="Consumed Value"  name="Consumed Value"/>
                                        <small v-show="errors.has('Consumed Value')" class="help is-danger"><i v-show="errors.has('Consumed Value')" class="fa fa-exclamation-circle"></i>{{ errors.first('Consumed Value') }} </small>
                                    </div> -->
                                    <div class="mb-3">
                                        <label class="required"> <b>Status </b></label>
                                        <model-list-select class="form-control mb-1" :list="statusList" v-model="entity.status" option-value="name" optionText="name" placeholder="Select Status" v-validate="'required'" name="Status"/>
                                        <small v-show="errors.has('Status')" class="help is-danger"><i v-show="errors.has('Status')" class="fa fa-exclamation-circle"></i>{{ errors.first('Status') }} </small>
                                    </div>
                                    <div class="text-center mt-4">
                                        <button class="btn btn-success button-width ripple mr-3" @submit.prevent="warehouseLimitSaveUpdate()">
                                            {{buttonText}}
                                        </button>
                                        <router-link tag="button" class="btn btn-danger button-width ripple" :to="{name:'WarehouseLimit'}" >
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
            warehouseinfoList: [],
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
            //this.getContactList();
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getWarehouseLimit(this.$route.params.id)
            } else {
                this.buttonText = "Save"
            }
            this.getWarehouseList();      
        },
        getWarehouseLimit(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.master_warehouselimit_v1_get_by_oid, body);
            lumos_client.onPost(url.master_warehouselimit_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier(this.entity);
            }).catch(error =>{
            });
        },
        getWarehouseList(){
            let body = {};
            let req = constant.getRequest(url.master_warehouseinfo_v1_get_list, body);
            lumos_client.onPost(url.master_warehouseinfo_v1_get_list, req)
            .then(result => {
                this.warehouseinfoList = result['data']['body']['data'];           
            }).catch(error => {
            });
        },
        onKeydown (event) {
    	let char = String.fromCharCode(event.keyCode)
    	if (!/[0-9]/.test(char)) {
      	    event.preventDefault()
            }
        },
        warehouseLimitSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.master_warehouselimit_v1_update;                
                } else {    
                    http_url = url.master_warehouselimit_v1_save;
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
                        this.messageText = "WarehouseLimit Updated Successfully";
                        setTimeout( () => this.$router.push({name:'WarehouseLimit'}), 3000);
                    } else {
                        this.messageText = "WarehouseLimit Saved Successfully";
                        setTimeout( () => this.entity = {
                            //branchmanageroid: "",
                            //relationshipmanageroid: "",
                            type: "Issuing WarehouseLimit"
                        }, 2000 )
                    }
                }).catch(error => {
                    this.$log.error(error)
                })               
            }); 
        },
        modifier(entity){
            var obj = _.clone(entity);
            if(this.entity.fromDate){
                obj.fromDate = obj.fromDate.toISOString();
            }
            if(this.entity.toDate){
                obj.toDate = obj.toDate.toISOString();
            }
            return obj;
        },
        oidModifier(entity){
            if(this.entity.fromDate){
                this.entity.fromDate = new Date(this.entity.fromDate);
            }
            if(this.entity.toDate){
                this.entity.toDate = new Date(this.entity.toDate);
            }
        },
    }
}
</script>
<style scoped>
.warehouse-limit {
    background: white;
    padding: 10px 10px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.03);
    -webkit-box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%); 
    box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%);
}
</style>
