<template>
<div class="asset-form">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="container-fluid">
        <div class="row">
            <div v-if="checkUser()=='fmofficer'" class="col-2 d-inline-flex">
                <router-link :to="{ name: 'BasicProfile' }"  tag="span" class="button-tooltip pt-1 float-left">
                    <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
            </div>
            <div v-else-if="checkUser" class="col-2 d-inline-flex">
                <router-link :to="{ name: 'PassbookProfile' }"  tag="span" class="button-tooltip pt-1 float-left">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
            </div>
        </div>
        <br>
        <form class="form-group" @submit.prevent="generalprofiletransactionSaveUpdate()">
            <div class="row">
                <div class="col-12">
                    <b-tabs v-model="tabIndex" ref="wizard">
                        <b-tab title="General Basic Transaction" class="asset-form-panel">
                            <div class="row">
                               <div class="col-md-6 col-12 col-sm-6" active>
                                    <p>
                                        <label> <b>Passbook/Exemption Sl No.</b></label>
                                        <input readonly class="form-control" placeholder="Passbook/Exemption Sl No" v-model="entity.slNo"  name="Passbook/Exemption No." autocomplete="off"> 
                                    </p>
                                    <p>
                                        <label > <b>Holder Name</b></label>
                                        <input readonly class="form-control" placeholder="Name of the holder" v-model="entity.nameOfHolder"  name="Passbook/Exemption Name" autocomplete="off">
                                        <!-- <model-list-select class="form-control mb-1" :list="generalprofileList" v-model="entity.generalProfileOid" option-value="oid" optionText="nameOfHolder" v-validate="'required'" placeholder="Select Profile Name" name="generalprofileOid"/>
                                        <small v-show="errors.has('generalprofileOid')" class="help is-danger"><i v-show="errors.has('generalprofileOid')" class="fa fa-exclamation-circle"></i>{{ errors.first('generalprofileOid') }} </small> -->
                                    </p>                                    
                                    <p>
                                        <label> <b>Type Name</b></label>
                                        <input readonly class="form-control" placeholder="Passbook/Exemption Sl No" v-model="entity.userType"  name="User Type" autocomplete="off"> 
                                    </p>                                      
                                </div>
                                <div class="col-md-6 col-12 col-sm-6 mb-4">
                                    <!-- <p v-if="this.entity.userType=='Exemption'"> -->
                                    <p>
                                        <label> <b>Warehouse Name</b></label>
                                        <multi-list-select class="mb-1" :selected-items="multiCategory" @select="selectCategory"  :list="warehouseinfoList"  option-value="oid" optionText="warehouseName" placeholder="Select Warehouse Name" name="Warehouse"> </multi-list-select>
                                   
                                       <!-- <multi-list-select :list="categoryList" option-value="oid" option-text="categoryName" :selected-items="multiCategory" @select="selectCategory" placeholder="select Category"> </multi-list-select> -->
                                    </p>
                                    <p v-if = 'entity.userType !== "Passbook"'>
                                        <label class="required"> <b>Quarter Name</b></label>
                                        <model-list-select class="form-control mb-1"  :list="quarterList"  v-model="entity.quarterOid" option-value="oid" optionText="oid" placeholder="Select Quarter Name" v-validate="'required'" name="Quarter" :disabled="checkFMState(this.entity.state)"/>
                                        <small v-show="errors.has('quarterOid')" class="help is-danger"><i v-show="errors.has('Quarter')" class="fa fa-exclamation-circle"></i>{{ errors.first('Quarter') }} </small>
                                    </p>                                          
                                    <p>
                                        <label class="required"> <b>Status </b></label>
                                        <model-list-select class="form-control mb-1" :list="statusList" v-model="entity.status" option-value="name" optionText="name" placeholder="Select Status" v-validate="'required'" name="Status"/>
                                        <small v-show="errors.has('Status')" class="help is-danger"><i v-show="errors.has('Status')" class="fa fa-exclamation-circle"></i>{{ errors.first('Status') }} </small>
                                    </p>
                                                                                      
                                </div>                                
                            </div>  
                            <!--                    FOR PASSBOOK                    -->
                            <div class="col-12" v-if = 'entity.userType == "Passbook"'>
                                <b>Articles</b>
                                <!-- v-if="!addButtonDisable" -->
                                <span class="btn btn-bg-default button-tooltip"  @click="addDocument(entity.documents)">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                    <span class="button-tooltiptext">Add</span>
                                </span>
                                <div class="table-responsive no-padding">
                                    <table class="table table-bordered table-sm ">
                                        <tr class="table table-bordered text-center">
                                            <th style="width: 30%">Month</th>
                                            <th style="" class="required">Allocate Value (US Dollar)</th>
                                            <th style="">Action</th>
                                        </tr>
                                        <tr v-for="(document, index) in entity.documents" :key="index" class="">
                                            <td>
                                                <model-list-select :list="quarterList" v-validate="'required'" v-model="document.quarterOid" option-value="oid" optionText="oid" name="Quarter" @input="checkDuplicateQuarter(document, index);"/>
                                                <small v-show="errors.has('Quarter')" class="help is-danger"><i v-show="errors.has('Quarter')" class="fa fa-exclamation-circle"></i>{{ errors.first('Quarter') }} </small>
                                            </td>                                         
                                            <td>
                                                <input v-validate="'required'" type="number" placeholder="Enter Value" class="form-control " v-model="document.allocateValue" name="Allocate Value">
                                                <small v-show="errors.has('Allocate Value')" class="help is-danger"><i v-show="errors.has('Allocate Value')" class="fa fa-exclamation-circle"></i>{{ errors.first('Allocate Value') }} </small>
                                            </td>
                                            <td class="text-center" >
                                                <span class="btn btn-bg-danger button-tooltip mr-1 " @click="deleteConfirmation(index, document.generalProfileArticlesOid)">
                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                                    <span class="button-tooltiptext"> Delete</span>
                                                </span>
                                                <!-- v-if="!addButtonDisable" -->
                                                <span class="btn btn-bg-success button-tooltip"  @click="addDocument(entity.documents)">
                                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                                    <span class="button-tooltiptext" >Add</span>
                                                </span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div> 
                             <!-- FOR EXEMPTION -->
                            <div class="col-12" v-if = 'entity.userType !== "Passbook"'>
                                <b>Articles</b>
                                <!-- v-if="!addButtonDisable" -->
                                <span class="btn btn-bg-default button-tooltip"  @click="addDocument(entity.documents)">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                    <span class="button-tooltiptext">Add</span>
                                </span>
                                <div class="table-responsive no-padding">
                                    <table class="table table-bordered table-sm ">
                                        <tr class="table table-bordered text-center">
                                            <th style="width:250px">Name of Articles</th>
                                            <th style="">Quantity (Cases/Box)</th>
                                            <th style="">Weight (KG/Liter) </th>
                                            <th style="">Allocate Pieces</th>
                                            <th style="" class="required">Allocate Value (US Dollar)</th>
                                            <th style="">Action</th>
                                        </tr>
                                        <tr v-for="(document, index) in entity.documents" :key="index" class="">
                                            <td>
                                                <model-list-select :list="categoryList" v-model="document.categoryOid" option-value="oid" optionText="name" v-validate="'required'" name="Category" @input="checkDuplicateCategory(document, index);"/>
                                                <small v-show="errors.has('Category')" class="help is-danger"><i v-show="errors.has('Category')" class="fa fa-exclamation-circle"></i>{{ errors.first('Category') }} </small>
                                            </td>
                                            <td>
                                                <input type="text" placeholder="Enter Quantity" class="form-control " v-model="document.allocateQuantity">
                                            </td>
                                            <td>
                                                <input type="text" placeholder="Enter Weight" class="form-control " v-model="document.allocateWeight">
                                            </td>
                                            <td>
                                                <input type="number" placeholder="Enter Pieces" class="form-control " v-model="document.allocatePieces" @keypress="onKeydown">
                                            </td>
                                            <td>
                                                <input v-validate="'required'" type="number" placeholder="Enter Value" class="form-control " v-model="document.allocateValue" name="Allocate Value" >
                                                <small v-show="errors.has('Allocate Value')" class="help is-danger"><i v-show="errors.has('Allocate Value')" class="fa fa-exclamation-circle"></i>{{ errors.first('Allocate Value') }} </small>
                                            </td>
                                            <td class="text-center" >
                                                <span class="btn btn-bg-danger button-tooltip mr-1 " @click="deleteConfirmation(index, document.generalProfileArticlesOid)">
                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                                    <span class="button-tooltiptext"> Delete</span>
                                                </span>
                                                <!-- v-if="!addButtonDisable" -->
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

            
            <!-- For Exemption Articles save-->
            <div class="text-center mt-3" v-if="checkUser()=='fmofficer'">
                 <!-- button-width -->
                 <div class="text-red mb-2" v-if="validateQuantityMsg">{{validateQuantityMsg}}</div>
                <button class="btn btn-success ripple mr-3" id="save" v-on:click="select($event)" @submit.prevent="generalprofiletransactionSaveUpdate()">
                    {{buttonText}}
                </button>
                
                <router-link tag="button" class="btn btn-danger button-width ripple mr-3" :to="{ name: 'BasicProfile' }" >
                    Cancel
                </router-link>
                
                
            </div> 
            <!-- Passbook Save  -->
            <div class="text-center mt-3" v-else-if="checkUser">
            <div class="text-red mb-2" v-if="validateQuantityMsg">{{validateQuantityMsg}}</div>
                <button class="btn btn-success ripple mr-3" id="save" v-on:click="select($event)" @submit.prevent="generalprofiletransactionSaveUpdate()">
                    {{buttonText}}
                </button>
                <router-link tag="button" class="btn btn-danger button-width ripple mr-3" :to="{ name: 'PassbookProfile' }" >
                    Cancel
                </router-link>
            </div>  
        </form>              
    </div>
    <v-app>
        <v-dialog  v-model="deleteConfirmationModel"  max-width="400" >
            <v-card>                                    
            <v-card-text>
            <h5>Are you sure, You want to delete the articles?</h5>
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
        <v-dialog v-model="articlesConfirmationModel" max-width="60%">
            <v-card>
                <div class="p-4">
                    <div class="row">
                        <div class="col col-md-6">   
                            <p>
                                <label> <b>Passbook/Exemption Sl No.</b></label>
                                <input readonly class="form-control" placeholder="Passbook/Exemption Sl No" v-model="entity.slNo"  name="Passbook/Exemption No.">                             
                            </p> 
                            <p>
                                <label > <b>Holder Name</b></label>
                                <input readonly class="form-control" placeholder="Name of the holder" v-model="entity.nameOfHolder"  name="Passbook/Exemption Name">
                            </p>
                            <p>
                                <label> <b>Type Name</b></label>
                                <input readonly class="form-control" placeholder="Passbook/Exemption Sl No" v-model="entity.userType"  name="User Type">
                            </p>
                        </div>
                        <div class="col col-md-6">
                            <p>
                                <label> <b>Warehouse Name</b></label>
                                <multi-list-select class="mb-1" :selected-items="multiCategory" @select="selectCategory"  :list="warehouseinfoList"  option-value="oid" optionText="warehouseName" placeholder="Select Warehouse Name" name="Warehouse" isDisabled='true'> </multi-list-select>
                                
                            </p>                           
                            <p v-if="this.entity.userType == 'Exemption'">
                                <label> <b>Quarter Name</b></label>
                                <model-list-select class="form-control mb-1"  :list="quarterList"  v-model="entity.quarterOid" option-value="oid" optionText="oid" placeholder="Select Quarter Name" name="Quarter" isDisabled='true'/>
                            </p>
                            <p>
                                <label> <b>Status </b></label>
                                <model-list-select class="form-control mb-1" :list="statusList" v-model="entity.status" option-value="name" optionText="name" placeholder="Select Status"name="Status" isDisabled='true'/>
                            </p>
                        </div>                         
                    </div>
                    <div class="table-responsive pt-2" v-if="this.entity.userType=='Exemption'">
                        <table class="table table-bordered table-sm">
                            <tr class="table table-bordered text-center">
                                <th style="width:250px">Name of Articles</th>
                                <th style="">Quantity (Cases/Box)</th>
                                <th style="">Weight (KG/Liter) </th>
                                <th style="">Allocate Pieces</th>
                                <th style="" class="required">Allocate Value (US Dollar)</th>
                            </tr>
                            <tr v-for="(document, index) in entity.documents" :key="index" class="">
                                <td>
                                    <model-list-select :list="categoryList" style="border-color:white;" v-model="document.categoryOid" option-value="oid" optionText="name" name="Category"/>
                                </td>
                                <td>
                                    <input type="text" style="border-color:white;" placeholder="Enter Quantity" class="form-control " v-model="document.allocateQuantity" readonly>
                                </td>
                                <td>
                                    <input type="text" style="border-color:white;" placeholder="Enter Weight" class="form-control " v-model="document.allocateWeight" readonly>
                                </td>
                                <td>
                                    <input type="text" style="border-color:white;" placeholder="Enter Pieces" class="form-control " v-model="document.allocatePieces" readonly>
                                </td>
                                <td>
                                    <input type="text" style="border-color:white;" placeholder="Enter Value" class="form-control " v-model="document.allocateValue" name="Allocate Value" readonly>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="table-responsive pt-2" v-if="this.entity.userType=='Passbook'">
                        <table class="table table-bordered table-sm">
                            <tr class="table table-bordered text-center">
                                <th style="width: 30%">Month</th>
                                <th style="" class="required">Allocate Value (US Dollar)</th>
                            </tr>
                            <tr v-for="(document, index) in entity.documents" :key="index" class="">
                                <td>
                                    <model-list-select :list="quarterList" style="border-color:white;" v-model="document.quarterOid" option-value="oid" optionText="oid" name="Quarter" isDisabled='true'/>
                                </td>
                                <td>
                                <input type="text" style="border-color:white;" placeholder="Enter Value" class="form-control " v-model="document.allocateValue" name="Allocate Value" readonly>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="text-center mt-2">
                        <button class="btn btn-success ripple mr-3" @click="generalprofiletransactionSaveUpdate()">Confirm</button>
                        <button class="btn btn-danger ripple" @click="articlesConfirmationModel=false">
                            Cancel
                        </button>
                    </div> 
                </div>                
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
import { ModelListSelect, MultiListSelect } from "vue-search-select";
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import contact from '@/components/Contact.vue';
import contactData from '@/components/ContactData.vue';
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker";
import * as _ from 'underscore';

