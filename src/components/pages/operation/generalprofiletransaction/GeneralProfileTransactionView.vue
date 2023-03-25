<template>
<div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <div class="container-fluid">
        <div class="row">
            <div class="page">
                <div class="">
                    <div class="basic-info">
                        <h4>General Profile Transaction</h4>
                        <hr>
                        <h5> Basic Information</h5>
                        <div class="row">
                            <div class="col-md-6 col-12 ">
                                <p><b>Organization Name :</b> {{entity.orgName}}  </p>
                                <p><b>Customer Name :</b> {{entity.customerName}}  </p>
                                <p><b>Site Name : </b> {{entity.siteName}}  </p>
                                <p v-if="entity.vendorName" ><b>Vendor Name :</b> {{entity.vendorName}}  </p>
                                <p v-else ><b>Vendor Name :</b> --  </p>

                                <p v-if="entity.ownerName" ><b>Owner Name :</b> {{entity.ownerName}}  </p>
                                <p v-else ><b>Owner Name :</b> --  </p>



                                <p v-if="entity.partNo" ><b>Part Number :</b> {{entity.partNo}}  </p>
                                <p v-else ><b>Part Number :</b> --  </p>

                                <p v-if="entity.csiNumber" ><b>CSI Number :</b> {{entity.csiNumber}}  </p>
                                <p v-else ><b>CSI Number :</b> --  </p>

                                <p v-if="entity.subCategoryName" ><b>Subcategory Name :</b> {{entity.subCategoryName}}  </p>
                                <p v-else ><b>Subcategory Name :</b> --  </p>
                                <p> <b> Created By : </b> {{entity.createdby}}</p>
                                <p v-if ="entity.updatedby"> <b> Last Updated By : </b> {{entity.updatedby}}</p>
                                <p v-else> <b> Last Updated By : </b> --</p>


                            </div>
                            <div class="col-md-6 col-12 ">
                                <p><b>Asset Name :</b> {{entity.assetName}}  </p>
                                <p v-if="entity.productSerial"><b>Product Serial :</b> {{entity.productSerial}}  </p>
                                <p v-else><b>Product Serial :</b> --  </p>

                                <p v-if="entity.assetID"><b>Asset ID :</b> {{entity.assetID}}  </p>
                                <p v-else><b>Asset ID :</b> -- </p>

                                <p v-if="entity.purchaseDate" ><b>Asset Age :</b> {{assetAge}}  </p>
                                <p v-else ><b>Asset Age :</b> --  </p>

                                <p v-if="entity.warrantyMonth" ><b>Warranty Month :</b> {{entity.warrantyMonth}}  </p>
                                <p v-else ><b>Warranty Month :</b> --  </p>

                                <p v-if="entity.purchaseCost" ><b>Purchase Cost :</b> {{entity.purchaseCost}}  </p>
                                <p v-else ><b>Purchase Cost :</b> --  </p>

                                <p v-if="entity.ownerUnit" ><b>Onwer Unit :</b> {{entity.ownerUnit}} </p>
                                <p v-else ><b>Onwer Unit :</b> --  </p>

                                <p><b>Asset Status :</b> {{entity.status}}  </p>
                                <p><b>Asset Condition :</b> {{entity.condition}}  </p>

                                <p v-if="entity.remarks" ><b>Remarks:</b> {{entity.remarks}}  </p>
                                <p v-else ><b>Remarks :</b> --  </p>

                            </div>
                        </div>
                    </div>                    

                    <div class="basic-info2">
                        <h5> Articles </h5>                        
                    </div>
                    <div class="grid-info2">
                        <div class="row">
                            <div class="col-md-12 col-12">
                                <h6> <b><i>Basic Specification</i></b></h6>
                                <table class="table table-bordered table-sm ">
                                <tbody >
                                <tr v-for=" (basic, index) in entity.specificationJson.basic" :key=index >
                                <td  style="width: 50%">{{basic.label}}</td>
                                <td  style="width: 50%">{{basic.value}}</td>
                                </tr>
                                </tbody>
                                </table>

                            </div>                            
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
    <v-app>
        <v-flex>
            <div>
                <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'"  :timeout="timeout" :multi-line="mode === 'multi-line'" :right="x === 'right'"  :top="y === 'top'" :vertical="mode === 'vertical'" :color="color">
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
import moment,{ months } from "moment";

export default {
    data(){
        return{
            entity:{
                "oid":'',                
                "documents":[]
            },
            progressBar:{
                loading: false,
                show: false
            },
            assetAge:'',
            size:"50px",
            snackbar: false,
            y: "bottom",
            x: "right",
            mode: "",
            color: "",
            timeout: 0,
            messageText: "",
        }
    },
    created(){
        this.getGeneralProfileTransaction(this.$route.params.id);
    },
    methods:{
        getGeneralProfileTransaction(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.operation_generalprofiletransaction_v1_get_by_oid, body);
            lumos_client.onPost(url.operation_generalprofiletransaction_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier(this.entity);
                //console.log(this.oidModifier(this.entity))
            }).catch(error =>{
            });
        },
        oidModifier(entity){
            if(this.entity.documents){
                this.entity.documents = JSON.parse(this.entity.documents);
            }      
            if(this.entity.userDate){
                this.entity.userDate = new Date(this.entity.userDate);
            }
            if(this.entity.nbrDate){
                this.entity.nbrDate = new Date(this.entity.nbrDate);
            }
            if(this.entity.fmDate){
                this.entity.fmDate = new Date(this.entity.fmDate);
            }
            if(this.entity.bondDate){
                this.entity.bondDate = new Date(this.entity.bondDate);
            }
        }
        
        
        
    }
}
</script>

<style scoped>

@page {
  size: A4;
  margin: 0;
}

@media print {
* {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
}

.page {
    margin: 0;
    border: initial;
    border-radius: initial;
    width: initial;
    min-height: initial;
    box-shadow: initial;
    background: initial;
    page-break-after: always;
    font-size: 10px;
  }
  .nopadding {
   padding: 0 !important;
   margin: 0 !important;
}

 .page h4{
    text-align: center;
}

.page h5{
    background:gray;
    color:white;
    padding:2px 5px;
    border-radius:2px;
}
}
.page {
	width: 210mm;
	min-height: 297mm;
	padding: 1cm;
	margin: .3cm auto;
	border: 1px #D3D3D3 solid;
	border-radius: 2px;
	background: white;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	font-size: 12px;
}

.page h4 {
	text-align: center;
}

.page h5 {
	background: gray;
	color: white;
	padding: 2px 5px;
	border-radius: 2px;
}
</style>

