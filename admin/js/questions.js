var td_editable_value_reserved = "";
var questions_data_object = {};

function buildQuestionsForm() // создаёт шапку таблицы редактирования артикулов
{   
   var questions_table = $("<table />", 
   {
      id: "questions_table"
   });
   
   $('#content_div').html(questions_table);
   
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
      id: "question_text",
      text: "Вопрос"
   });
   
   var td3 = $("<td />",
   {
      id: "timestamp",
      text: "Время"
   });
   
   var td4 = $("<td />",
   {
      id: "actions",
      text: "Действия"
   });
   
   questions_table.append(tr1);
   tr1.append(td0);
   tr1.append(td1);
   tr1.append(td2);
   tr1.append(td3);
   tr1.append(td4);
   tr1.children().css({"color": "#fff", "background": "#a64d79"});
   
   getQuestions();
}

function getQuestions() // получает данные обо всех артикулах в базе
{
   $.post
   (
      post_url, 
      {
         a: "gQD"
      }, 
      function (result)
      {
         questions_data_object = eval("(" + result + ")");
         createQuestionsTableRow();
         console.log(questions_data_object);
      }
   );
}

function createQuestionsTableRow() // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
{
   for (var i = 0; i < questions_data_object.length; i++)
   {
      var tr = $("<tr />",
      {
         id: "questions_table_row_"+i
      });
      
      $('#questions_table').append(tr);
      
      var td0 = $("<td />",
      {
         id: "num_td_"+i,
         class: "td_editable",
         text: questions_data_object[i].num
      });
      
      var td1 = $("<td />",
      {
         id: "vk_id_td_"+i,
         class: "td_editable",
         text: questions_data_object[i].vk_id
      });

      var td2 = $("<td />",
      {
         id: "question_text_td_"+i,
         class: "td_editable",
         text: questions_data_object[i].question_text
      });
      
      var td3 = $("<td />",
      {
         id: "timestamp_td_"+i,
         class: "td_editable",
         text: questions_data_object[i].timestamp
      });
      
      var td4 = $("<td />",
      {
         id: "actions_td_"+i,
         class: "td_editable"
      });
      
      var answer_button = $("<button />",
      {
         id: "answer_button_"+i,
         text: "Отвечено",
         onclick: "setQuestionAnswered("+questions_data_object[i].num+")"
      });
      
      td4.append(answer_button);

      tr.append(td0);
      tr.append(td1);
      //doTableCellEditable(td1);
      tr.append(td2);
      //doTableCellEditable(td2);
      tr.append(td3);
      //doTableCellEditable(td3);
      tr.append(td4);
   }
}

function setQuestionAnswered(num)
{
   $.post
   (
      post_url, 
      {
         a: "sQA",
         b: num
      }, 
      function (result)
      {
         buildQuestionsForm()
      }
   );
}