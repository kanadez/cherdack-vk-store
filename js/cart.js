var order_status_text = [];
order_status_text[0] = "Не подтверждён (жмите \"Оплатить\" ниже)";
order_status_text[1] = "Подтверждён (доставляется к Вам)";
order_status_text[2] = "Доставлен (надеемся, Вы довольны :-)";
order_status_text[3] = "Не подтверждён (ждите сообщения от <a href='http://vk.com/id89431117' class='text_link' target='_blank'>Кати</a>)";
var order_stock_statuses = []; // stock status for each order
var order_nums = [];
var order_articules = [];
var order_brands = [];
var order_titles = [];
var order_types = [];
var order_statuses = [];
var order_prices = []; // price for each order for current cart
var order_timestamps = [];
var order_shoe_sizes = [];
var complete_order_sum = 0;
var complete_order_sum_for_pay_now = 0;
var complete_order_sum_for_pay_later = 0;
var pay_later_shipping_cost = 0;

function showCartTab(tab_switch, purchase_changes_saved) // выводит контент вкладки Корзина
{
   startLoader();

   if (tab_switch == 0)
      cur_active_tab_id = "";      
   
   $.post(
      post_url, 
      {
         a: "gCrD",
         b: viewer_id
      }, 
      function (result)
      {
         obj = eval_global(result);
         order_nums = [];
         order_articules = [];
         order_brands = [];
         order_titles = [];
         order_types = [];
         order_statuses = [];
         order_prices = []; // price for each order for current cart
         order_timestamps = [];
         order_shoe_sizes = [];         
         order_stock_statuses = [];
         complete_order_sum = 0;
         complete_order_sum_for_pay_now = 0;
         complete_order_sum_for_pay_later = 0;
         pay_later_shipping_cost = 0;
         
         if (obj.length == 0)
         {
            $('#content_div').html("<div style='text-align:center; margin-top:176px;'><span style='color:#000; font-size:14px;'>Ваша корзина пока пуста.</span><p><span style='color:#333;'>Но Вы можете перейти в наш каталог и подобрать себе что-нибудь.</span><p><div style='margin-top:40px'><a id='to_cart_a' class='button' href='javascript:void(0)'>Перейти в каталог</a><div></div>");
            $('#to_cart_a').click(function(){
               switchTab("catalog_tab_a", "showCatalogTab(0)");
            });
            
            return;
         }
         
         for (var i = 0; i < obj.length; i++)
         {
            order_nums.push(obj[i].num);
            order_articules.push(obj[i].articul);
            order_timestamps.push(obj[i].timestamp);
            order_shoe_sizes.push(obj[i].shoe_size);
            order_brands.push(obj[i].brand);
            order_titles.push(obj[i].title);
            order_types.push(obj[i].type);
            order_statuses.push(obj[i].status);
            order_prices.push(obj[i].retail_price);
            order_stock_statuses.push(obj[i].in_stock);
         }
         
         $('#content_div').html("");
         
         /*if (in_stock_articules.length != 0)
         {
            var table = $("<table />",
            {
               id: "cart_table_buy",
               cellspacing: "0",
               cellpadding: "0",
               border: "0"
            });
            
            table.addClass("cart_table");
            $('#content_div').append("<div id='cart_div'></div>");
            //$('#cart_div').html("<div id='changes_saved_div' style='width:628px; height:60px; border: solid 1px #000; text-align:center; line-height:60px; background: #6EC554; border: 1px solid #3D8327; color: #FFFFFF; margin-top: 10px; display:none; opacity:0.8'>Изменения Вашей заявки на примерку успешно сохранены.</div>");
            
            //if (purchase_changes_saved == 1)
              // $('#changes_saved_div').show();
            
            $('#cart_div').append("<div id='cart_buy_msg_div' class='cart_buy_msg_div'>Вы собираетесь примерить:</div>");      
            $('#cart_div').append(table);
            
            for (var i = 0; i < in_stock_articules.length; i++)
            {
               $('#cart_table_buy').append("<tr><td id='cart_table_buy_td_"+i+"'></td></tr>");
               $('#cart_table_buy_td_'+i).html("<img id='cart_table_buy_img_"+i+"' class='cart_table_img' src='"+catalogs_path+"/"+in_stock_brands[i]+"/"+in_stock_articules[i]+"/main_thumb.jpg' />");
               $('#cart_table_buy_td_'+i).append("<div class='cart_item_info'><span id='cart_buy_item_name_span_"+i+"' class='cart_item_name'>"+in_stock_titles[i]+"</span><br><span id='cart_buy_item_shoe_size_span_"+i+"' class='cart_item_besides_name'>Размер: "+in_stock_shoe_sizes[i]+"</span><br><span id='cart_buy_item_delivery_time_span_"+i+"' class='cart_item_besides_name'>Время доставки: "+in_stock_deliver_timestamps[i]+"</span><br><span id='cart_buy_item_price_span_"+i+"' class='cart_item_besides_name'>Конечная стоимость: "+in_stock_prices[i]+" руб.</span><div style='float:right; width:244px; margin-top:-21px;'><a id='change_cart_item_params_"+in_stock_nums[i]+"' class='button cart_button' href='javascript:void(0)'>Изменить параметры</a><a id='cancel_purchase_"+in_stock_nums[i]+"' class='button cart_button' href='javascript:void(0)'>Отменить</a><a id='restore_cancelled_purchase_"+in_stock_nums[i]+"' style='display:none; margin:0 2px 0 0; float:right;' class='text_link' href='javascript:void(0)' >Восстановить</a></div></div>");
            
               $('#change_cart_item_params_'+in_stock_nums[i]).bind
               (
                  "click",
                  {
                     num: in_stock_nums[i]
                  },
                  function(event)
                  {
                     changePurchaseParams(event.data.num);
                  }
               );
               
               $('#cancel_purchase_'+in_stock_nums[i]).bind
               (
                  "click",
                  {
                     num: in_stock_nums[i],
                     cancel_button_id: 'cancel_purchase_'+in_stock_nums[i],
                     restore_button_id: 'restore_cancelled_purchase_'+in_stock_nums[i]
                  },
                  function(event)
                  {
                     $('#'+event.data.cancel_button_id).hide();
                     $('#'+event.data.restore_button_id).show();
                     cancelCartItem(event.data.num);
                  }
               );
               
               $('#restore_cancelled_purchase_'+in_stock_nums[i]).bind
               (
                  "click",
                  {
                     num: in_stock_nums[i],
                     cancel_button_id: 'cancel_purchase_'+in_stock_nums[i],
                     restore_button_id: 'restore_cancelled_purchase_'+in_stock_nums[i]
                  },
                  function(event)
                  {
                     $('#'+event.data.cancel_button_id).show();
                     $('#'+event.data.restore_button_id).hide();
                     restoreCartItem(event.data.num);
                  }
               );
            }
         }*/
         
         if (order_articules.length != 0)
         {
            var table = $("<table />", 
            {
               id: "cart_table_order",
               cellspacing: "0",
               cellpadding: "0",
               border: "0"
            });
            
            table.addClass("cart_table");
            $('#content_div').append("<div id='cart_div'></div>");      
            $('#cart_div').append(table);
            
            for (var i = 0; i < order_articules.length; i++)
            {
               $('#cart_table_order').append("<tr><td id='cart_table_order_td_"+i+"'></td></tr>");
               $('#cart_table_order_td_'+i).html("<img id='cart_table_order_img_"+i+"' class='cart_table_img' src='"+catalogs_path+"/"+order_brands[i]+"/"+order_articules[i]+"/main_thumb.jpg'/>");
               $('#cart_table_order_td_'+i).append("<div id='cart_item_"+i+"' class='cart_item_info'></div>");
               $('#cart_item_'+i).append("<span id='cart_order_item_name_span_"+i+"' class='cart_item_name'>"+order_titles[i]+"</span>");
               
               if (order_types[i] == 1 || order_types[i] == 0)
                  $('#cart_item_'+i).append("<br><span id='cart_order_item_shoe_size_span_"+i+"' class='cart_item_besides_name'>Размер: "+order_shoe_sizes[i]+"</span>");
               
               $('#cart_item_'+i).append("<br><span id='cart_order_item_price_span_"+i+"' class='cart_item_besides_name'>Стоимость (без доставки): "+order_prices[i]+" руб.</span>");
               
               if (order_statuses[i] == 1 || order_statuses[i] == 2 || order_statuses[i] == 3)
               {
                  $('#cart_item_'+i).append("<br><span id='cart_order_item_status_span_"+i+"' class='cart_item_besides_name'>Статус: "+order_status_text[order_statuses[i]]+"</span>");
                  $('#cart_item_'+i).append("<a id='cancel_order_"+order_nums[i]+"' class='button cancel_order_button' href='javascript:void(0)'>Отменить</a>");
                  
               }
               else if (order_statuses[i] == 0)
               {
                  $('#cart_item_'+i).append("<br><span id='cart_order_item_status_span_"+i+"' class='cart_item_besides_name'>Статус: "+order_status_text[order_statuses[i]]+"</span>");
                  $('#cart_item_'+i).append("<a id='cancel_order_"+order_nums[i]+"' class='button cancel_order_button' href='javascript:void(0)'>Удалить</a>");
               }
               
               $('#cart_item_'+i).append("<a id='restore_cancelled_order_"+order_nums[i]+"' style='display:none; margin:-21px 26px 0 0; float:right;' class='text_link' href='javascript:void(0)' >Восстановить</a></div>");            
                  
               if (order_types[i] == 1 || order_types[i] == 0)
               {
                  $('#cancel_order_'+order_nums[i]).css("margin", "-42px 0 0");
                  $('#restore_cancelled_order_'+order_nums[i]).css("margin", "-31px 26px 0 0");
               }
               
               $('#cancel_order_'+order_nums[i]).bind(
                  "click",
                  {
                     num: order_nums[i],
                     cancel_button_id: 'cancel_order_'+order_nums[i],
                     restore_button_id: 'restore_cancelled_order_'+order_nums[i]
                  },
                  function(event)
                  {
                     $('#'+event.data.cancel_button_id).hide();
                     $('#'+event.data.restore_button_id).show();
                     cancelCartItem(event.data.num);
                  });
               
               $('#restore_cancelled_order_'+order_nums[i]).bind(
                  "click",
                  {
                     num: order_nums[i],
                     cancel_button_id: 'cancel_order_'+order_nums[i],
                     restore_button_id: 'restore_cancelled_order_'+order_nums[i]
                  },
                  function(event)
                  {
                     $('#'+event.data.cancel_button_id).show();
                     $('#'+event.data.restore_button_id).hide();
                     restoreCartItem(event.data.num);
                  });
            }
            
            for (var i = 0; i < order_prices.length; i++)
               complete_order_sum += Number(order_prices[i]);
            
            complete_order_sum_for_pay_now = complete_order_sum+250;
            pay_later_shipping_cost = Math.round(complete_order_sum*0.1) > 250 ? Math.round(complete_order_sum*0.1) : 250;
            complete_order_sum_for_pay_later = pay_later_shipping_cost > 250 ? Math.round(complete_order_sum*1.1) : Math.round(complete_order_sum+250);
            var order_comment = "";
            
            for (var i = 0; i < order_nums.length; i++)
               if (i != order_nums.length-1)
                  order_comment += order_nums[i]+",";
               else order_comment += order_nums[i]+"";
            
            order_process_payment_pay_now_qiwi_instruction_text = "Вы выбрали способ оплаты “Сейчас”.<p>Таким образом, Вы сначала  оплачиваете заказ, и затем мы высылаем его Вам Почтой России.<p>Стоимость доставки - 250 руб. Общая стоимость заказа - "+complete_order_sum_for_pay_now+" руб.<p>Оплатить можно через платежный терминал QIWI. Такие есть в каждом городе.<p>Чтобы оплатить, 1) найдите любой терминал QIWI, 2) зайдите в меню Оплата услуг => Электронные деньги => QIWI Кошелек и 3) положите <span class='shadowed_text' style='font-size:14px;'>"+complete_order_sum_for_pay_now+" руб.</span> на кошелёк номер <span style='font-size:14px; color:#d63333' class='shadowed_text'>9658171300</span><br><br><br>Подробная инструкция:<p>1. Выберите раздел “Оплата услуг” (Именно его, и никакой другой!!!):<p><img style='margin-left:115px' src='img/qiwi/01.png' /><p>2. Выберите раздел “Электронные деньги”:<p><img style='margin-left:115px' src='img/qiwi/02.png' /> <p>3. Выберите “QIWI Кошелёк”:<p><img style='margin-left:115px' src='img/qiwi/03.png' /><p>4. Введите номер Кошелька - <span style='font-size:14px; color:#d63333' class='shadowed_text'>9658171300</span>:<p><img style='margin-left:115px' src='img/qiwi/04.png' /><p>5. Введите комментарий - “заказ "+order_comment+"”:<p><img style='margin-left:115px' src='img/qiwi/05.png' /><p>6. Подтвердите правильность введенных данных:<p><img style='margin-left:115px' src='img/qiwi/06.png' /><p>7. Внесите деньги в купюроприемник терминала:<p><img style='margin-left:115px' src='img/qiwi/07.png' /><p>8. Не забудьте взять чек!!!<br><br><p>Эту инструкцию Вы потом сможете найти во вкладке “Оплата” в любой момент времени.<p>Сейчас подтвердите заказ и далее ищите терминал, чтобы оплатить заказ.";
            order_process_payment_pay_later_qiwi_instruction_text  = "Вы выбрали способ оплаты “При получении”.<p>Таким образом, мы сначала отправляем Вам заказ Почтой России, а затем Вы оплачиваете его при получении в почтовом отделении.<p>Стоимость доставки - "+pay_later_shipping_cost+" руб. Общая стоимость заказа - <span style='font-size:14px' class='shadowed_text'>"+complete_order_sum_for_pay_later+" руб.</span><p>Данные для доставки Вы уже указали ранее, теперь просто подтвердите заказ и ждите почтового извещения.";
            
            $('#cart_div').append("<div style='text-align:center; margin-top:20px;'><span class='lighted_text'>Общая стоимость заказа (без доставки): </span><span id='cart_total_sum_span' style='font-size:14px' class='shadowed_text'>"+complete_order_sum+" руб.</span></div>");
            
            var tumbler_1 = 0;
            for (var i = 0; i < order_statuses.length; i++)
            {
               if (order_statuses[i] == 0)
                  tumbler_1 = 1;
            }
            
            if (tumbler_1 == 1)
            {
               $('#cart_total_sum_span').append("<div style='margin-top:20px'><button id='cart_go_to_cart_a' class='cupid-green'>Оплатить</button><div>");
            
               $('#cart_go_to_cart_a').click(function(){
                  showMakeOrderPage();
               });
            }
         }

         /*if ($('#what_a_fuckin_discount_a').length != 0)
            $('#what_a_fuckin_discount_a').tooltip(
            {
               effect: "fade",
               fadeInSpeed: 100,
               fadeOutSpeed: 100,
               opacity: 0.8
            });
         */
         stopLoader();
      }
   );
   
   cur_active_tab_id = "cart_tab_a";
}

