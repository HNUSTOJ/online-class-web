<template>
  <div class="movie-item">
    <div class="cover">
      <img src="@/assets/cover.jpeg" alt="cover" @click="changeMovie"/>
      <div class="duration">{{item.time}}</div>
    </div>
    <div class="detail">
      <el-tooltip class="item" effect="dark" :content="item.name" placement="bottom" :open-delay="openDelay">
        <div class="title tmp">{{item.name}}</div>
      </el-tooltip>
      <div class="author tmp" style="margin-top: 5px">{{item.user_id}}</div>
      <div class="date" style="margin-top: 5px">{{item.type}}</div>
    </div>
    <i class="fileIconfont iconyduicuowushixin" @click.stop="handleRemoveClick(item.url)" v-if="permissions==='1'"></i>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'MovieItem',
  props: {
    item: Object,
    load:{
      type:Function,
      default: {
        page:Object,
        title:String
      }
    }
  },
  computed:{
    ...mapGetters({
      permissions:'loginStore/permissions',
    })
  },
  created() {
  },
  data(){
    return{
      cover:'',
      openDelay:500,
    }
  },
  methods: {
    changeMovie () {
      sessionStorage.setItem('videoUrl',this.item.url)
      let source=encodeURIComponent(this.item.url)
      let title=this.item.name
      this.$router.push({name:'video-info',query:{title:title,source:source,type:this.item.type,private:this.item.private}})
    },
    handleRemoveClick(url) {//删除文件
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('fileStore/postFileDelete',{id:parseInt(this.$route.params.courseId),url:url}).then(res=>{
          this.$message.success('文件删除成功！')
          this.load(1,'')
        })
      }).catch(() => {
        this.$message({type: 'info', message: '已取消删除'});
      });
    },
  },
}
</script>

<style>
  .movie-item {
    padding: 12px;
    cursor: pointer;
    display: flex;
    margin-bottom: 15px;
    position: relative;
  }
  .movie-item .cover {
    position: relative;
    width: 150px;
    height: 83px;
    overflow: hidden;
    background: #000;
  }
  .cover:hover img {
    opacity: .7;
    transform: scale(1.25, 1.25);

  }
  .movie-item .cover img {
    width: 100%;
    height: 100%;
    transition: transform ease .25s;
  }
  .movie-item .cover .duration {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 3px 6px;
    line-height: 1.2em;
    background-color: rgba(0,0,0, .65);
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
  }
   .movie-item .detail {
    padding-left: 10px;
    font-size: 14px;
    color: rgba(0,0,0, .45);
  }
  .movie-item .detail .title {
    color: #000;
    font-size: 16px;
  }
  .movie-item .detail .author{
    font-size: 13px;
    line-height: 1em;
  }
  .movie-item .detail .date {
    display: inline-block;
    padding: 3px 6px;
    line-height: 1em;
    background-color: #31C2F2;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
  }
  .movie-item .detail .data.hot {
    background-color: #ff6060;
  }
  .tmp{
    width: 155px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .i{
    margin-top: 3px;
    display: inline-block;
  }
  i.iconyduicuowushixin {
    cursor: pointer;
    display: none;
    position: absolute;
    top: 2px;
    right: 2px;
    width: 20px;
    height: 20px;
    font-size: 21px;
    color: #999;
  }
  .movie-item:hover i.iconyduicuowushixin {
    display: block;
  }
</style>

