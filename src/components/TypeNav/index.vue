<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                @mouseenter="changeIndex(index)"
                v-for="(c1, index) in categoryList"
                :key="c1.id"
                :class="{ cur: currentIndex == index }"
                class="item"
              >
                <h3>
                  <!-- <a href="">{{ c1.categoryName }}-{{ index }}</a> -->
                  <!-- 利用router-link路由组件，服务器的数据返回之后，会大量的销毁与创建，导致卡顿 -->
                  <!-- <router-link to="/search">{{ c1.categoryName }}-{{ index }}</router-link> -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}-{{ index }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                    class="subitem"
                  >
                    <dl class="fore">
                      <dt>
                        <!-- <a href="">{{ c2.categoryName }}</a> -->
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}-{{ index }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <!-- <a href="">{{ c3.categoryName }}</a> -->
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}-{{ index }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from 'lodash'//全部引入
import throttle from "lodash/throttle"; //按需加载,默认暴露，不需要引号
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList,
    }),
  },
  methods: {
    //鼠标事件，修改响应式数据currentIndex----需要优化
    // changeIndex(index) {
    //   console.log('鼠标进入',index);
    //   this.currentIndex = index;
    // },

    //节流---不要使用箭头函数
    changeIndex: throttle(function (index) {
      // console.log("鼠标进入", index);
      this.currentIndex = index;
    }, 50),

    enterShow() {
      if (this.$route.name == "search") {
        this.show = true;
      }
    },
    leaveShow() {
      if (this.$route.name == "home") {
        this.currentIndex = -1;
      } else {
        this.currentIndex = -1;
        this.show = false;
      }
    },

    //编程式导航与事件委派(就近的父元素) 实现路由跳转
    goSearch(event) {
      //  获取a标签  一级二级三级标签-自定义属性
      //利用event获取当前触发事件的节点--h3,a,dt,dl,em,
      //dataset获取节点的自定义属性
      //参数传递
      // console.log(event.target.dataset);//对象
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset; //对象解构
      // console.log(categoryname);
      if (categoryname) {
        //整理路由跳转参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // console.log(location, query);//两个对象

        //判断是否有params参数
        if (this.$route.params) {
          //合并参数
          location.params = this.$route.params;
          location.query = query;

          //路由跳转
          this.$router.push(location);
        }
      }
    },
  },
  //组件挂在完毕时发送请求
  mounted() {
    //通知vuex发送请求，获取并存储数据
    // this.$store.dispatch("categoryList");//每次切换都发送，放到App根组件
    // console.log('发送请求');
    // 组件在搜索页面挂载完毕show:false
    if (this.$route.name !== "home") {
      this.show = false;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: none;
            }
          }
        }
        .cur {
          background-color: #ccc;
        }
      }
    }
    // 过渡动画开始（进入）
    .sort-enter {
      height: 0;
      // transform: rotate(0);
    }
    //过渡动画结束（进入）
    .sort-enter-to {
      height: 461px;
      // transform: rotate(360deg);
    }
    //过渡动画时间，速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
    // 过渡动画开始（离开）
    .sort-leave {
      height: 461px;
      // transform: rotate(0);
    }
    //过渡动画开始（离开）
    .sort-leave-to {
      height: 0;
      // transform: rotate(360deg);
    }
    //过渡动画时间，速率
    .sort-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>