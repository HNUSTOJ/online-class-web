// const videoSource = [
//   {
//     src: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
//     resolution: 360,
//   }, {
//     src: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
//     resolution: 720,
//   }, {
//     src: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
//     resolution: 1080
//   }
// ]


const DATA = [{
  id: 'gdbzhhifhh',
  title: '5 Centimeters per Second',
  author: 'Makoto Shinkai',
  date: '2007',
  desc: 'The story is set in Japan, beginning in the 1990s up until the present day (2008),[a] with each act centered on a boy named Takaki Tōno. The first act takes place during a time when cell phones are uncommon and email had not yet reached the general population',
  link: 'https://www.youtube.com/watch?v=tr8JzTLlq30',
  cover: 'https://img1.wxzxzj.com/vpc-example-cover-5cm.png',
  cover2: 'https://img1.wxzxzj.com/vpc-example-cover-5cm-v.jpg',
  cover3: 'https://img1.wxzxzj.com/vpc-example-cover-5cm-c.jpg',
  source: 'http://152.136.122.135:8848/file/show?url=./file/2/Blue_Sky_and_Clouds_Timelapse_0892__Videvo.mov',
  duration: '1:02:35'
}, {
  id: 'hfkhzwgnwx',
  title: 'The Garden of Words',
  author: 'Makoto Shinkai',
  date: '2013',
  desc: "The Garden of Words is considered a romance[1] and drama film.[2] It opens at the start of the rainy season in Tokyo with Takao Akizuki (秋月 孝雄, Akizuki Takao), a 15-year-old student and aspiring shoemaker, opting to skip his first class and sketch shoe designs in the garden at Shinjuku Gyoen. There he encounters Yukari Yukino (雪野 百香里, Yukino Yukari), a 27-year-old woman who is skipping work and enjoying beer and chocolate.",
  link: 'https://www.bilibili.com/bangumi/play/ss2546/?from=search&seid=5227685957756304310',
  cover: 'https://img1.wxzxzj.com/vpc-example-cover-the-garden.png',
  cover2: 'https://img1.wxzxzj.com/vpc-example-cover-the-garden-v.jpg',
  cover3: 'https://img1.wxzxzj.com/vpc-example-cover-the-garden-c.jpg',
  source: 'http://152.136.122.135:8848/file/show?url=./file/2/7d515b22c4958598c0fbd1e6290a5ca5.mp4',
  duration: '00:46:04'
// },  {
//   id: 'jiytmghmyo',
//   title: 'Your Name',
//   author: 'Makoto Shinkai',
//   date: '2016',
//   desc: "Mitsuha Miyamizu is a high school girl living in the town of Itomori in Japan's mountainous Hida region. She is bored with country life and wishes to be a handsome boy in her next life. She begins to switch bodies intermittently with Taki Tachibana, a high school boy in Tokyo, when they wake up. They communicate by writing messages on paper, their phones, and sometimes on each other's skin. Mitsuha causes Taki to develop a relationship with his coworker Miki, while Taki causes Mitsuha to become popular in school.",
//   link: 'https://www.bilibili.com/bangumi/play/ss12044/?from=search&seid=9670386519186098373',
//   cover: 'https://img1.wxzxzj.com/vpc-example-cover-your-name.png',
//   cover2: 'https://img1.wxzxzj.com/vpc-example-cover-your-name-v.jpg',
//   cover3: 'https://img1.wxzxzj.com/vpc-example-cover-your-name-c.png',
//   source: videoSource,
//   duration: '01:46:04'
}, {
  id: 'szmnyobnap',
  title: 'Weathering with You',
  author: 'Makoto Shinkai',
  date: '2019',
  desc: "High schooler Hodaka Morishima runs away from his island home, planning to move to Tokyo. When his ferry is hit by a freak rainstorm, he is saved by Keisuke Suga, who gives Hodaka his business card. In Tokyo, Hodaka struggles to find work; a teenage McDonald's employee, Hina, takes pity on him and gives him food. After a chance encounter with a mobster, Hodaka finds a gun in a trashcan. Suga hires him as his assistant at a small publishing company, where he meets Suga's niece Natsumi. They investigate urban legends relating to the unusually rainy weather in Tokyo; from a psychic, they hear the legend of a \"weather maiden\" who can control the weather.",
  link: 'https://www.youtube.com/watch?v=ps8qwWG8Uio',
  cover: 'https://img1.wxzxzj.com/vpc-example-cover-weathering.png',
  cover2: 'https://img1.wxzxzj.com/vpc-example-cover-weathering-v.jpg',
  cover3: 'https://img1.wxzxzj.com/vpc-example-cover-weathering-c.jpg',
  source: 'http://152.136.122.135:8848/file/show?url=./file/2/7d515b22c4958598c0fbd1e6290a5ca5.mp4',
  duration: '01:51:00'
}, {
  id: 'usgfiayjqx',
  title: 'CJ7',
  author: 'Stephen Chow',
  date: '2008',
  desc: "",
  link: 'hhttps://cdn.videvo.net/videvo_files/video/premium/getty_115/large_watermarked/istock-1077596666_preview.mp4',
  cover: 'https://img1.wxzxzj.com/vpc-example-cover-CJ7.png',
  cover2: 'https://img1.wxzxzj.com/vpc-example-cover-CJ7-v.jpg',
  cover3: 'https://img1.wxzxzj.com/vpc-example-cover-CJ7-c.jpg',
  source: 'http://152.136.122.135:8848/file/show?url=./file/2/7d515b22c4958598c0fbd1e6290a5ca5.mp4',
  duration: '00:46:04'
}];

export default DATA;

export const ascii = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

export const judge_result = ['等待','等待重判','编译中','运行并评判','正确','格式错误','答案错误','时间超限','内存超限','输出超限','运行错误','编译错误','编译成功','测试运行','待裁判确认','重置']

export const lang = [
  {value: 0, label: 'C'}, {value: 1, label: 'C++'}, {value: 2, label: 'Pascal'}, {value: 3, label: 'Java'}, {value: 4, label: 'Ruby'},
  {value: 5, label: 'Bash'}, {value: 6, label: 'Python'}, {value: 7, label: 'PHP'}, {value: 8, label: 'Perl'}, {value: 9, label: 'C#'},
  {value: 10, label: 'Obj-C'}, {value: 11, label: 'FreeBasic'}, {value: 12, label: 'Scheme'}, {value: 13, label: 'Clang'}, {value: 14, label: 'Clang++'},
  {value: 15, label: 'Lua'}, {value: 16, label: 'JavaScript'}, {value: 17, label: 'Go'}, {value: 18, label: 'SQL'}, {value: 19, label: 'Fortran'}, {value: 20, label: 'Matlab'}
]

export const lang_name = ['C','C++','Pascal','Java','Ruby','Bash','Python','PHP','Perl','C#','Obj-C','FreeBasic','Scheme','Clang','Clang++','Lua','JavaScript','Go','SQL','Fortran','Matlab','UnknownLanguage']





















