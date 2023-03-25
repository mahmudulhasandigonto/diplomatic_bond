<template>
<span>
<h2>
    Timeline of DC State
    <p class="float-right">
        <button type="button" @click="swipeLeft" class="btn btn-info mr-2 ripple btn-mat">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <button type="button" @click="swipeRight" class="btn btn-info ripple btn-mat">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
    </p>
</h2>
<div class="ncont" ref="content">
    <ul class="timerline">
        <li class="li text-center" :class="inactiveClass(item.status)" v-for="(item, index) in timeLineData" :key="index" :id="'item-'+index" >
            <div class="timestamp" :data-after-content="item.sortOrderOfDCState">
                <span class="label">Start Date: </span>
                <span class="date">{{item.startDate}}</span>
                <span class="label">End Date : </span>
                <span class="date">{{item.endDate}}</span>
            </div>
            <div class="status">
                <h6>{{item.sortorderName}}</h6>
            </div>
            <div class="edit" @click="dialogUpdate='true', getDCTrackingByOid(item.oid)"><i class="fa fa-pencil fa-lg"></i></div>
        </li>
    </ul>
</div>
<v-dialog v-model="dialogUpdate" max-width="500">
    <v-card>
        <v-card-text class="text-center">
            <h4>Edit DCTracking State</h4>
            <v-form class="mt-4 dates">
                <div class="row mb-2">
                    <label class="col-5"><b>Start Date</b></label>
                    <datepicker placeholder="Start Date"
                        :bootstrap-styling = "true"
                        calendar-class="filter-date"
                        :clear-button="true"
                        clear-button-icon="fa fa-times-circle"
                        v-model="updateEntity.startDate"
                        style="width:58%">
                    </datepicker>
                </div>
                <div class="row mb-2">
                    <label class="col-5"><b>End Date</b></label>
                    <datepicker placeholder="End Date"
                        :bootstrap-styling = "true"
                        calendar-class="filter-date"
                        :clear-button="true"
                        clear-button-icon="fa fa-times-circle"
                        v-model="updateEntity.endDate"
                        style="width:58%">
                    </datepicker>
                </div>
                <div class="row mb-2">
                    <label class="col-5"><b>Status </b></label>
                    <model-list-select class="form-control col-7" :list="statusList" v-model="updateEntity.status" option-value="name" optionText="name" placeholder="Select Status" name="Status"/>
                </div>
                <div class="row mb-2">
                    <label class="col-5"><b>Remarks </b></label>
                    <input  class="form-control col-7" placeholder="Remarks" v-model="updateEntity.remarks"  name="Remarks">
                </div>
            </v-form>
            <v-btn color="success" flat="flat" @click="dcTrackingUpdate">Update</v-btn>
            <v-btn color="red" flat="flat" @click="dialogUpdate=false, clearUpdateEntity()">Cancel</v-btn>
        </v-card-text>
    </v-card>
</v-dialog>
</span>
</template>
<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import { ModelListSelect} from 'vue-search-select';
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker";
import moment, {months} from "moment";
import * as _ from 'underscore';

