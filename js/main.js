var test_mode = 1; // testing or stable
var cur_active_tab; // текущая активная вкладка (объект)
var cur_active_tab_id = ""; // текущая активная вкладка (id)
var DS_intvl = 0; // интервал для снятия позиции скроллинга окна ВК
var scroll_top = 0; // позиция скроллинга окна ВК
var CH_intvl = 0; // интервал для подгонки высоты окна приложения под контент
var cur_articul = -1; // артикул просматриваемой в данный момент клиентом модели
var post_url = "./php/main.php"; // url для ajax-запросов
var similar_articules_were_showed = 0; // кросс-ссылки были показаны (да/нет)
var product_page_is_showing = 0; // страница продукта в данный момент открыта
var viewer_id = -1; // ВК ID просматривающего приложение
var viewer_name = -1; // ВК имя просматривающего приложение
var viewer_sex = -1; // пол посетителя
var hash = -1; // хэш приложения, взятый при его открытии 
var social_intvl = 0; // интервал для выдачи Панели социализации. Нужен чтобы выдавать эту панель не сразу, чтобы можно было листать вправо-влево без задержек
var current_catalog_data_obj_key = -1; // текущий ключ объекта каталога. т.е. именно артикул, расположенный по этому ключу, сейчас просматривает юзер
var click_category_from_main_tab = 0; // категория на Боковой панели ьыла кликнута (да/нет)
var slide_counter = 22; // счетчик слайдов на Главной вкладке
var cur_side_panel_category = null; // текущая выбранная категория боковой панели
var cur_main_side_panel_category = null;
var current_selected_size = ""; // текущий выбранный размер ноги
var tumbler = 0;
var code_evaled; // результат eval для IE
var catalog_data_obj = []; // объект каталога. здесь хранятся все артикулы (инфо о них), считанные с сервера
var bImages = []; // кэш для изображений каталога
var main_tab_data_obj = []; // объект главной вкладки. тут хранятся все артикулы, выводимые на главной вкладке
var aImages = []; // кэш для изображений главной вкладки
var sql_params = []; // массив для сбора sql-параметров для выборки по нажатию категорри на Боковой панели
var catalogs_path = "http://m.cherdack.ru/vkapp/catalogs";
var cImages = []; //images for order process progress
var started_from_product = 0; // 1 if app was started from product page and 0 if started from catalog page (without hash)

$(document).ready
(
   function()
   {
      if (!detectBrowser())
         init();
      else
         onBrowserUnsupported();
   }
);

function init()
{     
   $('#wrapper_div').show();
   setDOMevents();

   accordion($('#type_2_a'), $('#side_panel_2_div'));
   accordion($('#2_subcategory_0_a'), $('#2_subcategory_0_div'));
   accordion($('#2_subcategory_1_a'), $('#2_subcategory_1_div'));

   accordion($('#type_1_a'), $('#side_panel_1_div'));
   accordion($('#1_subcategory_0_a'), $('#1_subcategory_0_div'));
   accordion($('#1_subcategory_1_a'), $('#1_subcategory_1_div'));
   accordion($('#1_subcategory_2_a'), $('#1_subcategory_2_div'));
   accordion($('#1_subcategory_3_a'), $('#1_subcategory_3_div'));
   accordion($('#1_subcategory_4_a'), $('#1_subcategory_4_div'));
   accordion($('#1_subcategory_5_a'), $('#1_subcategory_5_div'));
   
   accordion($('#type_3_a'), $('#side_panel_3_div'));
   accordion($('#3_subcategory_0_a'), $('#3_subcategory_0_div'));
   
   accordion($('#type_0_a'), $('#side_panel_0_div'));
   accordion($('#0_subcategory_0_a'), $('#0_subcategory_0_div'));
   accordion($('#0_subcategory_1_a'), $('#0_subcategory_1_div'));
   accordion($('#0_subcategory_2_a'), $('#0_subcategory_2_div'));

   createCatalogGrid();
   crossBrowser();
   
   cur_active_tab = $('#ship_tab_a');
   switchTab("catalog_tab_a", "showCatalogTab()");
   startHeightChanging();
   VK.addCallback("onScrollTop", onDoScrollTop);
   VK.loadParams(document.location.href);
   viewer_id = VK.params.viewer_id;
   
   onSidePanelCategoryClick('2_0_brand_nike_a');
   
   if (VK.params.hash != "") // получаем хэш из ВК-параметров
   {
      started_from_product = 1;
      hash = VK.params.hash;
      cur_articul = hash;
      switchTab("catalog_tab_a", "showCatalogTab()");
      showProductPage(hash, -1);
   }
   else
   {
      $('#side_panel_2_div').height(51);
      $('#side_panel_2_div').attr({"opened": "true"});
      sub_accordion_last_opened = $('#side_panel_2_div');
      sub_sub_accordion_last_opened = $('#2_subcategory_0_div');
      $('#2_subcategory_0_div').height(229);
      $('#2_subcategory_0_div').attr({"opened": "true"});
      var content_h2 = 0;
   
      $('#2_subcategory_0_div').parent('.parent_content').children('.accordion_header_a').each( // calculate top content height with top links
         function(){
            content_h2 += $(this).outerHeight();
         });
                  
      $('#2_subcategory_0_div').parent('.parent_content').children().children('.side_panel_spoiler_li').each( // calculate top content height with sub links
         function(){
            if ($(this).parent().attr("opened") != "false")
               content_h2 += $(this).outerHeight();
         });
   
      $('#2_subcategory_0_div').parent('.parent_content').animate({"height" : (content_h2+17)+"px"}, 400);// open this content
   }
   
   VK.api('getProfiles', // получаем имя и пол посетителя. и детектим кам ин
   {
      uids: viewer_id,
      fields: "sex"
   },
   function(data) 
   {
      if (data.response) 
      {
         viewer_name = data.response[0].first_name+" "+data.response[0].last_name;
         viewer_sex = data.response[0].sex;
         detectComeIn();
      }  
   });
}

