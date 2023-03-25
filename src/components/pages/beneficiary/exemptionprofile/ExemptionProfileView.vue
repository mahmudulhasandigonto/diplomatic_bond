<template>
<div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="container-fluid">
        <div class="row">
            <div v-if="checkUser()=='fmofficer' || checkUser()=='fmoperator'" class="col-12 d-inline-flex">
                <router-link :to="{ name: 'BasicProfile' }"  tag="span" class="button-tooltip pt-1 float-left">
                    <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
            </div>
            <div v-else-if="checkUser" class="col-12 d-inline-flex">
                <router-link :to="{ name: 'ExemptionProfile' }"  tag="span" class="button-tooltip pt-1 float-left">
                    <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
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
                        <h4><u>{{entity.userType}} Profile</u></h4>
                        <hr>
                        <h5> File Information</h5>
                        <div class="row">
                        <div class="col-md-6 col-12 ">
                        <p><b>File No. :</b> {{entity.fileNumber}}  </p>
                        <p><b>Date :</b> {{entity.fileDate}}  </p>
                        </div>
                        <div class="col-md-6 col-12 ">
                        <p><b>CBC Order No. :</b> {{entity.cbcOrderNo}}  </p>
                        <p><b>CBC Order Date :</b> {{entity.cbcOrderDate}}  </p>
                        </div>
                        </div>
                        <h5> {{entity.userType}} User's Information</h5>
                        <div class="row">
                            <div class="col-md-6 col-12 ">
                                <p style="font-size: 15px"><b>Name :</b> {{entity.nameOfHolder}}  </p>
                                <p><b>Serial No. :</b> {{entity.slNo}}  </p>
                                <p><b>Status :</b> {{entity.status}}  </p>
                                <p><b>Designation of User :</b> {{entity.designationOfHolder}}  </p>
                                <p><b>Country :</b> {{entity.country}}  </p>
                                <p><b>Embassy Name :</b> {{entity.nameOfEmbassy}} </p>
                                <p><b>Passport No. :</b> {{entity.passportNo}}  </p>
                                <p><b>Old Passport No. :</b> {{entity.oldPassportNo}}  </p>
                                <!--<p><b>User's Mobile No. :</b> {{entity.holderMobileNumber}}  </p>-->
                                <!--<p><b>User's Email Address :</b> {{entity.holderEmailAddress}}  </p>-->
                                <p><b>Occasion :</b> {{entity.occasion}}  </p>
                            </div>

                            <div class="col-md-6 col-12 ">
                                <p><b>First Arrival On :</b> {{entity.dateOfFirstArrival}}  </p>
                                <p><b>Last Arrival On :</b> {{entity.dateOfLastArrival}}  </p>
                                <p><b>Issued By :</b> {{entity.issuedBy}}  </p>
                                <p><b>Issued Date :</b> {{entity.issuedDate}}  </p>
                                <p><b>Valid Upto :</b> {{entity.validUpTo}}  </p>
                                <p><b>Quarter :</b> {{this.quarterOid}}  </p>
                                <!-- <p><b>Revalidation Issued By :</b> {{entity.revalidationIssuedBy}}  </p>
                                <p><b>Revalidation Issued Date :</b> {{entity.revalidationIssuedDate}}  </p>
                                <p><b>Revalidation Upto :</b> {{entity.revalidateUpTo}}  </p> -->
                                
                            </div>
                        </div>
                        <h5> Articles </h5> 
                        <v-data-table :headers="headers" :items="entity1"  mobile-breakpoint="0" hide-actions>
                        <template slot="items" slot-scope="props" >
                        <td class="text-xs-left w-5">{{ props.item.categoryOid }}</td>    
                        <!-- <td class="text-xs-left w-5">{{ props.item.allocateQuantity }}</td> -->
                        <td class="text-xs-left w-5">{{ props.item.allocatePieces }}</td>
                        <td class="text-xs-left w-5">{{ props.item.allocateValue }}</td>
                        <!-- <td class="text-xs-left w-5">{{ props.item.consumeQuantity }}</td>  -->
                        <td class="text-xs-left w-5">{{ props.item.consumePieces }}</td>    
                        <td class="text-xs-left w-5">{{ props.item.consumeValue }}</td>
                        </template>
                        </v-data-table>
                        <br><br>
                        <h5> Spouse and Sponsor Information</h5>
                        <div class="row">
                        <div class="col-md-6 col-12 ">
                        <p><b>Sponsor Name :</b> {{entity.nameOfSponsor}}  </p>
                        <p><b>Sponsor Passport No. :</b> {{entity.sponsorPassport}}  </p>
                        </div>
                        <div class="col-md-6 col-12 ">
                        <p><b>Spouse :</b> {{entity.spouse}}  </p>
                        <p><b>Spouse Passport Number :</b> {{entity.spousePassportNo}}  </p>
                        </div>
                        </div>
                        
                        
                        <hr size="40" width="100%" color="black">
                        <div class="row">
                            <div style="color: green; font-size: 10px" class="col"><p><b>Last Edited By :</b> {{entity.updatedBy}} </p></div>
                            <div style="color: green; font-size: 10px" class="col"><p><b>Last Edited Date :</b> {{entity.updatedOn}}  </p></div>
                            <div style="color: green; font-size: 10px" class="col"><p><b>Approved By :</b> {{entity.createdBy}} </p></div>
                            <div style="color: green; font-size: 10px" class="col"><p><b>Approved Date :</b> {{entity.createdOn}} </p></div>
                            
                        </div>

                        <hr size="40" width="100%" color="black">

                        <div class="d-flex justify-content-center">
                            <button class="btn btn-success ripple mr-3" style="position: absolute; padding: 5px 0; width:300px; text-align: center;" v-if="showButton()" @click.prevent="generalprofiletransactionSaveUpdate()"  id="send" v-on:click="select($event)" :disabled="checkFMState(this.entity.state)">
                            Issue Exemption Certificate
                            </button>
                        </div>
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
            quarterOid:'',
            entity:{
                "oid":'',                
                "documents":[]
            },
            entity1:[],
            headers: [
                { text: "Category", value: "categoryOid", align: "left" },
                // { text: "Allocated Qty", value: "allocateQuantity", align: "left" },
                { text: "Allocate Pieces", value: "allocatePieces", align: "left" },
                { text: " Allocate Value", value: "allocateValue", align: "left" },
                // { text: "Consumed Quantity", value: "consumeQuantity", align: "left" },
                { text: "Consume Pieces", value: "consumePieces", align: "left" },
                { text: "Consume Value", value: "consumeValue", align: "left" }
            ],
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
        this.getExemptionProfileView(this.$route.params.id);
        this.getExemptionArticlesView(this.$route.params.id);
    },
    methods:{
        report(){
            this.snackbar = true;
            this.color = "info"
            this.messageText = "Please wait. Report is generating"
            let body = {
                oid : this.entity.oid
            };         
            let req = constant.getRequest(url.master_generalprofile_v1_get_by_oid, body);
            lumos_client.onPost(url.master_generalprofile_v1_get_by_oid, req)
            .then(result => {
                let res = result.data.header.responseCode;
                window.open(url.baseUrl+url.master_generalprofile_v1_get_by_oid+result.data.body.fileName, '_blank')
                this.color = "success"
                this.messageText = "Report Generated Successfully. Please check on the next tab"
            }).catch(error =>{
            });
        },

        showButton(){
            if(localStorage.getItem("lumos_roleOid")=='fmofficer'){
                return true;
            } else {
                return false;
            }
        },
        select(event) {
            this.buttonId = event.currentTarget.id;            
        },
        checkFMState(state){
            if(state !=3){
                return true;
            }
            else
            {
                return false;
            }
        },

        generalprofiletransactionSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
            
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.operation_generalprofiletransaction_v1_update;                
                } else {    
                    http_url = url.operation_generalprofiletransaction_v1_save;
                }     
                     
                let body ={state: 4, generalProfileOid: this.$route.params.id}; 

                // console.log(body); 

                let req = constant.getRequest(http_url, body); 
                lumos_client.onPost(http_url, req)
                .then(result => {
                    this.progressBar.loading = false;
                    this.progressBar.show = false;                
                    let res = result.data.header.responseCode;
                    this.snackbar = true;
                    if(res != "200"){
                        this.color = "red"; 
                        // this.messageText =  result.data.body.data;
                        this.messageText = "Issuing Exemption certificate failed";
                        this.snackbar = false;
                        return;
                    }
                    this.color = "success"; 
                    // if(this.$route.params.id){
                        // if(this.buttonId=='send'){
                    this.messageText = "Exemption Certificate Issued Successfully";
                    setTimeout( () => this.$router.push({name:'BasicProfile'}), 3000);
                        // } else if(this.buttonId=='save'){
                        //     this.messageText = "General Profile Transaction Updated Successfully";
                        //     if(this.entity.userType=='Exemption' && localStorage.getItem("lumos_roleId")=='FMOfficer'){                            
                        //         setTimeout( () => this.$router.push({name:'BasicProfile'}), 3000);
                        //     } else if(this.entity.userType=='Exemption'){                            
                        //         setTimeout( () => this.$router.push({name:'ExemptionProfile'}), 3000);
                        //     } else {
                        //         setTimeout( () => this.$router.push({name:'PassbookProfile'}), 3000);
                        //     }
                        // }
                        
                    // } 
                }).catch(error => {
                    this.$log.error(error)
                })               
            }); 
        },

        checkUser(){
             if(localStorage.getItem("lumos_roleOid")=='fmofficer'){
                return 'fmofficer';
            }if(localStorage.getItem("lumos_roleOid")=='fmoperator'){
                return 'fmoperator';
            } else {
                return true;
            }
        },
        getExemptionArticlesView(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.master_generalprofile_v1_exemptionarticles_get_by_oid, body);
            lumos_client.onPost(url.master_generalprofile_v1_exemptionarticles_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity1 = result['data']['body']['data'];
                // this.oidModifier(this.entity1);
                this.quarterOid = this.entity1[0]['quarterOid'];
                // console.log(this.quarterOid);
            }).catch(error =>{
            });
        },
        getExemptionProfileView(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid, userType: "Exemption"};
            let req = constant.getRequest(url.master_generalprofile_v1_get_by_oid, body);
            lumos_client.onPost(url.master_generalprofile_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.entity.userType = this.entity.userType + ' Certificate';
                // this.oidModifier(this.entity);
                //console.log(this.oidModifier(this.entity))
            }).catch(error =>{
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
            // if (this.entity.fileDate) {
            //     this.entity.fileDate = new Date(this.entity.fileDate).toISOString().slice(0, 10);
            // }
            if (this.entity.cbcOrderDate) {
                this.entity.cbcOrderDate = new Date(this.entity.cbcOrderDate).toISOString().slice(0, 10);
            }
            if (this.entity.dateOfFirstArrival) {
                this.entity.dateOfFirstArrival = new Date(this.entity.dateOfFirstArrival).toISOString().slice(0, 10);
            }
            if (this.entity.dateOfLastArrival) {
                this.entity.dateOflastArrival = new Date(this.entity.dateOfLastArrival).toISOString().slice(0, 10);
            }
            if (this.entity.createdOn) {
                this.entity.createdOn = new Date(this.entity.createdOn).toISOString().slice(0, 10);
            }
            if (this.entity.updatedOn) {
                this.entity.updatedOn = new Date(this.entity.updatedOn).toISOString().slice(0, 10);
            }
            if (this.entity.issuedDate) {
                this.entity.issuedDate = new Date(this.entity.issuedDate).toISOString().slice(0, 10);
            }
            if (this.entity.validUpTo) {
                this.entity.validUpTo = new Date(this.entity.validUpTo).toISOString().slice(0, 10);
            }
            if (this.entity.revalidationIssuedDate) {
                this.entity.revalidationIssuedDate = new Date(this.entity.revalidationIssuedDate).toISOString().slice(0, 10);
            }
            if (this.entity.revalidateUpTo) {
                this.entity.revalidateUpTo = new Date(this.entity.revalidateUpTo).toISOString().slice(0, 10);
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
	min-height: 297mm;
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
</style>
