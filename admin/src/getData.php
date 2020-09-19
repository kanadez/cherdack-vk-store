<?php
  
class GetData{ // класс, получает данные с сервера и передаёт клиенту, в админку
   function getClientQuestionsData(){ // получает данные о фактических покупателях
      $sql = "SELECT * FROM `ds_questions` WHERE `a` = '';";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getClientTroublesData(){ // получает данные о фактических покупателях
      $sql = "SELECT `num`, `vk_id`, `timestamp` FROM `client_troubles`;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getArticulesData() // получает данные о артикулах (цены, размеры, названия, наличие)
   {
      $sql = "SELECT * FROM `articules` ORDER BY `articul` DESC;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getCatalogDataForAdmin() // получает данные об ячейках каталога (инфа для каталога, т.е. выводимые пользователю данные об артикулах)
   {
      $sql = "SELECT * FROM `catalog` ORDER BY `articul` DESC;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getNalCatalogDataForAdmin() // получает данные об ячейках каталога (инфа для каталога, т.е. выводимые пользователю данные об артикулах)
   {
      $sql = "SELECT * FROM `catalog` WHERE `in_stock` = 1 ORDER BY `articul` DESC;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }

   function getSoldArticulesData() // получает данные о проданных артикулах
   {
      $sql = "SELECT `num`, `articul`, `supplier_price_rubs`, `price_plus_ads`, `price_plus_delivery`, `price_plus_risks`, `price_plus_profit`, `retail_price`, `sold_price`, `profit` FROM `sold`;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getClientData() // получает данные о фактических покупателях
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `order_date_timestamp`, `purchase_date_timestamp`, `unique_num` FROM `client`;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getArticulPrice($articul, $size) // получает цену артикула
   {
      $sql = "SELECT `retail_price`, `end_price` FROM `articules` WHERE `articul` = {$articul} AND `size` = '{$size}';";
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
   
   // #################################################### Центр уведомлений корзины ########################################//
   
   function getCartNotifyCenterPurchasesData() // получает данные о совершенных неотказанных непринятых покупках (наличные пары в корзине)
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `shoe_size`, `timestamp` FROM `cart` WHERE `in_stock` = 1 AND `accepted` = 0 AND `cancelled` = 0;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getCartNotifyCenterOrdersData() // получает данные о совершённых неотказанных непринятых заказах
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `shoe_size`, `timestamp` FROM `cart` WHERE `order` = 1 AND `accepted` = 0 AND `cancelled` = 0;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getCartNotifyCenterPurchasesData2() // получает данные о всех совершенных покупках
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `shoe_size`, `timestamp`, `cancelled`, `accepted`, `sold` FROM `cart` WHERE `in_stock` = 1;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }

   function getCartNotifyCenterOrdersData2() // получает данные о всех совершенных заказах
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `status`, `shoe_size`, `timestamp`, `cancelled`, `accepted` FROM `cart` WHERE `order` = 1;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
   
   function getColorsData($what_to_show) // получает данные о запросах клиентов другого цвета модели
   {
      if ($what_to_show == "all")
      {
         $sql = "SELECT * FROM `colors` ORDER BY `time` DESC;";
         $result = db_fetchall_array($sql, __LINE__, __FILE__);
      }
      else if ($what_to_show == "unreplyed")
      {
         $sql = "SELECT * FROM `colors` WHERE `answered` = 0 ORDER BY `time` DESC;";
         $result = db_fetchall_array($sql, __LINE__, __FILE__);
         
      }
      
      return json_encode($result);
   }
   
   //############################################################## Центр уведомлений о доставке ##########################################//
   
   function getDeliveryNotifyCenterPurchasesData() // получает данные об уведомлениях о совершенных покупках
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `shoe_size`, `timestamp`, `expired_deliver_price` FROM `cart` WHERE `in_stock` = 1 AND `accepted` = 1 AND `sold` = 0 AND `cancelled` = 0;;";
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

   function getDeliveryNotifyCenterOrdersData() // получает данные об уведомлениях о совершенных заказах
   {
      $sql = "SELECT `num`, `vk_id`, `articul`, `shoe_size`, `timestamp` FROM `cart` WHERE `order` = 1 AND `accepted` = 1 AND `cancelled` = 0;";
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
   
   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
   
   function getQuestionsData() // получает данные о заданных клиентами вопросах
   {
      $sql = "SELECT `num`, `vk_id`, `question_text`, `timestamp` FROM `questions` WHERE `answered` = 0;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function compareCurrentDeliveryDate($delivery_date) // сравнивает дату доставки с сегодняшней датой
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
   
   function getMaxNum() // получает количество записей каталога
   {
      $query_result = mysql_query("SELECT MAX(`num`) FROM `catalog`;");
      
      if (mysql_num_rows($query_result))
      {
         $row = mysql_fetch_array($query_result);
         return $row[0];
      }
   }
   
   function parseSqlParams($params) // парсит sql-параметры, переданные со стороны клиента
   {
      $gender_same = array();
      $brand_same = array();
      $sport_same = array();
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
         elseif ($params_splitted[0] == "sport")
         {
            array_push($sport_same, $params_splitted[1]);
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
      
      if (count($sport_same) > 0)
      {
         if (count($gender_same) == 0 && count($brand_same) == 0)
         {
            $result_str .= "`sport` IN (";
         }
         else 
         {
            $result_str .= " AND `sport` IN (";
         }
         for ($i = 0; $i < count($sport_same); $i++)
         {
            if ($i == 0)
            {
               $result_str .= "'".$sport_same[$i]."'";
            }
            else
            {
               $result_str .= ", '".$sport_same[$i]."'";
            }
         }
         
         $result_str .= ")";
      }
      //return //"0: ".$gender_same[0].", 1: ".$gender_same[1];
      return $result_str;
   }
   
   // ################################################### Customer Touch System ########################################### 
   
   function getCustomerTouchSystemData() // получает данные системы слежения за пользователями
   {
      $sql = "SELECT * FROM `customer_touch_system` ORDER BY `timestamp` DESC;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

   // ################################################### Hot User System ########################################### 
   
   function getHotSystemData($exclude_expression) // получает данные системы тёплых клиентов
   {
      $sql = "SELECT * FROM `hot_system` WHERE `{$exclude_expression}` <> -1 ORDER BY `timestamp` DESC;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

   function timestampFromDate($date_string) // делает таймштамп из человекочитаемой даты
   {
      return strtotime($date_string." 04:00");
   }
   
   function getCatalogBrands() 
   {
      $sql = "SELECT `brand_title` FROM `catalog_brands`";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getCatalogSports() 
   {
      $sql = "SELECT `sport_title`, `sport_russian_title` FROM `catalog_sports`";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getCatalogTypes() 
   {
      $sql = "SELECT `type`, `code` FROM `catalog_types`";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getCatalogSubtypes($catalog_type) 
   {
      $sql = "SELECT `subtype_name`, `subtype_code` FROM `catalog_subtypes` WHERE `type_code` = {$catalog_type}";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      return json_encode($result);
   }
   
   function getLastArticulNumber()
   {
      $query_result = mysql_query("SELECT MAX(`articul`) FROM `articules`;");
      
      if (mysql_num_rows($query_result))
      {
         $row = mysql_fetch_array($query_result);
         return $row[0];
      }
   }
}

?>