function cancelCartItem(num) //deletes order from cart
{
   $.post(
      post_url, 
      {
         a: "cCI",
         b: num
      }, 
      function (result)
      {
         return;
      });
}

function restoreCartItem(num)// restores deleted order
{
   $.post(
      post_url, 
      {
         a: "rCI",
         b: num
      }, 
      function (result)
      {
         return;
      });
}

function putOrderToCart2(articul, phone_num)
{   
   $.post(
      post_url, 
      {
         a: "pOTC",
         b: viewer_id,
         c: articul,
         d: current_selected_size,
         e: phone_num
      }, 
      function (result)
      {
         $('#content_div').html("<div style='text-align:center; margin-top:176px;'><span style='color:#000; font-size:14px;'>Спасибо :)</span><p><span style='color:#333;'>Теперь Ваш заказ находится в Вашей корзине покупок. Там Вы можете отменить его, если пожелаете.</span><p><div style='margin-top:30px'><a id='to_cart_a' class='button' href='javascript:void(0)'>Перейти в корзину</a><div></div>");
         $('#to_cart_a').click(function()
         {
            switchTab("cart_tab_a", "showCartTab(1, 0)");
         });
      });
}

function putPurchaseToCart(articul, deliver_address, deliver_hour, deliver_minute, phone_num, need_change, advanced_info)
{   
   $.post(
      post_url, 
      {
         a: "pPTC",
         b: viewer_id,
         c: articul,
         d: current_selected_size,
         e: phone_num,
         f: deliver_hour,
         g: deliver_minute,
         h: deliver_address,
         i: need_change,
         j: advanced_info
      }, 
      function (result)
      {
         $('#content_div').html("<div style='text-align:center; margin-top:176px;'><span style='color:#000; font-size:14px;'>Спасибо :)</span><p><span style='color:#333;'>Теперь Ваша заявка на примерку находится в Вашей Корзине. Там Вы можете изменить её параметры, такие как время или адрес доставки.</span><p><div style='margin-top:30px'><a id='to_cart_a' class='button' href='javascript:void(0)'>Перейти в Корзину</a><div></div>");
         $('#to_cart_a').click(function()
         {
            switchTab("cart_tab_a", "showCartTab(1, 0)");
         });
      });
}

