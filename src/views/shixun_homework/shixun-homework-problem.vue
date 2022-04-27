<template>
<el-card>
  <Problem></Problem>
  <el-button icon="el-icon-s-promotion" round @click="submit">提交</el-button>
</el-card>
</template>

<script>
import router from "@/router";
import Problem from "@/components/problem";

export default {
  name: "shixun-homework-problem",
  components: {Problem},
  methods:{
    submit(){
      this.$router.push({name:'shixun-homework-submit'})
    }
  }
}
</script>

<style scoped>

</style>
