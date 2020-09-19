var td_editable_value_reserved = "";
var catalog_data_object = {};

function buildEditCatalogForm() // создаёт шапку таблицы редактирования артикулов
{
   var table = $("<table />",{
      id: "edit_catalog_table"
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
      id: "title",
      text: "Наименование",
      class: "table_header"
   });
   
   var td2 = $("<td />",{
      id: "size",
      text: "Размер",
      class: "table_header"
   });
   
   var td3 = $("<td />",{
      id: "type",
      text: "Тип",
      class: "table_header"
   });
   
   var td4 = $("<td />",{
      id: "subtype",
      text: "Подтип",
      class: "table_header"
   });
   
   var td5 = $("<td />",{
      id: "desc",
      text: "Описание",
      class: "table_header"
   });
   
   var td6 = $("<td />",{
      id: "gender",
      text: "Пол",
      class: "table_header"
   });
   
   var td7 = $("<td />",{
      id: "brand",
      text: "Бренд",
      class: "table_header"
   });

   var td8 = $("<td />",{
      id: "in_stock",
      text: "В наличии",
      class: "table_header"
   });
   
   var td9 = $("<td />",{
      id: "similar_articules_data",
      text: "Перекрестные артикулы",
      class: "table_header"
   });
   
   var td10 = $("<td />",{
      id: "for_main_tab",
      text: "На главную в m-версии?",
      class: "table_header"
   });
   
   var td11 = $("<td />",{
      id: "search_queries",
      text: "Поисковые запросы",
      class: "table_header"
   });
   
   var td12 = $("<td />",{
      id: "actions",
      text: "Действия",
      class: "table_header"
   });
   
   table.append(tr0);
   tr0.append(td0).append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8).append(td9).append(td10).append(td11).append(td12);
   getCatalogData();
}

function getCatalogData(){ // получает данные обо всех артикулах в базе
   $.post(
      post_url,{
         a: "gCDFA"
      }, 
      function (result){
         catalog_data_object = eval("(" + result + ")");
         createEditCatalogTableRow()
      }
   );
}

function createEditCatalogTableRow(){ // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
   var counter = catalog_data_object.length-1;
   
   for (var i = 0; i < catalog_data_object.length; i++){
      var tr = $("<tr />",{
         id: "row_"+i,
         class: evenRowColor(counter)
      });
      
      $('#edit_catalog_table').append(tr);

      var td0 = $("<td />",{
         id: "articul_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: catalog_data_object[i].articul
      });
      
      var td1 = $("<td />",{
         id: "title_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: catalog_data_object[i].title
      });
      
      var td2 = $("<td />",{
         id: "size_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: catalog_data_object[i].size
      });
      
      var td3 = $("<td />",{
         id: "type_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: catalog_data_object[i].type
      });
      
      var td4 = $("<td />",{
         id: "subtype_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: catalog_data_object[i].subtype
      });
      
      var td5 = $("<td />",{
         id: "desc_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: catalog_data_object[i].desc.substr(0,10)+" ..."
      });
      
      var td6 = $("<td />",{
         id: "gender_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: catalog_data_object[i].gender
      });
      
      var td7 = $("<td />",{
         id: "brand_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: catalog_data_object[i].brand
      });
      
      var td8 = $("<td />",{
         id: "in_stock_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: catalog_data_object[i].in_stock
      });

      var td9 = $("<td />",{
         id: "similar_articules_data_td_"+i,
         class: evenRowColor(counter),
         text: catalog_data_object[i].similar_articules_data.substr(0,10)+" ..."
      });
      
      var td10 = $("<td />",{
         id: "for_main_tab_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: catalog_data_object[i].for_main_tab
      });
      
      var td11 = $("<td />",{
         id: "search_queries_td_"+i,
         class: evenRowColor(counter),
         text: catalog_data_object[i].search_queries.substr(0,10)+" ..."
      });
      
      var td12 = $("<td />",{
         id: "del_td_"+i,
         class: evenRowColor(counter)
      });
      
      var del_catalog_item_button = $("<button />",{
         id: "del_catalog_item_button",
         text: "X"
      });

      del_catalog_item_button.click(
         function(){
            var a = $(this).parent().attr("id");
            var b = a.split("_");
            var num = b.pop();
            deleteCatalogItem(catalog_data_object[num].num); 
         }
      );
      
      $('#row_'+i).append(td0).append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8).append(td9).append(td10).append(td11).append(td12);
      td12.append(del_catalog_item_button);
      catalog_doTableCellEditable(td1);
      catalog_doTableCellEditable(td2);
      catalog_doTableCellEditable(td3);
      catalog_doTableCellEditable(td4);
      catalog_doTableCellEditable(td5);
      catalog_doTableCellEditable(td6);
      catalog_doTableCellEditable(td7);
      catalog_doTableCellEditable(td9);
      catalog_doTableCellEditable(td10);
      counter--;
   }
}

function catalog_doTableCellEditable(td) // делает ячейку таблицы редактируемой
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
            editCatalogItemParameter(catalog_data_object[num].num, table_column_name, input.val()); 
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
               catalog_onTableCellKeyPress(event);
            }
         );
      }
   );
}

function catalog_doTableCellEditableNew(td) // делает ячейку верхней строки таблицы редактируемой (верхняя строка - добавление нового артикула)
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
               catalog_onTableCellKeyPressNew(event);
            }
         );
      }
   );
}

function editCatalogItemParameter(num, table_column_name, value) // отсылает в базу значение отредактированного параметра (яччейки) артикула
{
   console.log("num "+num+" table_column_name "+table_column_name+" value "+value);

   $.post
   (
      post_url, 
      {
         a: "sCatTID",
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

function catalog_onTableCellKeyPress(event) // срабатывает при нажатии клавиш клавиатуры в редактируемой ячейке таблицы
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
      editCatalogItemParameter(catalog_data_object[num].num, table_column_name, input.val());
   }
   else if (key == 27)
   {
      var input = $('.td_editable_input');
      input.parent('td').html(td_editable_value_reserved);
   }
}

function createNewCatalogItem(catalog_item_object_string) // отсылает в базу данные о с нуля забитом артикуле
{
   $.post
   (
      post_url, 
      {
         a: "cNCI",
         b: catalog_item_object_string
      }, 
      function (result)
      {
         console.log(result);
         buildEditCatalogForm();
      }
   );
}

function catalog_onTableCellKeyPressNew(event) // срабатывает при нажатии клавиш клавиатуры в редактируемой ячейке верхней строки таблицы артикулов
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
            catalog_onTableCellKeyPressNew(event);
         }
      );   
   }
}

function deleteCatalogItem(num)
{
   $.post
   (
      post_url, 
      {
         a: "dCatI",
         b: num
      }, 
      function (result)
      {
         console.log(result);
         buildEditCatalogForm();
      }
   );
}