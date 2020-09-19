var brands_array = [];
var types_array = [];
var subtypes_array = [];
var br = $("<br />",
{
   id: "br"
});
var new_model_articul = -1;
var new_model_brand = -1;

function showAddArticulForm()
{
   getLastArticulNumber();
   
   var catalog_division_div = $("<div />", 
   {
      id: "catalog_division_div",
      text: "КАТАЛОГ"
   });
   
   catalog_division_div.css("font-weight", "bold");
   
   var new_model_articul_div = $("<div />", 
   {
      id: "new_model_articul_div",
      text: "--новый артикул--",
      class: "top10px"
   });
   
   var title_input_label_div = $("<div />",
   {
      id: "title_input_label_div",
      text: "Наименование:",
      class: "top10px"
   });
   
   var title_input = $("<input />",
   {
      id: "title_input"
   });
   
   var gender_select_label_div = $("<div />",
   {
      id: "gender_select_label_div",
      text: "Пол:",
      class: "top10px"
   });
   
   var type_select_label_div = $("<div />",
   {
      id: "type_select_label_div",
      text: "Тип:",
      class: "top10px"
   });
   
   var type_select = $("<select />",
   {
      id: "type_select"
   });
   
   type_select.append("<option>Выбрать тип товара...</option>");
   
   $.post
   (
      post_url, 
      {
         a: "gCTy"
      }, 
      function (result)
      {
         obj = eval("(" + result + ")");
         for (var i = 0; i < obj.length; i++)
         {
            types_array.push(obj[i].type);
            option = $("<option />", 
            {
               value: obj[i].code,
               text: obj[i].type
            });
            type_select.append(option);
         }
         
      }
   );
   
   type_select.change(function()
   {
      $.post
      (
         post_url, 
         {
            a: "gCSTy",
            b: $('#type_select').val()
         }, 
         function (result)
         {
            obj = eval("(" + result + ")");
            subtype_select.html("");
            
            for (var i = 0; i < obj.length; i++)
            {
               subtypes_array.push(obj[i].subtype_name);
               option = $("<option />", 
               {
                  value: obj[i].subtype_code,
                  text: obj[i].subtype_name
               });
               subtype_select.append(option);
            }
         }
      );
   });
   
   var subtype_select_label_div = $("<div />",
   {
      id: "subtype_select_label_div",
      text: "Подтип:",
      class: "top10px"
   });
   
   var subtype_select = $("<select />",
   {
      id: "subtype_select"
   });
   
   var gender_select = $("<select />",
   {
      id: "gender_select"
   });
   
   var gender_select_options = [];
   
   gender_select_options[0] = $("<option />", 
   {
      value: "m",
      text: "м"
   });

   gender_select_options[1] = $("<option />", 
   {
      value: "f",
      text: "ж"
   });
   
   gender_select_options[2] = $("<option />", 
   {
      value: "b",
      text: "уни"
   });
   
   for (var i = 0; i < gender_select_options.length; i++)
   {
      gender_select.append(gender_select_options[i]);
   }

   var brand_select_label_div = $("<div />",
   {
      id: "brand_select_label_div",
      text: "Бренд:",
      class: "top10px"
   });
   
   var brand_select = $("<select />",
   {
      id: "brand_select"
   });
   
   brand_select.change(function()
   {
      new_model_brand = $(this).val();
   });
   
   $.post
   (
      post_url, 
      {
         a: "gCB"
      }, 
      function (result)
      {
         obj = eval("(" + result + ")");
         for (var i = 0; i < obj.length; i++)
         {
            brands_array.push(obj[i].brand_title);
            option = $("<option />", 
            {
               value: obj[i].brand_title,
               text: obj[i].brand_title
            });
            brand_select.append(option);
         }
         
         new_model_brand = brand_select.val();
      }
   );
   
   var in_stock_check = $("<input />",
   {
      type: "checkbox",
      id: "in_stock_check"
   });
   
   in_stock_check.css({"width":"20px"});
   
   var in_stock_label_div = $("<div />",
   {
      id: "in_stock_label_div",
      text: "В наличии?",
      class: "top10px"
   });
   
   var search_queries_area = $("<textarea />",
   {
      id: "search_queries_area"
   });
   
   var search_queries_area_div = $("<div />",
   {
      id: "search_queries_area_div",
      text: "Поисковые запросы:",
      class: "top10px"
   });
   
   $('#content_div').html(catalog_division_div);
   $('#content_div').append(new_model_articul_div);
   $('#content_div').append(title_input_label_div);
   $('#content_div').append(title_input);
   $('#content_div').append(gender_select_label_div);
   $('#content_div').append(gender_select);
   $('#content_div').append(type_select_label_div);
   $('#content_div').append(type_select);
   $('#content_div').append(subtype_select_label_div);
   $('#content_div').append(subtype_select);
   $('#content_div').append(brand_select_label_div);
   $('#content_div').append(brand_select);
   $('#content_div').append(in_stock_label_div);
   $('#content_div').append(in_stock_check);
   $('#content_div').append(search_queries_area_div);
   $('#content_div').append(search_queries_area);
   
   var articules_division_div = $("<div />", 
   {
      id: "articules_division_div",
      text: "АРТИКУЛЫ",
      class: "top10px"
   });
   
   articules_division_div.css("font-weight", "bold");
   
   var supplier_price_div = $("<div />",
   {
      id: "supplier_price_div",
      text: "Закупочная цена:",
      class: "top10px"
   });
   
   var supplier_price_input = $("<input />",
   {
      id: "supplier_price_input"
   });
   
   $('#content_div').append(articules_division_div);
   $('#content_div').append(supplier_price_div);
   $('#content_div').append(supplier_price_input);
   
   var fcd_dir_name_input = $("<input />", 
   {
      id: "fcd_dir_name_input",
      class: "top10px"
   });

   var add_model_data_button = $("<button />",
   {
      id: "add_model_data_button",
      text: "Добавить модель",
      class: "top10px"
   });
   
   add_model_data_button.css("background", "rgba(255,199,199,1)");
   add_model_data_button.click(function(){addModelData();});
   
   var photo_division_div = $("<div />", 
   {
      id: "photo_division_div",
      text: "ФОТО",
      class: "top10px"
   });
   
   photo_division_div.css("font-weight", "bold");
   $('#content_div').append(br);
   $('#content_div').append(add_model_data_button);
   $('#content_div').append(photo_division_div);   
   $('#content_div').append('<form enctype="multipart/form-data" action="http://app.po-sportu.ru/catalogs/upload.php" method="POST"><br>main: <input name="userfile[]" type="file" /><br>main_1: <input name="userfile[]" type="file" /><br>main_2: <input name="userfile[]" type="file" /><br>main_3: <input name="userfile[]" type="file" /><br>main_thumb: <input name="userfile[]" type="file" /><br>Путь: <input id="catalog_path_input" name="path_input" /><br><input type="submit" class="top10px" style="background:rgba(255,122,122,1)" value="Залить фотки" /></form>');
}

