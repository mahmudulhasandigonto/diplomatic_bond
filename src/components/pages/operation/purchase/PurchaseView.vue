<template>
<div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="container-fluid">
            <div class="col-12 d-inline-flex">
                <div>
                <router-link :to="{ name: 'Purchase' }"  tag="span" class="button-tooltip pt-1 float-left">
                    <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
                </div>
            </div>
        <br>
        <div class="row">            
            <div class="page">
                <div class="">
                    <div class="basic-info">
                        <h4> <u>Purchase</u></h4>
                        <hr>
                        <h5> Purchase Information</h5>
                        <div class="row">
                            <div class="col-md-6 col-12 ">
                                <p><b>Warehouse Name :</b> {{entity.warehouseName}}  </p>
                                <p><b>Organization Name :</b> {{entity.orgName}}  </p>
                                <p><b>Organization Address :</b> {{entity.orgAddress}}  </p>
                                <p><b>Shipping Bill Number :</b> {{entity.shippingBillNumber}}  </p>
                                <p><b>Shipping Bill Date :</b> {{entity.shippingBillDate}}  </p>  

                            </div>
                            <div class="col-md-6 col-12 ">
                                <p><b>Bill of Entry Number :</b> {{entity.billOfEntryNo}}  </p>
                                <p><b>Bill of Entry Office Name :</b> {{entity.officeName}}  </p>
                                <p><b>Bill of Entry Office Address :</b> {{entity.officeAddress}}  </p>
                                <p><b>Bill of Entry Date :</b> {{entity.billOfEntryDate}}  </p>
                            </div>
                        </div>
                    </div>                    
                    <br><br>
                    <div class="basic-info2">
                        <h5> Products </h5> 
                        
                        <v-data-table :headers="headers" :items="entity1" mobile-breakpoint="0" hide-actions>
                        <template slot="items" slot-scope="props" >
                        <td class="text-xs-left w-25">{{ props.item.productName }}</td>
                        <td class="text-xs-left w-5">{{ props.item.unitValue }}</td>
                        <td class="text-xs-left w-5">{{ props.item.totalQuantity }}</td>
                        <td class="text-xs-left w-5">{{ props.item.totalValue }}</td> 
                        </template>
                        </v-data-table>
                            
                    </div>
                    <br><br><br>
                    <div class="row">
                    <div class="col-md-9 col-12">
                        <p><b>Total Purchased Quantity :</b> {{purchaseTotal.purchaseTotalQuantity}}  </p>
                        <p><b>Total Purchased Price :</b> {{purchaseTotal.purchaseTotalValue}}  </p>
                    </div>
                    <div class="col-md-3 col-12">
                        <u><b><p><b>Purchased By :</b> {{entity.purchasePerson}}  </p></b></u>
                        <u><b><p><b>Date :</b> {{entity.purchaseDate}}  </p></b></u>
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
            item: "",
            // entity1:{
            //     "oid":''
            // },
            entity1:[],
            headers: [
                { text: "Product Details", value: "productDetailsOid", align: "left" },
                { text: "Unit Value", value: "unitValue", align: "left" },
                { text: "Total Quantity", value: "totalQuantity", align: "left" },
                { text: "Total Price", value: "totalValue", align: "left" }
            ],
            purchaseTotal: {},
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
        this.getPurchaseView(this.$route.params.id);
        this.getPurchaseDetailsView(this.$route.params.id);
    },
    methods:{
        report(){
            this.snackbar = true;
            this.color = "info"
            this.messageText = "Please wait. Report is generating"
            let body = {
                oid : this.entity.oid
            };

            let req = constant.getRequest(url.operation_purchase_v1_get_by_oid, body);
            lumos_client.onPost(url.operation_purchase_v1_get_by_oid, req)
            .then(result => {
                let res = result.data.header.responseCode;
                window.open(url.baseUrl+url.operation_purchase_v1_get_by_oid+result.data.body.fileName, '_blank')
                this.color = "success"
                this.messageText = "Report Generated Successfully. Please check on the next tab"
            }).catch(error =>{
            });
        },
        getPurchaseView(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.operation_purchase_v1_get_by_oid, body);
            lumos_client.onPost(url.operation_purchase_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier(this.entity);
            }).catch(error =>{
            });
        },
        getPurchaseDetailsView(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.operation_purchase_v1_purchasedetails_get_by_oid, body);
            lumos_client.onPost(url.operation_purchase_v1_purchasedetails_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity1 = result['data']['body']['data'];
                this.purchaseTotal = result['data']['purchaseTotal'];
                this.oidModifier(this.entity1);
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
            if (this.entity.purchaseDate) {
                this.entity.purchaseDate = new Date(this.entity.purchaseDate).toISOString().slice(0, 10);
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