// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!!!");
});

AV.Cloud.define("beforeSave", function(request, response) {
  response.success("Hello world!!!");
});

AV.Cloud.define("averageStars", function(request, response) {
  var query = new AV.Query("Review");
  query.equalTo("movie", request.params.movie);
  query.find({
    success: function(results) {
      var sum = 0;
      for (var i = 0; i < results.length; ++i) {
        sum += results[i].get("stars");
      }
      response.success(sum / results.length);
    },
    error: function() {
      response.error("movie lookup failed");
    }
  });
});

AV.Cloud.beforeSave("Review", function(request, response) {
  var comment = request.object.get("comment");
  if (comment.length > 140) {
    // 截断并添加...
    request.object.set("comment", comment.substring(0, 137) + "...");
  }
  response.success();
});


AV.Cloud.httpRequest({
  url: 'http://www.google.com/',
  success: function(httpResponse) {
    console.log(httpResponse.text);
  },
  error: function(httpResponse) {
    console.error('Request failed with response code ' + httpResponse.status);
  }
});