<template>
  <div>
    <el-form v-model="solution">
      <el-form-item label="Language" label-position="left">
        <el-select v-model="solution.language">
          <el-option :value="2">C++ (G++)</el-option>
          <el-option :value="1">C (GCC)</el-option>
          <el-option :value="3">Java (openJDK)</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="solution.code" type="textarea" :autosize="{minRows:15,maxRows:20}" placeholder="Paste your code here"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "submit",
  data(){
    return{
      solution:{}
    }
  }
}
</script>

<style scoped>

</style>
