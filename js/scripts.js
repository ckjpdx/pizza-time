var addPizza = '<div class="new-pizza"><h3>new pizza</h3><p>select size:</p><select name="pizza-size"><option value="small">small $12</option><option value="medium">medium $15</option><option value="large">large $20</option></select><h3>add some toppings:</h3><p>( + $2 each )</p><input class="pizza-toppings" name="select-topping" type="checkbox" value="pepperoni"><label>add pepperoni</label><input class="pizza-toppings" name="select-topping" type="checkbox" value="olives"><label>add olives</label><input class="pizza-toppings" name="select-topping" type="checkbox" value="jalapenos"><label>add jalapeños</label></div>';
var pizzaSizeArr = ['small', 'medium', 'large'];
var pizzaCostArr = [12, 15, 20];

function Pizza(size, toppings){
  this.size = size;
  this.toppings = toppings;
  this.deliveryFee = 0;
}
Pizza.prototype.setCostBySize = function () {
  for (var i = 0; i < pizzaSizeArr.length; i++) {
    if (this.size === pizzaSizeArr[i]) {
      this.sizeCost = pizzaCostArr[i];
    }
  }
};
Pizza.prototype.totalCost = function () {
  this.totalCost = this.sizeCost + this.deliveryFee + this.toppings.length * 2;
};

function orderTotal(order){
  var runningTotal = 0;
  order.forEach(function(pizza){
    runningTotal += pizza.totalCost;
  });
  return runningTotal;
}

// FRONTEND
$(function () {
  $('button#delivery-button').click(function(){
    $('div#delivery-div').slideToggle();
  });
  $('button#add-pizza').click(function(){
    $('form#order-form').prepend(addPizza);
  });
  $('form#order-form').submit(function(event){
    event.preventDefault();
    var isDelivery = false;
    if ($('input#delivery-address').val()) {
      isDelivery = true;
    }
    $('div#order-div').slideUp();
    var order = [];
    $('div.new-pizza').each(function(){ // start each pizza process
      var size = $(this).children('select[name="pizza-size"]').val();
      var toppings = [];
      $(this).children('input.pizza-toppings:checked').each(function(){
        toppings.push($(this).val());
      });
      var pizza = new Pizza(size, toppings);
      if (isDelivery) {
        pizza.deliveryFee = 3;
      }
      pizza.setCostBySize();
      pizza.totalCost();
      if (pizza.toppings.length === 0) {
        pizza.toppings.push('no toppings');
      }
      order.push(pizza);
    }); // end each pizza process
    $('#confirm-order').append('<h2>confirmation</h2><h4>' + order.length + ' pizza(s) ordered:</h4>');
    order.forEach(function(pizza){
      $('#confirm-order').append('<p>' + pizza.size + ' pizza<br>w/ ' + pizza.toppings.join(", ") + '<span class="delivery-fee-span"><br>delivery fee: $' + pizza.deliveryFee + '</span></p><p><strong>$ ' + pizza.totalCost + '</strong></p><hr>');
    });
    $('#confirm-order').append('<h3>order total: $' + orderTotal(order) + '</h3>');
    console.log(order);
    if (isDelivery) {
      $('span.delivery-fee-span').show();
    }
  }); // end submit form
});
