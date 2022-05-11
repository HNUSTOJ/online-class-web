<template>
  <div>
    <div style="padding: 10px 0;display: flex;justify-content: space-between">
      <el-input style="width: 300px" placeholder="请输入文件名" v-model="searchInput">
        <el-button slot="append" icon="el-icon-search" @click=""></el-button>
      </el-input>
      <el-button icon="el-icon-plus" @click="imports"  style="margin-left: 5px"></el-button>
    </div>
    <el-card>
<!--      <el-table :data="lists.slice((pageNum - 1) * pageSize, pageNum * pageSize)" stripe :default-sort = "{prop: 'id', order: 'ascending'}">-->
<!--        <el-table-column prop="id" label="ID" align="center" width="100" sortable></el-table-column>-->
<!--        <el-table-column label="文件名" align="center">-->
<!--          <template slot-scope="scope">-->
<!--&lt;!&ndash;            <el-button type="text">{{scope.row.title}}</el-button>&ndash;&gt;-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column prop="category" label="类别" :show-overflow-tooltip="true" align="center" width="120"></el-table-column>-->
<!--        <el-table-column prop="size" label="文件大小（MB）" align="center" width="120"></el-table-column>-->
<!--        <el-table-column prop="type" label="文件类型" align="center" width="120"></el-table-column>-->
<!--        <el-table-column prop="author" label="作者" :show-overflow-tooltip="true" align="center" width="120"></el-table-column>-->
<!--        <el-table-column prop="time" label="上传时间" align="center" width="150"></el-table-column>-->
<!--        <el-table-column label="操作" align="center" width="160">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button type="text" @click="edit">编辑</el-button>-->
<!--            <el-button type="text" v-if="isTeacher">删除</el-button>-->
<!--            <el-button type="text">下载</el-button>-->
<!--          </template>-->

<!--        </el-table-column>-->
<!--      </el-table>-->
      <xd-file-list-preview :show-close="showClose" :list="list" @remove="handleRemoveClick"></xd-file-list-preview>
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
      <label>文件命名：</label>
      <el-input style="width: 70%" placeholder="请输入文件名" v-model="searchInput"></el-input>
      <br/><br/>
      <el-upload
          class="upload-demo"
          drag
          :on-success="uploadFileSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :limit="limit"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :file-list="fileList"
          style="text-align: center;">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
          (支持上传PDF，PNG，JPEG，JPG，GIF，DOC，DOCX，PPT，PPTX，ELXS，ELX等文件)
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="">确 定</el-button>
      </div>
    </el-dialog>

<!--    <el-dialog title="修改文件" :visible.sync="updateDialog" width="35%">-->
<!--      <el-form label-width="100px" size="small" :model="editForm" ref="editForm">-->
<!--        <el-form-item label="文件名称:" prop="input">-->
<!--          <el-input autocomplete="off" v-model="input"></el-input>-->
<!--          <input id="updateFileId" hidden />-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="updateDialog=false">取 消</el-button>-->
<!--        <el-button type="primary">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
export default {
  name: "File",
  data() {
    return {
      showClose: true,
      isTeacher: this.$store.state.idAdmin,
      limit: 1,
      searchInput:'',
      fileType:'',
      textarea: '',
      dialogFormVisible:false,
      // updateDialog:false,
      input:'',
      editForm:{},
      fileList: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
      ],
      lists:[
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
      list: [
        {url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'},
        {url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'},
        {url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'},
        {url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'},
        {url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'},
        {url: 'https://jfb-public-images.oss-cn-qingdao.aliyuncs.com/admin-upload/202111081034429231.png?x-oss-process=style/common'},
        {url: 'http://static.e56buy.com/XdgfsqR2INp7uFxTuLQtnMstYLY4K8rr.蛋糕缺少内容.docx', name: 'aaaa'},
        {
          url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
          name: 'abc',
          fid: '1',
          download: false ,//是否展示下载按钮
        },
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
    uploadFileSuccess(response, file, fileList){
      console.log('123123');
    },
    imports(){
      this.dialogFormVisible = true
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
    },
    edit(){
      this.updateDialog = true
    },
    /**
     * @description 点击查看预览功能
     */
    handleClick() {
      this.$preview({
        url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
        fid: 'aadadads',
        download: false ,//是否展示下载按钮
      })
    },
    /**
     * @description 删除图片事件
     * @param item {Object} 当前被删除的文件对象
     * @param done {function} 删除文件完成回调函数
     */
    handleRemoveClick(item, done) {
      setTimeout(() => {
        console.log('handleRemoveClick', item);
        done()
      }, 2000);
    },
  }
}
</script>

<style scoped>

</style>
