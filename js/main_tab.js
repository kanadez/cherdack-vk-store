var main_tab_intvl1 = -1;

﻿function showMainTab() // показывает контент Главной вкладки
{
   if (main_tab_intvl1 != -1)
      clearInterval(main_tab_intvl1);
   else if (main_tab_intvl1 == -1)
      main_tab_intvl1 = window.setInterval("onRightArrowClick()", 2000);
   
   startLoader();
   $('#content_div').html("<div id='main_tab_cart' style='padding:0 10px 0 10px; margin-top: 75px;'></div>");
   $('#main_tab_cart').html("<div style='text-align:center;'><div style='margin: 10px 0 10px 0; font-size: 12px; color: #333;'><a href='javascript:void(0)' id='ny_action_a' class='text_link'>"+text_for_main_tab_ad+"</a></div></div>");
   $('#main_tab_cart').append("<div id='left_arrow_div' style='width:120px; height:325px; text-align:center; float:left'><a id='left_arrow_a' href='javascript:void(0)'><img src='img/left_arrow.png' class='slide_arrow_img'/></a></div>");
   $('#main_tab_cart').append("<div id='main_tab_big_image_div' style='width:390px; height:325px; float:left'></div>");
   $('#main_tab_cart').append("<div style='width:120px; height:325px; text-align:center; float:left'><a id='right_arrow_a' href='javascript:void(0)'><img id='right_arrow_div' src='img/right_arrow.png' class='slide_arrow_img'/></a></div>");
   $('#main_tab_cart').append("<div id='text_for_slideshow_item_div' style='width:630px; height:auto; float:left; text-align:center;'></div>");      
   
   
    $('#ny_action_a').click
   (
      function()
      {                  
         $('#main_tab_big_image_div').css("opacity", "0");
         $('#main_tab_big_image_div').html("<a id='main_tab_big_image_a' href='javascript:void(0)'></a>");
         $('#main_tab_big_image_a').html(aImages[slide_counter]);
         $('#slide_panel_image_'+slide_counter).width(390);
         $('#slide_panel_image_'+slide_counter).height(325);
         $('#main_tab_big_image_div').animate({opacity:"1"}, 200);
         //$('#slide_show_item_title_div').html(main_tab_data_obj[slide_counter].title);
         $('#main_tab_big_image_a').unbind("click");
         $('#main_tab_big_image_a').bind
         (
            "click",
            function()
            {
               if (cur_active_tab_id == "main_tab_a")
               {
                  product_page_is_showing = 1;
                  cur_articul = main_tab_data_obj[slide_counter].articul;
                  switchTab('catalog_tab_a', 'showCatalogTab(1)')
               }
            }
         );
         
         /*$('#buy_button_a').unbind("click");
         
         $('#buy_button_a').bind
         (
            "click",
            function()
            {
               product_page_is_showing = 1;
               cur_articul = main_tab_data_obj[slide_counter].articul;
               switchTab('catalog_tab_a', 'showCatalogTab(1)')
            }
         );*/
      }
   );
   
   startLoader();
   
   $.post
   (
      post_url, 
      {
         a: "gMTI"
      }, 
      function (result)
      {
         if (isNotIE())
            main_tab_data_obj = eval("(" + result + ")");
         else
            main_tab_data_obj = eval_global(result);
         
         $('#main_tab_big_img').attr("src", catalogs_path+"/"+main_tab_data_obj[0].brand+"/"+main_tab_data_obj[0].articul+"/main.jpg");
         
         for (var i = 0; i < main_tab_data_obj.length; i++)
         {
            $('#slideshow_images_panel_div').append("<div class='slideshow_panel_image'><a id='slideshow_panel_image_"+i+"_a' href='javascript:void(0)' onclick='onSlidePanelImageClick("+i+")'><img id='slideshow_panel_image_"+i+"_img' src='../catalogs/"+main_tab_data_obj[i].brand+"/"+main_tab_data_obj[i].articul+"/main_thumb.jpg' style='width:121px; height:100px;'/></a></div>");
         }
         
         for (var i = 0; i < main_tab_data_obj.length; i++) 
         {
            aImages[i] = new Image();
            aImages[i].id = "slide_panel_image_"+i;
            aImages[i].src = catalogs_path+"/"+main_tab_data_obj[i].brand+"/"+main_tab_data_obj[i].articul+"/main.jpg";
         }
         
         $('#main_tab_big_image_div').css("opacity", "0");            
         $('#main_tab_big_image_div').html("<a id='main_tab_big_image_a' href='javascript:void(0)'></a>");
         $('#main_tab_big_image_a').html(aImages[slide_counter]);
         $('#slide_panel_image_'+slide_counter).width(390);
         $('#slide_panel_image_'+slide_counter).height(325);
         $('#main_tab_big_image_div').animate({opacity:"1"}, 200);
         //$('#slide_show_item_title_div').html(main_tab_data_obj[slide_counter].title);
         $('#main_tab_big_image_a').unbind("click");
         
         $('#main_tab_big_image_a').bind
         (
            "click",
            function()
            {
               if (cur_active_tab_id == "main_tab_a")
               {
                  product_page_is_showing = 1;
                  cur_articul = main_tab_data_obj[slide_counter].articul;
                  switchTab('catalog_tab_a', 'showCatalogTab(1)')
               }
            }
         );
         
         /*$('#buy_button_a').unbind("click");
         
         $('#buy_button_a').bind
         (
            "click",
            function()
            {
               if (cur_active_tab_id == "main_tab_a")
               {
                  product_page_is_showing = 1;
                  cur_articul = main_tab_data_obj[slide_counter].articul;
                  switchTab('catalog_tab_a', 'showCatalogTab(1)')
               }
            }
         );*/
         
         stopLoader();
      }
   );
   
   $('#left_arrow_a').click
   (
      function()
      {
         clearInterval(main_tab_intvl1);
         if (slide_counter > 0)
            slide_counter--;
         else
            slide_counter = main_tab_data_obj.length-1;
         
         $('#main_tab_big_image_div').css("opacity", "0");            
         $('#main_tab_big_image_div').html("<a id='main_tab_big_image_a' href='javascript:void(0)'></a>");
         $('#main_tab_big_image_a').html(aImages[slide_counter]);
         $('#slide_panel_image_'+slide_counter).width(390);
         $('#slide_panel_image_'+slide_counter).height(325);
         $('#main_tab_big_image_div').animate({opacity:"1"}, 200);
         //$('#slide_show_item_title_div').html(main_tab_data_obj[slide_counter].title);
         $('#main_tab_big_image_a').unbind("click");
         
         $('#main_tab_big_image_a').bind
         (
            "click",
            function()
            {
               if (cur_active_tab_id == "main_tab_a")
               {
                  product_page_is_showing = 1;
                  cur_articul = main_tab_data_obj[slide_counter].articul;
                  switchTab('catalog_tab_a', 'showCatalogTab(1)')
               }
            }
         );
         
         /*$('#buy_button_a').unbind("click");
         
         $('#buy_button_a').bind
         (
            "click",
            function()
            {
               if (cur_active_tab_id == "main_tab_a")
               {
                  product_page_is_showing = 1;
                  cur_articul = main_tab_data_obj[slide_counter].articul;
                  switchTab('catalog_tab_a', 'showCatalogTab(1)')
               }
            }
         );*/
         
         //detectMainTabRLClick()
      }
   );

   $('#right_arrow_a').click
   (
      function()
      {
         clearInterval(main_tab_intvl1);
         onRightArrowClick()
      }
   );
   
   cur_active_tab_id = "main_tab_a";
}

