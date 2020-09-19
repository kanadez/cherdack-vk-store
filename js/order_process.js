var order_collected_data = {}; // собранные о клиенте данные для доставки и оплаты

function showMakeOrderPage()
{
   cImages[0] = new Image();
   cImages[0].id = "order_process_progress_bar_0_img";
   cImages[0].src = "img/progress_bar_1.png";
   
   cImages[1] = new Image();
   cImages[1].id = "order_process_progress_bar_1_img";
   cImages[1].src = "img/progress_bar_2.png";
   
   cImages[2] = new Image();
   cImages[2].id = "order_process_progress_bar_2_img";
   cImages[2].src = "img/progress_bar_3.png";
   
   cImages[3] = new Image();
   cImages[3].id = "order_process_progress_bar_3_img";
   cImages[3].src = "img/progress_bar_4.png";
   
   cImages[4] = new Image();
   cImages[4].id = "order_process_progress_bar_4_img";
   cImages[4].src = "img/progress_bar_5.png";
   
   $('#content_div').html("<div id='make_order_page_div'></div>");
   turnOpacityOff($('#make_order_page_div'));
   
   $('#make_order_page_div').html(cImages[0]);
   $('#order_process_progress_bar_0_img').addClass("order_process_progress_bar_img");
   $('#make_order_page_div').append("<div id='order_process_step_title_div' class='lighted_text'>Условия заказа</div>");
   $('#make_order_page_div').append("<div id='order_process_confirmation_alert_div' class='shadowed_text'>Прочтите внимательнее, это чертовски важно!!!</div>");
   $('#make_order_page_div').append("<div id='order_process_payment_info_div'></div>");
   $('#order_process_payment_info_div').append("<div class='lighted_text order_process_conditions_block_title'>Оплата</div>");
   $('#order_process_payment_info_div').append("<div class='order_process_conditions_block_content'>"+order_process_payment_info+"</div>");
   $('#make_order_page_div').append("<div id='order_process_shipping_info_div'></div>");
   $('#order_process_shipping_info_div').append("<div class='lighted_text order_process_conditions_block_title'>Доставка</div>");
   $('#order_process_shipping_info_div').append("<div class='order_process_conditions_block_content'>"+order_process_shipping_info+"</div>");
   $('#make_order_page_div').append("<div id='order_process_returns_info_div'></div>");
   $('#order_process_returns_info_div').append("<div class='lighted_text order_process_conditions_block_title'>Гарантия</div>");
   $('#order_process_returns_info_div').append("<div class='order_process_conditions_block_content'>"+order_process_return_info+"</div>");
   $('#make_order_page_div').append("<div id='order_process_buttons_panel_div'></div>");
   
   if (viewer_sex == 1)
      $('#order_process_buttons_panel_div').append("<button id='agree_conditions_button_a' class='cupid-green'>Я согласна с условиями и хочу продолжить</button>");
   else
      $('#order_process_buttons_panel_div').append("<button id='agree_conditions_button_a' class='cupid-green'>Я согласен с условиями и хочу продолжить</button>");
   
   $('#agree_conditions_button_a').click(function(){
      showOrderShippingPage()
   });
   
   $('#order_process_buttons_panel_div').append("<a id='disagree_conditions_button_a' href='javascript:void(0)' class='secondary_button'>Отмена</a>");
   $('#disagree_conditions_button_a').click(function(){
      if (cur_active_tab_id == "cart_tab_a")
         nullCurrentTab();
      
      switchTab('cart_tab_a', 'showCartTab()');
   });
   
   animateOpacityOn($('#make_order_page_div'));
}

