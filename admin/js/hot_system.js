var last_executed_func = -1;
var hot_system_data_object = {};
var current_system_state = -1; // 1 - dubts, 2 - plannings

function startHotSystem()
{
   var HS_side_panel = $("<div />",
   {
      id: "HS_side_panel",
      class: "side_panel"
   });
   
   HS_side_panel.css({"margin": "0", "position": "fixed"});   
   $('#content_div').html(HS_side_panel);

   var show_HS_doubts_button = $("<button />",
   {
      id: "show_HS_doubts_button",
      class: "side_panel_button",
      text: "Хотят купить сейчас (сомневаются)"
   });
   
   show_HS_doubts_button.click
   (
      function()
      {
         showHotSystemDoubts();
      }
   );
   
   var show_HS_plannings_button = $("<button />",
   {
      id: "show_HS_plannings_button",
      class: "side_panel_button",
      text: "Хотят купить потом (запланировали)"
   });
   
   show_HS_plannings_button.click
   (
      function()
      {
         showHotSystemPlannings();
      }
   );
   
   HS_side_panel.append(show_HS_doubts_button);
   HS_side_panel.append(show_HS_plannings_button);
}

function showHotSystemDoubts()
{   
   last_executed_func = "showHotSystemDoubts()";
   current_system_state = 1;
   
   if ($('table').length != 0)
      $('table').remove()
            
   var hot_system_table = $("<table />", 
   {
      id: "hot_system_table",
      class: "admin_table"
   });
   
   hot_system_table.css({"width": "800px"});
   $('#content_div').append(hot_system_table);
   
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
      id: "direct_link",
      text: "Клиент",
      class: "table_header"
   });

   var td2 = $("<td />",
   {
      id: "doubt_reason",
      text: "Причины сомнений в покупке",
      class: "table_header"
   });
   
   var td3 = $("<td />",
   {
      id: "timestamp",
      text: "Время",
      class: "table_header"
   });
   
   var td4 = $("<td />",
   {
      id: "actions",
      text: "Действия",
      class: "table_header"
   });
   
   hot_system_table.append(tr1);
   tr1.append(td0);
   tr1.append(td1);
   tr1.append(td2);
   tr1.append(td3);  
   tr1.append(td4);  
   getHotSystemData("doubt_reason");
}

function showHotSystemPlannings()
{   
   last_executed_func = "showHotSystemPlannings()";
   current_system_state = 2;
   
   if ($('table').length != 0)
      $('table').remove()
            
   var hot_system_table = $("<table />", 
   {
      id: "hot_system_table",
      class: "admin_table"
   });
   
   hot_system_table.css({"width": "800px"});   
   $('#content_div').append(hot_system_table);
   
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
      id: "direct_link",
      text: "Клиент",
      class: "table_header"
   });
   
   var td2 = $("<td />",
   {
      id: "planning_purchase_date",
      text: "Планы покупки",
      class: "table_header"
   });
   
   var td3 = $("<td />",
   {
      id: "timestamp",
      text: "Время",
      class: "table_header"
   });
   
   var td4 = $("<td />",
   {
      id: "actions",
      text: "Действия",
      class: "table_header"
   });
      
   hot_system_table.append(tr1);
   tr1.append(td0);
   tr1.append(td1);
   tr1.append(td2);
   tr1.append(td3);
   tr1.append(td4);
   getHotSystemData("planning_purchase_date");
}

function getHotSystemData(exclude_expression) // получает данные обо всех артикулах в базе
{
   $.post
   (
      post_url, 
      {
         a: "HS_gHSD",
         b: exclude_expression
      }, 
      function (result)
      {
         hot_system_data_object = eval("(" + result + ")");
         createHotSystemTableRow();
      }
   );
}


