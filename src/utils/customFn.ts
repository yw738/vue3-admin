/**
 * ------------------------自定义的公共方法-----------------
*/
import { exportApi } from '@/api/exportApi';
import { uploadApi } from '@/api/uploadApi';
import { ElMessageBox, ElMessage } from 'element-plus';

/**
 * 解析二进制流下载文件
*/
function AnalysisBlobFile(data: any, fileName: string, fileType: string) {
  let type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  if (fileType == 'pdf') {
    type = 'application/pdf;charset=UTF-8'
  }
  const url = window.URL.createObjectURL(new Blob([data], { type: type }))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
/**
 * 下载base64图片
*/
function DownloadBase64Img(url: string) {
  const img = url
  const link = document.createElement('a')
  link.href = img
  link.download = 'download.png'
  link.click()
}
/**
 * 获取当前时间
 * 2021-01-01 00:00:00
 * @param {boolean} isHasHMS是否要包含时分秒
*/
const getTime = (isHasHMS = false) => {
  const time = new Date();
  const year = time.getFullYear();
  let month: any = time.getMonth() + 1; //月份是从0开始的
  let day: any = time.getDate();
  let h: any = time.getHours();
  let m: any = time.getMinutes();
  let s: any = time.getSeconds();
  month = month.toString().padStart(2, "00");//补0
  day = day.toString().padStart(2, "00");
  h = h.toString().padStart(2, "00");
  m = m.toString().padStart(2, "00");
  s = s.toString().padStart(2, "00");
  if (isHasHMS) {
    return `${year}-${month}-${day} ${h}:${m}:${s}`;
  } else {
    return `${year}-${month}-${day}`;
  }
}

/**
 * 时间戳 => 时间
 * @param {Number|string} timestamp 时间戳
 */
const dateFormat = (timestamp: number | string, isHasHMS = false, isHasS = true) => {
  const time = new Date(timestamp); //先将时间戳转为Date对象，然后才能使用Date的方法
  const year = time.getFullYear();
  let month: any = time.getMonth() + 1; //月份是从0开始的
  let day: any = time.getDate();
  let h: any = time.getHours();
  let m: any = time.getMinutes();
  let s: any = time.getSeconds();
  month = month.toString().padStart(2, "00");//补0
  day = day.toString().padStart(2, "00");
  h = h.toString().padStart(2, "00");
  m = m.toString().padStart(2, "00");
  s = s.toString().padStart(2, "00");
  if (isHasHMS) {
    if (isHasS) {
      return `${year}-${month}-${day} ${h}:${m}:${s}`;
    } else {
      return `${year}-${month}-${day} ${h}:${m}`;
    }
  } else {
    return `${year}-${month}-${day}`;
  }
}

/**
 * 时间=>时间戳
 * @param {String} date 时间
 */
const dateFormatNum = (date: string) => {
  return new Date(date).getTime()
}

/**
 * 获取今日
 * 2021-01-03
 */
const getToDay = () => {
  return dateFormat(new Date().getTime());
}

/**
 * 获取昨日
 * 2021-01-02
 */
const getYesterday = () => {
  const day = 86400000;
  return dateFormat(new Date().getTime() - day);
}

/**
 * 获取明日
 * 2021-01-04
 */
const getTomorrow = () => {
  const day = 86400000;
  return dateFormat(new Date().getTime() + +day);
}

/**
 * 获取本周时间
 * 周第一天-最后一天
 * [2021-12-13,2021-12-19] 周一，周日
 */
const getWeek = () => {
  const now = new Date();
  const nowTime = now.getTime();
  const day = now.getDay();
  const oneDayTime = 24 * 60 * 60 * 1000;
  //显示周一
  const MondayTime = nowTime - (day - 1) * oneDayTime;
  //显示周日
  const SundayTime = nowTime + (7 - day) * oneDayTime;
  const monday = new Date(MondayTime).getTime();
  const sunday = new Date(SundayTime).getTime();
  //打印查看结果
  return [dateFormat(monday), dateFormat(sunday)];
}

/**
 * 获取本月时间
 * ['2022-01-01', '2022-01-31']
 */
const getMonth = () => {
  const newTimeArr = dateFormat(new Date().getTime()).split("-");
  const val = `${newTimeArr[0]}-${newTimeArr[1]}`;
  const arr: Array<number | string> = val.split("-");
  const timeStar: string = val + "-01";
  const day = 86400000;
  let nextM = null;
  let year: any = arr[0];
  if (arr[1] == 12) {
    nextM = 1; //判断是否跨年
    year++;
  } else {
    nextM = Number(arr[1]) + 1;
  }
  //选择月的最后一天的时间戳
  const mLastDay = new Date(`${year}-${nextM}-01`).getTime() - day;
  return [dateFormat(timeStar), dateFormat(mLastDay)];
}

/**
 * 获取本年时间段
 * ['2021-01-01', '2021-12-31']
 */
const getYear = () => {
  const newTimeArr = dateFormat(new Date().getTime()).split("-");
  const timeStar = newTimeArr[0] + "-01-01";
  const day = 86400000;
  const nextY = Number(newTimeArr[0]) + 1;
  const yLastDay = new Date(`${nextY}-01-01`).getTime() - day; //选择今年的第一天的时间戳
  return [dateFormat(timeStar), dateFormat(yLastDay)];
}

/**
 * 获取两个日期中间的所有日期
 * @param {String} starDay 开始日期
 * @param {String} endDay 结束日期
 * ['2022-01-01', '2022-01-02', ... ,'2022-01-29', '2022-01-30', '2022-01-31']
 */
const getTimeSpace = (starDay: string, endDay: string) => {
  const arr = [];
  const dates = [];
  // 设置两个日期UTC时间
  const db = new Date(starDay);
  const de = new Date(endDay);
  // 获取两个日期GTM时间
  const s = db.getTime() - 24 * 60 * 60 * 1000;
  const d = de.getTime() - 24 * 60 * 60 * 1000;
  // 获取到两个日期之间的每一天的毫秒数
  for (let i = s; i <= d;) {
    i = i + 24 * 60 * 60 * 1000;
    arr.push(parseInt(i as any));
  }
  // 获取每一天的时间  YY-MM-DD
  for (const j in arr) {
    const time = new Date(arr[j]);
    const year = time.getFullYear();
    const mouth =
      time.getMonth() + 1 >= 10 ?
        time.getMonth() + 1 :
        "0" + (time.getMonth() + 1);
    const day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
    const YYMMDD = year + "-" + mouth + "-" + day;
    dates.push(YYMMDD);
  }
  return dates;
}

/**
 * 判断某个时间是否在一段时间内
 * @param {string} time 需要判断的时间 //2018-3-28 14:44
 * @param {string} startTime 开始的时间点 //2018-3-28 16:44
 * @param {string} endTime 结束的时间点 //2018-3-28 16:45
 * @returns {boolean} true 在时间内 false 在时间外
 * judgmentTime('2018-3-28 14:44','2018-3-28 9:30','2018-3-29 3:20') //true
 * judgmentTime('2018-3-28 9:20','2018-3-28 9:30','2018-3-29 3:20')  //false
 */
const judgmentTime = (time = '', startTime = '', endTime = '') => {
  //把字符串格式转换为日期类
  const curTime = new Date(Date.parse(time));
  const sTime = new Date(Date.parse(startTime));
  const eTime = new Date(Date.parse(endTime));
  return curTime >= sTime && curTime <= eTime; //进行比较
}

// 枚举转数组
function enum2Arr(enumData: any) {
  const arr = []
  for (const [value, label] of Object.entries(enumData)) {
    arr.push({
      label,
      value
    })
  }
  return arr
}

/**
 * 平层列表转树形结构
 * id 与 pid 必有。
 * id = 当前节点id
 * pid = 当前节点的父id
 * @param {array} arr 数组
 * @param {number|string} id 唯一的id。第一次默认为顶层id = -1
 * @returns {array} array 返回一个列表树
 */
const list2Tree = (arr = [], id = -1) => {
  const array = [];
  for (let i = 0; i < arr.length; i++) {
    const item: any = arr[i];
    if (id == item.pid) {
      const children = list2Tree(arr, item.id);
      const json = {
        ...item,
        pid: id,
        id: item.id
      };
      if (children?.length) json.children = children;
      array.push(json);
    }
  }
  // 代表是顶层
  if (id == -1) {
    return [
      {
        id,
        pId: null,
        children: array
      }
    ];
  } else {
    return array;
  }
};

/**
 * 树形结构转平层列表
 * @param {array} arr 数组
 * @returns {array} array 返回一个列表树
 */
const tree2List = (arr: any = []) => {
  const array = [];
  for (let i = 0; i < arr.length; i++) {
    const item: any = arr[i];
    let children: any[any] = [];
    if (item.children?.length) {
      children = tree2List(item.children)
    }
    const json = JSON.parse(JSON.stringify(item));
    if (json.children) delete json.children;
    if (children?.length) {
      array.push(...children);
    }
    array.push(json);
  }
  return array;
};


let ElMessageBoxAsync = () => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm('此操作将导出文件, 是否继续?', '提示')
      .then(() => { resolve(true) })
      .catch(() => {
        // catch error
        resolve(false)
      });
  })
}

