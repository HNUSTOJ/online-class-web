<template>
  <div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="0">
        <div>
          <el-input style="width: 200px" placeholder="请输入名称进行搜索" suffix-icon="el-icon-search" v-model="username"></el-input>
          <el-button style="margin-left: 5px" type="primary">搜索</el-button>
        </div>
        <div v-if="attendanceData.length">
          <div v-for="item in attendanceData">
            <el-card shadow="hover" style="cursor: pointer;margin: 10px 0"  @click.native="openCard">
              <div style="float: left;margin: 10px 0;width: 70%">
                <div>
                  <span>{{ item.cname }}</span>
                  <el-tag type="success" style="border-radius: 10px;margin-left: 5px">进行中</el-tag>
                </div>
                <div style="margin: 15px 0">
                  <span style="font-size: small">{{item.tname}}</span>
                  <span style="font-size: small;margin-left: 4%">未提交:{{item.num}}人</span>
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
      </el-tab-pane>
      <el-tab-pane label="进行中" name="1">
        <div>
          <el-input style="width: 200px" placeholder="请输入名称进行搜索" suffix-icon="el-icon-search" v-model="username"></el-input>
          <el-button style="margin-left: 5px" type="primary">搜索</el-button>
        </div>
        <el-empty :image-size="300"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="历史作业" name="2">
        <div>
          <el-input style="width: 200px" placeholder="请输入名称进行搜索" suffix-icon="el-icon-search" v-model="username"></el-input>
          <el-button style="margin-left: 5px" type="primary">搜索</el-button>
        </div>
        <el-empty :image-size="300"></el-empty>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "shixun-homework-stu",
  components: {
  },
  data() {
    return {
      activeName: '0',
      attendanceData:[
        {cname: '2022年上学期潇湘学院计算机系2021级《C语言课程设计》',tname: '谢沅峰',createTime:'2022-03-21 14:10',limitTime:'2022-03-21 14:10',num: 5},
        {cname: '2022年上学期潇湘学院计算机系2021级《C语言课程设计》',tname: '谢沅峰',createTime:'2022-03-21 14:10',limitTime:'2022-03-21 14:10',num: 5},
        {cname: '2022年上学期潇湘学院计算机系2021级《C语言课程设计》',tname: '谢沅峰',createTime:'2022-03-21 14:10',limitTime:'2022-03-21 14:10',num: 5},
        {cname: '2022年上学期潇湘学院计算机系2021级《C语言课程设计》',tname: '谢沅峰',createTime:'2022-03-21 14:10',limitTime:'2022-03-21 14:10',num: 5}
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      router.push({ path: '/shixun_homework_stu', query: { tab: tab.name } })
    },
    openDialog(){
      this.noData = this.Data
    },
    openCard(){
      router.push("/shixun_homework_stu/detail")
    }
  }
}
</script>

<style scoped>
</style>
