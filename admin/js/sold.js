var td_editable_value_reserved = "";
var sold_articules_data_object = {};

function buildSoldArticulesForm() // создаёт шапку таблицы редактирования артикулов
{
   
   var table = $("<table />", 
   {
      id: "sold_articules_table"
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
      id: "articul",
      text: "Артикул"
   });

   var td3 = $("<td />",
   {
      id: "supplier_price_rubs",
      text: "Цена поставщика (ЦП) (руб.)"
   });
   
   var td4 = $("<td />",
   {
      id: "price_plus_ads",
      text: "ЦП + реклама (ЦПР)"
   });
   
   var td5 = $("<td />",
   {
      id: "price_plus_delivery",
      text: "ЦПР + доставка (ЦПРД)"
   });
   
   var td6 = $("<td />",
   {
      id: "price_plus_risks",
      text: "ЦПРД + риски (ЦПРДР)"
   });
   
   var td7 = $("<td />",
   {
      id: "price_plus_profit",
      text: "ЦПРДР + прибыль (ЦПРДРП)"
   });
   
   var td8 = $("<td />",
   {
      id: "retail_price",
      text: "Розничная цена (ЦПРДРП + скидки)"
   });
   
   var td9 = $("<td />",
   {
      id: "sold_price",
      text: "Цена, за которую продали"
   });
   
   var td10 = $("<td />",
   {
      id: "profit",
      text: "Чистая прибыль"
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
   tr.append(td10);
   tr.children().css({"color": "#fff", "background": "#a64d79"});
   
   getSoldArticulesData(); 
}

function getSoldArticulesData() // получает данные обо всех артикулах в базе
{
   $.post
   (
      post_url, 
      {
         a: "gSoAD"
      }, 
      function (result)
      {
         sold_articules_data_object = eval("(" + result + ")");
         console.log(sold_articules_data_object);
         createSoldArticulesTableRow()
      }
   );
}

function createSoldArticulesTableRow() // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
{
   var tr = $("<tr />",
   {
      id: "row_new"
   });
      
   $('#sold_articules_table').append(tr);
   
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
      id: "articul_td_new",
      class: "td_editable td_editable_new 2",
      column: "2"
   });

   var td3 = $("<td />",
   {
      id: "supplier_price_rubs_td_new",
      class: "td_editable td_editable_new 3",
      column: "3"
   });
   
   var td4 = $("<td />",
   {
      id: "price_plus_ads_td_new",
      class: "td_editable td_editable_new 4",
      column: "4"
   });
   
   var td5 = $("<td />",
   {
      id: "price_plus_delivery_td_new",
      class: "td_editable td_editable_new 5",
      column: "5"
   });
   
   var td6 = $("<td />",
   {
      id: "price_plus_risks_td_new",
      class: "td_editable td_editable_new 6",
      column: "6"
   });
   
   var td7 = $("<td />",
   {
      id: "price_plus_profit_td_new",
      class: "td_editable td_editable_new 7",
      column: "7"
   });
   
   var td8 = $("<td />",
   {
      id: "retail_price_td_new",
      class: "td_editable td_editable_new",
      column: "8"
   });
   
   var td9 = $("<td />",
   {
      id: "sold_price_td_new",
      class: "td_editable td_editable_new",
      column: "9"
   });
   
   var td10 = $("<td />",
   {
      id: "profit_td_new",
      class: "td_editable td_editable_new 10",
      column: "10"
   });
   
   var add_new_sold_articul_button = $("<button />",
   {
      id: "add_new_sold_articul_button",
      text: "+"
   });

   add_new_sold_articul_button.click
   (
      function()
      {
         var new_sold_articul_object = {};
         
         $('.td_editable_new').each
         (
            function()
            {
               if ($(this).text() != "")
               {
                  var table_column_name = $(this).attr("id").substr(0, $(this).attr("id").length - 7);
                  new_sold_articul_object[table_column_name] = $(this).text();
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
            createNewSoldArticul(JSON.stringify(new_sold_articul_object));
            
         }
      }
   );
   
   tr.append(td0);
   td0.append(add_new_sold_articul_button);
   tr.append(td1);
   tr.append(td2);
   sold_doTableCellEditableNew(td2);
   tr.append(td3);
   sold_doTableCellEditableNew(td3);
   tr.append(td4);
   sold_doTableCellEditableNew(td4);
   tr.append(td5);
   sold_doTableCellEditableNew(td5);
   tr.append(td6);
   sold_doTableCellEditableNew(td6);
   tr.append(td7);
   sold_doTableCellEditableNew(td7);
   tr.append(td8);
   sold_doTableCellEditableNew(td8);
   tr.append(td9);
   sold_doTableCellEditableNew(td9);
   tr.append(td10);
   sold_doTableCellEditableNew(td10);
   
   for (var i = 0; i < sold_articules_data_object.length; i++)
   {
      var tr = $("<tr />",
      {
         id: "row_"+i
      });
      
      $('#sold_articules_table').append(tr);
      
      $('#edit_articules_table').append(tr);
      
      var td0 = $("<td />",
      {
         id: "del_td_"+i,
         class: "td_editable"
      });
      
      var td1 = $("<td />",
      {
         id: "num_td_"+i,
         class: "td_editable",
         text: sold_articules_data_object[i].num
      });
      
      var td2 = $("<td />",
      {
         id: "articul_td_"+i,
         class: "td_editable",
         text: sold_articules_data_object[i].articul
      });

      var td3 = $("<td />",
      {
         id: "supplier_price_rubs_td_"+i,
         class: "td_editable",
         text: sold_articules_data_object[i].supplier_price_rubs
      });
      
      var td4 = $("<td />",
      {
         id: "price_plus_ads_td_"+i,
         class: "td_editable",
         text: sold_articules_data_object[i].price_plus_ads
      });
      
      var td5 = $("<td />",
      {
         id: "price_plus_delivery_td_"+i,
         class: "td_editable",
         text: sold_articules_data_object[i].price_plus_delivery
      });
      
      var td6 = $("<td />",
      {
         id: "price_plus_risks_td_"+i,
         class: "td_editable",
         text: sold_articules_data_object[i].price_plus_risks
      });
      
      var td7 = $("<td />",
      {
         id: "price_plus_profit_td_"+i,
         class: "td_editable",
         text: sold_articules_data_object[i].price_plus_profit
      });
      
      var td8 = $("<td />",
      {
         id: "retail_price_td_"+i,
         class: "td_editable",
         text: sold_articules_data_object[i].retail_price
      });
      
      var td9 = $("<td />",
      {
         id: "sold_price_td_"+i,
         class: "td_editable",
         text: sold_articules_data_object[i].sold_price
      });
      
      var td10 = $("<td />",
      {
         id: "profit_td_"+i,
         class: "td_editable",
         text: sold_articules_data_object[i].profit
      });
      
      var del_sold_articul_button = $("<button />",
      {
         id: "del_sold_articul_button",
         text: "-"
      });

      del_sold_articul_button.click
      (
         function()
         {
            var a = $(this).parent().attr("id");
            var b = a.split("_");
            var num = b.pop();
            deleteSoldArticul(sold_articules_data_object[num].num); 
         }
      );
         
      tr.append(td0);
      td0.append(del_sold_articul_button);
      tr.append(td1);
      tr.append(td2);
      sold_doTableCellEditable(td2);
      tr.append(td3);
      sold_doTableCellEditable(td3);
      tr.append(td4);
      sold_doTableCellEditable(td4);
      tr.append(td5);
      sold_doTableCellEditable(td5);
      tr.append(td6);
      sold_doTableCellEditable(td6);
      tr.append(td7);
      sold_doTableCellEditable(td7);
      tr.append(td8);
      sold_doTableCellEditable(td8);
      tr.append(td9);
      sold_doTableCellEditable(td9);
      tr.append(td10);
      sold_doTableCellEditable(td10);
   }
}

function sold_doTableCellEditable(td) // делает ячейку таблицы редактируемой
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
            editSoldArticulParameter(sold_articules_data_object[num].num, table_column_name, input.val()); 
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
               sold_onTableCellKeyPress(event);
            }
         );
      }
   );
}

