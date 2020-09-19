<?php
  
class SetData
{  
   function createNewClientTrouble($vk_id){
      $sql = sprintf("INSERT INTO `client_troubles` (`vk_id`, `timestamp`) VALUES ('%s', '%s');",
            mysql_real_escape_string($vk_id),
            mysql_real_escape_string(time()));
      
	   return db_query($sql, __LINE__, __FILE__);
   }

   function setOrderConfirmedByUser($vk_id, $client_data_obj){
      $sql = sprintf("UPDATE `cart` SET `status` = 3 WHERE `vk_id` = %d",
         mysql_real_escape_string($vk_id));      
      db_query($sql, __LINE__, __FILE__);
      
      $result = mysql_query("SELECT `num` FROM `cart_client_data` WHERE `vk_id` = {$vk_id}");
      $num_rows = mysql_num_rows($result);
      
      if ($num_rows == 0)
      {
         $sql3 = sprintf("INSERT INTO `cart_client_data` (`vk_id`, `client_data`) VALUES (%d, '%s')",
            mysql_real_escape_string($vk_id),
            mysql_real_escape_string($client_data_obj));
      } 
      else
      {
         $sql3 = sprintf("UPDATE `cart_client_data` SET `client_data` = '%s' WHERE `vk_id` = %d",
            mysql_real_escape_string($client_data_obj),
            mysql_real_escape_string($vk_id));
      }
      
	   return db_query($sql3, __LINE__, __FILE__);
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
      $sql = sprintf("UPDATE `articules` SET `%s` = '%s' WHERE `articul` = %d AND `size` = '%s'",
            mysql_real_escape_string($column_name),
            mysql_real_escape_string($data),
            mysql_real_escape_string($articul),
            mysql_real_escape_string($size));   
	   
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
      $decoded_object = json_decode(stripcslashes($articul_object), true);
      $sql = sprintf("INSERT INTO `articules` (`articul`, `size`, `supplier_articul`, `supplier_title`, `supplier_price_bucks`, `supplier_price_rubs`, `our_price_rubs`, `our_price_plus_discounts_rubs`, `in_stock`) VALUES (%d, '%s', '%s', '%s', %f, %f, %f, %f, %d);",
            mysql_real_escape_string($decoded_object["articul"]),
            mysql_real_escape_string($decoded_object["size"]),
            mysql_real_escape_string($decoded_object["supplier_articul"]),
            mysql_real_escape_string($decoded_object["supplier_title"]),
            mysql_real_escape_string($decoded_object["supplier_price_bucks"]),
            mysql_real_escape_string($decoded_object["supplier_price_rubs"]),
            mysql_real_escape_string($decoded_object["our_price_rubs"]),
            mysql_real_escape_string($decoded_object["our_price_plus_discounts_rubs"]),
            mysql_real_escape_string($decoded_object["in_stock"]));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function setColorsSelected($articul, $vk_id, $vk_name, $size)
   {
      $sql = "SELECT `title` FROM `catalog` WHERE `articul` = {$articul};";
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      $title = $result["title"];
      $sql = sprintf("INSERT INTO `colors` (`articul`, `articul_title`, `vk_id`, `vk_name`, `size`, `time`, `answered`) VALUES (%d, '%s', %d, '%s', %d, '%s', 0);",
            mysql_real_escape_string($articul),
            mysql_real_escape_string($title),
            mysql_real_escape_string($vk_id),
            mysql_real_escape_string($vk_name),
            mysql_real_escape_string($size),
            mysql_real_escape_string(time()));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }

   function deleteArticul($articul, $size)
   {
      $sql = sprintf("DELETE FROM `articules` WHERE `articul` = %d AND `size` = '%s'LIMIT 1",
            mysql_real_escape_string($articul),
            mysql_real_escape_string($size));
	   
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
      $sql = sprintf("SELECT `supplier_price_rubs` FROM `articules` WHERE `articul` = %d AND `size` = '%s';",
         mysql_real_escape_string($articul),
         mysql_real_escape_string($size));
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
      $sql = "SELECT `timestamp`, `order` FROM `cart` WHERE `num` = {$num_intvaled};";
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      
      if ($result["order"] == 1)
      {
         $deliver_timestamp = $result["timestamp"] + 86400*23;
         $sql = "UPDATE `cart` SET `accepted` = 1, `deliver_timestamp` = '{$deliver_timestamp}' WHERE `num` = {$num_intvaled};";
	   }
      else
      {
         $sql = "UPDATE `cart` SET `accepted` = 1 WHERE `num` = {$num_intvaled};";
      }
         
	   return db_query($sql, __LINE__, __FILE__);
   }
   
   function setOrderCame($num, $articul, $size)
   {
      $num_intvaled = intval($num);
      
      $sql = "SELECT `timestamp` FROM `cart` WHERE `num` = {$num_intvaled};";
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      $time = time();//+2592000;
      $today_days = $time/86400;//���������� ���� ������ (�� 1 ��� 1970)
      $delivery_days = ($result["timestamp"]+2160000)/86400; // ���������� ���� ������ ��� 23 �� ��������
      $delivery_remaining = $delivery_days-$today_days; // ������� ����� ������ � ������ (�������� ����������)
      
      $sql2 = sprintf("SELECT `retail_price` FROM `articules` WHERE `articul` = %d AND `size` = '%s';",
            mysql_real_escape_string($articul),
            mysql_real_escape_string($size));
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
   
   function putOrderToCart($vk_id, $articul, $size, $status)
   {      
      $sql = "SELECT `in_stock` FROM `catalog` WHERE `articul` = ".$articul;
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      $in_stock = $result["in_stock"];
      
      $sql = sprintf("INSERT INTO `cart` (`vk_id`, `articul`, `shoe_size`, `status`, `timestamp`, `order`, `in_stock`, `accepted`) VALUES (%d, %d, '%s', %d, '%s', 1, %d, 0);",
            mysql_real_escape_string($vk_id),
            mysql_real_escape_string($articul),
            mysql_real_escape_string($size),
            mysql_real_escape_string($status),
            mysql_real_escape_string(time()),
            mysql_real_escape_string($in_stock));
	   
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
}

?>
