var addPizza = '<div class="new-pizza"><h3>select a size:</h3><select name="pizza-size"><option value="small">small $12</option><option value="medium">medium $15</option><option value="large">large $20</option></select><h3>add some toppings:</h3><p>( + $2 each )</p><input class="pizza-toppings" name="select-topping" type="checkbox" value="pepperoni"><label>add pepperoni</label><input class="pizza-toppings" name="select-topping" type="checkbox" value="olives"><label>add olives</label><input class="pizza-toppings" name="select-topping" type="checkbox" value="jalapenos"><label>add jalapeños</label></div>';
var pizzaSizeArr = ['small', 'medium', 'large'];
var pizzaCostArr = [12, 15, 20];

function Pizza(size, toppings){
  this.size = size;
  this.toppings = toppings;
}
Pizza.prototype.setCostBySize = function () {
  for (var i = 0; i < pizzaSizeArr.length; i++) {
    if (this.size === pizzaSizeArr[i]) {
      this.sizeCost = pizzaCostArr[i];
    }
  }
};

Pizza.prototype.totalCost = function () {
  this.totalCost = this.sizeCost + this.toppings.length * 2;
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
  $('form#order-form').submit(function(event){
    event.preventDefault();
    $('form#order-form').slideUp();
    $('#confirm-order').append('<h2>pizza order:</h2>');
    var order = [];
    $('div.new-pizza').each(function(){
      var size = $(this).children('select[name="pizza-size"]').val();
      var toppings = [];
      $(this).children('input.pizza-toppings:checked').each(function(){
        toppings.push($(this).val());
      });
      var pizza = new Pizza(size, toppings);
      pizza.setCostBySize();
      order.push(pizza);
    }); // end forEach new-pizza
    $('#confirm-order').append('<h4>' + order.length + ' pizza(s) ordered:</h4>');
    order.forEach(function(pizza){
      pizza.totalCost();
      $('#confirm-order').append('<p>' + pizza.size + ' pizza<br>w/ ' + pizza.toppings.join(", ") + '</p><p><strong>$ ' + pizza.totalCost + '</strong></p><hr>');
    });
    $('#confirm-order').append('<h3>order total: $' + orderTotal(order) + '</h3>');
    console.log(order);
  }); // end submit form
  $('button#add-pizza').click(function(){
    $('form#order-form').prepend(addPizza);
  });
});
