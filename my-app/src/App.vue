<template>
  <div id="app">
     <my-header :aa="keyword" v-on:handle="fn"></my-header>
    <my-nav></my-nav> 
    <router-view 
    :bb="keyword" 
    :comesoonid="comeId"
     v-on:createData="getId" 
     ></router-view>
  </div>
</template>

<script>
import myHeader from '@/components/my-header'
import myNav from '@/components/my-nav'
// import Hot from '@/components/hot'
export default {
  name: 'app',
  data(){
    return {
      keyword:'',
      comeId:''
    }
  },
  components:{myHeader,myNav},
  methods:{
    fn(i){
      this.keyword = i;
      // console.log(this.keyword+'apptanchu')
    },
    getId(id){
      this.comeId = id;
      console.log(this.comeId)
    }
  }
}
</script>

<style>

</style>
