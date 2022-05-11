<template>
  <div class="container-div">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="'/'">首 页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-image
          style="width: 30px; height: 30px;display:inline-block;vertical-align:-8px;margin-right: 6px;"
          :src="require('../assets/logo.png')"
          fit="fill"></el-image>
      <span class="container-span">湖南科技大学在线实训课堂</span>
    </div>


    <el-dropdown>
      <div style="display: inline-block">
        <span v-if="isLogin">{{ username }}</span>
        <span v-else>登 录</span>
        <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item style="padding: 5px 0" v-if="!isLogin">
          <span class="el-dropdown-item-span" @click="login">登 录</span>
        </el-dropdown-item>
        <el-dropdown-item style="padding: 5px 0">
          <span class="el-dropdown-item-span" @click="logout">退 出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NavMenu",
  data(){
    return{
    }
  },
  computed:{
    ...mapGetters({
      username:'loginStore/username',
      isLogin:'loginStore/isLogin'
    })
  },
  methods: {
    logout() {
      this.$router.push({name:'Home'})
      localStorage.clear()
      location.reload()
    },
    login(){
      this.$store.commit('loginStore/triggerLogin')
    }
  }
}
</script>

<style scoped>
.container-div{
  line-height: 60px;
  height: 60px;
  display: flex;
  justify-content: space-between;
}
.container-span{
  /*width: 56%;*/
  font-size: 20px;
  font-weight: bold;
}
.el-breadcrumb{
  display: inline-block;
  margin-left: 10px;
}
.el-dropdown{
  width: 70px;
  cursor: pointer;
  /*text-align: right;*/
}
.el-dropdown-menu{
  width: 100px;
  text-align: center;
}
.el-dropdown-item-span{
  text-decoration: none;
  font-size: 15px;
}
</style>


