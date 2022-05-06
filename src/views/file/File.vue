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
      <el-table :data="list.slice((pageNum - 1) * pageSize, pageNum * pageSize)" stripe :default-sort = "{prop: 'id', order: 'ascending'}">
        <el-table-column prop="id" label="ID" align="center" width="100" sortable></el-table-column>
        <el-table-column label="文件名" align="center">
          <template slot-scope="scope">
            <el-button  type="text">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="类别" :show-overflow-tooltip="true" align="center" width="120"></el-table-column>
        <el-table-column prop="size" label="文件大小（MB）" align="center" width="120"></el-table-column>
        <el-table-column prop="type" label="文件类型" align="center" width="120"></el-table-column>
        <el-table-column prop="author" label="作者" :show-overflow-tooltip="true" align="center" width="120"></el-table-column>
        <el-table-column prop="time" label="上传时间" align="center" width="150"></el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="edit">编辑</el-button>
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
    <el-dialog title="上传资源" :visible.sync="dialogFormVisible" width="30%">

<!--      <el-form label-width="100px" size="small">-->
<!--        <el-upload-->
<!--            class="upload-demo"-->
<!--            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--            :on-preview="handlePreview"-->
<!--            :on-remove="handleRemove"-->
<!--            :before-remove="beforeRemove"-->
<!--            multiple-->
<!--            :limit="1"-->
<!--            :on-exceed="handleExceed"-->
<!--            :file-list="fileList">-->
<!--          <el-button size="small" type="primary">点击上传</el-button>-->
<!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--        </el-upload>-->
<!--        <el-input type="textarea" style="margin-top: 10px" placeholder="在此输入资源描述" autosize maxlength="50" show-word-limit v-model="textarea"></el-input>-->
<!--      </el-form>-->
      <label>选择文件分类：</label>
      <el-select id="selectCate" prop="addFileForm.selectFileCate" v-model="addFileForm.selectFileCate" placeholder="请选择">
        <el-option v-for="item in fileTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select><br /><br />
      <el-upload
          class="upload-demo"
          drag
          :on-success="uploadFileSuccess"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :file-list="fileList"
          style="text-align: center"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改文件" :visible.sync="updateDialog" width="35%">
<!--      <label for="updateFileName">文件名称：</label>-->
<!--      <el-input v-model="input" id="updateFileName" placeholder="请输入内容"></el-input>-->
      <el-form label-width="100px" size="small" :model="editForm" ref="editForm">
        <el-form-item label="文件名称:" prop="input">
          <el-input autocomplete="off" v-model="input"></el-input>
          <input id="updateFileId" hidden />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog=false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
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
      updateDialog:false,
      input:'',
      editForm:{},
      fileList: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
      ],
      list:[
        {id:1,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:2,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:3,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:4,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:5,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:6,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:7,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:8,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:9,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:10,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:11,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:12,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:13,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:14,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
        {id:15,title:'abc',category:'text',size:'15',src:'',type:'jpg',time:'2020-01-11 11:00:00',author:'xyf'},
      ],
      pageNum:1,
      pageSize:8,
      total:15,
      addFileForm:{
        selectFileCate:''
      }
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
    uploadFileSuccess(){

    },
    edit(){
      this.updateDialog = true
    }
  }
}
</script>

<style scoped>

</style>
