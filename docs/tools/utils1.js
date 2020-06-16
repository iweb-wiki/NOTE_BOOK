'use strict';

const urllib = require('urllib');
const md5 = require('md5');
const _ = require('lodash');
//var userInfo = require('../models/userModel');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

/**
 * 签名计算
 * @param array $data
 * @param string $appKey
 * @return string
 */
const _signParam = data => {
  let combineStr = '';
  let keys = _.keys(data);

  let sortKeys = _.sortBy(keys, function(k) {
    return k;
  });
  _.forEach(sortKeys, function(k) {
    if (k != 'sign') {
      const v = data[k];
      if (!_.isArray(v) && !_.isObject(v)) {
        combineStr = combineStr + (k + decodeURIComponent(v));
      }
    }
  });

  combineStr = combineStr + '4213423149fewtewrq';
  const sign = md5(combineStr).toUpperCase();

  return sign;
};

/**
 * 判断浏览器类型
 * @param ua
 * @returns {*}
 */
const _getPlatform = ua => {
  if (/MicroMessenger/i.test(ua)) {
    return 'wechat';
  } else if (/android_xiaomei\w+/i.test(ua)) {
    return 'android';
  } else if (/xiaomei\w+_ios/i.test(ua)) {
    return 'ios';
  }
  return 'other';
};

const _requestNoSign = (url, options, callback) => {
  options['timeout'] = 60000;
  options['method'] = 'POST';
  options['dataType'] = 'json';

  urllib.request(url, options, (err, resData) => {
    if (err) {
      callback(err, resData);
      return;
    }
    if (typeof resData.data === 'string' && resData.data.trim().length > 0) {
      _decryptData(resData, callback);
    } else {
      callback(err, resData);
    }
  });
};

//
const _request = (url, options, callback) => {
  let data = options ? options['data'] || {} : {};
  data['sign'] = _signParam(data);
  options['data'] = data;
  options['timeout'] = 60000;
  options['method'] = 'POST';
  options['dataType'] = 'json';
  return urllib.request(url, options, callback);
};

const _postJsonRequest = (req, url, param, callback, processParam) => {
  param['sign'] = _signParam(param);
  let options = {
    data: param,
    method: 'POST',
    dataType: 'json',
    timeout: 60000,
  };

  return urllib.request(url, options, callback);
};

/**
 * 请求后端的入口方法
 * @param  {[type]}   req      [description]
 * @param  {[type]}   url      [description]
 * @param  {[type]}   data   {data:{}}  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
const _requestServer = (req, url, data, callback) => {
  //需要签名算法
  //utils.postJsonRequest(url,data,callback);
  //
  //不需要签名算法
  let postData = data ? data : { data: {} };
  if (req.session.account) {
    //	console.log('account',req.session.account);
    postData.data.aid = req.session.account.aid;
    postData.data.cid = req.session.account.cid;
    postData.data.platform = 1;
  }
  // console.log('-----------------------');
  // console.log('url', url);
  // console.log('data', postData.data);
  // console.log('-----------------------');
  _requestNoSign(url, postData, callback);
};

/**
 * 随机字符串
 * @param len
 * @returns {text}
 * @private
 */
const _randomStr = len => {
  var len = len || 10;
  let text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

/**
 * 数字签名
 */
const _sign = (val, secret) => {
  if (!secret) {
    secret = 'sunny girl hahahahaha';
  }
  return crypto
    .createHmac('sha256', secret)
    .update(val)
    .digest('base64');
};

/**
 * 加密
 * @param data
 * @param callback
 * @private
 */
const _encryptData = (data, callback) => {
  try {
    let publicPem = fs.readFileSync(path.join(__dirname, 'public.pem'));
    let pubkey = publicPem.toString();

    const base65Data = new Buffer(JSON.stringify(data), 'base64');
    const sliceSize = 128;
    const sliceArr = [];

    for (
      let offset = 0, length = base65Data.length;
      offset < length;
      offset += sliceSize
    ) {
      const buffer = base65Data.slice(offset, offset + sliceSize);
      const encrypted = crypto.publicEncrypt(
        { key: pubkey, padding: 1 },
        buffer,
      );
      const encryptedStr = encrypted.toString('base64');
      sliceArr.push(encryptedStr);
    }
    const sliceBuffer = new Buffer(JSON.stringify(sliceArr));
    zlib.gzip(sliceBuffer, (err, gzipBuffer) => {
      callback(null, gzipBuffer.toString('base64'));
    });
  } catch (err) {
    callback(err, null);
  }
};
/**
 * 解密
 * @param toDecrypt
 * @param callBack
 * @private
 */
const _decryptData = (toDecrypt, callBack) => {
  let publicPem = fs.readFileSync(path.join(__dirname, 'public.pem'));
  let pubkey = publicPem.toString();

  let buffer = new Buffer(toDecrypt.data, 'base64');
  zlib.gunzip(buffer, (err, decoded) => {
    const jsonArr = JSON.parse(decoded.toString());
    let decryptStr = '';
    jsonArr.forEach(item => {
      let buffer1 = new Buffer(item, 'base64');
      decryptStr += crypto.publicDecrypt({ key: pubkey, padding: 1 }, buffer1);
    });
    const parseStr = new Buffer(decryptStr, 'base64').toString();
    try {
      toDecrypt.data = JSON.parse(parseStr);
      callBack(null, toDecrypt);
    } catch (err) {
      callBack(null, { msg: '数据解密错误', status: 0 });
    }
  });
};

module.exports = {
  request: _request,
  postJsonRequest: _postJsonRequest,
  requestNoSign: _requestNoSign,
  getPlatform: _getPlatform,
  requestServer: _requestServer,
  randomStr: _randomStr,
  sign: _sign,
};
