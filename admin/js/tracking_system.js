var ts_data_object = -1; // color system data object (item ids and sizes)
var tracking_system = -1; // Color System object
var item_ids = []; // item is array (parsed)
var sizes = []; // sizes of each item id (parsed)
var edit_dialog = -1; // dialog for sizes editing
var current_editing_articul = -1;

function TrackingSystem()
{
   this.today_timestamp = -1;
   
   this.side_panel = $("<div />",
   {
      id: "TS_side_panel",
      class: "side_panel"
   });
   
   this.add_button = $("<button />",
   {
      id: "TS_show_button",
      class: "side_panel_button",
      text: "Добавить товар"
   });
   
   this.getsum_button = $("<button />",
   {
      id: "TS_getsum_button",
      class: "side_panel_button",
      text: "Вывести общую сумму"
   });
   
   this.getData = function()
   {
      $.post
      (
         post_url, 
         {
            a: "TS_gTSD"
         }, 
         function (result)
         {
            ts_data_object = eval("(" + result + ")");
            //console.log(result);
            getTSdata_callback();
         }
      );
   }
   
   this.show = function()
   {
      if ($('table').length != 0)
         $('table').remove()
   
      var table = $("<table />", 
      {
         id: "TS_table",
         class: "admin_table"
      });
   
      $('#content_div').append(table);
      
      var tr1 = $("<tr />",
      {
         id: "tr1"
      });
      
      var td0 = $("<td />",
      {
         id: "key",
         text: "#",
         class: "table_header"
      });
      
      var td1 = $("<td />",
      {
         id: "supplier_articul",
         text: "Артикул поставщика",
         class: "table_header"
      });
      
      var td2 = $("<td />",
      {
         id: "articul",
         text: "Наш артикул",
         class: "table_header"
      });
      
      var td3 = $("<td />",
      {
         id: "supplier_price",
         text: "Цена поставщика",
         class: "table_header"
      });
      
      var td4 = $("<td />",
      {
         id: "purchase_date",
         text: "Дата покупки",
         class: "table_header"
      });
      
      var td5 = $("<td />",
      {
         id: "delivery_period",
         text: "Срок доставки",
         class: "table_header"
      });
   
      var td6 = $("<td />",
      {
         id: "actions",
         text: "Действия",
         class: "table_header"
      });
      
      table.append(tr1);
      tr1.append(td0);
      tr1.append(td1);
      tr1.append(td2);
      tr1.append(td3);
      tr1.append(td4);
      tr1.append(td5);
      tr1.append(td6);

      this.getData();
   }
   
   this.detectNotDeliveredItem = function(delivery_period)
   {
      if (delivery_period > 40 && delivery_period < 45)
      {
         return "ts_table_yellow_row"
      }
      else if (delivery_period > 45)
      {
         return "ts_table_red_row";   
      }
   }
   
   this.getDeliveryPeriod = function(timestamp)
   {   
      return Math.round((this.today_timestamp-timestamp)/86400);
   }
   
   this.getToday = function()
   {
      $.post
      (
         post_url, 
         {
            a: "TS_gT"
         }, 
         function (result)
         {
            tracking_system.today_timestamp = result;
            tracking_system.show();
         }
      );
   }

   this.setupDom = function()
   {
      this.side_panel.css({"margin": "0"});   
      $('#content_div').html(this.side_panel);
      this.side_panel.append(this.add_button);
      this.side_panel.append(this.getsum_button);
   }
   
   this.getToday();
   this.setupDom();
   
}

function getTSdata_callback() // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
{
   var counter = 0;
   
   for (var i = 0; i < ts_data_object.length; i++)
   {
      var tr = $("<tr />",
      {
         id: "CS_table_row_"+i
      });
      
      $('#TS_table').append(tr);
      
      var td0 = $("<td />",
      {
         id: "key_td_"+i,
         class: evenRowColor(counter),
         text: ts_data_object[i].num
      });
      
      var td1 = $("<td />",
      {
         id: "supplier_articul_td_"+i,
         class: evenRowColor(counter),
         text: ts_data_object[i].supplier_articul
      });
      
      var td2 = $("<td />",
      {
         id: "articul_td_"+i,
         class: evenRowColor(counter),
         text: ts_data_object[i].articul
      });
      
      var td3 = $("<td />",
      {
         id: "supplier_price_td_"+i,
         class: evenRowColor(counter),
         text: ts_data_object[i].supplier_price
      });
      var td4 = $("<td />",
      {
         id: "purchase_date_td_"+i,
         class: evenRowColor(counter),
         text:  getDateFromTimestamp(ts_data_object[i].purchase_date)
      });
      
      var td5 = $("<td />",
      {
         id: "delivery_period_td_"+i,
         class: evenRowColor(counter),
         text: tracking_system.getDeliveryPeriod(ts_data_object[i].purchase_date)
      });
           
      var td6 = $("<td />",
      {
         id: "actions_td_"+i,
         class: evenRowColor(counter)
      });
       
      var delivered_button = $("<button />",
      {
         id: "delivered_button_"+i,
         text: "Товар доставлен",
         onclick: "alert(123)"
      });
      
      var disputed_button = $("<button />",
      {
         id: "disputed_button_"+i,
         text: "Диспут открыт",
         onclick: "alert(123)"
      });
      
      td6.append(delivered_button);
      td6.append("<br>");
      td6.append(disputed_button);
      tr.append(td0);
      tr.append(td1);
      tr.append(td2);
      tr.append(td3);
      tr.append(td4);
      tr.append(td5);
      tr.append(td6);
      counter--;
   }
}

function buildTrackingSystem() // Color System init function
{
   tracking_system = new TrackingSystem();
}

