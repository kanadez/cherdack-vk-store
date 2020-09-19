<?php
  
class GetData
{
   function getCatalogData($sql_params){
      $query_where = $this->parseSqlParams($sql_params);
      $sql = "SELECT `articul`, `title`, `in_stock`, `brand` FROM `catalog` WHERE ".$query_where.";";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      for ($i = 0; $i < count($result); $i++){
         $articul = $result[$i]["articul"];
         $sql2 = "SELECT `retail_price` FROM `articules` WHERE `articul` = {$articul};";
         $result2 = db_fetchone_array($sql2, __LINE__, __FILE__);
         $result[$i]["retail_price"] = $result2["retail_price"];
      }
      
      if (count($result) != 0)
         return json_encode($result);
      else return -1;
   }
   
   function getMainTabItems()
   {
      $sql = "SELECT `articul`, `brand` FROM `catalog` WHERE `for_main_tab` = 1;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getArticulesData()
   {
      $sql = "SELECT `articul`, `supplier_articul`, `supplier_title`, `supplier_price_bucks`, `supplier_price_rubs`, `our_price_rubs`, `our_price_plus_discounts_rubs`, `in_stock` FROM `articules`;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }

   function getSoldArticulesData()
   {
      $sql = "SELECT `num`, `articul`, `supplier_price_rubs`, `price_plus_ads`, `price_plus_delivery`, `price_plus_risks`, `price_plus_profit`, `retail_price`, `sold_price`, `profit` FROM `sold`;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getClientData()
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `order_date_timestamp`, `purchase_date_timestamp`, `unique_num` FROM `client`;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getArticulPrice($articul, $size)
   {
      $sql = "SELECT `retail_price`, `end_price` FROM `articules` WHERE `articul` = {$articul};";
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      $return_result["retail_price"] = $result["retail_price"];
      $return_result["end_price"] = $result["end_price"];
      
      if ($result["retail_price"] != null)
      {
         return json_encode($return_result);
      }
      else
      {
         $result[0] = -1;
         $result[1] = $articul;
         
         return json_encode($result);
      }
   }
   
   function getProductData($articul)
   {
      $sql = "SELECT `articul`, `size`, `title`, `desc`, `brand`, `type`, `in_stock`, `gender` FROM `catalog` WHERE `articul` = ".$articul;
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      $product_data['0'] = json_encode($result['0']);
      $product_data['1'] = $this->getArticulPrice($articul, "main");
      
      return json_encode($product_data);
   }
   
   /*function getInStockProductSize($articul)
   {
      $sql = "SELECT `size` FROM `articules` WHERE `articul` = ".$articul." AND `size` <> 'main';";
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      
      return $result['size'];
   }*/

   function getCartData($vk_id)
   {
      $vk_id_intvaled = intval($vk_id);
      $sql = "SELECT `num`, `status`, `articul`, `shoe_size`, `timestamp`, `in_stock`, `order` FROM `cart` WHERE `vk_id` = {$vk_id_intvaled} AND `cancelled` = 0 AND `sold` = 0;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      for ($i = 0; $i < count($result); $i++)
      {
         $sql2 = "SELECT `title`, `brand`, `type` FROM `catalog` WHERE `articul` = ".$result[$i]["articul"];
         $result2 = db_fetchone_array($sql2, __LINE__, __FILE__);
         $result[$i]["title"] = $result2["title"];
         $result[$i]["brand"] = $result2["brand"];
         $result[$i]["type"] = $result2["type"];
         $sql3 = "SELECT `retail_price` FROM `articules` WHERE `articul` = ".$result[$i]["articul"];
         $result3 = db_fetchone_array($sql3, __LINE__, __FILE__);
         $price = $result3["retail_price"];
         $result[$i]["retail_price"] = $price;
      }
      
      return json_encode($result);
   }

   function getCartItemData($num)
   {
      $num_intvaled = intval($num);
      $sql = "SELECT `num`, `deliver_address`, `deliver_timestamp`, `phone_num`, `need_change`, `advanced_info` FROM `cart` WHERE `num` = {$num_intvaled};";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getCartNotifyCenterPurchasesData()
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `shoe_size`, `phone_num`, `deliver_timestamp`, `deliver_address`, `need_change`, `advanced_info`, `timestamp` FROM `cart` WHERE `in_stock` = 1 AND `accepted` = 0 AND `cancelled` = 0;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }

   function getCartNotifyCenterOrdersData()
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `shoe_size`, `phone_num`, `timestamp` FROM `cart` WHERE `order` = 1 AND `accepted` = 0 AND `cancelled` = 0;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }

   function getCartNotifyCenterPurchasesData2()
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `shoe_size`, `phone_num`, `deliver_timestamp`, `deliver_address`, `need_change`, `advanced_info`, `timestamp`, `cancelled`, `accepted`, `sold` FROM `cart` WHERE `in_stock` = 1;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }

   function getCartNotifyCenterOrdersData2()
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `shoe_size`, `phone_num`, `timestamp`, `deliver_timestamp`, `cancelled`, `accepted` FROM `cart` WHERE `order` = 1;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getDeliveryNotifyCenterPurchasesData()
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `shoe_size`, `phone_num`, `deliver_timestamp`, `deliver_address`, `need_change`, `advanced_info`, `timestamp`, `expired_deliver_price` FROM `cart` WHERE `in_stock` = 1 AND `accepted` = 1 AND `sold` = 0 AND `cancelled` = 0;;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      $complete_result = array();
      
      for ($i = 0; $i < count($result); $i++)
      {
         if ($this->compareCurrentDeliveryDate($result[$i]["deliver_timestamp"]) == 0)
         {
            array_push($complete_result, $result[$i]);
         }
      }
      
      return json_encode($complete_result);
   }

