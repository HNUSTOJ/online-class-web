<template>
  <div>
    <el-card class="card">
      <div style="display: flex;justify-content: space-between">
        <span :span="6">Begin: {{startTime}}</span>
        <span :span="12" v-if="currentTime < start">Ready</span>
        <span :span="12" v-if="currentTime > start && currentTime < end">Running</span>
        <span :span="12" v-if="currentTime > end">Ended</span>
        <span :span="6">End: {{endTime}}</span>
      </div>
      <el-progress :stroke-width="18" :percentage="50" status="success"></el-progress>
    </el-card>
    <el-card class="conrank-wrap">
      <table>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Nick</th>
          <th>Solve</th>
          <th>Penalty</th>
          <th v-for="(item, index) in contest.list">
            {{ index + 1 }}
          </th>
        </tr>
        <tr v-for="(item,index) in ranklist">
          <td>{{ index + 1 }}</td>
          <td>{{ item.uid }}</td>
          <td>{{ item.nick }}</td>
          <td>{{ item.solved }}</td>
          <td class="straight">{{item.penalty}}</td>
          <template v-for="pid in contest.list">
            <td v-if="!item[pid]"></td>
            <!-- !item[pid] 为 true 表示这道题没有提交过 -->
            <td v-else-if="item[pid].wa >= 0" :class="[ item[pid].prime ? 'prime' : 'normal']">
              {{ item[pid].create }}<span v-if="item[pid].wa">({{ item[pid].wa }})</span>
            </td>
            <td v-else :class="{'red': item[pid].wa}">
              <span v-if="item[pid].wa">{{ item[pid].wa }}</span>
            </td>
          </template>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "shixun-homework-standing",
  data(){
    return{
      start: Date.now()-5,
      end: Date.now()+4,
      startTime: '',
      endTime: '',
      currentTime: Date.now(),
      list:{},
      ranklist:[
        {uid:'1855010216',nick:'谢沅峰',solved:'6',penalty:'122:39:49',1:{wa:0,prime:true,create:'1:11:33'},2:{wa:0,prime:true,create:'0:11:33'},3:{wa:0,prime:true,create:'0:11:33'},4:{wa:0,prime:true,create:'0:11:33'}},
        {uid:'1855010216',nick:'谢沅峰',solved:'6',penalty:'122:39:49',1:{wa:3,prime:'',create:'1:11:33'},2:{wa:0,prime:'',create:'1:11:33'}},
        {uid:'1855010216',nick:'谢沅峰',solved:'6',penalty:'122:39:49',1:{wa:0,prime:'',create:'1:11:33'}},
        {uid:'1855010216',nick:'谢沅峰',solved:'6',penalty:'122:39:49',1:{wa:3,prime:'',create:'1:11:33'}},
        {uid:'1855010216',nick:'谢沅峰',solved:'6',penalty:'122:39:49',1:{wa:-5,prime:'',create:'1:11:33'}},
      ],
      contest: {
        list: [1,2,3,4,5,6,7,8,9,10,11,12],
      }
    }
  },
  mounted(){
    this.startTime = moment(this.start).format('YYYY-MM-DD HH:mm:ss')
    this.endTime = moment(this.end).format('YYYY-MM-DD HH:mm:ss')
  },
  methods:{
  }
}
</script>

<style scoped>
.card{
  margin-bottom: 20px
}
.card span{
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
}
.conrank-wrap{
  margin-top: 1em;
  overflow: scroll;
  background: white;
}
.conrank-wrap table{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
.conrank-wrap table th, td{
  border: 1px solid #dbdbdb;
  padding: 8px 4px;
}
.conrank-wrap table th, td:nth-child(n + 5){
  min-width: 4em;
}
.straight{
  nowrap: nowrap;
}
.prime{
  color: #fff;
  background-color: #3273dc;
  word-wrap: break-word;
  word-break:break-all;
  text-align: left;
}
.normal{
  color: #fff;
  background-color: #23d160;
  word-wrap: break-word;
  word-break:break-all;
  text-align: left;
}
.red{
  color: red;
}
</style>
