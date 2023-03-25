<template>
    <div class="container-fluid">
        <v-tabs
            color="#C9FFBA"
            center-active
        >
            <div class="d-flex align-items-center d-flex justify-content-start">
                <v-tab ripple class="icon">
                    <h5><b>{{cardCount.warehouseName}}</b></h5>
                </v-tab>
            </div>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <!-- &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; -->
            <div class="d-flex align-items-center">
                <div classs="row">
                    <div class="text-dark">
                        <div v-if="showWarehouse()" class="d-flex justify-content-end">   
                            <div class="col">
                                <h6><b>Fiscal Year: </b>{{this.cardCount.fiscalYear}}</h6>
                            </div>|
                            <div class="col">
                                <h6><b>Warehouse Limit: </b>$ {{this.cardCount.allocateValue}}</h6>
                            </div>|
                            <div class="col">
                                <h6><b>Warehouse Consume: </b>$ {{this.cardCount.consumeValue}}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        <!-- <div v-if="showWarehouse()" class="row justify-content-center">
            <div class="col-md-3">
                <h5>Fiscal Year: {{this.cardCount.fiscalYear}}</h5>
            </div>
            <div class="col-md-4">
                <h5>Warehouse Limit: $ {{this.cardCount.allocateValue}}</h5>
            </div>
            <div class="col-md-3">
                <h5>Warehouse Consume: $ {{this.cardCount.consumeValue}}</h5>
            </div>
        </div> -->
         
        <v-tab-item class="mt-3">
            <div class="loading" v-if="progressBar.loading"></div>
                
                <!-- <div classs="row">
                    <div class="d-flex align-items-center">
                    <div class="text-white bg-info">
                        <div v-if="showWarehouse()" class="d-flex justify-content-around">   
                            <div class="col">
                                <h6>Fiscal Year: {{this.cardCount.fiscalYear}}</h6>
                            </div>
                            <div class="col">
                                <h6>Warehouse Limit: $ {{this.cardCount.allocateValue}}</h6>
                            </div>
                            <div class="col">
                                <h6>Warehouse Consume: $ {{this.cardCount.consumeValue}}</h6>
                            </div>
                        </div>
                    </div>
                    </div>
                </div> -->

                <br>
                
                <div class="row">
                    
                    <!-- <div v-if="showWarehouse()" class="d-flex justify-content-around">
                        <div class="col-12 col-md-4">
                            <p>Fiscal Year: {{this.cardCount.fiscalYear}}</p>
                        </div>
                        <div class="col-12 col-md-4">
                            <p>Warehouse Limit: $ {{this.cardCount.allocateValue}}</p>
                        </div>
                        <div class="col-12 col-md-4">
                            <p>Warehouse Consume: $ {{this.cardCount.consumeValue}}</p>
                        </div>
                    </div> -->

                    <!-- total running project -->

                    <!-- <div class="col-6 col-md-3 ">
                        <div class="small-box text-white" style="background-color:#5598D7">
                            <div class="inner">
                                <h3>{{cardCount.label1}}</h3>                            
                            </div>
                            <div class="icon">
                                <i class="fa fa-share"></i>
                            </div>
                            <div class="small-box-footer" >
                                <h6>{{label1txt}}</h6>
                            </div>
                        </div>
                    </div>     -->
                    <div class="col-6 col-md-3 " style="cursor: pointer;" @click="redirectToGrid1">
                            <div class="small-box text-white" style="background-color:#5598D7">
                                <div class="inner">
                                    <h3>{{cardCount.label1}}</h3>                            
                                </div>
                                <div class="icon">
                                    <i class="fa fa-briefcase"></i>
                                </div>
                                <div class="small-box-footer" >
                                    <h6>{{label1txt}}</h6>
                                </div>      
                            </div>
                    </div>

                    <!-- total completed project -->
                    <div class="col-6 col-md-3 " style="cursor: pointer;" @click="redirectToGrid2">
                        <div class="small-box text-white" style="background-color:#6AD553">
                            <div class="inner">
                                <h3>{{cardCount.label2}}</h3>
                                <!-- <p>{{label2txt}}</p> -->
                            </div>
                            <div class="icon">
                                <i class="fa fa-spinner"></i>
                            </div>
                            <div class="small-box-footer" >
                                <h6>{{label2txt}}</h6>
                            </div>
                            <!-- <router-link class="small-box-footer" :to="{name:'Project Search', params:{search: 'Completed'}}">
                                <i class="fa fa-arrow-circle-right"></i>
                                More info
                            </router-link> -->
                        </div>
                    </div>

                    <!-- total issue count -->
                    <div class="col-6 col-md-3 " style="cursor: pointer;" @click="redirectToGrid3">
                        <div class="small-box bg-secondary text-white">
                            <div class="inner">
                                <h3>{{cardCount.label3}}</h3>
                                <!-- <p>{{label3txt}}</p> -->
                            </div>
                            <div class="icon">
                                <i class="fa fa-edit"></i>
                            </div>
                            <div class="small-box-footer" >
                                <h6>{{label3txt}} | {{cardCount.label3date}}</h6>
                            </div>
                            <!-- <router-link class="small-box-footer" :to="{name:'DC'}">
                                <i class="fa fa-arrow-circle-right"></i>
                                More info
                            </router-link> -->
                        </div>
                    </div>

                    <!-- total project count -->
                    <div class="col-6 col-md-3 padding-7" style="cursor: pointer;" @click="redirectToGrid4">
                        <div class="small-box bg-info">
                            <div class="inner">
                                <h3>{{cardCount.label4}}</h3>
                                <!-- <p>{{label4txt}}</p> -->
                            </div>
                            <div class="icon">
                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                            </div>
                            <div class="small-box-footer" >
                                <h6>{{label4txt}} | {{cardCount.label4date}}</h6>
                            </div>
                            <!-- <router-link class="small-box-footer" :to="{name:'DC Stage'}">
                                <i class="fa fa-arrow-circle-right"></i>
                                More info
                            </router-link> -->
                        </div>
                    </div>
                </div>
                

            <!-- <div class="row">
                <div class="col-6 col-12 col-md-6">
                    <div class="card dashboard-container">
                        <div class="card-header bg-info">
                            <h5>Total Count</h5>
                        </div>
                        <div class="card-body">
                            <v-app>
                                <div>
                                    <v-data-table
                                    :headers="headers"
                                    :items="dcstateCount"
                                    hide-actions
                                    >
                                        <template slot="items" slot-scope="props" >
                                            <router-link tag="tr" :to="{name:'DC Stage Search', params:{search: props.item.label}}">
                                                <td class="text-xs-left">{{ props.item.label }}</td>
                                                <td class="text-xs-right">{{ props.item.value }}</td>
                                            </router-link>
                                        </template>
                                    </v-data-table>
                                </div>
                            </v-app>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-12 col-md-6">
                    <div class="card dashboard-container">
                        <div class="card-header bg-success">
                            <h5>Total Count </h5>
                        </div>
                        <div class="m-1 progresses">
                            <div class="pb-2" v-for="(item, index) in dcTrackingList" :key="index">
                                <h6>Project Name : {{ item.projectName }}</h6>
                                <router-link tag="div" class="progress p-1" style="height: 25px;" :to="{name:'DC Track', params:{id: item.dcoid}}">
                                    <div class="progress-bar " role="progressbar" :style="'width:'+ item.progress + '%'" :aria-valuenow="item.progress" aria-valuemin="0" aria-valuemax="100">{{item.progress + ' %'}}</div>
                                    <div class="tooltips">
                                        <table class="tooltiptext table table-borderless table-sm">
                                            <tr><td>Product Name</td><td>:   {{ item.productName }}</td></tr>
                                            <tr><td>Mode Of DC</td><td>:   {{ item.modeOfDC }}</td></tr>
                                            <tr><td>Type Of DC</td><td>:   {{ item.typeOfDC }}</td></tr>
                                            <tr><td>Shipment Mode</td><td>:   {{ item.shipmentMode }}</td></tr>
                                            <tr><td>DC State Order</td><td>:   {{ item.dcStateOrder }}</td></tr>
                                            <tr><td>DC State Name</td><td>:   {{ item.dcStateName }}</td></tr>
                                        </table>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </v-tab-item>
        
            

        <!-- <v-tab-item class="mt-3">
            <v-card flat>
                    <div class="ml-2">
                        <button class="btn btn-primary ripple" @click="filterDCbyStatus('Running')">Running</button>
                        <button class="btn btn-success ripple" @click="filterDCbyStatus('Completed')">Completed</button>
                        <b-dropdown id="dropdown-1" text="Filter Shipment Mode" class="m-md-2">
                            <b-dropdown-item @click="filterDC('Air')">Air</b-dropdown-item>
                            <b-dropdown-item @click="filterDC('Sea')">Sea</b-dropdown-item>
                            <b-dropdown-item @click="filterDC('Land')">Land</b-dropdown-item>
                            <b-dropdown-item @click="filterDC('E-Delivery')">E-Deliver</b-dropdown-item>
                        </b-dropdown>

                        <b-dropdown id="dropdown-1" text="Refresh Rate" class="m-md-2 float-right" variant="outline-primary">
                            <b-dropdown-item @click="againCall(900000)">15 min</b-dropdown-item>
                            <b-dropdown-item @click="againCall(1800000)">30 min</b-dropdown-item>
                            <b-dropdown-item @click="againCall(3600000)">1 hour</b-dropdown-item>
                            <b-dropdown-item @click="againCall(7200000)">2 hours</b-dropdown-item>
                        </b-dropdown>    
                        <h6 class="float-right refresh-text">Refresh after {{ countDown }}</h6>
                    </div>
                    <div>
                        <v-data-table
                            :headers="dcHeaders"
                            :items="DCList"
                            :search="searchDC"
                            hide-actions
                        >
                            <template slot="items" slot-scope="props" >
                                <td class="text-xs-left">{{ props.index + 1 }}</td>
                                <td class="text-xs-left">{{ props.item.dcNumber }}</td>
                                <td class="text-xs-left">{{ props.item.dcCreationDate }}</td>
                                <td class="text-xs-left">{{ props.item.productName }}</td>
                                <td class="text-xs-left">{{ props.item.supplierName }}</td>
                                <td class="text-xs-left">{{ props.item.projectName }}</td>
                                <td class="text-xs-left">{{ props.item.shipmentMode }}</td>
                                <td class="text-xs-left">{{ props.item.dcStateName }}</td>
                            </template>
                        </v-data-table>
                    </div>
                </v-card>
        </v-tab-item>       -->
    </v-tabs>
