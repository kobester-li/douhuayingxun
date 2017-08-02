<template>
    <div class="hot" @touchend="scrollLoad">
        <dl :key="index" v-for="(item,index) in list">
            <dt>
                <router-link 
                :to="{name:'details_page',params:{id:item.id}}" 
                @touchstart.native="sendData(item.id)">
                <img :src=item.images.large />
                </router-link>
            </dt>
            <dd>
                <div class="content">
                    <p class="title">{{item.title}}</p>
                    <p class="original_title">原名:{{item.original_title}}</p>
                    <p class="rating">豆瓣评分:{{item.rating.average}}分&nbsp;&nbsp;(已有{{item.collect_count}}人评价)</p>
                    <p>导演:
                        <span :key=index v-for="(it,index) in item.directors">{{item.directors.length>1?it.name+'/':it.name}}</span>
                    </p>
                    <p>主演:
                        <span :key=index v-for="(i,index) in item.casts">{{item.casts.length>1?i.name+'/':i.name}}</span>
                    </p>
                    <p>类型:
                        <span :key=index v-for="(it,index) in item.genres">{{item.genres.length>1?it+'/':it}}</span>
                    </p>
                    <p>年份:{{item.year}}</p>
                </div>
            </dd>
        </dl>
        <div class="loading" v-show="isloaded"></div>
    </div>
</template>
<script>
import Vue from 'vue'
import Vuejsonp from 'vue-jsonp'
export default {
    name: 'hot',
    props:['comesoonid'],
    data() {
        return {
            list: [],
            start: 1,
            // show:false
             isloaded:true
        }
    },
    created: function () {
        
        this.getData();
       
    },
    methods: {
        getData() {
            this.isloaded = true;
            // this.show = true;
            var num = (this.start - 1) * 20;
            Vue.jsonp('https://api.douban.com/v2/movie/in_theaters?start=' + num).then((data) => {
                this.isloaded = false;
                if (num > data.total) {
                    return
                }
                this.list = data.subjects;
                // this.show = false
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
            //  Bus.$emit('createData',id)
        }

    }
}
</script>
<style lang="less" scoped>
@r: 40rem;
.hot {
    background: #F9F9F9;
    width: 100%;
    padding: 1%;
    box-sizing: border-box;
    dl {
        width: 100%;
        display: flex;
        margin: 0;
        background: #fff;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        padding: 2%;
        margin-bottom: 2%;
        dt,
        dd {
            margin: 0;
        }
        dt {
            width: 80%;
            margin-bottom: -2%;
            img {
               width:100%;
            }
        }
        dd {
            display: flex;
            width: 100%; 
            padding-left:2%;
            box-sizing: border-box;
            flex-direction:column;
             -webkit-flex-direction: column;
            .content{
                margin: auto 0;
            }
            p {
                width: 100%;
                margin: 0;
                font-size: 20/@r;
                color:#666;
            }
            .title,
            .original_title {
                font-size: 70%;

                color:#1E90FF;
            }
            .original_title{
                font-size:60%;
                margin-bottom: 4%;
            }
            .rating {
                margin-bottom: 5%;
            }
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
    
//     .v-enter-active, .v-leave-active {
//         transition:1s
//     }
//     .v-enter-active,.v-leave{
//     opacity: 1;
// }
// .v-enter,.v-leave-active {
//   opacity: 0;
// }
    
    // padding-top: 5/@r;
    // dl{
    //     margin: 0;
    //     width:312/@r;
    //     margin-right:5/@r;
    // }
    // dt,dd{
    //     margin: 0;
    //     // flex:1;
    // }
    // dt{
    //     // width:100%;
    //     overflow: hidden;
    //     text-align: center; 
    //     display: flex;
    //      img{
    //          flex:1;
    //          width:320/@r;
    //          height:444/@r;
    //      }
    // }
    // dd{
    //     text-align: center;
    //     font-size:30/@r;
    //     box-sizing: border-box;
    //     padding:10/@r 0;
    //     // 
    //     p{
    //         margin: 0;
    //         padding:0;
    //     }
    //     .title{
    //         text-overflow:ellipsis;
    //         white-space:nowrap;
    //         overflow:hidden;
    //     }
    //     .rating{
    //         font-size:20/@r;
    //         color:#555;
    //     }
    // }
}
</style>

