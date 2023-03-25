<template>
<div>
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="container-fluid">
        <!-- <div class="row"> -->
        <div class="col-12">
            <div>
                <router-link :to="{ name: 'DpLedgerInfo' }"  tag="span" class="button-tooltip pt-1 float-left">
                    <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
            </div>
            <div class="profile-button" v-if="bondCheck()">
                <span class="button-tooltip align-right">
                    <i class="fa fa-print" aria-hidden="true" @click="report()"></i>
                    <span class="button-tooltiptext">Print</span>
                </span> 
            </div>
            
        </div>
        <!-- </div> -->
        <br>
        <div class="row">            
            <div class="page">
                <div class="">
                    <div class="basic-info">
                        <h4> <u>Sales of {{this.entity.warehouseName}} </u></h4>
                        <hr>
                        <div class="row">
                            <div class="col-md-9 col-12 ">
                                <p><b>Invoice Number :</b> {{this.entity.relevantWarehouseInvoiceNo}}  </p>
                                <p><b>Invoice Date :</b> {{this.entity.relevantWarehouseInvoiceDate}}  </p>
                            </div>
                            <div class="col-md-3 col-12">
                                <p v-if="bondCheck()"><b>Sales Status :</b> Approved</p>
                                <p v-else><b>Sales Status :</b> Pending</p>
                            </div>
                        </div>   
                        <div class="basic-info2">
                        <h5> Sales </h5> 
                        <v-data-table :headers="headers" :items="entity1" mobile-breakpoint="0" hide-actions>
                        <template slot="items" slot-scope="props" >
                            <td class="text-xs-left w-5" >
                                <button @click="getDpLedgerDetails(props.item)" class="btn-icon-default button-tooltip mr-3" :disabled="bondCheck()"> 
                                <i class="fa fa-edit" style="color: green;" aria-hidden="true"></i>
                                <span class="button-tooltiptext">Edit Tax</span>
                                </button>
                            </td>
                            <td class="text-xs-left w-15">{{ props.item.billOfEntryNo }}</td>
                            <td class="text-xs-left w-15">{{ props.item.categoryName }}</td>    
                            <td class="text-xs-left w-30">{{ props.item.productName }}</td>
                            <td class="text-xs-left w-5">{{ props.item.unitValue }}</td>
                            <td class="text-xs-left w-5">{{ props.item.totalQuantity }}</td>
                            <td class="text-xs-left w-5">{{ props.item.totalValue }}</td>
                            <td class="text-xs-left w-5">{{ props.item.totalTax }}</td>
                            <td class="text-xs-left w-5">{{ props.item.totalSellValue }}</td> 
                        </template>
                        </v-data-table>
                    </div>
                    <br><br>
                    <div class="row">
                    <div class="col-md-9 col-12">
                        <p><b>Total Sold Quantity :</b> {{salesTotal.totalSalesQuantity}}  </p>
                        <p><b>Total Sold Price :</b> {{salesTotal.totalSalesValue}}  </p>
                    </div>
                    <div class="col-md-3 col-12"> 
                        <p><b>Seller Name :</b> {{entity.salesPerson}}  </p>
                        <p><b>Date :</b> {{entity.salesDate}}  </p>
                    </div>
                    </div> 
                        <h5>User's Information</h5>
                        <div class="row">
                            <div class="col-md-6 col-12 ">
                                <p><b>Passport Number :</b> {{entity.passportNo}}  </p>
                                <p><b>Name :</b> {{entity.nameOfHolder}}  </p>
                                <p><b>Address :</b> {{entity.address}}  </p>
                                <p><b>Nationality :</b> {{entity.nationality}}  </p>
                                <p><b>Visa Valid Upto :</b> {{entity.visaValidUpto}}  </p> 
                                <p><b>Date of Arrival :</b> {{entity.dateOfArrival}}  </p>                              
                            </div>
                            
                        </div>
                        <!---->
                        <br><br>   
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-success ripple mr-3" style="position: absolute; padding: 5px 0; width:300px; text-align: center;"  @click.prevent="approveSales()"  v-if="showButton()" :disabled="this.entity.bondCheck=='Y'">
                            Approve Duty Paid Sales
                            </button>
                        </div>
                        
                    </div>     
                    <br><br>   
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
        <v-dialog v-model="updateLedgerInfoDetailsModal" max-width="550">
            <v-card>
                <form class="form-group" @submit.prevent="ledgerInfoDetailsUpdate()">
                    <div class="update-ledger" >
                        <div class="mt-3 ml-4 mr-4 mb-2">
                            <div class="mb-3">
                                <label class="required"> <b>Total Tax</b></label>
                                <input class="form-control mb-1" v-model="dpLedgerInfoDetails.totalTax" placeholder="Update total tax" name="Total Tax"/>
                            </div>                
                            <div class="text-center mt-4">
                                <button class="btn btn-success ripple mr-3" @submit.prevent="ledgerInfoDetailsUpdate()">
                                Update Sales
                                </button>
                                <v-btn class="btn btn-danger button-width ripple" flat="flat" @click.native="updateLedgerInfoDetailsModal = false">
                                Cancel
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </form>
            </v-card>
        </v-dialog>
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
                "oid":''
            },
            item: "",
            entity1:[],
            headers: [
                { text: "Action", value: "", align: "left" },
                { text: "Bill Of Entry No", value: "billOfEntryNo", align: "left" },
                { text: "Category", value: "categoryName", align: "left" },
                { text: "Product Name", value: "productName", align: "left" },
                { text: "Unit Value", value: "unitValue", align: "left" },
                { text: "Total Quantity", value: "totalQuantity", align: "left" },
                { text: "Total Value", value: "totalValue", align: "left" },
                { text: "Total Tax", value: "totalTax", align: "left" },
                { text: "Total Sales Price", value: "totalSellValue", align: "left" }
            ],
            salesTotal: {},
            dpLedgerInfoDetails:{
                dpLedgerInfoDetailsOid:'',
                billOfEntryNo:'',
                totalQuantity:'',
                totalValue:'',
                totalTax:'',
                totalSellValue:''
            },
            progressBar:{
                loading: false,
                show: false
            },
            updateLedgerInfoDetailsModal:false,
            assetAge:'',
            size:"50px",
            snackbar: false,
            y: "bottom",
            x: "right",
            mode: "",
            color: "",
            timeout: 0,
            messageText: "",
            pageDisplay: true,
            printDisplay: false
        }
    },
    created(){
        this.getLedgerInfoView(this.$route.params.id);
        this.getLedgerInfoDetailsView(this.$route.params.id);
    },
    methods:{
        printPage(){
            this.pageDisplay = false
            this.printDisplay = true
            window.print();
        },
        ledgerInfoDetailsUpdate(){
                let http_url = ''; 
                http_url = url.operation_dpledgerinfo_v1_update_dpledgerinfodetails;
                // this.entity1.warehouseOid=localStorage.getItem("lumos_warehouseOid");
                console.log(this.dpLedgerInfoDetails)
                let body = this.dpLedgerInfoDetails
                let req = constant.getRequest(http_url, body); 
                lumos_client.onPost(http_url, req)
                .then(result => {
                    this.progressBar.loading = false;
                    this.progressBar.show = false;                
                    let res = result.data.header.responseCode;
                    this.updateLedgerInfoDetailsModal = false;
                    this.snackbar = true;
                    if (res != "200"){
                        this.color = "red"; 
                        this.messageText =  result.data.body.data;
                        return;
                    }
                    this.color = "success"; 
                   
                    this.messageText = "Sales updated Successfully";
                    this.getLedgerInfoDetailsView(this.$route.params.id);
                    setTimeout( 1000 )
                }).catch(error => {
                    this.$log.error(error)
                })        
        },
        getDpLedgerDetails(event){  
            this.dpLedgerInfoDetails.dpLedgerInfoDetailsOid = event.dpLedgerInfoDetailsOid
            this.dpLedgerInfoDetails.billOfEntryNo = event.billOfEntryNo
            this.dpLedgerInfoDetails.totalQuantity = event.totalQuantity
            this.dpLedgerInfoDetails.totalValue = event.totalValue
            this.dpLedgerInfoDetails.totalTax = event.totalTax
            this.dpLedgerInfoDetails.totalSellValue = event.totalSellValue
            this.updateLedgerInfoDetailsModal = true
            // console.log(this.dpLedgerInfoDetails.dpLedgerInfoDetailsOid);
        },
        report(){
            this.snackbar = true;
            this.color = "info"
            this.messageText = "Please wait. Invoice is generating"
            let body = {
                oid : this.$route.params.id,
                userType: "DP"
            };

            let req = constant.getRequest(url.operation_report_v1_get_sales_invoice, body);
            lumos_client.onPost(url.operation_report_v1_get_sales_invoice, req)
            .then(result => {
                let res = result.data.header.responseCode;
                window.open(url.baseUrl + url.operation_report_v1_download + result.data.body.fileName,"_blank");
                // window.open(url.baseUrl+url.operation_report_v1_get_sales_invoice+result.data.body.fileName, '_blank')
                this.color = "success"
                this.messageText = "Invoice Generated Successfully. Please check on the next tab"
            }).catch(error =>{
            });
        },
        getLedgerInfoView(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.operation_dpledgerinfo_v1_get_by_view_oid, body);
            lumos_client.onPost(url.operation_dpledgerinfo_v1_get_by_view_oid, req)
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
            let req = constant.getRequest(url.operation_dpledgerinfo_v1_dpledgerinfodetails_get_list, body);
            lumos_client.onPost(url.operation_dpledgerinfo_v1_dpledgerinfodetails_get_list, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity1 = result['data']['body']['data'];
                this.salesTotal = result['data']['body']['salesTotal'];
                // console.log(result);
            }).catch(error =>{
            });
        },
        approveSales(){
                this.progressBar.loading = true;
                this.progressBar.show = true;
            
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.operation_dpledgerinfo_v1_update;                
                } else {    
                    http_url = url.operation_dpledgerinfo_v1_update;
                }     
                     
                let body ={bondCheck: "Y", oid: this.$route.params.id}; 

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
                        this.messageText = "Duty Paid Sales approving failed";
                        this.snackbar = false;
                        return;
                    }
                    this.color = "success"; 
                    this.messageText = "Duty Paid Sales Approved Successfully";
                    setTimeout( () => this.$router.push({name:'DpLedgerInfo'}), 3000);
                }).catch(error => {
                    this.$log.error(error)
                })
        },
        showButton(){
            if(localStorage.getItem("lumos_roleOid")=='whadmin' || localStorage.getItem("lumos_roleOid")=='bondofficer' || localStorage.getItem("lumos_roleOid")=='warehouseadmin'){
                return true;
            } else {
                return false;
            }
        },
        checkBondCheck(bondCheck){
            if(bondCheck =="Y"){
                return true;
            }
            else
            {
                return false;
            }
        },
        bondCheck(){
            if(this.entity.bondCheck=='Y'){
                return true;
            } else{
                return false;
            }
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
/* working code for print preview */
/*
.printme {
	display: none;
}
*/

.divFooter {
  position: fixed;
  bottom: 0;
}
/*
@media print {
	.no-printme  {
		display: none;
	}
	.printme  {
		display: inline;
  }

	body {
		margin: 10px;
		color: #000;
		background-color: #fff;
  }

  @page{
    size: auto;
    margin-top: 0.5in;
    margin-bottom: 0.5in;
    margin-left: 0in;
    margin-right: 0in;
  }
  html, body {
    height:100vh; 
    color: ##fff;
    margin: 0 !important; 
    padding: 0 !important;
    overflow: hidden;
  }
}

.printlang  {
	font-family: 'Kalpurush' !important;
}
*/
.profile-button{
    background:white;
    position: right;
    /*width: 50px;*/
}
.v-data-table-header-mobile{
        display: none !important;
      }

.update-ledger {
    background: white;
    padding: 10px 10px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.03);
    -webkit-box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%); 
    box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%);
} 
</style>