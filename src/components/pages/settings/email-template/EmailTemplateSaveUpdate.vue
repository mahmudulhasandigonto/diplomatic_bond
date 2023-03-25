<template>
    <div  class="">
        <!-- <div class="loading" v-if="progressBar.loading"></div> -->
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-12 col-12">
                    
                   <fieldset class="well" >
                        <legend class="well-legend"> <b> Email Template </b></legend> 
                        <div class="row">
                            <div class="col-md-4 col-12">
                                <div class="mb-3">
                                    <label class="required" > <b>Type </b></label>
                                    <model-list-select class="form-control mb-1" :list="typeList" v-model="entity.type" option-value="type" optionText="type" placeholder="Select Type" v-validate="'required'" name="Type"/>
                                    <small v-show="errors.has('Type')" class="help is-danger"><i v-show="errors.has('Type')" class="fa fa-exclamation-circle"></i>{{ errors.first('Type') }} </small>
                                </div>

                                <div  class="category-specification mb-5">
                                    <span class="required"><b>To Email </b></span>
                                    <!-- <span class="btn btn-bg-default button-tooltip" @click="addItem(entity.toEmail)">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <span class="button-tooltiptext">Add</span> 
                                    </span> -->
                                    <transition-group name="fadeRight"  tag="ul" mode="out-in">
                                        <li v-for="(specification,index) in entity.toEmail" :key="index" class="input-group">
                                            <input type="text" class="form-control " v-model="specification.label" placeholder="Enter Adress to Email">                                
                                            <span class="btn btn-bg-danger button-tooltip" @click="deleteItem(index, entity.toEmail)">
                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                                <span class="button-tooltiptext">Delete</span> 
                                            </span>
                                        </li>           
                                    </transition-group>   
                                    <span v-if="entity.toEmail.length > 0" class="btn btn-bg-success button-tooltip float-right" @click="addItem(entity.toEmail)">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <span class="button-tooltiptext">Add</span> 
                                    </span>                     
                                </div>
                                <div  class="category-specification mb-5">
                                    <span class="required"><b>Cc Mail </b></span>
                                    <!-- <span class="btn btn-bg-default button-tooltip" @click="addItem(entity.ccEmail)">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <span class="button-tooltiptext">Add</span> 
                                    </span> -->
                                    <transition-group name="fadeRight"  tag="ul" mode="out-in">
                                        <li v-for="(specification,index) in entity.ccEmail" :key="index" class="input-group">
                                            <input type="text" class="form-control " v-model="specification.label" placeholder="Enter Adress to Cc Email">                                
                                            <span class="btn btn-bg-danger button-tooltip " @click="deleteItem(index, entity.ccEmail)">
                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                                <span class="button-tooltiptext">Delete</span> 
                                            </span>
                                        </li>           
                                    </transition-group>   
                                    <span v-if="entity.ccEmail.length > 0" class="btn btn-bg-success button-tooltip float-right" @click="addItem(entity.ccEmail)">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <span class="button-tooltiptext">Add</span> 
                                    </span>                     
                                </div>

                                <div class="mb-3">
                                    <label class="required" > <b>Subject </b></label>
                                    <textarea class="form-control" cols="30" rows="1" v-model="entity.subjectEmail" placeholder="Enter Email Subject" v-validate="'required'" name="Subject"></textarea>
                                    <small v-show="errors.has('Subject')" class="help is-danger"><i v-show="errors.has('Subject')" class="fa fa-exclamation-circle"></i>{{ errors.first('Subject') }} </small>

                                </div>

                            </div>

                            <div class="col-md-5 col-12">
                                <div class="mb-3">
                                    <label class="required" > <b>Body </b></label>
                                    <vue-editor v-model="entity.bodyEmail" placeholder="Enter Email Body"></vue-editor>
                                </div>
                            </div>
                            
                            <div class="col-md-3 col-12 alert alert-primary" v-if="entity.type">
                                <div class="card-header">
                                    Available Variables
                                </div>
                                <div v-if="entity.type =='Asset' ">
                                    <ul >
                                        <li v-for="(help,index) in assetHelp" :key="index">
                                            {{help.helpName}} - {{help.var}}
                                            <hr class="m-1">
                                        </li>
                                    </ul>
                                </div>
                                <div v-if="entity.type =='Issue' ">
                                    <ul >
                                        <li v-for="(help,index) in issueHelp" :key="index">
                                            {{help.helpName}} - {{help.var}}
                                            <hr class="m-1">
                                        </li>
                                    </ul>
                                </div>
                                <div v-if="entity.type =='Requisition' ">
                                    <ul >
                                        <li v-for="(help,index) in requisitionHelp" :key="index">
                                            {{help.helpName}} - {{help.var}}
                                            <hr class="m-1">
                                        </li>
                                    </ul>
                                </div>
                                <div v-if="entity.type =='New User' ">
                                    <ul >
                                        <li v-for="(help,index) in newUserHelp" :key="index">
                                            {{help.helpName}} - {{help.var}}
                                            <hr class="m-1">
                                        </li>
                                    </ul>
                                </div>
                                <div v-if="entity.type =='Threshold' ">
                                    <ul >
                                        <li v-for="(help,index) in thresholdHelp" :key="index">
                                            {{help.helpName}} - {{help.var}}
                                            <hr class="m-1">
                                        </li>
                                    </ul>
                                </div>
                            </div>                          
                        </div>
                    
                    </fieldset> 
                    <div class="text-center">
                        <button class="btn btn-success button-width ripple mr-3" :disabled="errors.any() || isdisable" @click="emailTemplateSaveUpdate()">
                            {{buttonText}}
                        </button>
                        <router-link tag="button" class="btn btn-danger button-width ripple" :to="{name:'Email Template'}" >
                            Cancel
                        </router-link>

                    </div>
                </div> 
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
    </div>   
