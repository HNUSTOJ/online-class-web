<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-page-header @back="goBack" content="作业详情"></el-page-header>
    </div>
    <el-card>
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="作业描述" name="0">
          <div>
            <span>标题:</span>
            <span>.....................................</span>
          </div>
          <div>
            <span>简介:</span>
            <span>.....................................</span>
          </div>
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
              style="margin-top: 10px">
            <el-button size="small">上传报告</el-button>
          </el-upload>
          <span style="font-size: 10px">(单个文件最大150MB)</span>
          <div style="margin-top: 10px">
            <el-button type="primary">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="提交情况" name="1">
          <div style="margin-top: 15px">
            <span>剩余提交时间5 天 23 小时 36 分 </span>
          </div>
          <div style="margin: 15px 0">
            <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
              <el-table-column prop="id" label="序号"  width="100" align="center"></el-table-column>
              <el-table-column prop="name" label="姓名" width="150" align="center"></el-table-column>
              <el-table-column prop="num" label="学号" align="center"></el-table-column>
              <el-table-column prop="state" label="提交状态" width="150" align="center"></el-table-column>
              <el-table-column prop="refresh" label="更新时间" align="center"></el-table-column>
              <el-table-column prop="review" label="评阅状态" width="150" align="center"></el-table-column>
            </el-table>
          </div>
          <el-button type="primary">修改作品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>

</template>

<script>

export default {
  name: "info",
  data(){
    return{
      total: 0,
      pageNum: 1,
      pageSize: 2,
      headerBg: 'headerBg',
      value1: '2022-03-21 14:10',
      value2: '',
      radio: '1',
      ruleForm: {
        region: 'all',
        region2: 'all'
      },
      classData: [
        {id: 'all',name:'全部班级'},
        {id: '1',name:'计算机一班'},
        {id: '2',name:'计算机二班'},
        {id: '3',name:'计算机三班'},
        {id: '4',name:'计算机四班'}
      ],
      stateData: [
        {id: 'all',name:'全部状态'},
        {id: 'yes',name:'已提交'},
        {id: 'no',name:'未提交'},
      ],
      tableData: [
        {id:'1',name: '张三',num: '1855010216',state:'已提交',refresh:'2022-03-25 14:53',review:'已评阅'}
      ],
      fileList: [
        {name: 'hustoj文档大全.pdf', url: 'C:\\Users\\Administrator\\Desktop\\hustoj文档大全.pdf'}
      ]
    }
  },
  methods:{
    goBack(){
      this.$router.push({ name: 'common-all'})
    },
    handleClick(tab, event) {
    },
    handleSizeChange(pageSize){
      this.pageSize=pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
  }
}
</script>

<style scoped>

</style>
