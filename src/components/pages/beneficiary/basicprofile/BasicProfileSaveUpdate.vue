<template>
    <div class="asset-form">
        <div class="loading" v-if="progressBar.loading"></div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 d-inline-flex">
                       <!-- <router-link :to="{ name: 'BasicProfile' }"  tag="span" class="button-tooltip float-left">
                            <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                            <span class="button-tooltiptext">Back</span>
                        </router-link>-->
                    </div>
                </div>
            <br>
            <br>
            <form class="form-group" @submit.prevent="basicprofileSaveUpdate()">

                <!-- Exemption form for FM User -->
                <div class="row" v-if="this.entity.userType=='Exemption' && this.showDetails">
                    <div class="col-12">
                        <b-tabs v-model="tabIndex" ref="wizard">
                            <b-tab title="Exemption Certificate" class="asset-form-panel">
                                <div class="row">
                                    <div class="col-md-6 col-12 col-sm-6" active>
                                        <!-- <p>
                                            <label class="required"><b>User Type</b></label>
                                            <input class="form-control" placeholder="User Type" v-model="entity.userType" name="User Type" autocomplete="off" v-validate="'required'" :disabled="this.entity.state >= 0"> 
                                            <small v-show="errors.has('User Type')" class="help is-danger"><i v-show="errors.has('User Type')" class="fa fa-exclamation-circle"></i>{{ errors.first('User Type') }} </small>
                                        </p> -->
                                        <!-- <p>
                                            <label class="required"><b>File Number</b></label>
                                            <input class="form-control" placeholder="File Number" v-model="entity.fileNumber" name="File Number" autocomplete="off" v-validate="'required'" :readonly="checkState(this.entity.state)"> 
                                            <small v-show="errors.has('File Number')" class="help is-danger"><i v-show="errors.has('File Number')" class="fa fa-exclamation-circle"></i>{{ errors.first('File Number') }} </small>
                                        </p> -->
                                        <p>
                                            <label class="required"><b>File Date</b></label>
                                            <datepicker placeholder="File Date" name="File Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-validate="'required'" v-model="entity.fileDate" :disabled="checkFMState(this.entity.state)"></datepicker>
                                            <small v-show="errors.has('File Date')" class="help is-danger"><i v-show="errors.has('File Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('File Date') }} </small>
                                        </p>
                                        <p>
                                            <label class="required"> <b>File No.</b></label>
                                            <input class="form-control" placeholder="File No." v-model="entity.fileNumber" name="File No." v-validate="'required'" autocomplete="off" :disabled="checkFMState(this.entity.state)"> 
                                            <small v-show="errors.has('File No.')" class="help is-danger"><i v-show="errors.has('File No.')" class="fa fa-exclamation-circle"></i>{{ errors.first('File No.') }} </small>
                                        </p>
                                        <div>
                                            <label for="Honorary Consulate"><b>Honorary Consulate</b></label>
                                            <br>
                                                <input type="checkbox" class="mr-3" id="honourierConsultant" value="Honourier Consultant" v-model="honourierConsultant" @change="filterHonourierConsult(honourierConsultant)">
                                                <label for="honourierConsultant" class="mr-3">Honorary Consulate</label>                    
                                        </div>
                                        <p>
                                            <label class="required"> <b>Embassy Name / Office Name</b></label>
                                            <model-list-select class="form-control mb-1" placeholder="Select Embassy Name / Office Name" :list="embassyList"  v-model="entity.nameOfEmbassy" option-value="embassyOid" optionText="embassyName" v-validate="'required'" name="Embassy" :disabled="checkFMState(this.entity.state)"/>
                                            <small v-show="errors.has('Embassy')" class="help is-danger"><i v-show="errors.has('Embassy')" class="fa fa-exclamation-circle"></i>{{ errors.first('Embassy') }} </small>
                                        </p>
                                       
                                        <P v-if="this.entity.nameOfEmbassy=='Other' || this.entity.nameOfEmbassy=='other'">
                                            <label> <b>Embassy Name / Office Name</b></label>
                                            <input class="form-control" placeholder="Embassy Name" v-model="entity.otherEmbassy"  name="Embassy Name" autocomplete="off">
                                        </P>
                
                                        
                                        
                                    </div>
                                    <div class="col-md-6 col-12 col-sm-6" active>
                                        
                                        <P>
                                            <div class="row">
                                                <div class="col-md-10">
                                                    <label class="required"> <b>Passport No.</b></label>
                                                    <input class="form-control" placeholder="Passport No." v-model="entity.passportNo" name="Passport No" :disabled="checkFMState(this.entity.state)">
                                                    <small v-show="errors.has('Passport No')" class="help is-danger"><i v-show="errors.has('Passport No')" class="fa fa-exclamation-circle"></i>{{ errors.first('Holder Name') }} </small>
                                                </div>
                                                <div class="col-md-2 d-flex align-items-end" style="padding-bottom:5px;">
                                                    <button class="btn button-width ripple btn-sm btn-outline-success" @click.prevent="getInfoByPassport(entity.passportNo)">
                                                        <i class="fa fa-eye"></i>
                                                            Check
                                                    </button>
                                                </div>
                                            </div>
                                        </P>
                                        
                                        <P>
                                            <label class="required"> <b>Holder Name</b></label>
                                            <input class="form-control" placeholder="Holder Name" v-model="entity.nameOfHolder" v-validate="'required'" name="Holder Name" autocomplete="off" :disabled="checkFMState(this.entity.state)"> 
                                            <small v-show="errors.has('Holder Name')" class="help is-danger"><i v-show="errors.has('Holder Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('Holder Name') }} </small>
                                        </P>
                                        <P>
                                            <label class="required"> <b> Upload Applicant Signature</b><span v-if="checkUserSignature()"> (Current file: {{userSignature}})</span></label>
                                            <input type="file" color="green" name="Applicant Signature" id="file" class="form-control-file mb-1 inputfile"  accept="image/*" ref="file" v-on:change="signatureUpload($event)" :disabled="checkFMState(this.entity.state)">                                    
                                            <v-progress-linear v-model="applicantUploadProgress.progress" v-show="applicantUploadProgress.show" height="5" color="green"> </v-progress-linear>
                                            <small v-show="errors.has('Applicant Signature')" class="help is-danger"><i v-show="errors.has('Applicant Signature')" class="fa fa-exclamation-circle"></i>{{ errors.first('Applicant Signature') }} </small>
                                        </P>
                                        <P>
                                            <label class="required"> <b> Upload Mission / Embassy Head Signature</b><span v-if="checkMissionSignature()"> (Current file: {{missionSignature}})</span></label>
                                            <input type="file" color="green" name="Mission Signature" id="file" class="form-control-file mb-1 inputfile"  accept="image/*" ref="file" v-on:change="missionSignatureUpload($event)" :disabled="checkFMState(this.entity.state)">                                    
                                            <v-progress-linear v-model="missionUploadProgress.progress" v-show="missionUploadProgress.show" height="5" color="green"> </v-progress-linear>
                                            <small v-show="errors.has('Mission Signature')" class="help is-danger"><i v-show="errors.has('Mission Signature')" class="fa fa-exclamation-circle"></i>{{ errors.first('Mission Signature') }} </small>
                                        </P>
                                        <P>
                                            <label > <b> Upload File</b></label>
                                            <input type="file" color="green" name="File Upload" id="file" class="form-control-file mb-1 inputfile"  accept="pdf/*" ref="file" v-on:change="fileUpload($event)" :disabled="checkFMState(this.entity.state)">                                    
                                            <v-progress-linear v-model="uploadProgress.progress" v-show="uploadProgress.show" height="5" color="green"> </v-progress-linear>
                                        </P>
                                        
                                        
                                        
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
                            <b-tab title="Exemption Certificate Details" class="asset-form-panel">
                                <div class="row">
                                    <div class="col-md-6 col-12 col-sm-6 mb-4">
                                        <P>
                                            <label> <b>Email Address (Holder / Representative of Holder)</b></label>
                                            <input class="form-control" placeholder="Holder Email Address" v-model="entity.holderEmailAddress"  name="Holder Email Address" autocomplete="off">
                                            <!--<small v-show="errors.has('Holder Email Address')" class="help is-danger"><i v-show="errors.has('Holder Email Address')" class="fa fa-exclamation-circle"></i>{{ errors.first('Holder Email Address') }} </small>-->
                                        </P>
                                        <P>
                                            <label > <b>Mobile Number (Holder / Representative of Holder)</b></label>
                                            <input class="form-control" placeholder="Holder Mobile Number" v-model="entity.holderMobileNumber"  name="Holder Mobile Number"  autocomplete="off">
                                           <!-- <small v-show="errors.has('Holder Mobile Number')" class="help is-danger"><i v-show="errors.has('Holder Mobile Number')" class="fa fa-exclamation-circle"></i>{{ errors.first('Holder Mobile Number') }} </small>-->
                                        </P>
                                        <p>
                                            <label class="required"> <b>Holder Designation</b></label>
                                            <model-list-select class="form-control mb-1" placeholder="Holder Designation" :list="designationList"  v-model="entity.designationOfHolder" option-value="oid" optionText="name" v-validate="'required'" name="Holder Designation"/>
                                            <small v-show="errors.has('Holder Designation')" class="help is-danger"><i v-show="errors.has('Holder Designation')" class="fa fa-exclamation-circle"></i>{{ errors.first('Holder Designation') }} </small>
                                        </p>
                                        <P v-if="this.entity.designationOfHolder=='Other'">
                                            <label> <b> Designation</b></label>
                                            <input class="form-control" placeholder="Designation" v-model="entity.otherDesignation"  name="Designation" v-validate="'required'" autocomplete="off">
                                            <small v-show="errors.has('Designation')" class="help is-danger"><i v-show="errors.has('Designation')" class="fa fa-exclamation-circle"></i>{{ errors.first('Designation') }} </small>
                                        </P>
                                        <P>
                                            <label> <b>Date Of First Arrival</b></label>
                                            <datepicker placeholder="Date Of First Arrival" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.dateOfFirstArrival"  name="Date Of First Arrival"></datepicker>
                                        </P>
                                        
                                        <!-- <P>
                                            <label> <b>Embassy Name / Office Name</b></label>
                                            <input class="form-control" placeholder="Embassy Name / Office Name" v-model="entity.nameOfEmbassy"  name="Embassy Name" autocomplete="off">
                                        </P> -->
                                         <!-- <p>
                                            <label class="required"> <b>Holder Designation</b></label>
                                            <model-list-select class="form-control mb-1" placeholder="Holder Designation" :list="designationList"  v-model="entity.designationOfHolder" option-value="name" optionText="name" v-validate="'required'" name="Holder Designation"/>
                                            <small v-show="errors.has('Holder Designation')" class="help is-danger"><i v-show="errors.has('Holder Designation')" class="fa fa-exclamation-circle"></i>{{ errors.first('Holder Designation') }} </small>
                                        </p> -->
                                    
                                        <P>
                                            <label> <b>Occasion</b></label>
                                            <input class="form-control" placeholder="Occasion" v-model="entity.occasion"  name="Occasion" autocomplete="off">
                                        </P> 
                                        <!-- <P>
                                            <label> <b>Issued By</b></label>
                                            <input class="form-control" placeholder="Issued By" v-model="entity.issuedBy"  name="Issued By" autocomplete="off"> 
                                        </P> -->
                                        
                                    </div>
                                    <div class="col-md-6 col-12 col-sm-6 mb-4">
                                        <div>
                                            <!-- <p> -->
                                            <label for="Marital Status"><b>Marital Status</b></label>
                                            <!-- </p> -->
                                            <br>
                                            <!-- <p> -->
                                                <input type="checkbox" class="mr-3" id="married" value="Married" v-model="married">
                                                <label for="married" class="mr-3">Married</label>
                                                <!--<input type="checkbox" id="single" value="Single" v-model="single">-->
                                                <!--<label for="single">Single</label>-->
                                            <!-- </p> -->
                                        </div>

                                        <P v-if="married==true">
                                            <label> <b>Spouse Name</b></label>
                                            <input class="form-control" placeholder="Spouse Name" v-model="entity.spouse"  name="Spouse Name" autocomplete="off">
                                        </P>
                                        <P v-if="married==true">
                                            <label> <b>Spouse Passport No</b></label>
                                            <input class="form-control" placeholder="Spouse Passport No" v-model="entity.spousePassportNo"  name="Spouse Passport No" autocomplete="off">
                                        </P>
                                        <P>
                                            <label> <b>Sponsor Name</b></label>
                                            <input class="form-control" placeholder="Sponsor Name" v-model="entity.nameOfSponsor"  name="Sponsor Name" autocomplete="off">
                                        </P>
                                        <P>
                                            <label> <b>Sponsor Passport No</b></label>
                                            <input class="form-control" placeholder="Sponsor Passport No" v-model="entity.sponsorPassport"  name="Sponsor Passport No" autocomplete="off">
                                        </P>
                                        
                                        <input type="text" v-show="false" v-model="entity.status" v-if="this.entity.userType=='Exemption'">
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
                        </b-tabs>
                    </div>
                    <div class="col-12">
                        <div class="text-center mt-3">
                            <button v-if="this.entity.filePath && this.entity.oid" class="btn btn-primary ripple mr-2" v-on:click.prevent='getDownload()'> 
                                Download File <i class="fa fa-download"></i>
                            </button>
                            <button class="btn btn-primary ripple mr-3" @submit.prevent="basicprofileSaveUpdate()" id="save" v-on:click="select($event)">
                                {{buttonText}}
                            </button>
                          
                        </div>
                    </div>
                </div>

                <!-- Passbook form for NBR User -->
                <div class="row justify-content-center" v-if="this.entity.userType=='Passbook'">
                    <div class="col-12 col-md-6 col-xl-6 ">
                        <div class="new-basicprofile-info">
                            <div class="mt-3 ml-3 mr-3 mb-3">                                
                                <div class="mb-3">
                                    <label class="required"><b>File Number</b></label>
                                    <input class="form-control" placeholder="File Number" v-model="entity.fileNumber" name="File Number" autocomplete="off" v-validate="'required'" :readonly="checkState(this.entity.state)"> 
                                    <small v-show="errors.has('File Number')" class="help is-danger"><i v-show="errors.has('File Number')" class="fa fa-exclamation-circle"></i>{{ errors.first('File Number') }} </small>
                                </div>
                                <div class="mb-3">
                                    <label class="required"><b>File Date</b></label>
                                    <datepicker placeholder="File Date" name="File Date" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-validate="'required'" v-model="entity.fileDate" :disabled="checkState(this.entity.state)"></datepicker>
                                    <small v-show="errors.has('File Date')" class="help is-danger"><i v-show="errors.has('File Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('File Date') }} </small>
                                </div>
                                <div class="mb-3">
                                    <label class="required" > <b> Upload File</b></label>
                                    <input type="file" color="green" name="File Upload" id="file" class="form-control-file mb-1 inputfile"  accept="pdf/*" ref="file" v-on:change="fileUpload($event)">
                                    <!-- <label for="file" class="ripple"> <i class="fa fa-upload"></i> Choose a file</label> -->
                                    <v-progress-linear v-model="uploadProgress.progress" v-show="uploadProgress.show" height="5" color="green"> </v-progress-linear>
                                    <small v-show="errors.has('File Upload')" class="help is-danger"><i v-show="errors.has('File Upload')" class="fa fa-exclamation-circle"></i>{{ errors.first('File Upload') }} </small>
                                </div>
                                
                            
                                <div class="text-center mt-4">
                                  
                                    <button v-if="this.entity.filePath && this.entity.oid" class="btn btn-primary ripple mr-2" v-on:click.prevent='getDownload()'> 
                                        Download File <i class="fa fa-download"></i>
                                    </button>
                                    <button class="btn btn-primary ripple mr-3" @submit.prevent="basicprofileSaveUpdate()" id="save" v-on:click="select($event)">
                                        {{buttonText}}
                                    </button>
                                   
                                    <button class="btn btn-success ripple mr-3" @submit.prevent="basicprofileSaveUpdate()" id="send" v-on:click="select($event)">
                                        Submit To Bond
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>    
            </form>              
        </div>

        <v-app>
            <v-dialog  max-width="400" >
                <v-card>                                    
                    <v-card-text>
                        <h5>Are you sure, You want to Send to</h5>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat="flat" @click.native="basicprofileSaveUpdate()">
                                Yes
                            </v-btn>
                            <v-btn color="red darken-1" flat="flat">
                                No
                            </v-btn>
                    </v-card-actions>
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
import { saveAs } from 'file-saver';
import axios from 'axios';
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
                state: 0,
                status: "Active",
                userType:"",
                passportNo:"",
                honourierType:"",
                otherEmbassy:"",
                               
            },
            honourierConsultant: false,
            // otherEmbassy: false,
            married:false,
            userSignature:"",
            missionSignature:"",
            single: false,
            showDetails:true,
            buttonId:"",
            designationList:[],
            embassyAllList:[],
            embassyList:[],
            contactList:[],
            quarterList:[],
            typeList:[],
            buttonText:'',
            statusList:[
                { name : "Active" }, 
                { name : "Inactive" }
            ],
            userTypeList:[
                // { name : "Passbook" }, 
                // { name : "Exemption" }
            ],
            applicantUploadProgress:{
                progress:"",
                show:""
            },
            missionUploadProgress:{
                progress:"",
                show:""
            },
            uploadProgress:{
                progress:"",
                show:""
            },
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
            downloadButtonShow: "",
            // SendToBondConfirmationModel: false,
            timeout: 2000,
            messageText: "",
            tabIndex: 0
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        checkUserSignature(){
            if(this.userSignature.length>0){
                return true;
            };
        },
        checkMissionSignature(){
            if(this.missionSignature.length>0){
                return true;
            };
        },
        filterHonourierConsult(target){
            if(target===true){
               this.embassyList = this.embassyAllList.filter(list => list.embassyType=='H')
            } else {
                this.embassyList = this.embassyAllList.filter(list => list.embassyType=='N')
            }
        },
        updateSnackbarInfo(variable){
            this.snackbar = true;
            this.color = variable.color;
            this.messageText = variable.messageText;
        },
        showButton(){
            if(localStorage.getItem("lumos_roleOid")=='nbrofficer'){
                return true;
            } else {
                return false;
            }
        },
        checkState(state){
            if(state >= 1){
                return true;
            }
            else
            {
                return false;
            }
        },
        checkFMState(state){
            if(state >= 3){
                return true;
            }
            else
            {
                return false;
            }
        },
        select(event) {
            this.buttonId = event.currentTarget.id;            
        },
        init(){
            
            if(localStorage.getItem("lumos_roleOid")=='fmofficer' || localStorage.getItem("lumos_roleOid")=='fmoperator'){
                this.entity.userType = "Exemption";
                    
                
            } else if(localStorage.getItem("lumos_roleOid")=='nbrofficer'){
                this.entity.userType = "Passbook"; 
            }
            else{
                this.userTypeList=[
                    { name : "Passbook" },
                    { name : "Exemption" }
                ]
            }
            
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getBasicProfile(this.$route.params.id)
            } else {    
                this.buttonText = "Save"
            }
            if(localStorage.getItem("lumos_roleOid")=='fmofficer' || localStorage.getItem("lumos_roleOid")=='fmoperator'){
                // this.getQuarterList();
                this.getEmbassyList();
                this.getDesignationList();
            }
                  
        },
        onKeydown (event) {
    	let char = String.fromCharCode(event.keyCode)
    	if (!/[0-9]/.test(char)) {
      	    event.preventDefault()
            }
        },
        clear(){
            const input = this.$refs.file;
            input.type = 'text';
            input.type = 'file';
        },
        getInfoByPassport(passportNo){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = { oid: passportNo };
            let req = constant.getRequest(
                url.master_basicprofile_v1_passport_get_by_oid,
                body
            );
            lumos_client
            .onPost(url.master_basicprofile_v1_passport_get_by_oid, req)
            .then((result) => {
            let res = result.data.header.responseCode;
            if (res !== "200") {
                this.color = "red";
                // this.messageText = result.data.body.data;\
                this.messageText = "No data found for the given passport number"
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.snackbar = true;
                return;
            }
            this.entity = result.data.body;
            this.oidModifier(this.entity);  
            this.color = "success";
            setTimeout(
                () =>
                (this.entity = {
                    // slno: this.entity.slno
                    userType:this.entity.userType,
                    nameOfHolder: this.entity.nameOfHolder,
                    designationOfHolder: this.entity.designationOfHolder,
                    dateOfFirstArrival: this.entity.dateOfFirstArrival,
                    nameOfEmbassy: this.entity.nameOfEmbassy,
                    occasion: this.entity.occasion,
                    passportNo: this.entity.passportNo,
                    nameOfSponsor: this.entity.nameOfSponsor,
                    sponsorPassport: this.entity.sponsorPassport,
                    holderEmailAddress: this.entity.holderEmailAddress,
                    holderMobileNumber: this.entity.holderMobileNumber,
                    spouse: this.entity.spouse,
                    spousePassportNo: this.entity.spousePassportNo,
                    status:'Active',
                    state: '2'
                }),
                1000
            );
            if((this.entity.spouse!=null && this.entity.spouse.length>0) || (this.entity.spousePassportNo !=null && this.entity.spousePassportNo.length>0)){
                this.married = true;
            }
            this.progressBar.loading = false;
            this.progressBar.show = false;
            this.showDetails = true;
            })
            .catch((error) => {
            this.$log.error(error);
            });

        },
        getBasicProfile(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.master_basicprofile_v1_get_by_oid, body);
        
            lumos_client.onPost(url.master_basicprofile_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier(this.entity);
                if((this.entity.spouse!=null && this.entity.spouse.length>0) || (this.entity.spousePassportNo !=null && this.entity.spousePassportNo.length>0)){
                    this.married = true
                }
                if(this.entity.honourierType == 'H'){
                    this.honourierConsultant = true;
                }

                if(this.entity.signature!=null){
                    this.userSignature = this.entity.signature.substring(11, 29)+this.entity.signature.substring(66, 70)
                    
                }
                if(this.entity.fmMissionSignature!=null){
                    this.missionSignature = this.entity.fmMissionSignature.substring(11, 29)+this.entity.fmMissionSignature.substring(66, 70)
                }
            }).catch(error =>{
            });
        },
        disable() {
        document.getElementById("disable").disabled = true;
        },
        getEmbassyList(){
            let body = {};
            let req = constant.getRequest(url.master_basicprofile_v1_fm_honourier_consultant_get_list, body);
            lumos_client.onPost(url.master_basicprofile_v1_fm_honourier_consultant_get_list, req)
            .then(result => {
                this.embassyAllList = result['data']['body']['data'];
                if(localStorage.getItem("lumos_roleOid")=='fmofficer' || localStorage.getItem("lumos_roleOid")=='fmoperator'){
                    this.embassyList = this.embassyAllList.filter(list => list.embassyType=='N')
                } else {
                    this.embassyList = this.embassyAllList.filter(list => list.embassyType=='H')
                }
            }).catch(error => {
            });
        },
        getQuarterList(){
            let quarterType = "quarterExemption";
            let body = {oid: quarterType};
            let req = constant.getRequest(url.master_quarter_v1_get_list, body);
            lumos_client.onPost(url.master_quarter_v1_get_list, req)
            .then(result => {
                this.quarterList = result['data']['body']['data'];
            }).catch(error => {
            });
        },
        getDesignationList(){
            let body = {};
            let req = constant.getRequest(url.master_designation_v1_get_list, body);
            lumos_client.onPost(url.master_designation_v1_get_list, req)
            .then(result => {
                this.designationList = result['data']['body']['data'];
            }).catch(error => {
            });
        },
        basicprofileSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                if(this.entity.userType=='Passbook'){
                    this.entity.fileNumber = this.entity.fileNumber.replace(/\s/g, '');
                }
                if(this.entity.userType=='Exemption'){
                    this.entity.fileNumber = this.entity.fileNumber.replace(/\s/g, '');
                    if(this.entity.passportNo!="" && this.entity.passportNo.length>0){
                        this.entity.passportNo = this.entity.passportNo.replace(/\s/g, '');
                    }
                    if(this.honourierConsultant == true && this.entity.otherEmbassy.length>0){
                        this.entity.honourierType = 'H';
                    } else if((this.entity.nameOfEmbassy=='Other' || this.entity.nameOfEmbassy=='other') && this.entity.otherEmbassy.length>0){
                        this.entity.honourierType = 'N';
                    } else if(!this.honourierConsultant){
                        this.entity.honourierType = 'N';
                    }

                }
                this.progressBar.loading = true;
                this.progressBar.show = true;

                if(this.buttonId == 'save' && this.entity.state==0 && (localStorage.getItem("lumos_roleOid")=='fmofficer' || localStorage.getItem("lumos_roleOid")=='fmoperator')){
                    this.entity.state = 2;
                } else if(this.buttonId == 'save' && this.entity.state==2 && (localStorage.getItem("lumos_roleOid")=='fmofficer' || localStorage.getItem("lumos_roleOid")=='fmoperator')){
                    this.entity.state = 2;
                } else if(this.buttonId == 'save' && this.entity.state==3 && (localStorage.getItem("lumos_roleOid")=='fmofficer' || localStorage.getItem("lumos_roleOid")=='fmoperator')){
                    this.entity.state = 3;
                }else if(this.buttonId == 'save' && this.entity.state==4 && (localStorage.getItem("lumos_roleOid")=='fmofficer' || localStorage.getItem("lumos_roleOid")=='fmoperator')){
                    this.entity.state = 4;
                }else if(this.buttonId == 'save' && this.entity.state==0 && localStorage.getItem("lumos_roleOid")=='nbrofficer'){
                    this.entity.state = 0;
                }else if(this.buttonId == 'send' && localStorage.getItem("lumos_roleOid")=='nbrofficer'){
                   this.entity.state = 1; 
                }
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.master_basicprofile_v1_update;              
                } else {    
                    http_url = url.master_basicprofile_v1_save;
                    this.downloadButtonShow = false;
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
                        this.entity.state = 0;
                        return;
                    }
                    this.color = "success"; 
                    if(this.$route.params.id){
                        if(this.buttonId== 'save'){
                        this.messageText = "BasicProfile Updated Successfully";
                        setTimeout( () => this.$router.push({name:'BasicProfile'}), 3000);
                        }else if(this.buttonId == 'send'){
                        this.messageText = "BasicProfile Submitted to Bond Successfully";
                        setTimeout( () => this.$router.push({name:'BasicProfile'}), 3000);
                        }
                        
                    } else {
                        const input = this.$refs.file;
                        input.type = 'text';
                        input.type = 'file';

                        if(this.buttonId== 'save'){
                        this.messageText = "BasicProfile Saved Successfully";    
                        }else if(this.buttonId== 'send'){
                        this.messageText = "BasicProfile Submitted to Bond Successfully";
                        }
                        this.uploadProgress = {}
                        this.applicantUploadProgress = {}
                        this.missionUploadProgress = {}
                        
                        setTimeout( () => this.entity = {
                            userType:'', 
                            fileNumber:'', 
                            filePath:'', 
                            fileDate:'',
                            status:'Active'
                        }, 2000)
                        setTimeout( () => this.$router.push({name:'BasicProfile'}), 2000)               
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
            if(this.entity.issuedDate){
                obj.issuedDate = obj.issuedDate;
            }
            if(this.entity.validUpTo){
                obj.validUpTo = obj.validUpTo.toISOString();
            }
            if(this.entity.dateOfFirstArrival){
                obj.dateOfFirstArrival = obj.dateOfFirstArrival.toISOString();
            }
            if(this.entity.createdOn){
                obj.createdOn = obj.createdOn.toISOString();
            }
            if(this.entity.updatedOn){
                obj.updatedOn = obj.updatedOn.toISOString();
            }
            return obj;
        },

        fileUpload(event){
            let formData = new FormData();
            formData.append('file',event.target.files[0], event.target.files[0].name );
            this.uploadProgress.show = true;
            lumos_client.onUpload(url.master_document_v1_upload+'?folderName=beneficiary', formData,  {
                onUploadProgress: uploadEvent => {
                    this.uploadProgress.valueDeterminate =  Math.round(uploadEvent.loaded / uploadEvent.total*100) 
                }
            }).then(result => {
                this.entity.filePath = result.data;             
            }).catch(error => {
            });
        },
        missionSignatureUpload(event){
            let formData = new FormData();
            formData.append('file',event.target.files[0], event.target.files[0].name );
            this.missionUploadProgress.show = true;
            lumos_client.onUpload(url.master_document_v1_upload+'?folderName=signatures/fmMissionSignature', formData,  {
                onUploadProgress: uploadEvent => {
                    this.missionUploadProgress.valueDeterminate =  Math.round(uploadEvent.loaded / uploadEvent.total*100) 
                }
            }).then(result => {
                this.entity.fmMissionSignature = result.data;               
            }).catch(error => {
            });
        },
        signatureUpload(event){
            let formData = new FormData();
            formData.append('file',event.target.files[0], event.target.files[0].name );
            this.applicantUploadProgress.show = true;
            lumos_client.onUpload(url.master_document_v1_upload+'?folderName=signatures/applicantSignature', formData,  {
                onUploadProgress: uploadEvent => {
                    this.applicantUploadProgress.valueDeterminate =  Math.round(uploadEvent.loaded / uploadEvent.total*100) 
                }
            }).then(result => {
                this.entity.signature = result.data;            
            }).catch(error => {
            });
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
        
        oidModifier(entity){
            if(this.entity.fileDate){
                this.entity.fileDate = new Date(this.entity.fileDate);
            }
            if(this.entity.letterDate){
                this.entity.letterDate = new Date(this.entity.letterDate);
            }
            if(this.entity.createdOn){
                this.entity.createdOn = new Date(this.entity.createdOn);
            }
            if(this.entity.updatedOn){
                this.entity.updatedOn = new Date(this.entity.updatedOn);
            }
            if(this.entity.issuedDate){
                this.entity.issuedDate = new Date(this.entity.issuedDate);
            }
            if(this.entity.validUpTo){
                this.entity.validUpTo = new Date(this.entity.validUpTo);
            }
            if(this.entity.dateOfFirstArrival){
                this.entity.dateOfFirstArrival = new Date(this.entity.dateOfFirstArrival);
            }
            
        },
    }
}
</script>
<style scoped>
/* .inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
} */
.button1 {
  background-color: #284f83; 
  border: none;
  color: white;
  padding: 8px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1:hover {
  background-color: #5a1e1e;
  color: white;
}
.inputfile + label {
    font-size: 1em;
    font-weight: 700;
    color: white;
    background-color: #3C9ED3 ;
    display: inline-block;
    padding: 5px;
    border-radius: 2px;
}
.inputfile:focus + label,
.inputfile + label:hover {
    background-color: #3594D3;
}
.inputfile + label {
	cursor: pointer;
}
.new-basicprofile-info {
    background: white;
    padding: 10px 10px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.03);
    -webkit-box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%); 
    box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%);
}
.search-input{
  background: #fff;
  width: 100%; 
  border-radius: 5px;
  position: relative;
  /* box-shadow: 0px 1px 5px 3px rgba(0,0,0,0.12); */
}

.search-input input{
  height: 35px;
  width: 50%;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 0 60px 0 20px;
  font-size: 18px;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
}
</style>