<template>
  <div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <v-app  id="inspire" class="container-fluid" >
     <div class="">
        <div class="asset-top-panel">
            <div class="row col-12  nopadding">
                <router-link tag="button"  v-if="showButton()" class="btn btn-success ripple" style="background-color:#3f740d; border:none;" :to="{name:'NewBasicProfile'}">
                    <i class="fa fa-plus"></i>  
                    Create Basic Profile
                </router-link>
                <span style="margin-left:auto;">
                    <input v-model="search" class="form-control" placeholder="Search...">                  
                </span>
             </div> 
        </div>
       <!--  For NBR OFFICER  -->
        <div v-if="checkUser()=='nbrofficer'" class="">
            <v-data-table
                :headers="headers"
                :items="entity"
                :search="search"
                :pagination.sync="pagination"
                :rows-per-page-items="rowsPerPageItems"
                @update:pagination="updatePagination"        
            >
            <template slot="items" slot-scope="props" >
                <td class="text-xs-left w-12">{{ props.item.userType }}</td>
                <td class="text-xs-left w-20">{{ props.item.fileNumber}}</td>
                <td class="text-xs-left w-12">{{ props.item.fileDate }}</td>
                <td class="text-xs-left w-10">{{ props.item.createdBy }}</td>
                <!-- <td class="text-xs-left w-10">{{ props.item.updatedBy }}</td> -->
                <td class="text-xs-left w-15" v-if=" props.item.state ===0">
                    <span style="background-image: linear-gradient(to right, #35A3D6 , #35A3D6); color: white; padding: 2px; border-radius: 2px; ">Profile Saved</span>
                </td>
                <td class="text-xs-left w-15" v-if=" props.item.state === 1">
                    <span style="background-image: linear-gradient(to right, #DC8B0F , #ffa31a); color: white; padding: 2px; border-radius: 2px; ">Profile Sent To Bond</span>
                </td>               
                <td class="text-xs-left w-15" v-if=" props.item.state === 2">
                    <span style="background-image: linear-gradient(to right, #7E685A , #7E685A); color: white; padding: 2px; border-radius: 2px; ">Profile Updated By Bond</span>
                </td>                
                <td class="text-xs-left w-15" v-if=" props.item.state === 3">
                    <span style="background-image: linear-gradient(to right, #4caf50 , #45772C); color: white; padding: 2px; border-radius: 2px; "> Articles Allocated </span>
                </td>              
                
                <td class="text-left w-10">
                    <router-link
                        tag="span" 
                        :to="{name:'BasicProfile View', params: { id: props.item.oid }}"
                        class="btn-icon-default button-tooltip mr-2">
                        <i class="fa fa-eye" aria-hidden="true" style="color:steelblue"></i>
                        <span class="button-tooltiptext">View</span>
                    </router-link>
                    <button class=" btn-icon-default button-tooltip mr-3"
                     v-on:click.prevent='getDownload(props.item.filePath, props.item.fileNumber)'> 
                        <i class="fa fa-download" aria-hidden="true"></i>
                        <span class="button-tooltiptext">Download</span>
                    </button>
                    <router-link
                        tag="span" 
                        v-if="props.item.state<1"
                        :to="{name:'Update BasicProfile', params: { id: props.item.oid }}"
                        class=" btn-icon-default button-tooltip mr-2">
                        <i class="fa fa-edit" aria-hidden="true"></i>
                        <span class="button-tooltiptext">Edit</span>
                    </router-link>
                                       
                </td>
            </template>
            <v-alert slot="no-results-text" :value="true"   icon="warning">
                Your search for " {{ search }} " found no results.
            </v-alert>
            </v-data-table>    
        </div>

        <!--  For FM OFFICER  -->
        <div v-if="checkUser()=='fmofficer' || checkUser()=='fmoperator'" class="">
            <v-data-table
                :headers="headers"
                :items="entity"
                :search="search"
                :pagination.sync="pagination"
                :rows-per-page-items="rowsPerPageItems"
                @update:pagination="updatePagination"        
            >
            <template slot="items" slot-scope="props" >
                <td class="text-xs-left w-10">{{ props.item.userType }}</td>
                <td class="text-xs-left w-20">{{ props.item.fileNumber}}</td>
                <!-- <td class="text-xs-left w-25">{{ props.item.slNo}}</td> -->
                <td class="text-xs-left w-10">{{ props.item.fileDate }}</td>
                <td class="text-xs-left w-5">{{ props.item.createdBy }}</td>
                <!-- <td class="text-xs-left w-10">{{ props.item.updatedBy }}</td> -->
                
                <td class="text-xs-left w-15" v-if=" props.item.state === 2">
                    <span style="background-image: linear-gradient(to right, #35A3D6, #35A3D6); color: white; padding: 2px; border-radius: 2px; ">Profile Saved</span>
                </td>                
                <td class="text-xs-left w-15" v-if=" props.item.state === 3">
                    <span style="background-image: linear-gradient(to right, #7E685A, #7E685A); color: white; padding: 2px; border-radius: 2px; "> Articles Allocated </span>
                </td>
                <td class="text-xs-left w-15" v-if=" props.item.state === 4">
                    <span style="background-image: linear-gradient(to right, #4caf50 , #45772C); color: white; padding: 2px; border-radius: 2px; "> Profile Sent To Bond</span>
                </td>
                                
                <td class="text-left w-15">
                    
                    
                    <!--<button class=" btn-icon-default button-tooltip mr-3"
                     v-on:click.prevent='getDownload(props.item.filePath, props.item.fileNumber)'> 
                        <i class="fa fa-download" aria-hidden="true"></i>
                        <span class="button-tooltiptext">Download File</span>
                    </button>-->
                    <router-link
                        tag="span" 
                        :to="{name:'Update BasicProfile', params: { id: props.item.oid }}"
                        class=" btn-icon-default button-tooltip mr-2">
                        <i class="fa fa-edit" aria-hidden="true"></i>
                        <span class="button-tooltiptext">Edit</span>
                    </router-link>
                    <router-link
                        tag="span"
                        :to="{name:'ExemptionProfile View', params: { id: props.item.oid }}"
                        class=" btn-icon-default button-tooltip mr-2">
                        <i class="fa fa-eye" aria-hidden="true" style="color:steelblue"></i>
                        <span class="button-tooltiptext">View</span>
                    </router-link>
                    <button class=" btn-icon-default button-tooltip mr-3"
                     v-on:click.prevent='getPdf(props.item.slNo)' :disabled="props.item.state < 4"> 
                        <i class="fa fa-download" style="font-size:15px; color: green;" aria-hidden="true"></i>
                        <span class="button-tooltiptext">Download Exemption Certificate</span>
                    </button>
                    <router-link
                        tag="span"
                        v-if="props.item.state<3"                                               
                        :to="{name:'Update GeneralProfileTransaction', params: {type: 'update', id: props.item.gptOid, pid: props.item.oid}}"
                        class=" btn-icon-default button-tooltip mr-2">
                        <i class="fa fa-check" aria-hidden="true" style="color:steelblue"></i>
                        <span class="button-tooltiptext">Assign Articles</span>
                    </router-link>                 
                </td>
            </template>
            <v-alert slot="no-results-text" :value="true"   icon="warning">
                Your search for " {{ search }} " found no results.
            </v-alert>
            </v-data-table>    
        </div>

        <!-- For SA User -->
        <div v-if="checkUser()=='sa'">
            <v-data-table
                :headers="headers"
                :items="entity"
                :search="search"
                :pagination.sync="pagination"
                :rows-per-page-items="rowsPerPageItems"
                @update:pagination="updatePagination"        
            >
            <template slot="items" slot-scope="props" >
                <td class="text-xs-left w-10">{{ props.item.userType }}</td>
                <td class="text-xs-left w-25">{{ props.item.fileNumber}}</td>
                <td class="text-xs-left w-10">{{ props.item.fileDate }}</td>
                <td class="text-xs-left w-10">{{ props.item.createdBy }}</td>
                <!-- <td class="text-xs-left w-10">{{ props.item.updatedBy }}</td> -->
                
                <td class="text-xs-left w-15" v-if=" props.item.state <= 2">
                    <span style="background-image: linear-gradient(to right, #ffff1a , #e6e600); color: black; padding: 2px; border-radius: 2px; ">Profile Saved</span>
                </td>                
                <td class="text-xs-left w-15" v-if=" props.item.state === 3">
                    <span style="background-image: linear-gradient(to right, #c6ff1a , #d9ff66); color: black; padding: 2px; border-radius: 2px; "> Articles Allocated </span>
                </td>
                <td class="text-xs-left w-15" v-if=" props.item.state === 4">
                    <span style="background-image: linear-gradient(to right, #4caf50 , #45772C); color: white; padding: 2px; border-radius: 2px; "> Profile Sent To Bond</span>
                </td>
                                
                <td class="text-left w-10">
                    <router-link
                        tag="span" 
                        :to="{name:'BasicProfile View', params: { id: props.item.oid }}"
                        class=" btn-icon-default button-tooltip mr-2">
                        <i class="fa fa-eye" aria-hidden="true" style="color:steelblue"></i>
                        <span class="button-tooltiptext">View</span>
                    </router-link>
                    <!-- <button class=" btn-icon-default button-tooltip mr-3"
                     v-on:click.prevent='getDownload(props.item.filePath, props.item.fileNumber)'> 
                        <i class="fa fa-download" aria-hidden="true"></i>
                        <span class="button-tooltiptext">Download</span>
                    </button>
                    <router-link
                        tag="span"                                               
                        :to="{name:'Update GeneralProfileTransaction', params: {type: 'update', id: props.item.gptOid, pid: props.item.oid}}"
                        class=" btn-icon-default button-tooltip mr-2">
                        <i class="fa fa-check" aria-hidden="true" style="color:steelblue"></i>
                        <span class="button-tooltiptext">Assign Articles</span>
                    </router-link>
                    <router-link
                        tag="span" 
                        v-if="props.item.state<4"
                        :to="{name:'Update BasicProfile', params: { id: props.item.oid }}"
                        class=" btn-icon-default button-tooltip mr-2">
                        <i class="fa fa-edit" aria-hidden="true"></i>
                        <span class="button-tooltiptext">Edit</span>
                    </router-link>                    -->
                </td>
            </template>
            <v-alert slot="no-results-text" :value="true"   icon="warning">
                Your search for " {{ search }} " found no results.
            </v-alert>
            </v-data-table>
        </div>
        </div>
    </v-app>
  </div>
