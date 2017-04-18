app.controller('commentCtrl', function($scope) {
    this.commentsOfItem;
    this.commentText = '';
    this.currentItem;

    this.getItemByIndex = function(index) {
        var items = JSON.parse(localStorage.getItem("items"));
        if(items) {
            for(var i = 0; i < items.length; i++) {
                if(items[i].index == index) {
                    this.currentItem = items[i];
                    return items[i];
                }
            }
        }
        return null;
    }

    this.setComment = function(comment) {
        var testItem = this.currentItem;
        testItem.comments.push(comment);
        var items = JSON.parse(localStorage.getItem("items"));
        for(var i = 0; i < items.length; i++) {
            if(items[i].index == testItem.index) {
                items[i].comments = testItem.comments;
                items[i].commentNumber += 1;
            }
        }
        localStorage.setItem("items", JSON.stringify(items));
        $scope.$parent.mainCtrl.setCtrlItems();
        this.commentText = '';
    }

    $scope.$on('item-clicked', function(event, args) {
        var item = this.getItemByIndex(args.item.index);
        this.commentsOfItem = item.comments;
        this.currentItem = item;
        this.commentText = '';
    }.bind(this)); 
    
    $scope.$on('item-deleted', function(event, args) {
        var item = args.item;
        if(item && this.currentItem) {
            if(this.currentItem.index == item.index) {
                this.currentItem = null;
            }
        }
    }.bind(this)); 
});