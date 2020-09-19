<?php
  
class SetData
{
   function deleteClientQuestion($num){
      $sql = sprintf("DELETE FROM `ds_questions` WHERE `num` = %d",
            mysql_real_escape_string($num));
      
      return db_query($sql, __LINE__, __FILE__);
   }
   
   function setQuestionAnswerData($num, $column_name, $data){
      $sql = sprintf("UPDATE `ds_questions` SET `%s` = '%s' WHERE `num` = %d",
         mysql_real_escape_string($column_name),
         mysql_real_escape_string($data),
         mysql_real_escape_string($num));
   
	   return db_query($sql, __LINE__, __FILE__);
   }

   function deleteClientTrouble($num){
      $sql = sprintf("DELETE FROM `client_troubles` WHERE `num` = %d",
         mysql_real_escape_string($num));
         
      return db_query($sql, __LINE__, __FILE__);
   }

   function getDate()
   {
      $year = date("Y");
      $month = date("m");
      $day = date("d");
      $hours = date("H");
      $minutes = date("i");
      $cur_date[0] = $day."/".$month."/".$year;
      $cur_date[1] = $hours.":".$minutes;
      
      return $cur_date;
   }
   
   //########################################## Hot User System ########################################
   
   function editHotUser($num, $column_name, $data)
   {
      $sql = sprintf("UPDATE `hot_system` SET `%s` = '%s' WHERE `num` = %d",
            mysql_real_escape_string($column_name),
            mysql_real_escape_string($data),
            mysql_real_escape_string($num));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function deleteHotUser($num)
   {
      $sql = sprintf("DELETE FROM `hot_system` WHERE `num` = %d",
            mysql_real_escape_string($num));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   
   
   // ######################################### Customer Touch System ###################################
   
   function deleteCustomerTouchSystemCustomer($num)
   {
      $sql = sprintf("DELETE FROM `customer_touch_system` WHERE `num` = %d",
            mysql_real_escape_string($num));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function createNewCustomer($customer_object)
   {
      $decoded_object = json_decode(stripcslashes($customer_object), true);
      $sql = sprintf("INSERT INTO `customer_touch_system` (`vk_id`, `vk_name`, `direct_link`, `timestamp`) VALUES ('%s', '%s', '%s', '%s');",
            mysql_real_escape_string($decoded_object["vk_id"]),
            mysql_real_escape_string($decoded_object["vk_name"]),
            mysql_real_escape_string($decoded_object["direct_link"]),
            mysql_real_escape_string(time()));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function setNewCustomerDirectLink($link_string)
   {
      $sql = sprintf("INSERT INTO `customer_touch_system` (`vk_id`, `vk_name`, `direct_link`, `timestamp`) VALUES ('%s', '%s', '%s', '%s');",
            mysql_real_escape_string(-1),
            mysql_real_escape_string(-1),
            mysql_real_escape_string($link_string),
            mysql_real_escape_string(time()));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function editCustomer($num, $column_name, $data)
   {
      $sql = sprintf("UPDATE `customer_touch_system` SET `%s` = '%s' WHERE `num` = %d",
            mysql_real_escape_string($column_name),
            mysql_real_escape_string($data),
            mysql_real_escape_string($num));   
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   
   //########################################## ADMIN CODE #############################################//
   function setProductImagesData($articul, $data)
   {
      $sql = sprintf("UPDATE `catalog` SET `product_images_data` = '%s' WHERE `articul` = %d;",
            mysql_real_escape_string($data),
            mysql_real_escape_string($articul));   
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function setSimilarArticulesData($articul, $data)
   {
      $sql = sprintf("UPDATE `catalog` SET `similar_articules_data` = '%s' WHERE `articul` = %d;",
            mysql_real_escape_string($data),
            mysql_real_escape_string($articul));   
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function setTdInputData($articul, $size, $column_name, $data)
   {
      $sql = sprintf("UPDATE `articules` SET `%s` = '%s' WHERE `articul` = %d",
            mysql_real_escape_string($column_name),
            mysql_real_escape_string($data),
            mysql_real_escape_string($articul));   
	   
	   return db_query($sql, __LINE__, __FILE__);
   }

   function setCatalogTdInputData($num, $column_name, $data)
   {
      $sql = sprintf("UPDATE `catalog` SET `%s` = '%s' WHERE `num` = %d",
            mysql_real_escape_string($column_name),
            mysql_real_escape_string($data),
            mysql_real_escape_string($num));   
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function setCartTdInputData($num, $column_name, $data)
   {
      $sql = sprintf("UPDATE `cart` SET `%s` = '%s' WHERE `num` = %d;",
            mysql_real_escape_string($column_name),
            mysql_real_escape_string($data),
            mysql_real_escape_string($num));   
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function createNewArticul($articul_object)
   {
      $sql = "SELECT MAX(`num`) AS max_num FROM `articules`;";
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      $max_num = $result['max_num']+1;
      $decoded_object = json_decode(stripcslashes($articul_object), true);
      $sql = sprintf("INSERT INTO `articules` (`num`, `articul`, `size`, `supplier_articul`, `supplier_title`, `supplier_price_bucks`, `supplier_price_rubs`, `our_price_rubs`, `retail_price`, `end_price`, `in_stock`) VALUES (%d, %d, '%s', '%s', '%s', %f, %d, %d, %d, %d, %d);",
            mysql_real_escape_string($max_num),
            mysql_real_escape_string($decoded_object["articul"]),
            mysql_real_escape_string($decoded_object["size"]),
            mysql_real_escape_string($decoded_object["supplier_articul"]),
            mysql_real_escape_string($decoded_object["supplier_title"]),
            mysql_real_escape_string($decoded_object["supplier_price_bucks"]),
            mysql_real_escape_string($decoded_object["supplier_price_rubs"]),
            mysql_real_escape_string($decoded_object["our_price_rubs"]),
            mysql_real_escape_string($decoded_object["retail_price"]),
            mysql_real_escape_string($decoded_object["end_price"]),
            mysql_real_escape_string($decoded_object["in_stock"]));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }

   function createNewCatalogItem($catalog_item_object)
   {
      $decoded_object = json_decode(stripcslashes($catalog_item_object), true);
      $sql = sprintf("INSERT INTO `catalog` (`articul`, `title`, `desc`, `rating`, `gender`, `brand`, `sport`, `in_stock`, `similar_articules_data`, `search_queries`) VALUES (%d, '%s', '%s', %d, '%s', '%s', '%s', %d, '%s', '%s');",
            mysql_real_escape_string($decoded_object["articul"]),
            mysql_real_escape_string($decoded_object["title"]),
            mysql_real_escape_string($decoded_object["desc"]),
            mysql_real_escape_string($decoded_object["rating"]),
            mysql_real_escape_string($decoded_object["gender"]),
            mysql_real_escape_string($decoded_object["brand"]),
            mysql_real_escape_string($decoded_object["sport"]),
            mysql_real_escape_string($decoded_object["in_stock"]),
            mysql_real_escape_string($decoded_object["similar_articules_data"]),
            mysql_real_escape_string($decoded_object["search_queries"]));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function deleteArticul($articul, $size)
   {
      $sql = sprintf("DELETE FROM `articules` WHERE `articul` = %d LIMIT 1",
            mysql_real_escape_string($articul));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function deleteCatalogItem($num)
   {
      $sql = sprintf("DELETE FROM `catalog` WHERE `num` = %d",
            mysql_real_escape_string($num));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function deleteCartItem($num)
   {
      $sql = sprintf("DELETE FROM `cart` WHERE `num` = %d;",
         mysql_real_escape_string($num));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   //##############sold
   
   function setDeliveryItemSolded($num, $articul, $size)
   {
      $sql = sprintf("SELECT `supplier_price_rubs` FROM `articules` WHERE `articul` = %d;",
         mysql_real_escape_string($articul));
         
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      $price = $result["supplier_price_rubs"];
      $price_plus_ads = $price + 100;
      $price_plus_delivery = $price_plus_ads + 60;
      $price_plus_risks = $price_plus_delivery + 250;
      $price_plus_profit = $price_plus_risks + 285;
      $retail_price = $price_plus_profit*1.17;
      $num_intvaled = intval($num);
      $sql = "INSERT INTO `sold` (`num`, `articul`, `supplier_price_rubs`, `price_plus_ads`, `price_plus_delivery`, `price_plus_risks`, `price_plus_profit`, `retail_price`, `sold_price`, `profit`) VALUES ({$num_intvaled}, {$articul}, {$price}, {$price_plus_ads}, {$price_plus_delivery}, {$price_plus_risks}, {$price_plus_profit}, {$retail_price}, 0, 0);";
      db_query($sql, __LINE__, __FILE__);
      $sql = sprintf("UPDATE `cart` SET `sold` = 1 WHERE `num` = %d",
            mysql_real_escape_string($num));
      
      return db_query($sql, __LINE__, __FILE__);
   }

   function setDeliveryItemUnsolded($num)
   {
      $num_intvaled = intval($num);
      $sql = "UPDATE `cart` SET `deliver_timestamp` = 0 WHERE `num` = {$num_intvaled}";
	   
      return db_query($sql, __LINE__, __FILE__);
   }
   
   function setSoldTdInputData($num, $column_name, $data)
   {
      $sql = sprintf("UPDATE `sold` SET `%s` = '%s' WHERE `num` = %d",
            mysql_real_escape_string($column_name),
            mysql_real_escape_string($data),
            mysql_real_escape_string($num));   
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function createNewSoldArticul($articul_object)
   {
      $decoded_object = json_decode(stripcslashes($articul_object), true);
      $sql = sprintf("INSERT INTO `sold` (`articul`, `supplier_price_rubs`, `price_plus_ads`, `price_plus_delivery`, `price_plus_risks`, `price_with_discounts`, `retail_price`, `sold_price`, `profit`) VALUES (%d, %d, %d, %d, %d, %d, %d, %d, %d);",
            mysql_real_escape_string($decoded_object["articul"]),
            mysql_real_escape_string($decoded_object["supplier_price_rubs"]),
            mysql_real_escape_string($decoded_object["price_plus_ads"]),
            mysql_real_escape_string($decoded_object["price_plus_delivery"]),
            mysql_real_escape_string($decoded_object["price_plus_risks"]),
            mysql_real_escape_string($decoded_object["price_with_discounts"]),
            mysql_real_escape_string($decoded_object["retail_price"]),
            mysql_real_escape_string($decoded_object["sold_price"]),
            mysql_real_escape_string($decoded_object["profit"]));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function convertPricesToRub($currency, $fixed_margin, $margin_coef, $discount)
   {
      $sql = "select * from `articules`;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      for ($i = 0; $i < count($result); $i++)
      {
         $supplier_price_rubs = $currency*$result[$i]['supplier_price_bucks'];// цена поставщика в рублях
         
         $sql2 = "select `type` from `catalog` where `articul` = ".$result[$i]["articul"].";";
         $result2 = db_fetchone_array($sql2, __LINE__, __FILE__);
         
         if ($result2['type'] == 0)
         {
            $our_price_rubs = $supplier_price_rubs+$fixed_margin; // наша цена неокругленная
         }
         elseif ($result2['type'] == 1 || $result2['type'] == 2 || $result2['type'] == 3)
         {
            $our_price_rubs = $supplier_price_rubs*$margin_coef;
         }
         
         $retail_price = round($our_price_rubs, -1); // розничная (округленная)
         $end_price = round($retail_price*(1+($discount/100)), -1); // цена+скидка верхняя
         $num = $result[$i]['num'];
         $sql = "UPDATE `articules` SET `supplier_price_rubs` = {$supplier_price_rubs}, `our_price_rubs` = {$our_price_rubs}, `retail_price` = {$retail_price}, `end_price` = {$end_price} WHERE `num` = {$num} AND `in_stock` = 0";
         db_query($sql, __LINE__, __FILE__);
      }
      
	   return 1;//$result[6]['articul'];//db_query($sql, __LINE__, __FILE__);
   }
   
   function changeSupplierPrices($change_value, $increment) // изменяет цены поставщиков. если increment = 1 - цена увиливается. иначе уменьшается на change_value
   {
      $sql = "select * from `articules`;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      for ($i = 0; $i < count($result); $i++)
      {
         if ($increment)
         {
            $new_price = $result[$i]['supplier_price_bucks'] + $change_value;
            $num = $result[$i]['num'];
            $sql = "UPDATE `articules` SET `supplier_price_bucks` = {$new_price} WHERE `num` = {$num} AND `in_stock` = 0";
            db_query($sql, __LINE__, __FILE__);
         }
         else 
         {
            $new_price = $result[$i]['supplier_price_bucks'] - $change_value;
            $num = $result[$i]['num'];
            $sql = "UPDATE `articules` SET `supplier_price_bucks` = {$new_price} WHERE `num` = {$num} AND `in_stock` = 0";
            db_query($sql, __LINE__, __FILE__);
         }
      }
      
	   return 1;
   }

   function deleteSoldArticul($num)
   {
      $sql = sprintf("DELETE FROM `sold` WHERE `num` = %d LIMIT 1",
            mysql_real_escape_string($num));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   //##############client
   
   function setClientTdInputData($num, $column_name, $data)
   {
      $sql = sprintf("UPDATE `client` SET `%s` = '%s' WHERE `num` = %d",
            mysql_real_escape_string($column_name),
            mysql_real_escape_string($data),
            mysql_real_escape_string($num));   
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function createNewClient($articul_object)
   {
      $decoded_object = json_decode(stripcslashes($articul_object), true);
      $sql = sprintf("INSERT INTO `client` (`vk_id`, `articul`, `order_date_timestamp`, `purchase_date_timestamp`, `unique_num`) VALUES (%d, %d, %d, %d, %d);",
            mysql_real_escape_string($decoded_object["vk_id"]),
            mysql_real_escape_string($decoded_object["articul"]),
            mysql_real_escape_string($decoded_object["order_date_timestamp"]),
            mysql_real_escape_string($decoded_object["purchase_date_timestamp"]),
            mysql_real_escape_string($decoded_object["unique_num"]));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }

   function deleteClient($num)
   {
      $sql = sprintf("DELETE FROM `client` WHERE `num` = %d LIMIT 1",
            mysql_real_escape_string($num));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   //##########################cart
   
   function acceptCartItem($num)
   {
      $num_intvaled = intval($num);
      $sql = "UPDATE `cart` SET `accepted` = 1, `status` = 1 WHERE `num` = {$num_intvaled}";

	   return db_query($sql, __LINE__, __FILE__);
   }

   function acceptColor($num)
   {
      $num_intvaled = intval($num);
      $sql = "UPDATE `colors` SET `answered` = 1 WHERE `num` = {$num_intvaled};";
         
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function setOrderCame($num, $articul, $size)
   {
      $num_intvaled = intval($num);
      
      $sql = "SELECT `timestamp` FROM `cart` WHERE `num` = {$num_intvaled};";
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      $time = time();//+2592000;
      $today_days = $time/86400;
      $delivery_days = ($result["timestamp"]+2160000)/86400; 
      $delivery_remaining = $delivery_days-$today_days;
      
      $sql2 = sprintf("SELECT `retail_price` FROM `articules` WHERE `articul` = %d;",
            mysql_real_escape_string($articul));
      $result2 = db_fetchone_array($sql2, __LINE__, __FILE__);
      
      if ($delivery_remaining < 0)
      {
         $expired_delivery_price = abs($result2["retail_price"] - ($result2["retail_price"]*(intval(abs($delivery_remaining))/100)));
         $sql = "UPDATE `cart` SET `in_stock` = 1, `order` = 0, `deliver_timestamp` = 0, `expired_deliver_price` = {$expired_delivery_price} WHERE `num` = {$num_intvaled};";
         db_query($sql, __LINE__, __FILE__);
         return $result2["retail_price"];
      }
      else
      {
         $sql = "UPDATE `cart` SET `in_stock` = 1, `order` = 0, `deliver_timestamp` = 0, `expired_deliver_price` = 1 WHERE `num` = {$num_intvaled};";
         db_query($sql, __LINE__, __FILE__);
         return 11;
      }
   }
   
   function declineCartItem($num)
   {
      $sql = sprintf("DELETE FROM `cart` WHERE `num` = %d LIMIT 1",
            mysql_real_escape_string($num));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   //############################## END ADMIN CODE
   
   function putOrderToCart($vk_id, $articul, $size, $phone_num)
   {
      $sql = sprintf("INSERT INTO `cart` (`vk_id`, `articul`, `shoe_size`, `phone_num`, `timestamp`, `order`, `in_stock`, `accepted`) VALUES (%d, %d, '%s', '%s', '%s', 1, 0, 0);",
            mysql_real_escape_string($vk_id),
            mysql_real_escape_string($articul),
            mysql_real_escape_string($size),
            mysql_real_escape_string($phone_num),
            mysql_real_escape_string(time()));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function putSendedQuestion($vk_id, $question_text)
   {
      $sql = sprintf("INSERT INTO `questions` (`vk_id`, `question_text`, `timestamp`, `answered`) VALUES (%d, '%s', '%s', 0);",
            mysql_real_escape_string($vk_id),
            mysql_real_escape_string($question_text),
            mysql_real_escape_string(time()));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function setQuestionAnswered($num)
   {
      $sql = sprintf("UPDATE `questions` SET `answered` = 1 WHERE `num` = %d;",
            mysql_real_escape_string($num));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function putPurchaseToCart($vk_id, $articul, $shoe_size, $phone_num, $deliver_hour, $deliver_minute, $deliver_address, $need_change, $advanced_info)
   {
      $tomorrow_time = time()+86400;
      $tomorrow_day = date("j", $tomorrow_time);
      $tomorrow_month = date("m", $tomorrow_time);
      $tomorrow_year = date("Y", $tomorrow_time);
      $tomorrow_date = $tomorrow_month."/".$tomorrow_day."/".$tomorrow_year." ".$deliver_hour.":".$deliver_minute;
      $deliver_timestamp = strtotime($tomorrow_date);
      
      $sql = sprintf("INSERT INTO `cart` (`vk_id`, `articul`, `shoe_size`, `phone_num`, `deliver_timestamp`, `deliver_address`, `need_change`, `advanced_info`, `timestamp`, `order`, `in_stock`, `accepted`) VALUES (%d, %d, '%s', '%s', '%s', '%s', '%s', '%s', '%s', 0, 1, 0);",
            mysql_real_escape_string($vk_id),
            mysql_real_escape_string($articul),
            mysql_real_escape_string($shoe_size),
            mysql_real_escape_string($phone_num),
            mysql_real_escape_string($deliver_timestamp),
            mysql_real_escape_string($deliver_address),
            mysql_real_escape_string($need_change),
            mysql_real_escape_string($advanced_info),
            mysql_real_escape_string(time()));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function cancelCartItem($num)
   {
      $sql = sprintf("UPDATE `cart` SET `cancelled` = 1 WHERE `num` = %d;",
            mysql_real_escape_string($num));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function restoreCartItem($num)
   {
      $sql = sprintf("UPDATE `cart` SET `cancelled` = 0 WHERE `num` = %d;",
            mysql_real_escape_string($num));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function updateCartItemData($num, $deliver_address, $deliver_hour, $deliver_minute, $phone_num, $need_change, $advanced_info, $need_to_set_tomorrow)
   {
      $num_intvaled = intval($num);
      $sql = "SELECT `deliver_timestamp` FROM `cart` WHERE `num` = {$num_intvaled};";
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      $deliver_timestamp = $result['deliver_timestamp'];
      
      if ($need_to_set_tomorrow == 0)
      {
         $deliver_day = date("j", $deliver_timestamp);
         $deliver_month = date("m", $deliver_timestamp);
         $deliver_year = date("Y", $deliver_timestamp);
      }
      else
      {
         $deliver_day = date("j", time()+86400);
         $deliver_month = date("m", time()+86400);
         $deliver_year = date("Y", time()+86400);
      }
      
      $deliver_date = $deliver_month."/".$deliver_day."/".$deliver_year." ".$deliver_hour.":".$deliver_minute;
      $deliver_timestamp = strtotime($deliver_date);
      
      $sql = sprintf("UPDATE `cart` SET `deliver_address` = '%s', `deliver_timestamp` = '%s', `phone_num` = '%s', `need_change` = '%s', `advanced_info` = '%s' WHERE `num` = %d;",
            mysql_real_escape_string($deliver_address),
            mysql_real_escape_string($deliver_timestamp),
            mysql_real_escape_string($phone_num),
            mysql_real_escape_string($need_change),
            mysql_real_escape_string($advanced_info),
            mysql_real_escape_string($num));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   //#########################add new model
   
   function addNewModelData($object)
   {
      $decoded_object = json_decode(stripcslashes($object), true);
      $sql = sprintf("INSERT INTO `catalog` (`articul`, `title`, `desc`, `type`, `subtype`, `gender`, `brand`, `in_stock`, `similar_articules_data`, `search_queries`) VALUES (%d, '%s', '', %d, %d, '%s', '%s', %d, '%s', '%s');",
            mysql_real_escape_string($decoded_object["articul"]),
            mysql_real_escape_string($decoded_object["title"]),
            mysql_real_escape_string($decoded_object["type"]),
            mysql_real_escape_string($decoded_object["subtype"]),
            mysql_real_escape_string($decoded_object["gender"]),
            mysql_real_escape_string($decoded_object["brand"]),
            mysql_real_escape_string($decoded_object["in_stock"]),
            mysql_real_escape_string($decoded_object["similar_articules_data"]),
            mysql_real_escape_string($decoded_object["search_queries"]));
      
	   $result = db_query($sql, __LINE__, __FILE__);
      
      $sql2 = sprintf("INSERT INTO `articules` (`articul`, `supplier_price_bucks`) VALUES (%d, %d);",
            mysql_real_escape_string($decoded_object["articul"]),
            mysql_real_escape_string($decoded_object["supplier_price_bucks"]));
      
      return $result*db_query($sql2, __LINE__, __FILE__);
   }
}

?>
