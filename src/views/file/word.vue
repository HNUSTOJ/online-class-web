<template>
  <div>
    <div id="wordView" v-html="vHtml"/>
  </div>
</template>

<script>
import mammoth from "mammoth";
export default {
  name: "word",
  data() {
    return {
      vHtml: "",
      wordURL: "", //文件地址
    };
  },
  methods: {
    word(url){
      let vm = this;
      vm.wordURL = url;
      const xhr = new XMLHttpRequest();
      xhr.open("get", this.wordURL, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function () {
        if (xhr.status === 200) {
          mammoth
              .convertToHtml({
                arrayBuffer: new Uint8Array(xhr.response),
              })
              .then(function (resultObject) {
                vm.vHtml =resultObject.value;
              });
        }
      };
      xhr.send();
    },
    clear(){
      this.vHtml = ''
    }
  },
};
</script>

<style>
</style>
