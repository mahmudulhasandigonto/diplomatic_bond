import Vue from 'vue'
import Router from 'vue-router'

// Containers
//import AppShell from '@/containers/AppShell'
const AppShell = () => import(/* webpackChunkName: "group-full" */ '@/containers/AppShell')  // For code spliting & lazy loding
// Views

// Views - Pages
const Login = () => import('@/components/auth/Login')
const LoginOtp = () => import('@/components/auth/LoginOtp')
const ForgetPassword = () => import('@/components/auth/ForgetPassword')
const ChangePassword = () => import('@/components/auth/ChangePassword')
const page404 = () => import('@/components/auth/Page404')

//import Dashboard from '@/views/Dashboard'
const Dashboard = () => import(/* webpackChunkName: "group-dashboard" */ '@/components/pages/dashboard/Dashboard')



//NBR-Diplomatic-Bond (Master)
const QuarterPassbook = () => import('@/components/pages/master/quarter/QuarterPassbook')
const QuarterPassbookSaveUpdate = () => import('@/components/pages/master/quarter/QuarterPassbookSaveUpdate')

const QuarterExemption = () => import('@/components/pages/master/quarter/QuarterExemption')
const QuarterExemptionSaveUpdate = () => import('@/components/pages/master/quarter/QuarterExemptionSaveUpdate')

const Category = () => import('@/components/pages/master/category/Category')
const CategorySaveUpdate = () => import('@/components/pages/master/category/CategorySaveUpdate')

const Product = () => import('@/components/pages/master/product/Product')
const ProductSaveUpdate = () => import('@/components/pages/master/product/ProductSaveUpdate')

const ProductDetails = () => import('@/components/pages/master/productdetails/ProductDetails')
const ProductDetailsSaveUpdate = () => import('@/components/pages/master/productdetails/ProductDetailsSaveUpdate')

const ProductDestroy = () => import('@/components/pages/master/productdestroy/ProductDestroy')
const ProductDestroySave = () => import('@/components/pages/master/productdestroy/ProductDestroySave')

const WarehouseInfo = () => import('@/components/pages/master/warehouseinfo/WarehouseInfo')
const WarehouseInfoSaveUpdate = () => import('@/components/pages/master/warehouseinfo/WarehouseInfoSaveUpdate')

const WarehouseLimit = () => import('@/components/pages/master/warehouselimit/WarehouseLimit')
const WarehouseLimitSaveUpdate = () => import('@/components/pages/master/warehouselimit/WarehouseLimitSaveUpdate')

const Office = () => import('@/components/pages/master/office/Office')
const OfficeSaveUpdate = () => import('@/components/pages/master/office/OfficeSaveUpdate')
const DesignationSave = () => import('@/components/pages/master/designation/DesignationSave')
const EmbassySave = () => import('@/components/pages/master/embassy/EmbassySave')



//NBR-Diplomatic-Bond (Operation)
const Organization = () => import('@/components/pages/operation/organization/Organization')
const OrgSaveUpdate = () => import('@/components/pages/operation/organization/OrgSaveUpdate')

const BasicProfile = () => import('@/components/pages/beneficiary/basicprofile/BasicProfile')
const BasicProfileSaveUpdate = () => import('@/components/pages/beneficiary/basicprofile/BasicProfileSaveUpdate')
const BasicProfileView = () => import('@/components/pages/beneficiary/basicprofile/BasicProfileView')
const BasicProfileDashboard = () => import('@/components/pages/beneficiary/basicprofile/BasicProfileDashboard')

const PassbookProfile = () => import('@/components/pages/beneficiary/passbookprofile/PassbookProfile')
const PassbookProfileSaveUpdate = () => import('@/components/pages/beneficiary/passbookprofile/PassbookProfileSaveUpdate')
const PassbookProfileView = () => import('@/components/pages/beneficiary/passbookprofile/PassbookProfileView')
const PassbookProfileDashboard = () => import('@/components/pages/beneficiary/passbookprofile/PassbookProfileDashboard')

const ExemptionProfile = () => import('@/components/pages/beneficiary/exemptionprofile/ExemptionProfile')
const ExemptionProfileSaveUpdate = () => import('@/components/pages/beneficiary/exemptionprofile/ExemptionProfileSaveUpdate')
const ExemptionProfileView = () => import('@/components/pages/beneficiary/exemptionprofile/ExemptionProfileView'                                                                                                                                                                                                                                                                                                                                                                                )