/**
 * 文件下载
 * @param {string} apiName 对象名
 * @param {object} searchData 查询条件
 *
let exportFn = () => {
  (window as any).fileDown('businessUser', state.searchData);
};
 */
const fileDown = async (apiName = '', searchData = {}, fileName?: string) => {
  return new Promise(async (resolve, reject) => {

    let bFlog: any
    apiName == 'fileTemplate' ? bFlog = true : bFlog = await ElMessageBoxAsync();
    if (!bFlog) return
    try {
      const api = (exportApi as any)[apiName];
      let params = {} as any
      params = JSON.parse(JSON.stringify(searchData));
      // null做处理
      for (const [label, value] of Object.entries(params)) {
        if (value === null) {
          params[label] = ""
        }
      }
      let name = fileName || api.name
      delete params['__v_isRef']
      delete params['_defaultValue']
      delete params['_key']
      delete params['_object']
      if (!api) return;
      api.down(params).then((res: any) => {
        if (res.data.type == 'application/json') {
          if (res.data instanceof Blob) {
            var blob = res.data;
            //通过FileReader读取数据
            var reader = new FileReader();
            //以下这两种方式我都可以解析出来，因为Blob对象的数据可以按文本或二进制的格式进行读取
            // reader.readAsBinaryString(blob);
            reader.readAsText(blob, 'utf8');
            reader.onload = function (jsonData: any) {
              let response = JSON.parse(jsonData.target.result);
              ElMessage.error(response?.msg || '该失败数据已过期，无法下载。');
              resolve(true)
            };
          }
        } else if (res.data) {
          ElMessage.success('导出成功！');
          (window as any).AnalysisBlobFile(
            res.data,
            name + '_' + new Date().getTime() + '.xlsx'
          );
        }
      });
    } catch (err) {
    }

  })
};


