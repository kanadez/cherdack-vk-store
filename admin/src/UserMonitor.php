<?php
  
class UserMonitor
{   
   function getUserMonitorData($action_code, $offset)
   {
      $sql = "SELECT MAX(`num`) AS `num` FROM `user_monitor`;";
      $result = db_fetchone_array($sql, __LINE__, __FILE__);
      $max_num = $result['num'];
      $s = $max_num-$offset;
      $e = $s-100;
      $result_array = array();
      
      for ($i = $s; $i > $e; $i--)
      {
         $sql = "SELECT * FROM `user_monitor` WHERE `num` = {$i};";
         $result2 = db_fetchone_array($sql, __LINE__, __FILE__);
         array_push($result_array, $result2);
      }
      
      for ($i = 0; $i < count($result_array); $i++)
      {
         if (($hash = $result_array[$i]["hash"]) != -1)
         {
            $sql = "SELECT `title` FROM `catalog` WHERE `articul` = {$hash};";
            $result2 = db_fetchone_array($sql, __LINE__, __FILE__);
            $result_array[$i]["model_title"] = $result2["title"];
         }
      }
      
      return json_encode($result_array);
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
}

?>