function onRightArrowClick()
{
   if (slide_counter < main_tab_data_obj.length-1)
      slide_counter++;
   else
      slide_counter = 0;
   
   $('#main_tab_big_image_div').css("opacity", "0");
   $('#main_tab_big_image_div').html("<a id='main_tab_big_image_a' href='javascript:void(0)'></a>");
   $('#main_tab_big_image_a').html(aImages[slide_counter]);
   $('#slide_panel_image_'+slide_counter).width(390);
   $('#slide_panel_image_'+slide_counter).height(325);
   $('#main_tab_big_image_div').animate({opacity:"1"}, 200);
   //$('#slide_show_item_title_div').html(main_tab_data_obj[slide_counter].title);
   $('#main_tab_big_image_a').unbind("click");
   
   $('#main_tab_big_image_a').bind
   (
      "click",
      function()
      {
         if (cur_active_tab_id == "main_tab_a")
         {
            product_page_is_showing = 1;
            cur_articul = main_tab_data_obj[slide_counter].articul;
            switchTab('catalog_tab_a', 'showCatalogTab(1)')
         }
      }
   );
   
   /*$('#buy_button_a').unbind("click");
   
   $('#buy_button_a').bind
   (
      "click",
      function()
      {
         product_page_is_showing = 1;
         cur_articul = main_tab_data_obj[slide_counter].articul;
         switchTab('catalog_tab_a', 'showCatalogTab(1)')
      }
   );*/
   
   detectMainTabRLClick()   
}

function onSlidePanelImageClick(key)
{
   slide_counter = key;
   $('#main_tab_big_image_div').css("opacity", "0");
   $('#main_tab_big_image_div').html("<a id='main_tab_big_image_a' href='javascript:void(0)'></a>");
   $('#main_tab_big_image_a').html(aImages[slide_counter]);
   $('#slide_panel_image_'+slide_counter).width(390);
   $('#slide_panel_image_'+slide_counter).height(325);
   $('#main_tab_big_image_div').animate({opacity:"1"}, 200);
   $('#slide_show_item_title_div').html(main_tab_data_obj[key].title);
   $('#slide_show_item_size_div').html("Размеры: "+main_tab_data_obj[key].size);
   $('#slide_show_item_price_div').html("Цена: "+main_tab_data_obj[key].retail_price+" руб. (-5%)");
   $('#main_tab_big_image_a').unbind("click");
   
   $('#main_tab_big_image_a').bind
   (
      "click",
      function()
      {
         if (cur_active_tab_id == "main_tab_a")
         {
            product_page_is_showing = 1;
            cur_articul = main_tab_data_obj[key].articul;
            switchTab('catalog_tab_a', 'showCatalogTab(1)')
         }
      }
   );   
   
   $('#buy_button_a').unbind("click");
   
   $('#buy_button_a').bind
   (
      "click",
      function()
      {
         if (cur_active_tab_id == "main_tab_a")
         {
            product_page_is_showing = 1;
            cur_articul = main_tab_data_obj[key].articul;
            switchTab('catalog_tab_a', 'showCatalogTab(1)')
         }
      }
   );
}
