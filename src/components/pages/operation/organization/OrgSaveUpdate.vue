<template>
    <div class="asset-form">
        <div class="loading" v-if="progressBar.loading"></div>
            <div class="container-fluid">
                <router-link :to="{ name: 'Organization' }"  tag="span" class="button-tooltip pt-1 float-left">
                    <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
                <div class="row justify-content-center">
                    <div class="col-12 col-md-6 col-xl-6">
                        <div class="new-category-save">
                            <div class="mt-3 ml-3 mr-3 mb-3">
                                <div class="mb-3">
                                    <label class=" required" > <b> Organization Name</b></label>
                                    <input type="text" class="form-control" v-model="entity.orgName" placeholder=" Organization Name" v-validate="'required'" name="Organization Name" autocomplete="off">
                                    <small v-show="errors.has('Organization Name')" class="help is-danger"><i v-show="errors.has('Organization Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('Organization Name') }} </small>
                                </div>
                                <div class="mb-3">
                                    <label> <b> Organization Address</b></label>
                                    <textarea class="form-control" rows="1" v-model="entity.address" placeholder=" Organization Address"> </textarea>
                                </div>
                                <div class="mb-3">
                                    <label> <b> Organization URL</b></label>
                                    <input type="text" class="form-control" v-model="entity.url" placeholder=" Organization URL" autocomplete="off" >
                                </div>
                                <div class="mb-3">
                                    <label class=" required" > <b> Organization Logo</b></label>
                                    <div class="">
                                        <input type="file" name="file" id="file" class="form-control-file mb-1 inputfile"  accept="image/*" ref="file" v-on:change="fileUpload($event)"/>
                                        <label for="file" class="ripple"> <i class="fa fa-upload"></i> Choose a file</label>
                                        <v-progress-linear v-model="uploadProgress.progress" v-show="uploadProgress.show" height="5" color="green"> </v-progress-linear> 
                                        <!-- <v-simple-progress size="large"   v-model="uploadProgress.progress" v-show="uploadProgress.show" :val="60" text="60%"></v-simple-progress> -->
                                    </div>
                                    <div v-if="entity.logo">
                                        <button class="btn btn-success" @click='getDownload()'> <i class="fa fa-download"></i></button>

                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class=" required" > <b> Organization Status</b></label>
                                    <model-list-select class="form-control" :list="statusList" v-model="entity.status" option-value="status" optionText="statusText" placeholder="Organization Status" v-validate="'required'" name="Organization Status"/>
                                    <small v-show="errors.has('Organization Status')" class="help is-danger"><i v-show="errors.has('Organization Status')" class="fa fa-exclamation-circle"></i>{{ errors.first('Organization Status') }} </small>
                                </div> 
                                <div class="text-center mt-4">
                                    <button class="btn btn-success button-width ripple mr-3" @click="orgSaveUpdate()">
                                        {{buttonText}}
                                    </button>
                                    <router-link tag="button" class="btn btn-danger ripple button-width" :to="{name:'Organization'}" >
                                        Cancel
                                    </router-link>
                                </div>
                            </div>
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
import { ModelListSelect} from 'vue-search-select';
import { saveAs } from 'file-saver';
import axios from 'axios';
import * as _ from 'underscore';
export default {   
    components: {
        ModelListSelect
    },
    data(){
        return{
            entity:{orgName:'', address:'', url:'', logo:"",status:''},
            statusList:[
                {status:'Active', statusText:'Active'},
                {status:'Inactive', statusText:'Inactive'},              
            ],
            buttonText:'',
            progressBar:{
                loading: false,
                show: false
            },
            uploadProgress:{
                progress:"",
                show:""
            },
            size:"50px",
            snackbar: false,
            y: "bottom",
            x: "right",
            mode: "",
            color: "",
            timeout: 2000,
            messageText: "",
        }
    },
    mounted(){
        this.init()  
    },
    methods:{ 
        init(){
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getOrganization(this.$route.params.id)
            } else {
                this.buttonText = "Save"
            }      
        },
        getOrganization(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.meta_organization_v1_get_by_oid, body);
            lumos_client.onPost(url.meta_organization_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
            }).catch(error =>{
            });
        },
        orgSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.meta_organization_v1_update;                
                } else {    
                    http_url = url.meta_organization_v1_save;
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
                       //this.messageText = result.data.header.responseMessage;
                       this.messageText = result.data.body.data;
                        return;
                    }
                    this.color = "success"; 
                    if(this.$route.params.id){
                        this.messageText = "Organization Updated Successfully";
                         setTimeout( () => this.$router.push({name:'Organization'}), 3000);
                    } else {
                        this.messageText = "Organization Saved Successfully";
                        this.uploadProgress = {}
                        setTimeout( () => this.entity = {orgName:'', address:'', url:'', logo:"",status:''}, 2000)  
                    }
                }).catch(error => {
                    this.$log.error(error)
                })               
            });
        },
        modifier(entity){
            var obj = _.clone(entity);
            obj.dataJson = JSON.stringify({});
            return obj;
        },
        fileUpload(event){
            let formData = new FormData();
           // let folderName = 'orgdest';
            formData.append('file',event.target.files[0], event.target.files[0].name );
            this.uploadProgress.show = true;
            lumos_client.onUpload(url.master_document_v1_upload+'?folderName=orgdir', formData,  {
                onUploadProgress: uploadEvent => {
                    this.uploadProgress.valueDeterminate =  Math.round(uploadEvent.loaded / uploadEvent.total*100) 
                }
            }).then(result => {
                this.entity.logo = result.data;
            }).catch(error => {
            });
        },
        getDownload() {
            // window.open(url.baseUrl + url.master_document_v1_download+ this.entity.logo, "_blank");

            this.progressBar.loading = true;
            this.progressBar.show = true;
            // let body = {};
            // let req = constant.getRequest(url.operation_report_v1_get_dc_list_csv, body);
            // lumos_client.onPost(url.operation_report_v1_get_dc_list_csv, req)
            // .then(result => {
            //     let res = result.data.header.responseCode;
               
                axios.get(url.baseUrl+url.master_document_v1_download+ this.entity.logo, {
                    responseType: 'blob',
                }).then(response => {
                    this.progressBar.loading = false;
                    saveAs(response.data, "Org LOGO")
                }).catch(error =>{
                    console.log(error)
                })
            // })
            // .catch(error =>{
            //     console.log(error)
            // });

     
        }

    }
}
</script>
<style scoped>
.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
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
</style>