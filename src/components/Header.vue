<template>
  <div style="line-height: 60px; display: flex">
    <div style="flex: 1;">
      <span :class="collapseBtnClass" style="cursor: pointer;font-size: 18px" @click="collapse"></span>

      <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
        <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dropdown style="width: 150px; cursor: pointer; text-align: right" trigger="click">
<!--      <div style="display: inline-block">-->
<!--        <span>{{ username }}</span>-->
<!--        <i class="el-icon-arrow-down" style="margin-left: 5px"></i>-->
<!--      </div>-->
      <span class="el-dropdown-link">
        {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
        <el-dropdown-item style="font-size: 14px; padding: 10px 0">
          <span style="text-decoration: none" @click="logout">退 出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>


  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Header",
  props: {
    collapseBtnClass: String
  },
  watch:{
    '$route':function (){
      this.currentPathName = localStorage.getItem("currentPathName")
    }
  },
  computed:{
    ...mapGetters({
      username:'loginStore/username'
    })
  },
  created() {
    this.currentPathName = localStorage.getItem("currentPathName")
  },
  data() {
    return {
      currentPathName: '',
    }
  },
  methods: {
    collapse() {
      this.$emit("asideCollapse")
    },
    logout() {
      this.$router.push({name:'Home'})
      localStorage.clear()
      location.reload()
    }
  }
}
</script>

<style scoped>

</style>
