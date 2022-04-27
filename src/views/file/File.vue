<template>
  <div>
    <div style="padding: 10px 0;display: flex">
      <el-input style="width: 300px" placeholder="请输入文件名" v-model="searchInput">
        <el-button slot="append" icon="el-icon-search" @click=""></el-button>
      </el-input>
      <el-select clearable placeholder="请选择文件分类" v-model="fileType" style="margin-left: 10px">
        <el-option v-for="item in fileTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button icon="el-icon-plus" @click="imports"  style="margin-left: 5px"></el-button>
    </div>
    <el-card>
      <el-table :data="list.slice((pageNum - 1) * pageSize, pageNum * pageSize)" stripe style="margin-top:10px">
        <el-table-column prop="id" label="ID" align="center" width="100"></el-table-column>
        <el-table-column label="文件名" align="center">
          <template slot-scope="scope">
            <el-button type="text">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="类别" align="center" width="120"></el-table-column>
        <el-table-column prop="size" label="文件大小（MB）" align="center" width="120"></el-table-column>
        <el-table-column prop="type" label="文件类型" align="center" width="120"></el-table-column>
        <el-table-column prop="author" label="作者" align="center" width="120"></el-table-column>
        <el-table-column prop="time" label="上传时间" align="center" width="150"></el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text" v-if="isTeacher">删除</el-button>
            <el-button type="text">下载</el-button>
          </template>

        </el-table-column>
      </el-table>
      <div style="padding: 10px 0">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog title="上传资源" :visible.sync="dialogFormVisible" width="35%" >
      <el-form label-width="100px" size="small">
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-input type="textarea" style="margin-top: 10px" placeholder="在此输入资源描述" autosize maxlength="50" show-word-limit v-model="textarea"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "File",
  data() {
    return {
      isTeacher: this.$store.state.idAdmin,
      searchInput:'',
      fileType:'',
      textarea: '',
      fileTypeList:[
        {id:'1',name:'111'},
        {id:'2',name:'222'},
        {id:'3',name:'333'},
        {id:'4',name:'555'},
      ],
      dialogFormVisible:false,
      fileList: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
      ],
      list:[
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:'1',title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
      ],
      pageNum:1,
      pageSize:8,
      total:15
    }
  },
  methods:{
    imports(){
      this.dialogFormVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
    },
  }
}
</script>

<style scoped>

</style>
