angular.module('App', ['LocationBar'])
.controller('MainController', ['$scope', '$filter', function ($scope, $filter) {
  $scope.tweets = [];

  $scope.newTitle = '';

  $scope.addTweet = function () {
    $scope.tweets.push({
      title: $scope.newTitle,
      done: false
    });

    $scope.newTitle = '';
  };

  $scope.filter = {
    tweet: { tweet: true },
  };
  $scope.currentFilter = null;

  $scope.changeFilter = function (filter) {
    $scope.currentFilter = filter;
  };

  var where = $filter('filter');
  $scope.$watch('tweets', function (tweets) {
    var length = tweets.length;

    $scope.allCount = length;
    $scope.tweetCount = where(tweets, $scope.filter.tweet).length;
    $scope.remainingCount = length - $scope.tweetCount;
  }, true);

  var originalTitle;    
　$scope.editing = null; 

　$scope.editTweet = function (tweet) {
  　originalTitle = tweet.title;
  　$scope.editing = tweet;
　};

  $scope.tweetEdit = function (tweetForm) {
    if (tweetForm.$invalid) {
      $scope.editing.title = originalTitle;
    }
    $scope.editing = originalTitle = null;
  };

  $scope.removeTweet = function () {
    $scope.tweets = where($scope.tweets);
  };

  $scope.removeTweet = function (currentTweet) {
    $scope.tweets = where($scope.tweets, function (tweet) {
      return currentTweet
       !== tweet;
    });
  };
}])
.directive('mySelect', [function () {
  return function (scope, $el, attrs) {
    scope.$watch(attrs.mySelect, function (val) {
      if (val) {
        $el[0].select();
      }
    });
  };
}]);

