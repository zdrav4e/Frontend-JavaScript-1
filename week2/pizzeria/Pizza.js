"use strict";

function Pizza(name, cost, timeToMake){
  //Getters
  this.gettimeToMake = function () {
    return parseInt(timeToMake, 10);
  };
  this.getName = function () {
    return name;
  };
  this.getCost = function () {
    return parseInt(cost, 10);
  };
}

function PizzaOrder(pizza) {
  //Getters
  this.getPizza = function() {
    return pizza;
  };
}

if (typeof PizzaOrder.prototype.getId === "undefined") {
  var id = 0;
  PizzaOrder.prototype.getId = function() {
    if (typeof this.uniqueId === "undefined") {
      this.uniqueId = id++;
    }
    return this.uniqueId;
  };
}

PizzaOrder.prototype.start = function() {
  var that = this;
  var start = new Date().getTime();

  var time = setInterval(function () {
    that.timer = new Date().getTime() - start;

    console.log(that.getId(), that.timer);

    if (that.timer >= that.getPizza().gettimeToMake()) {
      clearInterval(time);
      if (typeof that.callback === "function") {
        that.callback(that.getPizza(), that);
      }

    }
  }, 1000);
};

PizzaOrder.prototype.ready = function(callback) {
  this.callback = callback;
};
/*
var p = new Pizza("Peperoni", 19, 2000);
var o = new PizzaOrder(p);
o.start();

o.ready(function(p, o) {
  // the pizza is ready now
  console.log("Pizza " + p.getName() + " with id = " + o.getId() + " is ready!");
});

var p2 = new Pizza("Verona", 16, 4000);
var o2 = new PizzaOrder(p2);
o2.start();

o2.ready(function(p, o2) {
  // the pizza is ready now
  console.log("Pizza " + p.getName() + " with id = " + o2.getId() + " is ready!");
});

//console.log('o getid : ' + o.getId());
//console.log('o2 getid : ' + o2.getId());
*/
