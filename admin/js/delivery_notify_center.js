var td_editable_value_reserved = "";
var delivery_purchases_data_object = {};
var delivery_orders_data_object = {};

function buildDeliveryNotifyCenterForm() // создаёт шапку таблицы редактирования артикулов
{   
   var purchases_table = $("<table />", 
   {
      id: "delivery_notify_center_purchases_table"
   });
   
   $('#content_div').html(purchases_table);
   
   var tr0 = $("<tr />",
   {
      id: "tr0"
   });
   
   tr0.append($("<td />",
   {
      id: "td_division_title_1_td",
      colspan: "12",
      text: "Куплено:"
   }));
   
   var tr1 = $("<tr />",
   {
      id: "tr1"
   });
   
   var td0 = $("<td />",
   {
      id: "num",
      text: "Ключ"
   });
   
   var td1 = $("<td />",
   {
      id: "vk_id",
      text: "ВКонтакте ID"
   });

   var td2 = $("<td />",
   {
      id: "articul",
      text: "Артикул"
   });
   
   var td3 = $("<td />",
   {
      id: "shoe_size",
      text: "Размер"
   });
   
   var td4 = $("<td />",
   {
      id: "phone_num",
      text: "Номер телефона"
   });
   
   var td5 = $("<td />",
   {
      id: "deliver_timestamp",
      text: "Дата доставки"
   });
   
   var td6 = $("<td />",
   {
      id: "deliver_address",
      text: "Адрес доставки"
   });
   
   var td7 = $("<td />",
   {
      id: "need_change",
      text: "Сдача"
   });
   
   var td8 = $("<td />",
   {
      id: "advanced_info",
      text: "Доп. инфо"
   });
   
   var td9 = $("<td />",
   {
      id: "timestamp",
      text: "Дата операции"
   });
   
   var td10 = $("<td />",
   {
      id: "expired_deliver_price",
      text: "Цена со скидкой за просёр доставки"
   });
   
   var td11 = $("<td />",
   {
      id: "actions",
      text: "Действия"
   });
   
   purchases_table.append(tr0);
   purchases_table.append(tr1);
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
   tr1.append(td10);
   tr1.append(td11);
   tr1.children().css({"color": "#fff", "background": "#a64d79"});
   
   getDeliveryDataPurchases();
   
   //########таблица заказов
   
   var orders_table = $("<table />", 
   {
      id: "delivery_notify_center_orders_table"
   });
   
   orders_table.css("margin-top","10px");
   
   $('#content_div').append(orders_table);
   
   var tr0 = $("<tr />",
   {
      id: "tr0"
   });
   
   tr0.append($("<td />",
   {
      id: "td_division_title_1_td",
      colspan: "7",
      text: "Заказано:"
   }));
   
   var tr1 = $("<tr />",
   {
      id: "tr1"
   });
   
   var td0 = $("<td />",
   {
      id: "num",
      text: "Ключ"
   });
   
   var td1 = $("<td />",
   {
      id: "vk_id",
      text: "ВКонтакте ID"
   });

   var td2 = $("<td />",
   {
      id: "articul",
      text: "Артикул"
   });
   
   var td3 = $("<td />",
   {
      id: "shoe_size",
      text: "Размер"
   });
   
   var td4 = $("<td />",
   {
      id: "phone_num",
      text: "Номер телефона"
   });
   
   var td5 = $("<td />",
   {
      id: "timestamp",
      text: "Дата операции"
   });

   var td6 = $("<td />",
   {
      id: "actions",
      text: "Действия"
   });
   
   orders_table.append(tr0);
   orders_table.append(tr1);
   tr1.append(td0);
   tr1.append(td1);
   tr1.append(td2);
   tr1.append(td3);
   tr1.append(td4);
   tr1.append(td5);
   tr1.append(td6);
   tr1.children().css({"color": "#fff", "background": "#a64d79"});
   
   getDeliveryDataOrders(); 
}

function getDeliveryDataPurchases() // получает данные обо всех артикулах в базе
{
   $.post
   (
      post_url, 
      {
         a: "gDNCPD"
      }, 
      function (result)
      {
         delivery_purchases_data_object = eval("(" + result + ")");
         createDeliveryNotifyCenterPurchasesTableRow();
         console.log(delivery_purchases_data_object);
      }
   );
}

function getDeliveryDataOrders() // получает данные обо всех артикулах в базе
{
   $.post
   (
      post_url, 
      {
         a: "gDNCOD"
      }, 
      function (result)
      {
         delivery_orders_data_object = eval("(" + result + ")");
         createDeliveryNotifyCenterOrdersTableRow();
         console.log(delivery_orders_data_object);
      }
   );
}