export default {
    name: 'HorizontalTimeline',
    components: {
            ModelListSelect, Datepicker
        },
    props: {
        timeLineData: {
            type: Array,
            required: true,
            note: 'Timeline Steps',
        },
    },    
    data(){
        return {
            statusList:[
                { name : "Active" },
                { name : "Inactive" }
            ],
            updateEntity:{},
            dialogUpdate: false,
        }
    },
    methods: {
        getDCTrackingByOid(oid){
            let body = {oid: oid };
            let req = constant.getRequest(url.operation_dctracking_v1_get_by_oid, body);
            lumos_client.onPost(url.operation_dctracking_v1_get_by_oid, req)
            .then(result => {
                this.updateEntity = result['data']['body'];
            }).catch(error => {
            });
        },
        dcTrackingUpdate(){
            this.dialogUpdate = false;
            let http_url = url.operation_dctracking_v1_update;
            let obj = _.clone(this.updateEntity);
            if (this.updateEntity.startDate) obj.startDate = new Date(obj.startDate);
            if (this.updateEntity.endDate) obj.endDate = new Date(obj.endDate);
            let body = {
                oid: obj.oid,
                startDate: obj.startDate,
                endDate: obj.endDate,
                remarks: obj.remarks,
                status: obj.status
            }
            let req = constant.getRequest(http_url, body);
            lumos_client.onPost(http_url, req)
            .then(result => {
                let res = result.data.header.responseCode;
                this.snackbar = true;
                if (res != "200"){
                    this.emmited = {
                        color: 'red',
                        messageText: result.data.body.data
                    }
                } else {
                    this.emmited = {
                        color: 'success',
                        messageText: 'DC Stage Updated Successfully'
                    }
                } 
                this.color = "success";
                this.messageText = "DC State Updated Successfully";
                this.$emit("inputData", this.emmited);
                this.clearUpdateEntity();
            }).catch(error => {
                this.$log.error(error)
            })
        },
        formattedDate(){
            this.timeLineData.forEach((item)=>{
                item.startDate = item.startDate ? moment(new Date(item.startDate)).format("DD MMM YYYY") : "--/--/----"
                item.endDate = item.endDate ? moment(new Date(item.endDate)).format("DD MMM YYYY") : "--/--/----"
            });
        },
        swipeLeft() {
            const element = this.$refs.content;
            element.scrollLeft -= 200;
        },
        swipeRight() {
            const element = this.$refs.content;
            element.scrollLeft += 200;
        },
        clearUpdateEntity(){
            delete this.updateEntity.startDate;
            delete this.updateEntity.endDate;
            delete this.updateEntity.status;
            delete this.updateEntity.remarks;
        },
        inactiveClass(status){ 
            if(status=='Inactive')  
            return 'inactive' 
        }
    },
    watch: {
        timeLineData() {
            this.formattedDate();
        }
    },
  };
</script>
<style scoped>
.btn-mat {
    background-color: #3f51b5;
    color: #fff;
    border: none;
    display: inline-block;
    margin: 0px;
    padding: 0px;
    min-width: 40px;
}
.ncont {
    width: 100%;
    display: flex;
    color: #758D96;
    overflow-x: scroll;
    overflow-y: hidden;
    font-family: "Titillium Web", sans serif;
    scroll-behavior: smooth;
}
.timerline {
    list-style-type: none;
    display: flex;
}
.timerline .li {
    transition: all 200ms ease-in;
    position: relative;
    display: inline-block;
    top: 10px;
    width: 200px;
    height: 200px;
    border-radius: 15px;
}
.timerline .li:hover {
    box-shadow: 0 0px 16px 0 rgba(0,0,0,0.2), 0 0px 20px 0 rgba(0,0,0,0.19);
}
.timerline .li:hover .edit {
	display: block;
}
.edit {
	padding-top: 7px;
	padding-right: 7px;
	position: absolute;
	right: 0;
	top: 0;
	display: none;
    cursor: pointer;
}
.timerline .li.inactive{
    background:lavender;
    box-shadow: none;
}
.timestamp {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.timestamp .label{
    color: grey;
}
.timestamp .date{
    color: black;
}
.timerline .li .timestamp:after {
    font-weight: bold;
    margin: 0 auto;
    position: relative;
    bottom: -20px;
    content: attr(data-after-content);
    display: block;
    border-radius: 15px;
    height: 30px;
    width: 30px;
    box-sizing: border-box;
    box-shadow: 0 0 5px #046291;
    background: #fff;
    border: 5px solid #0684c2;
    transition: all 0.25s;
    z-index: 2;
}
.timerline .li.inactive .timestamp:after{
    border: 5px solid #758D96;
}
.timerline .li.inactive .status {
    border-top: 10px solid #758D96;
}
.timerline .li .status {
    color: rgb(60, 67, 105);
    padding: 15px 5px;
    display: flex;
    justify-content: center;
    border-top: 10px solid #0684c2;
    position: relative;
    transition: all 200ms ease-in;
}
</style>