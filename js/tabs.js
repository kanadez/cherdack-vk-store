function switchTab(clicked_tab_id, callback_function) // переключает вкалдку
{
   if (cur_active_tab_id != clicked_tab_id)
   {
      cur_active_tab.animate({"opacity": "0.5", "color": "#333", "text-shadow": "1px 1px rgba(0, 0, 0, 0.2)"}, 100);
      
      cur_active_tab.hover
      (
         function()
         {
            $(this).css("opacity", "0.7")
         }, 
         function()
         {
            $(this).css("opacity", "0.5")
         }
      );
      
      clicked_tab = $('#'+clicked_tab_id);
      clicked_tab.css({"opacity": "1", "color": "#7f7f7f", "text-shadow": "none"});
      log(clicked_tab.css("opacity"));
      clicked_tab.hover(function(){$(this).css("opacity", "1")}, function(){$(this).css("opacity", "1")});
      cur_active_tab = clicked_tab;
      eval(callback_function);
   }
}

function showShipTab() // выводит контент вкладки Доставка
{
   $('#content_div').html("<div id='ship_tab_main_div' style='padding:10px 10px 0 10px;'></div>");
   $('#ship_tab_main_div').html("<div style='text-align:center;'><span style='font-size:14px;' class='lighted_text'>Информация о доставке</span></div><p><div style='color:#333;'>"+ship_tab_text+"</div>");
   cur_active_tab_id = "ship_tab_a";
}

function showFitTab() // выводит контент вкладки Примерка
{
   $('#content_div').html("<div id='fit_tab_main_div' style='padding:10px 10px 0 10px;'></div>");
   $('#fit_tab_main_div').html("<div style='text-align:center;'><span style='font-size:14px;' class='lighted_text'>Информация о примерке</span></div><p><div style='color:#333;'>"+fit_tab_text+"</div>");
   cur_active_tab_id = "fit_tab_a";
}

function showPaymentTab() // выводит контент вкладки Оплата
{
   $('#content_div').html("<div id='payment_tab_main_div' style='padding:10px 10px 0 10px;'></div>");
   $('#payment_tab_main_div').html("<div style='text-align:center;'><span style='font-size:14px;' class='lighted_text'>Информация об оплате</span></div><p><div style='color:#333;'>"+payment_tab_text+"</div>");
   cur_active_tab_id = "payment_tab_a";
}

function showAdvsTab() // выводит контент вкладки Почему мы
{
   $('#content_div').html("<div id='advs_tab_main_div' style='padding:10px 10px 0 10px;'></div>");
   $('#advs_tab_main_div').html("<div style='text-align:center;'><span style='font-size:14px;' class='lighted_text'>Чем мы лучше других</span></div><p><div style='color:#333;'>"+advs_tab_text+"</div><div style='margin-top:20px; width:100%; text-align:center'><button id='show_all_catalog_a' class='cupid-green' href='javascript:void(0)'>Перейти в каталог</button></div>");

   $('#show_all_catalog_a').click(function()
   {
      if ($('.side_panel_spoiler_li_active').length == 0 && click_category_from_main_tab == 0)
         turnSidePanelCategory('by_brand_nike_a');

      switchTab('catalog_tab_a', '')         
      cur_active_tab_id = "catalog_tab_a";      
      var sql_params = [];
      
      var table = $("<table />", 
      {
         id: "catalog_table",
         cellspacing: "0",
         cellpadding: "0",
         border: "0"
      });   
      
      $('#content_div').html(table);
      createCatalogGrid();
   });
   
   cur_active_tab_id = "advs_tab_a";
}

function showReturnTab() // выводит контент вкладки Возврат
{
   $('#content_div').html("<div id='return_tab_main_div' style='padding:10px 10px 0 10px;'></div>");
   $('#return_tab_main_div').html("<div style='text-align:center;'><span style='font-size:14px;' class='lighted_text'>Информация о гарантиях и возврате</span></div><p><div style='color:#333;'>"+return_tab_text+"</div>");
   cur_active_tab_id = "return_tab_a";
}

function showFaqTab() // выводит контент вкладки Задать вопрос
{
   $('#content_div').html("<div id='help_me_page_div' class='centered_message_div'></div>");
   $('#help_me_page_div').append("<div id='order_process_delay_title_div' class='lighted_text centered_title'>У Вас возникли проблемы с приложением?</div>");
   $('#order_process_delay_title_div').css({"margin-top":"128px"});
   $('#help_me_page_div').append("<div id='order_process_end_page_text_div'>"+faq_tab_text+"</div>");
   $('#help_me_page_div').append("<div id='help_button_panel_div'></div>");
   $('#help_button_panel_div').append("<button id='help_me_a' class='alert-button'>ПОМОГИТЕ!!!</button>");
   $('#help_me_a').css({"margin-bottom":"20px"});
   $('#help_me_a').click(function(){
      $.post(
         post_url, 
         {
            a: "cNCT",
            b: viewer_id
         }, 
         function (result)
         {
            $('#content_div').html("<div style='text-align:center; margin-top:176px;'><span style='color:#000; font-size:14px;'>Мы Вас услышали!</span><p><span style='color:#333;'>Наш специалист ответит Вам личным сообщением ВКонтакте в течение суток.</span></div>");
         });
   });
   
   $('#help_me_page_div').append("<div id='order_process_end_page_text2_div'>Или просто напишите нашему консультанту Кате. Она на всё ответит. Жмите:<br><div style='margin-top:30px'><a id='to_cart_a' class='button' target='_blank' href='http://vk.com/id89431117'>Перейти на ВК-страницу консультанта</a><div></div>");
   
   cur_active_tab_id = "faq_tab_a";
}

function sendQuestion(question_text) // отправляет запрос с вкладки Задать вопрос на сервер
{
   $.post(
      post_url, 
      {
         a: "pSQ",
         b: viewer_id,
         c: question_text
      }, 
      function (result)
      {
         $('#content_div').html("<div style='text-align:center; margin-top:176px;'><span style='color:#000; font-size:14px;'>Спасибо :)</span><p><span style='color:#333;'>Наш консультант ответит Вам личным сообщением ВКонтакте в течение трёх часов.</span></div>");
      });
}