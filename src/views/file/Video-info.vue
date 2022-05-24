<template>
  <div>
    <el-card>
      <div class="el-card-div" style="margin-bottom: 30px">
        <el-page-header @back="goBack" :content="title"></el-page-header>
      </div>
      <div id="vue-core-video-player-box" class="example-player">
        <vue-core-video-player :src="source" class="video-player vjs-custom-skin" :autoplay="false"></vue-core-video-player>
      </div>
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
      headers:{
        'token':localStorage.getItem('token')
      }
    }
  },
  created() {
    //this.source = 'http://152.136.122.135:8848/file/download?url='+this.$route.query.source
    this.title = this.$route.query.title

    // 通过图片地址获取图片，从新获取图片
    var config = {
      method: "get",
      responseType: "blob",
      url: 'http://152.136.122.135:8848/file/download?url='+this.$route.query.source,
      headers: {token:localStorage.getItem('token')}
    };
    // 重新获取请求，获取的是base64位的图片
    axios(config).then((response) => {
      this.source = URL.createObjectURL(response.data)
      console.log(response)
    });
  },
  methods:{
    goBack(){
      this.$router.push({name:'video'})
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
