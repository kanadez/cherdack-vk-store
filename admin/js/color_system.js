var cs_data_object = -1; // color system data object (item ids and sizes)
var color_system = -1; // Color System object
var item_ids = []; // item is array (parsed)
var sizes = []; // sizes of each item id (parsed)
var edit_dialog = -1; // dialog for sizes editing
var current_editing_articul = -1;

function ColorSystem()
{
   this.CS_side_panel = $("<div />",
   {
      id: "CS_side_panel",
      class: "side_panel"
   });
   
   this.show_button = $("<button />",
   {
      id: "CS_show_button",
      class: "side_panel_button",
      text: "Показать Систему цветов"
   });
   
   this.update_button = $("<button />",
   {
      id: "CS_update_button",
      class: "side_panel_button",
      text: "Обновить Систему цветов"
   });
   
   this.show_RP_button = $("<button />",
   {
      id: "show_RP_button",
      class: "side_panel_button",
      text: "Показать Список замены"
   });
   
   this.getCSdata = function()
   {
      $.post
      (
         post_url, 
         {
            a: "CS_gCSD"
         }, 
         function (result)
         {
            cs_data_object = eval("(" + result + ")");
            //console.log(result);
            getCSdata_callback();
         }
      );
   }
   
   this.showCS = function()
   {
      if ($('table').length != 0)
         $('table').remove()
   
      var CS_table = $("<table />", 
      {
         id: "CS_table",
         class: "admin_table"
      });
   
      $('#content_div').append(CS_table);
      
      var tr1 = $("<tr />",
      {
         id: "tr1"
      });
      
      var td0 = $("<td />",
      {
         id: "key",
         text: "#",
         class: "table_header"
      });
      
      var td1 = $("<td />",
      {
         id: "articul",
         text: "Артикул",
         class: "table_header"
      });
      
      var td2 = $("<td />",
      {
         id: "item_ids",
         text: "eBay Item IDs",
         class: "table_header"
      });
      
      var td3 = $("<td />",
      {
         id: "sizes",
         text: "Доступные размеры",
         class: "table_header"
      });
   
      var td4 = $("<td />",
      {
         id: "actions",
         text: "Действия",
         class: "table_header"
      });
      
      CS_table.append(tr1);
      tr1.append(td0);
      tr1.append(td1);
      tr1.append(td2);
      tr1.append(td3);
      tr1.append(td4);

      this.getCSdata();
   }
   
   this.setupDom = function()
   {
      this.CS_side_panel.css({"margin": "0"});   
      $('#content_div').html(this.CS_side_panel);
      
      this.show_button.click
      (
         {cs: this},
         function(event, ui)
         {
            event.data.cs.showCS()
         }
      );
      
      this.update_button.click
      (
         {cs: this},
         function(event, ui)
         {
            event.data.cs.updateCS()
         }
      );
      
      this.show_RP_button.click
      (
         {cs: this},
         function(event, ui)
         {
            event.data.cs.showRP()
         }
      );
      
      this.CS_side_panel.append(this.show_button);
      this.CS_side_panel.append(this.update_button);
      this.CS_side_panel.append(this.show_RP_button);
   }
   
   this.setupDom();
}

function getCSdata_callback() // создаёт строчку таблицы редактирования артикулов, заполняя её полученными предыдущей функцией данными
{
   var counter = cs_data_object.length-1;

   for (var i = 0; i < cs_data_object.length; i++)
   {
      var tr = $("<tr />",
      {
         id: "CS_table_row_"+i
      });
      
      $('#CS_table').append(tr);
      
      var td0 = $("<td />",
      {
         id: "key_td_"+i,
         class: evenRowColor(counter),
         text: counter
      });
      
      var td1 = $("<td />",
      {
         id: "articul_td_"+i,
         class: evenRowColor(counter),
         text: cs_data_object[i].articul
      });
      
      var td2 = $("<td />",
      {
         id: "item_ids_td_"+i,
         class: evenRowColor(counter),
         text: parseCSdataForItemIDs(cs_data_object[i].color_system_data, "item_ids")
      });
      
      var td3 = $("<td />",
      {
         id: "sizes_td_"+i,
         class: evenRowColor(counter),
         text: parseCSdataForItemIDs(cs_data_object[i].color_system_data, "sizes")
      });
           
      var td4 = $("<td />",
      {
         id: "actions_td_"+i,
         class: evenRowColor(counter)
      });
       
      var edit_button = $("<button />",
      {
         id: "edit_button_"+i,
         text: "Редактировать",
         onclick: "editCSacrticul('"+cs_data_object[i].color_system_data+"', "+cs_data_object[i].articul+")"
      });
      
      td4.append(edit_button);
      tr.append(td0);
      tr.append(td1);
      tr.append(td2);
      tr.append(td3);
      tr.append(td4);
      counter--;
   }
}

function parseCSdataForItemIDs(data, type)
{
    if (data && type == "sizes")
    {
        var result = eval("(" + data + ")");
        var output = "";
        
        for (var key in result)
        {
            output += result[key]+",";
        }
        
        return output;
    }
    else if (data && type == "item_ids")
    {
        var result = eval("(" + data + ")");
        var output = "";
        
        for (var key in result)
        {
            output += key+",";
        }
        
        return output;
    }
    else return "";
}

function buildColorSystem() // Color System init function
{
   color_system = new ColorSystem();
}

