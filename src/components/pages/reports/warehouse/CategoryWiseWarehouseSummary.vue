<template>
  <div class="container-fluid">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="card">
      <div class="card-body">
       <!-- <div class="row">
          <div class="col-12 d-inline-flex">
            <div>
            <router-link :to="{ name: 'Purchase Reports' }"  tag="span" class="button-tooltip pt-1 float-left">
              <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
              <span class="button-tooltiptext">Back</span>
            </router-link>
            </div>
          </div>
        </div>

        <br>-->

        <div class="row">
          <div class="col-md-4 col-4 mb-1">
            <label class="required"> <b>Fiscal Year</b></label>
            <model-list-select class="form-control-sm" :list="fiscalYearList" v-model="dateEntity.fiscalYear" option-value="fiscalYear" optionText="fiscalYear" placeholder="Select Fiscal Year" v-validate="'required'" name="Fiscal Year"/>
            <small v-show="errors.has('Fiscal Year')" class="help is-danger"><i v-show="errors.has('Fiscal Year')" class="fa fa-exclamation-circle"></i>{{ errors.first('Fiscal Year') }} </small>
          </div>
          <!--<div class="col-md-4 col-4 mb-1">
            <label class="required"> <b>Warehouse Name</b></label>
            <model-list-select class="form-control-sm" :list="warehouseList" v-model="dateEntity.warehouseOid" option-value="oid" optionText="warehouseName" placeholder="Select Warehouse Name" v-validate="'required'" name="Warehouse Name"/>
            <small v-show="errors.has('Warehouse Name')" class="help is-danger"><i v-show="errors.has('Warehouse Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('Warehouse Name') }} </small>
          </div>-->
        </div>

        <br>

        <div class="text-center mt-4">
          <button class="btn button-width ripple btn-sm btn-outline-success mr-2" @click="getShow()">
            <i class="fa fa-eye"></i>
              VIEW
          </button>
          <button class="btn button-width ripple btn-sm btn-outline-primary mr-2" @click="getPdf()">
            <i class="fa fa-file-pdf-o"></i>
            PDF
          </button>
          <button class="btn button-width ripple btn-sm btn-outline-danger mr-2" @click="reset()">
            <i class="fa fa-refresh"></i>
            RESET
          </button>
        </div>
      </div>    
    </div>
    <v-card flat>
      <div class="ml-2 pull-right">
      </div>
      <div v-if="entity.length > 0">
        <v-data-table
          :headers="warehouseHeaders"
          :items="entity"
          :search="searchDC"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.index + 1 }}</td>
            <td class="text-xs-left">{{ props.item.warehouseName }}</td>
            <td class="text-xs-left">{{ props.item.categoryName }}</td>
            <!--<td class="text-xs-left">{{ props.item.allocation }}</td>-->
            <td class="text-xs-left">{{ props.item.purchasePieces }}</td>  
            <td class="text-xs-left">{{ props.item.salesPieces }}</td>  
            <td class="text-xs-left">{{ props.item.stockQuantity }}</td>        
            <td class="text-xs-left">{{ props.item.purchaseValue }}</td>   
            <td class="text-xs-left">{{ props.item.salesValue }}</td>
            <td class="text-xs-left">{{ props.item.totalActualSales }}</td> 
            <td class="text-xs-left">{{ props.item.remainingBalance }}</td>         
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>


<script>
import moment from "moment";
import { url } from "@/utils/urls";
import { constant } from "@/utils/constant";
import { lumos_client } from "@/utils/lumos-client";
import axios from "axios";
import { ModelListSelect} from 'vue-search-select';
import { saveAs } from "file-saver";
import * as _ from "underscore";

