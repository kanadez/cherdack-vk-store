var sub_accordion_last_opened = -1; // last opened content for closing before opening next
var sub_sub_accordion_last_opened = -1;
//changable params
var sub_content_h = 10;
var sub_sub_content_h = 10;
var parent_content_h = 17;
var parent_content_h2 = 15;

function accordion(header, content) // makes button collapsible like accordion header
{
   header.mousedown
   (
      function()
      {
         //############################ working with another opened tabs
         if (content.children('.children_content').length == 0) // if content is subcategories
         {
            if (sub_sub_accordion_last_opened != -1 && sub_sub_accordion_last_opened != content) // closing last opened content
            {
               sub_sub_accordion_last_opened.animate({"height" : "0px"}, 400);// close last opened content
               sub_sub_accordion_last_opened.attr({"opened" : "false"}); // set last opened content opened to false
            }
         }
         else
         {
            if (sub_accordion_last_opened != -1 && sub_accordion_last_opened != content) // closing last opened content
            {
               if (sub_sub_accordion_last_opened != -1)
               {
                  sub_sub_accordion_last_opened.animate({"height" : "0px"}, 400, function(){log('eee')});// close last opened content
                  sub_sub_accordion_last_opened.attr({"opened" : "false"}); // set last opened content opened to false
               }
               
               sub_accordion_last_opened.animate({"height" : "0px"}, 400);// close last opened content
               sub_accordion_last_opened.attr({"opened" : "false"}); // set last opened content opened to false
            }
         }
         //###########################################################
         
         //########################### working with clicked closed tab (opening)
         if (content.attr("opened") == "false")
         {
            var content_h = 0;
            content.attr({"opened" : "true"}); //set opened to true
            
            if (content.children('.children_content').length != 0) // if content is sub
            {
               content.children('.accordion_header_a').each // calculate height of sub links
               (
                  function()
                  {
                     content_h += $(this).outerHeight();
                  }
               );
               
               content.animate({"height" : (content_h+sub_content_h)+"px"}, 400);
               sub_accordion_last_opened = content;
            }
            else // if content is top
            {
               content.children('.side_panel_spoiler_li').each // calculate height of top links
               (
                  function()
                  {
                     content_h += $(this).outerHeight();                   
                  }
               );
               
               content.animate({"height" : (content_h+sub_sub_content_h)+"px"}, 400);
               sub_sub_accordion_last_opened = content;
            }  
            
            if (content.parent('.parent_content').length != 0) // if content is sub, changing top content height
            {
               var content_h2 = 0;
               
               content.parent('.parent_content').children('.accordion_header_a').each // calculate top content height with top links
               (
                   function()
                   {
                       content_h2 += $(this).outerHeight();
                   }
               );
               
               content.parent('.parent_content').children().children('.side_panel_spoiler_li').each // calculate top content height with sub links
               (
                   function()
                   {
                      if ($(this).parent().attr("opened") != "false")
                       content_h2 += $(this).outerHeight();
                   }
               );
               
               content.parent('.parent_content').animate({"height" : (content_h2+parent_content_h)+"px"}, 400);// open this content
               sub_sub_accordion_last_opened = content;
            }
         } //###########################################################
         else //######################## working with clicked opened tab (closing)
         {
            content.attr({"opened" : "false"}); // set opened to false
            
            if (sub_sub_accordion_last_opened != -1 && sub_sub_accordion_last_opened != content) // closing last opened content
            {
               sub_sub_accordion_last_opened.animate({"height" : "0px"}, 400);// close last opened content
               sub_sub_accordion_last_opened.attr({"opened" : "false"}); // set last opened content opened to false
            }
            
            content.animate({"height" : "0px"}, 400);  //  close this content
            
            if (content.parent('.parent_content').length != 0)
            {
               var content_h = 0;
               
               content.parent('.parent_content').children('.side_panel_spoiler_li').each // calculate content height
               (
                   function()
                   {
                       content_h += $(this).outerHeight(); 
                   }
               );
               
               content.parent('.parent_content').children('.accordion_header_a').each // calculate content height
               (
                   function()
                   {
                       content_h += $(this).outerHeight(); 
                   }
               );
               
               content.parent('.parent_content').animate({"height" : (content_h+parent_content_h2)+"px"}, 400);
               sub_sub_accordion_last_opened = -1;
            }
            else
            {
               sub_accordion_last_opened = -1;
            }
         } //###########################################################
      }   
   );
}