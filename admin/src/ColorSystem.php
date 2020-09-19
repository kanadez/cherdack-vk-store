<?php
  
class ColorSystem
{   
   function getColorSystemData()
   {
      $sql = "SELECT `articul`, `color_system_data` FROM `catalog` ORDER BY `articul` DESC;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
    
      return json_encode($result);
   }
   
   function getUserMonitorDataForVkId($vk_id)
   {
      $sql = "SELECT `action`, `hash`, `timestamp` FROM `user_monitor` WHERE `vk_id` = '{$vk_id}' ORDER BY `timestamp` DESC;";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      for ($i = 0; $i < count($result); $i++)
      {
         $action_code = $result[$i]["action"];
         $sql = "SELECT `phraze` FROM `user_monitor_action_codes` WHERE `code` = '{$action_code}';";
         $result2 = db_fetchone_array($sql, __LINE__, __FILE__);
         $result[$i]["action"] = $result2["phraze"];
      }
      
      return json_encode($result);
   }
   
   function saveFullItemSizeObject($articul, $data)
   {
      $sql = sprintf("UPDATE `catalog` SET `color_system_data` = '%s' WHERE `articul` = %d",
            mysql_real_escape_string($data),
            mysql_real_escape_string($articul));
      
	   return db_query($sql, __LINE__, __FILE__);
   }
}

?>
