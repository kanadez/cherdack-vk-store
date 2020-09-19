<?php
require_once dirname(__FILE__)."/src/mysqlAuthData.php";

//echo "No syntax errors!!!";

if (!mysqlConnect($host, $user, $pass, $db))
{
   mysql_query("SET NAMES 'utf8'");
   mysql_query("SET collation_connection = 'UTF-8_general_ci'");
   mysql_query("SET collation_server = 'UTF-8_general_ci'");
   mysql_query("SET character_set_client = 'UTF-8'");
   mysql_query("SET character_set_connection = 'UTF-8'");
   mysql_query("SET character_set_results = 'UTF-8'");
   mysql_query("SET character_set_server = 'UTF-8'");
}

session_start();

if (isset($_POST['login']) && isset($_POST['password']))
{
   $login = mysql_real_escape_string($_POST['login']);
   $password = md5($_POST['password']);
   $query = "SELECT `id`
      FROM `admin`
      WHERE `login`='{$login}' AND `password`='{$password}'
      LIMIT 1";
   $sql = mysql_query($query) or die(mysql_error());

   if (mysql_num_rows($sql) == 1) 
   {
      $row = mysql_fetch_assoc($sql);
      $_SESSION['user_id'] = $row['id'];
      header('Location: http://app.po-sportu.ru/admin/admin.php');
   }
   else 
   {
     die('Такой блядологин с таким блядопаролем не сущиствуют. Попробуйти исчо.<p><a href="http://app.po-sportu.ru/admin">Исчо</a>');
   }
}

mysql_close();

function mysqlConnect($host, $user, $pass, $db)
{
   if (!mysql_connect($host, $user, $pass))
   {
      echo 'connecting to mysql server';
      exit();
   }
   
   if(!mysql_select_db($db))
   {
      echo 'error connecting to db';
      exit();
   }
   
   return 0;   
}

?>