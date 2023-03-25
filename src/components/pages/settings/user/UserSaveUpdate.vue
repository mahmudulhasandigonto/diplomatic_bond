<template>
    <div>
        <div class="loading" v-if="progressBar.loading"></div>
            <router-link :to="{ name: 'User' }"  tag="span" class="button-tooltip pt-1 pl-3 float-left">
                <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                <span class="button-tooltiptext">Back</span>
            </router-link>
            <br>
        <div class="container-fluid ">
            <div class="row " >
                <div class="col-12 col-md-12 col-sm-12">
                    <fieldset class="well" >
                        <legend class="well-legend"> <b> User Details </b></legend> 
                        <div class="row">
                            <div class="col-12 col-md-6 col-sm-6">
                              
                                <div class="mb-3">
                                    <label class="required"> <b> Full Name </b></label>
                                    <input type="text" class="form-control mb-1" v-model="entity.name" placeholder=" User's Name" v-validate="'required'" name="User Name">
                                    <small v-show="errors.has('User Name')" class="help is-danger"><i v-show="errors.has('User Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('User Name') }} </small>

                                </div>
                                <div class="mb-3">
                                    <label class="required" > <b> Login ID </b></label>
                                    <input type="text" class="form-control mb-1" v-model="entity.loginId" placeholder=" User Login ID" v-validate="'required'" name="Login ID">
                                    <small v-show="errors.has('Login ID')" class="help is-danger"><i v-show="errors.has('Login ID')" class="fa fa-exclamation-circle"></i>{{ errors.first('Login ID') }} </small>
                                </div>
                                <div class="mb-3">
                                    <label class="required" > <b> Password </b></label>
                                    <input type="password" class="form-control mb-1" v-model="entity.password" placeholder=" Password " v-validate="'required|alpha_num|min:6'" name="Password">
                                    <small v-show="errors.has('Password')" class="help is-danger"><i v-show="errors.has('Password')" class="fa fa-exclamation-circle"></i>{{ errors.first('Password') }} </small>
                                </div>
                                <div class="mb-3">
                                    <label class="required" > <b> Role </b></label>
                                    <model-list-select class="form-control mb-1" :list="roleList" v-model="entity.roleOid" option-value="oid" optionText="roleId" placeholder="Select Role" v-validate="'required'" name="Role" @input="role(entity.roleOid)"/>
                                    <small v-show="errors.has('Role')" class="help is-danger"><i v-show="errors.has('Role')" class="fa fa-exclamation-circle"></i>{{ errors.first('Role') }} </small>

                                </div>
                                <div class="mb-3">
                                    <label class=" required" > <b> Status </b></label>
                                    <model-list-select class="form-control mb-1" :list="statusList" v-model="entity.status" option-value="status" optionText="statusText" placeholder="User Status" v-validate="'required'" name="User Status"/>
                                    <small v-show="errors.has('User Status')" class="help is-danger"><i v-show="errors.has('User Status')" class="fa fa-exclamation-circle"></i>{{ errors.first('User Status') }} </small>
                                </div>
                                <div class="mb-3">
                                    <label class=" required"> <b> Email</b></label>      
                                    <!--:class="{ 'is-danger': errors.has('email') }"-->
                                    <input  class="form-control mb-1" v-model="entity.email"  v-validate="'required|email'" name="email" type="email" placeholder="User's Email Address" >
                                    <small v-show="errors.has('email')" class="help is-danger"><i v-show="errors.has('email')" class="fa fa-exclamation-circle"></i>{{ errors.first('email') }} </small>
                                </div>
                                 <div class="mb-3">
                                    <label class=""> <b> Designation </b></label>
                                    <input type="text" class="form-control mb-1" v-model="entity.designation" placeholder=" User's Designation">
                                </div>
                                 <div class="mb-3">
                                    <label class=" required"> <b> Mobile Number</b></label>
                                    <input type="text"  class="form-control mb-1" v-model="entity.mobileNo" v-validate="'required|digits:11'" name="Mobile Number" placeholder=" User's Mobile Number">
                                    <small v-show="errors.has('Mobile Number')" class="help is-danger"><i v-show="errors.has('Mobile Number')" class="fa fa-exclamation-circle"></i>{{ errors.first('Mobile Number') }} </small>
                                </div>
                                <div class="mb-3" v-if = 'entity.roleOid == "aroofficer" || entity.roleOid == "roofficer" || entity.roleOid=="warehouseadmin" || entity.roleOid=="warehouseoperation"'>
                                    <label class=" required" > <b> Duty Paid Status </b></label>
                                    <model-list-select class="form-control mb-1" :list="dutyPaidSatus" v-model="entity.dutyPaid" option-value="status" optionText="statusText" placeholder="Duty Paid Status" v-validate="'required'" name="Duty Paid Status"/>
                                    <small v-show="errors.has('Duty Paid Status')" class="help is-danger"><i v-show="errors.has('Duty Paid Status')" class="fa fa-exclamation-circle"></i>{{ errors.first('Duty Paid Status') }} </small>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-sm-6">    
                                <div class="mb-3">
                                    <!-- <div v-if= "imageShow">
                                        <img :src="photoPath" width="300" height="300">                         
                                    </div> -->
                                    <img :src="photoPath" width="300" height="300">
                                </div>
                                <div class="mb-3">
                                    <label> <b> Upload Photo</b></label>
                                    <input type="file" color="green" name="File Upload" id="file" class="form-control-file mb-1 inputfile"  accept="image/*" ref="file" v-on:change="fileUpload($event)">
                                    <!-- <label for="file" class="ripple"> <i class="fa fa-upload"></i> Choose a file</label> -->
                                    <v-progress-linear v-model="uploadProgress.progress" v-show="uploadProgress.show" height="5" color="green"> </v-progress-linear>
                                    <!-- <small v-show="errors.has('File Upload')" class="help is-danger"><i v-show="errors.has('File Upload')" class="fa fa-exclamation-circle"></i>{{ errors.first('File Upload') }} </small> -->
                                </div>
                                
                                <div class="mb-3">
                                    <label> <b> Address</b></label>
                                    <textarea class="form-control" rows="1" v-model="entity.address" placeholder=" User's Address"></textarea>
                                </div>
                                <div class="mb-3" v-if = 'entity.roleOid == "aroofficer" || entity.roleOid == "roofficer" || entity.roleOid=="warehouseadmin" || entity.roleOid=="warehouseoperation"'>
                                <!-- <div class="mb-3"> -->
                                    <label> <b> Warehouse</b></label>
                                    <model-list-select class="form-control mb-1" :list="warehouseinfoList" v-model="entity.warehouseOid" option-value="oid" optionText="warehouseName" placeholder="Select Warehouse Name" v-validate="'required'" name="Warehouse"/>
                                    <small v-show="errors.has('Warehouse')" class="help is-danger"><i v-show="errors.has('Warehouse')" class="fa fa-exclamation-circle"></i>{{ errors.first('Warehouse') }} </small>
                                </div>
                                <div class="mb-3">
                                    <label> <b> Employee ID</b></label>
                                    <textarea class="form-control" rows="1" v-model="entity.employeeID" placeholder=" Employee ID"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label><b>NID Number</b></label>
                                    <input class="form-control" placeholder="NID Number" v-model="entity.nidNumber" name="NID Number" autocomplete="off"> 
                                <!-- <small v-show="errors.has('File Number')" class="help is-danger"><i v-show="errors.has('File Number')" class="fa fa-exclamation-circle"></i>{{ errors.first('File Number') }} </small> -->
                                </div>
                                <div class="mb-3" v-if="this.entity.roleOid=='fmofficer'">
                                    <label> <b> Upload FM Officer Signature</b></label>
                                    <input type="file" color="green" name="FM Signature" id="file" class="form-control-file mb-1 inputfile"  accept="image/*" ref="file" v-on:change="signatureFileileUpload($event)">
                                    <!-- <label for="file" class="ripple"> <i class="fa fa-upload"></i> Choose a file</label> -->
                                    <v-progress-linear v-model="signatureUploadProgress.progress" v-show="signatureUploadProgress.show" height="5" color="green"> </v-progress-linear>
                                    <!-- <small v-show="errors.has('File Upload')" class="help is-danger"><i v-show="errors.has('File Upload')" class="fa fa-exclamation-circle"></i>{{ errors.first('File Upload') }} </small> -->
                                </div>
                                
                                <!-- <div class="mb-3">
                                    <label> <b> Photo</b></label>
                                    <textarea class="form-control" rows="1" v-model="entity.photoPath" placeholder=" Photo"></textarea>
                                </div> -->
                            </div>
                        </div>
                    </fieldset>
                    <div class="text-center">
                        <button class="btn btn-success button-width ripple mr-3" @click="userSaveUpdate()">
                            {{buttonText}}
                        </button>
                        <router-link tag="button" class="btn btn-danger ripple button-width" :to="{name:'User'}" >
                            Cancel
                        </router-link>
                    </div>
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
</template>
<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import { MultiListSelect, ModelListSelect} from 'vue-search-select';
import * as _ from 'underscore';
import { saveAs } from 'file-saver';
import axios from 'axios';

