var user_monitor_data_object = {};
var offset = 0;

function startUserMonitor(){
   var UM_side_panel = $("<div />",{
      id: "UM_side_panel",
      class: "side_panel"
   });
   
   UM_side_panel.css({"margin": "0"});   
   $('#content_div').html(UM_side_panel);

   var show_UM_table_button = $("<button />",{
      id: "show_UM_table_button",
      class: "side_panel_button",
      text: "Показать таблицу User Monitor"
   });
   
   show_UM_table_button.click(function(){
      showUserMonitorTable("come-in");
   });
   
   var show_UM_orders_button = $("<button />",{
      id: "show_UM_orders_button",
      class: "side_panel_button",
      text: "Показать все нажатия кнопки 'Заказать'"
   });
   
   show_UM_orders_button.click(function(){
      showUserMonitorTable("order-button");
   });
   
   var show_UM_buys_button = $("<button />",{
      id: "show_UM_buy_button",
      class: "side_panel_button",
      text: "Показать все нажатия кнопки 'Купить'"
   });
   
   show_UM_buys_button.click(function(){
      showUserMonitorTable("buy-button");
   });
   
   var show_UM_banner_clicks_button = $("<button />",{
      id: "show_UM_banner_clicks_button",
      class: "side_panel_button",
      text: "Показать все нажатия кнопки Хэдер-баннера"
   });
   
   show_UM_banner_clicks_button.click(function(){
      showUserMonitorTable("header_banner");
   });
   
   var show_UM_q_to_consultant_clicks_button = $("<button />",{
      id: "show_UM_q_to_consultant_clicks_button",
      class: "side_panel_button",
      text: "Показать все нажатия ссылки 'Задать вопрос об этой модели'"
   });
   
   show_UM_q_to_consultant_clicks_button.click(function(){
      showUserMonitorTable("q_to_consultant");
   });
   
   var user_counter_div = $("<div />",{
      id: "user_counter_div",
      class: "counter_div"
   });
   
   var unique_user_counter_div = $("<div />",{
      id: "unique_user_counter_div",
      class: "counter_div"
   });
   
   var main_tab_user_counter_div = $("<div />",{
      id: "main_tab_user_counter_div",
      class: "counter_div"
   });
   
   var main_tab_unique_user_counter_div = $("<div />",{
      id: "main_tab_unique_user_counter_div",
      class: "counter_div"
   });
   
   var user_counter_for_date_input = $("<input />",{
      id: "user_counter_for_date_input"
   });
   
   user_counter_for_date_input.css({"width": "200px"});
   
   var user_counter_for_date_div = $("<div />",{
      id: "user_counter_for_date_div",
      class: "counter_div"
   });
   
   var unique_user_counter_for_date_div = $("<div />",{
      id: "unique_user_counter_for_date_div",
      class: "counter_div"
   });
   
   var main_tab_unique_user_counter_for_date_div = $("<div />",{
      id: "main_tab_unique_user_counter_for_date_div",
      class: "counter_div"
   });
   
   var main_tab_user_counter_for_date_div = $("<div />",{
      id: "main_tab_user_counter_for_date_div",
      class: "counter_div"
   });
   
   var show_similar_articul_clicks_button = $("<button />",{
      id: "show_similar_articul_clicks_button",
      class: "side_panel_button",
      text: "Показать все нажатия на изображение 'Вам также могут понравиться'"
   });
   
   show_similar_articul_clicks_button.click(function(){
      showUserMonitorTable("u_may_also_like");
   });
   
   var show_Main_tab_RL_clicks_button = $("<button />",{
      id: "show_Main_tab_RL_clicks_button",
      class: "side_panel_button",
      text: "Показать все нажатия впр/влв на Главной"
   });
   
   show_Main_tab_RL_clicks_button.click(function(){
      showUserMonitorTable("main_tab_r_l");
   });
   
   var show_Product_page_RL_clicks_button = $("<button />",{
      id: "show_Product_page_RL_clicks_button",
      class: "side_panel_button",
      text: "Показать нажатия впр/влв на Стр товара"
   });
   
   show_Product_page_RL_clicks_button.click(function(){
      showUserMonitorTable("product_page_r_l");
   });
   
   //UM_side_panel.append(user_counter_div);
   //UM_side_panel.append(unique_user_counter_div);
   //UM_side_panel.append(main_tab_user_counter_div);
   //UM_side_panel.append(main_tab_unique_user_counter_div);
   //UM_side_panel.append(user_counter_for_date_input);
   //UM_side_panel.append(user_counter_for_date_div);
   //UM_side_panel.append(unique_user_counter_for_date_div);
   //UM_side_panel.append(main_tab_user_counter_for_date_div);
   //UM_side_panel.append(main_tab_unique_user_counter_for_date_div);
   UM_side_panel.append(show_UM_table_button);
   //UM_side_panel.append(show_UM_orders_button);
   //UM_side_panel.append(show_UM_buys_button);
   //UM_side_panel.append(show_UM_banner_clicks_button);
   //UM_side_panel.append(show_UM_q_to_consultant_clicks_button);
   //UM_side_panel.append(show_similar_articul_clicks_button);
   //UM_side_panel.append(show_Main_tab_RL_clicks_button);
   //UM_side_panel.append(show_Product_page_RL_clicks_button);
   
   $('#user_counter_for_date_input').datepicker({
      dateFormat : '@',
      onClose: function(dateText, inst){
         $('#user_counter_for_date_div').html("Всего посещений за дату: "+countVisitorsForDate(dateText));
         $('#unique_user_counter_for_date_div').html("Всего уникальных юзеров за дату: "+countUniqueVisitorsForDate(dateText));
         $('#main_tab_unique_user_counter_for_date_div').html("Всего уникальных юзеров Главной вкладки за дату: "+countMainTabUniqueVisitorsForDate(dateText));
         $('#main_tab_user_counter_for_date_div').html("Всего посещений Главной вкладки за дату: "+countMainTabVisitorsForDate(dateText)); 
      }
   });
}

