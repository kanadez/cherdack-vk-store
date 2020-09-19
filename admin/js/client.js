var td_editable_value_reserved = "";
var clients_data_object = {};

function buildClientsForm() // создаёт шапку таблицы редактирования артикулов
{
   
   var table = $("<table />", 
   {
      id: "clients_table"
   });
   
   $('#content_div').html(table);
   
   var tr = $("<tr />",
   {
      id: "head_tr"
   });
   
   table.append(tr);
   
   var td0 = $("<td />",
   {
      id: "add_del",
      text: "Действия"
   });
   
   var td1 = $("<td />",
   {
      id: "num",
      text: "Ключ"
   });
   
   var td2 = $("<td />",
   {
      id: "vk_id",
      text: "ВКонтакте ID"
   });

   var td3 = $("<td />",
   {
      id: "articul",
      text: "Артикул"
   });
   
   var td4 = $("<td />",
   {
      id: "order_date_timestamp",
      text: "Дата заказа"
   });
   
   var td5 = $("<td />",
   {
      id: "purchase_date_timestamp",
      text: "Дата покупки"
   });
   
   var td6 = $("<td />",
   {
      id: "unique_num",
      text: "Уникальный номер"
   });
   
   tr.append(td0);
   tr.append(td1);
   tr.append(td2);
   tr.append(td3);
   tr.append(td4);
   tr.append(td5);
   tr.append(td6);
   tr.children().css({"color": "#fff", "background": "#a64d79"});
   
   getClientsData(); 
}

function getClientsData() // получает данные обо всех артикулах в базе
{
   $.post
   (
      post_url, 
      {
         a: "gClD"
      }, 
      function (result)
      {
         clients_data_object = eval("(" + result + ")");
         console.log(clients_data_object);
         createClientsTableRow()
      }
   );
}

function createClientsTableRow() // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
{
   var tr = $("<tr />",
   {
      id: "row_new"
   });
      
   $('#clients_table').append(tr);
   
   var td0 = $("<td />",
   {
      id: "add_new_td_new",
      class: "td_editable td_editable_new",
      column: "0"
   });
   
   var td1 = $("<td />",
   {
      id: "num_td_new",
      class: "td_editable td_editable_new 1",
      text: "=>",
      column: "1"
   });
   
   var td2 = $("<td />",
   {
      id: "vk_id_td_new",
      class: "td_editable td_editable_new 2",
      column: "2"
   });

   var td3 = $("<td />",
   {
      id: "articul_td_new",
      class: "td_editable td_editable_new 3",
      column: "3"
   });
   
   var td4 = $("<td />",
   {
      id: "order_date_timestamp_td_new",
      class: "td_editable td_editable_new 4",
      column: "4"
   });
   
   var td5 = $("<td />",
   {
      id: "purchase_date_timestamp_td_new",
      class: "td_editable td_editable_new 5",
      column: "5"
   });
   
   var td6 = $("<td />",
   {
      id: "unique_num_td_new",
      class: "td_editable td_editable_new 6",
      column: "6"
   });
   
   var add_new_client_button = $("<button />",
   {
      id: "add_new_client_button",
      text: "+"
   });

   add_new_client_button.click
   (
      function()
      {
         var new_client_object = {};
         
         $('.td_editable_new').each
         (
            function()
            {
               if ($(this).text() != "")
               {
                  var table_column_name = $(this).attr("id").substr(0, $(this).attr("id").length - 7);
                  new_client_object[table_column_name] = $(this).text();
               }
               else
               {
                  pushError("ячейка под id "+$(this).attr("id")+" не заполнена.");
               }
            }
         );
         
         if (errors_array.length != 0)
         {
            showErrorDialog();
         }
         else
         {
            createNewClient(JSON.stringify(new_client_object));
            
         }
      }
   );
   
   tr.append(td0);
   td0.append(add_new_client_button);
   tr.append(td1);
   tr.append(td2);
   client_doTableCellEditableNew(td2);
   tr.append(td3);
   client_doTableCellEditableNew(td3);
   tr.append(td4);
   client_doTableCellEditableNew(td4);
   tr.append(td5);
   client_doTableCellEditableNew(td5);
   tr.append(td6);
   client_doTableCellEditableNew(td6);
   
   for (var i = 0; i < clients_data_object.length; i++)
   {
      var tr = $("<tr />",
      {
         id: "row_"+i
      });
      
      $('#clients_table').append(tr);
      
      var td0 = $("<td />",
      {
         id: "del_td_"+i,
         class: "td_editable"
      });
      
      var td1 = $("<td />",
      {
         id: "num_td_"+i,
         class: "td_editable",
         text: clients_data_object[i].num
      });
      
      var td2 = $("<td />",
      {
         id: "vk_id_td_"+i,
         class: "td_editable",
         text: clients_data_object[i].vk_id
      });

      var td3 = $("<td />",
      {
         id: "articul_td_"+i,
         class: "td_editable",
         text: clients_data_object[i].articul
      });
      
      var td4 = $("<td />",
      {
         id: "order_date_timestamp_td_"+i,
         class: "td_editable",
         text: clients_data_object[i].order_date_timestamp
      });
      
      var td5 = $("<td />",
      {
         id: "purchase_date_timestamp_td_"+i,
         class: "td_editable",
         text: clients_data_object[i].purchase_date_timestamp
      });
      
      var td6 = $("<td />",
      {
         id: "unique_num_td_"+i,
         class: "td_editable",
         text: clients_data_object[i].unique_num
      });
      
      var del_client_button = $("<button />",
      {
         id: "del_client_button",
         text: "-"
      });

      del_client_button.click
      (
         function()
         {
            var a = $(this).parent().attr("id");
            var b = a.split("_");
            var num = b.pop();
            deleteClient(clients_data_object[num].num); 
         }
      );
         
      tr.append(td0);
      td0.append(del_client_button);
      tr.append(td1);
      tr.append(td2);
      client_doTableCellEditable(td2);
      tr.append(td3);
      client_doTableCellEditable(td3);
      tr.append(td4);
      client_doTableCellEditable(td4);
      tr.append(td5);
      client_doTableCellEditable(td5);
      tr.append(td6);
      client_doTableCellEditable(td6);
   }
}

