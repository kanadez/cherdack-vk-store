function buildChangePricesForm(){
   var change_value_input = $("<input />",{
      id: "change_value_input"
   });
   
   var increment_input = $("<input />",{
      id: "increment_input"
   });
   
   var change_button = $("<button />",{
      id: "change_button",
      text: "Изменить"
   });
   
   $('#content_div').html("Размер изменений:<br>");
   $('#content_div').append(change_value_input);
   $('#content_div').append("<br><br>Увеличивать?:<br>");
   $('#content_div').append(increment_input);
   $('#content_div').append("<br><br>");
   $('#content_div').append(change_button);

   change_button.click(
      function(){
         changePrices()
      }
   );
}

function changePrices(){
   $.post(
      post_url, {
         a: "cSP",
         b: $('#change_value_input').val(),
         c: $('#increment_input').val()
      }, 
      function (result){
         alert("Успешно!");
      }
   );
}