function changePurchaseParams(num)
{
   $('#content_div').html("<div id='make_purchase_page_div' style='width:auto; height:auto; padding:10px; color:#333;'></div>");
   $('#make_purchase_page_div').html("<div style='width:100%; text-align:center; font-size:14px; color:#000;'>Вы собираетесь изменить параметры Вашей заявки на примерку</div>");
   $('#make_purchase_page_div').append("<br><div style='float:left'>Куда доставить (например, \"Анохина 32-50\" или \"к Сигме\")</div><div style='color:rgba(176,0,0,1); float:left;'>*</div><div>:</div>");
   $('#make_purchase_page_div').append("<input id='delivery_address_input' style='width:359px;' class='purchase_form_input' />");
   $('#make_purchase_page_div').append("<p><div style='float:left;'>Когда</div><div style='color:rgba(176,0,0,1); float:left;'>*</div><div>:</div>");
   $('#make_purchase_page_div').append("<div id='delivery_time_selects_div' style='width:100%; margin-top:-5px'></div>");
   $('#make_purchase_page_div').append("<p><div style='float:left;'>Ваш контактный номер телефона</div><div style='color:rgba(176,0,0,1); float:left;'>*</div><div>:</div>");
   $('#make_purchase_page_div').append("<input id='phone_num_input' style='width:207px' class='purchase_form_input' />");
   $('#make_purchase_page_div').append("<p><div style=''>Понадобится ли Вам сдача и сколько? (если нет - оставьте это поле пустым):</div>");
   $('#make_purchase_page_div').append("<input id='need_change_input' style='width:457px;' class='purchase_form_input' />");
   $('#make_purchase_page_div').append("<p><div style=''>Дополнительная информация (например, \"позвоните, когда будете у подъезда, и я спущусь\"):</div>");
   $('#make_purchase_page_div').append("<input id='advanced_info_input' style='width:556px;' class='purchase_form_input' />");   
   $('#make_purchase_page_div').append("<div id='change_purchase_params_buttons_div' style='float:left; margin-top:20px; width:100%;'></div>");
   $('#change_purchase_params_buttons_div').append("<br><a id='save_purchase_params_button_a' class='button' style='float:left; margin:0 10px 0 0; width:157px; text-align:center;' href='javascript:void(0)'>Сохранить</a>");
   $('#change_purchase_params_buttons_div').append("<br><a id='cancel_purchase_params_button_a' class='button' style='float:right; margin-top:-14px' href='javascript:void(0)'>Отмена</a>");
   
   $('#save_purchase_params_button_a').bind(
      "click",
      {
         num: num
      },
      function(event)
      {
         if (!highlightIfEmpty())
         {
            updateCartPurchaseItem(event.data.num, $('#delivery_address_input').val(), $('#delivery_time_hour_select-button').children('span').text(), $('#delivery_time_minute_select-button').children('span').text(), $('#phone_num_input').val(), $('#need_change_input').val(), $('#advanced_info_input').val())
         }
      });
   
   $('#cancel_purchase_params_button_a').click(function(event)
      {
         showCartTab(0, 0)
      });
      
   $.post(
      post_url,
      {
         a: "gCID",
         b: num
      },
      function(result)
      {
         if (isNotIE())
            obj = eval("(" + result + ")");
         else
            obj = eval_global(result);
            
         $('#delivery_address_input').val(obj[0].deliver_address);
         $('#phone_num_input').val(obj[0].phone_num);
         $('#need_change_input').val(obj[0].need_change);
         $('#advanced_info_input').val(obj[0].advanced_info);
         var delivery_date_obj = getDateFromTimestampInArray(obj[0].deliver_timestamp);  
         $('#delivery_time_selects_div').append("<p><div id='delivery_day_div' style='float:left; margin-top:7px'></div><select id='delivery_time_hour_select' style='float:left'></select>");
         $('#delivery_time_hour_select').append("<option>"+delivery_date_obj.hours+"</option>");
         
         for (var i = 9; i < 22; i++)
            if (delivery_date_obj.hours != i)
               $('#delivery_time_hour_select').append("<option>"+i+"</option>");
         
         $('#delivery_time_hour_select').selectmenu({maxHeight: 300, width:65});
         $('#delivery_time_hour_select-button').css("float", "left");
         $('#delivery_time_selects_div').append("<div style='float:left; margin-top:7px;'>&nbsp;:&nbsp;</div>");
         $('#delivery_time_selects_div').append("<p><select id='delivery_time_minute_select' style='float:left;'></select>");
         
         if (delivery_date_obj.minutes != 0)
            $('#delivery_time_minute_select').append("<option>"+delivery_date_obj.minutes+"</option>");
         else
            $('#delivery_time_minute_select').append("<option>"+delivery_date_obj.minutes+"0</option>");
         
         var c = 0;               
         
         for (var i = 0; i < 6; i++)
         {
            if (delivery_date_obj.minutes != c)
            {
               if (c == 0)
                  $('#delivery_time_minute_select').append("<option>"+c+"0</option>");
               else
                  $('#delivery_time_minute_select').append("<option>"+c+"</option>");
            }
            
            c += 10;
         }
         
         $('#delivery_time_minute_select').selectmenu({width:65, maxHeight: 200});
      
         $.post(
            post_url, 
            {
               a: "gDDFCI",
               b: obj[0].num
            }, 
            function (result)
            {
               $('#delivery_day_div').html(result);
            });
      });
}

