/**
 * 将 image 转换为 Blob
 * @param file
 * @private
 */
const _imageToBlob = function(file) {
  var base64 = file.data.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  var mime = file.type || '';

  var sliceSize = 1024;
  var byteChars = window.atob(base64);
  var byteArrays = [];

  for (
    var offset = 0, len = byteChars.length;
    offset < len;
    offset += sliceSize
  ) {
    var slice = byteChars.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mime });
};

module.exports = {
  imageToBlob: _imageToBlob,
};
