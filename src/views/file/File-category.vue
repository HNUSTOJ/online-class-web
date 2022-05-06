<template>
<div>
  <div style="padding: 10px 0;display: flex">
    <el-select clearable placeholder="请选择文件分类" v-model="fileType" style="margin-left: 10px">
      <el-option v-for="item in fileTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-button icon="el-icon-plus" style="margin-left: 5px" @click="addFile"></el-button>
  </div>
  <el-card>
    <el-table :data="list.slice((pageNum - 1) * pageSize, pageNum * pageSize)" stripe>
      <el-table-column prop="id" label="ID" align="center" width="100"></el-table-column>
      <el-table-column prop="title" label="分类名称" :show-overflow-tooltip="true" align="center"></el-table-column>
      <el-table-column prop="user" label="创建用户" :show-overflow-tooltip="true" align="center" width="140"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center" width="155"></el-table-column>
      <el-table-column prop="edit_user" label="修改用户" :show-overflow-tooltip="true" align="center" width="140"></el-table-column>
      <el-table-column prop="edit_time" label="修改时间" align="center" width="155"></el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="editFile">编辑</el-button>
          <el-button type="text">删除</el-button>
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
  <el-dialog title="新增文件分类" :visible.sync="addDialog" width="35%">
    <el-form label-width="110px" size="small" :model="addForm" ref="editForm">
      <el-form-item label="文件分类名称:" prop="input">
        <el-input autocomplete="off" placeholder="请输入内容" v-model="addForm.input"></el-input>
        <input id="addFileId" hidden v-model="addForm.id"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog=false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
  </el-dialog>
  <el-dialog title="修改文件分类" :visible.sync="updateDialog" width="35%">
    <el-form label-width="110px" size="small" :model="updateForm" ref="editForm">
      <el-form-item label="文件分类名称:" prop="input">
        <el-input autocomplete="off" placeholder="请输入内容" v-model="updateForm.input"></el-input>
        <input id="updateFileId" hidden v-model="updateForm.id"/>
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
  name: "File-category",
  data(){
    return{
      fileType:'',
      fileTypeList:[
        {id:'1',name:'111'},
        {id:'2',name:'222'},
        {id:'3',name:'333'},
        {id:'4',name:'555'},
      ],
      list:[
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
          {id:'1',title:'123',user:'yfxie',create_time:'2020-01-11 11:00:00',edit_user:'yfxie',edit_time:'2020-01-11 11:00:00'},
      ],
      pageNum:1,
      pageSize:8,
      total:15,
      addDialog:false,
      addForm:{},
      updateDialog:false,
      updateForm:{},
    }
  },
  methods:{
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
    },
    addFile(){
      this.addDialog = true
    },
    editFile(){
      this.updateDialog = true
    },
  }
}
</script>

<style scoped>

</style>
