var td_editable_value_reserved = "";
var cart_purchases_data_object = {};
var cart_orders_data_object = {};

function buildCartNotifyCenterForm(){ // создаёт шапку таблицы редактирования артикулов
   var orders_table = $("<table />",{
      id: "cart_notify_center_orders_table"
   });
   
   orders_table.css("margin-top","10px");
   $('#content_div').html(orders_table);
   
   var tr1 = $("<tr />",{
      id: "tr1"
   });
   
   var td0 = $("<td />",{
      id: "num",
      text: "Ключ",
      class: "table_header"
   });
   
   var td1 = $("<td />",{
      id: "vk_id",
      text: "ВКонтакте ID",
      class: "table_header"
   });

   var td2 = $("<td />",{
      id: "articul",
      text: "Артикул",
      class: "table_header"
   });
   
   var td3 = $("<td />",{
      id: "shoe_size",
      text: "Размер",
      class: "table_header"
   });
   
   var td4 = $("<td />",{
      id: "timestamp",
      text: "Дата операции",
      class: "table_header"
   });
   
   var td5 = $("<td />",{
      id: "actions",
      text: "Действия",
      class: "table_header"
   });
   
   orders_table.append(tr1);
   tr1.append(td0);
   tr1.append(td1);
   tr1.append(td2);
   tr1.append(td3);
   tr1.append(td4);
   tr1.append(td5);
   
   getCartNotifyCenterDataOrders(); 
}

function getCartNotifyCenterDataOrders(){ // получает данные обо всех артикулах в базе
   $.post(
      post_url, {
         a: "gCNCOD"
      },
      function (result){
         cart_orders_data_object = eval("(" + result + ")");
         createCartNotifyCenterOrdersTableRow();
      }
   );
}

function createCartNotifyCenterOrdersTableRow(){ // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
   var counter = cart_orders_data_object.length-1;
   
   for (var i = 0; i < cart_orders_data_object.length; i++){
      var tr = $("<tr />",{
         id: "orders_table_row_"+i
      });
      
      $('#cart_notify_center_orders_table').append(tr);
      
      var td0 = $("<td />",{
         id: "num_td_"+i,
         class: evenRowColor(counter),
         text: cart_orders_data_object[i].num
      });
      
      var td1 = $("<td />",{
         id: "vk_id_td_"+i,
         class: evenRowColor(counter),
         text: cart_orders_data_object[i].vk_id
      });

      var td2 = $("<td />",{
         id: "articul_td_"+i,
         class: evenRowColor(counter),
         text: cart_orders_data_object[i].articul
      });
      
      var td3 = $("<td />",{
         id: "shoe_size_td_"+i,
         class: evenRowColor(counter),
         text: cart_orders_data_object[i].shoe_size
      });
      
      var td4 = $("<td />",{
         id: "timestamp_td_"+i,
         class: evenRowColor(counter),
         text: getDateFromTimestamp(cart_orders_data_object[i].timestamp)
      });
      
      var td5 = $("<td />", {
         id: "actions_td_"+i,
         class: evenRowColor(counter)
      });
      
      var accept_button = $("<button />",{
         id: "accept_order_button_"+i,
         text: "Принять",
         onclick: "acceptCartItem("+cart_orders_data_object[i].num+")"
      });
      
      var decline_button = $("<button />",{
         id: "decline_order_button_"+i,
         text: "Отменить",
         onclick: "declineCartItem("+cart_orders_data_object[i].num+")"
      });
      
      tr.append(td0);
      tr.append(td1);
      tr.append(td2);
      tr.append(td3);
      tr.append(td4);
      tr.append(td5);
      td5.append(accept_button);
      td5.append(decline_button);
      counter--;
   }
}

function acceptCartItem(num){
   $.post(
      post_url, {
         a: "aCI",
         b: num
      }, 
      function (result){
         buildCartNotifyCenterForm()
      }
   );
}

function declineCartItem(num){
   $.post(
      post_url, {
         a: "dCI",
         b: num
      }, 
      function (result){
         buildCartNotifyCenterForm()
      }
   );
}