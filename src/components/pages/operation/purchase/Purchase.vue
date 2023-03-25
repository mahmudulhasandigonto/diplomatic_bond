<template>
  <div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <v-app  id="inspire" class="container-fluid" >
     <div class="">
        <div class="asset-top-panel">
            <div class="row col-12  nopadding">
                <router-link tag="button" v-if="showButton()" class="btn btn-success ripple" style="background-color:#3f740d; border:none;" :to="{name:'New Purchase'}">
                    <i class="fa fa-plus"></i>  
                    Purchase
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
                 
            <template slot="items" slot-scope="props">
                <td class="text-xs-left w-15" >{{ props.item.billOfEntryNo }}</td>
                <td class="text-xs-left w-15">{{ props.item.billOfEntryOfficeCode }}</td>
                <td class="text-xs-left w-14">{{ props.item.purchasePerson }}</td>
                <td class="text-xs-left w-20">{{ props.item.purchaseDate }}</td>
                <td class="text-xs-left w-10">{{ props.item.totalQuantity }}</td>
                <td class="text-xs-left w-10">{{ props.item.totalValue }}</td>
             
                <td class="text-center w-6">
                    <!-- <router-link 
                    tag="span" 
                    :to="{name:'Update Purchase', params: { id: props.item.oid }}"
                    class=" btn-icon-default button-tooltip mr-2">
                    <i class="fa fa-edit" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Edit</span>
                    </router-link> -->
                    <router-link
                        tag="span"
                        :to="{name:'Purchase View', params: { id: props.item.oid }}"
                        class=" btn-icon-default button-tooltip mr-3">
                        <i class="fa fa-eye" aria-hidden="true" style="color:steelblue"></i>
                        <span class="button-tooltiptext">View Purchase</span>
                    </router-link>                    
                    <!--<button v-if="checkIType(props.item.type, props.item.totalSoldQuantity)" class="btn-icon-default button-tooltip mr-3"
                     @click="revertConfirmation(props.item.oid)"> 
                        <i class="fa fa-check" style="color: green;" aria-hidden="true"></i>
                        <span class="button-tooltiptext">Revert Purchase</span>
                    </button>-->
                    <!--<button v-if="checkSoldQuantity(props.item.type, props.item.totalSoldQuantity)" class="btn-icon-default button-tooltip mr-3"> 
                        <i class="fa fa-check" style="color: green;" aria-hidden="true"></i>
                        <span class="button-tooltiptext">Revert Purchase</span>
                    </button>-->
                    <button v-if="checkUType(props.item.type)" class="btn-icon-default button-tooltip mr-3"> 
                        <i class="fa fa-times" style="color: red;" aria-hidden="true"></i>
                    </button>
                    
                </td>
                
            </template>
            <v-alert slot="no-results-text" :value="true"   icon="warning">
                Your search for " {{ search }} " found no results.
            </v-alert>
            </v-data-table>    
        </div>
        </div>
        <v-dialog  v-model="revertPurchaseModel"  max-width="400" >
            <v-card>                                    
            <v-card-text>
            <h5>Are you sure, You want to revert purchase?</h5>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="revertPurchase()">
                Yes
                </v-btn>
                <v-btn color="red darken-1" flat="flat" @click.native="revertPurchaseModel = false">
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
import * as moment from 'moment';
export default {
    name: "Bank",
    data(){
        return{
            entity:[],
            headers: [
                { text: "Bill Of Entry No", value: "billOfEntryNo", align: "left" },
                { text: "Bill Of Entry Office", value: "billOfEntryOfficeId", align: "left" },
                { text: "Purchased Person", value: "purchasePerson", align: "left"},
                { text: "Purchased Date", value: "purchaseDate", align: "left" },
                { text: "Total Quantity", value: "totalQuantity", align: "left" },
                { text: "Total Price", value: "totalValue", align: "left" },
                { text: "", value: "", align: "center" }
            ],
            // pagination: {sortBy: 'purchaseDate', ascending:true},
            // columnName:'purchaseDate',
            // isDescending:true,
            rowsPerPageItems: [15, 50, 100, 150],
            search: "",
            revertPurchaseModel: false,
            purchaseOid: "",
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
        this.getPurchase()
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
        checkIType(type, soldTotalQuantity){
            if(type == 'I' && soldTotalQuantity==0){
                return true;
            } 
        },
        checkSoldQuantity(type, soldTotalQuantity){
            if(type == 'I' && soldTotalQuantity>0){
                return true;
            } 
        },
        bgc(type){
            if(type =='U'){
                return '#FFA500';
            } else {
                return '#FFFFFF';
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
            this.revertPurchaseModel = true
            // this.itemIndex = index
            this.purchaseOid = oid
        }, 
        revertPurchase() {             
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = url.operation_purchase_v1_update;               
                let body = {oid: this.purchaseOid}; 
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
                    this.messageText = "Purchase has been Successfully Reverted";
                    this.revertPurchaseModel = false;
                    this.getPurchase();
                    // this.getGeneralProfileTransaction(this.$route.params.id)                
           
                }).catch(error => {
                    this.$log.error(error)
                })               
            // }); 
        },
        getPurchase(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.operation_purchase_v1_get_list, body);
            lumos_client.onPost(url.operation_purchase_v1_get_list, req)
            .then(result => {                
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body']['data'];
                // this.oidModifier(this.entity);
                // this.isDescending = false
                console.log(this.entity)
            }).catch(error => {
            });
        },
        oidModifier(entity){
            // let entity1=[]
            this.entity.forEach(element => {
                // element.billOfEntryDate = element.billOfEntryDate.substring(0,11);
                // element.orderDate = element.orderDate.substring(0,11);
                // entity1.push(element)
                let purchaseTime = ""
                if(element.purchaseDate){
                    purchaseTime = element.purchaseDate.toString().substring(12)
                    // element.purchaseDate = new Date(element.purchaseDate.toString().substring(0,12).toISOString());
                    element.purchaseDate = moment(element.purchaseDate).format('DD-MM-YYYY');
                    // console.log(purchaseTime)
                    console.log(element.purchaseDate)
                }
                entity.purchaseTime = purchaseTime
            });
            // this.entity = entity1            
            
            // if(this.entity.orderDate){
            //     this.entity.orderDate = this.entity.orderDate.substring(0, 10);
            //     this.entity.orderDate = new Date(this.entity.orderDate);
            // }
        },
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
