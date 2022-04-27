<template>
  <div>
    <el-row class="filter">
      <el-col :offset="1" :span="5">
        <el-col :span="6"><label>题目:</label></el-col>
        <el-col :span="15"><el-input v-model="uid" placeholder="A"></el-input></el-col>
      </el-col>
      <el-col :span="4">
        <el-col :span="6"><label>用户:</label></el-col>
        <el-col :span="15"><el-input v-model="pid" placeholder="1855010216"></el-input></el-col>
      </el-col>
      <el-col :span="6">
        <el-col :span="6"><label>结果:</label></el-col>
        <el-col :span="16">
          <el-select v-model="judge" placeholder="请选择">
            <el-option
                v-for="item in judgeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="4">
        <el-col :span="12"><label>语言:</label></el-col>
        <el-col :span="12">
          <el-select v-model="language" placeholder="请选择">
            <el-option
                v-for="item in languageList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="">查找</el-button>
      </el-col>
    </el-row>
    <el-row class="pagination">
      <el-col :span="16">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="30">
        </el-pagination>
      </el-col>
    </el-row>
    <el-table :data="tableData" stripe style="margin-top:10px">
      <el-table-column prop="id" label="题交编号" align="center"></el-table-column>
      <el-table-column prop="user_id" label="用户" align="center"></el-table-column>
      <el-table-column label="问题" align="center">
        <template  slot-scope="scope">
          <el-button type="text" @click="">{{scope.row.title}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="judge" label="结果" align="center"></el-table-column>
      <el-table-column prop="memory" label="内存(KB)" align="center"></el-table-column>
      <el-table-column prop="time" label="耗时(MS)" align="center"></el-table-column>
      <el-table-column prop="language" label="语言" align="center"></el-table-column>
      <el-table-column prop="length" label="代码长度" align="center"></el-table-column>
      <el-table-column prop="create" label="提交时间" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "shixun-homework-status",
  data () {
    return {
      uid: '',
      pid: '',
      judge: '',
      language: '',
      page: 1,
      pageSize: 30,
      judgeList: [],
      languageList: [
        {label:'C++',value:'0'},
      ],
      result: [],
      lang: [],
      color: [],
      currentPage3: 5,
      tableData: [
        {id:'1201423',user_id:'1855010216',title:'A',judge:'正确100',memory:'1120',time:'5',language:'C',length:'1075B',create:'2020-03-29 11:06:46'},
        {id:'1201423',user_id:'1855010216',title:'A',judge:'答案错误50',memory:'1120',time:'5',language:'C',length:'1075B',create:'2020-03-29 11:06:46'},
        {id:'1201423',user_id:'1855010216',title:'A',judge:'时间超限50',memory:'1120',time:'5',language:'C',length:'1075B',create:'2020-03-29 11:06:46'},
        {id:'1201423',user_id:'1855010216',title:'A',judge:'正确(1183449)',memory:'1120',time:'5',language:'C',length:'1075B',create:'2020-03-29 11:06:46'},
        {id:'1201423',user_id:'1855010216',title:'A',judge:'编译错误',memory:'1120',time:'5',language:'C',length:'1075B',create:'2020-03-29 11:06:46'},
        {id:'1201423',user_id:'1855010216',title:'A',judge:'编译错误',memory:'1120',time:'5',language:'C',length:'1075B',create:'2020-03-29 11:06:46'},
        {id:'1201423',user_id:'1855010216',title:'A',judge:'编译错误',memory:'1120',time:'5',language:'C',length:'1075B',create:'2020-03-29 11:06:46'},
        {id:'1201423',user_id:'1855010216',title:'A',judge:'编译错误',memory:'1120',time:'5',language:'C',length:'1075B',create:'2020-03-29 11:06:46'},
        {id:'1201423',user_id:'1855010216',title:'A',judge:'编译错误',memory:'1120',time:'5',language:'C',length:'1075B',create:'2020-03-29 11:06:46'},
        {id:'1201423',user_id:'1855010216',title:'A',judge:'编译错误',memory:'1120',time:'5',language:'C',length:'1075B',create:'2020-03-29 11:06:46'}
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped>
.filter{
  margin-bottom: 20px;
  height: 32px;
  line-height: 32px;
}
.filter .el-col{
  text-align: center;
}
.pagination{
  margin-bottom: 10px;
}
</style>
