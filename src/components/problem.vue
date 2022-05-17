<template>
  <div>
    <slot name="title"><h1>问题：{{ $route.params.problemId }}:  {{ problem.title }}</h1></slot>
    <h5>时间限制:{{ problem.time_limit }}MS&nbsp;&nbsp;内存限制:{{ problem.memory_limit }}KB</h5>
    <h5>提交:{{ problem.submit }}&nbsp;&nbsp;解决:{{ problem.accepted }}</h5>
    <h2 class="text-primary">Description</h2>
    <div class="cont" v-html="problem.description"></div>
    <h2>Input</h2>
    <div class="cont" v-html="problem.input"></div>
    <h2>Output</h2>
    <div class="cont" v-html="problem.output"></div>
    <h2>Sample Input
      <el-tooltip effect="dark" content="Click to copy" placement="top">
        <el-icon class="el-icon-document-copy" v-clipboard:copy="problem.sample_input" v-clipboard:success="onCopy" style="cursor: pointer"></el-icon>
      </el-tooltip>
    </h2>
    <pre><code>{{ problem.sample_input }}</code></pre>
    <h2>Sample Output
      <el-tooltip content="Click to copy" placement="top">
        <el-icon class="el-icon-document-copy" v-clipboard:copy="problem.sample_output" v-clipboard:success="onCopy" style="cursor: pointer"></el-icon>
      </el-tooltip>
    </h2>
    <pre><code>{{ problem.sample_output }}</code></pre>
    <div v-if="problem.hint">
      <h2>Hint</h2>
      <div class="cont" v-html="problem.hint"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "problem",
  props: {
    problem: Object
  },
  methods:{
    onCopy () {
      this.$message.success('Copied!')
    }
  }
}
</script>

<style scoped>
h1{
  color: #757575;
  margin-top: 10px;
  margin-bottom: 8px;
  text-align: center;
}
h5{
  margin-bottom: 10px;
  text-align:center;
}
h2{
  border-bottom: 1px solid #e8e8e8;
  padding: 10px 0;
  color: #757575;
}
.cont{
  margin-top: 10px;
  margin-bottom: 20px;
}
pre{
  padding: 10px;
  border-radius: 5px;
  background-color: #ECEFF1;
}

</style>