function showOrderShippingPage(){
   $('#make_order_page_div').html(cImages[1]);
   $('#order_process_progress_bar_1_img').addClass("order_process_progress_bar_img");
   $('#make_order_page_div').append("<div id='order_process_step_title_div' class='lighted_text'>Сбор информации для доставки</div>");
   $('#make_order_page_div').append("<div id='order_process_delivery_page_ptz_q_div' style='text-align:center; margin-top:20px;'></div>");
   $('#order_process_delivery_page_ptz_q_div').append("<span>Вы из Петрозаводска?</span><p><div style='margin-top:20px'><button id='delivery_page_ptz_yes_button' class='button' style='width:118px'>Да</button><button id='delivery_page_ptz_no_button' class='button' style='margin-left:10px; width:118px'>Нет</button><div>");
   $('#make_order_page_div').append("<div id='order_process_delivery_page_ptz_case_div' style='text-align:left; margin-top:20px;'></div>");
   
   $('#delivery_page_ptz_yes_button').click(function(){
      order_collected_data.client_from_ptz = 1;
      
      switch(parseForDeliveryDurations()){
         case 1:
            $('#order_process_delivery_page_ptz_q_div').remove();
            $('#order_process_delivery_page_ptz_case_div').html(order_process_delivery_ptz_yes_case_1_text);
         break;
         case 2:
            $('#order_process_delivery_page_ptz_q_div').remove();
            $('#order_process_delivery_page_ptz_case_div').html(order_process_delivery_ptz_yes_case_2_text);            
         break;
         case 3:
            $('#order_process_delivery_page_ptz_q_div').remove();
            $('#order_process_delivery_page_ptz_case_div').html(order_process_delivery_ptz_yes_case_3_text);
         break;
      }
      
      $('#make_order_page_div').append("<div style='margin-top:20px; text-align:center;'><button id='delivery_page_to_confirmation_button' class='cupid-green' style='width:209px'>Далее к подтверждению</button><a id='shipping_page_delay_button_a' href='javascript:void(0)' class='secondary_button'>Отмена</a><div>");
   
      $('#shipping_page_delay_button_a').click(function(){
         if (cur_active_tab_id == "cart_tab_a")
            nullCurrentTab();
      
         switchTab('cart_tab_a', 'showCartTab()');
      });
   
      $('#delivery_page_to_confirmation_button').click(function(){
         showOrderConfirmationPage()
      });
   });
   
   $('#delivery_page_ptz_no_button').click(function(){
      order_collected_data.client_from_ptz = 0;
      
      $('#order_process_delivery_page_ptz_q_div').remove();
      var place = $('#order_process_delivery_page_ptz_case_div');
      place.html("Куда Вам доставить заказ? Напишите, пожалуйста, Ваши данные, и мы отправим заказ почтой."); 
      place.append("<div style='margin-top:20px;'>Ваши Ф.И.О.:</div>");
      place.append("<input id='client_fio_input' style='width:100%; width:625px' />");
      place.append("<div style='margin-top:20px;'>Ваш адрес (город, улица, дом, корпус, квартира):</div>");
      place.append("<input id='client_address_input' style='width:100%; width:625px' />");
      place.append("<div style='margin-top:20px;'>Почтовый индекс Вашего города:</div>");
      place.append("<input id='client_index_input' style='width:100%; width:625px' />");      
      $('#make_order_page_div').append("<div style='margin-top:20px; text-align:center;'><button id='delivery_page_user_data_save_button' class='cupid-green' style='width:209px'>Сохранить и к оплате</button><a id='shipping_page_delay_button_a' href='javascript:void(0)' class='secondary_button'>Отмена</a><div>");   
      
      $('#shipping_page_delay_button_a').click(function(){
         if (cur_active_tab_id == "cart_tab_a")
            nullCurrentTab();
      
         switchTab('cart_tab_a', 'showCartTab()');
      });
      
      $('#delivery_page_user_data_save_button').click(function(){
         order_collected_data.client_fio = $('#client_fio_input').val();
         order_collected_data.client_address = $('#client_address_input').val();
         order_collected_data.client_index = $('#client_index_input').val();
         
         if (!highlightIfDeliveryEmpty())
            showOrderPaymentPage();
      });
   });
}

