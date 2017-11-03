var addPizza = '<div class="new-pizza"><h3>select a size:</h3><select name="pizza-size"><option value="small">small $12</option><option value="medium">medium $15</option><option value="large">large $20</option></select><h3>add some toppings:</h3><p>( + $2 each )</p><input class="pizza-toppings" name="select-topping" type="checkbox" value="pepperoni"><label>add pepperoni</label><input class="pizza-toppings" name="select-topping" type="checkbox" value="olives"><label>add olives</label><input class="pizza-toppings" name="select-topping" type="checkbox" value="jalapenos"><label>add jalapeños</label></div>';

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
  $('form#order-form').submit(function(event){
    event.preventDefault();
    var order = [];
    $('div.new-pizza').each(function(){

    var size = $('select[name="pizza-size"]').val();
    var toppings = [];
    $('input.pizza-toppings:checked').each(function(){
      toppings.push($(this).val());
    });
    var pizza = new Pizza(size, toppings);
    order.push(pizza);
  }); // end forEach new-pizza
    order.forEach(function(pizza){
      pizza.totalCost();
      $('#confirm-order').append('<p>' + pizza.size + ' pizza<br>w/ ' + pizza.toppings.join(", ") + '</p><p><strong>$ ' + pizza.totalCost + '</strong></p><hr>');
    });
  });
  $('button#add-pizza').click(function(){
    $('form#order-form').prepend(addPizza);
  });
});