function updateCartPurchaseItem(num, deliver_address, deliver_hour, deliver_minute, phone_num, need_change, advanced_info)
{
   if ($('#need_to_set_tomorrow').length != 0)
   {
      $.post(
         post_url, 
         {
            a: "uCID",
            b: num,
            c: deliver_address,
            d: deliver_hour,
            e: deliver_minute,
            f: phone_num,
            g: need_change,
            h: advanced_info,
            i: 1
         },
         function (result)
         {
            showCartTab(0, 1);
         });
   }
   else
   {
      $.post(
         post_url, 
         {
            a: "uCID",
            b: num,
            c: deliver_address,
            d: deliver_hour,
            e: deliver_minute,
            f: phone_num,
            g: need_change,
            h: advanced_info,
            i: 0
         },
         function (result)
         {
            showCartTab(0, 1);
         });
   }
}

function highlightIfEmpty()
{
   var empty_inputs = [];
   
   if ($('#delivery_address_input').val() == "")
      empty_inputs.push("delivery_address_input");
   
   if ($('#phone_num_input').val() == "")
      empty_inputs.push("phone_num_input");
   
   if (empty_inputs.length != 0)
   {
      for (var i = 0; i < empty_inputs.length; i++)
         $('#'+empty_inputs[i]).animate({backgroundColor: '#c36868'}, {queue:false, duration:0, complete: function(){$(this).animate({backgroundColor: '#FFF'}, {queue:false, duration:1000})}})
      
      return -1;
   }
   else
   {
      return 0;
   }
}

