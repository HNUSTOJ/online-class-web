<template>
<div>
<!--  <form method="" action="">-->
    <textarea :id="ID"></textarea>
<!--  </form>-->

</div>
</template>

<script>
export default {
  name:'tinymce',
  data(){
    const ID = Date.now()
    return {
      content: '',
      ID: ID
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
        editor.on('click', function(e) {
          console.log(editor.getContent());
        });
      }
    });
  },
  beforeDestroy () {
    window.tinymce.remove(`#${this.ID}`) //销毁
  }
}
</script>
