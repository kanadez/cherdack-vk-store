function buildSForm()
{
   $('#content_div').html("<input id='s_input' />");
   $('#content_div').append("<br><input id='s_output' />");   
   $('#content_div').append("<br><input id='s_output_with_discount' />");   

   $('#s_input').keyup
   (
      function()
      {
         strikeString($(this).val());
      }
   );
}

function strikeString(string)
{
   var a = string.split("");
   var numbered = Number(string)*0.95;
   var result = "";
   
   for (var i = 0; i < a.length; i++)
   {
      i != a.length -1 ? result += a[i]+"̶" : result += a[i];
   }
   
   $('#s_output').val(result);
   $('#s_output_with_discount').val(result+" "+numbered.toFixed(-1));
}