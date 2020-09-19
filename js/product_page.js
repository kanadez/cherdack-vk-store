var cur_select_size_element_id = -1;

function onAdvImageLoaded(){ // helps check complete load of image
   $('#product_page_adv_images_div').append("<div class='product_advanced_image'><a id='"+$(this).attr("id")+"_a' href='javascript:void(0)' onclick='onAdvProductImageClick(\""+$(this).attr("id")+"\")'></a></div>");
   $('#'+$(this).attr("id")+'_a').html($(this));
   $(this).css({"width":"50px", "height":"42px"});
}

function onAdvImageLoadError(){ // helps check error loading of image
   $('#product_page_adv_images_div').append("<div class='product_advanced_image'><a id='"+$(this).attr("id")+"_a' href='javascript:void(0)'></a></div>");
}

function showProductPage(articul, key){ // показывает страницу товара articul - артикул товара, key - ключ в массиве catalog_data_obj, in_stock - есть товар в наличии или нет. 1 или 0, product_type - тип товара,0 1 2 3. одежда обувь кепки аксессуары
// product types: 0 - headwear, 1 - clothing, 2 - shoes, 3 - accessories
   clearInterval(social_intvl); // clearing social panel waiting interval
   similar_articules_were_showed = 0; // cross links were not showed
   product_page_is_showing = 1;
   VK.callMethod("setLocation", articul); // set articul as hash
   
   if (key != -1)
      current_catalog_data_obj_key = key; // if hash is there show articul page by hash
      
   startLoader(); // start showing loader indicator
   
   $.post(post_url, // get product data from server
   { 
      a: "gPD",
      b: articul
   }, 
   function (result){
      var obj = eval("(" + result + ")"); // eval result to object
      var product_data = eval("(" + obj[0] + ")");
      var price_obj = eval("(" + obj[1] + ")");
      var product_type = product_data.type;
      var retail_price = price_obj["retail_price"];
      var end_price = price_obj["end_price"]; 
      
      $('#content_div').html("<div id='product_page_div' style='width:100%; height:auto; color:#222;'></div>");
      $('#product_page_div').html("<div id='colors_select_clicked_div' style='width:628px; border: solid 1px #000; text-align:center; background: #6EC554; border: 1px solid #3D8327; color: #FFFFFF; margin-top: 10px; display:none; opacity:0.8; margin-left: 10px;'><p>В течение нескольких часов Вам отпишет наш консультант <a href='http://vkontakte.ru/po.sportu_id3' target='_blank' class='text_link'>Катя</a> и покажет все имеющиеся для Вас цвета. Возможность самостоятельного просмотра других расцветок ещё не реализована. Приносим извинения за временные неудобства.</div>");         
      
      if (!started_from_product)
         $('#product_page_div').append("<div id='back_to_catalog_div' onclick='backToCatalog()'><img id='back_to_catalog_arrow_img' src='./img/back_arrow.png' /><a id='back_to_catalog_a' class='text_link' href='javascript:void(0)'>Назад в каталог</a></div>");
      
      $('#product_page_div').append("<div id='product_title_div' class='lighted_text'>"+product_data.title+"</div>");
      $('#product_page_div').append("<div id='product_desc_div'>"+product_data.desc+"</div>");
      $('#product_page_div').append("<div id='product_page_adv_images_div' style='float:left; width:auto; height:150px; width:50px;'></div>");
      
      //############################# checink advanced images for existing
      var adv_images = [];
      adv_images[0] = new Image();
      adv_images[0].id = "product_advanced_image_1";
      adv_images[0].onload = onAdvImageLoaded;
      adv_images[0].onerror = onAdvImageLoadError;
      adv_images[0].src = catalogs_path+"/"+product_data.brand+"/"+product_data.articul+"/main_1.jpg";
      
      adv_images[1] = new Image();
      adv_images[1].id = "product_advanced_image_2";
      adv_images[1].onload = onAdvImageLoaded;
      adv_images[1].onerror = onAdvImageLoadError;
      adv_images[1].src = catalogs_path+"/"+product_data.brand+"/"+product_data.articul+"/main_2.jpg";
      
      adv_images[2] = new Image();
      adv_images[2].id = "product_advanced_image_3";
      adv_images[2].onload = onAdvImageLoaded;
      adv_images[2].onerror = onAdvImageLoadError;
      adv_images[2].src = catalogs_path+"/"+product_data.brand+"/"+product_data.articul+"/main_3.jpg";      
      //####################################################################
      
      $('#product_page_div').append("<div id='product_image_div'></div>"); 
      
      if (started_from_product == 0){
         $('#product_image_div').html(bImages[current_catalog_data_obj_key]);
         
         $('#product_page_div').append("<a id='left_product_page_a' href='javascript:void(0)'><img src='./img/left_arrow_long.png' id='left_product_page_img' class='arrow_long' style='left: 156px;' /></a>");   
         $('#left_product_page_a').click(function(){
            leftProductPage();
         });
         
         $('#product_page_div').append("<a id='right_product_page_a' href='javascript:void(0)'><img src='./img/right_arrow_long.png' id='product_image_img' class='arrow_long' style='left: 750px;' /></a>");   
         $('#right_product_page_a').click(function()
         {
            rightProductPage();
         });
      }
      else{
         main_image = new Image();
         main_image.id = "product_image_img";
         main_image.src = catalogs_path+"/"+product_data.brand+"/"+product_data.articul+"/main.jpg";
         $('#product_image_div').html(main_image);
      }
      
      $('#product_image_img').css({"width":"390px", "height":"325px"});
      $('#product_page_div').append("<div id='product_size_div' style='font-size:12px; margin-top:10px;' ><span style='width: 13px; height: 13px; float: left; background: url(./img/shoe_size_icon_small.png) no-repeat scroll 0% 0% transparent;'></span><span id='product_size_span' style='margin-left:5px;'></span></div>");
      $('#product_size_div').hide();
      
      if (retail_price)
         $('#product_page_div').append("<div id='product_price_div'><span style='font-size:20px;' class='shadowed_text'>"+retail_price+" руб.</span></div>");
      else
         $('#product_page_div').append("<div id='product_price_div' style='font-size:12px; margin-top:10px'>Ошибка цены.</div>");
        
      //###################################### building specifications for in-stock articules
      if (product_data.in_stock == 1)
         $('#product_page_div').append("<div id='product_state_div'><span style='width:13px; height:13px; float:left; background:url(./img/check_in_stock_small.png) no-repeat;'></span><span style='margin-left:5px;'>Есть в наличии</span></div>");
      else
         $('#product_page_div').append("<div id='product_state_div'><span id='product_state_icon_span'></span><span style='margin-left:5px;' class='lighted_text'>Доступно под заказ</span></div>");
      //###################################################################################
      
      //#################################### detecting matching size select
      $('#product_page_div').append("<div id='product_size_select_div'></div>");
      
      if (product_data.in_stock == 0)
      {
         if (product_type == 0){ // if product is shoes
            if (product_data.gender == "m"){
               $('#product_size_select_div').html(men_sizes_select_element);            
               $('#men_sizes_select').change(function(){
                  onSizesSelectChange(product_data.brand, "men_sizes_select-button", product_data.articul);
               });            
               $('#men_sizes_select').selectmenu({maxHeight: 300, width:184});
            }
            else if (product_data.gender == "f"){
               $('#product_size_select_div').html(women_sizes_select_element);           
               $('#women_sizes_select').change(function(){
                  onSizesSelectChange(product_data.brand, "women_sizes_select-button", product_data.articul);
               });            
               $('#women_sizes_select').selectmenu({maxHeight: 300, width:184});
            }    
            else if (product_data.gender == "b"){
               $('#product_size_select_div').html(both_sizes_select_element);            
               $('#both_sizes_select').change(function(){
                  onSizesSelectChange(product_data.brand, "both_sizes_select-button", product_data.articul);
               });            
               $('#both_sizes_select').selectmenu({maxHeight: 300, width:184});
            }
         }
         else if (product_type == 1){ // if product is cloth
            $('#product_size_select_div').html(cloth_sizes_select_element);            
            $('#cloth_sizes_select').change(function(){
               onSizesSelectChange(product_data.brand, "cloth_sizes_select-button", product_data.articul);
            });            
            $('#cloth_sizes_select').selectmenu({maxHeight: 300, width:184});
         }
         else{
            $('#product_size_select_div').hide();
         }
      }
      else{
         var in_stock_cloth_sizes_select = "<select id='cloth_sizes_select' style='float:left;'><option>Выбрать размер</option><option>"+product_data.size+"</option></select>";
         var in_stock_shoes_sizes_select = "<select id='men_sizes_select' style='float:left;'><option>Выбрать размер</option><option>"+product_data.size+"</option></select>";
         
         if (product_type == 0){ // if product is shoes
            $('#product_size_select_div').html(in_stock_shoes_sizes_select);            
            $('#men_sizes_select').change(function(){
               onSizesSelectChange(product_data.brand, "men_sizes_select-button", product_data.articul);
            });
            $('#men_sizes_select').selectmenu({maxHeight: 300, width:184});
         }
         else if (product_type == 1){ // if product is cloth
            $('#product_size_select_div').html(in_stock_cloth_sizes_select);            
            $('#cloth_sizes_select').change(function(){
               onSizesSelectChange(product_data.brand, "cloth_sizes_select-button", product_data.articul);
            });            
            $('#cloth_sizes_select').selectmenu({maxHeight: 300, width:184});
         }else{
            $('#product_size_select_div').hide();
         }
      }
      //####################################################################
      
      $('#product_page_div').append("<button id='order_buy_button_a' class='cupid-green'>Добавить в корзину</button>");  // order button click    
      $('#order_buy_button_a').css({"margin-bottom":"21px"});
      $('#order_buy_button_a').bind("click", function(event){
         detectOrderButtonClick();
         
         if (!highlightIfSizeNotSelected())
            addToCart(cur_articul, current_selected_size);
      });
      
      $('#product_page_div').append("<a id='ask_question_button_a' href='javascript:void(0)' style='padding:10px 11px;' class='button'>Задать вопрос консультанту</a>");
      $('#ask_question_button_a').bind("click", function(event){
         //detectOrderButtonClick();
         
         $('#content_div').html("<div style='text-align:center; margin-top:176px;'><span style='color:#333;'>Чтобы задать вопрос нашему консультанту, просто напишите ей сообщение ВК.</span><p><div style='margin-top:40px'><a id='to_cart_a' class='button' target='_blank' href='http://vk.com/id89431117'>Перейти на ВК-страницу консультанта</a><div></div>");
      });
      
      //################################## building cross links
      $('#product_page_div').append("<div id='cross_links_label_div' class='lighted_text'>Вам также могут понравиться:</div>");
      $('#product_page_div').append("<div id='product_page_floor_panel_div' style='float:left; width:auto; height:auto; margin-left:-5px;'></div>");
      $('#product_page_floor_panel_div').append("<div class='product_similar_image'><a id='product_similar_image_1_a' href='javascript:void(0)' style='width:121px; height:100px;'><img id='product_similar_image_1_img' src='' style='width:121px; height:100px;'/></a></div>");
      $('#product_page_floor_panel_div').append("<div class='product_similar_image'><a id='product_similar_image_2_a' href='javascript:void(0)' style='width:121px; height:100px;'><img id='product_similar_image_2_img' src='' style='width:121px; height:100px;'/></a></div>");
      $('#product_page_floor_panel_div').append("<div class='product_similar_image'><a id='product_similar_image_3_a' href='javascript:void(0)' style='width:121px; height:100px;'><img id='product_similar_image_3_img' src='' style='width:121px; height:100px;'/></a></div>");
      $('#product_page_floor_panel_div').append("<div id='social_panel_div'></div>");
      $('#social_panel_div').append("<div id='vk_like'></div>");
      $('#social_panel_div').append("<div id='fb_like'><iframe src='//www.facebook.com/plugins/like.php?locale=ru_RU&amp;href=http%3A%2F%2Fapp.po-sportu.ru%2F%23"+product_data.articul+"&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:450px; height:21px;' allowTransparency='true'></iframe></div>");
      
      $.post(post_url, // bulding cross-links
      {
         a: "gSAD",
         b: product_data.articul
      }, 
      function (result){
         var obj = eval("(" + result + ")");         
         var array1 = obj[0].split("|");
         $('#product_similar_image_1_img').attr("src", ""+catalogs_path+"/"+array1[1]+"/"+array1[0]+"/main.jpg");         
         $('#product_similar_image_1_a').click(function(){
            detectUMayAlsoLikeImageClick();
            bImages[current_catalog_data_obj_key] = new Image();
            bImages[current_catalog_data_obj_key].id = "product_image_img";
            bImages[current_catalog_data_obj_key].src = ""+catalogs_path+"/"+catalog_data_obj[current_catalog_data_obj_key].brand+"/"+catalog_data_obj[current_catalog_data_obj_key].articul+"/main.jpg";
            bImages[current_catalog_data_obj_key].style = "width:390px; height:325px;";
            
            for (var i = 0; i < catalog_data_obj.length; i++)
               if (catalog_data_obj[i].articul == array1[0]){    
                  current_catalog_data_obj_key = i;
                  tumbler = 1;
               }
            
            renewProductPage(array1[0]);
         });    
         
         var array2 = obj[1].split("|");
         $('#product_similar_image_2_img').attr("src", ""+catalogs_path+"/"+array2[1]+"/"+array2[0]+"/main.jpg");
         $('#product_similar_image_2_a').click(function(){     
            detectUMayAlsoLikeImageClick();
            bImages[current_catalog_data_obj_key] = new Image();
            bImages[current_catalog_data_obj_key].id = "product_image_img";
            bImages[current_catalog_data_obj_key].src = ""+catalogs_path+"/"+catalog_data_obj[current_catalog_data_obj_key].brand+"/"+catalog_data_obj[current_catalog_data_obj_key].articul+"/main.jpg";
            bImages[current_catalog_data_obj_key].style = "width:390px; height:325px;";
            var tumbler = 0;
            
            for (var i = 0; i < catalog_data_obj.length; i++)
               if (catalog_data_obj[i].articul == array2[0]){    
                  current_catalog_data_obj_key = i;
                  tumbler = 1;
               }
               
            renewProductPage(array2[0]);
         });         
         
         var array3 = obj[2].split("|");
         $('#product_similar_image_3_img').attr("src", ""+catalogs_path+"/"+array3[1]+"/"+array3[0]+"/main.jpg");        
         $('#product_similar_image_3_a').click(function(){  
            detectUMayAlsoLikeImageClick();
            bImages[current_catalog_data_obj_key] = new Image();
            bImages[current_catalog_data_obj_key].id = "product_image_img";
            bImages[current_catalog_data_obj_key].src = ""+catalogs_path+"/"+catalog_data_obj[current_catalog_data_obj_key].brand+"/"+catalog_data_obj[current_catalog_data_obj_key].articul+"/main.jpg";
            bImages[current_catalog_data_obj_key].style = "width:390px; height:325px;";
            
            for (var i = 0; i < catalog_data_obj.length; i++)
               if (catalog_data_obj[i].articul == array3[0]){
                  current_catalog_data_obj_key = i;
                  tumbler = 1;
               }
               
            renewProductPage(array3[0]);
         });
      });
      //#######################################################
      
      //################################# building social panel
      VK.Widgets.Like("vk_like", {type: "button"}, product_data.articul);
      $('#product_page_div').append("<div id='leave_comment_label_div' class='lighted_text'>Есть вопросы об этом товаре? Пишите в комментах, на всё ответим:</div>");
      $('#product_page_div').append("<div id='vk_comments'></div>");
      VK.Widgets.Comments('vk_comments', {limit: 5, width: '640', attach: '*', autoPublish: 0}, product_data.articul);      
      stopLoader();
      //#######################################################
      
      if (current_catalog_data_obj_key == -1){
         current_catalog_data_obj_key = 1;
         createCatalogGrid();
      }
      
      started_from_product = 0;
   });
}