function addToCart(articul, size){ // adds product to cart from Product page. just adds without payment or anything
   putOrderToCart(articul, size, viewer_id, 0);
   $('#content_div').html("<div style='text-align:center; margin-top:176px;'><span style='color:#000; font-size:14px;'>Товар добавлен в корзину.</span><p><span style='color:#333;'>Вы можете теперь оплатить его в корзине, либо выбрать себе еще что-нибудь.</span><p><div style='margin-top:40px'><button id='cart_go_to_cart_a' class='cupid-green'>Перейти в корзину</button><a id='cart_continue_shopping_a' class='button' style='margin-left: 20px;' href='javascript:void(0)'>Продолжить шоппинг</a><div></div>");

   $('#cart_go_to_cart_a').click(function(){
      switchTab("cart_tab_a", "showCartTab()");
   });
   
   $('#cart_continue_shopping_a').click(function(){
      backToCatalog();
   });
}

function parseForDeliveryDurations()
{
   var a = order_stock_statuses;
   var sum = 0;
   var _case = -1; // 1 = 0,0; 2 = 0,1; 3 = 1,1
   
   for (var i = 0; i < a.length; i++)
       sum += a[i]
   
   
   if (sum != 0)
   {
       if (a.length / sum == 1)
           _case = 3
       else
           _case = 2
   }
   else
   {
       _case = 1;
   }
   
   return _case;
}