</div>
</template>

<script>
import moment from 'moment';
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import * as _ from 'underscore';

export default {
    data() {
        return {
            entity:[],
            DCList:[],
            // dcHeaders: [
            //     { text: "#", value: "", align: "left" },
            //     { text: "DC Number", value: "dcNumber", align: "left" },
            //     { text: "DC Creation Date", value: "dcCreationDate", align: "left" },
            //     { text: "Product", value: "productName", align: "left" },
            //     { text: "Supplier", value: "supplierName", align: "left" },
            //     { text: "Project", value: "projectName", align: "left" },
            //     { text: "Shipment Mode", value: "shipmentMode", align: "left" },
            //     { text: "DC Status", value: "dcStateName", align: "left" },
            // ],
            pagination: {},
            rowsPerPageItems: [15, 20, 30, 50],
            dcTrackingList : [],
            dcstateCount:[],
            // headers: [
            //     { text: "Count", value: "label", align: "left" },
            //     { text: "Count", value: "value", align: "right" }
            // ],
            cardCount:{
                "totalDCstates": 0,
                "totalDCs": 0,
                "runningProjects": 0,
                "completedProjects": 0,
                "label1": 0,
                "label2": 0,
                "label3": 0,
                "label4": 0,
                "label1date": '',
                "label2date": '',
                "label3date": '',
                "label4date": '',
                "fiscalYear": '',
                "allocateValue": '',
                "consumeValue": ''
            },
            progressBar:{
                loading: false,
                show: false
            },
            searchDC: '',
            countdownText: '00:00:00',
            intervalTime: 900000,
            restartTimer: '',
            calcInterval: '',
            label1txt: '',
            label2txt: '',
            label3txt: '',
            label4txt: '',
            warehouseName: ''
        }
    },
    computed: {
        countDown() {
            return this.countdownText
        }
    },
    mounted(){
        

        if(localStorage.getItem("lumos_roleOid") == "aroofficer" || localStorage.getItem("lumos_roleOid") == "roofficer" || localStorage.getItem("lumos_roleOid") == "warehouseadmin" || localStorage.getItem("lumos_roleOid") == "warehouseoperation"){
                this.getWarehouseDetails()
                this.getProductCounts()
                this.getParchaseCounts()
                this.getSalesCounts()
                this.getWarehouseLimit(localStorage.getItem("lumos_warehouseOid"))               
        }
        if(localStorage.getItem("lumos_roleOid") == "nbrofficer"){
                this.Box1 = "BasicProfile"
                this.getGeneralProfileCount()                
                this.cardCount.warehouseName = "NBR";
        }
        if(localStorage.getItem("lumos_roleOid") == "fmofficer" || localStorage.getItem("lumos_roleOid") == "fmoperator"){
                this.Box1 = "BasicProfile"
                this.getGeneralProfileCount()                
                this.cardCount.warehouseName = "Foreign Ministry";
        }
        if(localStorage.getItem("lumos_roleOid") == "bondofficer"){
                this.getGeneralProfileBONDCount()                
                this.cardCount.warehouseName = "BOND";
        }
        if(localStorage.getItem("lumos_roleOid") == "sa"){
                this.getGeneralProfileAdminCount()                
                this.cardCount.warehouseName = "Super Admin";
        }
        if(localStorage.getItem("lumos_roleOid") == "admin"){
                this.getGeneralProfileAdminCount()                
                this.cardCount.warehouseName = "Admin";
        }
    },
    methods:{
        showWarehouse(){
            // warehouseoperation warehouseadmin
            if(localStorage.getItem('lumos_roleOid') == 'aroofficer' || localStorage.getItem('lumos_roleOid') == 'roofficer' || localStorage.getItem("lumos_roleOid") == "warehouseadmin" || localStorage.getItem("lumos_roleOid") == "warehouseoperation"){
                return true;
            }
        },
        redirectToGrid1 () {
            if(localStorage.getItem('lumos_roleOid')=='nbrofficer' || localStorage.getItem('lumos_roleOid')=='fmofficer' || localStorage.getItem('lumos_roleOid')=='fmoperator'){
                this.$router.push(
                    {
                        // path: '/beneficiary/basicprofile',
                        // params: { data: 'pending'}
                        name: 'Pending BasicProfile', 
                        params: { data: 'pending' }
                    }
                ) 
            } else if(localStorage.getItem('lumos_roleOid')=='bondofficer'){
                this.$router.push(
                    {
                    // path: '/beneficiary/passbookprofile'
                    name: 'Pending PassbookProfile', 
                    params: { data: 'pending passbook' }
                    }
                )
            }
        },
        redirectToGrid2 () {
            if(localStorage.getItem('lumos_roleOid')=='nbrofficer' || localStorage.getItem('lumos_roleOid')=='fmofficer'|| localStorage.getItem('lumos_roleOid')=='fmoperator'){
                this.$router.push(
                    {
                        // path: '/beneficiary/basicprofile',
                        name: 'BasicProfile Send', 
                        params: { data: 'totalSend' }
                    }
                ) 
            } else if(localStorage.getItem('lumos_roleOid')=='bondofficer'){
                this.$router.push(
                    {
                        // path: '/beneficiary/passbookprofile'
                        name: 'Active PassbookProfile', 
                        params: { data: 'active passbook' }
                    }
                )
            }
        },
        redirectToGrid3 () {
            if(localStorage.getItem('lumos_roleOid')=='nbrofficer' || localStorage.getItem('lumos_roleOid')=='fmofficer' || localStorage.getItem('lumos_roleOid')=='fmoperator'){
                this.$router.push(
                    {
                        // path: '/beneficiary/basicprofile',
                        name: 'Pending BasicProfile', 
                        params: { data: 'pendingToday' }
                    }
                ) 
            } else if(localStorage.getItem('lumos_roleOid')=='bondofficer'){
                this.$router.push(
                    {
                        path: '/beneficiary/exemptionprofile'
                    }
                )
            }
        },
        redirectToGrid4 () {
            if(localStorage.getItem('lumos_roleOid')=='nbrofficer' || localStorage.getItem('lumos_roleOid')=='fmofficer' || localStorage.getItem('lumos_roleOid')=='fmoperator'){
                this.$router.push(
                    {
                        // path: '/beneficiary/basicprofile',
                        name: 'BasicProfile Send', 
                        params: { data: 'totalSendToday' }
                    }
                ) 
            } else if(localStorage.getItem('lumos_roleOid')=='bondofficer'){
                this.$router.push(
                    {
                        // path: '/beneficiary/exemptionprofile'
                        name: 'Active ExemptionProfile', 
                        params: { data: 'active exemption' }
                    }
                )
            }
        },
        updatePagination (pagination) {
            let limit = pagination.rowsPerPage
            let offset = (pagination.page - 1) * limit
        },
        async getWarehouseLimit(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.master_dashboard_v1_get_warehouse_limit_by_oid, body);
            try {
                let result = await lumos_client.onPost(url.master_dashboard_v1_get_warehouse_limit_by_oid, req)
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.cardCount.fiscalYear= result['data']['body']['data'][0].fiscalYear;
                this.cardCount.allocateValue= result['data']['body']['data'][0].allocateValue;
                this.cardCount.consumeValue = result['data']['body']['data'][0].consumeValue;
            } catch (error) {
            }

        },
        async getProductCounts(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.master_dashboard_v1_get_product_count, body);
            try {
                let result = await lumos_client.onPost(url.master_dashboard_v1_get_product_count, req)
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.label1txt = "Current Stock (Quantity)";
                this.label2txt = "Current Stock (Price)";
                this.cardCount.label1 = result['data']['body']['data'][0].label1;
                this.cardCount.label2 = result['data']['body']['data'][0].label2;
                
            } catch (error) {
            }
        },
        async getParchaseCounts(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.master_dashboard_v1_get_parchase_count, body);
            try {
                let result = await lumos_client.onPost(url.master_dashboard_v1_get_parchase_count, req)
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.label3txt = "Purchase (Price)";
                this.cardCount.label3date = result['data']['body']['data'][0].label3date;
                this.cardCount.label3 = result['data']['body']['data'][0].label3;                
            } catch (error) {
            }
        },
        async getSalesCounts(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.master_dashboard_v1_get_sales_count, body);
            try {
                let result = await lumos_client.onPost(url.master_dashboard_v1_get_sales_count, req)
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.label4txt = "Sales (Price)";
                this.cardCount.label4date = result['data']['body']['data'][0].label4date;
                this.cardCount.label4 = result['data']['body']['data'][0].label4;
            } catch (error) {
            }
        },
        async getWarehouseDetails(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.master_dashboard_v1_get_warehouse_list, body);
            try {
                let result = await lumos_client.onPost(url.master_dashboard_v1_get_warehouse_list, req)
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.cardCount.warehouseName = result['data']['body']['data'][0].warehouseName;
            } catch (error) {
            }
        },
        async getGeneralProfileCount(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.master_dashboard_v1_get_generalprofile_count, body);
            try {
                let result = await lumos_client.onPost(url.master_dashboard_v1_get_generalprofile_count, req)
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.label1txt = "Total Pending";
                this.label2txt = "Total (Send to Bond)";
                this.label3txt = "Pending";
                this.label4txt = "Send to Bond";
                this.cardCount.label3date = "Today";
                this.cardCount.label4date = "Today";
                // this.cardCount.label4date = result['data']['body']['data'][0].label4date;

                this.cardCount.label1 = result['data']['body']['data'][0].label1;
                this.cardCount.label2 = result['data']['body']['data'][0].label2;
                this.cardCount.label3 = result['data']['body']['data'][0].label3;
                this.cardCount.label4 = result['data']['body']['data'][0].label4;
            } catch (error) {
            }
        },
        async getGeneralProfileBONDCount(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.master_dashboard_v1_get_generalprofile_count, body);
            try {
                let result = await lumos_client.onPost(url.master_dashboard_v1_get_generalprofile_count, req)
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.label1txt = "Passbook Pending";
                this.label2txt = "Passbook Active";
                this.label3txt = "Exemption Certificate Pending";
                this.label4txt = "Exemption Certificate Active";
                // this.cardCount.label1date = "Today";
                // this.cardCount.label2date = "Today";
                this.cardCount.label3date = "Today";
                this.cardCount.label4date = "Today";
                // this.cardCount.label3date = result['data']['body']['data'][0].label3date;
                // this.cardCount.label4date = result['data']['body']['data'][0].label4date;

                this.cardCount.label1 = result['data']['body']['data'][0].label1;
                this.cardCount.label2 = result['data']['body']['data'][0].label2;
                this.cardCount.label3 = result['data']['body']['data'][0].label3;
                this.cardCount.label4 = result['data']['body']['data'][0].label4;
            } catch (error) {
            }
        },
        async getGeneralProfileAdminCount(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.master_dashboard_v1_get_generalprofile_count, body);
            try {
                let result = await lumos_client.onPost(url.master_dashboard_v1_get_generalprofile_count, req)
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.label1txt = "Total Saved Certificate";
                this.label2txt = "Total send to Bond";
                this.label3txt = "Saved for bond";
                this.label4txt = "Total Saved Bond";
                this.cardCount.label3date = "Today";
                this.cardCount.label4date = "Today";
                // this.cardCount.label3date = result['data']['body']['data'][0].label3date;
                // this.cardCount.label4date = result['data']['body']['data'][0].label4date;

                this.cardCount.label1 = result['data']['body']['data'][0].label1;
                this.cardCount.label2 = result['data']['body']['data'][0].label2;
                this.cardCount.label3 = result['data']['body']['data'][0].label3;
                this.cardCount.label4 = result['data']['body']['data'][0].label4;
            } catch (error) {
            }
        },

        againCall(interval){
            clearInterval(this.calcInterval)
            clearInterval(this.restartTimer)
            this.intervalTime = interval;
            this.timerCalc();
            this.restartTimer = setInterval(() => {
                clearInterval(this.calcInterval)
                this.timerCalc();
                this.getDCList();
            }, interval);
        },
        timerCalc() {
            let interval = this.intervalTime
            this.calcInterval = setInterval(() => {
                interval = interval - 1000
                let hours = parseInt(((interval/1000) /60)/60)
                let minutes = parseInt((interval/1000) /60) - (hours * 60)
                let seconds = interval/1000 - (hours * 3600) - (minutes * 60)
                if (hours < 10 ) hours = '0'+ hours
                if (minutes < 10 ) minutes = '0'+ minutes
                if (seconds < 10 ) seconds = '0'+ seconds
                this.countdownText = hours + ':' + minutes + ':' + seconds
            }, 1000);
        },
        getDCList(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.operation_dc_v1_get_list, body);
            lumos_client.onPost(url.operation_dc_v1_get_list, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body']['data'];
                this.entity.forEach(item => {
                    item.dcCreationDate = item.dcCreationDate ? moment(new Date(item.dcCreationDate)).format("DD MMM YYYY") : "--/--/----"
                });
                this.DCList = this.entity;
            }).catch(error => {
            });
        },
        async getDashboardDcstateCount(){
            this.progressBar.loading = true;
            let body = {};
            let req = constant.getRequest(url.master_dashboard_v1_get_dcstate_count, body);
            try {
                let result = await lumos_client.onPost(url.master_dashboard_v1_get_dcstate_count, req)
                this.dcstateCount = result['data']['body']['data'];
            } catch (error) {
               // console.error(errot);
            }
        },
        async getProjectCounts(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.master_dashboard_v1_get_project_count, body);
            try {
                let result = await lumos_client.onPost(url.master_dashboard_v1_get_project_count, req)
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.cardCount.runningProjects = result['data']['body']['data'][0].running;
                this.cardCount.completedProjects = result['data']['body']['data'][0].completed;
            } catch (error) {
                console.error(error);
            }
        },
        async getDCState(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.operation_dcstate_v1_get_list, body);
            try {
                let result = await lumos_client.onPost(url.operation_dcstate_v1_get_list, req);
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.cardCount.totalDCstates = result['data']['body']['data'].length;
            } catch (error) {
                console.error(error);
            }
        },
        async getDCTracking(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.master_dashboard_v1_get_dctracking_list, body);
            try {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                let result = await lumos_client.onPost(url.master_dashboard_v1_get_dctracking_list, req)
                this.cardCount.totalDCs = result['data']['body']['data'].length;
                this.dcTrackingList = result['data']['body']['data'];
            } catch (error) {
                console.error(error);
            }
        },
        filterDC(shipmentMode){
            this.DCList = [];
            this.entity.forEach(item => {
                if (item.shipmentMode == shipmentMode) {
                    this.DCList.push(item);
                }
            });
        },
        filterDCbyStatus(status){
            this.DCList = [];
            this.entity.forEach(item => {
                if (status == 'Completed' && item.dcClosingDate) this.DCList.push(item);
                if (status == 'Running' && item.dcClosingDate == null) this.DCList.push(item);
            });
        },
    }
}
</script>

