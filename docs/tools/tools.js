'use strict';

import { state } from '../modules/app/reducers/reducers';

//时间转换接口
let _transfromTime = (timeStamp, hasHour, hasSec) => {
  const date = new Date(timeStamp * 1000);
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  if (isNaN(y) || isNaN(m) || isNaN(d)) {
    return '';
  } else {
    if (m < 10) {
      m = '0' + m;
    }
    if (d < 10) {
      d = '0' + d;
    }
    if (h < 10) {
      h = '0' + h;
    }
    if (min < 10) {
      min = '0' + min;
    }
    if (sec < 10) {
      sec = '0' + sec;
    }
    if (hasHour === false) {
      return y + '-' + m + '-' + d;
    }
    if (hasSec === false) {
      return y + '-' + m + '-' + d + ' ' + h + ':' + min;
    }

    return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + sec;
  }
};

//时间转换接口
let transfromTime = (timeStamp, hasHour) => {
  const date = new Date(timeStamp * 1000);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  if (isNaN(y) || isNaN(m) || isNaN(d)) {
    return '';
  } else {
    if (hasHour === false) {
      return y + '-' + m + '-' + d;
    }
    return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + sec;
  }
};

//ajax请求接口
let _Ajax = (url, method, dataType, postData, success, error, complete) => {
  if (state && state.companyInfo.vvids) {
    postData.vvids = state.companyInfo.vvids;
  }
  postData = {
    data: postData,
  };

  $.ajax({
    url: url,
    type: method,
    data: postData,
    dataType: dataType,
    success(data) {
      if (data.status == 1) {
        if (data.redirect_uri) {
          window.location.href = data.redirect_uri;
        }
      }
      success(data);
    },
    error(err) {
      error(err);
    },
    complete(xhr, textState) {
      if (complete) {
        console.log('complete', textState);
        complete(xhr, textState);
      }
    },
  });
};

let _POST = (url, data, success, error, complete) => {
  if (state && state.companyInfo.vvids) {
    data.vvids = state.companyInfo.vvids;
  }
  data = {
    data: data,
  };

  $.ajax({
    url: url,
    type: 'post',
    data: data,
    dataType: 'json',
    success(res) {
      if (res.status == 1) {
        if (res.redirect_uri) {
          if (res.redirect_uri === 'reload') {
            window.location.reload(true);
          } else {
            window.location.href = res.redirect_uri;
          }
        } else {
          success(res);
        }
      } else {
        error(res.msg);
      }
    },
    error(err) {
      error('网络错误');
    },
    complete(xhr, textState) {
      if (complete) {
        complete(xhr, textState);
      }
    },
  });
};

/**
 * request 为json格式数据
 * @param url
 * @param data
 * @param success
 * @param error
 * @param complete
 * @private
 */

let _postJson = (url, data, success, error, complete) => {
  data = {
    data: data,
  };
  $.ajax({
    url: url,
    type: 'post',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success(res) {
      if (res.status == 1) {
        if (res.redirect_uri) {
          window.location.href = res.redirect_uri;
        } else {
          success(res);
        }
      } else {
        error(res.msg);
      }
    },
    error(err) {
      error('网络错误');
    },
    complete(xhr, textState) {
      if (complete) {
        complete(xhr, textState);
      }
    },
  });
};

// /**
//  * 比较两个值是否相等
//  * @param objA
//  * @param objB
//  * @returns {boolean}
//  * @private
//  */
// let _shallowEqual = (objA, objB)=>{
// 	if (objA === objB) {
// 		return true;
// 	}
//
// 	if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
// 		return false;
// 	}
//
// 	const keysA = Object.keys(objA);
// 	const keysB = Object.keys(objB);
//
// 	if (keysA.length !== keysB.length) {
// 		return false;
// 	}
//
// 	const bHasOwnProperty = hasOwnProperty.bind(objB);
// 	for (let i = 0; i < keysA.length; i++) {
// 		const keyA = keysA[i];
//
// 		if (objA[keyA] === objB[keyA]) {
// 			continue;
// 		}
//
// 		// special diff with Array or Object
// 		if (_.isArray(objA[keyA])) {
// 			if (!_.isArray(objB[keyA]) || objA[keyA].length !== objB[keyA].length) {
// 				return false;
// 			} else if (!_.isEqual(objA[keyA], objB[keyA])) {
// 				return false;
// 			}
// 		} else if (_.isPlainObject(objA[keyA])) {
// 			if (!_.isPlainObject(objB[keyA]) || !_.isEqual(objA[keyA], objB[keyA])) {
// 				return false;
// 			}
// 		} else if (!bHasOwnProperty(keyA) || objA[keyA] !== objB[keyA]) {
// 			return false;
// 		}
// 	}
// 	return true;
// };

