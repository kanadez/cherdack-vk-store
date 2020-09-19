var colors_data_object = {};

function startColorsMonitor()
{
   var CM_side_panel = $("<div />",
   {
      id: "CM_side_panel",
      class: "side_panel"
   });
   
   CM_side_panel.css({"margin": "0", "position": "fixed"});
   
   $('#content_div').html(CM_side_panel);

   var user_counter_div = $("<div />",
   {
      id: "user_counter_div",
      class: "counter_div"
   });
   
   var unique_user_counter_div = $("<div />",
   {
      id: "unique_user_counter_div",
      class: "counter_div"
   });
   
   var show_CM_table_button = $("<button />",
   {
      id: "show_CM_table_button",
      class: "side_panel_button",
      text: "Показать таблицу Colors Monitor"
   });
   
   show_CM_table_button.click
   (
      function()
      {
         showColorsMonitorTable("all");
      }
   );
   
   var show_CM_table_unreplyed_button = $("<button />",
   {
      id: "show_CM_table_unreplyed_button",
      class: "side_panel_button",
      text: "Показать неотвеченные"
   });
   
   show_CM_table_unreplyed_button.click
   (
      function()
      {
         showColorsMonitorTable("unreplyed");
      }
   );
   
   var user_counter_for_date_input = $("<input />",
   {
      id: "user_counter_for_date_input"
   });
   
   user_counter_for_date_input.css({"width": "200px"});
   
   var user_counter_for_date_div = $("<div />",
   {
      id: "user_counter_for_date_div",
      class: "counter_div"
   });
   
   var unique_user_counter_for_date_div = $("<div />",
   {
      id: "unique_user_counter_for_date_div",
      class: "counter_div"
   });
   
   var main_tab_unique_user_counter_for_date_div = $("<div />",
   {
      id: "main_tab_unique_user_counter_for_date_div",
      class: "counter_div"
   });
   
   var main_tab_user_counter_for_date_div = $("<div />",
   {
      id: "main_tab_user_counter_for_date_div",
      class: "counter_div"
   });
   
   
   
   CM_side_panel.append(user_counter_div);
   CM_side_panel.append(unique_user_counter_div);
   CM_side_panel.append(user_counter_for_date_input);
   CM_side_panel.append(user_counter_for_date_div);
   CM_side_panel.append(unique_user_counter_for_date_div);
   CM_side_panel.append(show_CM_table_button);
   CM_side_panel.append(show_CM_table_unreplyed_button);
   
   $('#user_counter_for_date_input').datepicker({
      dateFormat : '@',
      onClose: function(dateText, inst)
      {
         $('#user_counter_for_date_div').html("Всего посещений за дату: "+countCMVisitorsForDate(dateText));
         $('#unique_user_counter_for_date_div').html("Всего уникальных юзеров за дату: "+countCMUniqueVisitorsForDate(dateText));
      }
   });
}


function showColorsMonitorTable(what_to_show) // создаёт шапку таблицы редактирования артикулов
{   
   user_counter = 0;

   if ($('table').length != 0)
      $('table').remove()

   var colors_table = $("<table />", 
   {
      id: "colors_table"
   });
   
   colors_table.css({"margin-left": "230px", "float": "left"});
   
   $('#content_div').append(colors_table);
   
   var tr1 = $("<tr />",
   {
      id: "tr1"
   });
   
   var td1 = $("<td />",
   {
      id: "vk_id",
      text: "Клиент",
      class: "table_header"
   });

   var td2 = $("<td />",
   {
      id: "articul",
      text: "Модель",
      class: "table_header"
   });
   
   var td3 = $("<td />",
   {
      id: "size",
      text: "Размер ноги",
      class: "table_header"
   });
   
   var td4 = $("<td />",
   {
      id: "time",
      text: "Время",
      class: "table_header"
   });
   
   var td5 = $("<td />",
   {
      id: "actions",
      text: "Действия",
      class: "table_header"
   });   
   
   tr1.append(td1);
   tr1.append(td2);
   tr1.append(td3);
   tr1.append(td4);
   tr1.append(td5);
   colors_table.append(tr1);   
   
   getColors(what_to_show);
}