function editCSacrticul(data, articul)
{
   current_editing_articul = articul;
   
   if (data != "")
   {
      var counter = 0;
      var result = eval("(" + data + ")");
      console.log(data);
      
      for (var key in result)
      {
        item_ids[counter] = key;
        sizes[counter] = result[key];
        counter++;
      }
   }
   else
   {
      for (var i = 0; i < 3; i++)
        item_ids[i] = "";
   }
   
   var dialog_form = "<input id='item_id_input_1' class='cs_item_id_input' value='"+item_ids[0]+"' /><br><input id='item_id_input_2' class='cs_item_id_input' value='"+item_ids[1]+"' /><br><input id='item_id_input_3' class='cs_item_id_input' value='"+item_ids[2]+"' />";
   
   edit_dialog = $('<div></div>').html(dialog_form).dialog
   (
   {
      autoOpen: false,
      title: 'Редактирование item_ids артикула',
      width: 300,         
      modal: true,
      buttons: 
      {
         "Сохранить": function() 
         {
            save();
         },
         "Отмена": function() 
         {
            $(this).dialog( "close" );
         }
      }
   }
   );
   
   edit_dialog.dialog("open");
}

function save()
{
   edit_dialog.dialog({ title: "Пожалуйста, подождите..." })
   var item_id1 = $('#item_id_input_1').val();
   var item_id2 = $('#item_id_input_2').val();
   var item_id3 = $('#item_id_input_3').val();
   
   getSizesForItemID(item_id1, 0);
   getSizesForItemID(item_id2, 1);
   getSizesForItemID(item_id3, 2);
   
   
}

//################################################ ebay api area #################################################//

   
   
   var callback_counter = 0; // counter for reaction on third callback (_cb_findItemsByKeywords_callback)
   var complete_sizes = []; // array for every size collected by item ids
   var scripts = []; // array for <script> element of each ebay api intstance
   
   function getSizesForItemID(item_id, number)
   {
      scripts[number] = document.createElement('script');
      scripts[number].id = "request_script_"+number;
      scripts[number].src = "http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&callbackname=_cb_findItemsByKeywords&appid=POSPORTU-9a57-4494-8a38-3360140f9268&siteid=0&ItemID="+item_id+"&IncludeSelector=ItemSpecifics,Variations&version=767";
      document.body.appendChild(scripts[number]);
   }
   
   function _cb_findItemsByKeywords(root)
   {
      console.log("!");
      var vars = root.Item.Variations;
      var items = root.Item.ItemSpecifics;
      var c = 0;
      var sizes_result = []; // array for sizes of item id
      
      if (vars != null)
      {
         for (var i = 0; i < vars.Variation.length; i++)
         {
            for (var z = 0; z < vars.Variation[i].VariationSpecifics.NameValueList.length; z++)
            {  
               var str = vars.Variation[i].VariationSpecifics.NameValueList[z].Name.toLowerCase();
               if (str.indexOf('size') + 1)
               {
                  if (vars.Variation[i].Quantity - vars.Variation[i].SellingStatus.QuantitySold > 0)
                  {
                     var s_to_replace = vars.Variation[i].VariationSpecifics.NameValueList[z].Value[0];
                     sizes_result[c] = s_to_replace.replace(/[^\d.]/gi, '');
                     c++;
                  }
               }
            }
         }
      }
      
      for (var i = 0; i < items.NameValueList.length; i++)
      {
         var str = items.NameValueList[i].Name.toLowerCase();
         if(str.indexOf('size') + 1)
         {
            var s_to_replace = items.NameValueList[i].Value[0];
            sizes_result[0] = s_to_replace.replace(/[^\d.]/gi, '');
         }
      }
      
      _cb_findItemsByKeywords_callback(sizes_result);
      
   }
   
   function _cb_findItemsByKeywords_callback(result)
   {
      if (callback_counter < 3)
      {
         complete_sizes[callback_counter] = result;
         callback_counter++;
      }
      
      if (callback_counter == 3)
      {
         generateFullItemSizesObject();
      }  
   }
   
   function generateFullItemSizesObject()
   {
      console.log(complete_sizes);
      var item_id1 = $('#item_id_input_1').val();
      var item_id2 = $('#item_id_input_2').val();
      var item_id3 = $('#item_id_input_3').val();
      
      for (var i = 0; i < scripts.length; i++)
      {
         $('#'+scripts[i].id).remove();
         scripts[i] = "";
      }
      
      callback_counter = 0; // counter for reaction on third callback (_cb_findItemsByKeywords_callback)
      complete_sizes = [];
      edit_dialog.dialog("close");
      edit_dialog.dialog("destroy");
      edit_dialog = -1;
      
      var out = [];

      for (var z = 0; z < complete_sizes.length; z++)
      {
         var r = '[';
           
         for(var i = 0; i < complete_sizes[z].length; i++)
         {
            if (complete_sizes[z][i] != "")
            {
               if (i != complete_sizes[z].length-1)
                  r += complete_sizes[z][i]+',';
               else
                  r += complete_sizes[z][i];
            }
         }
         
         r += ']';
         out[z] = r;
      }
      
      var result = '{"'+item_id1+'": '+out[0]+',"'+item_id2+'": '+out[1]+',"'+item_id3+'": '+out[2]+'}';
      console.log(result);
      
      $.post
      (
         post_url, 
         {
            a: "CS_sFISO",
            b: current_editing_articul,
            c: result
         }, 
         function (result)
         {
            console.log(result == 1 ? "success" : "fail");
         }
      );
   }

//#######################################################################################################################//
