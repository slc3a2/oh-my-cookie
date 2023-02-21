function deleteCookie(url, name) {
  let self = this;
  chrome.cookies.getAll(
    {
      url: url,
    },
    function(cookies) {
      for (var i = 0; i < cookies.length; i++) {
        chrome.cookies.remove({
          url: url + cookies[i].path,
          name: name,
        });
        self.$message({
          message: "success",
          type: "success",
          showClose: true,
        });
      }
    }
  );
}
