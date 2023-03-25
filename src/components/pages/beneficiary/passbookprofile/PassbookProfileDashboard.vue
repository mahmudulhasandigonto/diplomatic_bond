<template>
    <div class="">
        <div class="loading" v-if="progressBar.loading"></div>
            <v-app  id="inspire" class="container-fluid" >
                <div class="">
                    <div class="asset-top-panel">
                        <div class="row col-12  nopadding">
                            <!-- <router-link tag="button" v-if="showButton()" class="btn btn-primary ripple" :to="{name:'New PassbookProfile'}">
                                <i class="fa fa-plus"></i>  
                                Create Passbook
                            </router-link> -->
                            <span style="margin-left:auto;">
                                <input v-model="search" class="form-control" placeholder="Search...">                  
                            </span>
                        </div>
                    </div>

                <div class="">
                    <!-- <table class="table"> -->
                        <v-data-table
                            :headers="headers"
                            :items="entity"
                            :search="search"
                            :pagination.sync="pagination"
                            :rows-per-page-items="rowsPerPageItems"
                            @update:pagination="updatePagination">

                            <template slot="items" slot-scope="props" >
                    
                                <td class="text-xs-left w-25">{{ props.item.fileNumber }}</td>
                                <td v-show="dspl=false">{{props.item.state }}</td>
                                <!-- <td class="text-xs-left w-7">{{ props.item.fileDate }}</td> -->
                                <!-- <td class="text-xs-left w-10">{{ props.item.slNo }}</td> -->
                                <td class="text-xs-left w-20">{{ props.item.nameOfHolder }}</td>
                                <td class="text-xs-left w-10">{{ props.item.issuedDate }}</td>
                                <td class="text-xs-left w-10">{{ props.item.validUpTo }}</td>   
                                <!-- <td class="text-xs-left w-10">{{ props.item.filePath }}</td> -->     
                                <!-- <td class="text-xs-left w-10">{{ props.item.letterNumber }}</td> -->
                                <!-- <td class="text-xs-left w-10">{{ props.item.letterPath }}</td> -->
                                <!-- <td class="text-xs-left w-10">{{ props.item.issuedBy }}</td> -->
                                <!-- <td class="text-xs-left w-8">{{ props.item.createdBy }}</td> -->
                                <!-- <td class="text-xs-left w-5">{{ props.item.updatedBy }}</td> -->
                                <td class="text-xs-left w-10 mr-3" v-if=" props.item.state ===0 && superUser()">
                                    <span style="background-image: linear-gradient(to right, #ffff1a , #e6e600); color: black; padding: 2px; border-radius: 2px; ">Profile Saved</span>
                                </td>
                                <td class="text-xs-left w-10 mr-3" v-if=" props.item.state === 1">
                                    <span style="background-image: linear-gradient(to right, #DC8B0F , #ffa31a); color: white; padding: 2px; border-radius: 2px; ">Profile Recieved</span>
                                </td>
                                <td class="text-xs-left w-10 mr-3" v-else-if=" props.item.state === 2">
                                    <span style="background-image: linear-gradient(to right, #c6ff1a , #d9ff66); color: black; padding: 2px; border-radius: 2px; ">Profile Updated</span>
                                </td>
                                <td class="text-xs-left w-10 mr-3" v-else-if=" props.item.state === 3">
                                    <span style="background-image: linear-gradient(to right, #4caf50 , #45772C); color: white; padding: 2px; border-radius: 2px; "> Articles Allocated </span>
                                </td>
                                <td class="text-xs-left w-15" v-if=" props.item.state === 4">
                                    <span style="background-image: linear-gradient(to right, #4caf50 , #45772C); color: white; padding: 2px; border-radius: 2px; "> Profile Submitted By FM</span>
                                </td>
                                <!-- <td class="text-xs-left w-12" v-else-if=" props.item.state >= 3">
                                <span style="background-image: linear-gradient(to right, #4caf50 , #45772C); color: white; padding: 2px; border-radius: 2px; "> Articles Allocated</span>
                                </td> -->
                                <td class="text-left w-10" >
                                    
                                    <router-link 
                                        tag="span" 
                                        :to="{name:'Update PassbookProfile', params: { id: props.item.oid }}"
                                        class=" btn-icon-default button-tooltip mr-2">
                                        <i class="fa fa-edit"  aria-hidden="true" ></i>
                                        <span class="button-tooltiptext" >Edit</span>
                                    </router-link>
                                                                        
                                    <router-link
                                        tag="span"
                                        :to="{name:'PassbookProfile View', params: { id: props.item.oid }}"
                                        class=" btn-icon-default button-tooltip mr-2">
                                        <i class="fa fa-eye" aria-hidden="true" style="color:steelblue"></i>
                                        <span class="button-tooltiptext">View Passbook Profile</span>
                                    </router-link>
                                    <router-link
                                        tag="span"
                                        v-if="!!props.item.slNo && !!props.item.nameOfHolder && !!props.item.issuedDate && !!props.item.validUpTo"
                                        :to="{name:'Update GeneralProfileTransaction', params: {type: 'update', id: props.item.gptOid, pid: props.item.oid}}"
                                        class=" btn-icon-default button-tooltip mr-2">
                                        <i class="fa fa-check" aria-hidden="true" style="color:steelblue"></i>
                                        <span class="button-tooltiptext">Assign Articles</span>
                                    </router-link>
                                    <!-- <router-link
                                        tag="span"
                                        v-if="!!props.item.slNo && !!props.item.nameOfHolder && !!props.item.issuedDate && !!props.item.validUpTo"
                                        :to="{name:'GeneralProfileTransaction', params: {id: props.item.oid}}"
                                        class=" btn-icon-default button-tooltip">
                                        <i class="fa fa-check" aria-hidden="true" style="color:steelblue"></i>
                                        <span class="button-tooltiptext">Assign Articles</span>
                                    </router-link> -->
                                    
                                </td>
                    
                            </template>

                            <v-alert slot="no-results-text" :value="true"   icon="warning">
                                Your search for " {{ search }} " found no results.
                            </v-alert>

                        </v-data-table>    
                    <!-- </table> -->
                </div>
            </div>
        </v-app>
    </div>
