function detectBrowser()
{
   var browser_unsupported_flag = 0;   
   var browser = $.browser;
   var mozilla_unsupported_vers = [1,2,3,4,5,6,7];
   var msie_unsupported_vers = [1,2,3,4,5,6,7,8];
   var opera_unsupported_vers = [1,2,3,4,5,6,7,8,9,10,11,12];
   
   if (browser.mozilla)
   {
      for (var i = 0; i < mozilla_unsupported_vers.length; i++)
         if (browser.version.slice(0,2) == mozilla_unsupported_vers[i])
         {
            browser_unsupported_flag = -1;
         }
   }
   
   if (browser.msie)
   {
      for (var i = 0; i < msie_unsupported_vers.length; i++)
         if (browser.version.slice(0,2) == msie_unsupported_vers[i])
         {
            browser_unsupported_flag = -1;
         }
   }
   
   if (browser.opera)
   {
      for (var i = 0; i < opera_unsupported_vers.length; i++)
         if (browser.version.slice(0,2) == opera_unsupported_vers[i])
         {
            browser_unsupported_flag = -1;
         }
   }
   
   return browser_unsupported_flag;
}

function onBrowserUnsupported()
{
   var logo = $("<img />", 
   {
      id: "logo_img",
      src: "./img/sad_smile.png"
   });
   
   var logo_div = $("<div />",
   {
      id: "browser_unsupported_logo_div"
   });
   
   var msg = $("<img />", 
   {
      id: "msg_img",
      src: "./img/unsupported_browser_msg.png"
   });
   
   var msg_div = $("<div />",
   {
      id: "browser_unsupported_msg_div"
   });
   
   logo_div.append(logo);
   $('#wrapper_div').html(logo_div);
   msg_div.append(msg);
   $('#wrapper_div').append(msg_div);
   $('#wrapper_div').show();
}