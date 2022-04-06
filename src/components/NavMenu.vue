<template>
  <div class="container-div">
    <div style="width: 50%">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <span class="container-span">欢迎来到湖南科技大学教学课堂</span>

    <el-dropdown>
      <div style="display: inline-block">
        <span>登录</span>
        <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item style="padding: 5px 0">
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
export default {
  name: "NavMenu",
  methods: {
    logout() {
      this.$message.success("退出成功")
    },
    login(){
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
.container-div{
  line-height: 60px;
  display: flex;
}
.container-span{
  width: 56%;
  font-size: 20px;
  font-weight: bold;
}
.el-breadcrumb{
  display: inline-block;
  margin-left: 10px;
}
.el-dropdown{
  width: 150px;
  cursor: pointer;
  text-align: right;
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
