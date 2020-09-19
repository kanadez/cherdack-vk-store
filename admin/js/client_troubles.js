var client_troubles_data_object = {};

function buildClientTroublesForm() // создаёт шапку таблицы редактирования артикулов
{  
   var table = $("<table />", {
      id: "client_troubles_table"
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
      text: "Клиент",
      class: "table_header"
   });  

   var td2 = $("<td />",{
      id: "timestamp",
      text: "Время",
      class: "table_header"
   });
   
   var td3 = $("<td />",{
      id: "actions",
      text: "Действия",
      class: "table_header"
   });
   
   table.append(tr0);
   tr0.append(td0);
   tr0.append(td1);
   tr0.append(td2);
   tr0.append(td3);   
   getClientTroublesData(); 
}

function getClientTroublesData(){ // получает данные обо всех артикулах в базе
   $.post(
      post_url, {
         a: "CT_gCTD"
      }, 
      function (result){
         client_troubles_data_object = eval("(" + result + ")");
         createClientTroublesTableRow();
      }
   );
}

function createClientTroublesTableRow(){ // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными

   var counter = client_troubles_data_object.length-1;
   
   for (var i = 0; i < client_troubles_data_object.length; i++){
      var tr = $("<tr />",{
         id: "row_"+i
      });
      
      $('#client_troubles_table').append(tr);
      
      var td0 = $("<td />",{
         id: "num_td_"+i,
         text: counter,
         class: evenRowColor(counter)
      });
      
      var td1 = $("<td />",{
         id: "vk_id_td_"+i,
         class: evenRowColor(counter)
      });
      
      td1.html("<a href='http://vk.com/id"+client_troubles_data_object[i].vk_id+"' target='_blank'>"+client_troubles_data_object[i].vk_id+"</a>");
      
      var td2 = $("<td />",{
         id: "timestamp_td_"+i,
         text: getDateFromTimestamp(client_troubles_data_object[i].timestamp),
         class: evenRowColor(counter)
      });
      
      var td3 = $("<td />",{
         id: "solved_td_"+i,
         class: evenRowColor(counter)
      });
      
      var solved_button = $("<button />",{
         id: "solved_button",
         text: "Решено"
      });

      solved_button.click({
            num:client_troubles_data_object[i].num
         },
         function(event){
            setTroubleSolved(event.data.num);
         }
      );
      
      td3.html(solved_button);
      $('#row_'+i).append(td0);
      $('#row_'+i).append(td1);
      $('#row_'+i).append(td2);
      $('#row_'+i).append(td3);
      counter--;
   }
}

function setTroubleSolved(num){
   $.post(
      post_url,{
         a: "CT_dT",
         b: num
      }, 
      function(result){
      }
   );
}