function createDeliveryNotifyCenterPurchasesTableRow() // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
{
   for (var i = 0; i < delivery_purchases_data_object.length; i++)
   {
      var tr = $("<tr />",
      {
         id: "purchases_table_row_"+i
      });
      
      $('#delivery_notify_center_purchases_table').append(tr);
      
      var td0 = $("<td />",
      {
         id: "num_td_"+i,
         class: "td_editable",
         text: delivery_purchases_data_object[i].num
      });
      
      var td1 = $("<td />",
      {
         id: "vk_id_td_"+i,
         class: "td_editable",
         text: delivery_purchases_data_object[i].vk_id
      });

      var td2 = $("<td />",
      {
         id: "articul_td_"+i,
         class: "td_editable",
         text: delivery_purchases_data_object[i].articul
      });
      
      var td3 = $("<td />",
      {
         id: "shoe_size_td_"+i,
         class: "td_editable",
         text: delivery_purchases_data_object[i].shoe_size
      });
      
      var td4 = $("<td />",
      {
         id: "phone_num_td_"+i,
         class: "td_editable",
         text: delivery_purchases_data_object[i].phone_num
      });
      
      var td5 = $("<td />",
      {
         id: "deliver_timestamp_td_"+i,
         class: "td_editable",
         text: getDateFromTimestamp(delivery_purchases_data_object[i].deliver_timestamp)
      });
      
      var td6 = $("<td />",
      {
         id: "deliver_address_td_"+i,
         class: "td_editable",
         text: delivery_purchases_data_object[i].deliver_address
      });
      
      var td7 = $("<td />",
      {
         id: "need_change_td_"+i,
         class: "td_editable",
         text: delivery_purchases_data_object[i].need_change
      });
      
      var td8 = $("<td />",
      {
         id: "advanced_info_td_"+i,
         class: "td_editable",
         text: delivery_purchases_data_object[i].advanced_info
      });
      
      var td9 = $("<td />",
      {
         id: "timestamp_td_"+i,
         class: "td_editable",
         text: getDateFromTimestamp(delivery_purchases_data_object[i].timestamp)
      });
      
      var td10 = $("<td />",
      {
         id: "expired_deliver_price_td_"+i,
         class: "td_editable",
         text: delivery_purchases_data_object[i].expired_deliver_price
      });
      
      var td11 = $("<td />",
      {
         id: "actions_td_"+i,
         class: "td_editable"
      });
      
      var accept_button = $("<button />",
      {
         id: "accept_purchase_button_"+i,
         text: "Продано",
         onclick: "setDeliveryItemSolded("+delivery_purchases_data_object[i].num+", "+delivery_purchases_data_object[i].articul+", "+delivery_purchases_data_object[i].shoe_size+")"
      });
      
      var decline_button = $("<button />",
      {
         id: "decline_purchase_button_"+i,
         text: "НЕ продано",
         onclick: "setDeliveryItemUnsolded("+delivery_purchases_data_object[i].num+")"
      });
      
      td11.append(accept_button);
      td11.append(decline_button);
         
      tr.append(td0);
      tr.append(td1);
      //doTableCellEditable(td1);
      tr.append(td2);
      //doTableCellEditable(td2);
      tr.append(td3);
      //doTableCellEditable(td3);
      tr.append(td4);
      //doTableCellEditable(td4);
      tr.append(td5);
      //doTableCellEditable(td5);
      tr.append(td6);
      //doTableCellEditable(td6);
      tr.append(td7);
      //doTableCellEditable(td7);
      tr.append(td8);
      tr.append(td9);
      tr.append(td10);
      tr.append(td11);
      //doTableCellEditable(td8);
      
      $('#delivery_notify_center_orders_table').width($('#delivery_notify_center_purchases_table').width())
   }
}

function createDeliveryNotifyCenterOrdersTableRow() // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
{
   for (var i = 0; i < delivery_orders_data_object.length; i++)
   {
      var tr = $("<tr />",
      {
         id: "orders_table_row_"+i
      });
      
      $('#delivery_notify_center_orders_table').append(tr);
      
      var td0 = $("<td />",
      {
         id: "num_td_"+i,
         class: "td_editable",
         text: delivery_orders_data_object[i].num
      });
      
      var td1 = $("<td />",
      {
         id: "vk_id_td_"+i,
         class: "td_editable",
         text: delivery_orders_data_object[i].vk_id
      });

      var td2 = $("<td />",
      {
         id: "articul_td_"+i,
         class: "td_editable",
         text: delivery_orders_data_object[i].articul
      });
      
      var td3 = $("<td />",
      {
         id: "shoe_size_td_"+i,
         class: "td_editable",
         text: delivery_orders_data_object[i].shoe_size
      });
      
      var td4 = $("<td />",
      {
         id: "phone_num_td_"+i,
         class: "td_editable",
         text: delivery_orders_data_object[i].phone_num
      });
      
      var td5 = $("<td />",
      {
         id: "timestamp_td_"+i,
         class: "td_editable",
         text: getDateFromTimestamp(delivery_orders_data_object[i].timestamp)
      });
      
      var td6 = $("<td />", 
      {
         id: "actions_td_"+i,
         class: "td_editable"
      });
      
      var came_button = $("<button />",
      {
         id: "came_order_button_"+i,
         text: "Пришли",
         onclick: "setOrderCame("+delivery_orders_data_object[i].num+", "+delivery_orders_data_object[i].articul+", "+delivery_orders_data_object[i].shoe_size+")"
      });
      
      td6.append(came_button);
      tr.append(td0);
      tr.append(td1);
      //doTableCellEditable(td1);
      tr.append(td2);
      //doTableCellEditable(td2);
      tr.append(td3);
      //doTableCellEditable(td3);
      tr.append(td4);
      tr.append(td5);
      tr.append(td6);
      //doTableCellEditable(td4);
      
   }  
}

function setDeliveryItemSolded(num, articul, size)
{
   $.post
   (
      post_url, 
      {
         a: "sDIS",
         b: num,
         c: articul,
         d: size
      }, 
      function (result)
      {
         buildDeliveryNotifyCenterForm()
      }
   );
}

function setDeliveryItemUnsolded(num)
{
   $.post
   (
      post_url, 
      {
         a: "sDIU",
         b: num
      }, 
      function (result)
      {
         buildDeliveryNotifyCenterForm()
      }
   );
}

function setOrderCame(num, articul, size)
{
   $.post
   (
      post_url, 
      {
         a: "sOC",
         b: num,
         c: articul,
         d: size
      }, 
      function (result)
      {
         buildDeliveryNotifyCenterForm()
      }
   );
}