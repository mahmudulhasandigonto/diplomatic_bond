<template>
  <div class="asset-form">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="container-fluid">
      <!-- Section 1 Start -->
      <div class="card">
        <div class="card-body">
          <div class="row">  
            <div class="col-12 d-inline-flex">
              <router-link :to="{ name: 'LedgerInfo' }" tag="span" class="button-tooltip pt-1 float-left">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                <span class="button-tooltiptext">Back</span>
              </router-link>
              <div class="col-10 col-md-2">               
                  <label style="text-align:center"><b>Passbook/Exemption No.</b></label>               
              </div>
              <div class="col-10 col-md-4">
                <div class="justify-content-end justify-content-md-center mb-2">
                  <model-list-select class="form-control"  :list="slNoList"  v-model="entity.slno" option-value="slNo" optionText="slNo" placeholder="Select Sl No" name="Slno"/>
                  <!-- <input class="form-control" placeholder="Select SL Id"  :list="slNoList"  v-model="entity.slno" option-value="slno" optionText="slno" name="slno"/> -->
                </div>
              </div>
              <div class="col-10 col-md-4">
                <div class="d-flex justify-content-end">
                  <div></div>
                  <div>
                    <button class="btn button-width ripple btn-sm btn-outline-success" @click="getShow(entity.slno)">
                      <i class="fa fa-eye"></i>
                      VIEW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Section 1 Stop -->
      <!-- Section 2 Start -->
      <div class="card" v-if="showDetails">
        <div class="card-body">
          <div class="basic-info">
            <h5>{{ entity.userType }} User Information</h5>
            <hr />
            <div class="row">
              <div class="col-md-3 col-6">
                <table class="table table-bordered table-sm">
                  <tbody>
                    <tr>
                      <td style="width: 20%"><b> Name </b></td>
                      <td style="width: 80%">{{ entity.nameOfHolder }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b> Designation </b></td>
                      <td style="width: 80%">
                        {{ entity.designationofholder }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b> Type </b></td>
                      <td style="width: 80%">{{ entity.userType }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-3 col-6">
                <table class="table table-bordered table-sm">
                  <tbody>
                    <tr v-if="getexemption(this.entity.userType)">
                      <td style="width: 30%"><b>Embassy</b></td>
                      <td style="width: 70%">{{ entity.nameofembassy }}</td>
                    </tr>
                    <tr>
                      <td style="width: 30%"><b> Issue Date </b></td>
                      <td style="width: 70%">{{ entity.issueddate }}</td>
                    </tr>
                    <tr>
                      <td style="width: 30%"><b> Validupto </b></td>
                      <td style="width: 70%">{{ entity.validupto }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- <div class="col-md-3 col-6">
                <table class="table table-bordered table-sm">
                  <tbody>
                    <tr>
                      <td style="width: 42%"><b>Quarter</b></td>
                      <td style="width: 58%">{{ entity.quarteroid }}</td>
                    </tr>
                    <tr>
                      <td style="width: 42%"><b>Quarter Start Date</b></td>
                      <td style="width: 58%">{{ entity.quarterStartDate }}</td>
                    </tr>
                    <tr>
                      <td style="width: 42%"><b>Quarter End Date</b></td>
                      <td style="width: 58%">{{ entity.quarterEndDate }}</td>
                    </tr>
                    <tr v-if="getexemption(this.entity.userType)">
                      <td style="width: 42%"><b>Warehouse</b></td>
                      <td style="width: 58%">{{ entity.warehouseName }}</td>
                    </tr>
                  </tbody>
                </table>
              </div> -->
              <div class="col-md-3 col-6">
                <table class="table table-bordered table-sm">
                  <tbody>
                    <tr v-if="getexemption(this.entity.userType)">
                      <td style="width: 60%"><b> Allocate Pieces </b></td>
                      <td style="width: 40%">{{ entity.allocatepieces }}</td>
                    </tr>
                    <tr>
                      <td style="width: 60%">
                        <b> Allocate Value (In Dollar) </b>
                      </td>
                      <td @keypress="onKeydown" style="width: 40%">{{ entity.allocatevalue }}</td>
                    </tr>
                    <tr v-if="getexemption(this.entity.userType)">
                      <td style="width: 60%"><b> Consume Pieces </b></td>
                      <td style="width: 40%">{{ entity.consumepieces }}</td>
                    </tr>
                    <tr>
                      <td style="width: 60%">
                        <b> Consume Value (In Dollar)</b>
                      </td>
                      <td style="width: 40%">{{ entity.consumevalue }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Section 2 Stop -->
      <form class="form-group" @submit.prevent="ledgerinfoSaveUpdate()">
        <div class="row">
          <div class="col-12">
            <div class="card" v-if="showDetails">
              <div class="card-body">
                <div class="basic-info">
                  <h5>Sales Information</h5>
                  <hr/>
                </div>
                <div class="row">
                  <div class="col-12 d-inline-flex">
                    <div class="col-10 col-md-6 mb-2">
                      <div class="justify-content-end justify-content-md-center mb-2">

                        <label class="required"><b>Bill Of Entry No.</b></label>
                        <input type="text" class="form-control mb-1" v-model="entity.billOfEntryNo" placeholder="Bill Of Entry No." v-validate="'required'" name="Bill Of Entry No"/>
                        <small v-show="errors.has('Bill Of Entry No')" class="help is-danger"><i v-show="errors.has('Bill Of Entry No')" class="fa fa-exclamation-circle"></i>{{errors.first('Bill Of Entry No')}} </small>
                      </div>
                    </div>
                    <div class="col-10 col-md-6 mb-2">
                      <div class="justify-content-end justify-content-md-center mb-2">
                        <label class="required"><b>Bill Of Entry Office Code</b></label>
                        <input type="text" class="form-control mb-1" v-model="entity.billOfEntryOfficeId" v-validate="'required'" placeholder="Bill Of Entry Office Code" name="Bill Of Entry Office Code"/>
                        <small v-show="errors.has('Bill Of Entry Office Code')" class="help is-danger"><i v-show="errors.has('Bill Of Entry Office Code')" class="fa fa-exclamation-circle"></i>{{ errors.first('Bill Of Entry Office Code') }} </small>
                      </div>
                    </div>
                    <div class="col-10 col-md-6 mb-2">
                      <div class="justify-content-end justify-content-md-center mb-2">
                        <label class="required"><b>Bill Of Entry Date</b></label>
                        <datepicker placeholder="Bill Of Entry Date" :bootstrap-styling="true" input-class="form-control mb-1" calendar-class="filter-date"
                          :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.billOfEntryDate" v-validate="'required'" name="Bill of Entry Date"></datepicker>
                          <small v-show="errors.has('Bill of Entry Date')" class="help is-danger"><i v-show="errors.has('Bill of Entry Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('Bill of Entry Date') }} </small>
                      </div>
                    </div>
                    <div class="col-10 col-md-6 mb-2">
                      <div class="justify-content-end justify-content-md-center mb-2">
                        <label class="required"><b>House Keeper Name.</b></label>
                        <input type="text" class="form-control mb-1" v-model="entity.houseKeeper" v-validate="'required'" placeholder="House Keeper" name="House Keeper"/>
                        <small v-show="errors.has('House Keeper')" class="help is-danger"><i v-show="errors.has('House Keeper')" class="fa fa-exclamation-circle"></i>{{ errors.first('House Keeper') }} </small>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 d-inline-flex">
                    <div class="col-10 col-md-6 mb-2">
                      <div class="justify-content-end justify-content-md-center mb-2">
                        <label class="required"><b>Sales Person</b></label>
                        <input type="text" class="form-control mb-1" v-model="entity.salesPerson" v-validate="'required'" placeholder="Sales Person" name="Sales Person"/>
                        <small v-show="errors.has('Sales Person')" class="help is-danger"><i v-show="errors.has('Sales Person')" class="fa fa-exclamation-circle"></i>{{ errors.first('Sales Person') }} </small>
                      </div>
                    </div>
                     <div class="col-10 col-md-6 mb-2">
                      <div class="justify-content-end justify-content-md-center mb-2">
                        <label class="required"><b>Sales Date</b></label>
                        <datepicker placeholder="Sales Date" :bootstrap-styling="true" input-class="form-control mb-1" calendar-class="filter-date"
                        :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.salesDate" v-validate="'required'" name="Sales Date"></datepicker>
                        <small v-show="errors.has('Sales Date')" class="help is-danger"><i v-show="errors.has('Sales Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('Sales Date') }} </small>
                      </div>
                    </div>
                    <div class="col-10 col-md-6 mb-2">
                      <div class="justify-content-end justify-content-md-center mb-2">
                        <label class="required"><b>Relevant Warehouse Invoice No.</b></label>
                        <input type="text" class="form-control mb-1" v-model="entity.relevantWarehouseInvoiceNo" v-validate="'required'" placeholder="Relevant Warehouse Invoice No." name="Relevant Warehouse Invoice No"/>
                        <small v-show="errors.has('Relevant Warehouse Invoice No')" class="help is-danger"><i v-show="errors.has('Relevant Warehouse Invoice No')" class="fa fa-exclamation-circle"></i>{{ errors.first('Relevant Warehouse Invoice No') }} </small>
                      </div>
                    </div>
                    <div class="col-10 col-md-6 mb-2">
                      <div class="justify-content-end justify-content-md-center mb-2">
                        <label class="required"><b>Relevant Warehouse Invoice Date</b></label>
                        <datepicker placeholder="Relevant Warehouse Invoice Date" :bootstrap-styling="true" input-class="form-control mb-1" calendar-class="filter-date"
                        :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.relevantWarehouseInvoiceDate" v-validate="'required'" name="Relevant Warehouse Invoice Date"></datepicker>
                        <small v-show="errors.has('Relevant Warehouse Invoice Date')" class="help is-danger"><i v-show="errors.has('Relevant Warehouse Invoice Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('Relevant Warehouse Invoice Date') }} </small>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <b>Articles</b>
                    <span class="btn btn-bg-default button-tooltip" @click="addDocument(entity.documents)">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      <span class="button-tooltiptext">Add</span>
                    </span>
                    <div class="table-responsive no-padding">
                      <table class="table table-bordered table-sm">
                        <tr class="table table-bordered text-center">
                          <th style="">Name of Articles</th>
                          <th style="">Products</th>
                          <!-- <th style="">Unit Quantity</th> -->
                          <th style="">Unit Price (US Dollar)</th>
                          <th style="">Total Pieces</th>
                          <th style="">Total Price (US Dollar)</th>
                          <th style="">Action</th>
                        </tr>
                        <tr v-for="(document, index) in entity.documents" :key="index" class="" >
                          <td style="width: 15%">
                            <model-list-select :list="categoryList" v-model="document.categoryOid" @input="getProductList(document)" v-validate="'required'" option-value="oid" optionText="name" name="Article List" />
                            <small v-show="errors.has('Article List')" class="help is-danger"><i v-show="errors.has('Article List')" class="fa fa-exclamation-circle"></i>{{ errors.first('Article List') }} </small>
                          </td>
                          <td style="width: 25%">
                            <model-list-select :list="document.productList" v-model="document.productOid" v-validate="'required'" option-value="oid" optionText="name" name="Product list"/>
                            <small v-show="errors.has('Product list')" class="help is-danger"><i v-show="errors.has('Product list')" class="fa fa-exclamation-circle"></i>{{ errors.first('Product list') }} </small>
                          </td>
                          <td>
                            <input type="text" placeholder="Enter Unit Value" class="form-control" v-model="document.unitValue" v-validate="'required'" name="Unit Value"/>
                            <small v-show="errors.has('Unit Value')" class="help is-danger"><i v-show="errors.has('Unit Value')" class="fa fa-exclamation-circle"></i>{{ errors.first('Unit Value') }} </small>
                          </td>
                          <td>
                            <input type="text"  placeholder="Enter Total Pices" class="form-control" v-model="document.totalQuantity" v-validate="'required'" name="Total Pieces"/>
                            <small v-show="errors.has('Total Pieces')" class="help is-danger"><i v-show="errors.has('Total Pieces')" class="fa fa-exclamation-circle"></i>{{ errors.first('Total Pieces') }} </small>
                          </td>
                          <td>
                            <input  type="text" placeholder="Enter Total Value" class="form-control" v-model="document.totalValue" v-validate="'required'" name="Total Value"/>
                            <small v-show="errors.has('Total Value')" class="help is-danger"><i v-show="errors.has('Total Value')" class="fa fa-exclamation-circle"></i>{{ errors.first('Total Value') }} </small>
                          </td>
                          <td class="text-center" style="width: 10%">
                            <span  class="btn btn-bg-danger button-tooltip mr-1" @click="deleteConfirmation(index,document.generalProfileArticlesOid)">
                              <i class="fa fa-trash" aria-hidden="true"></i>
                              <span class="button-tooltiptext"> Delete</span>
                            </span>
                            <span class="btn btn-bg-success button-tooltip" @click="addDocument(entity.documents)">
                              <i class="fa fa-plus" aria-hidden="true"></i>
                              <span class="button-tooltiptext">Add</span>
                            </span>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div class="text-center mt-3">
                      <button :disabled="sellButtonDisable" class="btn btn-success button-width ripple mr-3" @click="dialog = true" @submit.prevent="ledgerinfoSaveUpdate()">
                        {{ buttonText }}
                      </button>
                      <router-link tag="button" class="btn btn-danger button-width ripple" :to="{ name: 'LedgerInfo' }">
                        Reset
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <v-app>
      <v-dialog  v-model="deleteConfirmationModel"  max-width="400" >
            <v-card>                                    
            <v-card-text>
            <h5>Are you sure, You want to delete the item?</h5>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="deleteItem()">
                Yes
                </v-btn>
                <v-btn color="red darken-1" flat="flat" @click.native="deleteConfirmationModel = false">
                No
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
      <v-flex>
        <div>
          <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'"
            :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" :color="color"
          >
            {{ messageText }}
            <v-btn flat @click="snackbar = false">
              <i class="fa fa-window-close" aria-hidden="true"></i>
            </v-btn>
          </v-snackbar>
        </div>
      </v-flex>
    </v-app>
  </div>
</template>
<script>
import { url } from "@/utils/urls";
import { constant } from "@/utils/constant";
import { lumos_client } from "@/utils/lumos-client";
import { ModelListSelect } from "vue-search-select";
import contact from "@/components/Contact.vue";
import contactData from "@/components/ContactData.vue";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker";
import * as _ from "underscore";

export default {
  components: {
    ModelListSelect,
    Datepicker,
    contact,
    contactData,
  },
  data() {
    return {
      entity: {
        documents: [
          {
            categoryOid: "",
            productOid: "",
            // unitQuantity: "",
            productList: [{oid:"", name:""}],
            unitValue: "",
            totalQuantity: "",
            totalValue: "",
          },
        ],
      },
      categoryOid: "",
      addButtonDisable: false,
      dialog: false,
      headers: [{ text: "Name", value: "nameOfHolder", align: "left" }],
      contactList: [],
      profileList: [],
      productList:[],
      categoryList: [],
      slNoList: [],
      typeList: [],
      buttonText: "", 
      deleteConfirmationModel: false,     
      statusList: [{ name: "Active" }, { name: "Inactive" }],
      progressBar: {
        loading: false,
        show: false,
      },
      sellButtonDisable: false,
      size: "50px",
      snackbar: false,
      y: "bottom",
      x: "right",
      mode: "",
      color: "",
      timeout: 2000,
      messageText: "",
      tabIndex: 0,
      showDetails: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    addItem(item) {
      item.push({
        label: "",
        value: "",
      });
    },
    getexemption(oid) {
      if (oid == "Exemption") {
        return true;
      } else {
        return false;
      }
    },
    updateSnackbarInfo(variable) {
      this.snackbar = true;
      this.color = variable.color;
      this.messageText = variable.messageText;
      //this.getContactList();
    },
    init() {
      // this.getProfile();
      // console.log(localStorage);
      //this.getProductList();
      //this.getCategory();
      this.getSlNoList();
      if (this.$route.params.id) {
        this.buttonText = "Update";
        this.getLedgerInfo(this.$route.params.id);
        // this.addButtonDisable = true;
      } else {
        this.buttonText = "Sell";
      }
    },
    onKeydown (event) {
    	let char = String.fromCharCode(event.keyCode)
    	if (!/[0-9]/.test(char)) {
      	    event.preventDefault()
            }
        },
    getCategory() {
      let body = {};
      let req = constant.getRequest(url.operation_ledgerinfo_v1_ledgerinfo_category_get_list, body);
      lumos_client
        .onPost(url.operation_ledgerinfo_v1_ledgerinfo_category_get_list, req)
        .then((result) => {
          this.categoryList = result["data"]["body"]["data"];
         // this.categoryList = result['data']['body']['data'].filter((x)=>{if(x.oid === warehouseOid){return x}})                
         // this.entity.categoryList = this.warehouseinfoList[0].oid; 
         
        })
        .catch((error) => {});
    },
    getProductList(event){
      //  console.log(event)
         let body = {categoryOid: event.categoryOid};
         let req = constant.getRequest(url.operation_ledgerinfo_v1_ledgerinfo_product_get_list, body);
         lumos_client.onPost(url.operation_ledgerinfo_v1_ledgerinfo_product_get_list, req)
        .then(result => {
            event.productList = result['data']['body']['data'];
            this.productList = event.productList;
        }).catch(error => {
        });
    },
    getSlNoList(){
      //  console.log(event)
         let body = {oid: "slNoList"};
         let req = constant.getRequest(url.master_generalprofile_v1_get_list, body);
         lumos_client.onPost(url.master_generalprofile_v1_get_list, req)
        .then(result => {
            this.slNoList = result['data']['body']['data'];
            // console.log(this.slNoList);
            // this.productList = event.productList;
        }).catch(error => {
        });
    },
    getShow(slno) {
      this.progressBar.loading = true;
      this.progressBar.show = true;
      let body = { slno: slno };
      let req = constant.getRequest(
        url.operation_ledgerinfo_v1_get_by_oid,
        body
      );
      lumos_client
        .onPost(url.operation_ledgerinfo_v1_get_by_oid, req)
        .then((result) => {
          let res = result.data.header.responseCode;
          if (res !== "200") {
            this.color = "red";
            this.messageText = result.data.body.data;
            this.progressBar.loading = false;
            this.progressBar.show = false;
            this.showDetails = false;
            this.snackbar = true;
            return;
          }
          this.entity = result.data.body;
          this.showDetails = true;
          
          let validupto = "";
          if (this.entity.validupto) {
            validupto = new Date(this.entity.validupto);
          }
          let issueddate = "";
          if (this.entity.issueddate) {
            issueddate = new Date(this.entity.issueddate);
          }
          this.oidModifier(this.entity);
          this.color = "success";
          setTimeout(
            () =>
              (this.entity = {
                slno: this.entity.slno,
                nameOfHolder: this.entity.nameOfHolder,
                generalProfileTransactionOid: this.entity.generalProfileTransactionOid,
                designationofholder: this.entity.designationofholder,
                userType: this.entity.userType,
                nameofembassy: this.entity.nameofembassy,
                issueddate: this.entity.issueddate,
                validupto: this.entity.validupto,
                quarteroid: this.entity.quarteroid,
                warehouseOid: this.entity.warehouseOid,
                warehouseName: this.entity.warehouseName,
                allocatepieces: this.entity.allocatepieces,
                allocatevalue: this.entity.allocatevalue,
                consumepieces: this.entity.consumepieces,
                consumevalue: this.entity.consumevalue,
                quarterStartDate: this.entity.quarterStartDate,
                quarterEndDate: this.entity.quarterEndDate,
                documents: [
                  {
                    categoryOid: "",
                    productOid: "",
                    unitValue: "",
                    productList: [],
                    totalQuantity: "",
                    totalValue: "",
                  },
                ],
              }),
            1000
          );
          this.getCategory();
          this.progressBar.loading = false;
          this.progressBar.show = false;
        })
        .catch((error) => {
          this.$log.error(error);
        });
    },
    getLedgerInfo(oid) {
      this.progressBar.loading = true;
      this.progressBar.show = true;
      let body = { oid: oid };
      let req = constant.getRequest(
        url.operation_ledgerinfo_v1_get_by_oid,
        body
      );
      lumos_client
        .onPost(url.operation_ledgerinfo_v1_get_by_oid, req)
        .then((result) => {
          this.progressBar.loading = false;
          this.progressBar.show = false;
          this.entity = result["data"]["body"];
          this.oidModifier(this.entity);
        })
        .catch((error) => {});
    },
    addDocument(documents) {
      documents.push({   
        categoryOid: "",
        productOid: "",
        unitValue: "",
        productList: [],
        totalQuantity: "",
        totalValue: "",
      });
    },
    deleteConfirmation(index, oid) {
      this.deleteConfirmationModel = true
      this.itemIndex = index
      this.itemArticleOid = oid
    },
    deleteItem() {
      if (!this.$route.params.id) {
        this.entity.documents.splice(this.itemIndex, 1);
        this.deleteConfirmationModel = false;
        return;
      }
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }
        this.progressBar.loading = true;
        this.progressBar.show = true;
        let http_url = url.operation_ledgerinfo_v1__delete;
        let body = { oid: this.itemArticleOid };
        let req = constant.getRequest(http_url, body);
        lumos_client
          .onPost(http_url, req)
          .then((result) => {
            this.progressBar.loading = false;
            this.progressBar.show = false;
            let res = result.data.header.responseCode;
            this.snackbar = true;
            if (res != "200") {
              this.color = "red";
              this.messageText = result.data.body.data;
              return;
            }
            this.color = "success";
            this.messageText = "General Profile Articles  Successfully Deleted";
            this.deleteConfirmationModel = false;
          })
          .catch((error) => {
            this.$log.error(error);
          });
      });
    },
    getProduct(warehouseOid) {
      let body = {warehouseOid: warehouseOid};
      let req = constant.getRequest(url.master_productdetails_v1_get_list, body);
      lumos_client
        .onPost(url.master_productdetails_v1_get_list, req)
        .then((result) => {
          this.productList = result["data"]["body"]["data"];
        })
        .catch((error) => {});
    },
    ledgerinfoSaveUpdate() {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }
        this.progressBar.loading = true;
        this.progressBar.show = true;
        let http_url = "";
        if (this.$route.params.id) {
          http_url = url.operation_ledgerinfo_v1_update;
        } else {
          http_url = url.operation_ledgerinfo_v1_save;
        }
        let body = this.modifier(this.entity);
        let req = constant.getRequest(http_url, body);
        lumos_client.onPost(http_url, req).then((result) => {
            this.progressBar.loading = false;
            this.progressBar.show = false;
            let res = result.data.header.responseCode;
            this.snackbar = true;
            if (res != "200") {
              this.color = "red";
              this.messageText = result.data.body.data;
              return;
            }
            this.color = "success";
            if (this.$route.params.id) {
              this.messageText = "Sell Updated Successfully";
              setTimeout(() => this.$router.push({ name: "LedgerInfo" }), 3000);
            } else {
              this.messageText = "Sell Saved Successfully";
              this.entity.billOfEntryNo = "";
              this.entity.billOfEntryOfficeId = "";
              this.entity.billOfEntryDate = "";
              this.entity.houseKeeper = "";
              this.entity.salesPerson = "";
              this.entity.salesDate = "";
              this.entity.relevantWarehouseInvoiceNo = "";
              this.entity.relevantWarehouseInvoiceDate = "";
              this.entity.documents = [
                {
                  categoryOid: "",
                  productOid: "",
                  unitValue: "",
                  productList: [],
                  totalQuantity: "",
                  totalValue: "",
                },
              ];
            }
            this.getShow(this.entity.slno) 
          })
          .catch((error) => {
            this.$log.error(error);
          });
      });
    },
    modifier(entity) {
      var obj = _.clone(entity);
      obj.documents = JSON.stringify(entity.documents);
      if (this.entity.relevantWarehouseInvoiceDate) {
        obj.relevantWarehouseInvoiceDate = obj.relevantWarehouseInvoiceDate.toISOString();
      }
      if (this.entity.billOfEntryDate) {
        obj.billOfEntryDate = obj.billOfEntryDate.toISOString();
      }
      if (this.entity.salesDate) {
        obj.salesDate = obj.salesDate.toISOString();
      }
      return obj;
    },
    oidModifier(entity) {
      if (this.entity.validupto) {
        this.entity.validupto = new Date(this.entity.validupto).toISOString().slice(0, 10);
      }
      if (this.entity.purchaseDate) {
        this.entity.purchaseDate = new Date(this.entity.purchaseDate).toISOString().slice(0, 10);
      }
      if (this.entity.billOfEntryDate) {
        this.entity.billOfEntryDate = new Date(this.entity.billOfEntryDate).toISOString().slice(0, 10);
      }
      if (this.entity.relevantWarehouseInvoiceDate) {
        this.entity.relevantWarehouseInvoiceDate = new Date(this.entity.relevantWarehouseInvoiceDate).toISOString().slice(0, 10);
      }
      if (this.entity.quarterStartDate) {
        this.entity.quarterStartDate = new Date(this.entity.quarterStartDate).toISOString().slice(0, 10);
      }
      if (this.entity.quarterEndDate) {
        this.entity.quarterEndDate = new Date(this.entity.quarterEndDate).toISOString().slice(0, 10);
      }
    },
  },
};
</script>
<style scoped>
.bg-shade-1 {
  background: #99bfaa !important;
}
.page h5 {
  background: gray;
  color: white;
  padding: 2px 5px;
  border-radius: 2px;
}
.isUpdatePage {
  cursor: default;
  pointer-events: none;
  opacity: 0.45;
}
.table-responsive {
  overflow-y: visible;
  overflow-x: visible;
}
</style>


