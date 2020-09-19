function detectComeIn() // срабатывает при входе и кладёт в базу чела, который пришёл в приложение
{
   $.post
   (
      post_url,
      {
         a: "UM_dA",
         b: viewer_id,
         c: viewer_name,
         d: hash,
         e: "come-in"
      }, 
      function (result)
      {
         return;
      }      
   );
}

function detectOrderButtonClick() // срабатывает при входе и кладёт в базу чела, который пришёл в приложение
{   
   $.post
   (
      post_url,
      {
         a: "UM_dA",
         b: viewer_id,
         c: viewer_name,
         d: cur_articul,
         e: "order-button"
      }, 
      function (result)
      {
         return;
      }      
   );
}

function detectBuyButtonClick() // срабатывает при входе и кладёт в базу чела, который пришёл в приложение
{   
   $.post
   (
      post_url,
      {
         a: "UM_dA",
         b: viewer_id,
         c: viewer_name,
         d: cur_articul,
         e: "buy-button"
      }, 
      function (result)
      {
         return;
      }      
   );
}

function detectHeaderBannerClick() // срабатывает при входе и кладёт в базу чела, который пришёл в приложение
{   
   $.post
   (
      post_url,
      {
         a: "UM_dA",
         b: viewer_id,
         c: viewer_name,
         d: cur_articul,
         e: "header_banner"
      }, 
      function (result)
      {
         return;
      }      
   );
}

function detectQuestionToConsultantClick()
{
   $.post
   (
      post_url,
      {
         a: "UM_dA",
         b: viewer_id,
         c: viewer_name,
         d: cur_articul,
         e: "q_to_consultant"
      }, 
      function (result)
      {
         return;
      }      
   );
}

function detectUMayAlsoLikeImageClick()
{
   $.post
   (
      post_url,
      {
         a: "UM_dA",
         b: viewer_id,
         c: viewer_name,
         d: cur_articul,
         e: "u_may_also_like"
      }, 
      function (result)
      {
         return;
      }      
   );
}

function detectSearchClick()
{
   $.post
   (
      post_url,
      {
         a: "UM_dA",
         b: viewer_id,
         c: viewer_name,
         d: cur_articul,
         e: "search_input"
      }, 
      function (result)
      {
         return;
      }      
   );
}

function detectMainTabRLClick()
{
   /*$.post
   (
      post_url,
      {
         a: "UM_dA",
         b: viewer_id,
         c: viewer_name,
         d: cur_articul,
         e: "main_tab_r_l"
      }, 
      function (result)
      {
         return;
      }      
   );*/
}

function detectProductPageRLClick()
{
   $.post
   (
      post_url,
      {
         a: "UM_dA",
         b: viewer_id,
         c: viewer_name,
         d: cur_articul,
         e: "product_page_r_l"
      }, 
      function (result)
      {
         return;
      }      
   );
}

function detectColorSelect()
{
   $.post
   (
      post_url, 
      {
         a: "sCS",
         b: cur_articul,
         c: viewer_id,
         d: viewer_name,
         e: current_selected_size
      }, 
      function (result)
      {
         return;
      }
   );
}