
/**
 * 检查手机号
 * @param phone 
 * @returns {boolean}
 * @private
 */
const _checkPhone = function(phone) {
	// if(!(/^1\d{10}$/.test(phone))){
	
  if( !(/^1\[3|5|6|7|8|9|]\d{9}$/.test(phone) ) ){
		return false;
	}
	return true;
};


/**
 * 检测固定电话
 * @param tel
 * @returns {boolean}
 * @private
 */
const _checkTel = function(tel) {
	if(!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)){
		return false;
	}
	
	return true;
};

/**
 * 检测email
 * @param  email 
 */
const _checkEmail=function (email) {
	if(!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)){
		return false;
	}
}

/**
 * 校验身份证
 * @param sId
 * @returns {boolean}
 * @private
 */
const _checkId = function(sId) {
	const aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	
	var iSum = 0 ;
	var info = "" ;
	
	if ( !/^\d{17}(\d|x)$/i.test(sId) ) {
		return false;  // "你输入的身份证长度或格式错误";
	}
	
	sId = sId.replace(/x$/i,"a");
	
	if ( aCity[parseInt(sId.substr(0,2))] == null ) {
		return false; // "你的身份证地区非法";
	}
	
	const sBirthday = sId.substr(6,4) + "-" + Number(sId.substr(10,2)) + "-" + Number(sId.substr(12,2));
	const d = new Date(sBirthday.replace(/-/g,"/")) ;
	
	if ( sBirthday != (d.getFullYear() + "-"+ (d.getMonth()+1) + "-" + d.getDate()) ) {
		return false; // "身份证上的出生日期非法";
	}
	
	for(var i = 17; i >= 0; i--) {
		iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
	}
	
	if(iSum % 11 != 1) {
		return false; // "你输入的身份证号非法";
	}
	
	//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
	return true;
};

const isChinaMobile = /^134[0-8]\d{7}$|^(?:13[5-9]|147|15[0-27-9]|178|18[2-478]|198)\d{8}$/;  // 移动方面最新答复
const isChinaUnion = /^(?:13[0-2]|145|15[56]|17[56]|18[5-6]|166)\d{8}$/;                          // 向联通微博确认并未回复
const isChinaTelcom = /^(?:133|153|173|177|18[019]|199)\d{8}$/;                                        // 1349号段 电信方面没给出答复，视作不存在
const isOtherTelphone = /^170([059])\d{7}$/;                                               // 其他运营商

const _checkMobile = function (telphone) {

	function setReturnJson(status, msg, data, servicePhone, telphone) {
		if (typeof status !== 'boolean' && typeof status !== 'number') {
			status = false;
		}
		if (typeof msg !== 'string') {
			msg = '';
		}
		return {
			'status': status,
			'msg': msg,
			'data': data,
			servicePhone: servicePhone,
			phone: telphone
		};
	}

	if (telphone.length !== 11) {
		return setReturnJson(false, '未检测到正确的手机号码');
	} else {
		if (isChinaMobile.test(telphone)) {
			return setReturnJson(true, '移动', {name: 'ChinaMobile'}, 10086, telphone);
		} else if (isChinaUnion.test(telphone)) {
			return setReturnJson(true, '联通', {name: 'ChinaUnion'}, 10010, telphone);
		} else if (isChinaTelcom.test(telphone)) {
			return setReturnJson(true, '电信', {name: 'ChinaTelcom'}, 10000, telphone);
		} else if (isOtherTelphone.test(telphone)) {
			return setReturnJson(false, '', {name: ''}, '', telphone);
		} else {
			return setReturnJson(false, '未检测到正确的手机号码', {name: ''}, '', telphone);
		}
	}
};

// 判断请求设备的系统 
const _checkDevice = function(ua) {
  let $ = {};  
  
	if (/mobile/i.test(ua))  
    $.Mobile = true;  
  
	if (/like Mac OS X/.test(ua)) {  
    $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');  
    $.iPhone = /iPhone/.test(ua);  
    $.iPad = /iPad/.test(ua);  
	}  
  
	if (/Android/.test(ua))  
    $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];  
  
	if (/webOS\//.test(ua))  
    $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];  
  
	if (/(Intel|PPC) Mac OS X/.test(ua))  
    $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;  
  
	if (/Windows NT/.test(ua))  
    $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];  

  if ($.iPhone || $.iPad) {
  	return 'ios';
  }

  if ($.Android) {
  	return 'android';
  }

  return 'other';
};