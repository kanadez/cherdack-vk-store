var td_editable_value_reserved = "";
var touch_system_data_object = {};

function startTouchSystem() // создаёт шапку таблицы редактирования артикулов
{  
   var table = $("<table />", 
   {
      id: "edit_touch_system_table"
   });   
   $('#content_div').html(table);

   var tr0 = $("<tr />",
   {
      id: "tr0"
   });

   var td0 = $("<td />",
   {
      id: "key",
      text: "#",
      class: "table_header"
   });
   
   var td1 = $("<td />",
   {
      id: "direct_link",
      text: "Клиент",
      class: "table_header"
   });  

   var td2 = $("<td />",
   {
      id: "timestamp",
      text: "Время",
      class: "table_header"
   });
   
   var td3 = $("<td />",
   {
      id: "actions",
      text: "Действия",
      class: "table_header"
   });
   
   table.append(tr0);
   tr0.append(td0);
   tr0.append(td1);
   tr0.append(td2);
   tr0.append(td3);   
   getTouchSystemData(); 
}

function getTouchSystemData() // получает данные обо всех артикулах в базе
{
   $.post
   (
      post_url, 
      {
         a: "CTS_gCTSD"
      }, 
      function (result)
      {
         touch_system_data_object = eval("(" + result + ")");
         createEditTouchSystemTableRow();
      }
   );
}

function createEditTouchSystemTableRow() // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
{
   var counter = touch_system_data_object.length-1;
   
   for (var i = 0; i < touch_system_data_object.length; i++)
   {
      var tr = $("<tr />",
      {
         id: "row_"+i
      });
      
      $('#edit_touch_system_table').append(tr);
      
      var td0 = $("<td />",
      {
         id: "key_td_"+i,
         text: counter,
         class: evenRowColor(counter)
      });
      
      var td1 = $("<td />",
      {
         id: "direct_link_td_"+i,
         class: evenRowColor(counter)
      });
      
      td1.html("<a href='"+touch_system_data_object[i].direct_link+"' target='_blank'>"+touch_system_data_object[i].direct_link+"</a>");
      
      var td2 = $("<td />",
      {
         id: "timestamp_td_"+i,
         text: getDateFromTimestamp(touch_system_data_object[i].timestamp),
         class: evenRowColor(counter)
      });
      
      var td3 = $("<td />",
      {
         id: "del_td_"+i,
         class: evenRowColor(counter)
      });
      
      var del_customer_button = $("<button />",
      {
         id: "del_customer_button",
         text: "Удалить"
      });

      del_customer_button.click
      (
         function()
         {
            var a = $(this).parent().attr("id");
            var b = a.split("_");
            var num = b.pop();
            deleteCustomer(touch_system_data_object[num].num); 
         }
      );
      
      td3.html(del_customer_button);
      $('#row_'+i).append(td0);
      $('#row_'+i).append(td1);
      $('#row_'+i).append(td2);
      $('#row_'+i).append(td3);
      counter--;
   }
}

function deleteCustomer(num)
{
   $.post
   (
      post_url, 
      {
         a: "CTS_dCTSC",
         b: num
      }, 
      function (result)
      {
         console.log(result);
         startTouchSystem();
      }
   );
}

function cts_BuildAddCustomerForm()
{
   var link_input = $("<input />", 
   {
      id: "vk_user_link_input"
   });   
   
   var send_link_button = $("<button />", 
   {
      id: "send_link_button",
      text: "Добавить"
   }); 
   
   send_link_button.click
   (
      function()
      {
         $.post
         (
            post_url, 
            {
               a: "CTS_sNCDL",
               b: link_input.val()
            }, 
            function (result)
            {
               link_input.val("");
            }
         );
      }
   );
   
   $('#content_div').html(link_input);
   $('#content_div').append(send_link_button);
}
