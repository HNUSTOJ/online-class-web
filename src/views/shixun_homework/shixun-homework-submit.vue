<template>
<div v-loading="loading" element-loading-text="代码提交中.....">
  <h1>问题{{$route.params.problemId}}:  {{$route.query.title}}</h1>
  <Submit :langmask="langmask"></Submit>
  <el-button type="primary" @click="submit">提交</el-button>
</div>
</template>

<script>
import Submit from "@/components/submit";
import {mapGetters} from "vuex";

export default {
  name: "shixun-homework-submit",
  components: {Submit},
  computed:{
    ...mapGetters({
      // langmask:'shixunStore/langmask'
    })
  },
  data(){
    return{
      langmask:this.$route.query.langmask,
      loading:false
    }
  },
  created() {
    this.$store.dispatch('shixunStore/getTrainingSubmitLanguage',{contest_id:this.$route.params.contestId}).then(res=>{
    })
  },
  methods:{
    submit(){
      let query={}
      query.code = JSON.parse(sessionStorage.getItem('solution')).code
      query.language = JSON.parse(sessionStorage.getItem('solution')).language
      query.problem_id = parseInt(this.$route.params.problemId)
      query.contest_id = parseInt(this.$route.params.contestId)
      query.num = parseInt(this.$route.query.num)
      //console.log(query)
      this.loading = true
      this.$store.dispatch('shixunStore/postTrainingSubmit',query).then(res=>{
        //console.log(res)
        if(res.code===200){
          this.$router.push({name:'shixun-homework-status'})
          this.$message.success('代码提交成功，请刷新查看结果！')
        }
        this.loading = false
      })
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
