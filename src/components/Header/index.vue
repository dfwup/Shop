<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <!-- <a href="###">登录</a> -->
            <!-- <a href="###" class="register">免费注册</a> -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <a >{{userName}}</a>
            <a class="register"  @click="userLogout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/cart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
                        <img src="./images/logo.png" alt="">
                    </a> -->
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            v-model="keyword"
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
          />
          <button
            @click="goSearch"
            class="sui-btn btn-xlarge btn-danger"
            type="button"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  computed:{
    userName(){
      
      return this.$store.state.user.userInfo.name;
    }
  },
  methods: {
    goSearch() {
      //路由传参
      //字符串
      // this.$router.push(
      //   "/search/" + this.keyword + "?k=" + this.keyword.toUpperCase()
      // );
      //模版字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      //对象写法
      // this.$router.push({
      //   name: "search",
      //   params: {
      //     keyword: this.keyword,
      //   },
      //   query: {
      //     k: this.keyword.toUpperCase(),
      //   },
      // });
      // 路由传递参数有关面试题
      //  路由传递参数（对象写法）path是否可以结合params参数一起使用
      // 会导致不能跳转路由，params参数不能接受，query参数可以接受
      // this.$router.push({
      //   name: "search",
      //   // path: "/search",
      //   // params: {
      //   //   keyword:this.keyword
      //   // },
      //   params: {
      //     keyword: ""||undefined,
      //   },
      //   query: {
      //     k: this.keyword.toUpperCase(),
      //   },
      // });

      //params占位不传参数或者传空字符串，URL路径会出问题，页面会跳转
      // 正常路径http://localhost:8080/#/search/aaa?k=AAA
      //不传params路径 http://localhost:8080/#/?k=AAA
      //params占位不传参数，可以在路由配置占位符后面加一个问号(正则表达式)
      // path: '/search/:keyword?'
      //但是如果传递是空串，需要用undefined
      // keyword: ""||undefined,

      //  路由组件传递props数据
      if (this.$route.query) {
        let location = {name: "search", params: { keyword: this.keyword || undefined }}
        location.query = this.$route.query,
        this.$router.push(location)
      }
      // this.$router.push(
      //   {
      //     name: "search",
      //     params: {
      //       keyword: this.keyword||undefined,
      //     },
      //     query: {
      // k: this.keyword.toUpperCase(),
      //     },
      //   },
      // () => {},
      // (error) => {console.log(error);}
      // );
      // console.log(this);
      // console.log(this.$router);
    },
   async userLogout(){
     try {
      await  this.$store.dispatch('userLogout')
      this.$router.push('/home')
     } catch (error) {
       error.message
     }
    }
  },
  mounted(){
    this.$bus.$on('clearKeyword',()=>{
      this.keyword=''
    })
  }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>