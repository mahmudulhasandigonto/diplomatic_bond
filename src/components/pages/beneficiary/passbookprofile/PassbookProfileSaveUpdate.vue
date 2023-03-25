<template>
<div class="asset-form">
    <div class="loading" v-if="progressBar.loading"></div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 d-inline-flex">
                    <router-link :to="{ name: 'PassbookProfile' }"  tag="span" class="button-tooltip pt-1 float-left">
                        <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                        <span class="button-tooltiptext">Back</span>
                    </router-link>
                </div>
            </div>
            <br>
            <form class="form-group" @submit.prevent="passbookProfileSaveUpdate()">
                <div class="row">
                    <div class="col-12">
                        <div class="update-passbookprofile">
                            <div class="mt-3">
                                <div class="row">
                                    <div class="scroll col-md-6" style="height: 500px; overflow-x: hidden;">
                                        <div class="ml-3">
                                            <div class="col-10">
                                                <!-- <div class="mb-3">
                                                    <label><b>User Type </b></label>
                                                    <input class="form-control" placeholder="User Type" v-model="entity.userType" name="User Type" autocomplete="off" v-validate="'required'" :disabled="this.entity.state >= 0">
                                                </div> -->
                                                <div class="mb-3">
                                                    <label><b>File Number</b></label>
                                                    <input class="form-control" placeholder="File Number" v-model="entity.fileNumber" autocomplete="off" :disabled="this.entity.state >= 0" name="File Number"> 
                                                </div>
                                                <div class="mb-3">
                                                    <label><b>File Date</b></label>
                                                    <datepicker placeholder="File Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="this.entity.state == 0" clear-button-icon="fa fa-times-circle" v-model="entity.fileDate" name="File Date" v-validate="'required'" :disabled="this.entity.state >= 0"></datepicker>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="required"> <b>Serial No.</b></label>
                                                    <input class="form-control" placeholder="Serial No." v-model="entity.slNo"  name="Serial No." v-validate="'required'" autocomplete="off" :readonly="checkState(this.entity.state)"> 
                                                    <small v-show="errors.has('Serial No.')" class="help is-danger"><i v-show="errors.has('Serial No.')" class="fa fa-exclamation-circle"></i>{{ errors.first('Serial No.') }} </small>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="required"> <b>Holder Name</b></label>
                                                    <input class="form-control" placeholder="Holder Name" v-model="entity.nameOfHolder"  name="Holder Name" v-validate="'required'" autocomplete="off" :readonly="checkState(this.entity.state)"> 
                                                    <small v-show="errors.has('Holder Name')" class="help is-danger"><i v-show="errors.has('Holder Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('Holder Name') }} </small>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="required"> <b>Issue Date</b></label>
                                                    <datepicker placeholder="Issue Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="this.entity.state <= 2" clear-button-icon="fa fa-times-circle" v-model="entity.issuedDate"  v-validate="'required'" name="Issue Date" :disabled="checkState(this.entity.state)"></datepicker>
                                                    <small v-show="errors.has('Issue Date')" class="help is-danger"><i v-show="errors.has('Issue Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('Issue Date') }} </small>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="required"> <b>Valid UpTo</b></label>
                                                    <datepicker  placeholder="valid UpTo" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="this.entity.state <= 2" clear-button-icon="fa fa-times-circle" v-model="entity.validUpTo"  v-validate="'required'" name="Valid UpTo" :disabled="checkState(this.entity.state)"></datepicker>
                                                    <small v-show="errors.has('Valid Upto')" class="help is-danger"><i v-show="errors.has('Valid Upto')" class="fa fa-exclamation-circle"></i>{{ errors.first('Valid Upto') }} </small>
                                                </div>
                                                <div class="mb-3">                                             
                                                    <label > <b>Holder Email Address</b></label>
                                                    <input class="form-control" placeholder="Holder Email Address" v-model="entity.holderEmailAddress"  name="Holder Email Address" autocomplete="off">
                                                   <!-- <small v-show="errors.has('Holder Email Address')" class="help is-danger"><i v-show="errors.has('Holder Email Address')" class="fa fa-exclamation-circle"></i>{{ errors.first('Holder Email Address') }} </small>-->
                                                </div>
                                                <div class="mb-3">
                                                    <label> <b>Holder Mobile Number</b></label>
                                                    <input class="form-control" placeholder="Holder Mobile Number" v-model="entity.holderMobileNumber"  name="Holder Mobile Number" autocomplete="off">
                                                   <!-- <small v-show="errors.has('Holder Mobile Number')" class="help is-danger"><i v-show="errors.has('Holder Mobile Number')" class="fa fa-exclamation-circle"></i>{{ errors.first('Holder Mobile Number') }} </small> -->
                                                </div>
                                                <div class="mb-3">
                                                    <label > <b>Passport No</b></label>
                                                    <input class="form-control" placeholder="Passport No" v-model="entity.passportNo"  name="Passport No" autocomplete="off">
                                                    <!-- <small v-show="errors.has('Passport No')" class="help is-danger"><i v-show="errors.has('Passport No')" class="fa fa-exclamation-circle"></i>{{ errors.first('Passport No') }} </small> -->
                                                </div>
                                                <div class="mb-3">
                                                    <label> <b>Old Passport No</b></label>
                                                    <input class="form-control" placeholder="Old Passport No." v-model="entity.oldPassportNo"  name="Old Passport No" autocomplete="off"> 
                                                </div>
                                                <div class="mb-3">
                                                    <label> <b>Holder Designation</b></label>
                                                    <input class="form-control" placeholder="Holder Designation" v-model="entity.designationOfHolder"  name="Holder Designation" autocomplete="off"> 
                                                </div>
                                                <div class="mb-3">
                                                    <label> <b>Date Of First Arrival</b></label>
                                                    <datepicker placeholder="Date Of First Arrival" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.dateOfFirstArrival"  name="Date Of First Arrival"></datepicker>
                                                </div>
                                                <!-- <div class="mb-3">
                                                    <label> <b>Issued By</b></label>
                                                    <input class="form-control" placeholder="Issued By" v-model="entity.issuedBy"  name="Issued By" autocomplete="off"> 
                                                </div> -->
                                                
                                                <div class="mb-3">
                                                    <label> <b>Revalidation Issued By</b></label>
                                                    <input  class="form-control" placeholder="Revalidation Issued By" v-model="entity.revalidationIssuedBy"  name="Revalidation Issued By" autocomplete="off"> 
                                                </div>
                                                <div class="mb-3">
                                                    <label> <b>Revalidation Issue Date</b></label>
                                                    <datepicker placeholder="Revalidation Issue Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.revalidationIssuedDate"  name="Revalidation Issue Date"></datepicker>
                                                </div>
                                                <div class="mb-3">
                                                    <label> <b>Revalidate UpTo</b></label>
                                                    <datepicker placeholder="Revalidate UpTo" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.revalidateUpTo"  name="Revalidate UpTo"></datepicker>
                                                </div>
                                                <div class="mb-3">
                                                    <label> <b>CBC Order No</b></label>
                                                    <input class="form-control" placeholder="CBC Order No" v-model="entity.cbcOrderNo"  name="CBC Order No" autocomplete="off"> 
                                                </div>
                                                <div class="mb-3">
                                                    <label> <b>CBC Order Date</b></label>
                                                    <datepicker placeholder="CBC Order Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.cbcOrderDate"  name="CBC Order Date"></datepicker>
                                                </div>
                                                <div class="mb-3">
                                                    <label> <b>Spouse Name</b></label>
                                                    <input class="form-control" placeholder="Spouse Name" v-model="entity.spouse"  name="Spouse Name" autocomplete="off"> 
                                                </div>
                                             <div class="mb-3">
                                                    <label> <b>Spouse Passport No</b></label>
                                                    <input class="form-control" placeholder="Spouse Passport No" v-model="entity.spousePassportNo"  name="Spouse Passport No" autocomplete="off"> 
                                                </div>
                                                <div class="mb-3">
                                                    <label> <b>Sponsor Name</b></label>
                                                    <input class="form-control" placeholder="Sponsor Name" v-model="entity.nameOfSponsor"  name="Sponsor Name" autocomplete="off"> 
                                                </div>
                                                <div class="mb-3">
                                                    <label> <b>Sponsor Passport No</b></label>
                                                    <input class="form-control" placeholder="Sponsor Passport No" v-model="entity.sponsorPassport"  name="Sponsor Passport No" autocomplete="off"> 
                                                </div>
                                                <input type="text" v-show="false" v-model="entity.status">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12 col-sm-6">
                                        <div v-if= "pdfShow">
                                            <embed :src="abc" width="600" height="500" type="application/pdf" />                         
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                

                <div class="text-center mt-4">
                    <!-- button-width -->
                    <button class="btn btn-primary ripple mr-2" v-on:click.prevent='getDownload()'> 
                        Download File <i class="fa fa-download"></i>
                    </button>
                    <button class="btn btn-success ripple mr-2" @submit.prevent="passbookProfileSaveUpdate()">
                        {{buttonText}}
                    </button>
                    <!-- <button class="btn btn-success ripple mr-2" @click="entity.state = 2" @submit.prevent="passbookProfileSaveUpdate()">
                        Submit
                    </button> -->
                    <router-link tag="button" class="btn btn-danger button-width ripple" :to="{name:'PassbookProfile'}" >
                        Cancel
                    </router-link>
                </div>   
            </form>

        <!-- <div v-if="this.entity.filePath">
            <button class="btn btn-primary" @click='getDownload()'> Download File<i class="fa fa-download"></i></button>
        </div>  -->
            
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
// import {pdfobject} from "@/js/pdfobject";
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import { ModelListSelect} from 'vue-search-select';
import contact from '@/components/Contact.vue';
import contactData from '@/components/ContactData.vue';
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker";
import * as _ from 'underscore';
import axios from 'axios';
import { saveAs } from 'file-saver';


