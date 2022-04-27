<template>
  <div>
    <slot name="title"><h1>{{ problem.pid }}:  {{ problem.title }}</h1></slot>
    <h5>时间限制:{{ problem.time }}MS&nbsp;内存限制:{{ problem.memory }}KB</h5>
    <h5>提交:{{ problem.time }}MS&nbsp;解决:{{ problem.memory }}KB</h5>
    <h2 class="text-primary">Description</h2>
    <div class="cont" v-html="problem.description"></div>
    <h2>Input</h2>
    <div class="cont" v-html="problem.input"></div>
    <h2>Output</h2>
    <div class="cont" v-html="problem.output"></div>
    <h2>Sample Input
      <el-tooltip effect="dark" content="Click to copy" placement="top">
        <el-icon class="el-icon-document-copy" v-clipboard:copy="problem.in" v-clipboard:success="onCopy" style="cursor: pointer"></el-icon>
      </el-tooltip>
    </h2>
    <pre><code>{{ problem.in }}</code></pre>
    <h2>Sample Output
      <el-tooltip content="Click to copy" placement="top">
        <el-icon class="el-icon-document-copy" v-clipboard:copy="problem.out" v-clipboard:success="onCopy" style="cursor: pointer"></el-icon>
      </el-tooltip>
    </h2>
    <pre><code>{{ problem.out }}</code></pre>
    <div v-if="problem.hint">
      <h2>Hint</h2>
      <div class="cont" v-html="problem.hint"></div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "problem",
  data(){
    return{
      problem:{
        pid:'1697',
        title:'寻找宝藏',
        time:'1',
        memory:'128',
        description:'<p class="MsoNormal" align="left" style="text-indent:21pt;">\n' +
            '\t<span style="font-size:12.0pt;font-family:宋体;">琦玉老师发现了一张藏宝图， 藏宝图是一张边长为</span><em>n<sup>2</sup></em><span style="font-size:12pt;font-family:宋体;">个点，编号分别是</span><em>n<sup>2</sup></em><span style="font-size:12pt;font-family:宋体;">。琦玉老师发现编号<em><span>1</span>，<span>2</span>，<span>...</span>，n<sup>2</sup></em>是从外层至中心按顺时针方向螺旋排列。琦玉老师开始去寻宝，他在编号为<span>a</span>的点出发，宝藏在编号为<span>b的</span>点，假设相邻的点对距离都是<span>1</span>，现在琦玉老师的问题是：从<span>a</span>点到<span>b</span>点的最短距离是多少？</span>\n' +
            '<br />\n' +
            '<p class="MsoNormal" style="text-indent:21.0pt;">\n' +
            '\t<span style="font-size:12.0pt;font-family:宋体;">如<span>n = 3</span>的时候，藏宝图各点位置如下：</span>\n' +
            '<br />\n' +
            '<p class="MsoNormal" style="text-indent:21.0pt;">\n' +
            '\t<img src="/JudgeOnline/upload/201512/题目图片1.png" width="343" height="270" alt="" />\n' +
            '<br />\n' +
            '<p class="MsoNormal" style="text-indent:21.0pt;">\n' +
            '\t<span style="font-family:宋体;font-size:12pt;">此图中，编号</span><span style="font-family:宋体;font-size:12pt;">2</span><span style="font-family:宋体;font-size:12pt;">和编号</span><span style="font-family:宋体;font-size:12pt;">5</span><span style="font-family:宋体;font-size:12pt;">的最短距离就是sqrt（1＋4)</span><span style="font-family:宋体;font-size:12pt;">= 2.236</span>\n' +
            '<br />\n' +
            '<p class="MsoNormal" style="text-indent:24.0pt;">\n' +
            '\t<span style="font-size:12.0pt;font-family:宋体;">&nbsp;</span>\n' +
            '<br />\n' +
            '<p class="MsoNormal" style="text-indent:21.0pt;">\n' +
            '\t<span style="font-family:宋体;font-size:12pt;">如</span><span style="font-family:宋体;font-size:12pt;">n = 5</span><span style="font-family:宋体;font-size:12pt;">的时候，藏宝图个点位置如下：</span>\n' +
            '<br />\n' +
            '<p class="MsoNormal" style="text-indent:21.0pt;">\n' +
            '\t<img src="/JudgeOnline/upload/201512/题目图片2.png" width="360" height="354" alt="" />\n' +
            '<br />\n' +
            '<p class="MsoNormal" style="text-indent:21.0pt;">\n' +
            '\t<span style="font-family:宋体;font-size:12pt;">如图中，编号</span><span style="font-family:宋体;font-size:12pt;">5</span><span style="font-family:宋体;font-size:12pt;">和 编号</span><span style="font-family:宋体;font-size:12pt;">13</span><span style="font-family:宋体;font-size:12pt;">的最短距离就是sqrt（16＋16）</span><span style="font-family:宋体;font-size:12pt;">= 5.657</span>\n' +
            '<br />\n' +
            '<p class="MsoNormal" style="text-indent:24.0pt;">\n' +
            '\t<span style="font-size:12.0pt;font-family:宋体;"><span></span></span>\n' +
            '<br />',
        input:'<p class="MsoNormal" style="text-indent:21.0pt;">\n' +
            '\t<span style="font-size:12.0pt;font-family:宋体;">先输入一个<span>T</span>（<em><span>T</span>≤<span>1000</span></em>），表示数据组数。<span></span></span>\n' +
            '<br />\n' +
            '<p class="MsoNormal" style="text-indent:21.0pt;">\n' +
            '\t<span style="font-size:12.0pt;font-family:宋体;">接下来<span>T</span>行，每行包括<span>3</span>个正整数<span>n</span>，<span>a</span>，<span>b(</span></span><em><span style="font-size:12.0pt;font-family:宋体;"><span>1</span>≤<span>n</span>≤<span>4500</span>，<span>1</span>≤<span>a</span>，b</span><span style="font-family:宋体;font-size:16px;">≤</span><em>n<sup>2</sup></em></em><span style="font-family:宋体;font-size:12pt;">)</span><span style="font-family:宋体;font-size:12pt;">。</span><span style="font-family:宋体;font-size:12pt;">n</span><span style="font-family:宋体;font-size:12pt;">表示藏宝图的边长，</span><span style="font-family:宋体;font-size:12pt;">a</span><span style="font-family:宋体;font-size:12pt;">表示琦玉老师所在的位置，</span><span style="font-family:宋体;font-size:12pt;">b</span><span style="font-family:宋体;font-size:12pt;">表示宝藏所在的位置。</span>\n' +
            '<br />',
        output:'<p class="MsoNormal" style="text-indent:21.0pt;">\n' +
            '\t<span style="font-size:12.0pt;font-family:宋体;">每组数据输出一行，包含一个浮点数，保留小数点后<span>3</span>位。（使用double类型）<span></span></span>\n' +
            '<br />',
        in:'3\n' +
            '2 1 3\n' +
            '3 2 5\n' +
            '5 5 13\n',
        out:'1.414\n' +
            '2.236\n' +
            '5.657\n',
        hint:'<p class="MsoNormal">\n' +
            '\t<span style="font-size:12.0pt;font-family:宋体;"><br />\n' +
            '</span>\n' +
            '<br />\n' +
            '\n' +
            '\t<br />\n' +
            '<br />'
      }
    }
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
