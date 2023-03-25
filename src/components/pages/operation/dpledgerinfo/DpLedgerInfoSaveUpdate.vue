<template>
  <div class="asset-form">
    <div class="loading" v-if="progressBar.loading">
    </div>
    <router-link :to="{ name: 'DpLedgerInfo' }"  tag="span" class="button-tooltip pt-1 pl-3 float-left">
        <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
        <span class="button-tooltiptext">Back</span>
    </router-link>
    <br>
    <div class="container-fluid">   
      <form class="form-group" @submit.prevent="ledgerinfoSaveUpdate()">
          <div class="row justify-content-center">
              <div class="col-12">
                  <b-tabs v-model="tabIndex" ref="wizard">
                      <div class = "mt-2 ml-2 mr-2 mb-2">
                          <b-tab title="New Purchase" class="asset-form-panel">
                              <div class="row">
                                  <div class="col-md-6 col-12 col-sm-6" active>
                                      <!--<p>
                                          <label> <b>Warehouse Name</b></label>
                                          <model-list-select class="form-control mb-1" :list="warehouseinfoList" :key="warehouseName" v-model="entity.warehouseOid" option-value="oid" optionText="warehouseName" placeholder="Select Warehouse Name" v-validate="'required'" name="Warehouse Name" :disabled="showWarehouse()"/>
                                      </p>-->
                                      <p>
                                          <label class="required"> <b>Passport Number</b></label>
                                          <input class="form-control mb-1" v-model="entity.passportNo"  placeholder="Passport Number" v-validate="'required'" name="Passport Number" @change="getInfoByPassport()" autofocus/>
                                          <small v-show="errors.has('Passport Number')" class="help is-danger"><i v-show="errors.has('Passport Number')" class="fa fa-exclamation-circle"></i>{{ errors.first('Passport Number') }} </small>                                   
                                      </p> 
                                      <p>
                                          <label class="required"> <b>Name</b></label>
                                          <input class="form-control mb-1" v-model="entity.nameOfHolder"  placeholder="Name" v-validate="'required'" name="Name"/>
                                          <small v-show="errors.has('Name')" class="help is-danger"><i v-show="errors.has('Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('Name') }} </small>  
                                      </p>
                                      <p>
                                          <label class="required"> <b>Visa Valid Upto</b></label>
                                          <datepicker placeholder="Visa Valid Upto" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.visaValidUpto" v-validate="'required'" name="Visa Valid Upto"></datepicker>
                                          <small v-show="errors.has('Visa Valid Upto')" class="help is-danger"><i v-show="errors.has('Visa Valid Upto')" class="fa fa-exclamation-circle"></i>{{ errors.first('Visa Valid Upto') }} </small>
                                      </p>  
                                      <p>
                                          <label class="required"><b>Ex-Bond Bill Of Entry Number</b></label>
                                          <input type="text" class="form-control mb-1" v-model="entity.exBondBillOfEntryNo" v-validate="'required'" placeholder="Relevant Warehouse Invoice No." name="Relevant Warehouse Invoice No"/>
                                          <small v-show="errors.has('Relevant Warehouse Invoice No')" class="help is-danger"><i v-show="errors.has('Relevant Warehouse Invoice No')" class="fa fa-exclamation-circle"></i>{{ errors.first('Relevant Warehouse Invoice No') }} </small>
                                      </p>  
                                      <p>
                                          <label class="required"><b>Ex-Bond Date</b></label>
                                          <datepicker :bootstrap-styling="true" input-class="form-control mb-1" calendar-class="filter-date" 
                                          :disabled="dsble=true" v-model="entity.relevantWarehouseInvoiceDate" v-validate="'required'" name="Relevant Warehouse Invoice Date"></datepicker>
                                          <small v-show="errors.has('Relevant Warehouse Invoice Date')" class="help is-danger"><i v-show="errors.has('Relevant Warehouse Invoice Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('Relevant Warehouse Invoice Date') }} </small>
                                      </p> 
                                                                          
                                  </div>
                                  <div class="col-md-6 col-12 col-sm-6" active>  
                                      <p>
                                          <label> <b>Address</b></label>
                                          <input class="form-control mb-1" v-model="entity.address" placeholder="Address" name="Address"/>
                                      </p>                           
                                      <p>
                                          <label class="required"> <b>Nationality</b></label>
                                          <model-list-select class="form-control mb-1" placeholder="Select Nationality" :list="nationalityList"  v-model="entity.nationality" v-validate="'required'" option-value="name" optionText="name" name="Nationality"/>
                                          <small v-show="errors.has('Nationality')" class="help is-danger"><i v-show="errors.has('Nationality')" class="fa fa-exclamation-circle"></i>{{ errors.first('Nationality') }} </small>
                                      </p>
                                      <p>
                                          <label> <b>Date Of Arrival</b></label>
                                          <datepicker placeholder="Date Of Arrival" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.dateOfArrival" name="Date Of Arrival"></datepicker>
                                          <small v-show="errors.has('Date Of Arrival')" class="help is-danger"><i v-show="errors.has('Date Of Arrival')" class="fa fa-exclamation-circle"></i>{{ errors.first('Date Of Arrival') }} </small>
                                      </p>
                                      <P>
                                            <label> <b> Upload Ex Bond Bill Of Entry Document</b></label>
                                            <input type="file" color="green" name="exBond Bill Of Entry Document" id="file" class="form-control-file mb-1 inputfile"  accept="image/*" ref="file" v-on:change="exBondBillOfEntryDocUpload($event)">                                    
                                            <v-progress-linear v-model="billOfEntryUploadProgress.progress" v-show="billOfEntryUploadProgress.show" height="5" color="green"> </v-progress-linear>
                                            <!--<small v-show="errors.has('Applicant Signature')" class="help is-danger"><i v-show="errors.has('Applicant Signature')" class="fa fa-exclamation-circle"></i>{{ errors.first('Applicant Signature') }} </small>-->
                                        </P>
                                      <p>
                                          <label class="required"><b>Invoice Number</b></label>
                                          <input type="text" class="form-control mb-1" v-model="entity.relevantWarehouseInvoiceNo" v-validate="'required'" placeholder="Relevant Warehouse Invoice No." name="Relevant Warehouse Invoice No"/>
                                          <small v-show="errors.has('Relevant Warehouse Invoice No')" class="help is-danger"><i v-show="errors.has('Relevant Warehouse Invoice No')" class="fa fa-exclamation-circle"></i>{{ errors.first('Relevant Warehouse Invoice No') }} </small>
                                      </p>
                                  </div>
                                  <div class="col-12">
                                    <div class="table-responsive no-padding">
                                      <table class="table table-bordered table-sm">
                                        <tr class="table table-bordered text-center">
                                          <th style="">Name of Articles</th>
                                          <th style="">Products</th>
                                          <th style="">Bill Of Entry No.</th>
                                          <!--<th style="">Unit Sell Value ($)</th>-->
                                          <th style="">Total Pieces</th>
                                          <th style="">Total CIF Value ($)</th>
                                          <th style="">Total Tax</th>
                                          <th style="">Action</th>
                                        </tr>
                                        <tr v-for="(document, index) in entity.documents" :key="index" class="" >
                                          <td style="width: 12%">
                                            <model-list-select :list="categoryList" v-model="document.categoryOid" @input="getProductList(document); setCategoryType(document, index)" v-validate="'required'" option-value="oid" optionText="name" name="Article List" />
                                            <small v-show="errors.has('Article List')" class="help is-danger"><i v-show="errors.has('Article List')" class="fa fa-exclamation-circle"></i>{{ errors.first('Article List') }} </small>
                                          </td>
                                          <td style="width: 20%">
                                            <model-list-select :list="document.productList" v-model="document.productOid" @input="getBillOfEntryList(document)" v-validate="'required'" option-value="oid" optionText="name" name="Product list"/>
                                            <small v-show="errors.has('Product list')" class="help is-danger"><i v-show="errors.has('Product list')" class="fa fa-exclamation-circle"></i>{{ errors.first('Product list') }} </small>
                                          </td>
                                          <td style="width: 18%">
                                            <model-list-select :list="document.billOfEntryList" v-model="document.billOfEntryNo" v-validate="'required'" option-value="billOfEntryNo" optionText="name" @input="getUnitValue(document, index)" name="Bill of Entry list"/>
                                            <small v-show="errors.has('Bill of Entry list')" class="help is-danger"><i v-show="errors.has('Bill of Entry list')" class="fa fa-exclamation-circle"></i>{{ errors.first('Bill of Entry list') }} </small>
                                          </td>  
                                          <!--<td style="width: 10%">
                                            <input type="text" placeholder="Enter Unit Sell Value" class="form-control" v-model="document.unitSellValue" v-validate="'required'" name="Unit Sell Value"/>
                                            <small v-show="errors.has('Unit Sell Value')" class="help is-danger"><i v-show="errors.has('Unit Sell Value')" class="fa fa-exclamation-circle"></i>{{ errors.first('Unit Sell Value') }} </small>
                                          </td>-->
                                          <td style="width: 10%">
                                            <input type="text"  placeholder="Enter Total Pices" class="form-control" v-model="document.totalQuantity" v-validate="'required'" @input="validateQuantityCheck(document, index); calculateTotalSalesPrice();" name="Total Pieces"/>
                                            <small v-show="errors.has('Total Pieces')" class="help is-danger"><i v-show="errors.has('Total Pieces')" class="fa fa-exclamation-circle"></i>{{ errors.first('Total Pieces') }} </small>
                                          </td>
                                          <td style="width: 10%">
                                            <input  type="text" placeholder="Enter Total Value" class="form-control" v-model="document.totalValue" v-validate="'required'" :readonly="value=true" name="Total Value"/>
                                            <small v-show="errors.has('Total Value')" class="help is-danger"><i v-show="errors.has('Total Value')" class="fa fa-exclamation-circle"></i>{{ errors.first('Total Value') }} </small>
                                          </td>
                                          <td style="width: 10%">
                                            <input type="text"  placeholder="Enter Total Tax" class="form-control" v-model="document.totalTax" v-validate="'required'" @input="validateQuantityCheck(document, index); calculateTotalSalesPrice();" name="Total Tax"/>
                                            <small v-show="errors.has('Total Tax')" class="help is-danger"><i v-show="errors.has('Total Tax')" class="fa fa-exclamation-circle"></i>{{ errors.first('Total Tax') }} </small>
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
                                            <input type="hidden" placeholder="Enter Unit Value" class="form-control" v-model="document.unitValue" v-validate="'required'" @input="calculatePrice(index)" name="Unit Value"/>
                                          </td>
                                        </tr>
                                        <!--<tr>
                                          <td>
                                          <span class="total-pieces mr-2">
                                            Total Pieces :  {{totalSalesQuantity}}
                                          </span> 
                                          </td>
                                          <td>
                                          <span class="total-price">
                                            Total Price :  {{totalSalesPrice}}
                                          </span>
                                          </td>
                                        </tr>-->
                                      </table>
                                    </div>
                                  </div>
                              </div>
                          </b-tab>
                      </div>
                  </b-tabs>
              </div>
          </div>
          <div class="text-center mt-3 save-button">
            <div class="text-red mb-2" v-if="validateQuantityMsg">{{validateQuantityMsg}}</div>
            <button :disabled="sellButtonDisable" class="btn btn-success mr-3 " @click="dialog = true" @submit.prevent="ledgerinfoSaveUpdate()">
              {{ buttonText }}
            </button>
            <router-link tag="button" class="btn btn-danger mr-2" :to="{ name: 'DpLedgerInfo' }">
              Cancel
            </router-link> 
            <br>
            <span class="total-pieces mr-2">
              Total Pieces :  {{totalSalesQuantity}}
            </span> 
            <span class="total-price">
              Total Price :  {{totalSalesPrice}}
            </span>                  
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
      <v-dialog v-model="viewDetailsModel" max-width="850">
            <v-card>
              <v-card-text v-if="this.userType=='Exemption'">
                 <h5> Articles Details | {{this.quarteroid}} </h5>
                        <v-data-table :headers="headers" :items="entity1"  mobile-breakpoint="0" hide-actions>
                          <template slot="items" slot-scope="props" >
                            <td class="text-xs-left w-3">{{ props.item.categoryOid }}</td>  
                            <td  class="text-xs-left w-3">{{ props.item.allocatePieces }}</td>
                            <td class="text-xs-left w-3">{{ props.item.allocateValue }}</td>
                            <td class="text-xs-left w-3">{{ props.item.consumePieces }}</td>    
                            <td class="text-xs-left w-3">{{ props.item.consumeValue }}</td>
                            <td class="text-xs-left w-3">{{ props.item.availableValue }}</td>
                            <td class="text-xs-left w-3">{{ props.item.availablePieces }}</td>    
                          </template>
                        </v-data-table>
              </v-card-text >
              <v-card-text v-if="this.userType=='Passbook'">
                <h5> Articles Details </h5>  
                <v-data-table :headers="headers" :items="entity1"  mobile-breakpoint="0" hide-actions>
                  <template slot="items" slot-scope="props" >
                            <td class="text-xs-left w-5">{{ props.item.quarterOid }}</td>   
                            <td class="text-xs-left w-5">{{ props.item.allocateValue }}</td>   
                            <td class="text-xs-left w-5">{{ props.item.consumeValue }}</td>
                            <td class="text-xs-left w-5">{{ props.item.availableValue }}</td>
                  </template>
                </v-data-table>     
              </v-card-text >

              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn color="green darken-1" flat="flat" @click.native="viewDetailsModel = false">
                Yes
                </v-btn> -->
                <v-btn color="green darken-1" flat="flat" @click.native="viewDetailsModel = false">
                Ok
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
        relevantWarehouseInvoiceDate: new Date().toLocaleString(),
        exBondBillOfEntryNo: "", 
        exBondBillOfEntryPath: "",
        documents: [
          {
            categoryOid: "",
            categoryType: "",
            productOid: "",
            billOfEntryNo: "",
            // unitQuantity: "",            
            productList: [{oid:"", name:""}],
            billOfEntryList: [{billOfEntryNo:"", name:""}],
            unitValue: "",
            unitSellValue: "",
            totalQuantity: "",
            totalTax: "",
            totalValue: "",
          },
        ]
      },
      entity1:[],
      entity2:[],
      dollarRate:{
          oid: "",
          rate:"",
          dateFrom:"",
          dateTo:""                               
        },
      officeList:[],
      nationalityList:[],
      quarteroid: "",
      userType: "", 
      countdownTime:0,
      totalSalesQuantity:0,
      totalSalesPrice:0,
      validateQuantityMsg: "",
      addButtonDisable: false,
      dialog: false,
      viewDetailsModel: false,
      viewOTPModel: false,
      searchDataList:false,
      salesConfirmationModel:false,
      // headers: [{ text: "Name", value: "nameOfHolder", align: "left" }],
      contactList: [],
      profileList: [],
      productList:[],
      exemptionCategoryList:[],
      billOfEntryList:[],
      categoryList: [],
      searchList: [],
      slNoList: [],
      typeList: [],
      buttonText: "", 
      billOfEntryUploadProgress:{
          progress:"",
          show:""
      },
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
    this.init()
  },
  methods: {
    addItem(item) {
      item.push({
        label: "",
        value: "",
      });
    },

    
    isDisabled(){
      return true;
    },
    currentDate(){
      
      this.entity.relevantWarehouseInvoiceDate = new Date();
      // const date = current.getFullYear() + '-' + (current.getMonth()+1) + '-' + current.getDate();
      return 
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
    },
    confirmSales(){
      this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.salesConfirmationModel = true             
            });
    },
    init() {
      this.getSlNoList();
      this.getOfficeList();
      this.getCategory();
      this.getNationalityList();
      this.getDollarRate();
      this.entity.relevantWarehouseInvoiceDate = new Date().toLocaleString();
      if (this.$route.params.id) {
        this.buttonText = "Update";
        this.getLedgerInfo(this.$route.params.id);
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
    onlyNumber(event){
        let keyCode = event.keyCode;
        if ((keyCode > 31 && (keyCode < 48 || keyCode > 57)) && keyCode == 46) {
          event.preventDefault();
        } else {
          return true;
        }

     },
     freeze () {
      button.disabled = true
      setTimeout(function() { 
        button.disabled = false
      }, 60000);
    },
 
    startCountDown() {
      if(this.countdownTime > 0) {
        setTimeout(() => {
            this.countdownTime -= 1
            this.startCountDown()
        }, 1000)
      } else {
        const resendButton = document.getElementById("resend")
        resendButton.disabled = false
        const submitButton = document.getElementById("submit")
        submitButton.disabled = true

      }
      // var minutes = 0,
      // seconds = 59;
      // $("#countdown").html(seconds);
      // setTimeout(function() {
      //   if (parseInt(seconds) <=0 ) {
      //       $("#countdown").html(seconds);
      //       $('#resend').prop('disabled',false);
      //     } else {
      //       $("#countdown").html(seconds);
      //       seconds--;
      //       if (seconds < 10) seconds = "0" + seconds;
      //     }
      //   }, 1000);
    },
    getDollarRate(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.operation_dpledgerinfo_v1_dollar_get_by_oid, body);
        
            lumos_client.onPost(url.operation_dpledgerinfo_v1_dollar_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.dollarRate = result['data']['body'];
            }).catch(error =>{
            });
        },
    getInfoByPassport(){
      this.progressBar.loading = true;
      this.progressBar.show = true;
      let passport = this.entity.passportNo
      let body = {passportNo: this.entity.passportNo};
      let req = constant.getRequest(url.operation_dpledgerinfo_v1_get_by_oid, body);  
      lumos_client.onPost(url.operation_dpledgerinfo_v1_get_by_oid, req)
      .then(result => {
          this.progressBar.loading = false;
          this.progressBar.show = false;
          this.entity = result['data']['body'];
          this.oidModifier(this.entity);
          setTimeout(
                () =>
                (this.entity = {
                    nameOfHolder: this.entity.nameOfHolder,
                    address: this.entity.address,
                    nationality: this.entity.nationality,
                    dateOfArrival: this.entity.dateOfArrival,
                    visaValidUpto: this.entity.visaValidUpto,
                    passportNo: passport,
                    relevantWarehouseInvoiceDate: new Date().toLocaleString(),
                    exBondBillOfEntryNo: "", 
                    exBondBillOfEntryPath: "",
                    documents: [
                        {
                          categoryOid: "",
                          categoryType: "",
                          productOid: "",
                          billOfEntryNo: "",
                          // unitQuantity: "",            
                          productList: [{oid:"", name:""}],
                          billOfEntryList: [{billOfEntryNo:"", name:""}],
                          unitValue: "",
                          unitSellValue: "",
                          totalQuantity: "",
                          totalTax: "",
                          totalValue: "",
                        },
                      ]
                }),
                10
            );
      }).catch(error =>{
      });
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
    viewDetails(){
      this.viewDetailsModel = true;
    },
    getProductList(event){
         let body = {categoryOid: event.categoryOid};
         let req = constant.getRequest(url.operation_ledgerinfo_v1_ledgerinfo_product_get_list, body);
         lumos_client.onPost(url.operation_ledgerinfo_v1_ledgerinfo_product_get_list, req)
        .then(result => {
            event.productList = result['data']['body']['data'];
            this.productList = event.productList;
        }).catch(error => {
        });
    },
    showTotalPrice(){
                return true;
        },
    getBillOfEntryList(event){
         let body = {productOid: event.productOid};
         let req = constant.getRequest(url.operation_purchase_v1_billofentry_get_list, body);
         lumos_client.onPost(url.operation_purchase_v1_billofentry_get_list, req)
        .then(result => {
            event.billOfEntryList = result['data']['body']['data'];
            this.billOfEntryList = event.billOfEntryList;
        }).catch(error => {
        });
    },
    getUnitValue(event, index){
      // User @input="getUnitValue(document, index)" on billOfEntry field to use automatic unit price
      
      for(let i = 0; i < event.billOfEntryList.length; i++){
        if(event.billOfEntryList[i].billOfEntryNo == this.entity.documents[index].billOfEntryNo){
          this.entity.documents[index].unitValue = event.billOfEntryList[i].unitValue
          this.calculatePrice(index)
        }
      }

    },
    exBondBillOfEntryDocUpload(event){
            let formData = new FormData();
            formData.append('file',event.target.files[0], event.target.files[0].name );
            this.billOfEntryUploadProgress.show = true;
            lumos_client.onUpload(url.master_document_v1_upload+'?folderName=billOfEntryUpload', formData,  {
                onUploadProgress: uploadEvent => {
                    this.billOfEntryUploadProgress.valueDeterminate =  Math.round(uploadEvent.loaded / uploadEvent.total*100) 
                }
            }).then(result => {
                this.entity.exBondBillOfEntryPath = result.data;            
            }).catch(error => {
            });
        },
    getTestList(billOfEntryList,boeNo){
      //let document;
      for (var key in billOfEntryList) {
          var value = billOfEntryList[key];
          if(value.billOfEntryNo === boeNo)
          {
            //billOfEntryDate;
            //billOfEntryOfficeCode;
            //purchaseStockOid;
          }
      }
    },
    getSlNoList(){
         let body = {oid: "slNoList"};
         let req = constant.getRequest(url.master_generalprofile_v1_get_list, body);
         lumos_client.onPost(url.master_generalprofile_v1_get_list, req)
        .then(result => {
            let slList =[];
            slList = result['data']['body']['data'];
            for(let i = 0; i< slList.length; i++){
              if(slList[i].userType=='Passbook' && slList[i].state =='3' ){
                this.slNoList.push(slList[i].slNo);              
              } else if(slList[i].userType=='Exemption' && slList[i].state =='4'){
                this.slNoList.push(slList[i].slNo);
              }
            }
        }).catch(error => {
        });
    },
    getOfficeList(){
            let body = {};
            let req = constant.getRequest(url.master_office_v1_get_list, body);
            lumos_client.onPost(url.master_office_v1_get_list, req)
            .then(result => {
                this.officeList = result['data']['body']['data'];
            }).catch(error => {
            });
    },
    getNationalityList(){
            let body = {};
            let req = constant.getRequest(url.operation_dpledgerinfo_v1_nationality_get_list, body);
            lumos_client.onPost(url.operation_dpledgerinfo_v1_nationality_get_list, req)
            .then(result => {
                this.nationalityList = result['data']['body']['data'];
            }).catch(error => {
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
        categoryType: "",
        productOid: "",
        billOfEntryNo: "",
        unitValue: "",
        unitSellValue: "",
        productList: [],
        billOfEntryList: [],
        totalQuantity: "",
        totalTax: "",
        totalValue: "",
      });
    },
    deleteConfirmation(index, oid) {
      this.deleteConfirmationModel = true
      this.itemIndex = index
      this.itemArticleOid = oid
    },
    calculatePrice(index) { 
      if(this.entity.documents[index].unitValue !=="" && this.entity.documents[index].totalQuantity !==""){
        let value = parseFloat(this.entity.documents[index].unitValue)*parseFloat(this.entity.documents[index].totalQuantity);
        // if(this.entity.documents[index].totalTax.length>0){
        //   value+=(+this.entity.documents[index].totalTax)
        // }
        this.entity.documents[index].totalValue = value.toFixed(2)  
      } 
    },
    setCategoryType(event, index) { 
      for(let k=0; k<this.categoryList.length; k++ ){
        if(event.categoryOid ==this.categoryList[k].oid){
          this.entity.documents[index].categoryType =  this.categoryList[k].type
        }
      }
    },

    calculateTotalSalesPrice(){
      let quantity = 0;
      let price =0;
      for(let i=0; i<this.entity.documents.length; i++){
        if(this.entity.documents[i].totalValue.length>0){
          price= price + (+this.entity.documents[i].totalValue)
          if(this.entity.documents[i].totalTax.length>0){
            price+=(+this.entity.documents[i].totalTax)
          }
          quantity += (+this.entity.documents[i].totalQuantity)
        }
      } 
      this.totalSalesPrice = price.toFixed(2)   
      this.totalSalesQuantity = quantity
    },
    // validateQuantity(){ 
    //   this.validateQuantityMsg = ""
    //   let result = this.entity.documents.reduce(function (r, a) {
    //     r[a.billOfEntryNo] = r[a.billOfEntryNo] || [];
    //     r[a.billOfEntryNo].push(a);
    //     return r;
    //   }, Object.create(null));
    //   let totalPic
    //   for (let key in result) {
    //     totalPic = 0
    //     for(let i=0; i<result[key].length;i++){
    //         for(let j=0; j<result[key][0].billOfEntryList.length; j++ ){
    //           if(result[key][0].billOfEntryList[j].billOfEntryNo === key && result[key][0].billOfEntryList[j].billOfEntryNo === result[key][0].billOfEntryNo ){
               
    //           totalPic = totalPic + (+result[key][i].totalQuantity)
    //            if(+result[key][0].billOfEntryList[j].purchaseDetailsTotalQuantity < totalPic ){
    //               let prod = result[key][i].productList.filter((x)=>{if(x.oid == result[key][i].productOid){return x}})
    //               this.validateQuantityMsg = this.validateQuantityMsg + " Limit exceeds for Product "+prod[0].name+ "("+result[key][0].billOfEntryList[j].billOfEntryNo+")"+"."
    //             }

    //           }
    //         }
    //     }
    //   }
      
    // },
    validateQuantity(){ 
      this.validateQuantityMsg = ""
      let result = this.entity.documents.reduce(function (r, a) {
        r[a.billOfEntryNo] = r[a.billOfEntryNo] || [];
        r[a.billOfEntryNo].push(a);
        return r;
      }, Object.create(null));
      let totalPic
      let totalCategoryPic
      let totalProductPic
      for (let key in result) {
        totalPic = 0
        totalCategoryPic = 0
        totalProductPic = 0

        //Category
        for(let i=0; i<result[key].length;i++){
            for(let j=0; j<result[key][0].billOfEntryList.length; j++ ){
              if(result[key][0].billOfEntryList[j].billOfEntryNo === key && result[key][0].billOfEntryList[j].billOfEntryNo === result[key][0].billOfEntryNo ){
               
              totalPic = totalPic + (+result[key][i].totalQuantity)
              totalCategoryPic = totalCategoryPic + (+result[key][i].billOfEntryList[j].purchaseDetailsTotalQuantity)
              }              
            }            
        }
        // Total category check bill of entry wise
        if(totalCategoryPic < totalPic ){
            this.validateQuantityMsg = this.validateQuantityMsg + " Limit exceeds for Category ";
        }

        //Product
        // for(let i=0; i<result[key].length;i++){
        //     for(let j=0; j<result[key][0].billOfEntryNo.length; j++ ){
        //       if(result[key][0].billOfEntryList[j].billOfEntryNo === key && result[key][0].billOfEntryList[j].billOfEntryNo === result[key][0].billOfEntryNo ){
               
        //       totalPic = totalPic + (+result[key][i].totalQuantity)
        //       totalCategoryPic = totalCategoryPic + (+result[key][i].billOfEntryList[j].purchaseDetailsTotalQuantity)
        //       }              
        //     }            
        // }
        // Total product check bill of entry wise
        if(totalProductPic < totalPic ){
            this.validateQuantityMsg = this.validateQuantityMsg + " Limit exceeds for Product ";
        }

      }
      
    },
// this.entity.documents[i].productOid === doc.productOid && 
    validateQuantityCheck(doc, i){
       let purchaseDetailsTotalQuantity = 0;
       let liqueurTotalPrice = 0
       let foodTotalPrice = 0
      //  console.log(doc[i])
      //  console.log(this.entity.documents)
      for(let k=0; k<doc.billOfEntryList.length; k++){
        if( doc.billOfEntryList[k].billOfEntryNo === doc.billOfEntryNo){
          purchaseDetailsTotalQuantity = (+doc.billOfEntryList[k].purchaseDetailsTotalQuantity)
        }
      }
      let singleRowQuantity = (+doc.totalQuantity)
      if(purchaseDetailsTotalQuantity < singleRowQuantity){
            this.entity.documents[i].totalValue = ""              
            this.validateQuantityMsg = "Limit exceeds for Bill of entry no. "+ doc.billOfEntryNo;

      }else{
        
        let totalQuantity =0;
        for(let j=0; j<this.entity.documents.length; j++){
          
          if(this.entity.documents[j].productOid === doc.productOid && this.entity.documents[j].billOfEntryNo === doc.billOfEntryNo ){ 
            totalQuantity += (+this.entity.documents[j].totalQuantity)
          if(purchaseDetailsTotalQuantity < totalQuantity){
            // this.entity.documents[j].totalQuantity = ""
            this.entity.documents[j].totalValue = ""
            
            this.validateQuantityMsg = "Limit exceeds for Bill of entry no. "+ doc.billOfEntryNo;
          }else{
            this.calculatePrice(j)
            this.validateQuantityMsg = ""
            }
          }
        }
        
      }
      for(let j=0; j<this.entity.documents.length; j++){
        if(this.entity.documents[j].categoryType=='F'){
          let foodPrice =(+this.entity.documents[j].totalValue)
          foodTotalPrice += foodPrice*(this.dollarRate.rate)
        } else if(this.entity.documents[j].categoryType=='L'){
          let liqueurPrice =(+this.entity.documents[j].totalValue)
          liqueurTotalPrice += liqueurPrice*(this.dollarRate.rate)
        }
      }
      if(liqueurTotalPrice >720){
          this.entity.documents[i].totalValue = ""              
          this.validateQuantityMsg = "Total liqueur price exceeds maximum limit 720 Taka ";
      } else if(foodTotalPrice>600){
          this.entity.documents[i].totalValue = ""              
          this.validateQuantityMsg = "Total food price exceeds maximum limit 600 Taka ";
      }
      return;
  
    },
    oidModifier(entity){
            if(this.entity.visaValidUpto){
                this.entity.visaValidUpto = new Date(this.entity.visaValidUpto);
            }
            if(this.entity.dateOfArrival){
                this.entity.dateOfArrival = new Date(this.entity.dateOfArrival);
            }            
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
      // this.validateQuantity()
      if(this.validateQuantityMsg) { 
        return
      }

      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }
        
        this.viewOTPModel =false;

        this.progressBar.loading = true;
        this.progressBar.show = true;
        let http_url = "";
        if (this.$route.params.id) {
          http_url = url.operation_dpledgerinfo_v1_save;
        } else {
          http_url = url.operation_dpledgerinfo_v1_save;
        }
       
        let body = this.modifier(this.entity);
        
        let req = constant.getRequest(http_url, body);
        lumos_client.onPost(http_url, req).then((result) => {
            this.progressBar.loading = false;
            this.progressBar.show = false;
            let res = result.data.header.responseCode;
            
            this.snackbar = true;
            if(res != "200") {
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
              this.entity.exBondBillOfEntryNo="";
              this.entity.exBondBillOfEntryPath= "";
              // this.entity.relevantWarehouseInvoiceDate = "";
              this.entity.documents = [
                {
                  categoryOid: "",
                  categoryType: "",
                  productOid: "",
                  billOfEntryNo: "",
                  unitValue: "",
                  unitSellValue: "",
                  productList: [],
                  billOfEntryList: [],
                  totalQuantity: "",
                  totalTax: "",
                  totalValue: "",
                },
              ];
              this.color = "success"; 
              // this.messageText = "Duty Paid Sales Approved Successfully";
              setTimeout( () => this.$router.push({name:'DpLedgerInfo'}), 3000);
            }
          })
          .catch((error) => {
            this.$log.error(error);
          });
      });
    },


    modifier(entity) {
      var obj = _.clone(entity);
      obj.documents = JSON.stringify(entity.documents);

      var exmpCategory = JSON.parse(JSON.stringify(entity.documents)) ;
      for(var i=0;i<exmpCategory.length;i++){
           //_.without(exmpCategory[i], 'billOfEntryList')
           delete exmpCategory[i].billOfEntryList;
           delete exmpCategory[i].productOid;
           delete exmpCategory[i].billOfEntryNo;         
           delete exmpCategory[i].productList;
           delete exmpCategory[i].unitValue;  
           exmpCategory[i].totalValue = JSON.parse(exmpCategory[i].totalValue);
           exmpCategory[i].totalQuantity = JSON.parse(exmpCategory[i].totalQuantity);
      }
      var helper = {};
      var result = exmpCategory.reduce(function(r, o) {
      var key = o.categoryOid;        
        if(!helper[key]) {
          helper[key] = Object.assign({}, o); // create a copy of o
          r.push(helper[key]);
        } else {
          helper[key].totalValue += o.totalValue;
          helper[key].totalQuantity += o.totalQuantity;
        }
          return r;
        }, []);    
      this.entity.exemptionCategoryList = result;
      obj.exemptionCategoryList = JSON.stringify(this.entity.exemptionCategoryList);  

      ///////////   test   ///////////
      //var obj = _.clone(entity);
      //obj.documents = JSON.stringify(entity.documents);

      if(this.entity.relevantWarehouseInvoiceDate){
        //  obj.relevantWarehouseInvoiceDate = obj.relevantWarehouseInvoiceDate.toISOString();
        obj.relevantWarehouseInvoiceDate = new Date().toISOString();
      }
      if (this.entity.billOfEntryDate) {
        obj.billOfEntryDate = obj.billOfEntryDate.toISOString();
      }
      if (this.entity.salesDate) {
        obj.salesDate = obj.salesDate.toISOString();
      }
      return obj;
    },
    // oidModifier(entity) {
    //   if (this.entity.validupto) {
    //     this.entity.validupto = new Date(this.entity.validupto).toISOString().slice(0, 10);
    //   }
    //   if (this.entity.purchaseDate) {
    //     this.entity.purchaseDate = new Date(this.entity.purchaseDate).toISOString().slice(0, 10);
    //   }
    //   if (this.entity.billOfEntryDate) {
    //     this.entity.billOfEntryDate = new Date(this.entity.billOfEntryDate).toISOString().slice(0, 10);
    //   }
    //   if (this.entity.relevantWarehouseInvoiceDate) {
    //     this.entity.relevantWarehouseInvoiceDate = new Date(this.entity.relevantWarehouseInvoiceDate).toISOString().slice(0, 10);
    //   }
    //   if (this.entity.quarterStartDate) {
    //     this.entity.quarterStartDate = new Date(this.entity.quarterStartDate).toISOString().slice(0, 10);
    //   }
    //   if (this.entity.quarterEndDate) {
    //     this.entity.quarterEndDate = new Date(this.entity.quarterEndDate).toISOString().slice(0, 10);
    //   }
    // },
    filterSl(e){
      const searchWrapper = document.querySelector(".search-input");
      let searchData = "";
      searchData = e.target.value;
      let emptyArr = [];
      this.searchList = this.slNoList.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(searchData.toLocaleLowerCase()); 
        });
      this.searchDataList = true;
        searchWrapper.classList.add("active"); //show autocomplete box        
    },
    showSuggestions(list){
      let listData;
      if(!list.length){
        let userValue = ""
        userValue = document.getElementById("searchInput").value;
        listData = '<li>'+ userValue +'</li>';
      } else{
        listData = list.join('');
      }
      document.querySelector(".autocom-box").innerHTML = listData;
    },
    select(e){
      const searchWrapper = document.querySelector(".search-input");
      let selectData = e.target.textContent;
      this.entity.slno = selectData;
      document.getElementById("searchInput").value = selectData;
      this.searchDataList = false;
      searchWrapper.classList.remove("active"); //hide autocomplete box
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
::selection{
  color: #fff;
  background: #664AFF;
}

.wrapper{
  /* max-width: 450px; */
   max-height: 40px;
  /* margin: 150px auto; */
}

.wrapper .search-input{
  background: #fff;
  width: 100%; 
  border-radius: 5px;
  position: relative;
  /* box-shadow: 0px 1px 5px 3px rgba(0,0,0,0.12); */
}

.search-input input{
  height: 35px;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 0 20px 0 20px;
  font-size: 16px;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
}
.passport-input input{
  height: 35px;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 0 20px 0 20px;
  font-size: 16px;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
}

.search-input.active input{
  border-radius: 5px 5px 0 0;
}
.search-input .search-dropdown{
  overflow-y: visible;
  overflow-x: visible;
  max-height: 200px;
}

.search-input .autocom-box{
  padding: 0;
  opacity: 0;
  pointer-events: none;
  max-height: 280px;
  /* overflow-y: auto; */
  /* overflow-y: visible; */
  /* overflow-x: visible; */
}

.search-input.active .autocom-box{
  padding: 10px 8px;
  opacity: 1;
  pointer-events: auto;
  /* overflow-y: visible; */
  /* overflow-x: visible; */
}

.autocom-box li{
  list-style: none;
  padding: 8px 12px;
  display: none;
  width: 100%;
  cursor: default;
  border-radius: 3px;
  /* overflow-y: visible; */
  /* overflow-x: visible; */
}

.search-input.active .autocom-box li{
  display: block;
  /* overflow-y: visible; */
  /* overflow-x: visible; */
}
.autocom-box li:hover{
  background: #efefef;
  /* overflow-y: visible; */
  /* overflow-x: visible; */
}

.search-input .icon{
  position: absolute;
  right: 0px;
  top: 0px;
  height: 55px;
  width: 55px;
  text-align: center;
  line-height: 55px;
  font-size: 20px;
  color: #644bff;
  cursor: pointer;
}


hr.hr1{
  border-top: 1px solid rgb(73, 185, 69);
}
.middle {
border: 2px solid #6b6b6a;
display: flex;
justify-content: center;
}
.middle1 {
display: flex;
justify-content: center;
}
#button {
  border: 1px dotted #3e6e35;
}
.pess-exemp-text{
  max-width: 250px;
}
.pessport-text{
  max-width: 140px;
}

.save-button .total-price { 
  margin-left: 24px;
  float:left;
  font-size: 16px !important;
  }
  .save-button .total-pieces { 
    float:left;
    font-size: 16px !important;
  }
</style>