function showOrderPaymentPage(){
   $('#make_order_page_div').html(cImages[2]);
   $('#order_process_progress_bar_2_img').addClass("order_process_progress_bar_img");
   $('#make_order_page_div').append("<div id='order_process_step_title_div' class='lighted_text'>Оплата заказа</div>");
   $('#make_order_page_div').append("<div id='order_process_delivery_page_payment_info_div' style='text-align:center; margin:20px;'></div>");
   $('#order_process_delivery_page_payment_info_div').append("<span>Когда желаете оплатить заказ?</span><p><div style='margin-top:20px'><button id='payment_page_pay_now_button' class='cupid-green' style='width:229px'>Сейчас (так дешевле)</button><button id='payment_page_pay_later_button' class='button' style='margin-left:10px; width:229px'>При получении (так дороже)</button><div>");
   $('#make_order_page_div').append("<div id='order_process_payment_page_instruction_div' style='text-align:left; margin-top:20px;'></div>");

   $('#payment_page_pay_now_button').click(function(){
      order_collected_data.payment_way = 1;
      
      $('#order_process_delivery_page_payment_info_div').remove();
      $('#order_process_payment_page_instruction_div').html(order_process_payment_pay_now_qiwi_instruction_text);
      $('#make_order_page_div').append("<div style='margin-top:20px; text-align:center;'><button id='payment_page_to_confirmation_button' class='cupid-green' style='width:209px'>Далее к подтверждению</button><a id='payment_page_delay_button_a' href='javascript:void(0)' class='secondary_button'>Отмена</a><div>");
      
      $('#payment_page_delay_button_a').click(function(){
         if (cur_active_tab_id == "cart_tab_a")
            nullCurrentTab();
      
         switchTab('cart_tab_a', 'showCartTab()');
      });
      
      $('#payment_page_to_confirmation_button').click(function(){
         showOrderConfirmationPage()
      });
   });
   
   $('#payment_page_pay_later_button').click(function(){
      order_collected_data.payment_way = 0;
      
      $('#order_process_delivery_page_payment_info_div').remove();
      $('#order_process_payment_page_instruction_div').html(order_process_payment_pay_later_qiwi_instruction_text);
      $('#make_order_page_div').append("<div style='margin-top:20px; text-align:center;'><button id='payment_page_to_confirmation_button' class='cupid-green' style='width:209px'>Далее к подтверждению</button><a id='payment_page_delay_button_a' href='javascript:void(0)' class='secondary_button'>Отмена</a><div>");
      
      $('#payment_page_delay_button_a').click(function(){
         if (cur_active_tab_id == "cart_tab_a")
            nullCurrentTab();
      
         switchTab('cart_tab_a', 'showCartTab()');
      });
      
      $('#payment_page_to_confirmation_button').click(function(){
         showOrderConfirmationPage()
      });
   });
}

function showOrderConfirmationPage(){
   $('#make_order_page_div').html(cImages[3]);
   $('#order_process_progress_bar_3_img').addClass("order_process_progress_bar_img");
   $('#make_order_page_div').append("<div id='order_process_step_title_div' class='lighted_text'>Подтверждение заказа</div>");
   $('#make_order_page_div').append("<div id='order_process_confirmation_page_info_div' style='text-align:left; margin-top:20px;'>"+order_process_confirmation_text+"</div>");
   $('#make_order_page_div').append("<div style='margin-top:20px; text-align:center;'><button id='confirmation_page_ok_button' class='cupid-green' style='width:209px'>ОК, отвечу</button><a id='confirmation_page_delay_button_a' href='javascript:void(0)' class='secondary_button'>Отмена</a><div>");
    
   $('#confirmation_page_delay_button_a').click(function(){
      if (cur_active_tab_id == "cart_tab_a")
         nullCurrentTab();
      
      switchTab('cart_tab_a', 'showCartTab()');
   });
   
   $('#confirmation_page_ok_button').click(function(){
      setOrderConfirmedByUser();
      showOrderProcessEndPage();
   });
}

