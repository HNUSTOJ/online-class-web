<template>
  <div class="container">
    <div class="well" ref="output" id="pptx"></div>
  </div>
</template>

<script>
import { render } from "@/components/util";
import { parse } from "qs";
import axios from "axios";
import XLSX from "xlsx";

/**
 * 支持嵌入式显示，基于postMessage支持跨域
 * 示例代码：
 *
 */
export default {
  name: "pptx",
  data() {
    return {
      last: null,
    };
  },
  methods: {
    pptx(url) {
      // axios({
      //   method: 'get',
      //   responseType: 'blob', // 设置响应文件格式
      //   url: url,
      // }).then( ({data}) => {
      //   this.displayResult(data);
      // })
      axios.get(url,{
        responseType: "arraybuffer", // 设置响应体类型为arraybuffer
        headers: {'token':localStorage.getItem('token')}
      }).then(({data})=> {
        this.displayResult(data);
      })
    },
    displayResult(buffer) {
      // 取得扩展名
      const extend = 'pptx';
      // 输出目的地
      const { output } = this.$refs;
      // 生成新的dom
      const node = document.createElement("div");
      node.id = 'child'
      const child = output.appendChild(node);
      // 调用渲染方法进行渲染
      return new Promise((resolve, reject) =>
          render(buffer, extend, child).then(resolve).catch(reject)
      );
    },
    close(){
      //document.getElementById('pptx').innerHTML = '<div class="well" ref="output" id="pptx"></div>'
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  overflow: auto;
  text-align: center;
  /* background-color: #12b6ff; */
  color: #000;
}

.hidden .banner {
  display: none;
}

.hidden .well {
  height: calc(100vh - 12px);
}

.file-select {
  position: absolute;
  left: 5%;
  top: 17px;
  margin-left: 20px;
}

.banner div {
  color: #000;
}

.banner h1 {
  font-size: 20px;
  line-height: 2;
  margin: 0.5em 0;
}

.well {
  display: block;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  margin: 5px;
  width: calc(100% - 12px);
  height: calc(100vh - 73px);
  overflow: auto;
}

.loading {
  text-align: center;
  padding-top: 50px;
}

.messages .warning {
  color: #cc6600;
}
</style>

<style>
.pptx-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
