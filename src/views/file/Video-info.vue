<template>
  <div>
    <el-card style="min-height: 80vh">
      <div class="el-card-div" style="margin-bottom: 30px">
        <el-page-header @back="goBack" :content="title"></el-page-header>
      </div>
      <div id="vue-core-video-player-box" class="example-player">
        <vue-core-video-player :src="source" class="video-player vjs-custom-skin" :autoplay="false"></vue-core-video-player>
      </div>
      <el-button icon="el-icon-download" @click="download" style="margin-top: 15px" v-if="private==='1'" v-loading="loading" element-loading-text="文件下载中.....">视频资源下载</el-button>
    </el-card>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "Video-info",
  data(){
    return{
      source:'',
      title:'',
      private:'',
      loading:false
    }
  },
  created() {
    this.source = 'http://192.168.0.123:8848/file/download/video?url='+this.$route.query.source
    this.title = this.$route.query.title
    this.private = this.$route.query.private
  },
  methods:{
    goBack(){
      this.$router.push({name:'video'})
    },
    download(){
      this.loading = true
      let url = sessionStorage.getItem('videoUrl')
      this.$store.dispatch('fileStore/getFileDownload',{url:url}).then(res=>{
        const link=document.createElement('a');
        try{
          let blob =  res
          let _fileName = url.substr(url.lastIndexOf('/')+1,url.length)
          link.style.display='none';
          // 兼容不同浏览器的URL对象
          const urls = window.URL || window.webkitURL || window.moxURL;
          link.href=urls.createObjectURL(blob);
          link.download = _fileName;
          link.click();
          window.URL.revokeObjectURL(urls);
        }catch (e) {
          this.$message.error('下载文件出错,'+e)
        }
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.example-player {
  position: relative;
  height: 410px;
  background-color: #000;
  font-weight: normal;

}
</style>