<style scoped>
.refresh-text{
    margin: 10px;
    padding: 5px;
    color: darkslategrey;
    font-weight: bold;
}
.small-box {
    border-radius: .25rem;
    box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2);
    position: relative;
    display: block;
    margin-bottom: 1rem!important
}
.small-box>.inner {
    padding: 10px;
}
.small-box .icon {
    transition: all .3s linear;
    position: absolute;
    top: -10px;
    right: 10px;
    z-index: 0;
    font-size: 80px;
    color: rgba(0,0,0,.15);
    padding: 5px;
}

.small-box h3, .small-box p {
    z-index: 5;
}
.small-box h3 {
    font-size: 38px;
    font-weight: 700;
    margin: 0 0 10px 0;
    white-space: nowrap;
    padding: 0;
}

.small-box p {
    font-size: 15px;
    z-index: 5;
}
.small-box>.small-box-footer {
    position: relative;
    text-align: center;
    padding: 3px 0;
    color: #fff;
    color: rgba(255,255,255,.8);
    display: block;
    z-index: 10;
    background: rgba(0,0,0,.1);
    text-decoration: none;
}

.small-box .icon:hover i {
    font-size: 90px;
    transition: all .3s linear;
}

.padding-7 , .col-6 .padding-7{
    padding: auto 7px !important
}

.bg-info{
    background: #43A3B8 !important
}

.bg-success{
    background: #4FA846 !important
}

.bg-danger{
    background: #DD4D44 !important
}

.bg-warning{
    background: #F8C017 !important
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: .25rem;
    box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2);
}

.dashboard-container{
    height: 350px;
    max-height: 400px;
}
.progress:hover{
    background-color:lightslategray;
}
.tooltips {
    position: absolute;
    width: 100%;
    height: 25px;
}
.tooltips .tooltiptext {
    visibility: hidden;
    max-width: 300px;
    left: 25%;
    background-color: teal;
    color: honeydew;
    border-radius: 10px;
    top: -50px;
    position: relative;
    padding: 30px 0px 20px 0px;
    display: block;
}
.tooltips:hover .tooltiptext {
    visibility: visible;
}

tr {
    line-height: 16px;
    font-family: fantasy;
    font-size: 14px;
}
tr td:first-child{
    font-weight: bold;
    padding: 0px 20px;
}
tr td:last-child {
    padding: 0px 20px;
}

.progresses{
    padding: 15px;
    overflow-x: hidden;
}
</style>