//读文件
let writeFiles = () => {};

//写文件
let readFiles = () => {};

/**
 * 需要保证引用的时候相关数据已加载完成
 * 获取权限统一接口
 * @param type [权限类型]
 * @param permissionID [权限ID]
 * @param params 【其他参数】
 *1。公司是否有风控查看的权限
 *2 版本权限提示 0---正常显示  1----不显示  2----显示并且禁用提示 4----？？？？
 *3.数量限制提示
 *4.免费版重定向
 */

let _isHasPermission = (type, permissionID, params) => {
  switch (type) {
    case 1:
      return state.companyInfo.version === 6 && state.companyInfo.type === 1;
    case 2:
      {
        const versionPermission = state.permissions.versionPermission;
        if (
          !versionPermission[permissionID] ||
          parseInt(versionPermission[permissionID].useFlag) === 0
        ) {
          return {
            status: 0,
            comClass: '',
          };
        } else {
          switch (parseInt(versionPermission[permissionID].type)) {
            case 52:
              return {
                status: 1,
              };
            case 51: {
              const tip = state.companyInfo.versionName + '不支持该功能';
              return {
                status: 2,
                tip: tip,
                comClass: 'disabled',
              };
            }
            default: {
              return {
                status: 0,
                comClass: '',
              };
            }
          }
        }
      }
      break;
    case 3:
      {
        const versionPermission = state.permissions.versionPermission;
        if (
          versionPermission[permissionID] &&
          typeof versionPermission[permissionID].numLimit !== 'undefined'
        ) {
          const numLimit = versionPermission[permissionID].numLimit;
          const status = numLimit < params['num'];
          if (status) {
            return {
              status: 0,
              msg: params['key'] + '：' + numLimit,
            };
          }
        }
        return {
          status: 1,
        };
      }
      break;
    case 4: {
      //permissionID : 模块ID
      const perssionList = state.permissions.versionPermission;
      if (state.companyInfo.version === 4) {
        //免费版本
        const module = perssionList[permissionID];
        if (module && module.useFlag === 1 && module.type === 53) {
          //useFlg 1 type 53不可以跳转，其他可以跳转
          return false;
        }
      }
      return true;
    }
    //车贷版本
    case 5:
      switch (parseInt(state.companyInfo.version)) {
        case 2:
        case 3:
        case 5:
        case 6:
        case 12:
          return true;
        default:
          return false;
      }
      break;
    // 放贷须过几级审批
    case 6:
      switch (parseInt(state.companyInfo.version)) {
        case 2:
        case 3:
        case 5:
          return 4;
        case 6:
          return 10;
        // case 1:
        // case 4:
        // case 7:
        // case 12:return 2;
        default:
          return 2;
      }
      break;
    // 是不是专业版
    case 7:
      switch (parseInt(state.companyInfo.version)) {
        case 2:
        case 3:
        case 5:
        case 6:
          return 1;
        default:
          return 0;
      }
      break;
    default:
      return 'Error';
  }
};
/**
 * 获取公司文案
 * 保证加载组件的时候已经加载完成
 */
const _getCompanyText = () => {
  return state.companyText;
};

/**
 * @param str [解析字符转]
 * @param originalValue 【options】,初始值
 */
const _parseJSON = (str, originalValue) => {
  let value;
  try {
    value = JSON.parse(str);
  } catch (err) {
    //解析json字符发生错误的时候处理成空字符
    if (originalValue) {
      value = originalValue;
    } else {
      value = [];
    }
  }
  return value;
};

module.exports = {
  transfromTime: _transfromTime,
  Ajax: _Ajax,
  POST: _POST,
  postJson: _postJson,
  isHasPermission: _isHasPermission,
  getCompanyText: _getCompanyText,
  parseJSON: _parseJSON,
};