const GeneralProfileTransaction = () => import('@/components/pages/operation/generalprofiletransaction/GeneralProfileTransaction')
const GeneralProfileTransactionSaveUpdate = () => import('@/components/pages/operation/generalprofiletransaction/GeneralProfileTransactionSaveUpdate')
const GeneralProfileTransactionView = () => import('@/components/pages/operation/generalprofiletransaction/GeneralProfileTransactionView')

const GeneralProfileArticles = () => import('@/components/pages/operation/generalprofilearticles/GeneralProfileArticles')
const GeneralProfileArticlesSaveUpdate = () => import('@/components/pages/operation/generalprofilearticles/GeneralProfileArticlesSaveUpdate')

const Purchase = () => import('@/components/pages/operation/purchase/Purchase')
const PurchaseSaveUpdate = () => import('@/components/pages/operation/purchase/PurchaseSaveUpdate')
const PurchaseView = () => import('@/components/pages/operation/purchase/PurchaseView')

const LedgerInfo = () => import('@/components/pages/operation/ledgerinfo/LedgerInfo')
const LedgerInfoSaveUpdate = () => import('@/components/pages/operation/ledgerinfo/LedgerInfoSaveUpdate')
const LedgerInfoView = () => import('@/components/pages/operation/ledgerinfo/LedgerInfoView')

const DpLedgerInfo = () => import('@/components/pages/operation/dpledgerinfo/DpLedgerInfo')
const DpLedgerInfoSaveUpdate = () => import('@/components/pages/operation/dpledgerinfo/DpLedgerInfoSaveUpdate')
const DpLedgerInfoView = () => import('@/components/pages/operation/dpledgerinfo/DpLedgerInfoView')

const WrongPurchase = () => import('@/components/pages/wrongoperation/wrongpurchase/WrongPurchase')
const WrongPurchaseSaveUpdate = () => import('@/components/pages/wrongoperation/wrongpurchase/WrongPurchaseSaveUpdate')
const WrongPurchaseView = () => import('@/components/pages/wrongoperation/wrongpurchase/WrongPurchaseView')

const WrongLedgerInfo = () => import('@/components/pages/wrongoperation/wrongledgerinfo/WrongLedgerInfo')
const WrongLedgerInfoSaveUpdate = () => import('@/components/pages/wrongoperation/wrongledgerinfo/WrongLedgerInfoSaveUpdate')
const WrongLedgerInfoView = () => import('@/components/pages/wrongoperation/wrongledgerinfo/WrongLedgerInfoView')



//NBR-Diplomatic-Bond (Report)
const WarehouseReports = () => import('@/components/pages/reports/warehouse/WarehouseReports')
const WarehouseReportList = () => import('@/components/pages/reports/warehouse/WarehouseReportList')
const WarehouseSummary = () => import('@/components/pages/reports/warehouse/WarehouseSummary')
const BeneficiarySummary = () => import('@/components/pages/reports/warehouse/BeneficiarySummary')
const CategoryWiseWarehouseSummary = () => import('@/components/pages/reports/warehouse/CategoryWiseWarehouseSummary')
const WarehouseReportByDate = () => import('@/components/pages/reports/warehouse/WarehouseReportByDate')
const ProductwiseCurrentStock = () => import('@/components/pages/reports/warehouse/ProductwiseCurrentStock')
const CategorywiseCurrentStock = () => import('@/components/pages/reports/warehouse/CategorywiseCurrentStock')

const PurchaseReports = () => import('@/components/pages/reports/purchase/PurchaseReports')
const WarehouseWisePurchase = () => import('@/components/pages/reports/purchase/WarehouseWisePurchase')
const PurchaseDetails = () => import('@/components/pages/reports/purchase/PurchaseDetails')

