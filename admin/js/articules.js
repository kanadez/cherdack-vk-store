var td_editable_value_reserved = "";
var articules_data_object = {};

function buildEditArticulesForm(){ // создаёт шапку таблицы редактирования артикулов   
   var table = $("<table />",{
      id: "edit_articules_table"
   });
   
   $('#content_div').html(table);

   var tr0 = $("<tr />",{
      id: "tr0"
   });
   
   var td0 = $("<td />",{
      id: "articul",
      text: "Артикул",
      class: "table_header"
   });
   
   var td1 = $("<td />",{
      id: "supplier_price_bucks",
      text: "Цена поставщика (дол.)",
      class: "table_header"
   });
   
   var td2 = $("<td />",{
      id: "supplier_price_rubs",
      text: "Цена поставщика (руб.)",
      class: "table_header"
   });
   
   var td3 = $("<td />",{
      id: "our_price_rubs",
      text: "Цена розничная (руб.)",
      class: "table_header"
   });
   
   var td4 = $("<td />",{
      id: "retail_price",
      text: "Цена розничная, округленная (руб.)",
      class: "table_header"
   });
   
   var td5 = $("<td />",{
      id: "in_stock",
      text: "В наличии",
      class: "table_header"
   });
   
   var td6 = $("<td />",{
      id: "add_del",
      text: "Действия",
      class: "table_header"
   });
   
   table.append(tr0);
   tr0.append(td0).append(td1).append(td2).append(td3).append(td4).append(td5).append(td6); 
   getArticulesData(); 
}

function getArticulesData(){ // получает данные обо всех артикулах в базе
   $.post(
      post_url, {
         a: "gAD"
      }, 
      function (result){
         articules_data_object = eval("(" + result + ")");
         createEditArticulesTableRow()
      }
   );
}

function createEditArticulesTableRow(){ // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
   counter = articules_data_object.length-1;
   
   for (var i = 0; i < articules_data_object.length; i++){
      var tr = $("<tr />",{
         id: "row_"+i
      });
      
      $('#edit_articules_table').append(tr);
      
      var td0 = $("<td />",{
         id: "articul_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: articules_data_object[i].articul
      });
      
      var td1 = $("<td />",{
         id: "supplier_price_bucks_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: articules_data_object[i].supplier_price_bucks
      });
      
      var td2 = $("<td />",{
         id: "supplier_price_rubs_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: articules_data_object[i].supplier_price_rubs
      });
      
      var td3 = $("<td />",{
         id: "our_price_rubs_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: articules_data_object[i].our_price_rubs
      });
      
      var td4 = $("<td />",{
         id: "retail_price_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: articules_data_object[i].retail_price
      });
      
      var td5 = $("<td />",{
         id: "in_stock_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: articules_data_object[i].in_stock
      });
      
      var td6 = $("<td />",{
         id: "del_td_"+i,
         class: "td_editable "+evenRowColor(counter)
      });
       
      var del_articul_button = $("<button />",
      {
         id: "add_new_articul_button",
         text: "X"
      });

      del_articul_button.click(
         function(){
            var a = $(this).parent().attr("id");
            var b = a.split("_");
            var num = b.pop();
            deleteArticul(articules_data_object[num].articul, articules_data_object[num].size); 
         }
      );
      
      $('#row_'+i).append(td0).append(td1).append(td2).append(td3).append(td4).append(td5).append(td6);
      td6.append(del_articul_button);
      articules_doTableCellEditable(td1);
      articules_doTableCellEditable(td2);
      articules_doTableCellEditable(td3);
      articules_doTableCellEditable(td4);
      articules_doTableCellEditable(td5);
      counter--;
   }
}

function articules_doTableCellEditable(td) // делает ячейку таблицы редактируемой
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
            editArticulParameter(articules_data_object[num].articul, articules_data_object[num].size, table_column_name, input.val()); 
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
               articules_onTableCellKeyPress(event);
            }
         );
      }
   );
}

function articules_doTableCellEditableNew(td) // делает ячейку верхней строки таблицы редактируемой (верхняя строка - добавление нового артикула)
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
               articules_onTableCellKeyPressNew(event);
            }
         );
      }
   );
}

function editArticulParameter(articul, size, table_column_name, value) // отсылает в базу значение отредактированного параметра (яччейки) артикула
{
   console.log("articul "+articul+" table_column_name "+table_column_name+" value "+value);

   $.post
   (
      post_url, 
      {
         a: "sTID",
         b: articul,
         c: size,
         d: table_column_name,
         e: value
      }, 
      function (result)
      {
         console.log(result);
      
      }
   );
}

function articules_onTableCellKeyPress(event) // срабатывает при нажатии клавиш клавиатуры в редактируемой ячейке таблицы
{
   console.log(333);
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
      editArticulParameter(articules_data_object[num].articul, articules_data_object[num].size, table_column_name, input.val());
   }
   else if (key == 27)
   {
      var input = $('.td_editable_input');
      input.parent('td').html(td_editable_value_reserved);
   }
}

function createNewArticul(articul_object_string) // отсылает в базу данные о с нуля забитом артикуле
{
   $.post
   (
      post_url, 
      {
         a: "cNA",
         b: articul_object_string
      }, 
      function (result)
      {
         console.log(result);
         buildEditArticulesForm();
      }
   );
}

function articules_onTableCellKeyPressNew(event) // срабатывает при нажатии клавиш клавиатуры в редактируемой ячейке верхней строки таблицы артикулов
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
            articules_onTableCellKeyPressNew(event);
         }
      );   
   }
}

function deleteArticul(articul, size)
{
   $.post
   (
      post_url, 
      {
         a: "dA",
         b: articul,
         c: size
      }, 
      function (result)
      {
         console.log(result);
         buildEditArticulesForm();
      }
   );
}