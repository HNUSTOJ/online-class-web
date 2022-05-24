<template>
<div>
  <h3 class="text-primary">
    <div class="cont" v-html="jobContent"></div>
  </h3>
  <div v-for="item in fileList">
    <div style="cursor: pointer" @click="download(item.url)">
      <el-button icon="el-icon-paperclip" type="text" class="fujian"></el-button>
      <span class="span-1">{{item.name}}</span>
    </div>
  </div>
  <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :with-credentials="true"
      :limit="limit"
      :on-exceed="handleExceed"
      :http-request="httpRequest"
      :auto-upload="false"
      style="margin-top: 30px">
    <el-button slot="trigger" size="small">添加文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submit" v-if="list[0].judge===0">上传文件</el-button>
  </el-upload>
  <span style="font-size: 12px" v-if="list[0].state===0">(单个文件最大50MB)</span>
  <span style="font-size: 12px"v-if="list[0].state===1&&list[0].judge===0">(继续上传将会覆盖已上传的文件。)</span>
  <span style="font-size: 12px"v-if="list[0].state===0&&list[0].judge===1">(老师已批阅，请勿再次上传。)</span>
</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "info-des",
  computed:{
    ...mapGetters({
      jobContent:'commonStore/jobContent',
      list:'commonStore/submitList',
      fileList:'commonStore/fileList'
    })
  },
  data(){
    return{
      limit:1,
      query:{}
    }
  },
  created() {

    this.$store.dispatch('commonStore/getCommonInfo',{job_id:parseInt(this.$route.params.commonId)}).then(res=>{
      this.load()
    })
  },
  methods:{
    httpRequest(param) {
      let fileObj = param.file // 相当于input里取得的files
      const size = fileObj.size/1024/1024
      if(size>50){
        this.$notify.warning({
          title:'警告',
          message:'大小必须小于50M'
        })
        return;
      }
      let fd = new FormData()// FormData 对象
      fd.append('file', fileObj)// 文件对象
      this.fileData = {course_id:parseInt(this.$route.params.courseId ),job_id:parseInt(this.$route.params.commonId),file:fd}
      this.$store.dispatch('commonStore/postCommonUpload',this.fileData).then(res=>{
        if(res.code === 200){
          this.$message.success('上传报告成功！')
          sessionStorage.setItem('common-info-activeName','common-stu-sub')
          this.$router.push({name:'common-stu-sub'})
          location.reload()
        }else{
          this.$message.warning(res)
        }
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    submit(){
      this.$refs.upload.submit();
    },
    load(){
      this.query.job_id = this.$route.params.commonId
      this.query.page = 1
      this.query.state = -1
      this.query.class_id = [1]
      let _this = this
      this.$store.dispatch('commonStore/getCommonSubmitInfo',this.query).then(res=>{
      })
    },
    download(url){
      console.log(url)
      this.$message.success('正在下载文件，请稍等。')
      this.$store.dispatch('fileStore/getFileDownload',{url:encodeURIComponent(url)}).then(res=>{
        const link=document.createElement('a');
        try{
          let blob =  res
          let _fileName = url.substr(url.lastIndexOf('/')+1,url.length)
          link.style.display='none';
          const urls = window.URL || window.webkitURL || window.moxURL;// 兼容不同浏览器的URL对象
          link.href=urls.createObjectURL(blob);
          link.download = _fileName;
          link.click();
          window.URL.revokeObjectURL(urls);
        }catch (e) {
          this.$message.error('下载文件出错,'+e)
        }
      }).catch(()=>{
        this.$message.error('下载文件出错！')
      })
    }
  }
}
</script>

<style scoped>
h3{
  padding: 10px 0;
}
</style>
