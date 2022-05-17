<template>
<div>
  <div style="padding: 10px 0;display: flex;justify-content: space-between">
    <el-input style="width: 300px" placeholder="请输入文件名">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button icon="el-icon-plus" style="margin-left: 5px"></el-button>
  </div>
  <el-card>
    <div id="vue-core-video-player-box" class="example-player">
      <vue-core-video-player :cover="currentMovie.cover3" :src="currentMovie.source"></vue-core-video-player>
    </div>
    <div class="thanks">
      <span>{{title}}</span>
    </div>

    <el-row>
      <el-col :span="6" class="play-list" v-for="movie in movieList">
        <MovieItem :key="movie.cover" :item="movie" @click="open($event)"></MovieItem>
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
  <el-dialog title="新增文件分类" :visible.sync="addDialog" width="35%">
    <el-form label-width="110px" size="small" :model="addForm" ref="editForm">
      <el-form-item label="文件分类名称:" prop="input">
        <el-input autocomplete="off" placeholder="请输入内容" v-model="addForm.input"></el-input>
        <input id="addFileId" hidden v-model="addForm.id"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog=false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
  </el-dialog>
<!--  <el-dialog title="播放" :visible.sync="vedioDialog" width="60%">-->
<!--    <div id="vue-core-video-player-box" class="example-player">-->
<!--      <vue-core-video-player :cover="currentMovie.cover3" :src="currentMovie.source"></vue-core-video-player>-->
<!--    </div>-->
<!--    <div class="thanks">-->
<!--      ❤ Video Source via Makoto Shinkai and Stephen Chow's Movies-->
<!--    </div>-->
<!--  </el-dialog>-->

</div>
</template>

<script>
import DATA from "@/assets/data";
import MovieItem from './MovieItem.vue'
import RecommendedItem from './Recommended.vue'

let movie = {}
let title = ''

if (location.search) {
  var vid = location.search.split('=')[1]
  DATA.forEach(item => {
    if (item.id === vid) {
      movie = item
      title = item.title
    }
  })
}

export default {
  name: "File-category",
  components:{
    MovieItem,
    RecommendedItem
  },
  data(){
    return{
      movieList: DATA,
      recommendList: [DATA[2], DATA[4], DATA[1], DATA[0]],
      currentMovie: movie,
      fileType:'',
      fileTypeList:[
        {id:'1',name:'111'},
        {id:'2',name:'222'},
        {id:'3',name:'333'},
        {id:'4',name:'555'},
      ],
      pageNum:1,
      pageSize:8,
      total:15,
      addDialog:false,
      addForm:{},
      title:title,
      video: {
        url: 'https://www.bilibili.com/video/BV17u411r7m1?share_source=copy_web',
        cover: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
        muted: false,
        loop: false,
        preload: 'auto',
        poster: '',
        volume: 1,
        autoplay: false,
      }
    }
  },
  computed:{
      $video() {
        return this.$refs.vueMiniPlayer.$video;
      }
  },
  methods:{
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
    },
    addFile(){
      this.addDialog = true
    },
    handleFullscreen(){

    },
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
.recommend-list {
  margin-top: 40px;
  padding-top: 40px;
  padding-bottom: 40px;
  border-top: 1px solid #ddd;
}
.thanks {
  padding: 20px 0 40px;
  color: rgba(0, 0, 0, .25);
  font-size: 13px;
  text-align: center;
}
.recommend-list:after{
  content: '';
  display: block;
  clear: both;
}
</style>
