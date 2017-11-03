function Pizza(size, toppings){
  this.size = size;
  this.toppings = toppings;
  switch (size) {
    case "small": this.sizeCost = 12;
    break;
    case "medium": this.sizeCost = 15;
    break;
    case "large": this.sizeCost = 20;
    break;
  default:
    console.log('pizza constructor error');
  }
}

Pizza.prototype.totalCost = function () {
  this.totalCost = this.sizeCost + this.toppings.length * 2;
};

// FRONTEND
$(function () {
  $('#order-form').submit(function(event){
    event.preventDefault();
    var order = [];
    var size = $('input.pizza-size:checked').val();
    var toppings = [];
    $('input.pizza-toppings:checked').each(function(){
      toppings.push($(this).val());
    });
    var pizza = new Pizza(size, toppings);
    order.push(pizza);
    console.log(order);
    order.forEach(function(pizza){
      pizza.totalCost();
      $('#confirm-order').append('<p>' + pizza.size + '<br>w/ ' + pizza.toppings.join(", ") + '</p>');
    });
  });
});
