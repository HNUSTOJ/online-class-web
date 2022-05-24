<template>
  <div class="home">
    <div v-html="tableau" id="excels"></div>
  </div>
</template>

<script>
import axios from 'axios'
import XLSX from "xlsx";
export default {
  data(){
    return {
      tableau: null,
    }
  },
  methods:{
    excel(url){
      axios.get(url,{
        responseType: "arraybuffer", // 设置响应体类型为arraybuffer
        headers: {'token':localStorage.getItem('token')}
      }).then(({data})=> {
        let workbook = XLSX.read(new Uint8Array(data), {type:"array"}); // 解析数据
        var worksheet = workbook.Sheets[workbook.SheetNames[0]]; // workbook.SheetNames 下存的是该文件每个工作表名字,这里取出第一个工作表
        this.tableau = XLSX.utils.sheet_to_html(worksheet); // 渲染
      })
    },
    excelClear(){
      document.getElementById('excels').innerHTML = ''
    }
  }
}
</script>