</template>
<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import * as _ from 'underscore';
import { ModelListSelect} from 'vue-search-select';
import { VueEditor, Quill } from 'vue2-editor'
export default { 
    components: {
      VueEditor , ModelListSelect
    },
     data(){
        return{
            entity:{ 
                "type":'',
                "toEmail":[ {"label":"" }],
                "ccEmail":[ {"label":"" }],
                "subjectEmail":'',  
                "bodyEmail":'',           
            },
            buttonText:'',
            typeList:[
                {type:'Asset'},
                {type:'Issue'},
                {type:'Requisition'},
                {type:'New User'},
                {type:'Threshold'}
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
            assetHelp:[
                {helpName:"Username", var:"@USER"},                
                {helpName:"Asset Status", var:"@STATUS"},               
                {helpName:"Category", var:"@CATEGORY"},              
                {helpName:"Asset Name", var:"@ASSET_NAME"},
            ],
            issueHelp:[
                {helpName:"Username", var:"@USER"},             
                {helpName:"Issue Name", var:"@ISSUE_NAME"},               
                {helpName:"Issue Number", var:"@ISSUE_NUMBER"},                 
                {helpName:"Issue Type", var:"@ISSUE_TYPE"},               
                {helpName:"Priority", var:"@PRIORITY"},              
                {helpName:"Reported Date", var:"@REPORTED_DATE"},               
                {helpName:"Issue Status", var:"@STATUS"},            
                {helpName:"Store", var:"@STORE"},
            ],
            requisitionHelp:[
                {helpName:"Username", var:"@USER"},                     
                {helpName:"Requisition Number", var:"@REQUISITION_NUMBER"},                 
                {helpName:"Requisition Details", var:"@DETAILS"},               
                {helpName:"Priority", var:"@PRIORITY"},                         
                {helpName:"Requisition Status", var:"@STATUS"},
            ],
            newUserHelp:[
                {helpName:"Username", var:"@USER"},                     
                {helpName:"Login ID", var:"@LOGIN_ID"},                 
                {helpName:"Password", var:"@PASSWORD"},             
                {helpName:"Role", var:"@ROLE"},            
                {helpName:"Role Description", var:"@DESCRIPTION"}

            ],
            thresholdHelp:[
                {helpName:"Username", var:"@USER"},                     
                {helpName:"Asset Name", var:"@ASSET_NAME"},                 
                {helpName:"Threshold Category", var:"@THRESHOLD_CATEGORY"},               
                {helpName:"Time", var:"@TIME"},                         
                {helpName:"Usage of RAM(%)", var:"@RAM"},           
                {helpName:"Usage of Disk(%)", var:"@DISK"},                           
                {helpName:"Usage of CPU(%)", var:"@CPU"},

            ]

            
        }
    },
    computed: {
        isdisable() {
            if (  this.entity.ccEmail.length > 0 || this.entity.toEmail.length > 0 ) { 
                return false;
            } else {
                return true;
            }
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getEmailTemplate(this.$route.params.id)
            }
            else{
                this.buttonText = "Save"
            }    
        },
        getEmailTemplate(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.master_email_v1_get_by_oid, body);
            lumos_client.onPost(url.master_email_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier();
            }).catch(error =>{
            });

        },
        emailTemplateSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.master_email_v1_update;                
                } else {    
                    http_url = url.master_email_v1_save;
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
                        this.messageText = result.data.header.responseMessage;
                        return;
                    }
                    this.color = "success"; 
                    if(this.$route.params.id){
                        this.messageText = "Email Template Updated Successfully";
                        setTimeout( () => this.$router.push({name:'Email Template'}), 3000);

                    } else {
                        this.messageText = "Email Template Saved Successfully";
                         setTimeout( () =>  
                            this.entity={ 
                                "type":'',
                                "value":'',
                                "toEmail":[{label:""}],
                                "ccEmail":[{label:""}],
                                "subjectEmail":'',  
                                "bodyEmail":'',           
                            }, 2000)
                    }
                }).catch(error => {
                    this.$log.error(error)
                })               
            });
        },
        addItem(item) {
            item.push(
                {"label":"" }
            );
        },
        deleteItem(index, item) {
            item.splice(index, 1);
            item.show = false
        },
        modifier(entity){
            var obj = _.clone(entity);
            let ccEmail = _.pluck(obj.ccEmail, 'label'); 
            obj.ccEmail = ccEmail.toString()
            let toEmail = _.pluck(obj.toEmail, 'label');
            obj.toEmail = toEmail.toString()
            return obj;
        },
        oidModifier(){
            let ccMailArr = this.entity.ccEmail.split(',');
            this.entity.ccEmail = ccMailArr.map(function(x) { 
                return { 
                    label: x, 
            }
            });

            let toMailArr = this.entity.toEmail.split(',');
            this.entity.toEmail = toMailArr.map(function(x) { 
                return { 
                    label: x, 
            }
            });
        }
    }
}
</script>
<style scoped>
</style>
