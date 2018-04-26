/**
 * Created by simonyan on 16/6/21.
 */

'use strict';

const urllib = require('urllib');
const md5 = require('md5');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');
//var userInfo = require('../models/userModel');
/**
 * 签名计算
 * @param array $params
 * @param string $appKey
 * @return string
 */
const _signParam = (params) => {
	let combinedStr = '';
	const paramsInArr = _.toPairs(params);
	const paramsInArrSorted = _.sortBy(paramsInArr, (arr) => {
		return arr[0];
	});
	_.each(paramsInArrSorted, (arr) => {
		if (arr[0] != 'sign' && !_.isArray(arr[1])) {
			combinedStr += arr[0] + decodeURIComponent(arr[1]);
		}
	});
	//console.log("combinedStr",combinedStr);
	const sign = md5(combinedStr + '4213423149fewtewrq');
	//console.log("sign",sign);
	return sign.toUpperCase();
};

/**
 * 判断客户端的平台
 * @param ua
 * @returns {*}
 */

const _getPlatform = (ua) => {
	if (/MicroMessenger/i.test(ua)) {
		return 'wechat';
	} else if (/rxzny_android$/i.test(ua)) {
		return 'android';
	} else if (/rxzny_ios$/i.test(ua)) {
		return 'ios';
	}
	return 'other';
};

const _requestNoSign = (url, options, callback) => {
	options['timeout'] = 60000;
	options['method'] ='POST';
	options['dataType'] ='json';

	 urllib.request(url, options, (err,resData)=>{
	 	  if(err){
	 	  	callback(err,resData);
				return;
			}
			if(typeof resData.data === 'string' && resData.data.trim().length > 0){
				_decryptData(resData,callback);
			}else{
				callback(err,resData);
			}
		});
	// const optionData = {data:{}};
	// _encryptData(options.data,(encryptErr,encryptStr)=>{
   //  if(!!encryptErr){
   //  	console.log('加密错误---',encryptErr);
	// 		return;
	// 	}
	// 	optionData.data.requestData =  encryptStr;
	// 	optionData['timeout'] = 60000;
	// 	optionData['method'] ='POST';
	// 	optionData['dataType'] ='json';
  //
		// return urllib.request(url, optionData, (err,resData)=>{
		// 	if(typeof resData.data === 'string' && resData.data.trim().length > 0){
		// 		_decryptData(resData,callback);
		// 	}else{
		// 		callback(err,resData);
		// 	}
		// });
	// });
};
/**
 * 发送json格式的数据
 */

const _postJSON = (url, options, callback) => {
	options['timeout'] = 60000;
	options['method'] ='POST';
	options['dataType'] ='json';
	options['contentType'] = 'json';

	return urllib.request(url, options, callback);
};
//
const _request = (url, options, callback) => {
	let data = options ? options['data'] || {} : {};
	//data = userInfo.setOperator(req, data);
	data['sign'] = _signParam(data);
	options['data'] = data;
	options['timeout'] = 60000;
	options['method'] ='POST';
	options['dataType'] ='json';
	return urllib.request(url, options, callback);
};

const _postJsonRequest = (req, url, param, callback, processParam) => {
	//var param = userInfo.setOperator(req, param);
	param['sign'] = _signParam(param);
	let options = {
		data: param,
		method: "POST",
		dataType: 'json',
		timeout:60000
	};

	return urllib.request(url, options, callback);
};

/**
 * 随机字符串
 * @param len
 * @param isPureNumber
 * @returns {text}
 * @private
 */
const _randomStr = (len,isPureNumber) => {
   len = len || 10;
  let text = '';
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  if(isPureNumber){
 	  possible = '0123456789';
  }
  for( var i=0; i < len; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

/**
 * 封装发请求
 * @param  {[type]}   req      [description]
 * @param  {[type]}   url      [description]
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
const _requestYB = (req, url, data, callback) => {

	let postdata = data || {};

	if (req.session['ylxd:customer'] && req.session['ylxd:customer'].cuid) {
		postdata.data.cuid = req.session['ylxd:customer'].cuid;
	}
	postdata.data.appid = req.session.appid;
	postdata.data.openId = req.session.openid;
	postdata.data.osType = 3;
	postdata.data.platform =  {wechat:0,other:2,ios:3,android:4}[_getPlatform(req.headers['user-agent'])];
	postdata.data.uaData = req.headers['user-agent'];
	
	// console.log('------------------------');
	// console.log('url   ', url);
	// console.log('data   ', postdata);
	// console.log('------------------------');
	_requestNoSign(url, postdata, callback);
};

/**
 * 加密
 * @param data
 * @param callback
 * @private
 */
const _encryptData = (data,callback) => {
	try{
		let publicPem = fs.readFileSync(path.join(__dirname, 'public.pem'));
		let pubkey = publicPem.toString();

		const base65Data = new Buffer(JSON.stringify(data),'base64');
		const sliceSize = 128;
		const sliceArr = [];

		for (let offset = 0,length = base65Data.length ; offset < length ; offset += sliceSize){
			const buffer = base65Data.slice(offset,offset + sliceSize);
			const encrypted = crypto.publicEncrypt({key:pubkey,padding:1},buffer);
			const encryptedStr = encrypted.toString('base64');
			sliceArr.push(encryptedStr);
		}
		const sliceBuffer = new Buffer(JSON.stringify(sliceArr));
		zlib.gzip(sliceBuffer,(err,gzipBuffer)=>{
			callback(null,gzipBuffer.toString('base64'));
		});
	}catch (err){
		  callback(err,null);
	}
};
/**
 * 解密
 * @param toDecrypt [元数据]
 * @param callBack
 * @private
 */
const _decryptData = (toDecrypt,callBack) =>{

	let publicPem = fs.readFileSync(path.join(__dirname, 'public.pem'));
	let pubkey = publicPem.toString();

	let buffer = new Buffer(toDecrypt.data,'base64');
	zlib.gunzip(buffer,(err,decoded)=>{
		const jsonArr = JSON.parse(decoded.toString());
		let decryptStr = '';
		jsonArr.forEach(item =>{
			let buffer1 = new Buffer(item,'base64');
			decryptStr += crypto.publicDecrypt({key:pubkey,padding:1},buffer1);
		});
		const parseStr = new Buffer(decryptStr,'base64').toString();
		try{
			const resData = Object.assign({},toDecrypt,{data:JSON.parse(parseStr)});
			callBack(null,resData,toDecrypt);
		}catch(err){
			callBack(null,{msg:'数据解密错误',status:0},toDecrypt);
		}
	});
};

/**
 * 数字签名
 * @param val【加密字段】
 * @param secret [加密密钥]
 */
function _sign (val,secret){
	if(!secret){
		secret = 'sunny girl hahahahaha'
	}
	return crypto.createHmac('sha256',secret).update(val).digest('base64');
}

module.exports = {
	request: _request,
	postJsonRequest:_postJsonRequest,
	requestNoSign: _requestNoSign,
	getPlatform : _getPlatform,
	randomStr: _randomStr,
	requestYB: _requestYB,
	postJSON:_postJSON,
	sign:_sign
};
