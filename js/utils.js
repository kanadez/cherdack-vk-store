function getDateFromTimestamp(timestamp)
{
   var date = new Date(timestamp*1000);
   var hours = date.getHours()+1;
   var minutes = date.getMinutes();
   var seconds = date.getSeconds();
   var day = date.getDate();
   var month = date.getMonth()+1;
   var year = date.getFullYear();
   
   return day+"/"+month+"/"+year+" в "+hours+":"+minutes+":"+seconds;
}

function getDateFromTimestampInArray(timestamp)
{
   var obj = {};
   var date = new Date(timestamp*1000);
   obj.hours = date.getHours()+1;
   obj.minutes = date.getMinutes();
   obj.seconds = date.getSeconds();
   obj.day = date.getDate();
   obj.month = date.getMonth()+1;
   obj.year = date.getFullYear();
   
   return obj;
}

function getClock()
{
   var date = new Date();
   var hours = date.getHours();
   var minutes = date.getMinutes();
   var seconds = date.getSeconds();
   var day = date.getDate();
   var month = date.getMonth()+1;
   var year = date.getFullYear();
   
   $('#clock_div').html(day+"/"+month+"/"+year+" | "+hours+":"+minutes+":"+seconds);
}

function getDate() // ??
{
   $.post
   (
      post_url, 
      {
         a: "gD"
      }, 
      function (result)
      {
         if (isNotIE())
            obj = eval("(" + result + ")");
         else
            obj = eval_global(result);
      }
   );
}

function eval_global(codetoeval) 
{
   if (window.execScript)
      window.execScript('code_evaled = ' + '(' + codetoeval + ')',''); // execScript doesn’t return anything
   else
      code_evaled = eval(codetoeval);
   return code_evaled;
}

function isNotIE() // если не IE, возвращает тру
{
   if (navigator.appName != "Microsoft Internet Explorer")
   {
      return true
   }
   else
   {
      return false
   }
}

function startLoader() // запускает индикатор загрузки в центре content_div
{
   $('#content_div').children().hide();
   var loader = "<img id='loader_img' src='img/load.gif' style='margin-left: 301px; margin-top:200px;' />";
   $('#content_div').append(loader);
}

function stopLoader() // останавливает индикатор загрузки в центре content_div
{
   $('#loader_img').remove();
   $('#content_div').children().show()
}

function crossBrowser() // здесь делаем всё для кроссбраузерности
{
   if (navigator.appName == "Opera")
   {
      $('#content_div').css("margin-top", "91px");
   }
}

function log(what_to_log)
{
   //console.log(what_to_log);
   return;
}

function turnOpacityOn(element)
{
   element.css({"opacity" : 1});
}

function turnOpacityOff(element)
{
   element.css({"opacity" : 0});
}

function animateOpacityOn(element)
{
   element.animate({"opacity" : 1}, 200);
}

function animateOpacityOff(element)
{
   element.animate({"opacity" : 0}, 200);
}

function nullCurrentTab()
{
   cur_active_tab_id = "";
   cur_active_tab = $('#ship_tab_a');
}