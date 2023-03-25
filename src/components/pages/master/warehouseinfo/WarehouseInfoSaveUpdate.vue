<template>
<div class="asset-form">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="container-fluid">
        <router-link :to="{ name: 'WarehouseInfo' }"  tag="span" class="button-tooltip pt-1 float-left">
            <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                <span class="button-tooltiptext">Back</span>
        </router-link>
        <form class="form-group" @submit.prevent="warehouseinfoSaveUpdate()">
            <div class="row">
                <div class="col-12">
                    <b-tabs v-model="tabIndex" ref="wizard">
                        <b-tab title="General" class="asset-form-panel">
                            <div class="row">
                               <div class="col-md-6 col-12 col-sm-6" active>
                                    <p>
                                        <label class="required"> <b>Warehouse Number</b></label>
                                        <input class="form-control" placeholder="Warehouse No" v-model="entity.warehouseNo"  name="Warehouse Number" v-validate="'required'" autocomplete="off"> 
                                        <small v-show="errors.has('Warehouse Number')" class="help is-danger"><i v-show="errors.has('Warehouse Number')" class="fa fa-exclamation-circle"></i>{{ errors.first('Warehouse Number') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Warehouse Name</b></label>
                                        <input class="form-control mb-1" v-model="entity.warehouseName" option-value="name" optionText="name" placeholder="Warehouse Name" v-validate="'required'" name="Warehouse Name"/>
                                        <small v-show="errors.has('Warehouse Name')" class="help is-danger"><i v-show="errors.has('Warehouse Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('Warehouse Name') }} </small>
                                   </p>
                                    <p>
                                        <label class="required"> <b>Ref. License No</b></label>
                                        <input class="form-control mb-1" v-model="entity.refLicenseNo" option-value="name" optionText="name" placeholder="Ref. License No" v-validate="'required'" name="Ref. License Number"/>
                                        <small v-show="errors.has('Ref. License Number')" class="help is-danger"><i v-show="errors.has('Ref. License Number')" class="fa fa-exclamation-circle"></i>{{ errors.first('Ref. License Number') }} </small>        
                                   </p>
                                   <p>
                                        <label class="required"> <b>Ref. License Date</b></label>
                                        <datepicker placeholder="Ref. License Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.refLicenseDate" v-validate="'required'" name="Ref. License Date"></datepicker>
                                        <small v-show="errors.has('Ref. License Date')" class="help is-danger"><i v-show="errors.has('Ref. License Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('Ref. License Date') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>Issue Date</b></label>
                                        <datepicker placeholder="Issue Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.issueDate" v-validate="'required'" name="Issue Date"></datepicker>
                                        <small v-show="errors.has('Issue Date')" class="help is-danger"><i v-show="errors.has('Issue Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('Issue Date') }} </small>
                                    </p>                                 
                               </div>
                               <div class="col-md-6 col-12 col-sm-6" active>
                                    <p>
                                        <label class="required"> <b>TIN</b></label>
                                        <input class="form-control mb-1" v-model="entity.tin"  option-value="name" optionText="name" placeholder="TIN" v-validate="'required'"  name="TIN"/>
                                        <small v-show="errors.has('TIN')" class="help is-danger"><i v-show="errors.has('TIN')" class="fa fa-exclamation-circle"></i>{{ errors.first('TIN') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>TIN Date</b></label>
                                        <datepicker placeholder="TIN Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-validate="'required'" v-model="entity.tinDate"  name="TIN Date"></datepicker>
                                        <small v-show="errors.has('TIN Date')" class="help is-danger"><i v-show="errors.has('TIN Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('TIN Date') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>BIN</b></label>
                                        <input class="form-control mb-1" v-model="entity.bin" option-value="name" optionText="name" placeholder="BIN" v-validate="'required'" name="BIN"/>
                                        <small v-show="errors.has('BIN')" class="help is-danger"><i v-show="errors.has('BIN')" class="fa fa-exclamation-circle"></i>{{ errors.first('BIN') }} </small>
                                    </p>
                                    <p>
                                        <label class="required"> <b>BIN Date</b></label>
                                        <datepicker placeholder="BIN Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-validate="'required'" v-model="entity.binDate"  name="BIN Date"></datepicker>
                                        <small v-show="errors.has('BIN Date')" class="help is-danger"><i v-show="errors.has('BIN Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('BIN Date') }} </small>
                                    </p>
                                    <!-- <p>
                                        <label class="required"> <b>Status </b></label>
                                        <model-list-select class="form-control mb-1" :list="statusList" v-model="entity.status" option-value="name" optionText="name" placeholder="Select Status" v-validate="'required'" name="Status"/>
                                   </p> -->
                               </div>
                                <div class="col-md-6 col-12 col-sm-6">
                                    <p></p>
                                </div>
                            </div>
                             <!--  -->
                            <div class="text-center mt-3">
                                <div class=" button-tooltip">
                                    <span class="btn btn-green btn-sm" style="background-image: linear-gradient(to right, #55b300, #479401, #387501, #2a5802, #1d3d00); border: none;" @click="tabIndex++">
                                        <i class="fa fa-arrow-right" ></i>
                                    </span>
                                    <span class="button-tooltiptext"> Next</span>
                                </div>
                            </div>
                            <!--  -->
                        </b-tab>
                        <!--  -->
                        <b-tab title="Factory" class="asset-form-panel">
                            <div class="row">
                                <div class="col-md-6 col-12 col-sm-6 mb-4"> 
                                    <p>
                                        <label> <b>Office Address</b></label>
                                        <input class="form-control mb-1" v-model="entity.officeAddress" option-value="name" optionText="name" placeholder="Office Address" name="Office Address"/>
                                    </p>
                                    <p>
                                        <label> <b>Office Phone No</b></label>
                                        <input class="form-control mb-1" v-model="entity.officePhoneNo" option-value="name" optionText="name" placeholder="Office Phone No" name="Office Phone No"/>
                                   </p>
                                    <p>
                                        <label> <b>Office Email</b></label>
                                        <input class="form-control mb-1" v-model="entity.officeEmail" option-value="name" optionText="name" placeholder="Office Email" name="Office Email"/>
                                   </p>                                   
                                    <p>
                                        <label> <b>Factory Address</b></label>
                                        <input class="form-control mb-1" v-model="entity.factoryAddress" option-value="name" optionText="name" placeholder="Factory Address" name="Factory Address"/>
                                   </p>
                                     
                                </div>
                                <div class="col-md-6 col-12 col-sm-6 mb-4">
                                    <p>
                                        <label> <b>Factory Phone No</b></label>
                                        <input class="form-control mb-1" v-model="entity.factoryPhoneNo" option-value="name" optionText="name" placeholder="Factory Phone No" name="Factory Phone No"/>
                                    </p>
                                    <p>
                                        <label> <b>Factory Email</b></label>
                                        <input class="form-control mb-1" v-model="entity.factoryEmail" option-value="name" optionText="name" placeholder="Factory Email" name="Factory Email"/>
                                    </p>
                                    <p>
                                        <label> <b>Proprietor Name</b></label>
                                        <input class="form-control mb-1" v-model="entity.proprieterName" option-value="name" optionText="name" placeholder="Proprietor Name" name="Proprieter Name"/>
                                    </p> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-12 col-sm-6">    
                                 </div>                                
                            </div>
                            <div class="text-center mt-1">
                                <div class="button-tooltip">
                                    <span class="btn btn-blue btn-sm" style="background-image: linear-gradient(to left, #55b300, #479401, #387501, #2a5802, #1d3d00); border:none;" @click="tabIndex--">
                                        <i class="fa fa-arrow-left"></i>
                                    </span>
                                    <span class="button-tooltiptext">Previous</span>
                                </div>
                            </div>
                        </b-tab>
                        <!--  -->
                    </b-tabs>
                </div>
            </div>   
            <div class="text-center mt-4">
                <button class="btn btn-success button-width ripple mr-3" @submit.prevent="warehouseinfoSaveUpdate()">
                    {{buttonText}}
                </button>
                <router-link tag="button" class="btn btn-danger button-width ripple" :to="{name:'WarehouseInfo'}" >
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
                this.getWarehouseInfo(this.$route.params.id)
            } else {
                this.buttonText = "Save"
            }      
        },
        getWarehouseInfo(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.master_warehouseinfo_v1_get_by_oid, body);
            lumos_client.onPost(url.master_warehouseinfo_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier(this.entity);
            }).catch(error =>{
            });
        },
        onKeydown (event) {
    	let char = String.fromCharCode(event.keyCode)
    	if (!/[0-9]/.test(char)) {
      	    event.preventDefault()
            }
        },
        warehouseinfoSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.master_warehouseinfo_v1_update;                
                } else {    
                    http_url = url.master_warehouseinfo_v1_save;
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
                        this.messageText = "WarehouseInfo Updated Successfully";
                        setTimeout( () => this.$router.push({name:'WarehouseInfo'}), 3000);
                    } else {
                        this.messageText = "WarehouseInfo Saved Successfully";
                        setTimeout( () => this.entity = {
                            //branchmanageroid: "",
                            //relationshipmanageroid: "",
                            type: "Issuing WarehouseInfo"
                        }, 2000 )
                    }
                }).catch(error => {
                    this.$log.error(error)
                })               
            }); 
        },
        modifier(entity){
            var obj = _.clone(entity);
            if(this.entity.issueDate){
                obj.issueDate = obj.issueDate.toISOString();
            }
            if(this.entity.refLicenseDate){
                obj.refLicenseDate = obj.refLicenseDate.toISOString();
            }
            if(this.entity.tinDate){
                obj.tinDate = obj.tinDate.toISOString();
            }
            if(this.entity.binDate){
                obj.binDate = obj.binDate.toISOString();
            }
            return obj;
        },
        oidModifier(entity){
            if(this.entity.issueDate){
                this.entity.issueDate = new Date(this.entity.issueDate);
            }
            if(this.entity.refLicenseDate){
                this.entity.refLicenseDate = new Date(this.entity.refLicenseDate);
            }
            if(this.entity.tinDate){
                this.entity.tinDate = new Date(this.entity.tinDate);
            }
            if(this.entity.binDate){
                this.entity.binDate = new Date(this.entity.binDate);
            }
        },
    }
}
</script>
<style scoped>
</style>
