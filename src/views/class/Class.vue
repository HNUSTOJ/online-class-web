<template>
  <div>
    <div class="div1">
      <div>
        <el-input style="width: 200px" placeholder="请输入分班名称进行搜索" suffix-icon="el-icon-search" v-model="input"></el-input>
        <el-button style="margin-left: 5px" type="primary" @click="search(1)">搜索</el-button>
      </div>
      <div>
          <el-button type="primary" @click="addClass">新增班级
          <i class="el-icon-circle-plus-outline"></i>
        </el-button>
      </div>
    </div>


    <el-table :data="classList" border stripe :header-cell-class-name="headerBg" :default-sort = "{prop: 'class_id', order: 'ascending'}" style="font-size: 13px">
      <el-table-column prop="class_id" label="ID" width="80" align="center" sortable></el-table-column>
      <el-table-column prop="class_name" label="分班名称" width="300" align="center"></el-table-column>
      <el-table-column prop="class_num" label="学生成员" width="100" align="center"></el-table-column>
      <el-table-column prop="user_name" label="管理教师" align="center"></el-table-column>
      <el-table-column prop="invite_code" label="邀请码" align="center"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row.class_id,scope.row.class_name)">查看</el-button>
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-popconfirm title="这是一段内容确定删除吗？" style="margin-left: 10px" @confirm="del(scope.row.class_id)">
            <el-button type="text" slot="reference">删除</el-button>
          </el-popconfirm>
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

    <el-dialog title="新增班级" :visible.sync="dialog" width="35%" :before-close="close">
      <el-form label-width="100px" size="small" :rules="rules" :model="insertForm" ref="insertForm">
        <el-form-item label="分班名称:" prop="class_name">
          <el-input autocomplete="off" v-model="insertForm.class_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑班级" :visible.sync="dialog2" width="35%" :before-close="close2">
      <el-form label-width="100px" size="small" :rules="rules" :model="editForm" ref="editForm">
        <el-form-item label="分班名称:" prop="class_name">
          <el-input autocomplete="off" v-model="editForm.class_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close2">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Class",
  data(){
    return{
      pageNum: 1,
      pageSize: 8,
      headerBg: 'headerBg',
      dialog: false,
      dialog2: false,
      isSearch: false,
      input:'',
      input2:'',
      query:{},
      insertForm:{
        course_id: parseInt(this.$route.params.courseId),
        class_name: ''
      },
      editForm:{},
      rules: {
        class_name: [
          {required: true, message: '请输入班级名称', trigger: 'blur'},
          {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    this.load()
  },
  computed: {
    ...mapGetters({
      classList: 'classStore/classList',
      total: 'classStore/classTotal'
    })
  },
  methods:{
    load(){
      this.query.id = this.$route.params.courseId;
      this.query.page = 1;
      this.$store.dispatch('classStore/getClassList', this.query).then(res=>{
        if(res.code === -2){
          this.$router.push({name:'Home'})
          this.$message.error(res.msg)
        }
      });
    },
    handleCurrentChange(pageNum){
      if(this.isSearch){
        this.$store.dispatch('classStore/getClassSearch',{page:pageNum,id:this.$route.params.courseId,name:this.input2}).then(res=>{
          this.pageNum = pageNum
        })
      }else{
        this.pageNum=pageNum
        this.query.id = this.$route.params.courseId;
        this.query.page = pageNum;
        this.$store.dispatch('classStore/getClassList', this.query).then(res=>{});
      }
    },
    detail(id,name){
      localStorage.setItem('className',name)
      this.$router.push({name:'classInfo',params:{classId:id}})
    },
      addClass(){
      this.dialog = true
    },
    addConfirm(){
      this.$refs['insertForm'].validate((valid) => {
        if(valid){
          this.dialog = false
          this.$store.dispatch('classStore/postClassInsert', this.insertForm).then(res=>{
            if(res.code === 200){
              this.insertForm = {course_id:parseInt(this.$route.params.courseId) }
              this.$message.success(res.msg)
              this.load()
            }else{
              this.$message.error(res.msg)
            }
          })
        }
      });
    },
    edit(row){
      this.dialog2 = true
      this.editForm = {class_id:row.class_id,class_name:row.class_name}
    },
    editConfirm(){
      this.$refs['editForm'].validate((valid) => {
        if(valid){
          this.$store.dispatch('classStore/postClassEdit', this.editForm).then(res=>{
            if(res.code === 200){
              this.dialog2 = false
              this.$message.success(res.msg)
              this.load()
            }else{
              this.$message.error(res.msg)
            }
          })
        }
      });
    },
    search(page){
      this.$store.dispatch('classStore/getClassSearch',{page:page,id:this.$route.params.courseId,name:this.input}).then(res=>{
        this.pageNum = page
        this.isSearch = true
        this.input2 = this.input
      })
    },
    del(id){
      this.$store.dispatch('classStore/postClassDelete',{class_id:id}).then(res=>{
        if(res.code === 200){
          this.$message.success(res.msg)
          this.load()
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    close(){
      this.dialog = false
      this.$nextTick(() => {
        this.$refs["insertForm"].resetFields();
      });
    },
    close2(){
      this.dialog2 = false
      this.$nextTick(() => {
        this.$refs["editForm"].resetFields();
      });
    }
  }
}
</script>

<style scoped>
.div1{
  display: flex;justify-content: space-between;margin:20px 0
}
</style>
