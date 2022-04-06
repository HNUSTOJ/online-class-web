<template>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <div class="loginOut">
            <el-button type="text" icon="el-icon-edit-outline" @click="openDialog" style="font-size: 14px">创建签到</el-button>
          </div>
          <span slot="label">全部签到</span>
          <div v-if="attendanceData.length">
            <div v-for="item in attendanceData">
              <el-card shadow="hover" style="cursor: pointer;margin: 10px 0">
                <div style="margin: 10px 0">
                  <span>{{ item.cname }}</span>
                  <el-tag type="success" style="border-radius: 10px;margin-left: 5px">进行中</el-tag>
                  <div style="float: right">
                    <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link">
                        更多<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">详细信息</el-dropdown-item>
                        <el-dropdown-item command="b">编辑签到</el-dropdown-item>
                        <el-dropdown-item command="c">删除签到</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
                <div style="display: flex;margin: 10px 0">
                  <span>签到人数</span>
                  <el-progress :percentage="20" :show-text="false"></el-progress>
                  <span style="font-size: small;margin-left: 5px">已签到{{item.num1}}/</span>
                  <span style="font-size: small">应签到{{item.num2}}</span>
                </div>
                <div style="margin: 10px 0">
                  <span style="font-size: small">签到发起人:{{item.tname}}</span>
                  <span style="font-size: small;margin-left: 22%">开始时间:{{item.startTime}}</span>
                  <span style="font-size: small;margin-left: 3%">结束时间:{{item.endTime}}</span>
                </div>
              </el-card>
            </div>
          </div>
          <div v-else>
              <el-empty :image-size="300"></el-empty>
          </div>
        </el-tab-pane>

        <el-tab-pane>
          <div class="loginOut">
            <el-button type="text" icon="el-icon-edit-outline" @click="openDialog" style="font-size: 14px">创建签到</el-button>
          </div>
          <span slot="label">正在签到</span>
          <el-empty :image-size="300"></el-empty>
        </el-tab-pane>

        <el-tab-pane>
          <div class="loginOut">
            <el-button type="text" icon="el-icon-edit-outline" @click="openDialog" style="font-size: 14px">创建签到</el-button>
          </div>
          <span slot="label">历史签到</span>
          <el-empty :image-size="300"></el-empty>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label">签到统计</span>
          <el-row :gutter="10" style="margin-bottom: 60px">
            <el-col :span="8">
              <el-card style="color: #409EFF">
                <div><i class="el-icon-user-solid" /> 历史发起次数</div>
                <div class="el-card-div">4</div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card style="color: #F56C6C">
                <div><i class="el-icon-money" /> 平均到课率</div>
                <div class="el-card-div">95%</div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card style="color: #67C23A">
                <div><i class="el-icon-bank-card" /> 平均旷课率</div>
                <div class="el-card-div">5%</div>
              </el-card>
            </el-col>
          </el-row>
          <div id="main"></div>
        </el-tab-pane>
      </el-tabs>

      <el-dialog title="创建签到" :visible.sync="dialogFormVisible" width="35%" >
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-form-item label="签到名称:">
            <el-input autocomplete="off" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="签到班级:">
            <el-select clearable placeholder="请选择签到班级" style="width: 100%" v-model="form.class">
              <el-option v-for="item in form.classData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间:">
            <el-date-picker v-model="form.date1" type="datetime" placeholder="选择开始时间" style="width: 100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="迟到时间:">
            <el-date-picker v-model="form.date2" type="datetime" placeholder="在迟到时间至结束时间签到的同学记为迟到" style="width: 100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间:">
            <el-date-picker v-model="form.date3" type="datetime" placeholder="超过结束时间的同学记为未签到" style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import router from "@/router";

export default {
  name: "Attendance",
  data() {
    return {
      dialogFormVisible: false,
      attendanceData:[
        {cname: '数据结构A',num1: '10',num2: '50',tname: '谢沅峰',startTime:'2022-03-17 15:25',endTime: '2022-03-17 19:00'},
        {cname: '数据库技术',num1: '15',num2: '50',tname: '谢沅峰',startTime:'2022-03-17 15:25',endTime: '2022-03-17 19:00'},
        {cname: '操作系统',num1: '20',num2: '50',tname: '谢沅峰',startTime:'2022-03-17 15:25',endTime: '2022-03-17 19:00'},
        {cname: '操作系统',num1: '20',num2: '50',tname: '谢沅峰',startTime:'2022-03-17 15:25',endTime: '2022-03-17 19:00'}
      ],
      form:{
        name: '',
        class: '',
        date1: '',
        date2: '',
        date3: '',
        classData: [{id: 'all',name:'全部班级'}, {id: '18550102',name:'潇湘计算机二班'}, {id: '18550103',name:'潇湘计算机三班'}, {id: '18550104',name:'潇湘计算机四班'}]
      },
    }
  },
  mounted() {
    var option = {
      title: {
        text: '显示最近5次签到记录(%)'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['到课率', '旷课率']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['数据结构A', '操作系统', '数据库技术','数据库技术','数据库技术']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '旷课率',
          type: 'line',
          data: [10, 3, 1, 10, 3]
        },
        {
          name: '到课率',
          type: 'line',
          data: [90, 97, 99, 90, 97]
        }
      ]
    };
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    myChart.setOption(option);
  },
  methods: {
    openDialog(){
      this.dialogFormVisible = true
    },
    detail(){
      router.push("/attendance/detail")
    },
    handleCommand(command) {
      if(command=="a"){
        this.detail()
      }
      if(command=="b"){
        this.dialogFormVisible = true
      }
    }
  }
}
</script>

<style scoped>
.loginOut{
  position: absolute;
  right:2%;
  top:0;
  font-weight: 600;
  font-size: 14px;
}
.el-progress{
  width: 25%;
  margin: auto 5px;
}
.el-card-div{
  padding: 10px 0;
  text-align: center;
  font-weight: bold;
}
#main{
  width: 1200px;
  height: 450px;
}
</style>