function client_doTableCellEditable(td) // делает ячейку таблицы редактируемой
{
   td.bind
   (
      "click",
      function()
      {
         td_editable_value_reserved = $(this).text();
         
         if ($('.td_editable_input').length != 0)
         {
            var input = $('.td_editable_input');
            var value = input.val();
            var a = input.parent().attr("id");
            var b = a.split("_");
            var table_column_name = "";
            
            for (var i = 0; i < b.length - 2; i++)
            {
               if (i != 0)
               {
                  table_column_name += "_"+b[i];
               }
               else
               {
                  table_column_name += b[i];
               }
            }
            
            var num = b.pop();
            input.parent('td').html(value);
            editClientParameter(clients_data_object[num].num, table_column_name, input.val()); 
         }
         
         var value = $(this).text();         
         var input = $("<input />",
         {
            id: $(this).attr("id")+"_input",
            class: "td_editable_input",
            value: value
         });         
         input.width($(this).width());
         $(this).html(input);
         input.focus();
         input.select();
         input.keypress
         (
            function(event)
            {
               onTableCellKeyPress(event);
            }
         );
      }
   );
}

function client_doTableCellEditableNew(td) // делает ячейку верхней строки таблицы редактируемой (верхняя строка - добавление нового артикула)
{
   td.bind
   (
      "click",
      function()
      {
         if ($('.td_editable_input').length != 0)
         {
            var input = $('.td_editable_input');
            var value = input.val();
            input.parent('td').html(value);
            var table_column_name = input.attr("id").substr(0, input.attr("id").length - 9);
            //editArticulParameterNew(table_column_name, input.val()); 
         }
         
         var value = $(this).text();
         var input = $("<input />",
         {
            id: $(this).attr("id")+"_input",
            class: "td_editable_input",
            value: value
         });
         
         input.width($(this).width());
         $(this).html(input);
         input.focus();
         input.select();
         input.keypress
         (
            function(event)
            {
               onTableCellKeyPressNew(event);
            }
         );
      }
   );
}

function editClientParameter(num, table_column_name, value) // отсылает в базу значение отредактированного параметра (яччейки) артикула
{
   $.post
   (
      post_url, 
      {
         a: "sCTID",
         b: num,
         c: table_column_name,
         d: value
      }, 
      function (result)
      {
         console.log(result);
      
      }
   );
}

function onTableCellKeyPress(event) // срабатывает при нажатии клавиш клавиатуры в редактируемой ячейке таблицы
{
   var key = event.keyCode;
   
   if (key == 13) 
   {
      var input = $('.td_editable_input');
      var value = input.val();
      var a = input.parent().attr("id");
      var b = a.split("_");
      var table_column_name = "";
      
      for (var i = 0; i < b.length - 2; i++)
      {
         if (i != 0)
         {
            table_column_name += "_"+b[i];
         }
         else
         {
            table_column_name += b[i];
         }
      }
      
      var num = b.pop();
      input.parent('td').html(value);
      editClientParameter(clients_data_object[num].num, table_column_name, input.val());
   }
   else if (key == 27)
   {
      var input = $('.td_editable_input');
      input.parent('td').html(td_editable_value_reserved);
   }
}

function createNewClient(articul_object_string) // отсылает в базу данные о с нуля забитом артикуле
{
   $.post
   (
      post_url, 
      {
         a: "cNC",
         b: articul_object_string
      }, 
      function (result)
      {
         console.log(result);
         buildClientsForm();
      }
   );
}

function onTableCellKeyPressNew(event) // срабатывает при нажатии клавиш клавиатуры в редактируемой ячейке верхней строки таблицы артикулов
{
   var key = event.keyCode;
   
   if (key == 13) 
   {
      var input = $('.td_editable_input');
      var value = input.val();
      input.parent('td').html(value);
      var table_column_name = input.attr("id").substr(0, input.attr("id").length - 9);
      //editArticulParameterNew(table_column_name, input.val()); 
   }
   else if (key == 27)
   {
      var input = $('.td_editable_input');
      input.parent('td').html(td_editable_value_reserved);
   }
   else if (key == 9)
   {
      var input = $('.td_editable_input');
      var value = input.val();
      var num = input.parent('td').attr("column");
      var num_next = Number(num)+1;
      input.parent('td').html(value);
      
      var input = $("<input />",
      {
         id: $('.td_editable_new_'+num_next).attr("id")+"_input",
         class: "td_editable_input"
      });
      
      console.log(num_next);
      input.width($('td[column="'+num_next+'"]').width());
      $('td[column="'+num_next+'"]').html(input);
      input.focus();
      input.select();
      input.keypress
      (
         function(event)
         {
            onTableCellKeyPressNew(event);
         }
      );   
   }
}

function deleteClient(num)
{
   $.post
   (
      post_url, 
      {
         a: "dCl",
         b: num
      }, 
      function (result)
      {
         buildClientsForm();
      }
   );
}