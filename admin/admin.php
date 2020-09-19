<?php

session_start();

if (isset($_SESSION['user_id'])) {
    echo '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
   <head>
      <link rel="stylesheet" type="text/css" href="css/main.css"  />
		<link type="text/css" href="jq/css/smoothness/jquery-ui-1.8.21.custom.css" rel="stylesheet" />
		<script type="text/javascript" src="jq/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="jq/js/jquery-ui-1.8.21.custom.min.js"></script>
   </head>
   <body>
      <div id="side_panel_div" class="side_panel">
		   <div id="accordion_div">
			   <div>
				   <h3><a href="#">Клиенты</a></h3>
				   <div>
				      <button id="user_monitor_a" class="side_panel_button" onclick="startUserMonitor()">Монитор клиентской активности</button>
				      <button id="touch_system_a" class="side_panel_button" onclick="startTouchSystem()">Система касания клиентов</button>
				      <button id="hot_system_a" class="side_panel_button" onclick="startHotSystem()">Система "горячих" клиентов</button>
				      <!--<button id="clients_a" class="side_panel_button" onclick="buildClientsForm()">База покупателей</button>-->
                  <button id="client_troubles_a" class="side_panel_button" onclick="buildClientTroublesForm()">Проблемы пользователей приложения</button>
                  <button id="client_questions_a" class="side_panel_button" onclick="buildClientQuestionsForm()">Вопросы #задайвопрос</button>
				   </div>
			   </div>
			   <div>
				   <h3><a href="#">Каталог</a></h3>
				   <div>
                  <button id="add_articul_a" class="side_panel_button" onclick="showAddArticulForm()">Добавить новый товар</button>
				      <button id="similar_articules_a" class="side_panel_button" onclick="defineSimilarArticulesForArticul()">Перекрёстные ссылки товара</button>
				      <button id="edit_catalog_a" class="side_panel_button" onclick="buildEditCatalogForm()">Каталог</button>
                  <button id="nal_catalog_a" class="side_panel_button" onclick="buildNalCatalogForm()">Каталог В НАЛИЧИИ</button>
				      <button id="edit_articules_a" class="side_panel_button" onclick="buildEditArticulesForm()">Цены</button>
                  <button id="random_cross_links_a" class="side_panel_button" onclick="buildRandomCrossLinksForm()">Пересчитать Кросс-ссылки</button>
				      <!--<button id="sold_artcules_a" class="side_panel_button" onclick="buildSoldArticulesForm()">База проданных артикулов</button>-->
				      <!--<button id="questions_a" class="side_panel_button" onclick="buildQuestionsForm()">Вопросы пользователей</button>-->
				   </div>
			   </div>
			   <div>
				   <h3><a href="#">Коммерция</a></h3>
				   <div>
				      <button id="cart_a" class="side_panel_button" onclick="buildCartForm()">Корзина</button>
				      <button id="cart_notify_center_a" class="side_panel_button" onclick="buildCartNotifyCenterForm()">Уведомления корзины</button>
				      <button id="change_prices_a" class="side_panel_button" onclick="buildChangePricesForm()">Изменить цены поставщиков</button>
				   </div>
			   </div>
			   <div>
				   <h3><a href="#">Утилиты</a></h3>
				   <div>
				      <button id="images_a" class="side_panel_button" onclick="timestampFromDate()">Конверт timestamp->дата</button>
				      <button id="convert_a" class="side_panel_button" onclick="buildConvertForm()">Конверт $->рубль</button>
				      <button id="s_a" class="side_panel_button" onclick="buildSForm()">Зачёркиватель</button>
				   </div>
			   </div>
		   </div>
      </div>
      <div id="content_div" >
      </div>
      <script type="text/javascript" src="js/main.js" ></script>
      <script type="text/javascript" src="js/color_system.js" ></script>
      <script type="text/javascript" src="js/client_troubles.js" ></script>
      <script type="text/javascript" src="js/tracking_system.js" ></script>
      <script type="text/javascript" src="js/error.js" ></script>
      <script type="text/javascript" src="js/articules.js" ></script>      
      <script type="text/javascript" src="js/cart_notify_center.js" ></script>
      <script type="text/javascript" src="js/delivery_notify_center.js" ></script>
      <script type="text/javascript" src="js/sold.js" ></script>
      <script type="text/javascript" src="js/client.js" ></script>
      <script type="text/javascript" src="js/cart.js" ></script>
      <script type="text/javascript" src="js/questions.js" ></script>
      <script type="text/javascript" src="js/catalog.js" ></script>
      <script type="text/javascript" src="js/nal_catalog.js" ></script>
      <script type="text/javascript" src="js/convert.js" ></script>
      <script type="text/javascript" src="js/s.js" ></script>
      <script type="text/javascript" src="js/colors.js" ></script>
      <script type="text/javascript" src="js/user_monitor.js" ></script>
      <script type="text/javascript" src="js/touch_system.js" ></script>
      <script type="text/javascript" src="js/hot_system.js" ></script>
      <script type="text/javascript" src="js/change_prices.js" ></script>
      <script type="text/javascript" src="js/add_articul.js" ></script>
      <script type="text/javascript" src="js/utils.js" ></script>
      <script type="text/javascript" src="js/client_questions.js" ></script>
      <script type="text/javascript" src="js/set_cross_links.js" ></script>
      <script type="text/javascript" src="../js/json.js" ></script>
   </body>
</html>
';
}
else 
{
    header('Location: http://app.po-sportu.ru/admin');
}

?>
