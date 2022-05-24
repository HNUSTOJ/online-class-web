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
      <span class="container-span">基于HNUSTOJ的在线实训课堂</span>
    </div>


    <el-dropdown style="width: 150px; cursor: pointer; text-align: right" trigger="click">
      <span class="el-dropdown-link" v-if="isLogin">{{ username }}<i class="el-icon-arrow-down el-icon--right"></i></span>
      <span class="el-dropdown-link" v-else>登 录<i class="el-icon-arrow-down el-icon--right"></i></span>
      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
        <el-dropdown-item style="font-size: 14px; padding: 5px 0" v-if="!isLogin">
          <span style="text-decoration: none" @click="login">登 录</span>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <span style="text-decoration: none" @click="logout">退 出</span>
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
</style>


