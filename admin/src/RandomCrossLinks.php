<?php

class RandomCrossLinks{
   function setCrossLinks(){
      $sql = "SELECT `articul` FROM `catalog`";
      $result = db_fetchall_array($sql, __LINE__, __FILE__);
      
      for ($i = 0; $i < count($result); $i++){
         $random_key_1 = rand(0, count($result));
         $random_key_2 = rand(0, count($result));
         $random_key_3 = rand(0, count($result));
         $cross_links_string = '{"similar_articul_1":"'.$result[$random_key_1]['articul'].'","similar_articul_2":"'.$result[$random_key_2]['articul'].'","similar_articul_3":"'.$result[$random_key_3]['articul'].'"}';
         
         $sql = sprintf("UPDATE `catalog` SET `similar_articules_data` = '%s' WHERE `articul` = %d;",
            mysql_real_escape_string($cross_links_string),
            mysql_real_escape_string($result[$i]['articul']));   
            
         db_query($sql, __LINE__, __FILE__);
      }
      
      return 0;
   }
}
?>