export default {
    components: {
        ModelListSelect, Datepicker, contact, contactData, MultiListSelect
    },
    data(){
        return{
            entity:{
                state: 2,
               documents: [{
                    quarterOid: "",
                    categoryOid: "",
                    allocateQuantity: "",
                    allocateWeight: "", 
                    allocatePieces: "",
                    allocateValue: "",
                    generalProfileArticlesOid: ""
                    }]               
            },
            entity1:{
                warehouse: [{}],
            },
            buttonId:"",
            warehouseOid:[{}], 
            // addButtonDisable: false,
            categoryList:[],
            warehouseinfoList:[],
            generalprofileList:[],
            quarterList:[],
            multiCategory: [],
            userType: '',
            buttonText:'',
            type: '',
            statusList:[
                { name : 'Active' }, 
                { name : 'Inactive'},
            ], 
            // userType:[
            //     { name : 'Passbook' }, 
            //     { name : 'Exemption'},
            // ],
            stateList:[
                { name : 1 }, 
                { name : 2 },
                { name : 3 }, 
                { name : 4 },
                { name : 5 }, 
                { name : 6 }, 
                { name : 7 }
            ],
            userTypeList:[
                { name : "Passbook" }, 
                { name : "Exemption" }
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
            tabIndex: 0,
            deleteConfirmationModel: false,
            articlesConfirmationModel: false,
            // itemIndex : "",
            // itemArticle
            Oid : "", 
            approveButtonDisable: true
        }
    },
    mounted(){
        this.init()        
    },
    computed: {
              
    },
    methods:{
        addItem(item) {
            item.push({
                label: "",
                value: ""
            });
        },
        checkFMState(state){
            if(state >= 4){
                return true;
            }
            else
            {
                return false;
            }
        },
        updateSnackbarInfo(variable){
            this.snackbar = true;
            this.color = variable.color;
            this.messageText = variable.messageText;
            //this.getContactList();
        },
        select(event) {
            this.buttonId = event.currentTarget.id;            
        },
        confirmArticles(){
            this.$validator.validateAll().then(result => {
            if (!result){
                return;
            }
            this.articlesConfirmationModel = true
            // if(this.entity.userType == "Exemption") {
            //   this.exemptionArticlesConfirmationModel = true     
            // } else {
            //   this.passbookArticlesConfirmationModel = true  
            // }
                      
            }); 
        },
        checkDuplicateCategory(doc, i){
            for(let j=0; j<this.entity.documents.length; j++){
                if(i!==j){
                    if(this.entity.documents[j].categoryOid ==doc.categoryOid){
                        this.entity.documents[i].categoryOid = ""
                        this.validateQuantityMsg = "The category already selected ";
                        break;
                    } else {
                        this.validateQuantityMsg = ""
                    }
                }
            }
        },
        checkDuplicateQuarter(doc, i){
            for(let j=0; j<this.entity.documents.length; j++){
                if(i!==j){
                    if(this.entity.documents[j].quarterOid == doc.quarterOid){
                        this.entity.documents[i].quarterOid = ""
                        this.validateQuantityMsg = "The month already selected ";
                        break;
                    } else {
                    this.validateQuantityMsg = ""
                    }
                } 
            }
        },
        checkUser(){
             if(localStorage.getItem("lumos_roleOid")=='fmofficer' || localStorage.getItem("lumos_roleOid")=='fmoperator'){
                return 'fmofficer';
            } else {
                return true;
            }
        },
        init(){
            // if(this.$route.params.type == 'update'){
            //     this.buttonText = "Update"                
            // } 
            // else {
            //     this.buttonText = "Save"
            //     this.getGeneralProfileTransactionSave(this.$route.params.pid); 
            // }
            // this.entity.slNo = this.$route.params.pid;
            this.getCategory();
            this.getWarehouseInfo();        
            

        },
        onKeydown (event) {
    	let char = String.fromCharCode(event.keyCode)
    	if (!/[0-9]/.test(char)) {
      	    event.preventDefault()
            }
        },
         selectCategory(items) {
            this.multiCategory = items;
            this.entity.warehouseOid = _.pluck(this.multiCategory, "oid");
        },
        showButton(){
            if(localStorage.getItem("lumos_roleOid")=='fmofficer'){
                return true;
            } else {
                return false;
            }
        },
        checkState(state){
            if(state >= 3){
                return true;
            }
            else
            {
                return false;
            }
        },
        generalprofiletransactionApproved(){           
            this.$router.push({name:'GeneralProfile Transaction View', params:{id: this.entity.oid}});

            // console.log()
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
        getWarehouseInfo(){
            let body = {};
            let req = constant.getRequest(url.master_warehouseinfo_v1_get_list, body);
            lumos_client.onPost(url.master_warehouseinfo_v1_get_list, req)
            .then(result => {
                this.warehouseinfoList = result['data']['body']['data'];
                if(this.$route.params.id){
                    this.getGeneralProfileTransaction(this.$route.params.id)                    
                }
            }).catch(error => {
            });
        },
        addDocument(documents) {
            documents.push({
                quarterOid: "",
                categoryOid: "",
                allocateQuantity: "",
                allocateWeight: "", 
                allocatePieces: "",
                allocateValue: "",
                generalProfileArticlesOid: ""
            });
        },    
        deleteConfirmation(index, oid){
            this.deleteConfirmationModel = true
            this.itemIndex = index
            this.itemArticleOid = oid
        },    
        deleteItem() {   
            if(this.$route.params.id && this.itemArticleOid===""){                
                this.entity.documents.splice(this.itemIndex, 1);
                this.deleteConfirmationModel = false
                return
            } else if(this.$route.params.id){

                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = url.operation_generalprofiletransaction_v1_delete;               
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
                    this.entity.documents.splice(this.itemIndex, 1);
                    this.color = "success"; 
                    this.messageText = "General Profile Articles  Successfully Deleted";
                    this.deleteConfirmationModel = false
                    // this.getGeneralProfileTransaction(this.$route.params.id)                
           
                }).catch(error => {
                    this.$log.error(error)
                })               

            } 
            //this.$validator.validateAll().then(result => {
                // if (!result){
                //     return;
                // }
            //}); 
        },

        // getGeneralProfileTransactionSave(oid){
        //     this.progressBar.loading = true;
        //     this.progressBar.show = true;
        //     let body = {oid: oid};
        //     let req = constant.getRequest(url.master_generalprofile_v1_get_by_oid, body);
        //     lumos_client.onPost(url.master_generalprofile_v1_get_by_oid, req)
        //     .then(result => {
        //         this.progressBar.loading = false;
        //         this.progressBar.show = false;
        //         this.entity = result['data']['body']; 
        //         this.entity = {
        //                 "nameOfHolder": this.entity.nameOfHolder,
        //                 "oid": this.entity.oid,
        //                 "generalProfileOid": this.entity.generalProfileOid,
        //                 "slNo": this.entity.slNo,
        //                 "state": this.entity.state,
        //                 "status": this.entity.status,
        //                 "quarterOid": this.entity.quarterOid,
        //                 "userType": this.entity.userType,
        //                 "orgOid": this.entity.orgOid,
        //                 "documents":[{
        //                     quarterOid:"",
        //                     categoryOid: "",
        //                     unitQuantity: "",
        //                     unitValue: "", 
        //                     totalQuantity: "",
        //                     totalValue: "",
        //                     generalProfileArticlesOid: ""
        //                 }]
        //             }

        //             this.getQuarterList(this.entity);                     
        //     }).catch(error =>{
        //     });
        // },
        getGeneralProfileTransaction(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid, passbook:0 };
            let req = constant.getRequest(url.operation_generalprofiletransaction_v1_get_by_oid, body);
            lumos_client.onPost(url.operation_generalprofiletransaction_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                // console.log(this.entity);
                if(this.entity.state==3 || this.entity.state==4){
                this.buttonText = "Update"
                } else {
                this.buttonText = "Save"
                }
                if(this.entity.documents==undefined){
                    this.entity = {
                        "nameOfHolder": this.entity.nameOfHolder,
                        "oid": this.entity.oid,
                        "generalProfileOid": this.entity.generalProfileOid,
                        "slNo": this.entity.slNo,
                        "state": this.entity.state,
                        "status": this.entity.status,
                        "quarterOid": this.entity.quarterOid,
                        "userType": this.entity.userType,
                        "orgOid": this.entity.orgOid,
                        "documents":[{
                            quarterOid: "",
                            categoryOid: "",
                            allocateQuantity: "",
                            allocateWeight: "", 
                            allocatePieces: "",
                            allocateValue: "",
                            generalProfileArticlesOid: ""
                        }]
                    }   
                }
                this.getQuarterList(this.entity);
                this.oidModifier(this.entity);
                
                this.warehouseinfoList.forEach((cat) => {
                    for(let i=0 ; i< this.entity.warehouseOid.length; i++){
                        if (cat.oid === this.entity.warehouseOid[i]){
                            this.multiCategory.push(cat)
                        }
                    }
                });
            //    this.entity.warehouseOid = _.pluck(this.multiCategory, "oid");
            }).catch(error =>{
            });
        },
        getQuarterList(obj){
            let quarterType = "";
            if (obj.userType==="Exemption"){
                quarterType = "quarterExemption";

            } else if(obj.userType==="Passbook"){
                quarterType = "quarterPassbook";
            }
            
            let body = {oid: quarterType};
            let req = constant.getRequest(url.master_quarter_v1_get_list, body);
            lumos_client.onPost(url.master_quarter_v1_get_list, req)
            .then(result => {
                this.quarterList = result['data']['body']['data'];
            }).catch(error => {
            });
        },
        getGeneralProfileList(){
            let body = {};
            let req = constant.getRequest(url.master_generalprofile_v1_get_list, body);
            lumos_client.onPost(url.master_generalprofile_v1_get_list, req)
            .then(result => {
                this.generalprofileList = result['data']['body']['data'];
            }).catch(error => {
            });
        },
        generalprofiletransactionSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                if(this.buttonId=='send' && this.entity.state== 2){
                    this.entity.state = 4;
                } else if(this.buttonId=='send' && this.entity.state== 3){
                    this.entity.state = 4;
                } else if(localStorage.getItem("lumos_roleOid")=='fmofficer' && this.entity.state == 4){
                    this.entity.state = 4;
                } else if(this.entity.state == 4){
                    this.entity.state = 4;
                } else {
                    this.entity.state = 3;
                }
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.operation_generalprofiletransaction_v1_update;                
                } else {    
                    http_url = url.operation_generalprofiletransaction_v1_save;
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
                    // this.articlesConfirmationModel = false
                    if (res != "200"){
                        this.color = "red"; 
                        this.messageText =  result.data.body.data;
                        return;
                    }
                    this.color = "success"; 
                    if(this.$route.params.id){
                        if(this.buttonId=='save'){
                            this.messageText = "General Profile Transaction Save Successfully";
                            if(this.entity.userType=='Exemption' && (localStorage.getItem("lumos_roleOid")=='fmofficer' || localStorage.getItem("lumos_roleOid")=='fmoperator')){                            
                                setTimeout( () => this.$router.push({name:'BasicProfile'}), 3000);
                            } else if(this.entity.userType=='Exemption'){                            
                                setTimeout( () => this.$router.push({name:'ExemptionProfile'}), 3000);
                            } else {
                                setTimeout( () => this.$router.push({name:'PassbookProfile'}), 3000);
                            }
                        }
                        
                    } else {
                        this.messageText = "General Profile Transaction Saved Successfully";
                        setTimeout( () => this.entity = {
                            documents:[{
                                            categoryOid: "",
                                            allocateQuantity: "",
                                            allocateWeight: "", 
                                            allocatePieces: "",
                                            allocateValue: ""
                                        }],
                            // type: "Issuing GeneralProfileTransaction"
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
            obj.warehouseOid = JSON.stringify(entity.warehouseOid);
            if(this.entity.userDate){
                obj.userDate = obj.userDate.toISOString();
            }
            if(this.entity.nbrDate){
                obj.nbrDate = obj.nbrDate.toISOString();
            }
            if(this.entity.fmDate){
                obj.fmDate = obj.fmDate.toISOString();
            }
            if(this.entity.bondDate){
                obj.bondDate = obj.bondDate.toISOString();
            }

            return obj;
        },
        oidModifier(entity){
            if(this.entity.documents){
                this.entity.documents = JSON.parse(this.entity.documents);
            }  
            if(this.entity.warehouseOid){
                this.entity.warehouseOid = JSON.parse(this.entity.warehouseOid);                
            }     
            if(this.entity.userDate){
                this.entity.userDate = new Date(this.entity.userDate);
            }
            if(this.entity.nbrDate){
                this.entity.nbrDate = new Date(this.entity.nbrDate);
            }
            if(this.entity.fmDate){
                this.entity.fmDate = new Date(this.entity.fmDate);
            }
            if(this.entity.bondDate){
                this.entity.bondDate = new Date(this.entity.bondDate);
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
</style>
