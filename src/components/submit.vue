<template>
  <div>
    <el-form v-model="solution">
      <el-form-item label="Language" label-position="left">
        <el-select v-model="solution.language" placeholder="请选择" @change="updateCode">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-if="langs&(1<<item.value)">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="solution.code" type="textarea" :autosize="{minRows:15,maxRows:20}" placeholder="Paste your code here" @blur="updateCode"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {lang} from "@/assets/data";

export default {
  name: "submit",
  props: {
    langmask: String
  },
  created() {
    let lang_count = 21,lang2 = [],i = 0
    this.langs = (~(parseInt(this.langmask)))&((1<<lang_count)-1)
  },
  data(){
    return{
      solution:{
        code:'',
        language:0
      },
      lang2:0,
      options:lang,
      langs:null
    }
  },
  methods:{
    updateCode(e){
      let solution = JSON.stringify(this.solution)
      sessionStorage.setItem('solution',solution)
    }
  }
}
</script>

<style scoped>

</style>
