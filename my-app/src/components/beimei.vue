<template>
  <div class="beimei" @touchend="scrollLoad">
      <div class="date">{{list.date}}<span v-show="show">/美元</span></div>
     <dl :key="index" v-for="(item,index) in list.subjects" >
        <dt>
            <router-link 
            :to="{name:'details_page',params:{id:item.subject.id}}" 
             @touchstart.native="sendData(item.subject.id)">
                <img :src=item.subject.images.large>
            </router-link>
        </dt>
        <dd>
            <p class="title">{{item.subject.title}}</p>
            <p class="rating">票房:${{Math.ceil(item.box/10000)+'万'}}</p>
        </dd>
    </dl> 
    <dl v-show="list.length%3">
        <dt></dt>
        <dd></dd>
    </dl>  
    <div class="loading" v-show="isloaded"></div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
// import Bus from '@/assets/bus'
Vue.use(VueJsonp)
    export default{
        name:'beimei',
        props:['comesoonid'],
        data() {
        return {
            list: [],
            start: 1,
            show:false,
            isloaded:true
        }
    },
    created: function () {
        this.getData();
    },
    methods: {
        getData() {
             this.isloaded = true;
            //  var num = (this.start-1)*20;
            Vue.jsonp('https://api.douban.com/v2/movie/us_box').then((data) => {
                // if(num>data.total){
                //     return
                // }
                 this.isloaded = false;
                this.list = data;
                this.show = true;
                console.log(data)
                //  return data
            })
        },
        scrollLoad() {
            var screenHeight = window.screen.height;
            var _this = this;

            if (screenHeight + document.body.scrollTop >= document.body.scrollHeight) {
                setTimeout(function () {
                    _this.start++
                    _this.getData();

                }, 1000)
            }

        },
         sendData(id) {
            this.$emit('createData', id)
        }
    }
    }
</script>
<style lang="less" scoped>
@r: 40rem;
.beimei {
    display: flex;
    display: -webkit-flex;
    width: 100%;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
     justify-content:space-between;
     -webkit-justify-content: space-between;
    padding:1%;
    box-sizing: border-box;
    .date{
        text-align: right;
        width:100%;
        box-sizing: border-box;
        padding-right:5/@r;
        font-size:26/@r;
        color:#666;
        height:50/@r;
        line-height:50/@r;
    }
    dl{
        margin: 0;
        width:49.5%;
    }
    dt,dd{
        margin: 0;
    }
    dt{
        
        height: 78%;
        overflow: hidden;
        
         img{
            width:100%;
         }
    }
    dd{
        text-align: center;
        font-size:30/@r;
        box-sizing: border-box;
        // padding:10/@r 0;
        p{
            margin: 0;
            padding:0;
        }
        .title{
            width:100%;
            text-overflow:ellipsis;
            white-space:nowrap;
            overflow:hidden;
        
        }
        .rating{
            font-size:20/@r;
            color:#555;
        }
    }
    .loading{
        width:124/@r;
        height:124/@r;
        background:url(../assets/load.gif) no-repeat center;
        background-size:124/@r 124/@r;
        position: fixed;
        left:0;
        top:0;
        bottom:0;
        right:0;
        margin: auto;
    }
}
</style>
