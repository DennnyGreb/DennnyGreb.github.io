
var app = angular.module('mainApp', []);

app.controller('mainCtrl', function($rootScope, $document) {
    this.counter;
    if(!localStorage.getItem("items")) {
        this.counter = 2;
    }
    else {
        var items = JSON.parse(localStorage.getItem("items"));
        var maxItem = items.slice(-1)[0];
        if(maxItem) {
            this.counter = maxItem.index;
        }
        else {
            this.counter = 0;
        }
    }
    this.selected;

    this.increaseCounter = function() {
        this.counter += 1;
    }

    this.setCtrlItems = function() {
        this.items = JSON.parse(localStorage.getItem("items"));
    }.bind(this);

    this.getLSItems = function() {
        return JSON.parse(localStorage.getItem("items"));
    }

    function initFunc() {
        var oldItems = this.getLSItems();
        if(!oldItems) {
            var newItems = [
                { itemText: "Example item...", index: 1, commentNumber: 2, comments: ["First example comment...", "First example comment..."] },
                { itemText: "Another example item...", index: 2, commentNumber: 2, comments: ["First best example comment...", "The best first example comment..."] }
            ];
            localStorage.setItem("items", JSON.stringify(newItems));
        }
        this.setCtrlItems();
    }

    initFunc.apply(this);

    this.addItem = function(item) {
        this.increaseCounter();
        var oldItems = this.getLSItems();
        if(oldItems) {
            oldItems.push({ itemText: item, commentNumber: 0,  index: this.counter, comments: [] });
            var newItems = oldItems;
            localStorage.setItem("items", JSON.stringify(newItems));
        }
        else {
            var newItems = [{ itemText: item, commentNumber: 0, index: this.counter, comments: [] }];
            localStorage.setItem("items", JSON.stringify(newItems));
        }
        this.setCtrlItems();
    }

    this.deleteItem = function(item) {
        var oldItems = this.getLSItems();
        if(oldItems) {
            for(var i = 0; i < oldItems.length; i++) {
                if(oldItems[i].index == item.index) {
                    oldItems.splice(i, 1);
                }
            }
            var newItems = oldItems;
            localStorage.setItem("items", JSON.stringify(newItems));
        }
        $rootScope.$broadcast('item-deleted', { item: item });
        this.setCtrlItems();
    }

    this.selectItem = function(event, item) {
        var element = event.currentTarget;
        if(this.selected) {
            this.selected.classList.remove("active-item");
        }
        this.selected = element;
        this.selected.classList.add("active-item");
        $rootScope.$broadcast('item-clicked', { item: item });
    }
});