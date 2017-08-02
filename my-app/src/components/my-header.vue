<template>
    <div class="h-box">
        <h1>豆花影讯</h1>
        <input type="text" class="txt" v-model="val" placeholder="电影名称 | 导演 | 演员"/>
        <router-link 
        tag="button" 
        :to="{name:'search',params:{keyword:val}}"
        class="btn" 
        @touchstart.native="getVal">搜索</router-link> 
    </div>
</template>
<script>
// import Bus from '@/assets/bus'
// import router from 'vue-router'
export default {
    
    name: 'my-header',
    props:['aa'],
    data(){
        return {
            val:''
        }
    },
    methods:{
        getVal(){
            // Bus.$emit('abc',this.val)
            // console.log(this.val)
            // $router.go(0)
            this.$emit('handle',this.val)
        }
    }
}
</script>
<style lang="less">
@r:40rem;
.h-box {
    display: flex;
    width: 100%;
    height: 100/@r;
    background: #ED4040;
}

h1 {
    margin: 0;
    margin-left: 10/@r;
    margin-right:20/@r;
    color: #fff;
    font-size: 0;
    height: 100/@r;
    width:216/@r;
    background: url(../assets/logo.png) no-repeat left;
    background-size: 216/@r 54/@r;
}

.txt {
    height: 50/@r;
    width:280/@r;
    margin: auto 0;
    margin-right: 20/@r;
    border: none;
    border-radius: 10/@r;
    outline: none;
    font-size:24/@r;
    box-sizing:border-box;
    padding:0 15/@r;
    color:#666;
    line-height: 50/@r;
}
.btn{
    width:80/@r;
    height:50/@r;
    border:none;
    margin: auto 0;
    border-radius: 10/@r;
    outline: none;
}
</style>

