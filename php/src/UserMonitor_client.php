<?php
  
class UserMonitor_client
{
   function detectAction($vk_id, $vk_name, $hash, $action_code)
   {
      $sql = sprintf("INSERT INTO `user_monitor` (`vk_id`, `vk_name`, `action`, `hash`, `timestamp`) VALUES ('%s', '%s', '%s', %d, '%s');",
            mysql_real_escape_string($vk_id),
            mysql_real_escape_string($vk_name),
            mysql_real_escape_string($action_code),
            mysql_real_escape_string($hash),
            mysql_real_escape_string(time()));
	   
	   return db_query($sql, __LINE__, __FILE__);
   }
}

?>
