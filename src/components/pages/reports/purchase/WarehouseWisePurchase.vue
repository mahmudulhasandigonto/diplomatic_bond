<template>
  <div class="container-fluid">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12 d-inline-flex">
            <div>
            <router-link :to="{ name: 'Purchase Reports' }"  tag="span" class="button-tooltip pt-1 float-left">
              <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
              <span class="button-tooltiptext">Back</span>
            </router-link>
            </div>
          </div>
        </div>

        <br>

        <div class="row">
          <div class="col-md-4 col-4 mb-1">
            <label> <b>Warehouse Name</b></label>
            <model-list-select class="form-control-sm" :list="warehouseinfoList" v-model="dateEntity.warehouseOid" option-value="oid" optionText="warehouseName" placeholder="Select Warehouse Name" v-validate="'required'" name="Warehouse Name"/>
            <small v-show="errors.has('Warehouse Name')" class="help is-danger"><i v-show="errors.has('Warehouse Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('Warehouse Name') }} </small>
          </div>
          <div class="col-md-4 col-4 mb-1">
            <label class="required"> <b>From Date</b></label>
            <datepicker placeholder="From Date" :bootstrap-styling = "true" input-class=" form-control-sm" calendar-class="filter-date" :clear-button = "true" clear-button-icon="fa fa-times-circle"  v-model="dateEntity.from" v-validate="'required'" name="From Date"></datepicker>
            <small v-show="errors.has('From Date')" class="help is-danger"><i v-show="errors.has('From Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('From Date') }} </small>
          </div>
          <div class="col-md-4 col-4 mb-1">
            <label class="required"> <b>To Date</b></label>
            <datepicker placeholder="To Date" :bootstrap-styling = "true" input-class="form-control-sm" calendar-class="filter-date" :clear-button = "true" clear-button-icon="fa fa-times-circle"  v-model="dateEntity.to" v-validate="'required'" name="To Date"></datepicker>
            <small v-show="errors.has('To Date')" class="help is-danger"><i v-show="errors.has('To Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('To Date') }} </small>
          </div>
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
          <!--<button class="btn button-width ripple btn-sm btn-outline-purple mr-2" @click="getCSV()">
            <i class="fa fa-file-excel-o"></i>
            CSV
          </button>-->
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

      <div v-if="entity.length>0">
        <v-data-table
          :headers="warehouseHeaders"
          :items="entity"
          :search="searchDC"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <!--<td class="text-xs-left">{{ props.index + 1 }}</td>-->
            <td class="text-xs-left">{{ props.item.warehouseName }}</td>
            <td class="text-xs-left">{{ props.item.numberOfPurchase }}</td>            
            <td class="text-xs-left">{{ props.item.totalQuantity }}</td>
            <td class="text-xs-left">{{ props.item.totalPrice }}</td>
          </template>
        </v-data-table>
      </div>
    </v-card>

    <v-app>
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
import moment from "moment";
import { url } from "@/utils/urls";
import { constant } from "@/utils/constant";
import { lumos_client } from "@/utils/lumos-client";
import axios from "axios";
import { ModelListSelect} from 'vue-search-select';
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker";
import { saveAs } from "file-saver";
import * as _ from "underscore";

