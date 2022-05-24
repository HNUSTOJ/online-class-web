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
</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "common-homework-des",
  computed:{
    ...mapGetters({
      jobContent:'commonStore/jobContent',
      fileList:'commonStore/fileList'
    })
  },
  data(){
    return{
    }
  },
  created() {
    this.$store.dispatch('commonStore/getCommonInfo',{job_id:parseInt(this.$route.params.commonId)}).then(res=>{
      //console.log(res)
    })
  },
  methods:{
    download(url){
      console.log(url)
      this.$message.success('正在下载文件，请稍等。')
      this.$store.dispatch('commonStore/getFileDownloadJob',{url:url}).then(res=>{
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
.cont{
  margin-top: 10px;
  margin-bottom: 20px;
}

.fujian {
  color: #028d01 !important;
  font-size: 14px !important;
}
.span-1 {
  margin-left: 10px !important;
  color: #000;
}
</style>
