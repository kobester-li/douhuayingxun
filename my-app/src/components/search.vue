<template>
    <div class="search" @touchend="scrollLoad">
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
        <dl v-show="list.length%3">
            <dt></dt>
            <dd></dd>
        </dl>
        <div class="loading" v-show="isloaded"></div>
    </div>
</template>
<script>
// import Bus from '@/assets/bus'
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
export default {
    name: 'search',
    props:['bb','comesoonid'],
    data() {
        return {
            // keyword:this.bb,
            list: [],
            start: 1,
            isloaded:true
        }
    },
    watch:{
       '$route'(){
        this.getData();
     }
       
    },
    created() {
        this.getData()
        
    },
    methods: {
        getData() {
            this.isloaded = true;
            var num = (this.start - 1) * 20;
            Vue.jsonp('https://api.douban.com/v2/movie/search?q=' + this.bb + '&start=' + num)
            .then((data) => {
                console.log(data)
                this.isloaded = false;
                if (num > data.total) {
                    return
                }
                if(data.subjects.length){
                     this.list = data.subjects;  
                     
                }else{
                    alert('您搜索的电影不存在')
                }
               
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        scrollLoad() {
            var screenHeight = window.screen.height;
            var _this = this;
            
            if (screenHeight + document.body.scrollTop >= document.body.scrollHeight) {
                setTimeout(function () {
                    _this.start++
                    _this.getData();
                }, 500)
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
.search {
    display: flex;
    display: -webkit-flex;
    width: 100%;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    padding:1%;
    justify-content:space-between;
     -webkit-justify-content: space-between;
    box-sizing: border-box;
    dl {
        margin: 0;
        width:49.5%;
    }
    dt,
    dd {
        margin: 0;
    }
    dt {

        height: 78%;
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
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
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

