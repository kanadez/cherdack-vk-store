function onSearchInputFocus() // событие по фокусу в поле поиска
{
   $('#header_banner_img').animate({opacity:0},200);
   
   if ($('#search_input').val() == "поиск")
      $('#search_input').val("");
   
   $('#search_input').animate({width: 500, left: 296}, 200);
}

function onSearchInputBlur() // событие по блёру поля поиска
{
   $('#header_banner_img').animate({opacity:0.8},200);
   
   if ($('#search_input').val() == "")
      $('#search_input').val("поиск");
   
   $('#search_input').animate({width: 114, left: 682}, 200);
}

function search(query)
{
   $.post
   (
      post_url, 
      {
         a: "search",
         b: query
      }, 
      function (result)
      {
         if (isNotIE())
         {
            var obj = eval("(" + result + ")");
         }
         else
         {
            var obj = eval_global(result);
         }
         
         if (cur_active_tab_id != "catalog_tab_a")
         {
            switchTab('catalog_tab_a', '')         
            cur_active_tab_id = "catalog_tab_a";
         }
            
         if (result == -1)
         {
            $('#content_div').html("<div style='text-align:center; margin-top:176px;'><span style='color:#000; font-size:14px;'>Поиск</span><p><span style='color:#333;'>Пока что по Вашему запросу ничего не найдено. Продолжайте вводить.</span><p><div style='margin-top:30px'><a id='show_all_catalog_a' class='button' href='javascript:void(0)'>Показать весь каталог</a><div></div>");
            
            $('#show_all_catalog_a').click(function()
            {
               if ($('.side_panel_spoiler_li_active').length == 0 && click_category_from_main_tab == 0)
               {
                  turnSidePanelCategory('by_brand_nike_a');
                  //turnSidePanelCategory('by_brand_adidas_a');
               }

               var sql_params = [];
               var table = $("<table />", 
               {
                  id: "catalog_table",
                  cellspacing: "0",
                  cellpadding: "0",
                  border: "0"
               });   
               $('#content_div').html(table);

               createCatalogGrid();
            });
         }
         else
         {
            var table = $("<table />", 
            {
               id: "catalog_table",
               cellspacing: "0",
               cellpadding: "0",
               border: "0"
            });   
            
            $('#content_div').html(table);
            var tr_count = Math.floor(obj.length/3);

            if (tr_count != obj.length)
            {
               tr_count++;
            }
            
            var tr_counter = 0;
            
            for (var i = 0; i < tr_count; i++)
            {
               $('#catalog_table').append("<tr><td id='td_"+(tr_counter)+"' class='catalog_table_td'></td><td id='td_"+(tr_counter+1)+"' class='catalog_table_td'></td><td id='td_"+(tr_counter+2)+"' class='catalog_table_td'></td></tr>");  
               tr_counter += 3;
            }
            
            td_cntr = 0;
            
            for (var i = 0; i < obj.length; i++)
            {
               $('#td_'+td_cntr).html("<a id='item_"+obj[i].articul+"' href='javascript:void(0)' class='fancybox' articul='"+obj[i].articul+"' rel='group1' title='"+obj[i].title+"'><img class='im' src=../catalogs/"+obj[i].brand+"/"+obj[i].articul+"/main_thumb.jpg /><div class='catalog_cell_title'>"+obj[i].title+"</div><div class='catalog_cell_price'>"+obj[i].retail_price+" руб.</div>"+convertInStockValue(obj[i].in_stock)+"</a>");
               
               $('#item_'+obj[i].articul).click
               (
                  function()
                  {
                     cur_articul = $(this).attr("articul");
                     showProductPage($(this).attr("articul"));
                  }
               );
               
               td_cntr++;
            }

            $('.fancybox').animate({opacity: 1}, 500);
            hideEmptyCatalogCells();
         }
      }
   );
}