function setDOMevents() // задаёт события для DOM-элементов приложения
{  
   $('#by_type_1_a').click
   (
      function()
      {
         onMainSidePanelCategoryClick("by_type_1_a");
         $('.side_panel_div').css({"opacity":0});
         $('.side_panel_div').hide();
         $('#side_panel_1_div').show();
         $('#side_panel_1_div').animate({opacity:1}, 300);
      }
   );
   
   $('#by_type_2_a').click
   (
      function()
      {
         onMainSidePanelCategoryClick("by_type_2_a");
         $('.side_panel_div').css({"opacity":0});
         $('.side_panel_div').hide();
         $('#side_panel_2_div').show();
         $('#side_panel_2_div').animate({opacity:1}, 300);
      }
   );
   
   $('#by_type_0_a').click
   (
      function()
      {
         onMainSidePanelCategoryClick("by_type_0_a");
         $('.side_panel_div').css({"opacity":0});
         $('.side_panel_div').hide();
         $('#side_panel_0_div').show();
         $('#side_panel_0_div').animate({opacity:1}, 300);
      }
   );
   
   $('#by_type_accessories_a').click
   (
      function()
      {
         onMainSidePanelCategoryClick("by_type_accessories_a");
         $('.side_panel_div').css({"opacity":0});
         $('.side_panel_div').hide();
         $('#side_panel_accessories_div').show();
         $('#side_panel_accessories_div').animate({opacity:1}, 300);
      }
   );
   
   $('#search_input').focus
   (
      function()
      {
         onSearchInputFocus();
         detectSearchClick();
      }
   );

   $('#search_input').blur
   (
      function()
      {
         onSearchInputBlur();
      }
   );
   
   $('#search_input').keyup
   (
      function()
      {
         search($(this).val());
      }
   );
   
   $('#about_us_a').click(function()
   {
      $('#content_div').html(about_us_text);
   });
   
   $('#privacy_policy_a').click(function()
   {
      $('#content_div').html(privacy_policy_text);
   });
}

function onMainSidePanelCategoryClick(this_id) // событие по клику на категории на главной боковой панели
{
   turnMainSidePanelCategory(this_id);
}

function turnMainSidePanelCategory(category_li_id) // событие по клику на категории на вспомогательной боковой панели
{
   var elem = $('#'+category_li_id);
   
   if (cur_main_side_panel_category != null)
   {
      cur_main_side_panel_category.removeClass("main_side_panel_spoiler_li_active");
      cur_main_side_panel_category.attr("turned_on") == "false";
   }
   
   elem.addClass("main_side_panel_spoiler_li_active");
   elem.attr("turned_on") == "true";
   cur_main_side_panel_category = elem;
}

function onSidePanelCategoryClick(this_id) // событие по клику на категории на боковой панели
{
   sql_params = [];
   var sql_params_object = {};
   
   if (cur_active_tab_id != "catalog_tab_a") // switching to Catalog tab if not switched
   {
      click_category_from_main_tab = 1;
      switchTab('catalog_tab_a', 'showCatalogTab(0)')
   }
   
   if (product_page_is_showing)
   {
      backToCatalog();
   }
   
   turnSidePanelCategory(this_id);   
   var active_spoiler = $('.side_panel_spoiler_li_active');
   
   //########### parsing accordion tab for params
   
   var b = this_id.split("_");
   var type = b[0];
   var subtype = b[1];
   var param = b[2];
   var value = b[3];
   
   //############################################
   
   if (param == "gender")
   {
      sql_params.push("gender|"+value);
      sql_params.push("gender|b");
   }
   else
   {
      sql_params.push(param+"|"+value);
   }
   
   sql_params.push("product_type|"+type);
   sql_params.push("product_subtype|"+subtype);
  
   for(i in sql_params)
   {
      sql_params_object[i] = sql_params[i];
   }
   
   startLoader();
   getCatalogData(JSON.stringify(sql_params_object));
}

function turnSidePanelCategory(category_li_id) // событие по клику на категории на боковой панели
{
   var elem = $('#'+category_li_id);
   
   if (cur_side_panel_category != null)
   {
      cur_side_panel_category.removeClass("side_panel_spoiler_li_active");
      cur_side_panel_category.attr("turned_on") == "false";
   }
   
   elem.addClass("side_panel_spoiler_li_active");
   elem.attr("turned_on") == "true";
   cur_side_panel_category = elem;
}