function createHotSystemTableRow() // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
{
   var counter = hot_system_data_object.length-1;

   for (var i = 0; i < hot_system_data_object.length; i++)
   {
      var tr = $("<tr />",
      {
         id: "hot_system_table_row_"+i
      });
      
      $('#hot_system_table').append(tr);
      
      var td0 = $("<td />",
      {
         id: "key_td_"+i,
         class: evenRowColor(counter),
         text: counter
      });
      
      var td1 = $("<td />",
      {
         id: "direct_link_td_"+i,
         class: evenRowColor(counter)
      });
      
      td1.html("<a href='"+hot_system_data_object[i].direct_link+"' target='_blank'>"+hot_system_data_object[i].vk_name+"</a>");
      
      
      if (current_system_state == 1)
      {
         var td2 = $("<td />",
         {
            id: "doubt_reason_td_"+i,
            class: "td_editable "+evenRowColor(counter),
            text: hot_system_data_object[i].doubt_reason,
         });
      }
      else if (current_system_state == 2)
      {
         var td2 = $("<td />",
         {
            id: "planning_purchase_date_td_"+i,
            class: "td_editable "+evenRowColor(counter),
            text: hot_system_data_object[i].planning_purchase_date
         });
      }
      
      var td3 = $("<td />",
      {
         id: "timestamp_td_"+i,
         text: getDateFromTimestamp(hot_system_data_object[i].timestamp),
         class: evenRowColor(counter)
      });
      
      var td4 = $("<td />",
      {
         id: "actions_td_"+i,
         class: evenRowColor(counter)
      });
      
      var delete_button = $("<button />",
      {
         id: "delete_button_"+i,
         text: "Удалить",
         onclick: "deleteHotUser("+hot_system_data_object[i].num+")"
      });
      
      td4.append(delete_button);
      tr.append(td0);
      tr.append(td1);
      tr.append(td2);      
      hot_system_doTableCellEditable(td2);
      tr.append(td3);
      tr.append(td4);
      counter--;
   }
}

function deleteHotUser(num)
{
   $.post
   (
      post_url, 
      {
         a: "HS_dHU",
         b: num
      }, 
      function (result)
      {
         eval(last_executed_func);
      }
   );  
}

function hot_system_doTableCellEditable(td) // делает ячейку таблицы редактируемой
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
            editHotUserParameter(hot_system_data_object[num].num, table_column_name, input.val()); 
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
               hot_system_onTableCellKeyPress(event);
            }
         );
      }
   );
}

function editHotUserParameter(num, table_column_name, value) // отсылает в базу значение отредактированного параметра (яччейки) артикула
{
   console.log("num "+num+" table_column_name "+table_column_name+" value "+value);

   $.post
   (
      post_url, 
      {
         a: "HS_eHU",
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

function hot_system_onTableCellKeyPress(event) // срабатывает при нажатии клавиш клавиатуры в редактируемой ячейке таблицы
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
      editHotUserParameter(hot_system_data_object[num].num, table_column_name, input.val());
   }
   else if (key == 27)
   {
      var input = $('.td_editable_input');
      input.parent('td').html(td_editable_value_reserved);
   }
}

function createNewCustomer(customer_object_string) // отсылает в базу данные о с нуля забитом артикуле
{
   $.post
   (
      post_url, 
      {
         a: "CTS_cNC",
         b: customer_object_string
      }, 
      function (result)
      {
         console.log(result);
         starthotSystem();
      }
   );
}

function hot_system_onTableCellKeyPressNew(event) // срабатывает при нажатии клавиш клавиатуры в редактируемой ячейке верхней строки таблицы артикулов
{
   var key = event.keyCode;
   
   if (key == 13) 
   {
      var input = $('.td_editable_input');
      var value = input.val();
      input.parent('td').html(value);
      var table_column_name = input.attr("id").substr(0, input.attr("id").length - 9);
      //editHotUserParameterNew(table_column_name, input.val()); 
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
      var num = input.parent('td').attr("class").substr(input.parent('td').attr("class").length - 1, 1);
      var num_next = Number(num)+1;
      input.parent('td').html(value);
      
      var input = $("<input />",
      {
         id: $('.td_editable_new_'+num_next).attr("id")+"_input",
         class: "td_editable_input"
      });
      
      console.log('.td_editable_new_'+num_next);
      input.width($('.td_editable_new_'+num_next).width());
      $('.td_editable_new_'+num_next).html(input);
      input.focus();
      input.select();
      input.keypress
      (
         function(event)
         {
            hot_system_onTableCellKeyPressNew(event);
         }
      );   
   }
}