function sold_doTableCellEditableNew(td) // делает ячейку верхней строки таблицы редактируемой (верхняя строка - добавление нового артикула)
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
               sold_onTableCellKeyPressNew(event);
            }
         );
      }
   );
}

function editSoldArticulParameter(num, table_column_name, value) // отсылает в базу значение отредактированного параметра (яччейки) артикула
{
   $.post
   (
      post_url, 
      {
         a: "sSTID",
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

function sold_onTableCellKeyPress(event) // срабатывает при нажатии клавиш клавиатуры в редактируемой ячейке таблицы
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
      editSoldArticulParameter(sold_articules_data_object[num].num, table_column_name, input.val());
   }
   else if (key == 27)
   {
      var input = $('.td_editable_input');
      input.parent('td').html(td_editable_value_reserved);
   }
}

function createNewSoldArticul(articul_object_string) // отсылает в базу данные о с нуля забитом артикуле
{
   $.post
   (
      post_url, 
      {
         a: "cNSA",
         b: articul_object_string
      }, 
      function (result)
      {
         console.log(result);
         buildSoldArticulesForm();
      }
   );
}

function sold_onTableCellKeyPressNew(event) // срабатывает при нажатии клавиш клавиатуры в редактируемой ячейке верхней строки таблицы артикулов
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
            sold_onTableCellKeyPressNew(event);
         }
      );   
   }
}

function deleteSoldArticul(num)
{
   $.post
   (
      post_url, 
      {
         a: "dSA",
         b: num
      }, 
      function (result)
      {
         buildSoldArticulesForm();
      }
   );
}