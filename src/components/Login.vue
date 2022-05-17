<template>
  <el-dialog :visible.sync="visibleLogin" width="30%" :before-close="close">
    <div style="margin: 5px auto; background-color: #fff; border-radius: 10px">
      <div style="margin: 10px 0; text-align: center; font-size: 24px"><b>登 录</b></div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="userId">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user"
                    v-model="loginForm.userId" placeholder="用户名(学号)"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                    v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: right">
          <el-button type="primary" size="medium" style="width: 100%" autocomplete="off" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import {mapGetters} from "vuex";
import hex_md5 from "@/utils/md5-min"

export default {
  name: 'Login',
  computed:{
    ...mapGetters({
      token: 'loginStore/token',
      username: 'loginStore/username',
      visibleLogin:'loginStore/loginDialog'
    }),
  },
  data () {
    return {
      loginForm: {
        userId: '1855010216',
        password: '4315853'
      },
      rules: {
        userId: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'},
          {
            validator: function(rule, value, callback) {
              if (/^[A-Za-z0-9]{4,40}$/.test(value) == false) {
                callback(new Error("只能输入英文和数字"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    jsMd5(){
      this.loginForm.password = hex_md5(this.loginForm.password);
    },
    login () {
      this.$refs['loginForm'].validate((valid) => {
        if(valid){
          this.jsMd5();
          this.$store.dispatch('loginStore/postLogin',this.loginForm).then(res=>{
            if(res.code === 200){
              location.reload()
              this.$message.success(res.msg)
            }else{
              this.$message.error(res.msg)
            }
          });
        }
      });
    },
    close(){
      this.$store.commit('loginStore/triggerLogin')
    }
  }
}
</script>

<style>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #FC466B, #3F5EFB);
  overflow: hidden;
}

</style>
