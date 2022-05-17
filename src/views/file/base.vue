<template>
  <div>
    <div id="result" contenteditable></div>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  data() {
    return {};
  },
  created() {
    //this.loadRemoteFile("http://152.136.122.135:8848/file/show?url=./file/2/2022毕业生档案转递潇湘学院.xls");
  },
  methods: {
    // 请求网络接口
    loadRemoteFile(url) {
      let _this = this;
      this.readWorkbookFromRemoteFile(url, function (workbook) {
        _this.readWorkbook(workbook);
      });
    },
    // 从网络上读取某个excel文件，url必须同域，否则报错
    readWorkbookFromRemoteFile(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function () {
        if (xhr.status == 200) {
          var data = new Uint8Array(xhr.response);
          var workbook = XLSX.read(data, { type: "array" });
          console.log(workbook,'table 数据')
          if (callback) callback(workbook);
        }
      };
      xhr.send();
    },
    // 读取 excel文件
    readWorkbook(workbook) {
      var sheetNames = workbook.SheetNames; // 工作表名称集合
      var worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
      var csv = XLSX.utils.sheet_to_csv(worksheet);
      document.getElementById("result").innerHTML = this.csv2table(csv);
    },
    // 将csv转换成表格
    csv2table(csv) {
      var html = "<table>";
      var rows = csv.split("\n");
      rows.pop(); // 最后一行没用的
      rows.forEach(function (row, idx) {
        var columns = row.split(",");
        columns.unshift(idx + 1); // 添加行索引
        console.log(columns)
        if (idx == 0) {
          // 添加列索引
          html += "<tr>";
          for (var i = 0; i < columns.length; i++) {
            html +=
                "<th>" +
                (i == 0 ? "" : String.fromCharCode(65 + i - 1)) +
                "</th>";
          }
          html += "</tr>";
        }
        html += "<tr>";
        columns.forEach(function (column) {
          html += "<td>" + column + "</td>";
        });
        html += "</tr>";
      });
      html += "</table>";
      return html;
    },
    clear(){
      document.getElementById("result").innerHTML = ''
    }
  },
};
</script>

<style>
table {
  border-collapse: collapse;
}
th,
td {
  border: solid 1px #6d6d6d;
  padding: 5px 10px;
}
</style>
