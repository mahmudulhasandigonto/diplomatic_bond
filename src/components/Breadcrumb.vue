<template>
  <ol class="breadcrumb no-printme">
    <li class="breadcrumb-item " v-for="(item, index) in list" :key=index >
      <span class="active" v-if="isLast(index)">{{ showName(item) }}</span>
      <span  v-else>{{ showName(item) }}</span>
    </li>
  </ol>

</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    isLast (index) {
      return index === this.list.length - 1
    },
    showName (item) {
      if (item.meta && item.meta.label) {
        item = item.meta  //&& item.meta.label
      }
      if (item.name) {
        item = item.name
      }
      return item
    }
  }
}
</script>
<style scoped>
@media print {
	.no-printme  {
		display: none;
	}
	.printme  {
		display: inline;
  }

	body {
		margin: 10px;
		color: #000;
		background-color: #fff;
  }

  @page{
    size: auto;
    margin-top: 0.5in;
    margin-bottom: 0.5in;
    margin-left: 0in;
    margin-right: 0in;
  }
  html, body {
    height:100vh; 
    margin: 0 !important; 
    padding: 0 !important;
    overflow: hidden;
  }
}
</style>
