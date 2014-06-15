"use strict";
jQuery(document).ready( function () {
  var total = 0;

  $("#order-pizza").click( function () {
    $("input[name='menu-pizzas']:checked").queue(function (index, element) {
      var pizza = new Pizza($(this).val(), $(this).attr("cost"), $(this).attr("timetomake"));
      var order = new PizzaOrder(pizza);
      order.start();
      order.ready(function(pizza, order) {
        var arr = ["Pizza", pizza.getName(), "with id =", order.getId(), "is ready!"];

        $("<li/>").append(arr.join(" ")).appendTo($("#ready-pizzas"));

        total += pizza.getCost();
        $("#total").html(total);
      });
      $(this).attr("checked", false);
    }).dequeue();
  });

});
