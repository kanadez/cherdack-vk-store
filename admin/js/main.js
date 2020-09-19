var post_url = "post.php";
var clock_intvl = 0;

$(document).ready
(
   function()
   {
      //clock_intvl = setInterval("getClock()", 1000);
      $("#accordion_div").accordion({ header: "h3" });

   }
);

function defineAdvImagesForArticul()
{
   $('#content_div').html("Артикул:<br><input id='articul_input' />");
   $('#content_div').append("<p>adv 1:<br><input class='images_input' id='adv_image_1_input' />");
   $('#content_div').append("<p>adv 2:<br><input class='images_input' id='adv_image_2_input' />");
   $('#content_div').append("<p>adv 3:<br><input class='images_input' id='adv_image_3_input' />");
   $('#content_div').append("<p>38.5:<br><input class='images_input' id='38_5_main_image_input' />");
   $('#content_div').append("<p>38.5 price:<br><input class='images_input' id='38_5_main_image_price_input' />");
   $('#content_div').append("<p>38.5 adv 1:<br><input class='images_input' id='38_5_adv_image_1_input' />");
   $('#content_div').append("<p>38.5 adv 2:<br><input class='images_input' id='38_5_adv_image_2_input' />");
   $('#content_div').append("<p>38.5 adv 3:<br><input class='images_input' id='38_5_adv_image_3_input' />");
   $('#content_div').append("<p>39:<br><input class='images_input' id='39_main_image_input' />");
   $('#content_div').append("<p>39 price:<br><input class='images_input' id='39_main_image_price_input' />");
   $('#content_div').append("<p>39 adv 1:<br><input class='images_input' id='39_adv_image_1_input' />");
   $('#content_div').append("<p>39 adv 2:<br><input class='images_input' id='39_adv_image_2_input' />");
   $('#content_div').append("<p>39 adv 3:<br><input class='images_input' id='39_adv_image_3_input' />");
   $('#content_div').append("<p>40:<br><input class='images_input' id='40_main_image_input' />");
   $('#content_div').append("<p>40 price:<br><input class='images_input' id='40_main_image_price_input' />");
   $('#content_div').append("<p>40 adv 1:<br><input class='images_input' id='40_adv_image_1_input' />");
   $('#content_div').append("<p>40 adv 2:<br><input class='images_input' id='40_adv_image_2_input' />");
   $('#content_div').append("<p>40 adv 3:<br><input class='images_input' id='40_adv_image_3_input' />");
   $('#content_div').append("<p>40.5:<br><input class='images_input' id='40_5_main_image_input' />");
   $('#content_div').append("<p>40.5 price:<br><input class='images_input' id='40_5_main_image_price_input' />");
   $('#content_div').append("<p>40.5 adv 1:<br><input class='images_input' id='40_5_adv_image_1_input' />");
   $('#content_div').append("<p>40.5 adv 2:<br><input class='images_input' id='40_5_adv_image_2_input' />");
   $('#content_div').append("<p>40.5 adv 3:<br><input class='images_input' id='40_5_adv_image_3_input' />");
   $('#content_div').append("<p>41:<br><input class='images_input' id='41_main_image_input' />");
   $('#content_div').append("<p>41 price:<br><input class='images_input' id='41_main_image_price_input' />");
   $('#content_div').append("<p>41 adv 1:<br><input class='images_input' id='41_adv_image_1_input' />");
   $('#content_div').append("<p>41 adv 2:<br><input class='images_input' id='41_adv_image_2_input' />");
   $('#content_div').append("<p>41 adv 3:<br><input class='images_input' id='41_adv_image_3_input' />");
   $('#content_div').append("<p>42:<br><input class='images_input' id='42_main_image_input' />");
   $('#content_div').append("<p>42 price:<br><input class='images_input' id='42_main_image_price_input' />");
   $('#content_div').append("<p>42 adv 1:<br><input class='images_input' id='42_adv_image_1_input' />");
   $('#content_div').append("<p>42 adv 2:<br><input class='images_input' id='42_adv_image_2_input' />");
   $('#content_div').append("<p>42 adv 3:<br><input class='images_input' id='42_adv_image_3_input' />");
   $('#content_div').append("<p>42.5:<br><input class='images_input' id='42_5_main_image_input' />");
   $('#content_div').append("<p>42.5 price:<br><input class='images_input' id='42_5_main_image_price_input' />");
   $('#content_div').append("<p>42.5 adv 1:<br><input class='images_input' id='42_5_adv_image_1_input' />");
   $('#content_div').append("<p>42.5 adv 2:<br><input class='images_input' id='42_5_adv_image_2_input' />");
   $('#content_div').append("<p>42.5 adv 3:<br><input class='images_input' id='42_5_adv_image_3_input' />");
   $('#content_div').append("<p>43:<br><input class='images_input' id='43_main_image_input' />");
   $('#content_div').append("<p>43 price:<br><input class='images_input' id='43_main_image_price_input' />");
   $('#content_div').append("<p>43 adv 1:<br><input class='images_input' id='43_adv_image_1_input' />");
   $('#content_div').append("<p>43 adv 2:<br><input class='images_input' id='43_adv_image_2_input' />");
   $('#content_div').append("<p>43 adv 3:<br><input class='images_input' id='43_adv_image_3_input' />");
   $('#content_div').append("<p>44:<br><input class='images_input' id='44_main_image_input' />");
   $('#content_div').append("<p>44 price:<br><input class='images_input' id='44_main_image_price_input' />");
   $('#content_div').append("<p>44 adv 1:<br><input class='images_input' id='44_adv_image_1_input' />");
   $('#content_div').append("<p>44 adv 2:<br><input class='images_input' id='44_adv_image_2_input' />");
   $('#content_div').append("<p>44 adv 3:<br><input class='images_input' id='44_adv_image_3_input' />");
   $('#content_div').append("<p>44.5:<br><input class='images_input' id='44_5_main_image_input' />");
   $('#content_div').append("<p>44.5 price:<br><input class='images_input' id='44_5_main_image_price_input' />");
   $('#content_div').append("<p>44.5 adv 1:<br><input class='images_input' id='44_5_adv_image_1_input' />");
   $('#content_div').append("<p>44.5 adv 2:<br><input class='images_input' id='44_5_adv_image_2_input' />");
   $('#content_div').append("<p>44.5 adv 3:<br><input class='images_input' id='44_5_adv_image_3_input' />");
   $('#content_div').append("<p>45:<br><input class='images_input' id='45_main_image_input' />");
   $('#content_div').append("<p>45 price:<br><input class='images_input' id='45_main_image_price_input' />");
   $('#content_div').append("<p>45 adv 1:<br><input class='images_input' id='45_adv_image_1_input' />");
   $('#content_div').append("<p>45 adv 2:<br><input class='images_input' id='45_adv_image_2_input' />");
   $('#content_div').append("<p>45 adv 3:<br><input class='images_input' id='45_adv_image_3_input' />");
   $('#content_div').append("<p>45.5:<br><input class='images_input' id='45_5_main_image_input' />");
   $('#content_div').append("<p>45.5 price:<br><input class='images_input' id='45_5_main_image_price_input' />");
   $('#content_div').append("<p>45.5 adv 1:<br><input class='images_input' id='45_5_adv_image_1_input' />");
   $('#content_div').append("<p>45.5 adv 2:<br><input class='images_input' id='45_5_adv_image_2_input' />");
   $('#content_div').append("<p>45.5 adv 3:<br><input class='images_input' id='45_5_adv_image_3_input' />");
   $('#content_div').append("<p>46:<br><input class='images_input' id='46_main_image_input' />");
   $('#content_div').append("<p>46 price:<br><input class='images_input' id='46_main_image_price_input' />");
   $('#content_div').append("<p>46 adv 1:<br><input class='images_input' id='46_adv_image_1_input' />");
   $('#content_div').append("<p>46 adv 2:<br><input class='images_input' id='46_adv_image_2_input' />");
   $('#content_div').append("<p>46 adv 3:<br><input class='images_input' id='46_adv_image_3_input' />");
   $('#content_div').append("<p>47.5:<br><input class='images_input' id='47_5_main_image_input' />");
   $('#content_div').append("<p>47.5 price:<br><input class='images_input' id='47_5_main_image_price_input' />");
   $('#content_div').append("<p>47.5 adv 1:<br><input class='images_input' id='47_5_adv_image_1_input' />");
   $('#content_div').append("<p>47.5 adv 2:<br><input class='images_input' id='47_5_adv_image_2_input' />");
   $('#content_div').append("<p>47.5 adv 3:<br><input class='images_input' id='47_5_adv_image_3_input' />");
   $('#content_div').append("<p>48.5:<br><input class='images_input' id='48_5_main_image_input' />");
   $('#content_div').append("<p>48.5 price:<br><input class='images_input' id='48_5_main_image_price_input' />");
   $('#content_div').append("<p>48.5 adv 1:<br><input class='images_input' id='48_5_adv_image_1_input' />");
   $('#content_div').append("<p>48.5 adv 2:<br><input class='images_input' id='48_5_adv_image_2_input' />");
   $('#content_div').append("<p>48.5 adv 3:<br><input class='images_input' id='48_5_adv_image_3_input' />");
   $('#content_div').append("<p>49.5:<br><input class='images_input' id='49_5_main_image_input' />");
   $('#content_div').append("<p>49.5 price:<br><input class='images_input' id='49_5_main_image_price_input' />");
   $('#content_div').append("<p>49.5 adv 1:<br><input class='images_input' id='49_5_adv_image_1_input' />");
   $('#content_div').append("<p>49.5 adv 2:<br><input class='images_input' id='49_5_adv_image_2_input' />");
   $('#content_div').append("<p>49.5 adv 3:<br><input class='images_input' id='49_5_adv_image_3_input' />");
   $('#content_div').append("<p><input type='button' value='Отправить' onclick='sendImagesObject()' />");
}

