<template>
  <div class="asset-form">
    <div class="loading" v-if="progressBar.loading"></div>
        <router-link :to="{ name: 'ProductDestroy' }"  tag="span" class="button-tooltip pt-1 pl-3 float-left">
                <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                <span class="button-tooltiptext">Back</span>
            </router-link>
        <br>
        <div class="container-fluid">
        <form class="form-group" @submit.prevent="purchaseDestroySave()">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="basic-info">
                  <h5>Product Destroy Information</h5>
                  <hr/>
                </div>
                <div class="row">
                    <div class="col-4">
                      <div class="mb-3">
                          <label class="required"> <b>Warehouse Name</b></label>
                          <!-- <input class="form-control" placeholder="Warehouse Oid" v-model="entity.warehouseOid"  name="Warehouse Oid" v-validate="'required'" autocomplete="off">  -->
                          <model-list-select class="form-control mb-1" :list="warehouseinfoList" v-model="entity.warehouseOid" @input="getCategory(entity)" option-value="oid" optionText="warehouseName" placeholder="Select Warehouse Name" v-validate="'required'" name="Warehouse Name"/>
                          <small v-show="errors.has('Warehouse Name')" class="help is-danger"><i v-show="errors.has('Warehouse Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('Warehouse Name') }} </small>
                      </div>
                    </div>
                    <div class="col-12">
                    <!-- <b>Articles</b> -->
                    <span class="btn btn-bg-default button-tooltip mr-3" @click="addDocument(entity.documents)">
                      <b>Articles</b> &nbsp;
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      <span class="button-tooltiptext">Add</span>
                    </span>
                    <div class="table-responsive no-padding">
                      <table class="table table-bordered table-sm">
                        <tr class="table table-bordered text-center">
                          <th style="">Name of Articles</th>
                          <th style="">Products</th>
                          <th style="">Bill Of Entry No.</th>
                          <!-- <th style="">Unit Quantity</th> -->
                          <!-- <th style="">Unit Price (US Dollar)</th> -->
                          <th style="">Total Pieces</th>
                          <!-- <th style="">Total Price (US Dollar)</th> -->
                          <th style="">Action</th>
                        </tr>
                        <tr v-for="(document, index) in entity.documents" :key="index" class="" >
                          <td style="width: 12%">
                            <model-list-select :list="categoryList" v-model="document.categoryOid" @input="getProductList(document,entity)" v-validate="'required'" option-value="oid" optionText="name" name="Article List" />
                            <small v-show="errors.has('Article List')" class="help is-danger"><i v-show="errors.has('Article List')" class="fa fa-exclamation-circle"></i>{{ errors.first('Article List') }} </small>
                          </td>
                          <td style="width: 22%">
                            <model-list-select :list="document.productList" v-model="document.productOid" @input="getBillOfEntryList(document)" v-validate="'required'" option-value="oid" optionText="name" name="Product list"/>
                            <small v-show="errors.has('Product list')" class="help is-danger"><i v-show="errors.has('Product list')" class="fa fa-exclamation-circle"></i>{{ errors.first('Product list') }} </small>
                          </td>
                          <td style="width: 18%">
                            <model-list-select :list="document.billOfEntryList" v-model="document.billOfEntryNo" v-validate="'required'" option-value="billOfEntryNo" optionText="name" name="Bill of Entry list"/>
                            <small v-show="errors.has('Bill of Entry list')" class="help is-danger"><i v-show="errors.has('Bill of Entry list')" class="fa fa-exclamation-circle"></i>{{ errors.first('Bill of Entry list') }} </small>
       
                          </td>  
                          <!-- <td style="width: 10%">
                            <input type="text" placeholder="Enter Unit Value" class="form-control" v-model="document.unitValue" v-validate="'required'" @keyup="calculatePrice(index)" name="Unit Value"/>
                            <small v-show="errors.has('Unit Value')" class="help is-danger"><i v-show="errors.has('Unit Value')" class="fa fa-exclamation-circle"></i>{{ errors.first('Unit Value') }} </small>
                          </td> -->
                          <td style="width: 10%">
                            <input type="text"  placeholder="Enter Total Pices" class="form-control" v-model="document.totalQuantity" v-validate="'required'" @keyup="calculatePrice(index)" name="Total Pieces"/>
                            <small v-show="errors.has('Total Pieces')" class="help is-danger"><i v-show="errors.has('Total Pieces')" class="fa fa-exclamation-circle"></i>{{ errors.first('Total Pieces') }} </small>
                          </td>
                          <!-- <td style="width: 12%">
                            <input  type="text" placeholder="Enter Total Value" class="form-control" v-model="document.totalValue" v-validate="'required'" name="Total Value"/>
                            <small v-show="errors.has('Total Value')" class="help is-danger"><i v-show="errors.has('Total Value')" class="fa fa-exclamation-circle"></i>{{ errors.first('Total Value') }} </small>
                          </td> -->
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
                      <div class="text-red mb-2" v-if="validateQuantityMsg">{{validateQuantityMsg}}</div>
                      <button :disabled="sellButtonDisable" class="btn btn-success ripple mr-3" @click="dialog = true" @submit.prevent="purchaseDestroySave()">
                        {{ buttonText }}
                      </button>
                      <router-link tag="button" class="btn btn-danger button-width ripple" :to="{ name: 'ProductDestroy' }">
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
      <v-dialog v-model="viewDetailsModel" max-width="700">
            <v-card>
              <v-card-text v-if="this.userType=='Exemption'">
                 <h5> Articles Details | {{this.quarteroid}} </h5>
                        <v-data-table :headers="headers" :items="entity1"  mobile-breakpoint="0" hide-actions>
                          <template slot="items" slot-scope="props" >
                            <td class="text-xs-left w-5">{{ props.item.categoryOid }}</td>  
                            <td  class="text-xs-left w-5">{{ props.item.allocatePieces }}</td>
                            <td class="text-xs-left w-5">{{ props.item.allocateValue }}</td>
                            <td class="text-xs-left w-5">{{ props.item.consumePieces }}</td>    
                            <td class="text-xs-left w-5">{{ props.item.consumeValue }}</td>
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
        documents: [
          {
            categoryOid: "",
            productOid: "",
            billOfEntryNo: "",
            // unitQuantity: "",            
            productList: [{oid:"", name:""}],
            billOfEntryList: [{billOfEntryNo:"", name:""}],
            unitValue: "",
            totalQuantity: "",
            totalValue: "",
          },
        ],
      },
      warehouseinfoList: [],
      entity1:[],
      entity2:[],
      headers: [
                { text: "Category", value: "categoryOid", align: "left" },
                // { text: "Allocated Qty", value: "allocateQuantity", align: "left" },
                { text: "Allocate Pieces", value: "allocatePieces", align: "left" },
                { text: " Allocate Value", value: "allocateValue", align: "left" },
                // { text: "Consumed Quantity", value: "consumeQuantity", align: "left" },
                { text: "Consume Pieces", value: "consumePieces", align: "left" },
                { text: "Consume Value", value: "consumeValue", align: "left" }
            ],
      // categoryOid: "",
      officeList:[],
      quarteroid: "",
      userType: "", 
      validateQuantityMsg: "",
      addButtonDisable: false,
      dialog: false,
      viewDetailsModel: false,
      searchDataList:false,
      // headers: [{ text: "Name", value: "nameOfHolder", align: "left" }],
      contactList: [],
      profileList: [],
      productList:[],
      exemptionCategoryList:[],
      productDetailsList:[],
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
      this.getWarehouseList(); 
      this.getOfficeList();
      if (this.$route.params.id) {
        this.buttonText = "Update";
        this.getLedgerInfo(this.$route.params.id);
        // this.addButtonDisable = true;
      } else {
        this.buttonText = "Destroy";
      }
    },
    onKeydown (event) {
    	let char = String.fromCharCode(event.keyCode)
    	if (!/[0-9]/.test(char)) {
      	    event.preventDefault()
            }
        },
    getCategory(entity) {
      let warehouseOid = entity.warehouseOid;
      let body = {warehouseOid};
      let req = constant.getRequest(url.operation_boedestroy_v1_category_get_list, body);
      lumos_client
        .onPost(url.operation_boedestroy_v1_category_get_list, req)
        .then((result) => {
          this.categoryList = result["data"]["body"]["data"];
         // this.categoryList = result['data']['body']['data'].filter((x)=>{if(x.oid === warehouseOid){return x}})                
         // this.entity.categoryList = this.warehouseinfoList[0].oid; 
         
        })
        .catch((error) => {});
    },
    
    getProductList(event,entity){
         let body = {categoryOid: event.categoryOid, warehouseOid: entity.warehouseOid};
         let req = constant.getRequest(url.operation_boedestroy_v1_product_get_list, body);
         lumos_client.onPost(url.operation_boedestroy_v1_product_get_list, req)
        .then(result => {
            event.productList = result['data']['body']['data'];
            this.productList = event.productList;
        }).catch(error => {
        });
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
          //console.log(document);
      }
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
                    this.entity1.push({"quarterOid": quarterOid, "allocateValue": allocateValue, "consumeValue":consumeValue })
                  }
                  // console.log(this.entity1);                      
                } else {
                  this.entity1 =this.entity2;
                  // console.log(this.entity1);
                }
        }).catch(error =>{
        });
    },
    
    getWarehouseList(){
            let body = {};
            let req = constant.getRequest(url.master_warehouseinfo_v1_get_list, body);
            lumos_client.onPost(url.master_warehouseinfo_v1_get_list, req)
            .then(result => {
                this.warehouseinfoList = result['data']['body']['data'];           
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
        productOid: "",
        billOfEntryNo: "",
        unitValue: "",
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
      // console.log(this.entity.documents[index]);
    },
    validateQuantity(){       
      this.validateQuantityMsg = ""
      let result = this.entity.documents.reduce(function (r, a) {
        r[a.billOfEntryNo] = r[a.billOfEntryNo] || [];
        r[a.billOfEntryNo].push(a);
        return r;
      }, Object.create(null));
      let totalPic
      console.log(result)
      for (let key in result) {
        totalPic = 0
        for(let i=0; i<result[key].length;i++){
            for(let j=0; j<result[key][0].billOfEntryList.length; j++ ){
              if(result[key][0].billOfEntryList[j].billOfEntryNo === key && result[key][0].billOfEntryList[j].billOfEntryNo === result[key][0].billOfEntryNo ){
               
              totalPic = totalPic + (+result[key][i].totalQuantity)
               if(+result[key][0].billOfEntryList[j].purchaseDetailsTotalQuantity < totalPic ){
                  let prod = result[key][i].productList.filter((x)=>{if(x.oid == result[key][i].productOid){return x}})
                  this.validateQuantityMsg = this.validateQuantityMsg + " Limit exceeds for Product "+prod[0].name+ "("+result[key][0].billOfEntryList[j].billOfEntryNo+")"+"."
                }

              }
            }
        }
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
    purchaseDestroySave() {
      this.validateQuantity()
      if(this.validateQuantityMsg) { 
        return
      }
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }
        
        this.progressBar.loading = true;
        this.progressBar.show = true;
        let http_url = "";
        if (this.$route.params.id) {
          //http_url = url.operation_ledgerinfo_v1_update;
        } else {
          http_url = url.operation_boedestroy_v1_save;
        }
        let body = this.modifier(this.entity);
        //return;
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
                  billOfEntryNo: "",
                  unitValue: "",
                  productList: [],
                  billOfEntryList: [],
                  totalQuantity: "",
                  totalValue: "",
                },
              ];
            }
            //this.getShow(this.entity.slno) 
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
           delete exmpCategory[i].categoryOid;
           //delete exmpCategory[i].billOfEntryNo;         
           delete exmpCategory[i].productList;
           delete exmpCategory[i].unitValue;  
           //exmpCategory[i].totalValue = JSON.parse(exmpCategory[i].totalValue);
           exmpCategory[i].totalQuantity = JSON.parse(exmpCategory[i].totalQuantity);
      }
      //console.log(exmpCategory);
      var helper = {};
      var result = exmpCategory.reduce(function(r, o) {
      var key = o.productOid + '-' + o.billOfEntryNo;        
        if(!helper[key]) {
          helper[key] = Object.assign({}, o); // create a copy of o
          r.push(helper[key]);
        } else {
          //helper[key].totalValue += o.totalValue;
          helper[key].totalQuantity += o.totalQuantity;
        }
          return r;
        }, []);    
      this.entity.productDetailsList = result;
      obj.productDetailsList = JSON.stringify(this.entity.productDetailsList);  

      ///////////   test   ///////////
      //var obj = _.clone(entity);
      //obj.documents = JSON.stringify(entity.documents);
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
    filterSl(e){
      // console.log(e.target.value)
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
  padding: 0 60px 0 20px;
  font-size: 18px;
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
</style>


