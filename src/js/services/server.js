angular.
  module('bb.service').
  service('ServerService', ['$resource', 'ShareObject', '$http', '$httpParamSerializerJQLike',
    function($resource, ShareObject, $http, $httpParamSerializerJQLike) {
      this.saveShare = function(title) {
        var shareId = ShareObject.getShareId(),
            userId = ShareObject.getUserId();

        if (userId>0) {
          var data = {userId : userId, title : title, shareId : shareId};
          // console.log(title);
          // console.log(shareId);
          return $http.post(
            '../saveShare',
            $httpParamSerializerJQLike(data)
          );
        }
      };

      this.saveShareItem = function(content) {
        var shareItemId = ShareObject.getShareItemId(),
            shareId = ShareObject.getShareId(),
            type = ShareObject.getItemType(),
            sequenceNo = ShareObject.getItemLength();
        if (shareItemId == 0) sequenceNo += 1;
        var data = {'shareItemId' : shareItemId, 'shareId' : shareId, 'type':type, "content" : content, "sequenceNo" : sequenceNo};
        return $http.post(
          '../saveShareItem',
          $httpParamSerializerJQLike(data)
        );
      };

      this.getShare = function() {
        var shareId=ShareObject.getShareId();
        return $resource('../getShare', {}, {
          query: {
            method: 'GET',
            params: {shareId: shareId},
            isArray: false
          }
        });
      };

      this.deleteItem = function(shareItemId) {
        var data = {'shareItemId' : shareItemId};
        return $http.post(
          '../deleteShareItem',
          $httpParamSerializerJQLike(data)
        );
      };

      this.changeOrder = function(shareItemId,isUp) {
        var items = ShareObject.getItems();
        var index = items.getIndexBy("id", shareItemId)
        var sequenceNo = 0;
        if (isUp) {
          sequenceNo = items[index-1].sequenceNo;
        } else {
          sequenceNo = items[index+1].sequenceNo;
        }
        var data = {'shareItemId' : shareItemId, "toSequenceNo" : sequenceNo};
        return $http.post(
          '../changeOrder',
          $httpParamSerializerJQLike(data)
        );
      };
    }
  ]);