export default {
    components: {
      ModelListSelect, Datepicker
    },
  data() {
    return {
      entity: [],
      warehouseOid :  "",
      warehouseinfoList:[],
      warehouseHeaders: [
        // { text: "#", value: "", align: "left" },
        { text: "Warehouse Name", value: "warehouseName", align: "left" },
        { text: "Number Of Purchase", value: "numberOfPurchase", align: "left" },
        { text: "Total Quantity", value: "totalQuantity", align: "left" },
        { text: "Total Price", value: "totalPrice", align: "left" },
      ],
      rowsPerPageItems: [15, 20, 30, 50],
      pagination: { },
      dateEntity:{
          to:'',
          from:'',
          warehouseOid:'',
      },
      progressBar: {
        loading: false,
        show: false,
      },
      searchDC: "",
      size:"50px",
      snackbar: false,
      y: "bottom",
      x: "right",
      mode: "",
      color: "",
      timeout: 2000,
      messageText: "",
      tabIndex: 0
    };
  },
  created(){
  },
  mounted(){
      this.init()
  },
  methods: {    
    init(){
        this.getWarehouseList();
    },
    updateSnackbarInfo(variable){
        this.snackbar = true;
        this.color = variable.color;
        this.messageText = variable.messageText;
    },
    getWarehouseList(){
            let body = {};
            let req = constant.getRequest(url.master_warehouseinfo_v1_get_list, body);
            lumos_client.onPost(url.master_warehouseinfo_v1_get_list, req)
            .then(result => {
               if(localStorage.getItem("lumos_roleOid")=='aroofficer' || localStorage.getItem("lumos_roleOid")=='roofficer' || localStorage.getItem("lumos_roleOid") == 'warehouseadmin' || localStorage.getItem("lumos_roleOid") == 'warehouseoperation'){
                let warehouseOid = localStorage.getItem("lumos_warehouseOid");
                this.warehouseinfoList = result['data']['body']['data'].filter((x)=>{if(x.oid === warehouseOid){return x}});
                this.dateEntity.warehouseOid = this.warehouseinfoList[0].oid;
                } else{
                  this.warehouseinfoList = result['data']['body']['data'];
                  this.warehouseinfoList.push({oid:"All", warehouseName:"All"})
                  this.dateEntity.warehouseOid = "All"
                }        
            }).catch(error => {
            });
    },    
    reset() {
      this.dateEntity = {
                to:'',
                from:'',
                warehouseOid: ''
            },
      this.entity = [];
    },
    modifier(body){
           let obj = _.clone(body);
          if(this.dateEntity.from){                 
                 obj.from = this.dateFormat(this.dateEntity.from);
           }
           if(this.dateEntity.to){                 
                 obj.to = this.dateFormat(this.dateEntity.to);
           } 
           return obj
    }, 
    dateFormat(str){
       var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    },
    getShow(){
      this.$validator.validateAll().then(result => {
          if (!result){
            return;
          }
          this.entity = []
          this.progressBar.loading = true;
          this.progressBar.show = true; 
          let body =  this.modifier(this.dateEntity);
          let req = constant.getRequest(url.operation_report_v1_get_purchase_list_parameter, body);
          lumos_client.onPost(url.operation_report_v1_get_purchase_list_parameter, req)
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
    getPdf() {
      this.$validator.validateAll().then(result => {
        if (!result){
          return;
        }
      this.progressBar.loading = true;
      this.progressBar.show = true;
      this.dateEntity.reportType = "pdf";
      let body =  this.modifier(this.dateEntity);
      let req = constant.getRequest(url.operation_report_v1_get_purchase_list_export, body);
      lumos_client.onPost(url.operation_report_v1_get_purchase_list_export, req)
        .then((result) => {
          this.progressBar.loading = false;
          this.progressBar.show = false;
          let res = result.data.header.responseCode;
          if (res != "200"){
              this.snackbar = true;
              this.color = "red"; 
              this.messageText = result.data.body.info;
              return;
          }
          window.open(url.baseUrl + url.operation_report_v1_download + result.data.body.fileName,"_blank");
        })
        .catch((error) => {
          console.log(error);
        })
      });
    },
    getCSV() {
      this.$validator.validateAll().then(result => {
        if (!result){
          return;
        }
      this.progressBar.loading = true;
      this.progressBar.show = true;
      this.dateEntity.reportType = "csv";
      let body =  this.modifier(this.dateEntity);
      let req = constant.getRequest(url.operation_report_v1_get_purchase_list_export,body);
      lumos_client.onPost(url.operation_report_v1_get_purchase_list_export, req)
        .then((result) => {
          this.progressBar.loading = false;
          this.progressBar.show = false;
          let res = result.data.header.responseCode;
          if (res != "200"){
              this.snackbar = true;
              this.color = "red"; 
              this.messageText = result.data.body.info;
              return;
          }
          axios.get(url.baseUrl + url.operation_report_v1_download + result.data.body.fileName,
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
        })
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