   function getDeliveryNotifyCenterOrdersData()
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `shoe_size`, `phone_num`, `deliver_timestamp`, `deliver_address`, `need_change`, `advanced_info`, `timestamp` FROM `cart` WHERE `order` = 1 AND `accepted` = 1 AND `cancelled` = 0;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      $complete_result = array();
      
      for ($i = 0; $i < count($result); $i++)
      {
         if ($this->compareCurrentDeliveryDate($result[$i]["deliver_timestamp"]) == 0)
         {
            array_push($complete_result, $result[$i]);
         }
      }
      
      return json_encode($complete_result);
   }
   
   function getQuestionsData()
   {
      $sql = "SELECT `num`, `vk_id`, `question_text`, `timestamp` FROM `questions` WHERE `answered` = 0;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function compareCurrentDeliveryDate($delivery_date)
   {
      $time = time();
      $current_year = date(Y, $time);
      $current_month = date(m, $time);
      $current_day = date(d, $time);
      
      $delivery_year = date(Y, $delivery_date);
      $delivery_month = date(m, $delivery_date);
      $delivery_day = date(d, $delivery_date);
      
      if ($current_year == $delivery_year && $current_month == $delivery_month && $current_day == $delivery_day)
      {
         return 0;
      }
      else
      {
         return -1;
      }
   }
   
   function getSimilarArticulesData($articul)
   {
      $sql = "SELECT `similar_articules_data` FROM `catalog` WHERE `articul` = ".$articul;
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      $articules = json_decode($result["similar_articules_data"]);
      $images = array();
      
      foreach ($articules as $k) 
      {
         $sql = "SELECT `brand` FROM `catalog` WHERE `articul` = ".$k;
         $result = db_fetchone_array($sql, __LINE__, __FILE__);
         array_push($images, $k . "|" . $result["brand"]);
      }
      
      return json_encode($images);
   }
   
   function search($query)
   {
      $exploded = explode(" ", $query);      
      $first_word = $exploded[0];
      $second_third_word = $exploded[1]." ".$exploded[2];
      $sql = "SELECT `articul`, `brand`, `search_queries` FROM `catalog`;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      $articules = array();
      
      for ($i = 0; $i < count($result); $i++) 
      {
         if ($result[$i]["search_queries"] != "")
         {
            $a = 0;
            $b = 0;
            $exploded_queries = explode("|", $result[$i]["search_queries"]);
            
            for ($z = 0; $z < count($exploded_queries); $z++)
            {               
               if (count($exploded) == 1)
               {
                  if (strcasecmp($first_word, $exploded_queries[$z]) == 0)
                     array_push($articules, $result[$i]["articul"]);
               }
               else
               {
                  if (strcasecmp($first_word, $exploded_queries[$z]) == 0)
                  {
                     $a = 1;
                  }
                  
                  if (strcasecmp($second_third_word, $exploded_queries[$z]) == 0)
                  {
                     $b = 1;
                  }
               }
            }
            
            if ($a == 1 && $b == 1)
            {
               array_push($articules, $result[$i]["articul"]);
            }
         }
      }
      
      $to_client = array();
      
      for ($i = 0; $i < count($articules); $i++)
      {
         $sql = "SELECT `articul`, `title`, `in_stock`, `brand` FROM `catalog` WHERE `articul` = ".$articules[$i].";";
         $result = db_fetchone_array($sql, __LINE__, __FILE__);
         
         $articul = $result["articul"];
         $sql2 = "SELECT `retail_price` FROM `articules` WHERE `articul` = {$articul};";
         $result2 = db_fetchone_array($sql2, __LINE__, __FILE__);
         $result["retail_price"] = $result2["retail_price"];
         array_push($to_client, $result);
      }
      
      if (count($to_client) != 0)
         return json_encode($to_client);
      else
         return -1;
   }
   
   function getAppParameter($param_name)
   {
      $query_result = mysql_query("SELECT `param_value` FROM `app_params` WHERE `param_name` = '{$param_name}';");
      
      if (mysql_num_rows($query_result))
      {
         $row = mysql_fetch_array($query_result);
         return $row["param_value"];
      }
   }
   
   function getDeliveryRemainingString($delivery_date)
   {
   
      $time = time();
      $current_year = date(Y, $time);
      $current_month = date(m, $time);
      $current_day = date(d, $time);
      
      $delivery_year = date(Y, $delivery_date);
      $delivery_month = date(m, $delivery_date);
      $delivery_day = date(d, $delivery_date);
      $delivery_hour = date(G, $delivery_date);
      $delivery_minute = date(i, $delivery_date);
     
      if ($current_year == $delivery_year && $current_month == $delivery_month)
      {
         
         if ($current_day == $delivery_day)
         {
            return "сегодня, в ".$delivery_hour.":".$delivery_minute;
         }
         elseif ($current_day < $delivery_day && $delivery_day-$current_day == 1)
         {
            return "завтра, в ".$delivery_hour.":".$delivery_minute;
         }
         else
         {
            return "не задано";
         }
      }
      else
      {
         return "не задано";
      }
   }
   
   function getOrderRemainingDeliveryString($timestamp, $price)
   {
      $time = time();//+2592000;
      $today_days = $time/86400;//количество дней сегодня (от 1 янв 1970)
      $delivery_days = ($timestamp+2592000)/86400; // количество дней сегодня плюс 23 дня доставки
      $delivery_remaining = $delivery_days-$today_days; // разница между первым и вторым (постоянно сокращается)
      
      if ($delivery_remaining < 0)
      {
         return "Просрочка доставки. Скидка - ".intval(-$delivery_remaining)."%. Цена - ".($price - ($price*(intval(-$delivery_remaining)/100)))." руб. (<a href='javascript:void(0)' class='text_link'>???</a>)";
      }   
      else
      {
         return "Будет в Петрозаводске примерно через: ".intval($delivery_remaining)." дней.";
      }
   }
   
   function getTomorrowForPurchasePage()
   {
      $months = array("Jan" => "января", "Feb" => "февраля", "Mar" => "марта", "Apr" => "апреля", "May" => "мая", "Jun" => "июня", "Jul" => "июля", "Aug" => "августа", "Sep" => "сентября", "Oct" => "октября", "Nov" => "ноября", "Dec" => "декабря");
      $tomorrow_time = time()+86400;
      $tomorrow_day = date("j", $tomorrow_time);
      $tomorrow_month = date("M", $tomorrow_time);
      return $tomorrow_day." ".$months[$tomorrow_month];
   }
   
   function getDeliveryDayForCartItem($num)
   {
      $months = array("Jan" => "января", "Feb" => "февраля", "Mar" => "марта", "Apr" => "апреля", "May" => "мая", "Jun" => "июня", "Jul" => "июля", "Aug" => "августа", "Sep" => "сентября", "Oct" => "октября", "Nov" => "ноября", "Dec" => "декабря");
      $time = time();
      $current_year = date("Y", $time);
      $current_month = date("m", $time);
      $current_day = date("j", $time);
   
      $sql = "SELECT `deliver_timestamp` FROM `cart` WHERE `num` = ".$num;
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      $deliver_year = date("Y", $result['deliver_timestamp']);
      $deliver_month = date("m", $result['deliver_timestamp']);
      $deliver_month_symbolic = date("M", $result['deliver_timestamp']);
      $deliver_day = date("j", $result['deliver_timestamp']);
      
      $result_string = "";
      
      if ($current_year == $deliver_year && $current_month == $deliver_month)
      {
         
         if ($current_day == $deliver_day)
         {
            return "сегодня (".$deliver_day." ".$months[$deliver_month_symbolic].") в&nbsp;";//, в ".$delivery_hour.":".$delivery_minute;
         }
         elseif ($deliver_day-$current_day == 1)
         {
            return "завтра (".$deliver_day." ".$months[$deliver_month_symbolic].") в&nbsp;";
         }
         else
         {
            return "<input type='hidden' id='need_to_set_tomorrow' />Переназначте время доставки. Завтра, в&nbsp;";
         }
      }
      else
      {
         return "<input type='hidden' id='need_to_set_tomorrow' />Переназначте время доставки. Завтра, в&nbsp;";
      }
   }
   
   function getMaxNum()
   {
      $query_result = mysql_query("SELECT MAX(`num`) FROM `catalog`;");
      
      if (mysql_num_rows($query_result))
      {
         $row = mysql_fetch_array($query_result);
         return $row[0];
      }
   }
   
   function parseSqlParams($params)
   {
      $gender_same = array();
      $brand_same = array();
      $product_type = "";
      $product_subtype = "";
      $sql_params = json_decode(stripcslashes($params), true);
      $result_str = "";
      $first_param = 1;
      
      for ($i = 0; $i < count($sql_params); $i++)
      {
         $params_splitted = explode("|", $sql_params[$i]);
         
         if ($params_splitted[0] == "gender")
         {
            array_push($gender_same, $params_splitted[1]);
         }
         elseif ($params_splitted[0] == "brand")
         {
            array_push($brand_same, $params_splitted[1]);
         }
         elseif ($params_splitted[0] == "product_type")
         {
            $product_type = $params_splitted[1];
         }
         elseif ($params_splitted[0] == "product_subtype")
         {
            $product_subtype = $params_splitted[1];
         }
      }
      
      if (count($gender_same) > 0)
      {
         $result_str .= "`gender` IN (";
         
         for ($i = 0; $i < count($gender_same); $i++)
         {
            if ($i == 0)
            {
               $result_str .= "'".$gender_same[$i]."'";
            }
            else
            {
               $result_str .= ", '".$gender_same[$i]."'";
            }
         }
         
         $result_str .= ")";
      }
      
      if (count($brand_same) > 0)
      {
         if (count($gender_same) == 0)
         {
            $result_str .= "`brand` IN (";
         }
         else 
         {
            $result_str .= " AND `brand` IN (";
         }
         for ($i = 0; $i < count($brand_same); $i++)
         {
            if ($i == 0)
            {
               $result_str .= "'".$brand_same[$i]."'";
            }
            else
            {
               $result_str .= ", '".$brand_same[$i]."'";
            }
         }
         
         $result_str .= ")";
      }
      
      $result_str .= " AND `type` IN (".$product_type.") AND `subtype` IN (".$product_subtype.")";
      
      return $result_str;
   }
   
   function timestampFromDate($date_string)
   {
      return strtotime($date_string." 04:00");
   }
}

?>