</template>

<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
export default {
    name: "PassbookProfile",
    data(){
        return{ 
            entity:[],
            headers: [
                //   { text: "", value: "state", align: "left" },
                  { text: "File Number", value: "fileNumber", align: "left" },
                //   { text: "File Date", value: "fileDate", align: "left" },
                //   { text: "Serial", value: "slNo", align: "left" },
                  { text: "Name", value: "nameOfHolder", align: "left" },
                  { text: "Issued Date", value: "issuedDate", align: "left" },
                  { text: "Valid Upto", value: "validUpTo", align: "left" },
                //  { text: "User Type", value: "userType", align: "left" },
                //   { text: "Letter Number", value: "letterNumber", align: "left" },
                //   { text: "Letter Path", value: "letterPath", align: "left" },
                //   { text: "Issued By", value: "issuedBy", align: "left" },
                //   { text: "Created By", value: "createdBy", align: "left" },
                //   { text: "Updated By", value: "updatedBy", align: "left" },
                  { text: "Profile Status", value: "profileStatus", align: "left" },
                  
                  { text: "", value: "", align: "center", sortable: false }
            ],
            pagination: {sortBy: 'state', ascending: true},
            rowsPerPageItems: [15, 20, 30, 50],
            search: "",
            // sortBy: 'issuedDate',
            // sortDesc: false,
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
        this.getPassbookProfile()
    }, 
    methods:{
        updatePagination (pagination) {
            let limit = pagination.rowsPerPage
            let offset = (pagination.page - 1) * limit;
        },
         showButton(){
            if(localStorage.getItem("lumos_roleOid")=='nbrofficer'){
                return true;
            } else {
                return false;
            }
        },
        superUser(){
            if(localStorage.getItem("lumos_roleOid")==='sa' || localStorage.getItem("lumos_roleOid")==='admin'){
                return true;
            }
        },
        getPassbookProfile(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {data: this.$route.params.data};
            let req = constant.getRequest(url.master_generalprofile_v1_get_list, body);
            lumos_client.onPost(url.master_generalprofile_v1_get_list, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;                
                this.entity = result['data']['body']['data'];                
            }).catch(error => {
            });
        },
        // getShow(slno){
        //     this.progressBar.loading = true;
        //     this.progressBar.show = true;
        //     let body = {slno: slno}; 
        //     let req = constant.getRequest(url.operation_ledgerinfo_v1_get_by_oid, body);
        //     lumos_client.onPost(url.operation_ledgerinfo_v1_get_by_oid, req)
        //     .then(result => {
        //         this.entity = result.data.body;
        //         this.showDetails = true
        //         this.oidModifier(this.entity);
        //         let res = result.data.header.responseCode;
        //         if (res != "200"){
        //             this.color = "red"; 
        //             this.messageText =  result.data.body.data;
        //             return;
        //         }
        //         this.color = "success";
        //         //this.messageText = "User information has been loaded Successfully.";
        //         //this.messageText = "LedgerInfo Saved Successfully";
        //         setTimeout( () => this.entity = {
        //             slno: this.entity.slno,
        //             nameOfHolder: this.entity.nameOfHolder,
        //             generalProfileTransactionOid: this.entity.generalProfileTransactionOid,
        //             designationofholder: this.entity.designationofholder,
        //             userType: this.entity.userType,
        //             nameofembassy: this.entity.nameofembassy,
        //             issueddate: this.entity.issueddate,                    
        //             validupto: this.entity.validupto,
        //             quarteroid: this.entity.quarteroid,
        //             warehouseOid: this.entity.warehouseOid,
        //             warehouseName: this.entity.warehouseName,
        //             allocatepieces: this.entity.allocatepieces,
        //             allocatevalue: this.entity.allocatevalue,
        //             consumepieces: this.entity.consumepieces,
        //             consumevalue: this.entity.consumevalue,
        //             quarterStartDate : this.entity.quarterStartDate,
        //             quarterEndDate: this.entity.quarterEndDate,
        //             "documents":[{   
        //                         categoryOid: "",
        //                         productOid: "",                      
        //                         unitQuantity: "",
        //                         unitValue: "",
        //                         totalQuantity: "",
        //                         totalValue: ""
        //                         }],
        //         }, 1000 )
        //         this.progressBar.loading = false;
        //         this.progressBar.show = false;
        //     }).catch(error =>{
        //         this.$log.error(error)
        //     });
        // },
    }
}

</script>

<style scoped>
.assetCategory-list{
    background: white;
    padding: 10px 10px;
    width:auto;
}
.overlap {
  overflow-y: visible;
  overflow-x: visible;
}
.nothing-new{
    position: relative;
}
</style>
