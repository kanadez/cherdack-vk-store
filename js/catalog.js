function showCatalogTab(from_main_page) // выводит контент вкладки Каталог
{
   var sql_params = [];
   cur_active_tab_id = "catalog_tab_a";
   
   var table = $("<table />", 
   {
      id: "catalog_table",
      cellspacing: "0",
      cellpadding: "0",
      border: "0"
   });   
   
   $('#content_div').html(table);
   createCatalogGrid();

   if ($('.side_panel_spoiler_li_active').length == 0 && click_category_from_main_tab == 0)
      onSidePanelCategoryClick('headwear_by_brand_obey_a');
}

function createCatalogGrid() // получает максимальное чиисло элементтов каталога и создает сетку каталога для наполннения потом контентом
{
   startLoader();
   
   $.post
   (
      post_url, 
      {
         a: "gMN"
      }, 
      function (result)
      {
         var tr_count = Math.floor(result/3);

         if (tr_count != result)
            tr_count++;
         
         var tr_counter = 0;
         
         for (var i = 0; i < tr_count; i++)
         {
            $('#catalog_table').append("<tr><td id='td_"+(tr_counter)+"' class='catalog_table_td'></td><td id='td_"+(tr_counter+1)+"' class='catalog_table_td'></td><td id='td_"+(tr_counter+2)+"' class='catalog_table_td'></td></tr>");  
            tr_counter += 3;
         }
         
         $('.side_panel_spoiler_li_active').each(function()
         {
            sql_params.push($(this).attr("sql_param_name")+"|"+$(this).attr("sql_param_value"));
         });         
         
         var sql_params_object = {};
         
         for(i in sql_params)
            sql_params_object[i] = sql_params[i];
         
         getCatalogData(JSON.stringify(sql_params_object));
      }
   );
}

function backToCatalog() // возвращает в каталог например из страницы товара
{
   product_page_is_showing = 0;

   var table = $("<table />", 
   {
      id: "catalog_table",
      cellspacing: "0",
      cellpadding: "0",
      border: "0"
   });   

   $('#content_div').html(table);
   createCatalogGrid();
}

function convertInStockValue(value) // конвертирует value в div "в наличии" или в "под заказ"
{
   if (value == 0)
      return "<div class='catalog_cell_state_label_order'>под заказ</div>";
   else if (value = 1)
      return "<div class='catalog_cell_state_label_stock'>в наличии</div>"
   else
      perror();
}

function getCatalogData(sql_params_object) // получает контент для вкладки каталога и наполняет им вкладку
{
   $('.fancybox').remove();
   
   $.post
   (
      post_url, 
      {
         a: "gCD",
         b: sql_params_object
      }, 
      function (result)
      {
         if ($('#empty_catalog_msg_div').length != 0)
            $('#empty_catalog_msg_div').remove();
         
         catalog_data_obj = eval("(" + result + ")");
         var reserv = 0;
         //################ sorting by price
         for (var i = 0; i < catalog_data_obj.length-1; i++)           
            if (Number(catalog_data_obj[i].retail_price) > Number(catalog_data_obj[i+1].retail_price))
            {
               reserv = catalog_data_obj[i];
               catalog_data_obj[i] = catalog_data_obj[i+1];
               catalog_data_obj[i+1] = reserv;
               i=-1;
            }
         
         //############## in stock to up
         for (var i = 0; i < catalog_data_obj.length; i++)           
            if (catalog_data_obj[i].in_stock == 1)
               for (var z = 0; z < catalog_data_obj.length; z++)
                  if (catalog_data_obj[z].in_stock != 1)
                  {
                     var res1 = catalog_data_obj[z];
                     catalog_data_obj[z] = catalog_data_obj[i];
                     catalog_data_obj[i] = res1;
                     
                     break;
                  }
         
         td_cntr = 0;
         
         for (var i = 0; i < catalog_data_obj.length; i++)
         {
            bImages[i] = new Image();
            bImages[i].id = "product_image_img";
            bImages[i].src = catalogs_path+"/"+catalog_data_obj[i].brand+"/"+catalog_data_obj[i].articul+"/main.jpg";         
            $('#td_'+td_cntr).html("<a id='item_"+catalog_data_obj[i].articul+"' href='javascript:void(0)' class='fancybox' articul='"+catalog_data_obj[i].articul+"' rel='group1' title='"+catalog_data_obj[i].title+"'><img class='im' src="+catalogs_path+"/"+catalog_data_obj[i].brand+"/"+catalog_data_obj[i].articul+"/main_thumb.jpg /><div class='catalog_cell_title'>"+catalog_data_obj[i].title+"</div><div class='catalog_cell_price'>"+catalog_data_obj[i].retail_price+" руб.</div>"+convertInStockValue(catalog_data_obj[i].in_stock)+"</a>");
            
            $('#item_'+catalog_data_obj[i].articul).bind(
            "click",
            {
               key: i
            },
            function(event)
            {
               cur_articul = $(this).attr("articul");
               showProductPage($(this).attr("articul"), event.data.key, 0);
            });
            
            td_cntr++;
         }
         
         hideEmptyCatalogCells();        
         stopLoader();
         
         if (result == -1)
            onCatalogEmpty();
      }
   );
}

function onCatalogEmpty()
{
   $('#content_div').append("<div id='empty_catalog_msg_div' style='text-align:center; margin-top:176px;'><span style='color:#000; font-size:14px;'>Каталог пока пуст</span><p><span style='color:#333;'>Попробуйте выбрать другой бренд. Данный бренд мы ещё не успели добавить в каталог.</span><p><div style='margin-top:40px'>");
}

function hideEmptyCatalogCells()
{
   $('.catalog_table_td').each(function()
   {
      if ($(this).children('a').length == 0)
         $(this).hide();
      else
         $(this).css("display", "table-cell");
   });
}