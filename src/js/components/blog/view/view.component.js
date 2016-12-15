'use strict';

// Register the `publish` component on the `bfArticle` module,
angular.
  module('bbBlog').
  component('showArticle', {
    templateUrl: 'template/blog/view/view.template.html',
    controller: ['ShareObject', 'Constants', 'ShareService',
    function(ShareObject, Constants, ShareService, $scope, $element, $attrs) {
      this.shareId = ShareObject.getShareId();
      var ctrl = this;
      if (this.shareId>0) {
        ShareService.getShare().query(function(response){
          ctrl.share = response;
          // console.log(response);
          if (ctrl.share) {
            ctrl.title=response.share.title;
            ctrl.lastModified=response.share.lastModified
            ctrl.nickName=response.nickName;
            ShareObject.setTitle(ctrl.title);
          }
          // console.log($scope.title);
        });
      } else {
        this.title="我的传赏";
      }

      this.videoUrl = function(binarFileId, binarFileType){
        var suffix = "mp4";
        switch (binarFileType) {
          case 12:
            suffix="3gp";
            break;
          case 13:
            suffix="webm";
            break;
          case 14:
            suffix="ogv";
            break;
          default:
            suffix="mp4";
        }
        return "media/video" + binarFileId + "." + suffix;
      };

      this.showSharePay = function() {
        var shareId = ShareObject.getShareId();
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid) {
          if(window.uw) window.uw.uwSharePay();
        }
        if(isiOS) {
          if(window.webkit)if(window.webkit.messageHandlers)window.webkit.messageHandlers.uwSharePay.postMessage(shareId);
        }
      };
    }]
});
