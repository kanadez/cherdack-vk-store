function startDoingScrollTop() // запускает интервал снятия позиции скроллинга окна ВК
{
   DS_intvl = setInterval("doScrollTop()", 100);
}

function doScrollTop() // снимает позицию скроллинга окна ВК
{
   VK.callMethod("scrollTop");
}

function onDoScrollTop(result) // обработчик события onScrollTop ВК
{
   scroll_top = result;
}

function startHeightChanging() // запуск интервала подгона окна приложения под контент
{
   CH_intvl = setInterval("changeHeight()", 100);
}

function changeHeight() // погдогяет окно приложения под контент
{
   VK.callMethod("resizeWindow", 833, $('#content_div').outerHeight()+140);  
}