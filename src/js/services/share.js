'use strict';

angular.
  module('bb.service').
  factory('ShareObject',function(){
    var userId = 0, shareId = 0, shareItemId = 0, shareItemType = 0,
        itemLength = 0, items = [],
        title = "", content = "";
    return {
      setUserId: function(userIdInt) {
        userId = userIdInt;
      },
      getUserId: function() {
        return userId;
      },
      setShareId: function(shareIdInt) {
        shareId = shareIdInt;
      },
      getShareId: function() {
        return shareId;
      },
      setShareItemId: function(shareItemIdInt) {
        shareItemId = shareItemIdInt;
      },
      getShareItemId: function() {
        return shareItemId;
      },
      setItemType: function(shareItemTypeStr) {
        shareItemType = shareItemTypeStr;
      },
      getItemType: function() {
        return shareItemType;
      },
      setTitle: function(titleStr) {
        title = titleStr;
      },
      getTitle: function() {
        return title;
      },
      setContent: function(contentStr) {
        content = contentStr;
      },
      getContent: function() {
        return content;
      },
      setItemLength: function(length) {
        itemLength = length;
      },
      getItemLength: function() {
        return itemLength;
      },
      setItems: function(itemsObj){
        items = itemsObj;
      },
      getItems: function(){
        return items;
      }
    };
  });