function showUserMonitorTable(for_what){   
   user_counter = 0;

   if ($('table').length == 0){
      var user_monitor_table = $("<table />", {
         id: "user_monitor_table",
         class: "admin_table"
      });
   

      $('#content_div').append(user_monitor_table);
      
      var tr1 = $("<tr />",{
         id: "tr1"
      });
      
      var td0 = $("<td />",{
         id: "key",
         text: "#",
         class: "table_header"
      });
      
      var td1 = $("<td />",{
         id: "vk_id",
         text: "Клиент",
         class: "table_header"
      });
      
      var td2 = $("<td />",{
         id: "hash",
         text: "Модель",
         class: "table_header"
      });
   
      var td3 = $("<td />",{
         id: "timestamp",
         text: "Время визита",
         class: "table_header"
      });
      
      var td4 = $("<td />",{
         id: "actions",
         text: "Действия",
         class: "table_header"
      });
      
      user_monitor_table.append(tr1);
      tr1.append(td0);
      tr1.append(td1);
      tr1.append(td2);
      tr1.append(td3);
      tr1.append(td4);
   }
   getUserMonitorData(for_what);
}

function getUserMonitorData(action_code){
   $.post(
      post_url,
      {
         a: "UM_gUMD",
         b: action_code,
         c: offset
      }, 
      function (result){
         console.log(result);
         user_monitor_data_object = eval("(" + result + ")");
         createUserMonitorTableRow();
         offset += 100;
      }
   );
}

function getUserMonitorOrders(){
   $.post(
      post_url,
      {
         a: "UM_gUMD",
         b: "order-button"
      }, 
      function (result){
         user_monitor_data_object = eval("(" + result + ")");
         createUserMonitorTableRow();
      }
   );
}

function getUserMonitorPurchases(){
   $.post(
      post_url, 
      {
         a: "UM_gUMD",
         b: "buy-button"
      }, 
      function (result){
         user_monitor_data_object = eval("(" + result + ")");
         createUserMonitorTableRow();
      }
   );
}

function createUserMonitorTableRow(){ // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
   var counter = user_monitor_data_object.length-1;

   for (var i = 0; i < user_monitor_data_object.length; i++){
      var tr = $("<tr />",{
         id: "user_monitor_table_row_"+i
      });
      
      $('#user_monitor_table').append(tr);
      
      var td0 = $("<td />",{
         id: "key_td_"+i,
         class: evenRowColor(counter),
         text: user_monitor_data_object[i].num
      });
      
      var td1 = $("<td />",{
         id: "vk_id_td_"+i,
         class: evenRowColor(counter)
      });
      
      td1.html("<a href='http://vkontakte.ru/id"+user_monitor_data_object[i].vk_id+"' target='_blank'>"+user_monitor_data_object[i].vk_name+"</a>");
      
      var td2 = $("<td />",{
         id: "hash_td_"+i,
         class: evenRowColor(counter)
      });
      
      td2.html(user_monitor_data_object[i].hash == -1 ? -1 : "<a target='_blank' href='http://vk.com/app2430292#"+user_monitor_data_object[i].hash+"'>"+user_monitor_data_object[i].model_title+"</a>");
      
      var td3 = $("<td />",{
         id: "timestamp_td_"+i,
         class: evenRowColor(counter),
         text: getDateFromTimestamp(user_monitor_data_object[i].timestamp)
      });
      
      var td4 = $("<td />",{
         id: "actions_td_"+i,
         class: evenRowColor(counter)
      });
      
      var more_button = $("<button />",{
         id: "more_button_"+i,
         text: "Подробности",
         onclick: "getMoreForUser("+user_monitor_data_object[i].vk_id+", 'more_button_"+i+"')"
      });
      
      td4.append(more_button);
      tr.append(td0);
      tr.append(td1);
      tr.append(td2);
      tr.append(td3);
      tr.append(td4);
      counter--;
   }
   
   changeOpacityOnLoad(0);
   $('#user_counter_div').html("Всего посещений: "+user_monitor_data_object.length);
   $('#unique_user_counter_div').html("Всего уникальных: "+countUniqueVisitors());
   $('#main_tab_user_counter_div').html("Всего посещений для Главной вкладки: "+countVisitorsForMainTab());
   $('#main_tab_unique_user_counter_div').html("Всего уникальных для Главной вкладки: "+countUniqueVisitorsForMainTab());
}