export default {
    components: {
        ModelListSelect, Datepicker, contact, contactData
    },
    data(){
        return{
            entity:{
               state: 1,
               status: "Active"
               // type: ""
            },
            contactList:[],
            typeList:[],
            buttonText:'',
            statusList:[
                { name : "Active" }, 
                { name : "Inactive" }
            ],
            userTypeList:[
                { name : "Passbook" }
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
            pdfShow: false,
            abc: "",
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
        },
        init(){
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getPassbookProfile(this.$route.params.id)
            } else {
                this.buttonText = "Save"
            }      
        },
        onKeydown (event) {
    	    let char = String.fromCharCode(event.keyCode)
    	    if (!/[0-9]/.test(char)) {
      	        event.preventDefault()
            }
        },
        checkState(state){
            if(state === 3){
                return true;
            }
            else{
                return false;
            }
        },
        getDownload() {
            this.progressBar.loading = true;
            this.progressBar.show = true;
                axios.get(url.baseUrl+url.master_document_v1_download+ this.entity.filePath, {
                    responseType: 'blob',
                }).then(response => {
                    this.progressBar.loading = false;
                    let fileName = this.entity.fileNumber + '.pdf';
                    saveAs(response.data, fileName)
                }).catch(error =>{
                    console.log(error)
                })

        },
        getPassbookProfile(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.master_generalprofile_v1_get_by_oid, body);
            lumos_client.onPost(url.master_generalprofile_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                if(this.entity.filePath){
                    this.abc = url.baseUrl+url.master_generalprofile_document_v1_download+ this.entity.filePath;                
                    this.pdfShow = true;     
                }           
                this.oidModifier(this.entity);
            }).catch(error =>{
            });
        },
        passbookProfileSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.entity.slNo = this.entity.slNo.replace(/\s/g, '');
                this.progressBar.loading = true;
                this.progressBar.show = true;
                if(this.entity.state === 1){
                    this.entity.state = 2;
                }
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.master_generalprofile_v1_update;                
                } else {    
                    http_url = url.master_generalprofile_v1_save;
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
                        this.entity.state = 1;
                        return;
                    }
                    this.color = "success"; 
                    if(this.$route.params.id){
                        this.messageText = "PassbookProfile Updated Successfully";
                        setTimeout( () => this.$router.push({name:'PassbookProfile'}), 3000);
                    } else {
                        this.messageText = "Passbook Profile Saved Successfully";
                        setTimeout( () => this.entity = {
                        }, 2000 )
                    }
                }).catch(error => {
                    this.$log.error(error)
                })               
            }); 
        },
        modifier(entity){
            var obj = _.clone(entity);
            if(this.entity.fileDate){
                obj.fileDate = obj.fileDate.toISOString();
            }
            if(this.entity.letterDate){
                obj.letterDate = obj.letterDate.toISOString();
            }
            if(this.entity.cbcOrderDate){
                obj.cbcOrderDate = obj.cbcOrderDate.toISOString();
            }
            if(this.entity.dateOfLastArrival){
                obj.dateOfLastArrival = obj.dateOfLastArrival.toISOString();
            }
            if(this.entity.dateOfFirstArrival){
                obj.dateOfFirstArrival = obj.dateOfFirstArrival.toISOString();
            }
            if(this.entity.issuedDate){
                obj.issuedDate = obj.issuedDate.toISOString();
            }
            if(this.entity.validUpTo){
                obj.validUpTo = obj.validUpTo.toISOString();
            }
            if(this.entity.revalidateUpTo){
                obj.revalidateUpTo = obj.revalidateUpTo.toISOString();
            }
            if(this.entity.revalidationIssuedDate){
                obj.revalidationIssuedDate = obj.revalidationIssuedDate.toISOString();
            }
            return obj;
        },
        oidModifier(entity){
            if(this.entity.fileDate){
                this.entity.fileDate = new Date(this.entity.fileDate);
            }
            if(this.entity.letterDate){
                this.entity.letterDate = new Date(this.entity.letterDate);
            }
            if(this.entity.cbcOrderDate){
                this.entity.cbcOrderDate = new Date(this.entity.cbcOrderDate);
            }
            if(this.entity.dateOfLastArrival){
                this.entity.dateOfLastArrival = new Date(this.entity.dateOfLastArrival);
            }
            if(this.entity.dateOfFirstArrival){
                this.entity.dateOfFirstArrival = new Date(this.entity.dateOfFirstArrival);
            }
            if(this.entity.issuedDate){
                this.entity.issuedDate = new Date(this.entity.issuedDate);
            }
            if(this.entity.validUpTo){
                this.entity.validUpTo = new Date(this.entity.validUpTo);
            }
            if(this.entity.revalidateUpTo){
                this.entity.revalidateUpTo = new Date(this.entity.revalidateUpTo);
            }
            if(this.entity.revalidationIssuedDate){
                this.entity.revalidationIssuedDate = new Date(this.entity.revalidationIssuedDate);
            }
            if(this.entity.createdOn){
                this.entity.createdOn = new Date(this.entity.createdOn);
            }
            if(this.entity.updatedOn){
                this.entity.updatedOn = new Date(this.entity.updatedOn);
            }
        },
    }
}
</script>

<style scoped>
.update-passbookprofile {
    background: white;
    padding: 10px 10px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.03);
    -webkit-box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%); 
    box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%);
}
#overlap {
  overflow-y: visible;
  overflow-x: visible;
}
#ui-datepicker-div{
    z-index: 9999 !important;
}
</style>
