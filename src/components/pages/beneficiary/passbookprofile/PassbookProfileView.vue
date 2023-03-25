<template>
<div class="">
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
        <div class="row ">            
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
                        <h5> {{entity.userType}} User's Information </h5>
                        <div class="row">
                            <div class="col-md-6 col-12 ">
                                <p style="font-size: 15px"><b>Name :</b> {{entity.nameOfHolder}}  </p>
                                <p><b>Serial No. :</b> {{entity.slNo}}  </p>
                                <p><b>Designation of User :</b> {{entity.designationOfHolder}}  </p>
                                <p><b>Country :</b> {{entity.country}}  </p>
                                <p><b>Passport No. :</b> {{entity.passportNo}}  </p>
                                <p><b>Old Passport No. :</b> {{entity.oldPassportNo}}  </p>
                                <p><b>Beneficiary Phone :</b> {{entity.holderMobileNumber}}  </p>
                                <p><b>Beneficiary Email :</b> {{entity.holderEmailAddress}}  </p>
                                <p><b>Occasion :</b> {{entity.occasion}}  </p>
                            </div>
                            
                            <div class="col-md-6 col-12 ">
                                <p><b>First Arrival On :</b> {{entity.dateOfFirstArrival}}  </p>
                                <p><b>Last Arrival On :</b> {{entity.dateOfLastArrival}}  </p>
                                <p><b>Issued By :</b> {{entity.issuedBy}}  </p>
                                <p><b>Issued On :</b> {{entity.issuedDate}}  </p>
                                <p><b>Valid Upto :</b> {{entity.validUpTo}}  </p>
                                <p><b>Revalidation Issued By :</b> {{entity.revalidationIssuedBy}}  </p>
                                <p><b>Revalidation Issued On :</b> {{entity.revalidationIssuedDate}}  </p>
                                <p><b>Revalidation Upto :</b> {{entity.revalidateUpTo}}  </p>
                                <p><b>Status :</b> {{entity.status}}  </p>
                                
                            </div>
                        </div>
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
                        
                        <br>

                        <!-- <h5> -->
                            <!-- <div class="row"> -->
                                <!-- <div style="font-size: 20px" class="col"><p><b>Allocated Dollar :</b> {{entity1.allocateValue}}$ </p></div> -->
                                <!-- <div style="font-size: 20px" class="col"><p><b>Consumed Dollar :</b> {{entity1.consumeValue}}$  </p></div> -->
                            <!-- </div> -->
                        <!-- </h5> -->
                        <div class="basic-info2">
                            <h5> Articles </h5> 
                            <v-data-table :headers="headers" :items="this.entity1" mobile-breakpoint="0" hide-actions>
                                <template slot="items" slot-scope="props" >
                                    <td class="text-xs-left w-25">{{ props.item.quarterOid }}</td>
                                    <td class="text-xs-left w-5">{{ props.item.allocateValue }}</td>
                                    <td class="text-xs-left w-5">{{ props.item.consumeValue }}</td>
                                    <!-- <td class="text-xs-left w-5">{{ props.item.totalValue }}</td>  -->
                                </template>
                            </v-data-table> 
                        </div>
                        <br>
                        <hr size="40" width="100%" color="black">
                        <div class="row">
                            <div style="color: green; font-size: 10px" class="col"><p><b>Last Edited By :</b> {{entity.updatedBy}} </p></div>
                            <div style="color: green; font-size: 10px" class="col"><p><b>Last Edited Date :</b> {{entity.updatedOn}}  </p></div>
                            <div style="color: green; font-size: 10px" class="col"><p><b>Approved By :</b> {{entity.createdBy}} </p></div>
                            <div style="color: green; font-size: 10px" class="col"><p><b>Approved Date :</b> {{entity.createdOn}} </p></div>
                            
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
            entity:{
                "oid":'',                
                "documents":[]
            },
            entity1:[],
            //    "documents": [{
            //         categoryOid: "",
            //         allocateQuantity: "",
            //         allocateWeight: "", 
            //         allocatePieces: "",
            //         allocateValue: "",
            //         }]               
            // },
            headers: [
                { text: "Month", value: "quarterOid", align: "left" },
                { text: "Allocate Value", value: "allocateValue", align: "left" },
                { text: "Consume Value", value: "consumeValue", align: "left" },
                // { text: "Total Price", value: "totalValue", align: "left" }
            ],
            progressBar:{
                loading: false,
                show: false
            },
            assetAge:'',
            size:"50px",
            passbook: '',
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
        this.getPassbookProfileView(this.$route.params.id);
        this.getGeneralProfileTransactionView(this.$route.params.id);
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
        getGeneralProfileTransactionView(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid, passbook:1};
            let req = constant.getRequest(url.operation_generalprofiletransaction_v1_get_by_oid, body);
            lumos_client.onPost(url.operation_generalprofiletransaction_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity1 = result['data']['body']['data'];
                // console.log(this.entity1);
                // this.oidModifier(this.entity1);
                //console.log(this.oidModifier(this.entity))
                setTimeout( () => this.entity1 = {
                           "documents":[{
                                            productOid: "",
                                            unitQuantity: "",
                                            unitValue: "", 
                                            totalQuantity: "",
                                            totalValue: ""
                                        }],
                        }, 200000000 )
            }).catch(error =>{
            });
        },
        getPassbookProfileView(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.master_generalprofile_v1_get_by_oid, body);
            lumos_client.onPost(url.master_generalprofile_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                // this.oidModifier(this.entity);
                //console.log(this.oidModifier(this.entity))
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
            //     this.entity.fileDate = new Date(this.entity.fileDate).toISOString();
            // }
            if (this.entity.cbcOrderDate) {
                this.entity.cbcOrderDate = new Date(this.entity.cbcOrderDate).toISOString().slice(0, 10);
            }
            if (this.entity.dateOfFirstArrival) {
                this.entity.dateOfFirstArrival = new Date(this.entity.dateOfFirstArrival).toISOString().slice(0, 10);
            }
            if (this.entity.dateOfLastArrival) {
                this.entity.dateOfLastArrival = new Date(this.entity.dateOfLastArrival).toISOString().slice(0, 10);
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
.page h3{
    background:rgb(69, 73, 114);
    color:white;
    padding:2px 5px;
    
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
.page h3{
    background:rgb(69, 73, 114);
    color:white;
    padding:2px 5px;
    
}
</style>
