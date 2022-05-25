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
      problem:'shixunStore/problem',
      langmask:'shixunStore/langmask'
    })
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      this.$store.dispatch('shixunStore/getTrainingProblem',{id:parseInt(this.$route.params.problemId),contest_id:parseInt(this.$route.params.contestId)}).then(res=>{
        if(res.code===-4){
          this.$router.push({name:'shixun-homework-info'})
          this.$message.error('题目未在该实训作业内部！')
        }
      })
    },
    submit(){
      // this.$router.push({name:'shixun-homework-submit',params:{problemId:this.$route.params.problemId}})
      this.$store.dispatch('shixunStore/getTrainingSubmitLanguage',{contest_id:this.$route.params.contestId}).then(res=>{
        if(res.code===200){
          this.$router.push({name:'shixun-homework-submit',query:{num:this.$route.query.num,title:this.problem.title,langmask:JSON.stringify(this.langmask)}})
        }else{
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