function getMoreForUser(vk_id, button_id)
{
   if ($('#user_details_table').length != 0)
      $('#user_details_table').remove();
   
   var user_details_object = {};

   $.post(
      post_url, 
      {
         a: "UM_gUMDFVI",
         b: vk_id
      }, 
      function (result){
         user_details_object = eval("(" + result + ")");
         var scroll_top = $('#'+button_id).offset().top;
         var left = $('#user_monitor_table').width()+500;
         $('#content_div').append("<table id='user_details_table'><tr id='user_details_table_head'><td>Что делал</td><td>Хэш</td><td>Когда</td></tr></table>");
         
         for (var i = 0; i < user_details_object.length; i++){
            var tr = $("<tr />",{
               id: "user_details_table_row_"+i
            });
            
            $('#user_details_table').append(tr);
            
            var td0 = $("<td />",{
               id: "action_td_"+i,
               text: user_details_object[i].action
            });
            
            var td1 = $("<td />",{
               id: "hash_td_"+i,
               text: user_details_object[i].hash
            });
            
            var td2 = $("<td />",{
               id: "timestamp_td_"+i,
               text: getDateFromTimestamp(user_details_object[i].timestamp)
            });
            
            tr.append(td0);
            tr.append(td1);
            tr.append(td2);
         }
         
         $('#user_details_table').offset({top:scroll_top, left: left});
      }
   );
}

function countUniqueVisitors(){ // считает уникальных посетителей в user monitor
   var unique_counter = 0;

   for (var i = 0; i < user_monitor_data_object.length; i++){
      var vk_id = user_monitor_data_object[i].vk_id;
      unique_counter++;

      for (var z = 0; z < i; z++)
         if (user_monitor_data_object[z].vk_id == vk_id){
            unique_counter--;
            z = i;
         }
   }
   
   return unique_counter;
}

function countVisitorsForMainTab(){
   var counter = 0;

   for (var i = 0; i < user_monitor_data_object.length; i++)
      if (user_monitor_data_object[i].hash == -1)      
         counter++;

   return counter;
}

function countUniqueVisitorsForMainTab(){
   var unique_counter = 0;

   for (var i = 0; i < user_monitor_data_object.length; i++)
      if (user_monitor_data_object[i].hash == -1){
         var vk_id = user_monitor_data_object[i].vk_id;
         unique_counter++;

         for (var z = 0; z < i; z++)
            if (user_monitor_data_object[z].vk_id == vk_id){
               unique_counter--;
               z = i;
            }
      }

   return unique_counter;
}

function countVisitorsForDate(timestamp){ // считает хиты для даты
   var counter = 0;

   for (var i = 0; i < user_monitor_data_object.length; i++){
      var date = new Date(user_monitor_data_object[i].timestamp*1000);
      var today = new Date(Number(timestamp));
      var date_string = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
      var today_string = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();

      if (date_string == today_string)
         counter++;
   }
   
   return counter;
}

function countUniqueVisitorsForDate(timestamp){ // считает хиты для даты
   var counter = 0;

   for (var i = 0; i < user_monitor_data_object.length; i++){
      var date = new Date(user_monitor_data_object[i].timestamp*1000);
      var today = new Date(Number(timestamp));
      var date_string = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
      var today_string = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();

      if (date_string == today_string){
         var vk_id = user_monitor_data_object[i].vk_id;
         counter++;

         for (var z = 0; z < i; z++)
            if (user_monitor_data_object[z].vk_id == vk_id){
               counter--;
               z = i;
            }
      }
   }
   
   return counter;
}

function countMainTabUniqueVisitorsForDate(timestamp){ // считает хиты для даты
   var counter = 0;

   for (var i = 0; i < user_monitor_data_object.length; i++){
      var date = new Date(user_monitor_data_object[i].timestamp*1000);
      var today = new Date(Number(timestamp));
      var date_string = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
      var today_string = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();

      if (date_string == today_string && user_monitor_data_object[i].hash == -1){
         var vk_id = user_monitor_data_object[i].vk_id;
         counter++;

         for (var z = 0; z < i; z++)
            if (user_monitor_data_object[z].vk_id == vk_id){
               counter--;
               z = i;
            }
      }
   }
   
   return counter;
}

function countMainTabVisitorsForDate(timestamp){
   var counter = 0;

   for (var i = 0; i < user_monitor_data_object.length; i++){
      var date = new Date(user_monitor_data_object[i].timestamp*1000);
      var today = new Date(Number(timestamp));
      var date_string = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
      var today_string = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();

      if (date_string == today_string)
         if (user_monitor_data_object[i].hash == -1)
            counter++;
   }
   
   return counter;
}