<template>
<div>
  <el-form label-width="80px" size="small">
    <el-form-item label="发布时间:">
      <el-date-picker disabled v-model="value1" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="截止时间:">
      <el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
    </el-form-item>
<!--    <el-form-item label="发布设置:">-->
<!--      <el-radio v-model="radio" label="1" disabled>统一发布</el-radio>-->
<!--      <el-radio v-model="radio" label="2" disabled>分班发布</el-radio>-->
<!--    </el-form-item>-->
  </el-form>
  <div style="margin-top: 15px">
    <el-button type="primary" @click="edit">确认修改</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: "common-homework-set",
  data(){
    return{
      value1: sessionStorage.getItem('common_startTime'),
      value2: '',
    }
  },
  methods:{
    edit(){
      if(this.value2){
        let date1 = new Date(this.value1)
        let date2 = new Date(this.value2)
        if(date2 > date1){
          this.$store.dispatch('commonStore/postCommonEdit',{job_id:parseInt(this.$route.params.commonId),end_time:this.value2}).then(res=>{
            if(res.code===200){
              this.$message.success('修改成功！')
            }else{
              this.$message.error(res.msg)
            }
          })
        }else{
         this.$message.warning('截止时间应晚于开始时间！')
        }
      }else{
        this.$message.warning('请输入截止时间！')
      }
    }
  }
}
</script>

<style scoped>

</style>