function onAdvProductImageClick(image_id){ // событие по клику на доп. изображении товара
   $('#product_image_img').attr("src", $('#'+image_id).attr("src"));
}

function onSizesSelectChange(brand, select_element_id, articul){ // событие по изменению размера ноги
   current_selected_size = $('#'+select_element_id).children('span').text();
}

function rightProductPage(){ // листает товар вправо на странице продукта
   if (current_catalog_data_obj_key < catalog_data_obj.length - 1)
      current_catalog_data_obj_key++;
   else
      current_catalog_data_obj_key = 0;
   
   cur_articul = catalog_data_obj[current_catalog_data_obj_key].articul;
   renewProductPage(catalog_data_obj[current_catalog_data_obj_key].articul);
   detectProductPageRLClick();
}

function leftProductPage(){ // листает товар влево на странице продукта
   if (current_catalog_data_obj_key > 0)
      current_catalog_data_obj_key--;
   else
      current_catalog_data_obj_key = catalog_data_obj.length - 1;
   
   cur_articul = catalog_data_obj[current_catalog_data_obj_key].articul;
   renewProductPage(catalog_data_obj[current_catalog_data_obj_key].articul);
   detectProductPageRLClick();
}

function renewProductPage(articul){
   cur_articul = articul;
   similar_articules_were_showed = 0;
   product_page_is_showing = 1;
   VK.callMethod("setLocation", articul);

   $.post(post_url,{
         a: "gPD",
         b: articul
      }, 
      function (result){
         var obj = eval("(" + result + ")");
         var product_data = eval("(" + obj[0] + ")");
         var price_obj = eval("(" + obj[1] + ")");
         var retail_price = price_obj["retail_price"];
         var product_type = product_data.type;
         var end_price = price_obj["end_price"];
         $('#product_title_div').html(product_data.title);
         $('#product_desc_div').html(product_data.desc);
         
         //############################# checkink advanced images for existing
         $('#product_page_adv_images_div').html("");         
         var adv_images = [];
         adv_images[0] = new Image();
         adv_images[0].id = "product_advanced_image_1";
         adv_images[0].onload = onAdvImageLoaded;
         adv_images[0].onerror = onAdvImageLoadError;
         adv_images[0].src = catalogs_path+"/"+product_data.brand+"/"+product_data.articul+"/main_1.jpg";
         
         adv_images[1] = new Image();
         adv_images[1].id = "product_advanced_image_2";
         adv_images[1].onload = onAdvImageLoaded;
         adv_images[1].onerror = onAdvImageLoadError;
         adv_images[1].src = catalogs_path+"/"+product_data.brand+"/"+product_data.articul+"/main_2.jpg";
         
         adv_images[2] = new Image();
         adv_images[2].id = "product_advanced_image_3";
         adv_images[2].onload = onAdvImageLoaded;
         adv_images[2].onerror = onAdvImageLoadError;
         adv_images[2].src = catalogs_path+"/"+product_data.brand+"/"+product_data.articul+"/main_3.jpg";      
         //####################################################################
         
         if (tumbler == 1){
            $('#product_image_div').html(bImages[current_catalog_data_obj_key]);
            tumbler = 0;
         }
         else{
            $('#product_image_div').html("<img src='"+catalogs_path+"/"+product_data.brand+"/"+product_data.articul+"/main.jpg' id='product_image_img' style='width:390px; height:325px' /></div>");
         }
         
         $('#product_image_div').show();
         $('#product_image_img').show();
         $('#product_image_img').width(390);
         $('#product_image_img').height(325);
         //############################# detecting matching size selector
         
         if (product_data.in_stock == 0){
            if (product_type == 0){ // if product is shoes
               $('#product_size_select_div').show();
               
               if (product_data.gender == "m"){
                  $('#product_size_select_div').html(men_sizes_select_element);
                  $('#men_sizes_select').change(function(){
                        onSizesSelectChange(product_data.brand, "men_sizes_select-button", product_data.articul)
                     }
                  );
                  $('#men_sizes_select').selectmenu({maxHeight: 300, width:184});
               }
               else if (product_data.gender == "f"){
                  $('#product_size_select_div').html(women_sizes_select_element);
                  $('#women_sizes_select').change(function(){
                        onSizesSelectChange(product_data.brand, "women_sizes_select-button", product_data.articul)
                     }
                  );
                  $('#women_sizes_select').selectmenu({maxHeight: 300, width:184});
               }
               else if (product_data.gender == "b"){
                  $('#product_size_select_div').html(both_sizes_select_element);
                  $('#both_sizes_select').change(function(){
                        onSizesSelectChange(product_data.brand, "both_sizes_select-button", product_data.articul)
                     }
                  );
                  $('#both_sizes_select').selectmenu({maxHeight: 300, width:184});
               }
            }
            else if (product_type == 1){ // if product is cloth
               $('#product_size_select_div').show();
               $('#product_size_select_div').html(cloth_sizes_select_element);            
               $('#cloth_sizes_select').change(function(){
                  onSizesSelectChange(product_data.brand, "cloth_sizes_select-button", product_data.articul);
               });
               $('#cloth_sizes_select').selectmenu({maxHeight: 300, width:184});
            }
            else{
               $('#product_size_select_div').hide();
            }
         }
         else{
            var in_stock_cloth_sizes_select = "<select id='cloth_sizes_select' style='float:left;'><option>Выбрать размер</option><option>"+product_data.size+"</option></select>";
            var in_stock_shoes_sizes_select = "<select id='men_sizes_select' style='float:left;'><option>Выбрать размер</option><option>"+product_data.size+"</option></select>";
            
            if (product_type == 0){ // if product is shoes
               $('#product_size_select_div').show();
               $('#product_size_select_div').html(in_stock_shoes_sizes_select);
               $('#men_sizes_select').change(function(){
                     onSizesSelectChange(product_data.brand, "men_sizes_select-button", product_data.articul)
                  }
               );
               $('#men_sizes_select').selectmenu({maxHeight: 300, width:184});
            }
            else if (product_type == 1){ // if product is cloth
               $('#product_size_select_div').show();
               $('#product_size_select_div').html(in_stock_cloth_sizes_select);
               $('#men_sizes_select').change(function(){
                     onSizesSelectChange(product_data.brand, "cloth_sizes_select-button", product_data.articul)
                  }
               );
               $('#cloth_sizes_select').selectmenu({maxHeight: 300, width:184});
            }
            else{
               $('#product_size_select_div').hide();
            }
         }
         //##############################################################
         
         if (retail_price)
            $('#product_price_div').html("<div id='product_price_div' style='margin-top:10px'><span class='shadowed_text' style='font-size:20px;'>"+retail_price+" руб.</span></div>");
         else
            $('#product_price_div').html("<div id='product_price_div' style='font-size:12px; margin-top:10px'>Ошибка цены.</div>");
            
         if (product_data.in_stock == 1)
            $('#product_state_div').html("<span style='width:13px; height:13px; float:left; background:url(./img/check_in_stock_small.png) no-repeat;'></span><span style='margin-left:5px;'>Есть в наличии</span>");
         else
            $('#product_state_div').html("<span id='product_state_icon_span'></span><span style='margin-left:5px;' class='lighted_text'>Доступно под заказ</span>");
         
         //############################# building cross links
         $('#product_page_floor_panel_div').html("<div class='product_similar_image'><a id='product_similar_image_1_a' href='javascript:void(0)' style='width:121px; height:100px;'><img id='product_similar_image_1_img' src='' style='width:121px; height:100px;'/></a></div>");
         $('#product_page_floor_panel_div').append("<div class='product_similar_image'><a id='product_similar_image_2_a' href='javascript:void(0)' style='width:121px; height:100px;'><img id='product_similar_image_2_img' src='' style='width:121px; height:100px;'/></a></div>");
         $('#product_page_floor_panel_div').append("<div class='product_similar_image'><a id='product_similar_image_3_a' href='javascript:void(0)' style='width:121px; height:100px;'><img id='product_similar_image_3_img' src='' style='width:121px; height:100px;'/></a></div>");
         $('#product_page_floor_panel_div').append("<div id='social_panel_div'></div>");
         clearInterval(social_intvl);
         social_intvl = window.setInterval("showSocialPanelContent("+product_data.articul+")", 2000);
         
         $.post(post_url, 
            {
               a: "gSAD",
               b: product_data.articul
            }, 
            function (result){
               var obj = eval("(" + result + ")");
               var array1 = obj[0].split("|");
               $('#product_similar_image_1_img').attr("src", ""+catalogs_path+"/"+array1[1]+"/"+array1[0]+"/main.jpg");               
               $('#product_similar_image_1_a').click
               (function(){
                     detectUMayAlsoLikeImageClick();
                     bImages[current_catalog_data_obj_key] = new Image();
                     bImages[current_catalog_data_obj_key].id = "product_image_img";
                     bImages[current_catalog_data_obj_key].src = ""+catalogs_path+"/"+catalog_data_obj[current_catalog_data_obj_key].brand+"/"+catalog_data_obj[current_catalog_data_obj_key].articul+"/main.jpg";
                     bImages[current_catalog_data_obj_key].style = "width:390px; height:325px;";
                     
                     for (var i = 0; i < catalog_data_obj.length; i++)
                        if (catalog_data_obj[i].articul == array1[0]){    
                           current_catalog_data_obj_key = i;
                           tumbler = 1;
                        }
                     
                     renewProductPage(array1[0]);
                  }
               );
               
               var array2 = obj[1].split("|");
               $('#product_similar_image_2_img').attr("src", ""+catalogs_path+"/"+array2[1]+"/"+array2[0]+"/main.jpg");               
               $('#product_similar_image_2_a').click(function(){
                     detectUMayAlsoLikeImageClick();
                     bImages[current_catalog_data_obj_key] = new Image();
                     bImages[current_catalog_data_obj_key].id = "product_image_img";
                     bImages[current_catalog_data_obj_key].src = ""+catalogs_path+"/"+catalog_data_obj[current_catalog_data_obj_key].brand+"/"+catalog_data_obj[current_catalog_data_obj_key].articul+"/main.jpg";
                     bImages[current_catalog_data_obj_key].style = "width:390px; height:325px;";
                     var tumbler = 0;
                     
                     for (var i = 0; i < catalog_data_obj.length; i++)   
                        if (catalog_data_obj[i].articul == array2[0]){    
                           current_catalog_data_obj_key = i;
                           tumbler = 1;
                        }
                        
                     renewProductPage(array2[0]);
                  }
               );
               
               var array3 = obj[2].split("|");
               $('#product_similar_image_3_img').attr("src", ""+catalogs_path+"/"+array3[1]+"/"+array3[0]+"/main.jpg");               
               $('#product_similar_image_3_a').click(function(){
                     detectUMayAlsoLikeImageClick();
                     bImages[current_catalog_data_obj_key] = new Image();
                     bImages[current_catalog_data_obj_key].id = "product_image_img";
                     bImages[current_catalog_data_obj_key].src = ""+catalogs_path+"/"+catalog_data_obj[current_catalog_data_obj_key].brand+"/"+catalog_data_obj[current_catalog_data_obj_key].articul+"/main.jpg";
                     bImages[current_catalog_data_obj_key].style = "width:390px; height:325px;";
                     
                     for (var i = 0; i < catalog_data_obj.length; i++)  
                        if (catalog_data_obj[i].articul == array3[0]){    
                           current_catalog_data_obj_key = i;
                           tumbler = 1;
                        }
                     
                     renewProductPage(array3[0]);
                  }
               );
               //############################################
            }
         );
      }
   );
}

