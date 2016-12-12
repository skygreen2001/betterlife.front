'use strict';

// Register the `publish` component on the `bfArticle` module
angular.
  module('bbArticle').
  component('publish', {
    templateUrl: 'template/article/publish/publish.template.html',
    controller: ['ShareObject', 'Constants', 'ShareService', 'Upload', '$timeout', '$route',
    function(ShareObject, Constants, ShareService, Upload, $timeout, $route, $scope, $element, $attrs) {
      this.shareId = ShareObject.getShareId();
      var ctrl = this;
      ctrl.title = "点击设置标题";
      if (this.shareId>0) {
        ShareService.getShare().query(function(response){
          ctrl.share = response;
          // console.log(response);
          if (ctrl.share) {
            ctrl.title = response.share.title;
            ShareObject.setTitle(ctrl.title);
            if(ctrl.title=="") ctrl.title = "点击设置标题";
            ctrl.iconCoverId = response.share.iconCoverId;
            ShareObject.setItems(response.shareItems);
            if(response.shareItems&&response.shareItems.length>0){
              var sequenceNo = response.shareItems[response.shareItems.length-1].sequenceNo;
              ctrl.sequenceNo = sequenceNo;
              ShareObject.setItemLength(sequenceNo);
            }
          }
        });
      };

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

      this.range = function(min, max, step) {
          step = step || 1;
          var input = [];
          for (var i = min; i <= max; i += step) {
            input.push(i);
          }
          return input;
      };

      this.editTitle = function() {
        location.href = "#/editTitle";
      };

      this.editIcon = function(file, invalidFiles) {
        iconCover = file;
        if (iconCover) {
          var shareId = ShareObject.getShareId();
          var userId = ShareObject.getUserId();
          iconCover.upload = Upload.upload({
              url  : '../saveIconCover',
              data : {iconCover : iconCover, shareId : shareId, userId : userId}
          });

          iconCover.upload.then(function (response) {
              $timeout(function () {
                  iconCover.result = response.data;
              });
              // $location.path("#/edit?shareId=" + shareId + "&userId=" + userId);
              $route.reload();
              // $window.location.href="#/edit?shareId=" + shareId + "&userId=" + userId;
          }, function (response) {
              if (response.status > 0)
                  ctrl.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
              iconCover.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          });
        }
      }

      this.editText = function(shareItemId, content) {
        ShareObject.setItemType(Constants.ITEM_TYPE.TEXT);
        ShareObject.setShareItemId(shareItemId);
        ShareObject.setContent(content);
        location.href = "#/editContent";
      };

      this.editImg = function(shareItemId, file, invalidFiles) {
        // ShareObject.setItemType(Constants.ITEM_TYPE.IMAGE);
        // ShareObject.setShareItemId(shareItemId);
        var itemImg = file;
        if (itemImg) {
          var shareId = 0, sequenceNo = 0;
          if (shareItemId == 0) {
            shareId = ShareObject.getShareId();
            sequenceNo = ShareObject.getItemLength()+1;
          }
          // var userId = ShareObject.getUserId();
          itemImg.upload = Upload.upload({
              url  : '../saveItemFile',
              data : {itemFile : itemImg, shareId : shareId, shareItemId : shareItemId,
                      type : Constants.ITEM_TYPE.IMAGE, sequenceNo : sequenceNo}
          });

          itemImg.upload.then(function (response) {
              $timeout(function () {
                  itemImg.result = response.data;
              });
              $route.reload();
              // var userId = ShareObject.getUserId();
              // $window.location.href="#/edit?shareId=" + shareId + "&userId=" + userId;
          }, function (response) {
              if (response.status > 0)
                  console.log(response.status + ': ' + response.data);
          }, function (evt) {
              itemImg.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          });
        }
      };

      this.editVideo = function(shareItemId, file, invalidFiles) {
        // ShareObject.setItemType(Constants.ITEM_TYPE.VIDEO);
        // ShareObject.setShareItemId(shareItemId);
        var itemVideo = file;
        if (itemVideo) {
          var shareId = 0, sequenceNo = 0;
          if (shareItemId == 0) {
            shareId = ShareObject.getShareId();
            sequenceNo = ShareObject.getItemLength()+1;
          }
          // var userId = ShareObject.getUserId();
          itemVideo.upload = Upload.upload({
              url  : '../saveItemFile',
              data : {itemFile : itemVideo, shareId : shareId, shareItemId : shareItemId,
                      type : Constants.ITEM_TYPE.VIDEO, sequenceNo : sequenceNo}
          });

          itemVideo.upload.then(function (response) {
              $timeout(function () {
                  itemVideo.result = response.data;
              });
              $route.reload();
          }, function (response) {
              if (response.status > 0)
                  console.log(response.status + ': ' + response.data);
          }, function (evt) {
              itemVideo.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          });
        }
      };

      this.deleteItem = function(shareItemId) {
        ShareService.deleteItem(
          shareItemId
        ).then(function(response) {
          $route.reload();
        });
      };

      this.changeOrder = function(shareItemId,isUp) {
        ShareService.changeOrder(
          shareItemId,
          isUp
        ).then(function(response) {
          $route.reload();
        });
      };
    }]
  });
