import request from "@/utils/request";

//首页路径
const Index = 'index/'

//班级路径
const Class = 'class/'

//签到路径
const Attendance = 'attendance/'

//登录路径
const Login ='admin/'

//实训作业路径
const Training = 'training/'

//普通作业路径
const Common = 'common/'

//文件资源路径
const File = 'file/'

//视频资源路径
const Video = 'video/'


//登录接口
export function postLogin(data){
    return request(Login + 'login', data, "post")
}

//获取首页全部课堂
export function getCourseAll(data){
    return request(Index + `course_all`, data, "get")
}

//获取正在进行的全部课堂
export function getCourseIngAll(data){
    return request(Index + `course_ing_all`, data, "get")
}

//获取已结束的全部课堂
export function getCourseEndAll(data){
    return request(Index + `course_end_all`, data, "get")
}

//获取我管理的全部课堂
export function getCourseManagementAll(data){
    return  request(Index + `course_management_all`, data, "get")
}

//获取我管理的正在进行的课堂
export  function getCourseManagementIng(data){
    return request(Index + `course_management_ing`, data, "get")
}

//获取我管理的已结束的课堂
export function getCourseManagementEnd(data){
    return request(Index + `course_management_end`, data,"get" )
}

//获取我学习的全部课堂
export function getCourseStudyAll(data){
    return request(Index + `course_study_all`, data,"get")
}

//获取我学习的正在进行的课堂
export function getCourseStudyIng(data){
    return request(Index + `course_study_ing`, data,"get")
}

//获取我学习的已结束的课堂
export function getCourseStudyEnd(data){
    return request(Index + `course_study_end`, data,"get")
}

//新建教学课堂
export function postCourseInsert(data){
    return request(Index + 'course/insert', data, "post")
}

//加入课堂
export function postCourseJoin(data){
    return request(Index + 'course/join', data, "post")
}

//全部搜索
export function getIndexSearch(data){
    return request(Index + 'search' , data, "get")
}

//删除教学课堂
export function postCourseDelete(data){
    return request(Index + 'course/delete', {courseid:data.id}, "post")
}

//班级管理
//获取课堂管理首页
export function getClassList(data){
    return request(Class + `${data.id}`, {page:data.page} , "get")
}

//获取搜索课堂管理
export function getClassSearch(data){
    return request(Class + `${data.id}/` + 'search', {page:data.page,name:data.name}, "get")
}

//获取班级详情页面
export function getClassListInfo(data){
    return request(Class + `${data.id}` + '/info', {page:data.page, classid:data.classId}, "get")
}

//获取搜索班级详情
export function getClassSearchInfo(data){
    return request(Class + `${data.id}/` + 'search/info', {page:data.page,classid:data.classId,name:data.name}, "get")
}

//获取课堂下所有班级
export function getClassAll(data){
    return request(Class + 'class_all/' + `${data.id}`, null, "get")
}

//获取当前学生所在课堂班级
export function getCourseClass(data){
    return request(Class + 'course_class', {course_id:data.id}, "get")
}

//新增班级
export function postClassInsert(data){
    return request(Class + 'insert', data, "form")
}

//删除班级
export function postClassDelete(data){
    return request(Class + 'delete', {class_id:data.class_id},"post")
}

//修改班级名称
export function postClassEdit(data){
    return request(Class + 'edit', data, "form")
}

//移动班级人员
export function postClassMove(data){
    return request(Class + 'move', data, "form")
}

//删除班级人员
export function postClassDeleteStu(data){
    return request(Class + 'delete/stu', data, "form")
}

//签到
//获取全部签到首页数据
export function getAttendanceList(data){
    return request(Attendance+`${data.id}`,{page:data.page},"get")
}

//获取正在签到首页数据
export function getAttendanceListNow(data){
    return request(Attendance+'now/'+`${data.id}`,{page:data.page},"get")
}

//获取历史签到首页数据
export function getAttendanceListHistory(data){
    return request(Attendance+'history/'+`${data.id}`,{page:data.page},"get")
}

//获取签到统计数据
export function getAttendanceStatistics(data){
    return request( Attendance + 'statistics/'+`${data.id}`,null,"get")
}

