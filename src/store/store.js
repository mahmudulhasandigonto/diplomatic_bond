import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loginId:localStorage.getItem("lumos_loginId"),
        userName:localStorage.getItem("lumos_username"),
        email: '',
        roleOid: localStorage.getItem("lumos_roleOid"),
        roleId: localStorage.getItem("lumos_roleId"),
        dataJson:JSON.parse(localStorage.getItem("lumos_dataJson")),
        rowsPerPage: 2,
        page: {}
    }
});