<template>
  <div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <v-app  id="inspire" class="container-fluid" >
     <div class="">
        <div class="asset-top-panel">
            <div class="row col-12  nopadding">
                <router-link tag="button" v-if="showButton()" class="btn btn-success ripple" style="background-color:#3f740d; border:none;" :to="{name:'New DpLedgerInfo'}">
                    <i class="fa fa-plus"></i>  
                    Sell
                </router-link>
                <span style="margin-left:auto;">
                    <input v-model="search" class="form-control" placeholder="Search...">                  
                </span>
            </div>
        </div>
       
        <div class="">
            <v-data-table
                disable-initial-sort
                :headers="headers"
                :items="entity"
                :search="search"
                :rows-per-page-items="rowsPerPageItems"
                @update:pagination="updatePagination"        
            >

            <template slot="items" slot-scope="props" >
                <td class="text-xs-left w-15">{{ props.item.passportNo }}</td>
                <td class="text-xs-left w-15">{{ props.item.nameOfHolder }}</td>
                <!--<td class="text-xs-left w-15">{{ props.item.warehouseName }}</td>-->
                <td class="text-xs-left w-14">{{ props.item.salesPerson }}</td>
                <td class="text-xs-left w-20">{{ props.item.salesDate }}</td>
                <td class="text-xs-left w-10">{{ props.item.totalQuantity }}</td>
                <td class="text-xs-left w-10">{{ props.item.totalValue }}</td>
               <td class="text-center w-6">
                    <!-- <router-link 
                    tag="span" 
                    :to="{name:'Update LedgerInfo', params: { id: props.item.oid }}"
                    class=" btn-icon-default button-tooltip mr-2">
                    <i class="fa fa-edit" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Edit</span>
                    </router-link> -->
                    <router-link
                        tag="span"
                        :to="{name:'DpLedgerInfo View', params: { id: props.item.oid }}"
                        class=" btn-icon-default button-tooltip mr-3">
                        <i class="fa fa-eye" aria-hidden="true" style="color:steelblue"></i>
                        <span class="button-tooltiptext">View Sales</span>
                    </router-link>
                    <!--<button v-if="checkIType(props.item.type)" class="btn-icon-default button-tooltip mr-3"
                     @click="revertConfirmation(props.item.oid)"> 
                        <i class="fa fa-check" style="color: green;" aria-hidden="true"></i>
                        <span class="button-tooltiptext">Revert Sales</span>
                    </button>-->
                    <!--<button v-if="checkUType(props.item.type)" class="btn-icon-default button-tooltip mr-3"> 
                        <i class="fa fa-times" style="color: red;" aria-hidden="true"></i>
                    </button>-->
                    <button class="btn-icon-default button-tooltip mr-3" :disabled="bondCheck(props.item.bondCheck)" @click="report(props.item.oid)">
                        <i class="fa fa-print" aria-hidden="true" ></i>
                        <span class="button-tooltiptext">Print</span>
                    </span> 
                    </button>
                    
                </td>
            </template>
            <v-alert slot="no-results-text" :value="true"   icon="warning">
                Your search for " {{ search }} " found no results.
            </v-alert>
            </v-data-table>    
        </div>
        </div>
        <v-dialog  v-model="revertSalesModel"  max-width="400" >
            <v-card>                                    
            <v-card-text>
            <h5>Are you sure, You want to Revert Sales?</h5>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="revertSales()">
                Yes
                </v-btn>
                <v-btn color="red darken-1" flat="flat" @click.native="revertSalesModel = false">
                No
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
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
export default {
    name: "Bank",
    data(){
        return{
            entity:[],
            headers: [
                { text: "Passport No.", value: "passportNo", align: "left" },
                { text: "Holder Name", value: "nameOfHolder", align: "left" },
                // { text: "Warehouse Name", value: "warehouseName", align: "left" },
                { text: "Sales Person", value: "salesPerson", align: "left" },
                { text: "Sales Date", value: "salesDate", align: "left" },                
                { text: "Total Quantity", value: "totalQuantity", align: "left" },
                { text: "Total Value", value: "totalValue", align: "left" },                
                { text: "", value: "", align: "center", sortable: false }
            ],
            // pagination: {sortBy: 'salesDate', descending: true},
            revertSalesModel: false,
            salesOid: "",
            rowsPerPageItems: [15, 50, 100, 150],
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
        this.getLedgerInfo()
    }, 
    methods:{
        updatePagination (pagination) {
            let limit = pagination.rowsPerPage
            let offset = (pagination.page - 1) * limit;
        },
        checkUType(type){
            if(type == 'U'){
                return true;
            }
        },
        checkIType(type){
            if(type == 'I'){
                return true;
            }
        },
        showButton(){
            if(localStorage.getItem("lumos_roleOid")=='aroofficer' || localStorage.getItem("lumos_roleOid")=='roofficer' || localStorage.getItem("lumos_roleOid") == "warehouseoperation"){
                return true;
            } else {
                return false;
            }
        },
        revertConfirmation(oid){
            this.revertSalesModel = true
            this.salesOid = oid
        },
        bondCheck(bondCheck){
            if(bondCheck=='N'){
                return true;
            }
        },
        report(oid){
            this.snackbar = true;
            this.color = "info"
            this.messageText = "Please wait. Invoice is generating"
            let body = {
                oid : oid,
                userType: "DP"
            };

            let req = constant.getRequest(url.operation_report_v1_get_sales_invoice, body);
            lumos_client.onPost(url.operation_report_v1_get_sales_invoice, req)
            .then(result => {
                let res = result.data.header.responseCode;
                window.open(url.baseUrl + url.operation_report_v1_download + result.data.body.fileName,"_blank");
                // window.open(url.baseUrl+url.operation_report_v1_get_sales_invoice+result.data.body.fileName, '_blank')
                this.color = "success"
                this.messageText = "Report Generated Successfully. Please check on the next tab"
            }).catch(error =>{
            });
        },
        revertSales() {             
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = url.operation_ledgerinfo_v1_update;               
                let body = {oid: this.salesOid}; 
                let req = constant.getRequest(http_url, body); 
                lumos_client.onPost(http_url, req)
                .then(result => {
                    this.progressBar.loading = false;
                    this.progressBar.show = false;                
                    let res = result.data.header.responseCode;
                    this.snackbar = true;
                    if (res != "200"){
                        this.color = "red"; 
                        this.messageText =  result.data.body.data;
                        return;
                    }
                    this.color = "success"; 
                    this.messageText = "Sales has been Successfully Reverted";
                    this.revertSalesModel = false;
                    this.getLedgerInfo();              
           
                }).catch(error => {
                    this.$log.error(error)
                })  
        },
        getLedgerInfo(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.operation_dpledgerinfo_v1_get_list, body);
            lumos_client.onPost(url.operation_dpledgerinfo_v1_get_list, req)
            .then(result => {                
                this.progressBar.loading = false;
                this.progressBar.show = false;
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

</style>
