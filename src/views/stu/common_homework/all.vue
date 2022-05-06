<template>
  <div>
    <div v-if="attendanceData.length">
      <div v-for="item in attendanceData">
        <el-card shadow="hover" style="cursor: pointer;margin: 10px 0">
          <div style="float: left;margin: 10px 0;width: 70%">
            <div>
              <el-button type="text" @click="openCard" style="font-size: 15px">{{ item.cname }}</el-button>
              <el-tag type="success" style="border-radius: 10px;margin-left: 5px">进行中</el-tag>
            </div>
            <div style="margin: 15px 0">
              <span style="font-size: small">{{item.tname}}</span>
              <span style="font-size: small;margin-left: 4%">已提交:{{item.private}}人</span>
              <span style="font-size: small;margin-left: 4%">发布时间:{{item.createTime}}</span>
              <span style="font-size: small;margin-left: 2%">截止时间:{{item.limitTime}}</span>
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
          @size-change="handleSizeChange"
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

export default {
  name: "all",
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 2,
      attendanceData:[
        {cname: '2022年上学期潇湘学院计算机系2021级《C语言课程设计》',tname: '谢沅峰',createTime:'2022-03-21 14:10',limitTime:'2022-03-21 14:10',private: 23},
        {cname: '2022年上学期潇湘学院计算机系2021级《C语言课程设计》',tname: '谢沅峰',createTime:'2022-03-21 14:10',limitTime:'2022-03-21 14:10',private: 23},
        {cname: '2022年上学期潇湘学院计算机系2021级《C语言课程设计》',tname: '谢沅峰',createTime:'2022-03-21 14:10',limitTime:'2022-03-21 14:10',private: 23},
      ]
    };
  },
  methods: {
    openCard(){
      this.$router.push({ name: 'common-homework-stuInfo', params:{cid:'123'} })
    },
    handleSizeChange(pageSize){
      this.pageSize=pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load()
    }
  }
}
</script>

<style scoped>

</style>
