<template>
  <div class="container-fluid">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12 d-inline-flex">
            <div>
            <router-link :to="{ name: 'Warehouse Reports' }"  tag="span" class="button-tooltip pt-1 float-left">
              <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
              <span class="button-tooltiptext">Back</span>
            </router-link>
            </div>
              <div class="col-10 col-md-6 ">
                  <div class="justify-content-end justify-content-md-center row" >
                      <div class="col-md-6 col-12 mb-1">
                          <datepicker placeholder="From Date" :bootstrap-styling = "true" input-class=" form-control-sm" calendar-class="filter-date" :clear-button = "true" clear-button-icon="fa fa-times-circle"  v-model="dateEntity.from" v-validate="'required'" name="From Date"></datepicker>
                            <small v-show="errors.has('From Date')" class="help is-danger"><i v-show="errors.has('From Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('From Date') }} </small>

                      </div>
                      <div class="col-md-6 col-12 mb-1">
                          <datepicker placeholder="To Date" :bootstrap-styling = "true" input-class="form-control-sm" calendar-class="filter-date" :clear-button = "true" clear-button-icon="fa fa-times-circle"  v-model="dateEntity.to" v-validate="'required'" name="To Date"></datepicker>
                          <small v-show="errors.has('To Date')" class="help is-danger"><i v-show="errors.has('To Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('To Date') }} </small>

                      </div>

                  </div>
              </div>

              <!-- <model-list-select class="form-control-sm mb-1" :list="warehouseList" v-model="warehouseOid" option-value="oid" optionText="warehouseName" placeholder="Select Warehouse"  name="Category"/>-->
              
              <div class="col-12 col-md-4">
              <div class="d-flex justify-content-end">
                <div>                
                  <button class="btn button-width ripple btn-sm btn-outline-success" @click="getShow()">
                    <i class="fa fa-eye"></i>
                    VIEW
                  </button>
                </div> 
                <div>                 
                  <button class="btn button-width ripple btn-sm btn-outline-primary" @click="getPdf()">
                    <i class="fa fa-file-pdf-o"></i>
                    PDF
                  </button>
                </div> 
                <div> 
                  <button class="btn button-width ripple btn-sm btn-outline-purple" @click="getCSV()">
                    <i class="fa fa-file-excel-o"></i>
                    CSV
                  </button>
                </div> 
                <div> 
                  <button class="btn button-width ripple btn-sm btn-outline-danger" @click="reset()">
                    <i class="fa fa-refresh"></i>
                    RESET
                  </button>
                </div> 
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-card flat>
      <div class="ml-2 pull-right">
        <!-- <button class="btn btn-primary ripple" @click="filterDCbyStatus('Running')">Running</button> -->
        <!--
            <button class="btn btn-success ripple" @click="filterDCbyStatus('Completed')">Completed</button>
            <b-dropdown id="dropdown-1" text="Shipment Mode" class="m-md-2">
                <b-dropdown-item @click="filterDC('Air')">Air</b-dropdown-item>
                <b-dropdown-item @click="filterDC('Sea')">Sea</b-dropdown-item>
                <b-dropdown-item @click="filterDC('Land')">Land</b-dropdown-item>
                <b-dropdown-item @click="filterDC('E-Delivery')">E-Deliver</b-dropdown-item>
            </b-dropdown>
            -->
      </div>
      <div v-if='entity.length > 0'>
        <v-data-table
          :headers="warehouseHeaders"
          :items="entity"
          :search="searchDC"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.index + 1 }}</td>
            <td class="text-xs-left">{{ props.item.warehouseNo }}</td>
            <td class="text-xs-left">{{ props.item.warehouseName }}</td>
            <td class="text-xs-left">{{ props.item.proprieterName }}</td>
            <td class="text-xs-left">{{ props.item.refLicenseNo }}</td>
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
      warehouseList: [],
      warehouseHeaders: [
        { text: "#", value: "", align: "left" },
        { text: "Warehouse No", value: "warehouseNo", align: "left" },
        { text: "Warehouse Name", value: "warehouseName", align: "left" },
        { text: "Proprieter Name", value: "proprieterName", align: "left" },
        { text: "Ref License No", value: "refLicenseNo", align: "left" },
      ],
      rowsPerPageItems: [15, 20, 30, 50],
      pagination: { },
      dateEntity:{
          to:'',
          from:'',
          dateType:'',
      },
      progressBar: {
        loading: false,
        show: false,
      },
      searchDC: "",
    };
  },
  created(){
   // this.getWarehouseList()
  },
  methods: {
    // getWarehouseList() {
    //   this.progressBar.loading = true;
    //   this.progressBar.show = true;
    //   let body = {};
    //   let req = constant.getRequest(
    //     url.master_warehouseinfo_v1_get_list,
    //     body
    //   );
    //   lumos_client
    //     .onPost(url.master_warehouseinfo_v1_get_list, req)
    //     .then((result) => {
    //       this.progressBar.loading = false;
    //       this.progressBar.show = false;
    //       // this.entity.forEach(item => {
    //       //     item.dcCreationDate = item.dcCreationDate ? moment(new Date(item.dcCreationDate)).format("DD MMM YYYY") : "--/--/----"
    //       // });
    //       this.warehouseList = result["data"]["body"]["data"]
    //     })
    //     .catch((error) => {});
    // },
    getShow(){
      this.entity = []
          this.progressBar.loading = true;
          this.progressBar.show = true;  
          let body =  this.modifier(this.dateEntity);          
          let req = constant.getRequest(url.operation_report_v1_get_warehouse_list_parameter, body);
          lumos_client.onPost(url.operation_report_v1_get_warehouse_list_parameter, req)
          .then(result => {
              this.progressBar.loading = false;
              this.progressBar.show = false;
              console.log(result);
              this.entity =result.data.body.data;
          }).catch(error =>{
          });
    },
    // filterDC(shipmentMode) {
    //   this.reset();
    //   this.entity.forEach((item) => {
    //     if (item.shipmentMode == shipmentMode) {
    //       this.warehouseList.push(item);
    //     }
    //   });
    // },
    // filterDCbyStatus(status) {
    //   this.reset();
    //   this.entity.forEach((item) => {
    //     if (status == "Completed" && item.dcClosingDate)
    //       this.warehouseList.push(item);
    //     if (status == "Running" && item.dcClosingDate == null)
    //       this.warehouseList.push(item);
    //   });
    // },
    reset() {
      this.dateEntity = {
                to:'',
                from:'',
            },
      this.entity = [];
    },
    modifier(body){
           let obj = _.clone(body);
            if(this.dateEntity.to){
                obj.to = obj.to.toISOString();
            }
            if(this.dateEntity.from){
                obj.from = obj.from.toISOString();
            }
           obj.dateType = this.$route.params.id
           return obj
    },    
    getPdf() {
      this.progressBar.loading = true;
      this.progressBar.show = true;
      let body = {};
      let req = constant.getRequest(
        url.operation_report_v1_get_warehouse_list_pdf,
        body
      );
      lumos_client
        .onPost(url.operation_report_v1_get_warehouse_list_pdf, req)
        .then((result) => {
          let res = result.data.header.responseCode;
          this.progressBar.loading = false;
          window.open(
            url.baseUrl +
              url.operation_report_v1_download +
              result.data.body.fileName,
            "_blank"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCSV() {
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