export default {
    components: {
      ModelListSelect
    },
  data() {
    return {
      entity: [],
      warehouseOid :  "",
      warehouseList: [],
      fiscalYearList: [],
      warehouseHeaders: [
        { text: "#", value: "", align: "left" },
        { text: "Warehouse Name", value: "warehouseName", align: "left" },
        { text: "Product Category", value: "categoryName", align: "left" },
        { text: "Total Purchase (Pics)", value: "purchasePieces", align: "left" },
        { text: "Total Sell (Pics)", value: "salesPieces", align: "left" },
        { text: "Total Stock (Pics)", value: "stockQuantity", align: "left" },        
        { text: "Total Purchase ($)", value: "purchaseValue", align: "left" },   
        { text: "Total Sell ($)", value: "salesValue", align: "left" },
        { text: "Actual Sell ($)", value: "totalActualSales", align: "left" },        
        { text: "Remaining Stock ($)", value: "remainingBalance", align: "left" }     
      ],
      rowsPerPageItems: [15, 20, 30, 50],
      pagination: { },
      dateEntity:{
          warehouseOid : '',
          fiscalYear:''
      },
      progressBar: {
        loading: false,
        show: false,
      },
      searchDC: "",
    };
  },
  created(){
    this.getWarehouseList();
    this.getFiscalYearList();
  },
  methods: {
    getWarehouseList() {
      this.progressBar.loading = true;
      this.progressBar.show = true;
      let body = {};
      let req = constant.getRequest(
        url.master_warehouseinfo_v1_get_list,
        body
      );
      lumos_client
        .onPost(url.master_warehouseinfo_v1_get_list, req)
        .then((result) => {
          this.progressBar.loading = false;
          this.progressBar.show = false;
          // this.entity.forEach(item => {
          //     item.dcCreationDate = item.dcCreationDate ? moment(new Date(item.dcCreationDate)).format("DD MMM YYYY") : "--/--/----"
          // });
          // this.warehouseList = result["data"]["body"]["data"]
          if(localStorage.getItem("lumos_roleOid")=='aroofficer' || localStorage.getItem("lumos_roleOid")=='roofficer' || localStorage.getItem("lumos_roleOid") == 'warehouseadmin' || localStorage.getItem("lumos_roleOid") == 'warehouseoperation') {
            let warehouseOid = localStorage.getItem("lumos_warehouseOid");
            this.warehouseList = result['data']['body']['data'].filter((x)=>{if(x.oid === warehouseOid){return x}});
            this.dateEntity.warehouseOid = this.warehouseList[0].oid;
          } else {
            this.warehouseList = result['data']['body']['data'];
          }

        })
        .catch((error) => {});
    },
    getFiscalYearList() {
      this.progressBar.loading = true;
      this.progressBar.show = true;
      let body = {};
      let req = constant.getRequest(
        url.master_warehouselimit_v1_fiscal_year_list,
        body
      );
      lumos_client
        .onPost(url.master_warehouselimit_v1_fiscal_year_list, req)
        .then((result) => {
          this.progressBar.loading = false;
          this.progressBar.show = false;
          this.fiscalYearList = result['data']['body']['data'];
        })
        .catch((error) => {});
    },
    getShow(){
      this.$validator.validateAll().then(result => {
          if (!result){
            return;
          }
          
      this.entity = []
          this.progressBar.loading = true;
          this.progressBar.show = true;
          let body =  this.dateEntity;
          let req = constant.getRequest(url.operation_report_v1_get_category_wise_summary_parameter, body);
          lumos_client.onPost(url.operation_report_v1_get_category_wise_summary_parameter, req)
          .then(result => {
              this.progressBar.loading = false;
              this.progressBar.show = false;
              let res = result.data.header.responseCode;
              if (res != "200"){
                  this.snackbar = true;
                  this.color = "red"; 
                  this.messageText = result.data.body.info;
                  return;
              }
              this.entity =result.data.body.data;
          }).catch(error =>{
          })
      });
    },
    reset() {
      this.dateEntity = {
                fiscalYear:'',
                warehouseOid: ''
            },
      this.entity = [];
    },
    getPdf() {
      this.$validator.validateAll().then(result => {
          if (!result){
            return;
          }
        this.entity = [];
        this.progressBar.loading = true;
        this.progressBar.show = true;
        this.dateEntity.reportType = "pdf";
        let body =  this.dateEntity;
        //let body = {};
        let req = constant.getRequest(url.operation_report_v1_get_category_wise_summary_export,body);
        lumos_client
          .onPost(url.operation_report_v1_get_category_wise_summary_export, req)
          .then((result) => {
            let res = result.data.header.responseCode;
            this.progressBar.loading = false;
            window.open(url.baseUrl + url.operation_report_v1_download + result.data.body.fileName, "_blank");
          })
          .catch((error) => {
            console.log(error);
          })
      });
    },
    getCSV() {
      this.entity = [];
      this.progressBar.loading = true;
      this.progressBar.show = true;
      this.dateEntity.reportType = "csv";
      let body =  this.dateEntity;
      //let body = {};

      let req = constant.getRequest(url.operation_report_v1_get_warehouse_list_export,body);
      lumos_client
        .onPost(url.operation_report_v1_get_warehouse_list_export, req)
        .then((result) => {
          let res = result.data.header.responseCode;
          this.progressBar.loading = false;
         // window.open(url.baseUrl + url.operation_report_v1_download + result.data.body.fileName, "_blank");
              axios.get(url.baseUrl+url.operation_report_v1_download+result.data.body.fileName, {
                    responseType: 'blob',
                }).then(response => {
                    this.progressBar.loading = false;
                    saveAs(response.data, "Warehouse CSV List.csv")
                }).catch(error =>{
                    console.log(error)
                })
        })
        .catch((error) => {
          console.log(error);
        });

        
    },
    getCSVtest() {
      this.progressBar.loading = true;
      this.progressBar.show = true;
      let body = {};
      let req = constant.getRequest(
        url.operation_report_v1_get_warehouse_list_csv,
        body
      );
      lumos_client
        .onPost(url.operation_report_v1_get_warehouse_list_csv, req)
        .then((result) => {
          let res = result.data.header.responseCode;

          axios
            .get(
              url.baseUrl +
                url.operation_report_v1_download +
                result.data.body.fileName,
              {
                responseType: "blob",
              }
            )
            .then((response) => {
              this.progressBar.loading = false;
              saveAs(response.data, result.data.body.fileName);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.ripple {
  width: 140px;
}
</style>