const SalesReports = () => import('@/components/pages/reports/sales/SalesReports')
const WarehouseWiseSales = () => import('@/components/pages/reports/sales/WarehouseWiseSales')
const SalesDetails = () => import('@/components/pages/reports/sales/SalesDetails')
const InvoiceWiseSales = () => import('@/components/pages/reports/sales/InvoiceWiseSales')
const DateWiseInvoice = () => import('@/components/pages/reports/sales/DateWiseInvoice')
const DutyPaidSales = () => import('@/components/pages/reports/sales/DutyPaidSales')

const InBond = () => import('@/components/pages/reports/bond/InBond')
const ExBond = () => import('@/components/pages/reports/bond/ExBond')

const ForeignMinistryReports = () => import('@/components/pages/reports/foreignministry/ForeignMinistryReports')
const ExemptionDetails = () => import('@/components/pages/reports/foreignministry/ExemptionDetails')
const StockBond = () => import('@/components/pages/reports/bond/StockBond')



//NBR-Diplomatic-Bond (Settings)
const User = () => import('@/components/pages/settings/user/User')
const UserList = () => import('@/components/pages/settings/user/UserList')
const UserSaveUpdate = () => import('@/components/pages/settings/user/UserSaveUpdate')

const RoleList = () => import('@/components/pages/settings/role/RoleList')
const RoleSaveUpdate = () => import('@/components/pages/settings/role/RoleSaveUpdate')

const EmailTemplate = () => import('@/components/pages/settings/email-template/EmailTemplate')
const EmailTemplateSaveUpdate = () => import('@/components/pages/settings/email-template/EmailTemplateSaveUpdate')








Vue.use(Router)