function sendImagesObject()
{
   var obj = {};

   $('.images_input').each
   (
      function()
      {
         if ($(this).val() != "")
         {
            obj[$(this).attr("id")] = $(this).val();
         }
      }
   );

   var json_string = JSON.stringify(obj);
   
   $.post
   (
      post_url, 
      {
         a: "sPID",
         b: $('#articul_input').val(),
         c: json_string
      }, 
      function (result)
      {
         if (result == 1)
         {
            alert("Успешно!")
         }
         else
         {
            alert("Ошибка.");
         }
      }
   );
}

function defineSimilarArticulesForArticul()
{
   $('#content_div').html("Артикул:<br><input id='articul_input' />");
   $('#content_div').append("<p>похожий артикул 1:<br><input class='images_input' id='similar_articul_1' />");
   $('#content_div').append("<p>похожий артикул 2:<br><input class='images_input' id='similar_articul_2' />");
   $('#content_div').append("<p>похожий артикул 3:<br><input class='images_input' id='similar_articul_3' />");
   $('#content_div').append("<p>похожий артикул 4:<br><input class='images_input' id='similar_articul_4' />");   
   $('#content_div').append("<p><input type='button' value='Отправить' onclick='sendSimilarArticulesObject()' />");
}

function sendSimilarArticulesObject()
{
   var obj = {};

   $('.images_input').each
   (
      function()
      {
         if ($(this).val() != "")
         {
            obj[$(this).attr("id")] = $(this).val();
         }
      }
   );

   var json_string = JSON.stringify(obj);
   
   $.post
   (
      post_url, 
      {
         a: "sSAD",
         b: $('#articul_input').val(),
         c: json_string
      }, 
      function (result)
      {
         if (result == 1)
         {
            alert("Успешно!")
         }
         else
         {
            alert("Ошибка.");
         }
      }
   );
}
