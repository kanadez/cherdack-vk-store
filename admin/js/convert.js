function buildConvertForm() // создаёт шапку таблицы редактирования артикулов
{   
   var currency_input = $("<input />", 
   {
      id: "currency_input"
   });
   
   var discount_input = $("<input />", 
   {
      id: "discount_input"
   });
   
   var fixed_margin_input = $("<input />", 
   {
      id: "fixed_margin_input"
   });
   
   var margin_coef_input = $("<input />", 
   {
      id: "margin_coef_input"
   });
   
   var convert_button = $("<button />", 
   {
      id: "convert_button",
      text: "Конверт"
   });
   
   $('#content_div').html("Текущий курс доллара:<br>");
   $('#content_div').append(currency_input);
   $('#content_div').append("<br><br>Фиксированная наценка:<br>");
   $('#content_div').append(fixed_margin_input);
   $('#content_div').append("<br><br>Коэффициент гибкой наценки:<br>");
   $('#content_div').append(margin_coef_input);
   $('#content_div').append("<br><br>Верхняя скидка(%):<br>");
   $('#content_div').append(discount_input);
   $('#content_div').append("<br><br>");
   $('#content_div').append(convert_button);

   convert_button.click
   (
      function()
      {
         convertPrices()
      }
   );
}

function convertPrices()
{
   $.post
   (
      post_url, 
      {
         a: "sPTR",
         b: $('#currency_input').val(),
         c: $('#fixed_margin_input').val(),
         d: $('#margin_coef_input').val(),
         e: $('#discount_input').val()
      }, 
      function (result)
      {
         alert("Успешно!");
      }
   );
}