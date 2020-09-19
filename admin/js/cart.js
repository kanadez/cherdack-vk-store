var admin_order_status_text = [];
admin_order_status_text[0] = "Не подтверждён, не оформлен";
admin_order_status_text[1] = "Подтверждён";
admin_order_status_text[2] = "Доставлен";
admin_order_status_text[3] = "Не подтверждён, оформлен";

var td_editable_value_reserved = "";
var cart_purchases_data_object = {};
var cart_orders_data_object = {};

function buildCartForm(){ // создаёт шапку таблицы редактирования артикулов
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
      id: "phone_num",
      text: "Номер телефона",
      class: "table_header"
   });
   
   var td5 = $("<td />",{
      id: "timestamp",
      text: "Дата операции",
      class: "table_header"
   });
   
   var td6 = $("<td />",{
      id: "accepted",
      text: "Принят на обработку",
      class: "table_header"
   });
   
   var td7 = $("<td />",{
      id: "cancelled",
      text: "Отменён пользователем",
      class: "table_header"
   });
   
   var td8 = $("<td />",{
      id: "status",
      text: "Статус",
      class: "table_header"
   });
   
   var td9 = $("<td />",{
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
   tr1.append(td6);
   tr1.append(td7);
   tr1.append(td8);
   tr1.append(td9);
   
   getCartDataOrders(); 
}

function getCartDataOrders(){ // получает данные обо всех артикулах в базе
   $.post(
      post_url,{
         a: "gCNCOD2"
      }, 
      function (result){
         cart_orders_data_object = eval("(" + result + ")");
         createCartOrdersTableRow();
      }
   );
}

function createCartOrdersTableRow(){ // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
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
         class: evenRowColor(counter)
      });
      
      td1.html("<a target='_blank' href='http://vkontakte.ru/id"+cart_orders_data_object[i].vk_id+"'>"+cart_orders_data_object[i].vk_id+"</a>");

      var td2 = $("<td />",{
         id: "articul_td_"+i,
         class: evenRowColor(counter)
      });
      
      td2.html("<a target='_blank' href='http://vkontakte.ru/app2430292#"+cart_orders_data_object[i].articul+"'>"+cart_orders_data_object[i].articul+"</a>");
      
      var td3 = $("<td />",{
         id: "shoe_size_td_"+i,
         class: evenRowColor(counter),
         text: cart_orders_data_object[i].shoe_size
      });
      
      var td4 = $("<td />",{
         id: "phone_num_td_"+i,
         class: evenRowColor(counter),
         text: cart_orders_data_object[i].phone_num
      });
      
      var td5 = $("<td />",{
         id: "timestamp_td_"+i,
         class: evenRowColor(counter),
         text: getDateFromTimestamp(cart_orders_data_object[i].timestamp)
      });
      
      var td6 = $("<td />",{
         id: "accepted_td_"+i,
         class: evenRowColor(counter),
         text: cart_orders_data_object[i].accepted
      });
      
      var td7 = $("<td />",{
         id: "cancelled_td_"+i,
         class: evenRowColor(counter),
         text: cart_orders_data_object[i].cancelled
      });
      
      var td8 = $("<td />",{
         id: "status_td_"+i,
         class: evenRowColor(counter),
         text: admin_order_status_text[cart_orders_data_object[i].status]
      });
      
      var td9 = $("<td />",{
         id: "actions_td_"+i,
         class: evenRowColor(counter)
      });
      
      var delete_button = $("<button />",{
         id: "delete_order_button_"+i,
         text: "X",
         onclick: "deleteCartItem("+cart_orders_data_object[i].num+")"
      });
      
      tr.append(td0);
      tr.append(td1);
      tr.append(td2);
      tr.append(td3);
      tr.append(td4);
      tr.append(td5);
      tr.append(td6);
      tr.append(td7);
      tr.append(td8);
      tr.append(td9);
      td9.append(delete_button);
      counter--;
   }  
}

function deleteCartItem(num){
   $.post(
      post_url,{
         a: "dCrI",
         b: num
      }, 
      function (result){
         buildCartForm();
      }
   );
}