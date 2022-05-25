<template>
  <div>
    <div v-if="total">
      <div v-for="item in list">
        <el-card shadow="hover" style="cursor: pointer;margin: 10px 0">
          <div style="float: left;margin: 10px 0;width: 70%">
            <div>
              <el-button type="text" @click="openCard(item)" style="font-size: 15px">{{ item.title }}</el-button>
              <el-tag v-if="compare(item.create_time,currentTime)">准备</el-tag>
              <el-tag type="success" v-if="compare(currentTime,item.create_time)&&compare(item.end_time,currentTime)">进行中</el-tag>
              <el-tag type="danger" v-if="compare(currentTime,item.end_time)">已结束</el-tag>
            </div>
            <div style="margin: 15px 0">
              <span style="font-size: small">{{item.user_id}}</span>
              <span style="font-size: small;margin-left: 4%">已提交:{{item.submit_num}}人</span>
              <span style="font-size: small;margin-left: 4%">发布时间:{{item.create_time.substring(0,19).replace('T',' ')}}</span>
              <span style="font-size: small;margin-left: 2%">截止时间:{{item.end_time.substring(0,19).replace('T',' ')}}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div v-else>
      <el-empty :image-size="300"></el-empty>
    </div>
    <div style="padding: 10px 0">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";
export default {
  name: "all",
  computed:{
    ...mapGetters({
      list:'commonStore/commonList',
      total:'commonStore/commonTotal',
    })
  },
  data() {
    return {
      currentTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      pageNum: 1,
      pageSize: 3,
      query:{}
    };
  },
  created() {
    this.load(1)
  },
  methods: {
    load(page){
      this.query.course_id = parseInt(this.$route.params.courseId)
      this.query.page = page
      this.query.title = ''
      this.$store.dispatch('commonStore/getCommonList',this.query).then(res=>{
         //console.log(res)
      })
    },
    openCard(item){
      if(this.compare(item.create_time,this.currentTime)){
        this.$message.warning('该作业还未开始！')
      }else{
        sessionStorage.setItem('common_title',item.title)
        sessionStorage.setItem('common_end_time',item.end_time)
        this.$router.push({ name: 'common-stu-des', params:{commonId:item.job_id} })
      }
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
    },
    compare(date1,date2) {
      let dates1 = new Date(date1);
      let dates2 = new Date(date2);
      if (dates1 > dates2) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.el-tag{
  border-radius: 10px;
  margin-left: 5px;
}
</style>
