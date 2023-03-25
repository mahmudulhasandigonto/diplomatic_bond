<template>
<div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="container-fluid">
        <!-- <div class="row"> -->
            <div class="col-12 d-inline-flex">
                <div>
                <router-link :to="{ name: 'WrongLedgerInfo' }"  tag="span" class="button-tooltip pt-1 float-left">
                    <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
                </div>
            </div>
        <!-- </div> -->
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
                        <h4> <u>Sales of {{this.entity.warehouseName}} </u></h4>
                        <hr>
                        <div class="row">
                            <div class="col-md-6 col-12 ">
                        <p><b>Invoice Number :</b> {{this.entity.relevantWarehouseInvoiceNo}}  </p>
                        <p><b>Invoice Date :</b> {{this.entity.relevantWarehouseInvoiceDate}}  </p>
                            </div>
                            <!-- <div class="col-md-6 col-12 "> -->
                            <!-- <p><b>Bill of Entry Number :</b> {{entity.billofentryno}}  </p> -->
                            <!-- <p><b>Bill of Entry Office :</b> {{entity.billOfEntryOfficeId}}  </p> -->
                            <!-- <p><b>Bill of Entry Date :</b> {{entity.billofentrydate}}  </p> -->
                            <!-- </div> -->
                        </div>   
                        <div class="basic-info2">
                        <h5> Sales </h5> 
                        <v-data-table :headers="headers" :items="entity1" mobile-breakpoint="0" hide-actions>
                        <template slot="items" slot-scope="props" >
                            <td class="text-xs-left w-15">{{ props.item.billOfEntryNo }}</td>
                            <td class="text-xs-left w-15">{{ props.item.categoryoid }}</td>    
                            <td class="text-xs-left w-30">{{ props.item.productName }}</td>
                            <td class="text-xs-left w-5">{{ props.item.unitValue }}</td>
                            <td class="text-xs-left w-5">{{ props.item.totalQuantity }}</td>
                            <td class="text-xs-left w-5">{{ props.item.totalValue }}</td> 
                        </template>
                        </v-data-table>

                    </div>
                    <br><br>
                    <div class="row">
                    <div class="col-md-9 col-12">
                        <p><b>Total Sold Quantity :</b> {{salesTotal.salesTotalQuantity}}  </p>
                        <p><b>Total Sold Price :</b> {{salesTotal.salesTotalValue}}  </p>
                    </div>
                    <div class="col-md-3 col-12"> 
                        <p><b>Seller Name :</b> {{entity.salesperson}}  </p>
                        <p><b>Date :</b> {{entity.salesdate}}  </p>
                    </div>
                    </div> 
                        <h5>User's Information</h5>
                        <div class="row">
                            <div class="col-md-6 col-12 ">
                                <p><b>User Type :</b> {{entity.userType}}  </p>
                                <p><b>Sl Number :</b> {{entity.slno}}  </p>
                                <p><b>Name :</b> {{entity.nameOfHolder}}  </p>
                                <p><b>Designation :</b> {{entity.designationofholder}}  </p>
                                <p><b>Occasion :</b> {{entity.occasion}}  </p>
                                <p><b>Country :</b> {{entity.country}}  </p>
                                <p><b>Embassy :</b> {{entity.nameOfEmbassy}}  </p>
                                <p><b>Quarter :</b> {{entity.quarter}}  </p>
                                <p><b>Passport Number :</b> {{entity.passportno}}  </p>
                                <p><b>Email Address :</b> {{entity.holderemailaddress}}  </p>
                                <p><b>Mobile Number :</b> {{entity.holdermobilenumber}}  </p>                                
                            </div>
                                
                            <div class="col-md-6 col-12 ">                                
                                <!-- <p><b>User's Type :</b> {{entity.userType}}  </p> -->
                                <!-- <p><b>Housekeeper Name :</b> {{entity.housekeeper}}  </p> -->
                                <p><b>Status :</b> {{entity.status}}  </p>                                
                                <p><b>Date of First Arrival :</b> {{entity.dateoffirstarrival}}  </p>
                                <p><b>Date of Last Arrival :</b> {{entity.dateoflastarrival}}  </p>
                                <p><b>Valid Upto :</b> {{entity.validupto}}  </p>
                                <p><b>Issue Date :</b> {{entity.issueddate}}  </p>
                                <p><b>User Issued By :</b> {{entity.issuedby}}  </p>
                                <p><b>Old Passport Number :</b> {{entity.oldpassportno}}  </p>
                                
                            </div>
                            
                        </div>
                        
                    </div>                    

                    
                    <br><br><br><br>    
                    <hr size="40" width="100%" color="black">
                        <div class="row">
                            <div style="color: green; font-size: 10px" class="col"><p><b>Last Edited By :</b> {{entity.updatedby}} </p></div>
                            <div style="color: green; font-size: 10px" class="col"><p><b>Last Edited Date :</b> {{entity.updatedon}}  </p></div>
                            <div style="color: green; font-size: 10px" class="col"><p><b>Approved By :</b> {{entity.createdby}} </p></div>
                            <div style="color: green; font-size: 10px" class="col"><p><b>Approved Date :</b> {{entity.createdon}} </p></div>
                            
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
            item: "",
            entity1:[],
            headers: [
                { text: "Bill Of Entry No", value: "billOfEntryNo", align: "left" },
                { text: "Category", value: "categoryoid", align: "left" },
                { text: "Product Name", value: "productName", align: "left" },
                { text: "Unit Value", value: "unitValue", align: "left" },
                { text: "Total Quantity", value: "totalQuantity", align: "left" },
                { text: "Total Price", value: "totalValue", align: "left" }
            ],
            salesTotal: {},
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
        this.getLedgerInfoView(this.$route.params.id);
        this.getLedgerInfoDetailsView(this.$route.params.id);
    },
    methods:{
        report(){
            this.snackbar = true;
            this.color = "info"
            this.messageText = "Please wait. Report is generating"
            let body = {
                oid : this.entity.oid
            };

            let req = constant.getRequest(url.operation_ledgerinfo_v1_get_by_oid, body);
            lumos_client.onPost(url.operation_ledgerinfo_v1_get_by_oid, req)
            .then(result => {
                let res = result.data.header.responseCode;
                window.open(url.baseUrl+url.operation_ledgerinfo_v1_get_by_oid+result.data.body.fileName, '_blank')
                this.color = "success"
                this.messageText = "Report Generated Successfully. Please check on the next tab"
            }).catch(error =>{
            });
        },
        getLedgerInfoView(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.operation_ledgerinfo_v1_get_by_view_oid, body);
            lumos_client.onPost(url.operation_ledgerinfo_v1_get_by_view_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier(this.entity);
                // console.log(this.entity);
            }).catch(error =>{
            });
        },
        getLedgerInfoDetailsView(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.operation_ledgerinfo_v1_ledgerinfodetails_get_list, body);
            lumos_client.onPost(url.operation_ledgerinfo_v1_ledgerinfodetails_get_list, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity1 = result['data']['body']['data'];
                this.salesTotal = result['data']['body']['salesTotal'];
                // console.log(result);
            }).catch(error =>{
            });
        },
        oidModifier(entity){
            if(this.entity.documents){
                this.entity.documents = JSON.parse(this.entity.documents);
            }      
            if (this.entity.relevantwarehouseinvoicedate) {
        this.entity.relevantwarehouseinvoicedate = new Date(this.entity.relevantwarehouseinvoicedate).toISOString().slice(0, 10);
            }
            if (this.entity.billofentrydate) {
        this.entity.billofentrydate = new Date(this.entity.billofentrydate).toISOString().slice(0, 10);
            }
            if (this.entity.issueddate) {
        this.entity.issueddate = new Date(this.entity.issueddate).toISOString().slice(0, 10);
            }
            if (this.entity.usercreatedon) {
        this.entity.usercreatedon = new Date(this.entity.usercreatedon).toISOString().slice(0, 10);
            }
            if (this.entity.userupdatedon) {
        this.entity.userupdatedon = new Date(this.entity.userupdatedon).toISOString().slice(0, 10);
            }
            if (this.entity.dateoffirstarrival) {
        this.entity.dateoffirstarrival = new Date(this.entity.dateoffirstarrival).toISOString().slice(0, 10);
            }
            if (this.entity.dateoflastarrival) {
        this.entity.dateoflastarrival = new Date(this.entity.dateoflastarrival).toISOString().slice(0, 10);
            }
            if (this.entity.validupto) {
        this.entity.validupto = new Date(this.entity.validupto).toISOString().slice(0, 10);
            }
            if (this.entity.salesdate) {
        this.entity.salesdate = new Date(this.entity.salesdate).toISOString().slice(0, 10);
            }
            if (this.entity.updatedon) {
        this.entity.updatedon = new Date(this.entity.updatedon).toISOString().slice(0, 10);
            }
            if (this.entity.createdon) {
        this.entity.createdon = new Date(this.entity.createdon).toISOString().slice(0, 10);
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

.v-data-table-header-mobile{
        display: none !important;
      }
</style>