function buildRandomCrossLinksForm(){
   var random_cross_links = new RandomCrossLinks();

   $('#content_div').html(random_cross_links.do_button);
   $('#content_div').append(random_cross_links.result_output);
}

function RandomCrossLinks(){
   this.do_button = $("<button />",{id: "random_cross_links_do_button",text: "Сделать"});
   this.do_button.click({obj:this},function(e){
      e.data.obj.setRandomCrossLinks();
   });
   this.result_output = $("<div />",{id: "random_cross_links_result_div",text: "Результат"});
   this.result_output.css({"padding":"20px 20px 20px 0"});
   this.setRandomCrossLinks = function(){
      $.post(
         post_url,{
            a: "RCL_gRCL"
         }, 
         function (result){
            $('#random_cross_links_result_div').html(result);
         }
      );
   }
}