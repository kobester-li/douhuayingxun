<template>
    <div class="nav-box">
        
        <router-link tag="a" to="/" exact><a>正在热映</a></router-link>
        <router-link tag="a" to="/comesoon"><a>即将上映</a></router-link>
        <router-link tag="a" to="/beimei"><a>北美票房榜</a></router-link>
        <router-link tag="a" to="/top250"><a>Top250</a></router-link>        
       <!-- <a href="#" v-for="item in nav">{{item}}</a> -->
      
    </div>
</template>
<script>

    export default{
        name:'my-nav'
    }
</script>
<style lang="less" >
@r:40rem;
    .nav-box{
        display: flex;
        min-width:100%;  
        min-height: 64/@r;
        background:#eeeeee;

    }
   .nav-box a{
       display: block;
       flex: 1;
       text-align: center;
       min-height: 64/@r;
       line-height: 64/@r;
       text-decoration: none;
       color: #666;
       font-size:30/@r;
    //    margin:0 10/@r;
   }
   .router-link-active a{
       color:red;
   }
</style>

