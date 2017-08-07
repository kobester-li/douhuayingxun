<template>
    <div class="comesoon" @touchend="scrollLoad">
        <dl :key="index" v-for="(item,index) in list">
            <dt>
                <router-link 
                :to="{name:'details_page',params:{id:item.id}}" 
                @touchstart.native="sendData(item.id)">            
                    <img :src=item.images.large>
                </router-link>
            </dt>
            <dd>
                <p class="title">{{item.title}}</p>
                <p class="rating">评分:{{item.rating.average}}</p>
            </dd>
        </dl>
        <!-- <dl v-show="list.length%3">
            <dt></dt>
            <dd></dd>
        </dl> -->
         <div class="loading" v-show="isloaded"></div>

    </div>
</template>
<script>
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
// import Bus from '@/assets/bus'
Vue.use(VueJsonp)
export default {
    name: 'comesoon',
    props:['comesoonid'],
    data() {
        return {
            list: [],   //
            start: 1,    //开始的页数
            isloaded:true
        }
    },
    created () {
        this.getData();
    },
    methods: {
        getData() {
            this.isloaded = true;
            var _this = this;
            var num = (this.start - 1) * 20;
            Vue.jsonp('https://api.douban.com/v2/movie/coming_soon?start=' + num).then((data) => {
                 this.isloaded = false;
                if (num > data.total) {
                    return
                }
                
                data.subjects.forEach(function(ele) {
                     _this.list.push(ele)
                });
                   console.log(data.subjects)
                // this.list = data.subjects;
                
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
            //  Bus.$emit('createData',id)
        }
    }
}
</script>
<style lang="less" scoped>
@r: 40rem;
.comesoon {
    display: flex;
    display: -webkit-flex;
    width: 100%;
    flex-wrap: wrap;
     -webkit-flex-wrap: wrap;
    box-sizing: border-box;
    justify-content:space-between;
     -webkit-justify-content: space-between;
    // align-items:center;
    padding:1%;
    dl{
        width:49.5%;
    }
    dl,dt,
    dd {
        margin: 0;
    }
    dt {
        height: 400/@r;
        overflow: hidden;
        img {
            width:100%;
        }
    }
    dd {
        text-align: center;
        font-size: 30/@r;
        box-sizing: border-box;
        // padding: 10/@r 0;
        p {
            margin: 0;
            padding: 0; 
        }
        .title {
            width:100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            // margin-top:7%;
        }
        .rating {
            font-size: 20/@r;
            color: #555;
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