function showOrderProcessEndPage(){
   $('#make_order_page_div').html(cImages[4]);
   $('#order_process_progress_bar_4_img').addClass("order_process_progress_bar_img");
   $('#make_order_page_div').append("<div id='order_process_end_page_title_div' class='lighted_text'>Спасибо :)</div>");
   $('#make_order_page_div').append("<div id='order_process_end_page_text_div'>"+order_process_end_page_text+"</div>");
   $('#make_order_page_div').append("<div id='order_process_a_panel_div'></div>");
   $('#order_process_a_panel_div').append("<a id='order_process_end_page_go_to_cart_button_a' href='javascript:void(0)' class='button'>Перейти в Корзину</a>");
   
   $('#order_process_end_page_go_to_cart_button_a').click(function(e)
   {
      if (cur_active_tab_id == "cart_tab_a")
         nullCurrentTab();
      
      switchTab('cart_tab_a', 'showCartTab()');   
   });
}

function showOrderDelayPage(){
   $('#make_order_page_div').html("<div id='order_process_delay_title_div' class='lighted_text centered_title'>Ваш заказ отложен на потом</div>");
   $('#make_order_page_div').append("<div id='order_process_end_page_text_div'>"+order_process_delay_text+"</div>");
   $('#make_order_page_div').append("<div id='order_process_buttons_panel_div'></div>");
   $('#order_process_buttons_panel_div').append("<button id='order_process_continue_shopping_button_a' class='cupid-green'>Продолжить шоппинг</button>");
   $('#order_process_buttons_panel_div').append("<a id='order_process_go_to_cart_button_a' href='javascript:void(0)' class='secondary_button'>Перейти в корзину</a>");

   $('#order_process_continue_shopping_button_a').click(function(e)
   {
      if (cur_active_tab_id == "catalog_tab_a")
         nullCurrentTab();
         
      switchTab('catalog_tab_a', 'showCatalogTab()');
   });
   
   $('#order_process_go_to_cart_button_a').click(function(e)
   {
      if (cur_active_tab_id == "cart_tab_a")
         nullCurrentTab();         
      
      switchTab('cart_tab_a', 'showCartTab()');   
   });
}

function putOrderToCart(articul, size, customer_id, status) // puts order to cart physically from addToCart() function
{
   $.post(
      post_url, 
      {
         a: "pOTC",
         b: customer_id,
         c: articul,
         d: size,
         e: status
      }, 
      function (result){
         //log("puto order to cart: "+result);
      });
}

