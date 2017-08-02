<template>
    <!-- @touchstart="start" @touchend="end" -->
    <div class="details">
        <div class="con-bg" @touchstart="start" @touchend="end">
            <p class="title">{{list.title}}</p>
            <dl>
                <dt>
                    <img :src="list.images.large" />
                </dt>
                <dd>
    
                    <p class="directors">导演：
                        <span :key="index" v-for="(item,index) in list.directors">{{item.name}}</span>
                    </p>
                    <p class="genres">
                        <span :key="index" v-for="(item,index) in list.genres">{{item}}&nbsp;</span>
                    </p>
                    <p>
                        <span :key="index" v-for="(item,index) in list.countries">{{item}} | </span>
                        <span>{{list.year}}</span>
                    </p>
                    <p>
                        <span>用户评分：{{list.rating.average}}</span>
                    </p>
                    <p>
                        <span>评分人数：{{list.ratings_count}}人</span>
                    </p>
                    <p>
                        <span>想看人数：{{list.wish_count}}人</span>
                    </p>
                    <p>
                        <span>看过人数：{{list.collect_count}}人</span>
                    </p>
                </dd>
            </dl>
        </div>
        <p class="zhu">一主要演员一</p>
        <div class="casts">
            <dl :key="index" v-for="(item,index) in list.casts" class="castts-dl">
                <dt>
                    <img :src=item.avatars.large>
                </dt>
                <dd>{{item.name}}</dd>
            </dl>
        </div>
        <p class="zhu">一影片简介一</p>
         <div class="summary">
            <p>{{cut}}</p>
        </div>
        <div class="loading" v-show="isloaded"></div>
    </div>
</template>
<script>

import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
//import Bus from '@/assets/bus'
Vue.use(VueJsonp)
export default {
    name: 'details_page',
    props: ['comesoonid'],
    data() {
        return {
            isloaded: true,
            old: 0,
            //id: 0,
            list: {
                images: {
                    large: ''
                },
                rating: {
                    average: 0
                },
                summary: ''
            }
        }
    },
    computed: {
        cut() {
            return this.list.summary;
        }
    },
    created() {
        // var _this = this;
        // Bus.$on('createData', function (id) {
        // _this.id = id;
        //  _this.getData();
        // console.log(id)
        // })
        this.getData()
    },
    methods: {
        getData() {
            this.isloaded = true;
            Vue.jsonp('https://api.douban.com/v2/movie/subject/' + this.comesoonid).then((data) => {
                this.isloaded = false;
                this.list = data;
                console.log(this.list)

            })
        },
        start(ev) {
            this.old = ev.touches[0].pageX
        },
        end(ev) {
            if (ev.changedTouches[0].pageX > this.old + 100) {
                history.go(-1)
            }
        }
    }
}
</script>
<style lang="less" scoped>
@r: 40rem;
.details {
    .con-bg {
        display: flex;
        display: -webkit-flex;
        width: 100%;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        flex-direction:column;
        box-sizing: border-box;
        
        background: #634948;
        .title {
            font-size: 100%;
            margin: 0;
            color: #FFFBF6;
            width:100%;
            padding: 1% 0 1% 5%; 
            box-sizing: border-box;
        }
        dl,
        dt,
        dd {
            margin: 0;
            padding: 0;
        }
        dl {
            display: flex;
            box-sizing: border-box;
            padding-left:5%;
        }
        dt {
            width: 40%;
            overflow:hidden;
            margin-right:2%;
            img {
                width: 100%;
            }
        }
        dd {
            p {
                margin: 0;
                color: #FFFBF6;
                font-size: 24/@r;
            }
        }
    }
    .summary {
        p {
            margin: 0;
            font-size: 30/@r;
            color: #000;
            display: flex;
            box-sizing: border-box;
            padding: 24/@r 20/@r;
        }
    }
    .zhu {
        margin: 0;
        text-align: center;
        box-sizing: border-box;
        padding: 10/@r;
        background: #fff;
        font-size: 30/@r;
        width: 100%;
        font-weight: bold;
    }
    .casts {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        padding: 2%;
        overflow-x: auto;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        .castts-dl {
            font-size: 20/@r;
            text-align: center;
            margin: 0;
            padding: 1%;
            width:100%;
            dt,
            dd {
                margin: 0;
            }
            dt {
                width:100%;
                height:210/@r;
                img {
                    width:100%;
                }
            }
            dd {
                line-height: 60/@r;
            }
        }
    }
    .loading {
        width: 124/@r;
        height: 124/@r;
        background: url(../assets/load.gif) no-repeat center;
        background-size: 124/@r 124/@r;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
}
</style>

