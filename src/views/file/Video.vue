<template>
<div>
  <div style="padding: 10px 0;display: flex;justify-content: space-between">
    <el-input style="width: 300px" placeholder="请输入文件名" v-model="input">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-button icon="el-icon-plus" style="margin-left: 5px" @click="upload" v-if="permissions==='1'"></el-button>
  </div>
  <el-card>

    <el-row>
      <el-col :span="6" class="play-list" v-for="movie in list">
        <MovieItem :key="movie.url" :item="movie" @click="open($event)" :load="load"></MovieItem>
      </el-col>
    </el-row>
    <div>
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </el-card>
  <el-dialog title="上传视频" :visible.sync="dialog" width="30%" :before-close="close">
    <el-form label-width="110px" size="small" :model="fileForm" ref="fileForm" v-loading="loading" element-loading-text="文件上传中.....">
      <el-form-item label="文件命名：" prop="fileName">
        <el-input placeholder="请输入文件名" v-model="fileForm.fileName"></el-input>
      </el-form-item>
      <el-form-item label="文件下载：" prop="download">
        <el-switch v-model="fileForm.private" active-color="#C0CCDA" inactive-color="#13ce66" active-value="0" inactive-value="1"></el-switch>
        <span style="font-size: 12px">（开启后不允许用户在线下载，默认开启）</span>
      </el-form-item>
      <el-upload
          class="upload-demo"
          drag
          ref="upload"
          multiple
          action=""
          accept=".mp4,.mkv,.mov"
          :with-credentials="true"
          :http-request="httpRequest"
          :on-exceed="handleExceed"
          :limit="limit"
          :auto-upload="false"
          style="text-align: center">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text" style="">
          <em>点击上传</em>
          (支持上传mp4，mkv，mov等视频文件)
        </div>
      </el-upload>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="uploadFile">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import DATA from "@/assets/data";
import MovieItem from './MovieItem.vue'
import {mapGetters} from "vuex";

export default {
  name: "File-category",
  components:{
    MovieItem,
  },
  computed:{
    ...mapGetters({
      list:'videoStore/videoList',
      total:'videoStore/videoTotal',
      permissions:'loginStore/permissions'
    })
  },
  data(){
    return{
      movieList: DATA,
      pageNum:1,
      pageSize:16,
      dialog:false,
      fileForm:{fileName:'',private:'1'},//1:默认开启下载，0：关闭下载
      limit:1,
      query:{},
      time:0,
      loading:false,
      input:'',
      input2:''
    }
  },
  created() {
    this.load(1,'')
  },
  methods:{
    load(page,title){
      this.query.courseid = parseInt(this.$route.params.courseId)
      this.query.page = page
      this.query.title = title
      this.$store.dispatch('videoStore/getVideoList',this.query).then(res=>{
        //console.log(res)
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    httpRequest(param) {
      let fileObj = param.file // 相当于input里取得的files
      const size = fileObj.size/1024/1024
      if(size>300){
        this.$notify.warning({
          title:'警告',
          message:'大小必须小于300M'
        })
        return;
      }
      this.loading = true
      const getVideoInfo = new Promise((resolve) => {
        const videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(fileObj);
        videoElement.addEventListener("loadedmetadata", function () {
          resolve({
            duration: videoElement.duration,
          });
        });
      });
      let fd = new FormData()// FormData 对象
      fd.append('file', fileObj)// 文件对象
      getVideoInfo.then((videoInfo) => {
        this.fileData = {courseid:this.$route.params.courseId,title:this.fileForm.fileName,file:fd,private:this.fileForm.private,time:this.getTimeFormat(parseInt(videoInfo.duration))}
        console.log(this.fileData)
        this.$store.dispatch('fileStore/postFileUploadOne',this.fileData).then(res=>{
          if(res.code===200){
            this.close()
            this.load(1,'')
            this.$message.success('文件上传成功！')
          }else{
            this.$message.warning(res.msg)
          }
          this.loading=false
        })
      })
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load(pageNum,this.input2)
    },
    search(){
      this.input2 = this.input
      this.pageNum = 1
      this.load(this.pageNum,this.input2)
    },
    upload(){
      this.dialog = true
    },
    uploadFile(){
      this.$refs.upload.submit();
    },
    close(){
      this.dialog = false
      if(this.$refs.upload){
        this.$refs.upload.clearFiles()//清除上传的文件
      }
      this.fileForm = {fileName:'',private:'1'}
    },
    getTimeFormat(time) {
      const h = parseInt(time / 3600)
      const minute = parseInt(time / 60 % 60)
      const second = Math.ceil(time % 60)
      const hours = h < 10 ? '0' + h : h
      const formatSecond = second > 59 ? 59 : second
      return `${hours > 0 ? `${hours}:` : ''}${minute < 10 ? '0' + minute : minute}:${formatSecond < 10 ? '0' + formatSecond : formatSecond}`
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
.play-list h2 {
  font-size: 18px;
  color: rgba(0,0,0, .85);
  padding-bottom: 10px;
}
.thanks {
  padding: 20px 0 40px;
  color: rgba(0, 0, 0, .25);
  font-size: 13px;
  text-align: center;
}
/deep/ .el-upload .el-upload-dragger{
  width: 100%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
