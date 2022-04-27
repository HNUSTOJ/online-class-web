<template>
<div>
  <h1>问题A:  寻找宝藏</h1>
  <Submit></Submit>
  <el-button type="primary" @click="submit">提交</el-button>
</div>
</template>

<script>
import Submit from "@/components/submit";
import router from "@/router";
export default {
  name: "shixun-homework-submit",
  components: {Submit},
  methods:{
    submit(){
      this.$router.push({name:'shixun-homework-status'})
    }
  }
}
</script>

<style scoped>
h1{
  text-align: center;
  color: #9799ca;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
