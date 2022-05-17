<template>
<el-card>
  <Problem :problem="problem" :problemId="problemId"></Problem>
  <el-button icon="el-icon-s-promotion" round @click="submit" style="margin-top: 15px">提交</el-button>
</el-card>
</template>

<script>
import Problem from "@/components/problem";
import {mapGetters} from "vuex";

export default {
  name: "shixun-homework-problem",
  components: {Problem},
  data(){
    return{
      problemId:this.$route.params.problemId,
    }
  },
  computed:{
    ...mapGetters({
      problem:'shixunStore/problem'
    })
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      this.$store.dispatch('shixunStore/getTrainingProblem',{id:parseInt(this.$route.params.problemId)}).then(res=>{})
    },
    submit(){
      this.$router.push({name:'shixun-homework-submit'})
    }
  }
}
</script>

<style scoped>

</style>