export default new Router({
    mode: "history",
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            redirect: '/',
            name: 'Security',
            component: {
                render(c) { return c('router-view') }
            },
            children: [
                {
                    path: '/',
                    name: 'Login',
                    component: Login,
                    meta: { title: 'Login | NBR-DiplomaticBond' }
                },
                {
                    path: '/login-otp',
                    name: 'LoginOtp',
                    component: LoginOtp,
                    meta: { title: 'Login Otp | NBR-DiplomaticBond' }
                },
                {
                    path: 'forget-password',
                    name: 'ForgetPassword',
                    component: ForgetPassword,
                    meta: { title: 'Forget Password | NBR-DiplomaticBond' }
                },
                {
                    path: '404',
                    name: 'NotFound',
                    component: page404,
                    meta: { title: 'Not Found | Diplomatic Bond'}
                },
            ]
        },
        {
            path: '',
            redirect: 'dashboard',
            name: 'NBR-DiplomaticBond',
            component: AppShell,
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                    meta: { title: 'Dashboard | NBR-DiplomaticBond' , requriesAuth : true }
                },
                {
                    path: 'meta',
                    redirect: 'meta/organization',
                    name: 'Meta',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'organization',
                            name: 'Organization',
                            component: Organization,
                            meta: { title: 'Organization List | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'organization/new-organization',
                            name: 'New Organization',
                            component: OrgSaveUpdate,
                            meta: { title: 'New Organization | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'organization/update-organization/:id',
                            name: 'Update Organization',
                            component: OrgSaveUpdate,
                            meta: { title: 'Update Organization | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'organization/:search',
                            name: 'Organization Search',
                            component: Organization,
                            meta: { title: 'Organization List | NBR-DiplomaticBond', requriesAuth: true }
                        },                    ]
                },
                {
                    path: 'master',
                    redirect: 'master/project',
                    name: 'Master',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [                        
                        {
                            path: 'quarterpassbook',
                            name: 'QuarterPassbook',
                            component: QuarterPassbook,
                            meta: { title: 'Quarter Passbook List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'quarterpassbook/new-quarterpassbook',
                            name: 'New QuarterPassbook',
                            component: QuarterPassbookSaveUpdate,
                            meta: { title: 'New QuarterPassbook | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'quarterpassbook/update-quarterpassbook/:id',
                            name: 'Update QuarterPassbook',
                            component: QuarterPassbookSaveUpdate,
                            meta: { title: 'Update QuarterPassbook | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'quarterpassbook/:search',
                            name: 'quarterpassbook Search',
                            component: QuarterPassbook,
                            meta: { title: 'QuarterPassbook List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'quarterexemption',
                            name: 'QuarterExemption',
                            component: QuarterExemption,
                            meta: { title: 'QuarterExemption List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'quarterexemption/new-quarterexemption',
                            name: 'New QuarterExemption',
                            component: QuarterExemptionSaveUpdate,
                            meta: { title: 'New QuarterExemption | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'quarterexemption/update-quarterexemption/:id',
                            name: 'Update QuarterExemption',
                            component: QuarterExemptionSaveUpdate,
                            meta: { title: 'Update QuarterExemption | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'quarterexemption/:search',
                            name: 'quarterexemption Search',
                            component: QuarterExemption,
                            meta: { title: 'QuarterExemption List | Diplomatic Bond', requriesAuth: true }
                        },              
                        {
                            path: 'product',
                            name: 'Product',
                            component: Product,
                            meta: { title: 'Product List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'product/new-product',
                            name: 'New Product',
                            component: ProductSaveUpdate,
                            meta: { title: 'New Product | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'product/update-product/:id',
                            name: 'Update Product',
                            component: ProductSaveUpdate,
                            meta: { title: 'Update Product | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'product/:search',
                            name: 'product Search',
                            component: Product,
                            meta: { title: 'Product List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'category',
                            name: 'Category',
                            component: Category,
                            meta: { title: 'Category List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'category/new-category',
                            name: 'New Category',
                            component: CategorySaveUpdate,
                            meta: { title: 'New Category | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'category/update-category/:id',
                            name: 'Update Category',
                            component: CategorySaveUpdate,
                            meta: { title: 'Update Category | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'category/:search',
                            name: 'Category Search',
                            component: Category,
                            meta: { title: 'Category List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'productdetails',
                            name: 'ProductDetails',
                            component: ProductDetails,
                            meta: { title: 'ProductDetails List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'productdetails/new-productdetails',
                            name: 'New ProductDetails',
                            component: ProductDetailsSaveUpdate,
                            meta: { title: 'New ProductDetails | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'productdetails/update-productdetails/:id',
                            name: 'Update ProductDetails',
                            component: ProductDetailsSaveUpdate,
                            meta: { title: 'Update ProductDetails | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'productdetails/:search',
                            name: 'productdetails Search',
                            component: ProductDetails,
                            meta: { title: 'ProductDetails List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'productdestroy',
                            name: 'ProductDestroy',
                            component: ProductDestroy,
                            meta: { title: 'ProductDestroy List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'productdestroy/new-productdestroy',
                            name: 'New ProductDestroy',
                            component: ProductDestroySave,
                            meta: { title: 'New ProductDestroy | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'productdestroy/:search',
                            name: 'productdestroy Search',
                            component: ProductDestroy,
                            meta: { title: 'ProductDestroy List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'warehouseinfo',
                            name: 'WarehouseInfo',
                            component: WarehouseInfo,
                            meta: { title: 'WarehouseInfo List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'warehouseinfo/new-warehouseinfo',
                            name: 'New WarehouseInfo',
                            component: WarehouseInfoSaveUpdate,
                            meta: { title: 'New WarehouseInfo | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'warehouseinfo/update-warehouseinfo/:id',
                            name: 'Update WarehouseInfo',
                            component: WarehouseInfoSaveUpdate,
                            meta: { title: 'Update WarehouseInfo | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'warehouseinfo/:search',
                            name: 'WarehouseInfo Search',
                            component: WarehouseInfo,
                            meta: { title: 'WarehouseInfo List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'warehouselimit',
                            name: 'WarehouseLimit',
                            component: WarehouseLimit,
                            meta: { title: 'WarehouseLimit List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'warehouselimit/new-warehouselimit',
                            name: 'New WarehouseLimit',
                            component: WarehouseLimitSaveUpdate,
                            meta: { title: 'New WarehouseLimit | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'warehouselimit/update-warehouselimit/:id',
                            name: 'Update WarehouseLimit',
                            component: WarehouseLimitSaveUpdate,
                            meta: { title: 'Update WarehouseLimit | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'warehouselimit/:search',
                            name: 'WarehouseLimit Search',
                            component: WarehouseLimit,
                            meta: { title: 'WarehouseLimit List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'office',
                            name: 'Office',
                            component: Office,
                            meta: { title: 'Office List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'office/new-office',
                            name: 'New Office',
                            component: OfficeSaveUpdate,
                            meta: { title: 'New Office | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'office/update-office/:id',
                            name: 'Update Office',
                            component: OfficeSaveUpdate,
                            meta: { title: 'Update Office | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'office/:search',
                            name: 'office Search',
                            component: Office,
                            meta: { title: 'Office List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: '/designation/new-designation',
                            name: 'New Designation',
                            component: DesignationSave,
                            meta: { title: 'New Designation | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: '/embassy/new-embassy',
                            name: 'New Embassy',
                            component: EmbassySave,
                            meta: { title: 'New Embassy | Diplomatic Bond', requriesAuth : true  }
                        }
                    ]
                },
                {
                    path: 'beneficiary',
                    redirect: 'beneficiary/basicprofile',
                    name: 'Beneficiary',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'basicprofile',
                            name: 'BasicProfile',
                            component: BasicProfile,
                            meta: { title: 'Basic Profile List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'basicprofile/new-basicprofile',
                            name: 'NewBasicProfile',
                            component: BasicProfileSaveUpdate,
                            meta: { title: 'New Basic Profile | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'basicprofile/:data',
                            name: 'Pending BasicProfile',
                            component: BasicProfileDashboard,
                            meta: { title: 'Basic Profile List | Diplomatic Bond', requriesAuth : true  }
                        },
                       {
                            path: 'basicprofile/:data',
                            name: 'BasicProfile Send',
                            component: BasicProfileDashboard,
                            meta: { title: 'Basic Profile List | Diplomatic Bond', requriesAuth : true  }
                        },                        
                        {
                            path: 'basicprofile/update-basicprofile/:id',
                            name: 'Update BasicProfile',
                            component: BasicProfileSaveUpdate,
                            meta: { title: 'Update Basic Profile | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'basicprofile/view-basicprofile/:id',
                            name: 'BasicProfile View',
                            component: BasicProfileView,
                            meta: { title: 'Basic Profile View | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'basicprofile/:search',
                            name: 'Basic ProfileSearch',
                            component: BasicProfile,
                            meta: { title: 'Basic Profile List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'passbookprofile',
                            name: 'PassbookProfile',
                            component: PassbookProfile,
                            meta: { title: 'Passbook Profile List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'passbookprofile/:data',
                            name: 'Pending PassbookProfile',
                            component: PassbookProfileDashboard,
                            meta: { title: 'Passbook Profile Pending | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'passbookprofile/:data',
                            name: 'Active PassbookProfile',
                            component: PassbookProfileDashboard,
                            meta: { title: 'Passbook Profile Active | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'exemptionprofile/:data',
                            name: 'Active ExemptionProfile',
                            component: PassbookProfileDashboard,
                            meta: { title: 'Exemption Profile Active | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'passbookprofile/new-passbookprofile',
                            name: 'New PassbookProfile',
                            component: PassbookProfileSaveUpdate,
                            meta: { title: 'New Passbook Profile | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'passbookprofile/update-passbookprofile/:id',
                            name: 'Update PassbookProfile',
                            component: PassbookProfileSaveUpdate,
                            meta: { title: 'Update Passbook Profile | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'passbookprofile/:search',
                            name: 'PassbookProfileSearch',
                            component: PassbookProfile,
                            meta: { title: 'Passbook Profile List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'passbookprofile/view-passbookprofile/:id',
                            name: 'PassbookProfile View',
                            component: PassbookProfileView,
                            meta: { title: 'Passbook Profile View | Diplomatic Bond', requriesAuth : true  }
                        },		
                        {          
                            path: 'exemptionprofile',
                            name: 'ExemptionProfile',
                            component: ExemptionProfile,
                            meta: { title: 'Exemption Profile List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'exemptionprofile/new-exemptionprofile',
                            name: 'New ExemptionProfile',
                            component: ExemptionProfileSaveUpdate,
                            meta: { title: 'New Exemption Profile | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'exemptionprofile/update-exemptionprofile/:id',
                            name: 'Update ExemptionProfile',
                            component: ExemptionProfileSaveUpdate,
                            meta: { title: 'Update Exemption Profile | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'exemptionprofile/view-exemptionprofile/:id',
                            name: 'ExemptionProfile View',
                            component: ExemptionProfileView,
                            meta: { title: 'Exemption Profile View | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'exemptionprofile/:search',
                            name: 'Exemption Profile Search',
                            component: ExemptionProfile,
                            meta: { title: 'Exemption Profile List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'generalprofiletransaction/:id',
                            name: 'GeneralProfileTransaction',
                            component: GeneralProfileTransaction,
                            meta: { title: 'GeneralProfileTransaction List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'generalprofiletransaction/new-generalprofiletransaction/:type/:pid',
                            name: 'New GeneralProfileTransaction',
                            component: GeneralProfileTransactionSaveUpdate,
                            meta: { title: 'New GeneralProfileTransaction | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'generalprofiletransaction/update-generalprofiletransaction/:type/:id/:pid',
                            name: 'Update GeneralProfileTransaction',
                            component: GeneralProfileTransactionSaveUpdate,
                            meta: { title: 'Update GeneralProfileTransaction | Diplomatic Bond', requriesAuth : true  }
                        },

                    ]
                },
                {
                    path: 'report',
                    redirect: 'reports',
                    name: 'Reports',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [                        
                        {
                            path: 'warehouseinfo',
                            name: 'Warehouse Reports',
                            component: WarehouseReports,
                            meta: { title: 'Warehouse List | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'warehouseinfolist',
                            name: 'Warehouse Report List',
                            component: WarehouseReportList,
                            meta: { title: 'Warehouse Report List | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'warehousesummary',
                            name: 'Warehouse Summary',
                            component: WarehouseSummary,
                            meta: { title: 'Warehouse Summary | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'beneficiarysummary',
                            name: 'Beneficiary Summary',
                            component: BeneficiarySummary,
                            meta: { title: 'Beneficiary Summary | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'categorywisewarehousesummary',
                            name: 'Category Wise Warehouse Summary',
                            component: CategoryWiseWarehouseSummary,
                            meta: { title: 'Category Wise Warehouse Summary | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'warehouseinfobydate',
                            name: 'Warehouse Report By Date',
                            component: WarehouseReportByDate,
                            meta: { title: 'Report By Date | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'productwisecurrentstock',
                            name: 'Product wise Current Stock',
                            component: ProductwiseCurrentStock,
                            meta: { title: 'Product wise Current Stock | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'categorywisecurrentstock',
                            name: 'Category wise Current Stock',
                            component: CategorywiseCurrentStock,
                            meta: { title: 'Category wise Current Stock | NBR-DiplomaticBond', requriesAuth : true  }
                        },                        
                        {
                            path: 'purchaseinfo',
                            name: 'Purchase Reports',
                            component: PurchaseReports,
                            meta: { title: 'Purchase List | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'warehousewisepurchase',
                            name: 'Warehouse-wise Purchase',
                            component: WarehouseWisePurchase,
                            meta: { title: 'Warehouse-wise Purchase | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'purchasedetails',
                            name: 'Purchase Details',
                            component: PurchaseDetails,
                            meta: { title: 'Purchase Details | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'salesinfo',
                            name: 'Sales Reports',
                            component: SalesReports,
                            meta: { title: 'Sales List | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'warehousewisesales',
                            name: 'Warehouse-wise Sales',
                            component: WarehouseWiseSales,
                            meta: { title: 'Warehouse-wise Sales | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'invoicewisesales',
                            name: 'Invoice-wise Sales',
                            component: InvoiceWiseSales,
                            meta: { title: 'Invoice-wise Sales | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'dutypaidsales',
                            name: 'Duty-paid Sales',
                            component: DutyPaidSales,
                            meta: { title: 'Duty Paid Sales | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'datewiseinvoice',
                            name: 'Date-wise Invoice',
                            component: DateWiseInvoice,
                            meta: { title: 'Date-wise Invoice | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'salesdetails',
                            name: 'Sales Details',
                            component: SalesDetails,
                            meta: { title: 'Sales Details | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'inbond',
                            name: 'In Bond',
                            component: InBond,
                            meta: {title: 'In Bond | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'exbond',
                            name: 'Ex Bond',
                            component: ExBond,
                            meta: {title: 'Ex Bond | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'stockbond',
                            name: 'Stock Bond',
                            component: StockBond,
                            meta: {title: 'Stock Bond | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'foreignministry',
                            name: 'Foreign Ministry Reports',
                            component: ForeignMinistryReports,
                            meta: { title: 'Foreign Ministry Reports | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'exemptiondetails',
                            name: 'Exemption Details',
                            component: ExemptionDetails,
                            meta: {title: 'Exemption Details | NBR-DiplomaticBond', requriesAuth : true  }
                        }
                    ]
                },
                {
                    path: 'operation',
                    redirect: 'operation/dcState',
                    name: 'Operation',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [                                       
                        {
                            path: 'generalprofilearticles',
                            name: 'GeneralProfileArticles',
                            component: GeneralProfileArticles,
                            meta: { title: 'GeneralProfileArticles List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'generalprofilearticles/new-generalprofilearticles',
                            name: 'New GeneralProfileArticles',
                            component: GeneralProfileArticlesSaveUpdate,
                            meta: { title: 'New GeneralProfileArticles | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'generalprofilearticles/update-generalprofilearticles/:id',
                            name: 'Update GeneralProfileArticles',
                            component: GeneralProfileArticlesSaveUpdate,
                            meta: { title: 'Update GeneralProfileArticles | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'generalprofilearticles/:search',
                            name: 'GeneralProfileArticles Search',
                            component: GeneralProfileArticles,
                            meta: { title: 'GeneralProfileArticles List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'purchase',
                            name: 'Purchase',
                            component: Purchase,
                            meta: { title: 'Purchase List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'purchase/new-purchase',
                            name: 'New Purchase',
                            component: PurchaseSaveUpdate,
                            meta: { title: 'New Purchase | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'purchase/update-purchase/:id',
                            name: 'Update Purchase',
                            component: PurchaseSaveUpdate,
                            meta: { title: 'Update Purchase | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'purchase/:search',
                            name: 'Purchase Search',
                            component: Purchase,
                            meta: { title: 'Purchase List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'purchase/view-purchase/:id',
                            name: 'Purchase View',
                            component: PurchaseView,
                            meta: { title: 'Purchase View | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'ledgerinfo',
                            name: 'LedgerInfo',
                            component: LedgerInfo,
                            meta: { title: 'LedgerInfo List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'ledgerinfo/view-ledgerinfo/:id',
                            name: 'LedgerInfo View',
                            component: LedgerInfoView,
                            meta: { title: 'LedgerInfo View | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'ledgerinfo/new-ledgerinfo',
                            name: 'New LedgerInfo',
                            component: LedgerInfoSaveUpdate,
                            meta: { title: 'New LedgerInfo | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'ledgerinfo/update-ledgerinfo/:id',
                            name: 'Update LedgerInfo',
                            component: LedgerInfoSaveUpdate,
                            meta: { title: 'Update LedgerInfo | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'ledgerinfo/:search',
                            name: 'LedgerInfo Search',
                            component: LedgerInfo,
                            meta: { title: 'LedgerInfo List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'dpledgerinfo',
                            name: 'DpLedgerInfo',
                            component: DpLedgerInfo,
                            meta: { title: 'Duty Paid LedgerInfo List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'dpledgerinfo/view-dpledgerinfo/:id',
                            name: 'DpLedgerInfo View',
                            component: DpLedgerInfoView,
                            meta: { title: 'Duty Paid LedgerInfo View | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'dpledgerinfo/new-dpledgerinfo',
                            name: 'New DpLedgerInfo',
                            component: DpLedgerInfoSaveUpdate,
                            meta: { title: 'New Duty Paid LedgerInfo | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'dpledgerinfo/update-dpledgerinfo/:id',
                            name: 'Update DpLedgerInfo',
                            component: DpLedgerInfoSaveUpdate,
                            meta: { title: 'Update Duty Paid LedgerInfo | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'dpledgerinfo/:search',
                            name: 'DpLedgerInfo Search',
                            component: DpLedgerInfo,
                            meta: { title: 'Duty Paid LedgerInfo List | Diplomatic Bond', requriesAuth: true }
                        }                        
                    ]
                },
                {
                    path: 'wrongoperation',
                    redirect: 'operation/dcState',
                    name: 'WrongOperation',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'wrongpurchase',
                            name: 'WrongPurchase',
                            component: WrongPurchase,
                            meta: { title: 'WrongPurchase List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'wrongpurchase/new-wrongpurchase',
                            name: 'New WrongPurchase',
                            component: WrongPurchaseSaveUpdate,
                            meta: { title: 'New WrongPurchase | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'wrongpurchase/update-wrongpurchase/:id',
                            name: 'Update WrongPurchase',
                            component: WrongPurchaseSaveUpdate,
                            meta: { title: 'Update WrongPurchase | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'wrongpurchase/:search',
                            name: 'WrongPurchase Search',
                            component: WrongPurchase,
                            meta: { title: 'WrongPurchase List | Diplomatic Bond', requriesAuth: true }
                        },
                        {
                            path: 'wrongpurchase/view-wrongpurchase/:id',
                            name: 'WrongPurchase View',
                            component: WrongPurchaseView,
                            meta: { title: 'WrongPurchase View | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'wrongledgerinfo',
                            name: 'WrongLedgerInfo',
                            component: WrongLedgerInfo,
                            meta: { title: 'WrongLedgerInfo List | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'wrongledgerinfo/view-wrongledgerinfo/:id',
                            name: 'WrongLedgerInfo View',
                            component: WrongLedgerInfoView,
                            meta: { title: 'WrongLedgerInfo View | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'wrongledgerinfo/new-wrongledgerinfo',
                            name: 'New WrongLedgerInfo',
                            component: WrongLedgerInfoSaveUpdate,
                            meta: { title: 'New WrongLedgerInfo | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'wrongledgerinfo/update-wrongledgerinfo/:id',
                            name: 'Update WrongLedgerInfo',
                            component: WrongLedgerInfoSaveUpdate,
                            meta: { title: 'Update WrongLedgerInfo | Diplomatic Bond', requriesAuth : true  }
                        },
                        {
                            path: 'wrongledgerinfo/:search',
                            name: 'WrongLedgerInfo Search',
                            component: WrongLedgerInfo,
                            meta: { title: 'WrongLedgerInfo List | Diplomatic Bond', requriesAuth: true }
                        }
                        
                    ]
                },
                {
                    path: 'change-password',
                    name: 'Change Password',
                    component: ChangePassword,
                    meta: { title: 'Change Password | NBR-DiplomaticBond', requriesAuth : true  }
                },
                {
                    path: 'settings',
                    redirect: 'settings/user',
                    name: 'Settings',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'user',
                            name: 'User',
                            component: UserList,
                            meta: { title: 'User List | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path:'user/new-user',
                            name : 'New User',
                            component: UserSaveUpdate,
                            meta: { title: 'New User | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'user/update-user/:id',
                            name: 'Update User',
                            component: UserSaveUpdate,
                            meta: { title: 'Update User | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'user/:search',
                            name: 'User Search',
                            component: UserList,
                            meta: { title: 'User List | NBR-DiplomaticBond', requriesAuth: true }
                        },
                        {
                            path: 'role',
                            name: 'Role',
                            component: RoleList,
                            meta: { title: 'Role List | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path:'role/new-role',
                            name : 'New Role',
                            component: RoleSaveUpdate,
                            meta: { title: 'New Role | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'role/update-role/:id',
                            name: 'Update Role',
                            component: RoleSaveUpdate,
                            meta: { title: 'Update Role | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'role/:search',
                            name: 'Role Search',
                            component: RoleList,
                            meta: { title: 'Role List | NBR-DiplomaticBond', requriesAuth: true }
                        },
                        {
                            path: 'email-template',
                            name: 'Email Template',
                            component: EmailTemplate,
                            meta: { title: 'Email Template List | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'email-template/save',
                            name: 'New Email Template',
                            component: EmailTemplateSaveUpdate,
                            meta: { title: 'New Email Template | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'email-template/update/:id',
                            name: 'Update Email Template',
                            component: EmailTemplateSaveUpdate,
                            meta: { title: 'Update Email Template | NBR-DiplomaticBond', requriesAuth : true  }
                        },
                        {
                            path: 'email-template/:search',
                            name: 'Email Template Search',
                            component: EmailTemplate,
                            meta: { title: 'Email Template List | NBR-DiplomaticBond', requriesAuth: true }
                        },
                    ]
                }
            ]
        }
    ],
})