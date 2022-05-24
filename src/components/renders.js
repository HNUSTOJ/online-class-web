import renderPptx from "@/vendors/pptx";

// 假装构造一个vue的包装，让上层统一处理销毁和替换节点
const VueWrapper = (el) => ({
  $el: el,
  $destroy() {
    // 什么也不需要 nothing to do
  },
});

const handlers = [
  // 使用pptx2html，已通过默认值更替
  {
    accepts: ["pptx"],
    handler: async (buffer, target) => {
      await renderPptx(buffer, target, null);
      //window.dispatchEvent(new Event("resize"));
      return VueWrapper(target);
    },
  },
  {
    accepts: ["error"],
    handler: async (buffer, target, type) => {
      target.innerHTML = `<div style="text-align: center; margin-top: 80px">不支持.${type}格式的在线预览，请下载后预览或转换为支持的格式</div>
<div style="text-align: center">支持pptx的在线预览</div>`;
      return VueWrapper(target);
    },
  },
];

// 匹配
export default handlers.reduce((result, { accepts, handler }) => {
  accepts.forEach((type) => (result[type] = handler));
  return result;
}, {});
