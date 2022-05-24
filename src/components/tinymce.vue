<template>
<div>
  <textarea :id="ID"></textarea>
</div>
</template>

<script>
export default {
  name:'tinymce',
  data(){
    const ID = Date.now()
    return {
      ID: ID,
    }
  },
  mounted() {
    tinymce.init({
      selector: `#${this.ID}`,
      language: 'zh_CN',
      branding: false,
      menubar: false,
      height: 240,
      min_height: 240,
      max_height: 300,
      toolbar: 'newdocument | bold italic forecolor | bullist numlist | code codesample link | emoticons image table | hr undo redo | preview',
      plugins: 'hr lists code codesample link emoticons image imagetools table preview textcolor',
      setup: function(editor) {
        editor.on('blur', function(e) {
          console.log(editor.getContent());
          localStorage.setItem('tinymceContent',editor.getContent())
        });
        editor.on('init', function(e) {
          if(localStorage.getItem('editDes')){
            editor.setContent(localStorage.getItem('editDes'))
          }
        });
      },
    });
  },
  beforeDestroy () {
    window.tinymce.remove(`#${this.ID}`) //销毁
  }
}
</script>