</template>

<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import { saveAs } from 'file-saver';
import axios from 'axios';
export default {
    name: "BasicProfile",
    data(){
        return{
            entity:[],
            headers: [
                  { text: "User Type", value: "userType", align: "left" },
                  { text: "File Number", value: "fileNumber", align: "left" },
                  { text: "File Date", value: "fileDate", align: "left" },
                  { text: "Created By", value: "createdBy", align: "left" },
                //   { text: "Updated By", value: "updatedBy", align: "left" },
                  { text: "Profile Status", value: "profileStatus", align: "left" },
                  { text: "", value: "", align: "center", sortable: false }
            ],
            pagination: {},
            dateEntity:{},
            rowsPerPageItems: [15, 20, 30, 50],
            search: "",
            progressBar: {
                loading: false,
                show: false
            },
            dialog:false,    

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
    created(){
        this.getBasicProfile()
        this.init()
    }, 
    methods:{
        init(){
            if(localStorage.getItem("lumos_roleOid")=='fmofficer' || localStorage.getItem("lumos_roleOid")=='fmoperator'){
             this.headers[1].text = "SL Number";   
            }else{
            this.headers[1].text = "File Number";   
            }  
        },
        updatePagination (pagination) {
            let limit = pagination.rowsPerPage
            let offset = (pagination.page - 1) * limit;
        },
        showButton(){
            if(localStorage.getItem("lumos_roleOid")=='fmofficer' || localStorage.getItem("lumos_roleOid")=='fmoperator' || localStorage.getItem("lumos_roleOid")=='nbrofficer'){
                return true;
            } else {
                return false;
            }
        },
        checkUser(){
            if(localStorage.getItem("lumos_roleOid")=='nbrofficer'){
                return 'nbrofficer';
            } else if(localStorage.getItem("lumos_roleOid")=='fmofficer'){
                return 'fmofficer';
            } else if(localStorage.getItem("lumos_roleOid")=='fmoperator'){
                return 'fmoperator';
            }else if(localStorage.getItem("lumos_roleOid")=='sa'){
                return 'sa';
            }
        },
        showArticles(){
           if(localStorage.getItem("lumos_roleOid")=='fmofficer'){
               return true;
           } else {               
               return false;
           }
        },
        getDownload(filePath, fileNumber) {
            this.progressBar.loading = true;
            this.progressBar.show = true;
                axios.get(url.baseUrl+url.master_document_v1_download+ filePath, {
                    responseType: 'blob',
                }).then(response => {
                    this.progressBar.loading = false;
                    let fileName = fileNumber + '.pdf';
                    saveAs(response.data, fileName)
                }).catch(error =>{
                    console.log(error)
                })
        },
        getPdf(slNo) {
            this.progressBar.loading = true;
            this.progressBar.show = true;
            this.dateEntity.slNo = slNo;
            this.dateEntity.reportType = "exemptionCertificate";
            let body =  this.dateEntity;
            let req = constant.getRequest(url.operation_report_v1_get_foreign_ministry_export, body);
            lumos_client.onPost(url.operation_report_v1_get_foreign_ministry_export, req)
                .then((result) => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                let res = result.data.header.responseCode;
                if (res != "200"){
                    this.snackbar = true;
                    this.color = "red"; 
                    this.messageText = result.data.body.info;
                    return;
                }
                axios.get(url.baseUrl + url.operation_report_v1_download + result.data.body.fileName,
                    {
                        responseType: "blob",
                    }
                    )
                    .then((response) => {
                    this.progressBar.loading = false;
                    saveAs(response.data, result.data.body.fileName);
                    })
                    .catch((error) => {
                    console.log(error);
                    });
                // window.open(url.baseUrl + url.operation_report_v1_download + result.data.body.fileName,"_blank");
                })
                .catch((error) => {
                console.log(error);
                })
        },
        getBasicProfile(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.master_basicprofile_v1_get_list, body);
            lumos_client.onPost(url.master_basicprofile_v1_get_list, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                // let resultData = [];
                // resultData = result['data']['body']['data'];
                
                this.entity = result['data']['body']['data'];
                
            }).catch(error => {
            });
        }
    }
}

</script>

<style scoped>
.assetCategory-list{
    background: white;
    padding: 10px 10px;
    width:auto;
}
.table-responsive {
  overflow-y: visible;
  overflow-x: visible;
}
</style>