export default {   
    components: {
      ModelListSelect, MultiListSelect
    },
     data(){
        return{
            statusList:[
                {status:'Active', statusText:'Active'},
                {status:'Inactive', statusText:'Inactive'},              
            ],
            dutyPaidSatus:[
                {status:'1', statusText:'Yes'},
                {status:'0', statusText:'No'},              
            ],
            roleList:[],
            photoPath: localStorage.getItem("lumos_photopath"),
            entity:{
                //menuJson:[],
                dataJson: { 
                    organizationOid:''
                }

            },
            organizationList: [],
            customerList: [],
            siteList: [],
            assetOwnerList:[],
            multiOrganization: [],
            multiCustomer: [],
            multiSite: [],
            warehouseinfoList:[],
            buttonText:'',
            imageShow: false,
            progressBar:{
                loading: false,
                show: false
            },
            uploadProgress:{
                progress:"",
                show:""
            },
            signatureUploadProgress:{
                progress:"",
                show:""
            },
            size:"50px",
            snackbar: false,
            y: "bottom",
            x: "right",
            mode: "",
            color: "",
            abc: "",
            timeout: 2000,
            messageText: "",
            roleOid:  localStorage.getItem("lumos_roleOid")
        }
    },
    mounted(){
        this.getRoleList();
        this.init();
    },
    methods:{
        init(){
            this.getWarehouseList();
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getUser(this.$route.params.id)
            } else {
                this.buttonText = "Save"                
            }   
            console.log(this.photoPath);
        },        
        getRoleList(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.authorization_user_v1_get_roleList, body);
            lumos_client.onPost(url.authorization_user_v1_get_roleList, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                if(localStorage.getItem("lumos_roleOid")=='sa'){
                    this.roleList = result['data']['body']['data'];         
                } else {
                    this.roleList = result['data']['body']['data'].filter((x)=>{if(x.oid === 'fmoperator'){return x}});
                    this.entity.roleOid = this.roleList[0].oid; 
                }
            }).catch(error =>{
            });

        },
        fileUpload(event){
            let formData = new FormData();
            formData.append('file',event.target.files[0], event.target.files[0].name );
            this.uploadProgress.show = true;
            lumos_client.onUpload(url.master_document_v1_upload+'?folderName=profileImage', formData,  {
                onUploadProgress: uploadEvent => {
                    this.uploadProgress.valueDeterminate =  Math.round(uploadEvent.loaded / uploadEvent.total*100) 
                }
            }).then(result => {
                this.entity.photoPath = result.data;
                this.abc = url.baseUrl + url.authentication_user_v1_download + this.entity.photoPath;                
                this.imageShow = true;
                // console.log(this.entity.photoPath);                
            }).catch(error => {
            });
        },
        signatureFileileUpload(event){
            let formData = new FormData();
            formData.append('file',event.target.files[0], event.target.files[0].name );
            this.signatureUploadProgress.show = true;
            lumos_client.onUpload(url.master_document_v1_upload+'?folderName=signatures/fmSignature', formData,  {
                onUploadProgress: uploadEvent => {
                    this.signatureUploadProgress.valueDeterminate =  Math.round(uploadEvent.loaded / uploadEvent.total*100) 
                }
            }).then(result => {
                this.entity.fmSignature = result.data;
                // this.abc = url.baseUrl + url.authentication_user_v1_download + this.entity.fmSignature;                
                // this.imageShow = true;
                console.log(this.entity.fmSignature);                
            }).catch(error => {
            });
        },
        getDownload() {
            this.progressBar.loading = true;
            this.progressBar.show = true;
                axios.get(url.baseUrl+url.master_document_v1_download+ this.entity.photoPath, {
                    responseType: 'blob',
                }).then(response => {
                    this.progressBar.loading = false;
                    let fileName = profile + '.jpg';
                    saveAs(response.data, fileName)
                }).catch(error =>{
                    console.log(error)
                })
        },
        getWarehouseList(){
            let body = {};
            let req = constant.getRequest(url.master_warehouseinfo_v1_get_list, body);
            lumos_client.onPost(url.master_warehouseinfo_v1_get_list, req)
            .then(result => {
                this.warehouseinfoList = result['data']['body']['data'];
                // if(localStorage.getItem("lumos_roleId")=='SA'){
                    
                // } else {
                //     let warehouseOid = localStorage.getItem("lumos_warehouseOid"); 
                //     this.warehouseinfoList = result['data']['body']['data'].filter((x)=>{if(x.oid === warehouseOid){return x}});                
                //     //this.entity.warehouseOid = this.warehouseinfoList[0].oid;
                // }
                           
            }).catch(error => {
            });
        },
        role(role) {
            this.roleList.forEach((cat) => {
                if (cat.oid === role){
                    let catSpecification =   JSON.parse (cat.accessJson)                    
                    const removeEnable = (catSpecification) => 
                        Array.isArray(catSpecification) ? catSpecification.filter(x => 
                        x.enable!= false).map(x => removeEnable(x)) :
                        typeof(catSpecification) == 'object' ? Object.entries(catSpecification).reduce((r, [k,v]) => 
                        (r[k] = removeEnable(v), r), {}) : catSpecification
                        
                    this.entity.menuJson = removeEnable(catSpecification)        
                    return;
                }
            });
        },
        getUser(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.authentication_user_v1_get_by_oid, body);
            lumos_client.onPost(url.authentication_user_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                if(this.entity.photoPath){
                    this.abc = url.baseUrl + url.authentication_user_v1_download + this.entity.photoPath;                
                    this.imageShow = true;     
                }        
                this.oidModifier(this.entity); 
            }).catch(error =>{
            });

         },
        userSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.authentication_user_v1_update;                
                } else {    
                    http_url = url.authentication_user_v1_save;
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
                        this.color = "error"; 
                        this.messageText = result.data.body.data;
                        return;
                    }
                    this.color = "success"; 
                    if(this.$route.params.id){
                        this.messageText = "User Updated Successfully";
                         setTimeout( () => this.$router.push({name:'User'}), 3000);
                    } else {
                        this.messageText = "User Added Successfully";
                        this.uploadProgress = {}
                        // this.sendMail()
                        setTimeout( () => this.$router.push({name:'User'}), 3000);
                        // setTimeout( () => (this.entity = {}, this.multiCustomer = [], this.multiSite= []), 2000)
                    }
                }).catch(error => {
                    this.$log.error(error)
                })               
            }); 
        },
        modifier(entity){
            var obj = _.clone(entity);
            // if(this.roleOid !=='SA'){
            //     let orgOid = JSON.parse(localStorage.getItem("lumos_dataJson")) 
            //     obj.dataJson.organizationOid = orgOid.organizationOid
            // }
            let orgOid = JSON.parse(localStorage.getItem("lumos_dataJson")) 
            if(typeof obj.dataJson == "string"){
                obj.dataJson = JSON.parse(obj.dataJson);
            }
            obj.dataJson.organizationOid = orgOid.organizationOid;
            obj.menuJson = JSON.stringify(entity.menuJson);
            obj.dataJson = JSON.stringify(entity.dataJson)
            return obj;
        },
        oidModifier(obj){
            obj.menuJson = JSON.parse(obj.menuJson);
            obj.dataJson = JSON.parse(obj.dataJson);
            return obj
        },
        deleteFilterCustomer(index, item){
            item.splice(index, 1);
            this.selectCustomer(item)
        },
        deleteFilterSite(index, item){
            item.splice(index, 1);
            this.selectSite(item)
        },   
        sendMail(){
            let body ={
                emailPublisher:'email',
                type: 'New User',
                toEmail: this.entity.email,
                assetName:"",
                category:"",
                assetStatus:"",
                ownerName:"",
                assetOid:"",
                issueNumber:"",
                requisitionOid:"",
                loginId: this.entity.loginId,
            }
            let req = constant.getRequest(url.master_email_v1_send_email, body);
            lumos_client.onPost(url.master_email_v1_send_email, req)
            .then(result => {
            }).catch(error =>{
            });
        },
    }
    
}
</script>
<style scoped>
.tree ul {
  margin:0 0 0 1em; /* indentation */
  padding:0;
  list-style:none;
  color:#369;
  position:relative;
  border-left:1px solid;
  cursor: pointer;
  /* margin-bottom: 10px */
}

.tree ul {margin-left:.5em} /* (indentation/2) */

.tree:before,
.tree ul:before {
  content:"";
  display:block;
  width:0;
  position:absolute;
  top:0;
  bottom:0;
  left:0;
   /* border-left:1px solid; */
}

.tree li {
  margin:0;
  padding:0 1.5em; /* indentation + .5em */
  line-height:2em; /* default list item's `line-height` */
  font-weight:bold;
  position:relative;
  cursor: pointer;
  border-left:1px solid;
}

.tree li:before {
  content:"";
  display:block;
  width:10px; /* same with indentation */
  height:0;
  border-top:1px solid;
  margin-top:-1px; /* border top width */
  position:absolute;
  top:.7em; /* (line-height/2) */
  left:0;
  
}

.tree li:last-child:before {
  background:white; /* same with body background */
  height:auto;
  top:.7em; /* (line-height/2) */
  bottom:0;
}

li{
    list-style: none;
}

</style>
