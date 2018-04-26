/**
 * Created by simonyan on 16/6/22.
 */
'use strict'

const fs = require('fs');
var upyun = require('upyun');

const bucket = '';
const operator = '';
const passwd = '';

const upyunAPI = new upyun(bucket, operator, passwd, 'v0', 'legacy');

// 上传后的图片访问地址域名
const imagePrefix = 'https://' + bucket + '.b0.upaiyun.com';

/**
 * 上传到又拍云服务器
 * @param remotePath
 * @param localFile
 * @param type
 * @param callback
 * @private
 */
const _uploadFile = function(remotePath, localFile, type, opts, callback) {
	type = type || 'image/png';
	opts = opts || {};
	upyunAPI.uploadFile(remotePath, fs.readFileSync(localFile), type, true, opts, function (err, data) {
		if (err) {
			callback(err);
			return;
		}
		callback(null, imagePrefix + remotePath);
	});
};

/***
 * 在又拍云下载文件
 * @type {{uploadFile: _uploadFile}}
 */
const _downloadFile = function (remotePath,localPath,callback) {
	upyunAPI.downloadFile(remotePath,localPath,function (err,result) {
		  if(err) {callback(err);return;}
	    	callback(null,result);
	});
};
module.exports = {
	uploadFile: _uploadFile,
	downloadFile:_downloadFile
};