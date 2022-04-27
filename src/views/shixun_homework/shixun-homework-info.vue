<template>
  <div>
    <div style="text-align: center;margin-top: 20px">
      <h3>Contest1977 - 2020集训队寒假作业</h3>
      <p></p>
      <br>Start Time: <span style="color: #993399; ">2020-01-11 11:00:00</span>
      End Time: <span style="color: #993399; ">2020-03-29 15:00:00</span><br>
      Current Time: <span style="color: #993399; "><span id="nowdate">2022-4-9 15:56:56</span></span>
      <br>
      Status:<span>Ended</span>&nbsp;
      <span>Public<br>
[<router-link :to="{name: 'shixun-homework-status'}"><a>Status</a></router-link>]
[<router-link :to="{name: 'shixun-homework-standing'}"><a>Standing</a></router-link>]
[<a>Statistcs</a>]
</span></div>
    <el-table :data="tableData" stripe style="width: 100%;margin-top:10px">
      <el-table-column prop="sign" align="center" width="80"></el-table-column>
      <el-table-column prop="id" label="题目编号" align="center" width="200"></el-table-column>
      <el-table-column label="标题" align="center">
        <template>
          <el-button type="text" @click="openProblem">寻找宝藏</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="source" label="来源/分类" align="center"></el-table-column>
      <el-table-column prop="cross" label="正确" align="center" width="80"></el-table-column>
      <el-table-column prop="submit" label="提交" align="center" width="80"></el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: "shixun-homework-info",
  data(){
    return{
      tableData: [
        {sign:'Y',id:'1638',title:'寻找宝藏',source:'吴展辉 陈迪祺',cross:'23',submit:'50'},
        {sign:'Y',id:'1638',title:'寻找宝藏',source:'吴展辉 陈迪祺',cross:'23',submit:'50'},
        {sign:'Y',id:'1638',title:'寻找宝藏',source:'吴展辉 陈迪祺',cross:'23',submit:'50'},
        {sign:'Y',id:'1638',title:'寻找宝藏',source:'吴展辉 陈迪祺',cross:'23',submit:'50'},
        {sign:'Y',id:'1638',title:'寻找宝藏',source:'吴展辉 陈迪祺',cross:'23',submit:'50'},
        {sign:'Y',id:'1638',title:'寻找宝藏',source:'吴展辉 陈迪祺',cross:'23',submit:'50'},
        {sign:'Y',id:'1638',title:'寻找宝藏',source:'吴展辉 陈迪祺',cross:'23',submit:'50'}
      ]
    }
  },
  methods: {
    openProblem(){
      this.$router.push({name:'shixun-homework-problem'})
    }
  }
}
</script>

<style scoped>
.jumbotron {
  color: inherit;
}
body {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}
html {
  font-size: 10px;
}
html {
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%;
}
a{
  text-decoration:none;
  color: #993399;
}
</style>
