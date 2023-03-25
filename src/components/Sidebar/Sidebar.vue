<template>
  <div class="sidebar elevation-2">
    <SidebarHeader/>
    <SidebarForm/>
    <nav class="sidebar-nav">
      <div slot="header"></div>
      <ul class="nav ">
        <template v-for="item in navItems">
          <template v-if="item.title  && item.enable == true">
            <SidebarNavTitle v-if="item.enable == true" :name="item.name" :classes="item.class" :wrapper="item.wrapper"/>
          </template>
          <template v-else-if="item.divider && item.enable == true">
            <SidebarNavDivider :classes="item.class"/>
          </template>
          <template v-else-if="item.label && item.enable == true">
            <SidebarNavLabel v-if="item.enable == true" :name="item.name" :url="item.url" :icon="item.icon" :label="item.label" :classes="item.class"/>
          </template>
          <template v-else>
            <template v-if="item.children && item.enable === true">
              <!-- First level dropdown -->
              <SidebarNavDropdown :name="item.name" :url="item.url" :icon="item.icon">
                <template v-for="(childL1, index) in item.children">
                  <template v-if="childL1.children && childL1.enable === true">
                    <!-- Second level dropdown -->
                    <SidebarNavDropdown :name="childL1.name" :url="childL1.url" :icon="childL1.icon">
                      <li class="nav-item" v-for="(childL2, index) in childL1.children">
                        <SidebarNavLink v-if="childL2.enable == true" :name="childL2.name" :url="childL2.url" :icon="childL2.icon" :badge="childL2.badge" :variant="item.variant"/>
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <template v-else>
                    <SidebarNavItem :classes="item.class">
                      <SidebarNavLink v-if="childL1.enable == true" :name="childL1.name" :url="childL1.url" :icon="childL1.icon" :badge="childL1.badge" :variant="item.variant"/>
                    </SidebarNavItem>
                  </template>
                </template>
              </SidebarNavDropdown>
            </template>
            <template v-else>
              <SidebarNavItem :classes="item.class">
                <SidebarNavLink  v-if="item.enable == true" :name="item.name" :url="item.url" :icon="item.icon" :badge="item.badge" :variant="item.variant"/>
              </SidebarNavItem>
            </template>
          </template>
        </template>
      </ul>
      <slot></slot>
    </nav>
    <SidebarFooter/>
    <SidebarMinimizer/>
  </div>
</template>
<script>
import SidebarFooter from './SidebarFooter'
import SidebarForm from './SidebarForm'
import SidebarHeader from './SidebarHeader'
import SidebarMinimizer from './SidebarMinimizer'
import SidebarNavDivider from './SidebarNavDivider'
import SidebarNavDropdown from './SidebarNavDropdown'
import SidebarNavLink from './SidebarNavLink'
import SidebarNavTitle from './SidebarNavTitle'
import SidebarNavItem from './SidebarNavItem'
import SidebarNavLabel from './SidebarNavLabel'
export default {
  name: 'sidebar',
  data(){
    return{
      navItems:[]
    }
  },
  // props: {
  //   navItems: {
  //     type: Array,
  //     required: true,
  //     default: () => []
  //   }
  // },
  components: {
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNavDivider,
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarNavItem,
    SidebarNavLabel
  },
  mounted(){
    this.getMenu()
  },
  methods: {
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    },
    getMenu(){
      let nav = localStorage.getItem("lumos_menu")
      this.navItems = JSON.parse(nav)
    }
  }


}
</script>

<style lang="css">
  .nav-link {
    cursor:pointer;
  }

  .sidebar{
	  /* background: url("../../../static/img/sidebar-background.jpg") no-repeat ; */
    /* background-image: linear-gradient(to right top, #407b08, #498b0b, #539b0d, #5cac10, #66bd13); */
    background-color: #176A00;
  }
  .sidebar .nav-dropdown-toggle {
    position: relative;
    background: transparent !important;
    margin-bottom: 1px;
}
.sidebar .nav-link {
    display: block;
    padding: 0.75rem 1rem;
    color: white;
    text-decoration: none;
    background: transparent;
}

.nav-item{
  background: transparent; 
}
.sidebar .nav-dropdown.open {
    font-weight: 500;
    /* background: #F4F4F5; */
    background: #125100;
}
.sidebar .nav-dropdown.open .nav-link {
    color: #BBDEFB;
    border-left: 0 !important;
}

.sidebar .nav-link i {
    color: white;
}
/* for changing the color of the menu dropdown change variable.scss 122 line */

</style>
