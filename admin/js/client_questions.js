var td_editable_value_reserved = "";
var questions_data_object = {};

function buildClientQuestionsForm() // создаёт шапку таблицы редактирования артикулов
{
   var table = $("<table />",{
      id: "edit_questions_table"
   });
   
   $('#content_div').html(table);

   var tr0 = $("<tr />",{
      id: "tr0"
   });
   
   var td0 = $("<td />",{
      id: "num",
      text: "#",
      class: "table_header"
   });
   
   var td1 = $("<td />",{
      id: "vk_id",
      text: "ВК ID",
      class: "table_header"
   });
   
   var td2 = $("<td />",{
      id: "q",
      text: "Вопрос",
      class: "table_header"
   });
   
   var td3 = $("<td />",{
      id: "a",
      text: "Ответ",
      class: "table_header"
   });
   
   var td4 = $("<td />",{
      id: "timestamp",
      text: "Время",
      class: "table_header"
   });
   
   
   var td5 = $("<td />",{
      id: "actions",
      text: "Действия",
      class: "table_header"
   });
   
   table.append(tr0);
   tr0.append(td0).append(td1).append(td2).append(td3).append(td4).append(td5);
   getQuestionsData();
}

function getQuestionsData(){ // получает данные обо всех артикулах в базе
   $.post(
      post_url,{
         a: "CQ_gQD"
      }, 
      function (result){
         questions_data_object = eval("(" + result + ")");
         createEditQuestionsTableRow()
      }
   );
}

function createEditQuestionsTableRow(){ // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
   var counter = questions_data_object.length-1;
   
   for (var i = 0; i < questions_data_object.length; i++){
      var tr = $("<tr />",{
         id: "row_"+i,
         class: evenRowColor(counter)
      });
      
      $('#edit_questions_table').append(tr);

      var td0 = $("<td />",{
         id: "num_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: questions_data_object[i].num
      });
      
      var td1 = $("<td />",{
         id: "vk_id_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: questions_data_object[i].vk_id
      });
      
      td1.html("<a href='http://vk.com/id"+questions_data_object[i].vk_id+"' target='_blank'>"+questions_data_object[i].vk_id+"</a>");
      
      var td2 = $("<td />",{
         id: "q_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: questions_data_object[i].q
      });
      
      td2.css("width","200px");
      
      var td3 = $("<td />",{
         id: "a_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: questions_data_object[i].a
      });
      
      td3.css("width","450px");
      
      var td4 = $("<td />",{
         id: "timestamp_td_"+i,
         class: "td_editable "+evenRowColor(counter),
         text: questions_data_object[i].timestamp
      });
      
      var td5 = $("<td />",{
         id: "del_td_"+i,
         class: evenRowColor(counter)
      });
      
      var del_question_button = $("<button />",{
         id: "del_question_button",
         text: "X"
      });

      del_question_button.click(
         function(){
            var a = $(this).parent().attr("id");
            var b = a.split("_");
            var num = b.pop();
            deleteQuestion(questions_data_object[num].num); 
         }
      );
      
      $('#row_'+i).append(td0).append(td1).append(td2).append(td3).append(td4).append(td5);
      td5.append(del_question_button);
      questions_doTableCellEditable(td2);
      questions_doTableCellEditable(td3);
      counter--;
   }
}

function questions_doTableCellEditable(td) // делает ячейку таблицы редактируемой
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
            editQuestionParameter(questions_data_object[num].num, table_column_name, input.val()); 
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
               questions_onTableCellKeyPress(event);
            }
         );
      }
   );
}

function questions_doTableCellEditableNew(td) // делает ячейку верхней строки таблицы редактируемой (верхняя строка - добавление нового артикула)
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
               questions_onTableCellKeyPressNew(event);
            }
         );
      }
   );
}

function editQuestionParameter(num, table_column_name, value) // отсылает в базу значение отредактированного параметра (яччейки) артикула
{
   console.log("num "+num+" table_column_name "+table_column_name+" value "+value);

   $.post
   (
      post_url, 
      {
         a: "CQ_eQP",
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

function questions_onTableCellKeyPress(event) // срабатывает при нажатии клавиш клавиатуры в редактируемой ячейке таблицы
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
      editQuestionParameter(questions_data_object[num].num, table_column_name, input.val());
   }
   else if (key == 27)
   {
      var input = $('.td_editable_input');
      input.parent('td').html(td_editable_value_reserved);
   }
}

function deleteQuestion(num){
   $.post(
      post_url, 
      {
         a: "CQ_dQ",
         b: num
      }, 
      function (result){
         buildClientQuestionsForm();
      }
   );
}