function showSocialPanelContent(articul){
   clearInterval(social_intvl);
   $('#social_panel_div').append("<div id='vk_like'></div>");
   $('#social_panel_div').append("<div id='fb_like'><iframe src='//www.facebook.com/plugins/like.php?locale=ru_RU&amp;href=http%3A%2F%2Fapp.po-sportu.ru%2F%23"+articul+"&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:450px; height:21px;' allowTransparency='true'></iframe></div>");
   VK.Widgets.Like("vk_like", {type: "button"}, articul);
   $('#vk_comments').html("");
   VK.Widgets.Comments('vk_comments', {limit: 5, width: '640', attach: '*', autoPublish: 0}, articul);
}

function highlightIfSizeNotSelected(){ // hightlits size selector if size isnt selected
   if ($('#men_sizes_select-button').is(":visible")){
      if ($('#men_sizes_select-button').text() == "Выбрать размер"){
         $('#men_sizes_select-button').animate({backgroundColor: '#c36868'}, {queue:false, duration:0, complete: function(){$(this).animate({backgroundColor: '#c6c6c6'}, {queue:false, duration:1000})}})
      
         return -1;
      }
      else{
         return 0;
      }
   }
   else if ($('#women_sizes_select-button').is(":visible")){
      
      if ($('#women_sizes_select-button').text() == "Выбрать размер")
      {
         $('#women_sizes_select-button').animate({backgroundColor: '#c36868'}, {queue:false, duration:0, complete: function(){$(this).animate({backgroundColor: '#c6c6c6'}, {queue:false, duration:1000})}})
      
         return -1;
      }
      else
      {
         return 0;
      }
   }
   else if ($('#both_sizes_select-button').is(":visible")){
      if ($('#both_sizes_select-button').text() == "Выбрать размер"){
         $('#both_sizes_select-button').animate({backgroundColor: '#c36868'}, {queue:false, duration:0, complete: function(){$(this).animate({backgroundColor: '#c6c6c6'}, {queue:false, duration:1000})}})
         
         return -1;
      }
      else{
         return 0;
      }
   }
   else if ($('#cloth_sizes_select-button').is(":visible")){
      if ($('#cloth_sizes_select-button').text() == "Выбрать размер"){
         $('#cloth_sizes_select-button').animate({backgroundColor: '#c36868'}, {queue:false, duration:0, complete: function(){$(this).animate({backgroundColor: '#c6c6c6'}, {queue:false, duration:1000})}})
         
         return -1;
      }
      else{
         return 0;
      }
   }
}