function ftpCreateModelDirectory()
{
   $.post
   (
      post_url, 
      {
         a: "fCD",
         b: "/posportu/public_html/app/public_html/catalogs/"+new_model_brand+"/"+new_model_articul
      }, 
      function (result)
      {
         return;
      }
   );
}

function getLastArticulNumber()
{
   $.post
   (
      post_url, 
      {
         a: "gLAN"
      }, 
      function (result)
      {
         new_model_articul = Number(result)+1;
         $('#new_model_articul_div').text("Новый артикул: "+new_model_articul);
      }
   );
}

function addModelData()
{
   ftpCreateModelDirectory();
   
   var new_model_object = {};
   new_model_object["articul"] = new_model_articul;
   new_model_object["title"] = $('#title_input').val();
   new_model_object["gender"] = $('#gender_select').val();
   new_model_object["type"] = $('#type_select').val();
   new_model_object["subtype"] = $('#subtype_select').val();
   new_model_object["brand"] = $('#brand_select').val();
   new_model_object["in_stock"] = $('#in_stock_check').attr("checked") == "checked" ? 1 : 0;
   new_model_object["similar_articules_data"] = "";
   new_model_object["search_queries"] = $('#search_queries_area').val();
   new_model_object["supplier_price_bucks"] = $('#supplier_price_input').val();
   new_model_object["size"] = "main";
   
   $.post
   (
      post_url, 
      {
         a: "aNMD",
         b: JSON.stringify(new_model_object)
      }, 
      function (result)
      {
         alert(result == 1 ? "Успешно" : "Сбой");
         $('#catalog_path_input').val(new_model_brand+"/"+new_model_articul);
      }
   );   
}