function getColors(what_to_show) // получает данные обо всех артикулах в базе
{
   $.post
   (
      post_url, 
      {
         a: "gClrsD",
         b: what_to_show
      }, 
      function (result)
      {
         colors_data_object = eval("(" + result + ")");
         createColorsTableRow();
         console.log(colors_data_object);
      }
   );
}

function createColorsTableRow() // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
{
   for (var i = 0; i < colors_data_object.length; i++)
   {
      var tr = $("<tr />",
      {
         id: "colors_table_row_"+i
      });
      
      $('#colors_table').append(tr);
      
      var td1 = $("<td />",
      {
         id: "vk_id_td_"+i,
         class: "td_editable"
      });
      
      td1.html("<a target='_blank' href='http://vkontakte.ru/id"+colors_data_object[i].vk_id+"'>"+(colors_data_object[i].vk_name ? colors_data_object[i].vk_name : colors_data_object[i].vk_id)+"</a>");

      var td2 = $("<td />",
      {
         id: "articul_td_"+i,
         class: "td_editable"
      });
      
      td2.html("<a target='_blank' href='http://vkontakte.ru/app2430292#"+colors_data_object[i].articul+"'>"+(colors_data_object[i].articul_title ? colors_data_object[i].articul_title : colors_data_object[i].articul)+"</a>");
      
      var td3 = $("<td />",
      {
         id: "size_td_"+i,
         class: "td_editable",
         text: colors_data_object[i].size
      });
      
      var td4 = $("<td />",
      {
         id: "time_td_"+i,
         class: "td_editable",
         text: getDateFromTimestamp(colors_data_object[i].time)
      });
      
      
      var td5 = $("<td />",
      {
         id: "actions_td_"+i,
         class: "td_editable"
      });
      
      var accept_button = $("<button />",
      {
         id: "accept_colors_button_"+i,
         text: "Отвечено",
         onclick: "acceptColor("+colors_data_object[i].num+")"
      });
      
      td5.append(accept_button);
      tr.append(td1);
      tr.append(td2);
      tr.append(td3);
      tr.append(td4);
      tr.append(td5);
   }
   
   $('#user_counter_div').html("Всего посещений: "+colors_data_object.length);
   $('#unique_user_counter_div').html("Всего уникальных: "+countCMUniqueVisitors());
}

function acceptColor(nCM)
{
   $.post
   (
      post_url, 
      {
         a: "aClr",
         b: nCM
      }, 
      function (result)
      {
         showColorsMonitorTable("unreplyed")
      }
   );
}

function countCMUniqueVisitors() // считает уникальных посетителей в user monitor
{
   var unique_counter = 0;

   for (var i = 0; i < colors_data_object.length; i++)
   {
      var vk_id = colors_data_object[i].vk_id;
      unique_counter++;

      for (var z = 0; z < i; z++)
      {
         if (colors_data_object[z].vk_id == vk_id)
         {
            unique_counter--;
            z = i;
         }
      }
   }
   
   return unique_counter;
}

function countCMVisitorsForDate(time) // считает хиты для даты
{
   var counter = 0;

   for (var i = 0; i < colors_data_object.length; i++)
   {
      var date = new Date(colors_data_object[i].time*1000);
      var today = new Date(Number(time));
      var date_string = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
      var today_string = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();

      if (date_string == today_string)
      {
         counter++;
      }
   }
   
   return counter;
}

function countCMUniqueVisitorsForDate(time) // считает хиты для даты
{
   var counter = 0;

   for (var i = 0; i < colors_data_object.length; i++)
   {
      var date = new Date(colors_data_object[i].time*1000);
      var today = new Date(Number(time));
      var date_string = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
      var today_string = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();

      if (date_string == today_string)
      {
         var vk_id = colors_data_object[i].vk_id;
         counter++;

         for (var z = 0; z < i; z++)
         {
            if (colors_data_object[z].vk_id == vk_id)
            {
               counter--;
               z = i;
            }
         }  
      }
   }
   
   return counter;
}
