// popup.js调用方法
function deleteCookie(url,name){
    console.log(url,name)
    let self = this;
    chrome.cookies.getAll({
        'url':url
    }, function (cookies) {
        for (var i = 0; i < cookies.length; i++) {
            // 循环清理
            chrome.cookies.remove({
                url: url+ cookies[i].path,
                name: name
            })
            self.$message({
              message: '删除成功',
              type: 'success'
            });
        }
    });
}