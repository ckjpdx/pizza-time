function Pizza(size, toppings){
  this.size = size;
  this.toppings = toppings;
  switch (size) {
    case "small": this.cost = 12;
    break;
    case "medium": this.cost = 15;
    break;
    case "large": this.cost = 20;
    break;
  default:
    console.log('pizza constructor error');
  }
}

// FRONTEND
$(function () {
  $('#order-form').submit(function(event){
    event.preventDefault();
    var order = [];
    var size = $('input.pizza-size:checked').val();
    var toppings = [];
    $('input.pizza-toppings:checked').each(function(){
      toppings.push($(this).val());
      console.log(toppings);
    });
    console.log(toppings);
    var pizza = new Pizza(size);
    order.push(pizza);
    console.log(order);
    order.forEach(function(item){
      console.log(item.size);
      $('#confirm-order').append('<p>' + item.size + '<br>$' + item.cost + '</p>');
    });
  });
});