function showMakePurchasePage(articul, title){
   $('#content_div').html("<div id='make_purchase_page_div' style='width:auto; height:auto; padding:10px; color:#333;'></div>");
   $('#make_purchase_page_div').html("<div style='width:100%; text-align:center; font-size:14px; color:#000;'>Вы собираетесь заказать примерку кросс "+title+" "+current_selected_size+" размера</div>");
   $('#make_purchase_page_div').append("<p><div style=''>Укажите, пожалуйста, некоторые свои контактные данные, чтобы наш курьер смог доставить Вам кроссы для примерки.</div>");
   $('#make_purchase_page_div').append("<br><div style='float:left'>Куда доставить (например, \"Анохина 32-50\" или \"к Сигме\")</div><div style='color:rgba(176,0,0,1); float:left;'>*</div><div>:</div>");
   $('#make_purchase_page_div').append("<input id='delivery_address_input' style='width:359px;' class='purchase_form_input' />");
   $('#make_purchase_page_div').append("<p><div style='float:left;'>Когда</div><div style='color:rgba(176,0,0,1); float:left;'>*</div><div>:</div>");
   $('#make_purchase_page_div').append("<div id='delivery_time_selects_div' style='width:100%; margin-top:-5px'></div>");
   $('#delivery_time_selects_div').append("<p><div id='delivery_day_div' style='float:left; margin-top:7px'></div><select id='delivery_time_hour_select' style='float:left'><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option></select>");
   $('#delivery_time_hour_select').selectmenu({maxHeight: 300, width:65});
   $('#delivery_time_hour_select-button').css("float", "left");
   $('#delivery_time_selects_div').append("<div style='float:left; margin-top:7px;'>&nbsp;:&nbsp;</div>");
   $('#delivery_time_selects_div').append("<p><select id='delivery_time_minute_select' style='float:left;'><option>00</option><option>10</option><option>20</option><option>30</option><option>40</option><option>50</option></select>");
   $('#delivery_time_minute_select').selectmenu({width:65, maxHeight: 200});
   $('#make_purchase_page_div').append("<p><div style='float:left;'>Ваш контактный номер телефона</div><div style='color:rgba(176,0,0,1); float:left;'>*</div><div>:</div>");
   $('#make_purchase_page_div').append("<input id='phone_num_input' style='width:207px' class='purchase_form_input' />");
   $('#make_purchase_page_div').append("<p><div style=''>Понадобится ли Вам сдача и сколько? (если нет - оставьте это поле пустым):</div>");
   $('#make_purchase_page_div').append("<input id='need_change_input' style='width:457px;' class='purchase_form_input' />");
   $('#make_purchase_page_div').append("<p><div style=''>Дополнительная информация (например, \"позвоните, когда будете у подъезда, и я спущусь\"):</div>");
   $('#make_purchase_page_div').append("<input id='advanced_info_input' style='width:556px;' class='purchase_form_input' />");     
   $('#make_purchase_page_div').append("<p><div style=''>Теперь последний раз нажмите кнопку \"Хочу примерить\", и завтра наш курьер приедет к Вам с кроссами по указанному Вами адресу в указанное время.</div>");
   $('#make_purchase_page_div').append("<br><div id='purchase_buttons_div' style='width:100%'></div>");
   $('#purchase_buttons_div').append("<a id='buy_button_a' href='javascript:void(0)'><img class='buy_order_button' style='margin: 0px 0 -9px -4px;' src='../img/buy_button.png' /></a>");
   $('#purchase_buttons_div').append("<a id='cancel_button_a' href='javascript:void(0)' style='float:right; margin-top:11px' class='button'>Отмена</a>");
   $('#buy_button_a').click
   (
      {
         articul: articul
      },
      function(event)
      {
         if (!highlightIfEmpty())
         {
            putPurchaseToCart(event.data.articul, $('#delivery_address_input').val(), $('#delivery_time_hour_select-button').children('span').text(), $('#delivery_time_minute_select-button').children('span').text(), $('#phone_num_input').val(), $('#need_change_input').val(), $('#advanced_info_input').val());
         }
      }
   );
   
   $('#cancel_button_a').click
   (
      {
         articul: articul
      },
      function(event)
      {
         showProductPage(event.data.articul, -1, 0);
      }
   );
      
   $.post
   (
      post_url, 
      {
         a: "gTFPP"
      }, 
      function (result)
      {
         $('#delivery_day_div').html("Завтра ("+result+") в&nbsp;");
      }
   );
}

function setOrderConfirmedByUser(){
   $.post
   (
      post_url, 
      {
         a: "sOCBU",
         b: viewer_id,
         c: JSON.stringify(order_collected_data)
      }, 
      function (result){});
}

function showShoesOrderErrorPage()
{
   log("showShoesOrderErrorPage");
   
   $('#make_order_page_div').append("<div id='order_process_confirmation_alert_div' style='margin-top: 0' class='shadowed_text'>Прочтите внимательнее, это чертовски важно!!!</div>");
   $('#make_order_page_div').append("<div id='order_process_confirmation_text_div'>"+make_order_shoes_error_text+"</div>");
   animateOpacityOn($('#make_order_page_div'));
}

function highlightIfDeliveryEmpty(){
   var error = 0;
   
   if ($('#client_fio_input').val().length == 0){
         $('#client_fio_input').animate({backgroundColor: '#c36868'}, {queue:false, duration:0, complete: function(){$(this).animate({backgroundColor: '#FFF'}, {queue:false, duration:1000})}});
         error = 1;
   }
   
   if ($('#client_address_input').val().length == 0){
         $('#client_address_input').animate({backgroundColor: '#c36868'}, {queue:false, duration:0, complete: function(){$(this).animate({backgroundColor: '#FFF'}, {queue:false, duration:1000})}});
         error = 1;
   }
   
   if ($('#client_index_input').val().length == 0){
         $('#client_index_input').animate({backgroundColor: '#c36868'}, {queue:false, duration:0, complete: function(){$(this).animate({backgroundColor: '#FFF'}, {queue:false, duration:1000})}});
         error = 1;
   }
   
   log(error);
   return error;
}