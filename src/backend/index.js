function deleteCookie(url, name) {
  let self = this
  chrome.cookies.getAll(
    {
      url
    },
    function (cookies) {
      for (let i = 0; i < cookies.length; i++) {
        chrome.cookies.remove({
          url: url + cookies[i].path,
          name: name
        })
        self.$message({
          message: 'Success',
          type: 'success',
          showClose: true
        })
      }
    }
  )
}
