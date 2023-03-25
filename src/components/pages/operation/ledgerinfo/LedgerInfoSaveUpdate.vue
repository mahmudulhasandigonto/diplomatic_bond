<template>
  <div class="asset-form">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="container-fluid">
      <!-- Section 1 Start -->
      <div class="card">
        <div class="card-body">
          <div class="row">  
            <div class="col-12 col-md-12 d-inline-flex">
              <div class="col-10 col-md-1">
                <router-link :to="{ name: 'LedgerInfo' }" tag="span" class="button-tooltip pt-1 float-left">
                  <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                  <span class="button-tooltiptext">Back</span>
                </router-link>
              </div>
              <div class="col-10 col-md-3 pess-exemp-text">               
                  <label style="text-align: right; font-size: 16px;"><b>Passbook/Exemption No.</b></label>               
              </div>
              <div class="wrapper col-10 col-md-4">
                <div class="search-input">
                  <!-- <a href="" target="_blank" hidden></a> -->
                  <input id="searchInput" @keyup="filterSl($event)" type="text" v-model="entity.slno" placeholder="Serial number" @keyup.enter="getShow(entity.slno, entity.passportNo)">
                  <div v-if="searchDataList" class="scroll search-dropdown" style="height:100%; position:abdolute; overflow-y: visible; overflow-x: hidden; z-index: 1000;">
                    <div class="autocom-box" v-for="(item, index) in searchList" :key="index">
                   <!-- here list are inserted from javascript -->
                      <li @click="select($event)">{{item}}</li>
                    </div>
                  </div>
                <!-- <div class="icon"><i class="fas fa-search"></i></div> -->
                </div>
              </div>
              <div class="col-10 col-md-2 pessport-text">               
                  <label style="text-align: right; font-size: 16px;"><b>Passport No.</b></label>               
              </div>
              <div class="col-10 col-md-2 passport-input">               
                  <input id="passportInput" type="text" v-model="entity.passportNo" placeholder="Passport No.">               
              </div>
              <div class="col-10 col-md-1">
                <div class="d-flex justify-content-end">
                  <div>
                    <button class="btn button-width ripple btn-sm btn-outline-success" style="height: 35px" @click="getShow(entity.slno, entity.passportNo)">
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
      <div class="card" v-if="showDetails" style="z-index: -1;">
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
                      <td style="width: 20%"><b> Type </b></td>
                      <td style="width: 80%">{{ entity.userType }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-3 col-6">
                <table class="table table-bordered table-sm">
                  <tbody>
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
                        <b> Allocate Value ($) </b>
                      </td>
                      <td @keypress="onKeydown" style="width: 40%">{{ entity.allocatevalue }}</td>
                    </tr>
                    <tr v-if="getexemption(this.entity.userType)">
                      <td style="width: 60%"><b> Consume Pieces </b></td>
                      <td style="width: 40%">{{ entity.consumepieces }}</td>
                    </tr>
                    <tr>
                      <td style="width: 60%">
                        <b> Consume Value ($)</b>
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
      <form class="form-group" style="position: absolute;" @submit.prevent="ledgerinfoSaveUpdate()">
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
                    <!-- <div class="col-10 col-md-6 mb-2">
                      <div class="justify-content-end justify-content-md-center mb-2">
                        <label><b>House Keeper Name.</b></label>
                        <input type="text" class="form-control mb-1" v-model="entity.houseKeeper" placeholder="House Keeper" name="House Keeper"/>
                      </div>
                    </div> -->
                    <div class="col-10 col-md-4 mb-2">
                      <div class="justify-content-end justify-content-md-center mb-2">
                        <label class="required"><b>Ex-Bond Number</b></label>
                        <input type="text" class="form-control mb-1" v-model="entity.relevantWarehouseInvoiceNo" v-validate="'required'" placeholder="Relevant Warehouse Invoice No." name="Relevant Warehouse Invoice No" autofocus/>
                        <small v-show="errors.has('Relevant Warehouse Invoice No')" class="help is-danger"><i v-show="errors.has('Relevant Warehouse Invoice No')" class="fa fa-exclamation-circle"></i>{{ errors.first('Relevant Warehouse Invoice No') }} </small>
                      </div>
                    </div>
                    
                    <div class="col-10 col-md-4 mb-2">
                      <div class="justify-content-end justify-content-md-center mb-2">
                        <label class="required"><b>Ex-Bond Date</b></label>
                        <!-- <p>{{currentDate()}}</p> -->
                        <datepicker :bootstrap-styling="true" input-class="form-control mb-1" calendar-class="filter-date" 
                        :disabled="dsble=true" v-model="entity.relevantWarehouseInvoiceDate" v-validate="'required'" name="Relevant Warehouse Invoice Date"></datepicker>
                        <small v-show="errors.has('Relevant Warehouse Invoice Date')" class="help is-danger"><i v-show="errors.has('Relevant Warehouse Invoice Date')" class="fa fa-exclamation-circle"></i>{{ errors.first('Relevant Warehouse Invoice Date') }} </small>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <!-- <b>Articles</b> -->
                    <span class="btn btn-bg-default button-tooltip mr-3" @click="addDocument(entity.documents)">
                      <b>Articles</b> &nbsp;
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      <span class="button-tooltiptext">Add</span>
                    </span>
                    <span class="btn btn-bg-default button-tooltip ml-2" id="button" @click="viewDetails()">
                      View Articles Details                     
                    </span>
                    <div class="table-responsive no-padding">
                      <table class="table table-bordered table-sm">
                        <tr class="table table-bordered text-center">
                          <th style="">Name of Articles</th>
                          <th style="">Products</th>
                          <th style="">Bill Of Entry No.</th>
                          <!-- <th style="">Unit Quantity</th> -->
                          <th style="">Unit Sell Value ($)</th>
                          <th style="">Total Pieces</th>
                          <th style="">Total CIF Value ($)</th>
                          <th style="">Action</th>
                        </tr>
                        <tr v-for="(document, index) in entity.documents" :key="index" class="" >
                          <td style="width: 12%">
                            <model-list-select :list="categoryList" v-model="document.categoryOid" @input="getProductList(document)" v-validate="'required'" option-value="oid" optionText="name" name="Article List" />
                            <small v-show="errors.has('Article List')" class="help is-danger"><i v-show="errors.has('Article List')" class="fa fa-exclamation-circle"></i>{{ errors.first('Article List') }} </small>
                          </td>
                          <td style="width: 22%">
                            <model-list-select :list="document.productList" v-model="document.productOid" @input="getBillOfEntryList(document)" v-validate="'required'" option-value="oid" optionText="name" name="Product list"/>
                            <small v-show="errors.has('Product list')" class="help is-danger"><i v-show="errors.has('Product list')" class="fa fa-exclamation-circle"></i>{{ errors.first('Product list') }} </small>
                          </td>
                          <td style="width: 18%">
                            <model-list-select :list="document.billOfEntryList" v-model="document.billOfEntryNo" v-validate="'required'" option-value="billOfEntryNo" optionText="name" @input="getUnitValue(document, index)" name="Bill of Entry list"/>
                            <small v-show="errors.has('Bill of Entry list')" class="help is-danger"><i v-show="errors.has('Bill of Entry list')" class="fa fa-exclamation-circle"></i>{{ errors.first('Bill of Entry list') }} </small>
                          </td>  
                          
                          <td style="width: 10%">
                            <input type="text" placeholder="Enter Unit Sell Value" class="form-control" v-model="document.unitSellValue" v-validate="'required'" name="Unit Sell Value"/>
                            <small v-show="errors.has('Unit Sell Value')" class="help is-danger"><i v-show="errors.has('Unit Sell Value')" class="fa fa-exclamation-circle"></i>{{ errors.first('Unit Sell Value') }} </small>
                          </td>
                          <td style="width: 10%">
                            <input type="text"  placeholder="Enter Total Pices" class="form-control" v-model="document.totalQuantity" v-validate="'required'" @input="validateQuantityCheck(document, index); calculateTotalSalesPrice();" name="Total Pieces"/>
                            <small v-show="errors.has('Total Pieces')" class="help is-danger"><i v-show="errors.has('Total Pieces')" class="fa fa-exclamation-circle"></i>{{ errors.first('Total Pieces') }} </small>
                          </td>
                          <td style="width: 12%">
                            <input  type="text" placeholder="Enter Total Value" class="form-control" v-model="document.totalValue" v-validate="'required'" :readonly="value=true" name="Total Value"/>
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
                            <input type="hidden" placeholder="Enter Unit Value" class="form-control" v-model="document.unitValue" v-validate="'required'" @input="calculatePrice(index)" name="Unit Value"/>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div class="text-center mt-3 save-button">
                      <div class="text-red mb-2" v-if="validateQuantityMsg">{{validateQuantityMsg}}</div>
                        
                          <button :disabled="sellButtonDisable" class="btn btn-success mr-3 " @click="dialog = true" @submit.prevent="ledgerinfoSaveUpdate()">
                            {{ buttonText }}
                          </button>
                          <router-link tag="button" class="btn btn-danger mr-2" :to="{ name: 'LedgerInfo' }">
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
      <v-dialog persistent v-model="viewOTPModel" max-width="600" height="400">
            <v-card>
                <v-card-text>
                  <h5>Please Enter Your OTP    ({{this.countdownTime}} sec remaining)</h5>
                </v-card-text>
                <form class="form-group" @submit.prevent="submitOtp()">
                    <div class="">                            
                        <div class="ml-5 mr-5">                                    
                            <input class="form-control" placeholder="Enter Your OPT" v-model="entity.otp"  name="otp" @keypress="onlyNumber" autocomplete="off">
                        </div>                    
                        <div class="text-center mt-4">
                            <button id="resend" class="btn btn-secondary button-width ripple mr-3" flat="flat" v-on:click.prevent="resendOtp()">
                            Resend
                            </button>
                            <button id="submit" class="btn btn-success button-width ripple ml-3" @submit.prevent="submitOtp()">
                            Submit
                            </button>
                        </div>
                        </br>
                    </div>
                </form>
            </v-card>
      </v-dialog>
      <v-dialog v-model="salesConfirmationModel" max-width="60%">
        <v-card>
            <div class="p-4">
                <div class="row">
                    <div class="col col-md-6">
                      <label><b>Ex-Bond Number</b></label>
                      <input type="text" class="form-control mb-1" v-model="entity.relevantWarehouseInvoiceNo" placeholder="Relevant Warehouse Invoice No." name="Relevant Warehouse Invoice No" readonly/>
                    </div>
                    <div class="col col-md-6">
                        <label class="required"><b>Ex-Bond Date</b></label>
                        <datepicker :bootstrap-styling="true" input-class="form-control mb-1" calendar-class="filter-date" 
                        :disabled="dsble=true" v-model="entity.relevantWarehouseInvoiceDate" name="Relevant Warehouse Invoice Date"></datepicker>
                    </div>                         
                </div>
                <div class="table-responsive pt-2" >
                    <table class="table table-bordered table-sm">
                        <tr class="table table-bordered text-center">
                          <th style="">Name of Articles</th>
                          <th style="">Products</th>
                          <th style="">Bill Of Entry No.</th>
                          <th style="">Unit CIF Value ($)</th>
                          <th style="">Total Pieces</th>
                          <th style="">Total CIF Value ($)</th>
                        </tr>
                        <tr v-for="(document, index) in entity.documents" :key="index" class="">
                            <td>
                              <model-list-select :list="categoryList" style="border-color:white; color:black;" v-model="document.categoryOid" option-value="oid" optionText="name" name="Article Name" :isDisabled='true' />
                            </td>
                            <td>
                              <model-list-select :list="document.productList" style="border-color:white; color:black;" v-model="document.productOid" option-value="oid" optionText="name" name="Product Name" :isDisabled='true'/>
                            </td>
                            <td>
                              <model-list-select :list="document.billOfEntryList" style="border-color:white; color:black;" v-model="document.billOfEntryNo" option-value="billOfEntryNo" optionText="name" name="Bill of Entry No." :isDisabled= 'true'/>
                            </td>
                            <td>
                              <input type="hidden" style="border-color:white;" placeholder="Enter Unit Value" class="form-control" v-model="document.unitValue" name="Unit Value" readonly/>
                            </td>
                            <td>
                              <input type="text" style="border-color:white;" placeholder="Enter Unit Sell Value" class="form-control" v-model="document.unitSellValue" name="Unit Sell Value"/>
                            </td>
                            <td>
                              <input type="text" style="border-color:white;" placeholder="Total Pices" class="form-control" v-model="document.totalQuantity" name="Total Pieces" readonly/>
                            </td>
                            <td>
                              <input  type="text" style="border-color:white;" placeholder="Enter Total Value" class="form-control" v-model="document.totalValue" name="Total Price" readonly/>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="text-center mt-2">
                    <button class="btn btn-success button-width ripple mr-3" @click="ledgerinfoSaveUpdate()">
                        {{buttonText}}
                    </button>
                    <button class="btn btn-danger button-width ripple" @click="salesConfirmationModel=false">
                        Cancel
                    </button>
                </div> 
            </div>
            
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
        // relevantWarehouseInvoiceDate:"",
        // resend:"",
        documents: [
          {
            categoryOid: "",
            productOid: "",
            billOfEntryNo: "",
            // unitQuantity: "",            
            productList: [{oid:"", name:""}],
            billOfEntryList: [{billOfEntryNo:"", name:""}],
            unitValue: "",
            unitSellValue: "",
            totalQuantity: "",
            totalValue: "",
          },
        ],
      },
      entity1:[],
      entity2:[],
      headers: [
                { text: "Category", value: "categoryOid", align: "left" },
                // { text: "Allocated Qty", value: "allocateQuantity", align: "left" },
                { text: "Allocate Pieces", value: "allocatePieces", align: "left" },
                { text: " Allocate Value", value: "allocateValue", align: "left" },
                // { text: "Consumed Quantity", value: "consumeQuantity", align: "left" },
                { text: "Consume Pieces", value: "consumePieces", align: "left" },
                { text: "Consume Value", value: "consumeValue", align: "left" },
                { text: "Remaining Value", value: "availableValue", align: "left" },
                { text: "Remaining Pieces", value: "availablePieces", align: "left" }
            ],
      // categoryOid: "",
      officeList:[],
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
    getExemptionArticlesView(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.master_generalprofile_v1_exemptionarticles_get_by_oid, body);
            lumos_client.onPost(url.master_generalprofile_v1_exemptionarticles_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity1 = [];
                this.entity2 = [];
                this.entity2 = result['data']['body']['data'];
                this.oidModifier(this.entity2);
                this.quarteroid = this.entity2[0]['quarterOid'];
                
                if(this.userType==='Passbook'){
                  for(let i=0; i<this.entity2.length; i++){
                    let quarterOid = this.entity2[i]['quarterOid'];
                    let allocateValue = this.entity2[i]['allocateValue'];
                    let consumeValue = this.entity2[i]['consumeValue'];
                    let availableValue =  parseFloat(allocateValue) - parseFloat(consumeValue);
                    this.entity1.push({"quarterOid": quarterOid, "allocateValue": allocateValue, "consumeValue":consumeValue, "availableValue": availableValue  })
                  }                     
                } else {
                  for(let i=0; i<this.entity2.length; i++){
                    let categoryOid = this.entity2[i]['categoryOid'];                    
                    let allocateValue = this.entity2[i]['allocateValue'];                    
                    let allocatePieces = this.entity2[i]['allocatePieces'];                    
                    let consumePieces = this.entity2[i]['consumePieces'];                    
                    let consumeValue = this.entity2[i]['consumeValue'];                    
                    let availablePieces = parseInt(allocatePieces)  - parseInt(consumePieces);                    
                    let availableValue = parseFloat(allocateValue) - parseFloat(consumeValue);
                    
                    this.entity1.push({"categoryOid": categoryOid, "allocateValue": allocateValue, "consumeValue":consumeValue, "availableValue": availableValue, "allocatePieces": allocatePieces, 
                    "consumePieces": consumePieces, "availablePieces": availablePieces, "availableValue": availableValue })
                  }
                  // this.entity1 =this.entity2;
                }
        }).catch(error =>{
        });
    },
    getShow(slno, passportNo) {
      this.searchDataList = false;
      this.progressBar.loading = true;
      this.progressBar.show = true;
      let body = { slNo: slno, passportNo:passportNo };
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
          this.userType = this.entity.userType;
          let validupto = "";
          if (this.entity.validupto) {
            validupto = new Date(this.entity.validupto);
          }
          let issueddate = "";
          if (this.entity.issueddate) {
            issueddate = new Date(this.entity.issueddate);
          }
          
          this.getExemptionArticlesView(this.entity.oid)
          if(this.userType === "Passbook"){
            this.headers = [
                { text: "Month", value: "", align: "left" },
                { text: "Allocate Value", value: "allocateValue", align: "left" },
                { text: "Consume Value", value: "consumeValue", align: "left" },
                { text: "Remaining Value", value: "availableValue", align: "left" },
                // { text: "Remaining Pieces", value: "availablePieces", align: "left" }
            ]
          } else {
            this.headers= [
                { text: "Category", value: "categoryOid", align: "left" },
                { text: "Allocate Pieces", value: "allocatePieces", align: "left" },
                { text: " Allocate Value", value: "allocateValue", align: "left" },
                { text: "Consume Pieces", value: "consumePieces", align: "left" },
                { text: "Consume Value", value: "consumeValue", align: "left" },
                { text: " Remaining Value", value: "availableValue", align: "left" },
                { text: "Remaining Pieces", value: "availablePieces", align: "left" }
            ]
          }
          this.color = "success";
          setTimeout(
            () =>
              (this.entity = {
                slno: this.entity.slno,
                passportNo: this.entity.passportNo,
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
                relevantWarehouseInvoiceDate: this.entity.relevantWarehouseInvoiceDate,
                documents: [
                  {
                    categoryOid: "",
                    productOid: "",
                    billOfEntryNo: "",
                    unitValue: "",
                    unitSellValue: "",
                    productList: [],
                    billOfEntryList: [],
                    totalQuantity: "",
                    totalValue: "",
                  },
                ],
              }),
            1000
          );
          this.entity.relevantWarehouseInvoiceDate = new Date().toLocaleString();
          // console.log(new Date().toLocaleString());
          this.getCategory();
          this.oidModifier(this.entity);
          
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
        billOfEntryNo: "",
        unitValue: "",
        unitSellValue: "",
        productList: [],
        billOfEntryList: [],
        totalQuantity: "",
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
        this.entity.documents[index].totalValue = value.toFixed(2)  
      } 
    },

    calculateTotalSalesPrice(){
      let quantity = 0;
      let price =0;
      for(let i=0; i<this.entity.documents.length; i++){
        if(this.entity.documents[i].totalValue.length>0){
          price += (+this.entity.documents[i].totalValue)
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
      return;
  
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
    // ledgerinfoSaveUpdate() {
    //   this.validateQuantity()
    //   if(this.validateQuantityMsg) { 
    //     return
    //   }

    //   this.$validator.validateAll().then((result) => {
    //     if (!result) {
    //       return;
    //     }
        
    //     this.progressBar.loading = true;
    //     this.progressBar.show = true;
    //     let http_url = "";
    //     if (this.$route.params.id) {
    //       http_url = url.operation_ledgerinfo_v1_update;
    //     } else {
    //       http_url = url.operation_ledgerinfo_v1_save;
    //     }
    //     let body = this.modifier(this.entity);
        
    //     let req = constant.getRequest(http_url, body);
    //     lumos_client.onPost(http_url, req).then((result) => {
    //         this.progressBar.loading = false;
    //         this.progressBar.show = false;
    //         let res = result.data.header.responseCode;
    //         if(res == "201"){
    //           this.entity.otpOid = result.data.body.data;
    //           this.viewOTPModel=true
    //           const button = document.getElementById("resend")
    //           button.disabled = true
    //            this.countdownTime =300;
    //           this.startCountDown();
    //           return;

    //         } else if(res != "200") {
    //           this.snackbar = true;
    //           this.color = "red";
    //           this.messageText = result.data.body.data;
    //           return;
    //         }
            
    //         this.color = "success";
    //         if (this.$route.params.id) {
    //           this.messageText = "Sell Updated Successfully";
    //           setTimeout(() => this.$router.push({ name: "LedgerInfo" }), 3000);
    //         } else {
    //           this.messageText = "Sell Saved Successfully";
    //           this.entity.billOfEntryNo = "";
    //           this.entity.billOfEntryOfficeId = "";
    //           this.entity.billOfEntryDate = "";
    //           this.entity.houseKeeper = "";
    //           this.entity.salesPerson = "";
    //           this.entity.salesDate = "";
    //           this.entity.relevantWarehouseInvoiceNo = "";
    //           // this.entity.relevantWarehouseInvoiceDate = "";
    //           this.entity.documents = [
    //             {
    //               categoryOid: "",
    //               productOid: "",
    //               billOfEntryNo: "",
    //               unitValue: "",
    //               productList: [],
    //               billOfEntryList: [],
    //               totalQuantity: "",
    //               totalValue: "",
    //             },
    //           ];
    //         }
    //         this.getShow(this.entity.slno) 
    //       })
    //       .catch((error) => {
    //         this.$log.error(error);
    //       });
    //   });
    // },

    submitOtp() {
      this.validateQuantity()
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
            if(res == "202"){
              this.viewOTPModel=true
              this.entity.otp = ""
              this.color = "red";
              this.messageText = result.data.body.data;
              return;

            } 
            // this.snackbar = true;
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
              // this.entity.relevantWarehouseInvoiceDate = "";
              this.entity.documents = [
                {
                  categoryOid: "",
                  productOid: "",
                  billOfEntryNo: "",
                  unitValue: "",
                  unitSellValue: "",
                  productList: [],
                  billOfEntryList: [],
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


    resendOtp() {
        
        this.viewOTPModel =false;

        this.progressBar.loading = true;
        this.progressBar.show = true;
        let http_url = "";
        if (this.$route.params.id) {
          http_url = url.operation_ledgerinfo_v1_update;
        } else {
          http_url = url.operation_ledgerinfo_v1_save;
        }
        // this.entity.resend = "resend";
       
        this.entity.otp = "resend";
       
        let body = this.modifier(this.entity);
       
        let req = constant.getRequest(http_url, body);
        lumos_client.onPost(http_url, req).then((result) => {
            this.progressBar.loading = false;
            this.progressBar.show = false;
            let res = result.data.header.responseCode;
            
            this.snackbar = true;
            if(res == "203"){
              this.viewOTPModel=true
              this.entity.otp = ""
              this.entity.resend = ""
              this.color = "green";          
              this.messageText = result.data.body.data;
              const resendButton = document.getElementById("resend")
              resendButton.disabled = true
              const submitButton = document.getElementById("submit")
              submitButton.disabled = false
              this.countdownTime =300;
              this.startCountDown();
              return;

            } 
            this.snackbar = true;
            if(res != "203") {
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
              // this.entity.relevantWarehouseInvoiceDate = "";
              this.entity.documents = [
                {
                  categoryOid: "",
                  productOid: "",
                  billOfEntryNo: "",
                  unitValue: "",
                  unitSellValue: "",
                  productList: [],
                  billOfEntryList: [],
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
            // this.salesConfirmationModel = false
            if(res == "202"){
              this.viewOTPModel=true
              this.entity.otp = ""
              this.color = "red";
              this.messageText = result.data.body.data;
              return;

            } 
            // this.snackbar = true;
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
              // this.entity.relevantWarehouseInvoiceDate = "";
              this.entity.documents = [
                {
                  categoryOid: "",
                  productOid: "",
                  billOfEntryNo: "",
                  unitValue: "",
                  unitSellValue: "",
                  productList: [],
                  billOfEntryList: [],
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
      if(this.entity.dateOfArrival){
        //  obj.relevantWarehouseInvoiceDate = obj.relevantWarehouseInvoiceDate.toISOString();
        obj.dateOfArrival = obj.dateOfArrival.toISOString();
      }
      if(this.entity.visaValidUpto){
        //  obj.relevantWarehouseInvoiceDate = obj.relevantWarehouseInvoiceDate.toISOString();
        obj.visaValidUpto = obj.visaValidUpto.toISOString();
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


