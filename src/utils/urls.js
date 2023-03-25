function getHostName() {
	return window.location.hostname;
}

export const url = {

	//Development
	baseUrl: 'http://' + getHostName() + ':9010/lumos/',

	//Deployment
	//For HTTP
	//  baseUrl: 'http://'+ getHostName() +':8080/app/lumos/',
	//For HTTPS
	// baseUrl: 'https://'+ getHostName() +'/app/lumos/',


	authentication_user_v1_login: "authentication/user/v1/login",
	authentication_user_v1_logout: "authentication/user/v1/logout",
	authentication_user_v1_changePassword: "authentication/user/v1/changePassword",
	authentication_user_v1_get_list: "authentication/user/v1/get-list",
	authentication_user_v1_save: "authentication/user/v1/save",
	authentication_user_v1_get_by_oid: "authentication/user/v1/get-by-oid",
	authentication_user_v1_update: "authentication/user/v1/update",
	authentication_user_v1_download: "authentication/user/v1/download/",
	authentication_user_v1_forgetpassword: "authentication/user/v1/forgetPassword",

	authorization_user_v1_get_roleList: "authorization/user/v1/get-roleList",
	authorization_user_v1_role_save: "authorization/user/v1/roleSave",
	authorization_user_v1_role_update: "authorization/user/v1/roleUpdate",
	authorization_user_v1_role_get_by_oid: "authorization/user/v1/getRole-by-oid",

	get_asset_dashbord: "asset/asset/v1/get-asset-dashbord",

	master_dashboard_v1_get_dashboard_asset_status_count: "master/dashboard/v1/asset-status-count",
	master_dashboard_v1_get_dashboard_card_count: "master/dashboard/v1/card-count",
	master_dashboard_v1_get_warehouse_limit_by_oid: "master/dashboard/v1/get-warehouse-limit-by-oid",

	
	// Email url start

	master_email_v1_send_email: "master/email/v1/send-email",
	master_email_v1_get_list: "master/email/v1/get-list",
	master_email_v1_save: "master/email/v1/save",
	master_email_v1_get_by_oid: "master/email/v1/get-by-oid",
	master_email_v1_update: "master/email/v1/update",
	// Email Urls finish
	master_email_v1_update: "master/email/v1/update",


	//Document Upload/Download
	master_document_v1_upload: "master/documentupload/v1/upload",
	master_document_v1_download: "master/documentupload/v1/download/",
	master_generalprofile_document_v1_download: "master/generalprofile/v1/download/",






	//////////////////////////////////// DIPLOMATIC-BOND //////////////////////////////////////////
	
	//DASHBOARD
	master_dashboard_v1_get_product_count: "master/dashboard/v1/get-product-count",
	master_dashboard_v1_get_parchase_count: "master/dashboard/v1/get-parchase-count",
	master_dashboard_v1_get_sales_count: "master/dashboard/v1/get-sales-count",
	master_dashboard_v1_get_warehouse_list: "master/dashboard/v1/get-warehouse-list",
    master_dashboard_v1_get_generalprofile_count: "master/dashboard/v1/get-generalprofile-count",
	
	


	//MASTER
	master_quarter_v1_get_list: "master/quarter/v1/get-list",
	master_quarter_v1_save: "master/quarter/v1/save",
	master_quarter_v1_get_by_oid: "master/quarter/v1/get-by-oid",
	master_quarter_v1_update: "master/quarter/v1/update",

	master_category_v1_get_list: "master/category/v1/get-list",
	master_category_v1_save: "master/category/v1/save",
	master_category_v1_get_by_oid: "master/category/v1/get-by-oid",
	master_category_v1_update: "master/category/v1/update",
	
	master_product_v1_get_list: "master/product/v1/get-list",
	master_product_v1_save: "master/product/v1/save",
	master_product_v1_get_by_oid: "master/product/v1/get-by-oid",
	master_product_v1_update: "master/product/v1/update",

	master_productdetails_v1_get_list: "master/productdetails/v1/get-list",
	master_productdetails_v1_save: "master/productdetails/v1/save",
	master_productdetails_v1_get_by_oid: "master/productdetails/v1/get-by-oid",
	master_productdetails_v1_update: "master/productdetails/v1/update",

	operation_boedestroy_v1_get_list: "operation/boe-destroy/v1/get-list",
	operation_boedestroy_v1_save: "operation/boe-destroy/v1/save",
	operation_boedestroy_v1_get_by_oid: "operation/boe-destroy/v1/get-by-oid",
	operation_boedestroy_v1_category_get_list: "operation/boe-destroy/v1/get-boedestroy-category-list",
	operation_boedestroy_v1_product_get_list: "operation/boe-destroy/v1/get-boedestroy-product-list",



	master_warehouseinfo_v1_get_list: "master/warehouseinfo/v1/get-list",
	master_warehouseinfo_v1_save: "master/warehouseinfo/v1/save",
	master_warehouseinfo_v1_get_by_oid: "master/warehouseinfo/v1/get-by-oid",
	master_warehouseinfo_v1_update: "master/warehouseinfo/v1/update",

	master_warehouselimit_v1_get_list: "master/warehouselimit/v1/get-list",
	master_warehouselimit_v1_save: "master/warehouselimit/v1/save",
	master_warehouselimit_v1_get_by_oid: "master/warehouselimit/v1/get-by-oid",
	master_warehouselimit_v1_update: "master/warehouselimit/v1/update",
	master_warehouselimit_v1_fiscal_year_list: "master/warehouselimit/v1/fiscal-year-list",

	master_office_v1_get_list: "master/office/v1/get-list",
	master_office_v1_save: "master/office/v1/save",
	master_office_v1_get_by_oid: "master/office/v1/get-by-oid",
	master_office_v1_update: "master/office/v1/update",

	master_basicprofile_v1_get_list: "master/basicprofile/v1/get-list",
	master_basicprofile_v1_save: "master/basicprofile/v1/save",
	master_basicprofile_v1_get_by_oid: "master/basicprofile/v1/get-by-oid",
	master_basicprofile_v1_update: "master/basicprofile/v1/update",
	master_basicprofile_v1_embassy_save: "master/basicprofile/v1/embassy-save",

	master_basicprofile_v1_fm_honourier_consultant_get_list: "master/basicprofile/v1/fm-honourier-consultant-get-list",
	master_basicprofile_v1_passport_get_by_oid: "master/basicprofile/v1/passport-get-by-oid",

	master_generalprofile_v1_get_list: "master/generalprofile/v1/get-list",
	master_generalprofile_v1_save: "master/generalprofile/v1/save",
	master_generalprofile_v1_get_by_oid: "master/generalprofile/v1/get-by-oid",
	master_generalprofile_v1_update: "master/generalprofile/v1/update",
	master_generalprofile_v1_exemptionarticles_get_by_oid: "master/generalprofile/v1/exemptionarticles-get-by-oid",

	master_designation_v1_get_list: "master/designation/v1/get-list",
	master_designation_v1_save: "master/designation/v1/save",



	//OPERATION
	operation_generalprofiletransaction_v1_get_list: "operation/generalprofiletransaction/v1/get-list",
	operation_generalprofiletransaction_v1_save: "operation/generalprofiletransaction/v1/save",
	operation_generalprofiletransaction_v1_get_by_oid: "operation/generalprofiletransaction/v1/get-by-oid",
	operation_generalprofiletransaction_v1_update: "operation/generalprofiletransaction/v1/update",
	operation_generalprofiletransaction_v1_delete: "operation/generalprofiletransaction/v1/delete",

	operation_purchase_v1_get_list: "operation/purchase/v1/get-list",
	operation_purchase_v1_save: "operation/purchase/v1/save",
	operation_purchase_v1_get_by_oid: "operation/purchase/v1/get-by-oid",
	operation_purchase_v1_update: "operation/purchase/v1/update",
	operation_purchase_v1_delete: "operation/purchase/v1/delete",
	operation_purchase_v1_purchasedetails_get_by_oid: "operation/purchase/v1/purchasedetails-get-by-oid",
	
		
	operation_ledgerinfo_v1_get_list: "operation/ledgerinfo/v1/get-list",
	operation_ledgerinfo_v1_save: "operation/ledgerinfo/v1/save",
	operation_ledgerinfo_v1_get_by_oid: "operation/ledgerinfo/v1/get-by-oid",
	operation_ledgerinfo_v1_update: "operation/ledgerinfo/v1/update",
	operation_ledgerinfo_v1_get_by_view_oid: "operation/ledgerinfo/v1/get-by-view-oid",
	operation_ledgerinfo_v1_ledgerinfodetails_get_list: "operation/ledgerinfo/v1/ledgerinfodetails-get-list",

	operation_dpledgerinfo_v1_save: "operation/dpledgerinfo/v1/save",
	operation_dpledgerinfo_v1_get_list: "operation/dpledgerinfo/v1/get-list",
	operation_dpledgerinfo_v1_get_by_oid: "operation/dpledgerinfo/v1/get-by-oid",
	operation_dpledgerinfo_v1_nationality_get_list: "operation/dpledgerinfo/v1/nationality-get-list",
	operation_dpledgerinfo_v1_dollar_get_by_oid: "operation/dpledgerinfo/v1/dollar-get-by-oid",
	operation_dpledgerinfo_v1_get_by_view_oid: "operation/dpledgerinfo/v1/get-by-view-oid",
	operation_dpledgerinfo_v1_dpledgerinfodetails_get_list: "operation/dpledgerinfo/v1/dpledgerinfodetails-get-list",
	operation_dpledgerinfo_v1_update: "operation/dpledgerinfo/v1/update",
	operation_dpledgerinfo_v1_update_dpledgerinfodetails: "operation/dpledgerinfo/v1/update-dpledgerinfodetails",

	operation_ledgerinfo_v1_ledgerinfo_category_get_list: "operation/ledgerinfo/v1/get-ledgerinfo-category-list",
	operation_ledgerinfo_v1_ledgerinfo_product_get_list: "operation/ledgerinfo/v1/get-ledgerinfo-product-list",
	operation_purchase_v1_billofentry_get_list: "operation/purchase/v1/billofentry-get-list",


	// REPORT SECTION
	operation_report_v1_download: "operation/report/v1/download/",
	
	//Warehouse
	operation_report_v1_get_warehouse_list_export: "operation/report/v1/get-warehouse-list-export",
	operation_report_v1_get_warehouse_list_csv: "operation/report/v1/get-warehouse-list-csv",
	operation_report_v1_get_warehouse_list_show: "operation/report/v1/get-warehouse-list-show",
	operation_report_v1_get_warehouse_list_parameter: "operation/report/v1/get-warehouse-list-parameter",
	operation_report_v1_get_warehouse_product_list_parameter: "operation/report/v1/get-warehouse-product-list-parameter",
	operation_report_v1_get_warehouse_category_list_parameter: "operation/report/v1/get-warehouse-catagory-list-parameter",
	operation_report_v1_get_warehouse_product_list_export: "operation/report/v1/get-warehouse-product-list-export",
	operation_report_v1_get_warehouse_category_list_export: "operation/report/v1/get-warehouse-category-list-export",
	operation_report_v1_get_warehouse_summary_parameter: "operation/report/v1/warehouse-summary-parameter",
	operation_report_v1_get_warehouse_summary_export: "operation/report/v1/warehouse-summary-export",
	operation_report_v1_profile_wise_summary_parameter: "operation/report/v1/profile-wise-summary-parameter",
	operation_report_v1_profile_wise_summary_export: "operation/report/v1/profile-wise-summary-export",
	operation_report_v1_get_category_wise_summary_parameter: "operation/report/v1/category-wise-summary-parameter",
	operation_report_v1_get_category_wise_summary_export: "operation/report/v1/category-wise-summary-export",
	

	//Purchase
	operation_report_v1_get_purchase_list_parameter: "operation/report/v1/get-purchase-list-parameter",
	operation_report_v1_get_purchase_list_export: "operation/report/v1/get-purchase-list-export",
	operation_report_v1_get_purchase_list_details_parameter: "operation/report/v1/get-purchase-details-list-parameter",
	operation_report_v1_get_purchase_list_details_export: "operation/report/v1/get-purchase-details-list-export",

	//Sales
	operation_report_v1_get_sales_list_parameter: "operation/report/v1/get-sales-list-parameter",
	operation_report_v1_get_sales_list_export: "operation/report/v1/get-sales-list-export",
	operation_report_v1_get_sales_list_details_parameter: "operation/report/v1/get-sales-details-list-parameter",
	operation_report_v1_get_sales_list_details_export: "operation/report/v1/get-sales-details-list-export",
	operation_report_v1_get_sales_invoice: "operation/report/v1/get-sales-invoice",
	operation_report_v1_get_invoice_wise_sales_parameter: "operation/report/v1/get-invocie-wise-sales-parameter",
	operation_report_v1_get_invoice_wise_sales_export: "operation/report/v1/get-invocie-wise-sales-export",
	operation_report_v1_get_date_wise_invoice_parameter: "operation/report/v1/get-date-wise-invoice-parameter",
	operation_report_v1_get_date_wise_invoice_export: "operation/report/v1/get-date-wise-invoice-export",

	// In-Bond & Ex-bond
	operation_report_v1_get_ex_bond_parameter: "operation/report/v1/get-ex-bond-parameter",
	operation_report_v1_get_in_bond_parameter: "operation/report/v1/get-in-bond-parameter",
	operation_report_v1_get_ex_bond_export: "operation/report/v1/get-ex-bond-export",
	operation_report_v1_get_in_bond_export: "operation/report/v1/get-in-bond-export",
	// Stock bond
	operation_report_v1_get_stock_bond_export: "operation/report/v1/get-stock-bond-export",
	operation_report_v1_get_stock_bond_parameter: "operation/report/v1/get-stock-bond-parameter",
	
	// Exemption Details
	operation_report_v1_get_foreign_ministry_parameter: "operation/report/v1/foreign-ministry-parameter",
	operation_report_v1_get_foreign_ministry_export: "operation/report/v1/foreign-ministry-export",



	
	//Lumos-scm
	meta_organization_v1_get_list: "operation/organization/v1/get-list",
	meta_organization_v1_save: "operation/organization/v1/save",
	meta_organization_v1_get_by_oid: "operation/organization/v1/get-by-oid",
	meta_organization_v1_update: "operation/organization/v1/update",

	master_bank_v1_get_list: "master/bank/v1/get-list",
	master_bank_v1_save: "master/bank/v1/save",
	master_bank_v1_get_by_oid: "master/bank/v1/get-by-oid",
	master_bank_v1_update: "master/bank/v1/update",

	master_insurance_v1_get_list: "master/insurance/v1/get-list",
	master_insurance_v1_save: "master/insurance/v1/save",
	master_insurance_v1_get_by_oid: "master/insurance/v1/get-by-oid",
	master_insurance_v1_update: "master/insurance/v1/update",

	master_cnfagent_v1_get_list: "master/cnfagent/v1/get-list",
	master_cnfagent_v1_save: "master/cnfagent/v1/save",
	master_cnfagent_v1_get_by_oid: "master/cnfagent/v1/get-by-oid",
	master_cnfagent_v1_update: "master/cnfagent/v1/update",

	master_freightforwarder_v1_get_list: "master/freightforwarder/v1/get-list",
	master_freightforwarder_v1_save: "master/freightforwarder/v1/save",
	master_freightforwarder_v1_get_by_oid: "master/freightforwarder/v1/get-by-oid",
	master_freightforwarder_v1_update: "master/freightforwarder/v1/update",

	master_supplier_v1_get_list: "master/supplier/v1/get-list",
	master_supplier_v1_save: "master/supplier/v1/save",
	master_supplier_v1_get_by_oid: "master/supplier/v1/get-by-oid",
	master_supplier_v1_update: "master/supplier/v1/update",

	operation_dcstate_v1_get_list: "operation/dcstate/v1/get-list",
	operation_dcstate_v1_save: "operation/dcstate/v1/save",
	operation_dcstate_v1_get_by_oid: "operation/dcstate/v1/get-by-oid",
	operation_dcstate_v1_update: "operation/dcstate/v1/update",
	operation_dcstate_v1_get_list_by_type_wise: "operation/dcstate/v1/get-list-by-type-wise",
	
	operation_dc_v1_get_list: "operation/documentarycredit/v1/get-list",
	operation_dc_v1_save: "operation/documentarycredit/v1/save",
	operation_dc_v1_get_by_oid: "operation/documentarycredit/v1/get-by-oid",
	operation_dc_v1_update: "operation/documentarycredit/v1/update",
	
	operation_dctracking_v1_get_list: "operation/dctracking/v1/get-list",
	operation_dctracking_v1_get_list_by_oid: "operation/dctracking/v1/get-list-by-oid",
	operation_dctracking_v1_save: "operation/dctracking/v1/save",
	operation_dctracking_v1_get_by_oid: "operation/dctracking/v1/get-by-oid",
	operation_dctracking_v1_update: "operation/dctracking/v1/update",

	master_project_v1_get_list: "master/project/v1/get-list",
	master_project_v1_save: "master/project/v1/save",
	master_project_v1_get_by_oid: "master/project/v1/get-by-oid",
	master_project_v1_update: "master/project/v1/update",
	
	master_dashboard_v1_get_project_count: "master/dashboard/v1/get-project-count",
	master_dashboard_v1_get_dcstate_count: "master/dashboard/v1/get-dcstate-count",
	master_dashboard_v1_get_dctracking_list: "master/dashboard/v1/get-dctracking-list",
	
	master_contact_v1_get_list: "master/contact/v1/get-list",
	master_contact_v1_get_list_by_type: "master/contact/v1/get-list-by-type",
	master_contact_v1_save: "master/contact/v1/save",
	master_contact_v1_get_by_oid: "master/contact/v1/get-by-oid",
	master_contact_v1_update: "master/contact/v1/update",

	master_client_v1_get_list: "master/client/v1/get-list",
	master_client_v1_save: "master/client/v1/save",
	master_client_v1_get_by_oid: "master/client/v1/get-by-oid",
	master_client_v1_update: "master/client/v1/update",

	//operation_report_v1_get_dc_list_pdf: "operation/report/v1/get-dc-list-pdf/",
	//operation_report_v1_get_dc_list_csv: "operation/report/v1/get-dc-list-csv/",
	

}