//获取签到详细数据
export function getAttendanceInfo(data){
    return request(Attendance + 'info', {page:data.page,sign_state:data.sign_state,sign_id:data.sign_id}, "get")
}

//创建签到
export function postAttendanceCreate(data){
    return request(Attendance + 'create',data,"form")
}

//编辑签到
export function postAttendaceEdit(data){
    return request(Attendance + 'edit', data, "form")
}

//删除签到
export function postAttendanceDel(data){
    return request(Attendance + 'delete',{sign_id:data.signId},"post")
}

//学生签到
export function postAttendanceSign(data){
    return request(Attendance + 'sign',{sign_id:data.sign_id,state:data.state}, "post")
}

//实训作业
//获取全部实训作业（搜索）
export function getTrainingContestList(data){
    return request(Training + 'contest_list', {course_id:data.id,page:data.page,title:data.title}, "get")
}

//获取全部正在进行实训作业（搜索）
export function getTrainingContestListIng(data){
    return request(Training + 'contest_list/ing', {course_id:data.id,page:data.page,title:data.title}, "get")
}

//获取全部已结束实训作业（搜索）
export function getTrainingContestListEnd(data){
    return request(Training + 'contest_list/end', {course_id:data.id,page:data.page,title:data.title}, "get")
}

//获取题目编号数据
export function getTrainingProblemTitle(data){
    return request(Training + 'problem_title', {problem_id:data.problem_id}, "get")
}

//获取实训编辑信息
export function getTrainingEditInfo(data){
    return request(Training + 'eidt_info', {contest_id:data.id}, "get")
}

//获取实训详细作业
export function getTrainingContestInfo(data){
    return request(Training + 'contest_info', {contest_id:data.id}, "get")
}

//获取实训的问题
export function getTrainingProblem(data){
    return request(Training + 'problem', {problem_id:data.id}, "get")
}

//获取实训作业提交状态（搜索）
export function getTrainingSearchStatus(data){
    return request(Training + 'search/status', data, "get")
}

//创建实训作业
export function postTrainingCreate(data){
    return request(Training + 'create', data, "form")
}

//编辑实训作业
export function postTrainingEdit(data){
    return request(Training + 'edit', data, "form")
}

//删除实训作业
export function postTrainingDelete(data){
    return request(Training + 'delete', {contest_id:data.id}, "post")
}

//普通作业
//获取全部普通作业（搜索）
export function getCommonList(data){
    return request(Common + 'list', data, "get")
}

//获取普通作业详情
export function getCommonInfo(data){
    return request(Common + 'info', data, "get")
}

//获取普通作业提交情况
export function getCommonSubmitInfo(data){
    return request(Common + 'submit/info', data, "get")
}

//普通作业分班情况
export function getCommonClass(data){
    return request(Common + 'class', data, "get")
}

//创建普通作业
export function postCommonCreate(data){
    return request(Common + 'create', data, "form")
}

//修改普通作业
export function postCommonEdit(data){
    return request(Common + 'edit', data, "post")
}

//删除普通作业
export function postCommonDelete(data){
    return request(Common + 'delete', data, "post")
}

//普通作业文件资源上传
export function postCommonUpload(data){
    return request(File + 'common/upload', {course_id:data.course_id,job_id:data.job_id,file:data.file}, "file")
}

//文件资源
//文件资源上传
export function postFileUploadOne(data){
    return request(File + 'upload/one', data, "file")
}

//获取文件资源（搜索）
export function getFileResources(data){
    return request(File + 'resources', {courseid:data.id,page:data.page,title:data.title}, "get")
}

//文件资源删除
export function postFileDelete(data){
    return request(File + 'delete', {courseid:data.id,url:data.url}, "post")
}

//文件资源下载
export function getFileDownload(data){
    return request(File + 'download', data, "fileDownLoad")
}

//普通专业文件资源下载
//文件资源下载
export function getFileDownloadJob(data){
    return request(File + 'download/job', data, "fileDownLoad")
}

//视频资源
//获取视频资源
export function getVideoList(data){
    return request(Video + 'list',data,"get")
}