/**
 * 文件上传
 * @param {string} apiName 对象名
 * @param {object} searchData 查询条件
 *
 * eg:
let uploadFn = () => {
  (window as any).fileDown('businessUser', state.searchData);
};

 */
const uploadFileFn = (apiName = '', searchData = {}) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm('此操作将导出文件, 是否继续?', '提示')
      .then(() => {
        try {
          const api = (uploadApi as any)[apiName];
          let params = JSON.parse(JSON.stringify(searchData))
          if (!api) return;
          api.uploadF(params).then((res: any) => {
            if (res.data.type == 'application/json') {
              ElMessage.success('上传成功');
            } else if (res.data) {
              ElMessage.info('导入文件，格式有误，请改正！');
              (window as any).AnalysisBlobFile(
                res.data,
                api.name + new Date().getTime() + '.xlsx'
              );
            }
            resolve({});
          });
        } catch (err) {
          reject()
        }
      })
      .catch(() => {
        reject()
      });
  })

};

/**
 * 通过id查询label
*/
function findLabel(arr = [], id: any) {
  return arr.filter((v: any) => v.value === id)[0]?.label ?? ''
}

/**
 * 通过label 查询  id
*/
function findValue(arr = [], label: any) {
  return arr.filter((v: any) => v.label === label)[0]?.value ?? ''
}

/**
 * 计算文件大小
*/
function change_size(filesize: any) {
  var size = "";
  if (filesize < 0.1 * 1024) {                         //小于0.1KB，则转化成B
    size = filesize.toFixed(2) + "B"
  } else if (filesize < 0.1 * 1024 * 1024) {            //小于0.1MB，则转化成KB
    size = (filesize / 1024).toFixed(2) + "KB"
  } else if (filesize < 0.1 * 1024 * 1024 * 1024) {     //小于0.1GB，则转化成MB
    size = (filesize / (1024 * 1024)).toFixed(2) + "MB"
  } else {                                            //其他转化成GB
    size = (filesize / (1024 * 1024 * 1024)).toFixed(2) + "GB"
  }
  var sizeStr = size + "";                        //转成字符串
  var index = sizeStr.indexOf(".");                    //获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
  if (dou == "00") {                                //判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}


// 挂载方法到window
(window as any).AnalysisBlobFile = AnalysisBlobFile;
(window as any).DownloadBase64Img = DownloadBase64Img;
(window as any).getTime = getTime;
(window as any).dateFormat = dateFormat;
(window as any).dateFormatNum = dateFormatNum;
(window as any).getToDay = getToDay;
(window as any).getYesterday = getYesterday;
(window as any).getTomorrow = getTomorrow;
(window as any).getWeek = getWeek;
(window as any).getMonth = getMonth;
(window as any).getYear = getYear;
(window as any).getTimeSpace = getTimeSpace;
(window as any).judgmentTime = judgmentTime;
(window as any).enum2Arr = enum2Arr;
(window as any).list2Tree = list2Tree;
(window as any).tree2List = tree2List;
(window as any).fileDown = fileDown;
(window as any).uploadFileFn = uploadFileFn;
(window as any).findLabel = findLabel;
(window as any).findValue = findValue;
(window as any).change_size = change_size;

