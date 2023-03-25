<template>
<div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 d-inline-flex">
                <div>
                    <router-link :to="{ name: 'BasicProfile' }"  tag="span" class="button-tooltip pt-1 float-left">
                        <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                        <span class="button-tooltiptext">Back</span>
                    </router-link>
                </div>
            </div>
        </div>
        <br>
        <div class="row">            
            <div class="page">
                <div class="">
                    <!-- <div class="profile-button">
                    <span class="button-tooltip">
                        <i class="fa fa-print" aria-hidden="true" @click="report()"></i>
                        <span class="button-tooltiptext">Print</span>
                    </span>
                    </div> -->
                    <div class="basic-info">
                        <h4><u>Basic Profile</u></h4>
                                                
                        <hr class="hr2">
                        <h5> Basic Profile Information ({{entity.userType}})</h5>
                        <div class="row">
                            <div class="col-md-6 col-12 ">
                                <hr class="hr1">
                                <p><b>File Number :</b> {{entity.fileNumber}}  </p>  
                                <p><b>File Date :</b> {{entity.fileDate}}  </p>
                                <hr class="hr1">
                            </div>
                            <div class="col-md-6 col-12 ">
                                <hr class="hr1">
                                <p><b>Created By :</b> {{entity.createdBy}}  </p>
                                <p><b>Created On :</b> {{entity.createdOn}}  </p>
                                <hr class="hr1">
                            </div>
                            
                        </div>
                        <br><br><br><br><br><br>
                            <div class="col-12 d-inline-flex">
                            <td class="text-xs-center " v-if=" entity.state ===0">
                            <span style="color: black; text-align: center;">Profile Saved</span>
                            </td>
                            <td class="text-xs-center " v-if=" entity.state === 1">
                            <span style="color: black; text-align: center;">Profile Sent To Bond</span>
                            </td>
                            <td class="text-xs-center " v-else-if=" entity.state === 2">
                            <span style="color: black; text-align: center;">Profile Updated By Bond</span>
                            </td>
                            <td class="text-xs-center " v-else-if=" entity.state === 3">
                            <span style="color: black; text-align: center;"> Articles Allocated </span>
                            </td>
                            
                            </div>
                            <hr class="hr4">
                        <br><br><br>
                        <hr class="hr3">
                    </div>    
                </div>
            </div>
        </div>
    </div>
    <v-app>
        <v-flex>
            <div>
                <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'"  :timeout="timeout" :multi-line="mode === 'multi-line'" :right="x === 'right'"  :top="y === 'top'" :vertical="mode === 'vertical'" :color="color">
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
import moment,{ months } from "moment";

export default {
    data(){
        return{
            entity:{
                "oid":'',                
                "documents":[]
            },
            entity1:[],
            progressBar:{
                loading: false,
                show: false
            },
            assetAge:'',
            size:"50px",
            snackbar: false,
            y: "bottom",
            x: "right",
            mode: "",
            color: "",
            timeout: 0,
            messageText: "",
        }
    },
    created(){
        this.getBasicProfileView(this.$route.params.id);
    },
    methods:{
        report(){
            this.snackbar = true;
            this.color = "info"
            this.messageText = "Please wait. Report is generating"
            let body = {
                oid : this.entity.oid
            };

            let req = constant.getRequest(url.master_basicprofile_v1_get_by_oid, body);
            lumos_client.onPost(url.master_basicprofile_v1_get_by_oid, req)
            .then(result => {
                let res = result.data.header.responseCode;
                window.open(url.baseUrl+url.master_basicprofile_v1_get_by_oid+result.data.body.fileName, '_blank')
                this.color = "success"
                this.messageText = "Report Generated Successfully. Please check on the next tab"
            }).catch(error =>{
            });
        },
        getBasicProfileView(oid){
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
                //console.log(this.oidModifier(this.entity))
                if(this.entity.userType === "Exemption") {
                    this.entity.userType = this.entity.userType + " Certificate" ;
                }
            }).catch(error =>{
            });
        },
        oidModifier(entity){
            if(this.entity.documents){
                this.entity.documents = JSON.parse(this.entity.documents);
            }      
            if(this.entity.userDate){
                this.entity.userDate = new Date(this.entity.userDate);
            }
            // if(this.entity.fileDate){
            //     this.entity.fileDate = new Date(this.entity.fileDate);
            // }
            if(this.entity.nbrDate){
                this.entity.nbrDate = new Date(this.entity.nbrDate);
            }
            if(this.entity.fmDate){
                this.entity.fmDate = new Date(this.entity.fmDate);
            }
            if(this.entity.bondDate){
                this.entity.bondDate = new Date(this.entity.bondDate);
            }
        }
        
        
        
    }
}
</script>

<style scoped>

@page {
  size: A4;
  margin: 0;
}

@media print {
* {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
}

.page {
    margin: 0;
    border: initial;
    border-radius: initial;
    width: initial;
    min-height: initial;
    box-shadow: initial;
    background: initial;
    page-break-after: always;
    font-size: 10px;
  }
  .nopadding {
   padding: 0 !important;
   margin: 0 !important;
}

 .page h4{
    text-align: center;
}

.page h5{
    background:gray;
    color:white;
    padding:2px 5px;
    border-radius:2px;
}
}
.page {
	width: 210mm;
	min-height: 120mm;
	padding: 1cm;
	margin: .3cm auto;
	border: 1px #D3D3D3 solid;
	border-radius: 2px;
	background: white;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	font-size: 12px;
}

.page h4 {
	text-align: center;
}

.page h5 {
	background: gray;
	color: white;
	padding: 2px 5px;
	border-radius: 2px;
}
hr.hr1{
    border-top: 1px solid rgb(153, 192, 146);
}
hr.hr2{
    border-top: 1px solid rgb(138, 138, 136);
}
hr.hr3{
    border-top: 2px solid rgb(138, 138, 136);
    width:65%;
    margin-left: auto;
    margin-right: auto;
}
hr.hr4{
    border-top: 3px dotted rgb(138, 138, 136);
    width:25%;
    margin-left: auto;
    margin-right: auto;
}
</style>

