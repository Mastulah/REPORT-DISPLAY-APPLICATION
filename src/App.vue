<template>
  <div>
    <center><h1>Financial Reports</h1></center>
    <ReportTable />
  </div>
</template>

<script>

import ReportTable from './ReportTable.vue';
// import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',

  components: {
    ReportTable,
  },

  data: () => ({
    //
  }),
}
</script>
