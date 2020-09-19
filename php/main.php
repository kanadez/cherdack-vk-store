<?php
require_once dirname(__FILE__)."/src/getData.php";
require_once dirname(__FILE__)."/src/setData.php";
require_once dirname(__FILE__)."/src/authData.php";
require_once dirname(__FILE__)."/src/UserMonitor_client.php";

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
   
   $get_data = new GetData;
   $set_data = new SetData;
   $user_monitor = new UserMonitor_client;
}

switch ($_POST['a'])
{
   case "cNCT" :
      echo $set_data->createNewClientTrouble($_POST['b']);
   break;   
      
   case "sOCBU" :
      echo $set_data->setOrderConfirmedByUser($_POST['b'], $_POST['c']);
   break;

   case "UM_dA" :
      echo $user_monitor->detectAction($_POST['b'], $_POST['c'], $_POST['d'], $_POST['e']);
   break;
      
   case "gCD" :
      echo $get_data->getCatalogData($_POST['b']);
   break;
   
   case "gPD" :
      echo $get_data->getProductData($_POST['b']);
   break;
   
   case "gMN" :
      echo $get_data->getMaxNum();
   break;

   case "sSS" :
      echo $set_data->setShoeSize($_POST['b'], $_POST['c'], $_POST['d']);
   break;
   
   case "gAP" :
      echo $get_data->getAppParameter($_POST['b']);
   break;
   
   case "gPBSS" :
      echo $get_data->getPhotoByShoeSize($_POST['b'], $_POST['c'], $_POST['d']);
   break;
   
   case "sPID" :
      echo $set_data->setProductImagesData($_POST['b'], $_POST['c']);
   break;
   
   case "sSAD" :
      echo $set_data->setSimilarArticulesData($_POST['b'], $_POST['c']);
   break;
   
   case "gSAD" :
      echo $get_data->getSimilarArticulesData($_POST['b']);
   break;
   
   case "gAD" :
      echo $get_data->getArticulesData();
   break;

   case "gSoAD" :
      echo $get_data->getSoldArticulesData();
   break;
   
   case "gClD" :
      echo $get_data->getClientData();
   break;
   
   case "gAPr" :
      echo $get_data->getArticulPrice($_POST['b'], $_POST['c']);
   break;
   
   case "sTID" :
      echo $set_data->setTdInputData($_POST['b'], $_POST['c'], $_POST['d'], $_POST['e']);
   break;

   case "sCrTID" :
      echo $set_data->setCartTdInputData($_POST['b'], $_POST['c'], $_POST['d']);
   break;
   
   case "sSTID" :
      echo $set_data->setSoldTdInputData($_POST['b'], $_POST['c'], $_POST['d']);
   break;
   
   case "sCTID" :
      echo $set_data->setClientTdInputData($_POST['b'], $_POST['c'], $_POST['d']);
   break;
   
   case "cNA" :
      echo $set_data->createNewArticul($_POST['b']);
   break;
   
   case "cNSA" :
      echo $set_data->createNewSoldArticul($_POST['b']);
   break;

   case "cNC" :
      echo $set_data->createNewClient($_POST['b']);
   break;
   
   case "dA" :
      echo $set_data->deleteArticul($_POST['b'], $_POST['c']);
   break;
   
   case "dSA" :
      echo $set_data->deleteSoldArticul($_POST['b']);
   break;

   case "dCrI" :
      echo $set_data->deleteCartItem($_POST['b']);
   break;
   
   case "dCl" :
      echo $set_data->deleteClient($_POST['b']);
   break;
   
   case "gCrD" :
      echo $get_data->getCartData($_POST['b']);
   break;
   
   case "gCNCPD" :
      echo $get_data->getCartNotifyCenterPurchasesData();
   break;

   case "gCNCOD" :
      echo $get_data->getCartNotifyCenterOrdersData();
   break;

   case "gCNCPD2" :
      echo $get_data->getCartNotifyCenterPurchasesData2();
   break;

   case "gCNCOD2" :
      echo $get_data->getCartNotifyCenterOrdersData2();
   break;
   
   case "aCI" :
      echo $set_data->acceptCartItem($_POST['b']);
   break;
   
   case "dCI" :
      echo $set_data->declineCartItem($_POST['b']);
   break;

   case "sDIS" :
      echo $set_data->setDeliveryItemSolded($_POST['b'], $_POST['c'], $_POST['d']);
   break;
   
   case "sDIU" :
      echo $set_data->setDeliveryItemUnsolded($_POST['b']);
   break;
   
   case "cCDD" :
      echo $get_data->compareCurrentDeliveryDate($_POST['b']);
   break;
   
   case "gDNCOD" :
      echo $get_data->getDeliveryNotifyCenterOrdersData();
   break;

   case "gDNCPD" :
      echo $get_data->getDeliveryNotifyCenterPurchasesData();
   break;

   case "pOTC" :
      echo $set_data->putOrderToCart($_POST['b'], $_POST['c'], $_POST['d'], $_POST['e']);
   break;

   case "gTFPP" :
      echo $get_data->getTomorrowForPurchasePage();
   break;

   case "pPTC" :
      echo $set_data->putPurchaseToCart($_POST['b'], $_POST['c'], $_POST['d'], $_POST['e'], $_POST['f'], $_POST['g'], $_POST['h'], $_POST['i'],$_POST['j']);
   break;
   
   case "cCI" :
      echo $set_data->cancelCartItem($_POST['b']);
   break;

   case "rCI" :
      echo $set_data->restoreCartItem($_POST['b']);
   break;

   case "gCID" :
      echo $get_data->getCartItemData($_POST['b']);
   break;

   case "gDDFCI" :
      echo $get_data->getDeliveryDayForCartItem($_POST['b']);
   break;   
   
   case "uCID" :
      echo $set_data->updateCartItemData($_POST['b'], $_POST['c'], $_POST['d'], $_POST['e'], $_POST['f'], $_POST['g'], $_POST['h'], $_POST['i']);
   break;  
   
   case "tFD" :
      echo $get_data->timestampFromDate($_POST['b']);
   break;  
   
   case "sOC" :
      echo $set_data->setOrderCame($_POST['b'], $_POST['c'], $_POST['d']);
   break;

   case "gMTI" :
      echo $get_data->getMainTabItems();
   break;
   
   case "search" :
      echo $get_data->search($_POST['b']);
   break;
   
   case "pSQ" :
      echo $set_data->putSendedQuestion($_POST['b'], $_POST['c']);
   break;

   case "gQD" :
      echo $get_data->getQuestionsData();
   break;

   case "sQA" :
      echo $set_data->setQuestionAnswered($_POST['b']);
   break;
   
   case "gISPS" :
      echo $get_data->getInStockProductSize($_POST['b']);
   break;

   case "sCS" :
      echo $set_data->setColorsSelected($_POST['b'], $_POST['c'], $_POST['d'], $_POST['e']);
   break;
   
   default : 
      exit();
}

mysql_close();

function mysqlConnect($host, $user, $pass, $db)
{
   if (!mysql_connect($host, $user, $pass))
   {
      pe('connecting to mysql server');
      exit();
   }
   
   if(!mysql_select_db($db))
   {
      pe('connecting to db');
      exit();
   }
   
   return 0;   
}

function db_query($query, $line=0, $file_name='filename')
{
   $res = mysql_query($query) or die("Error: wrong SQL query #$query#;  ".mysql_error()." in ".$file_name." on line ".$line);
   return $res;
}

function db_fetchone_array($query, $line=0, $file_name='filename')
{
   $res = db_query($query, $line, $file_name);
   $row = mysql_fetch_array($res,MYSQL_ASSOC);
   mysql_free_result($res);
   return ($row)? $row : array();
}

function db_fetchall_array($query, $line=0, $file_name='filename')
{
   $res = db_query($query, $line, $file_name);
   while($row = mysql_fetch_array($res,MYSQL_ASSOC))
      $rows[] = $row;
   mysql_free_result($res); // îñâîáîæäàåò ïàìÿòü îò ðåçóëüòàòîâ çàïðîñà
   return ($rows)? $rows : array();
}

?>
