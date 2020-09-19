var errors_array = [];
var error_dialog;

function createErrorDialog()
{
   error_string = "Возникли следующие ошибки:<br><ul>";

   for (var i = 0; i < errors_array.length; i++)
   {
      error_string += "<li>"+errors_array[i]+"</li>";
   }

   error_string += "</ul>";
   
   error_dialog = $('<div></div>').html(error_string).dialog
   (
      {
         autoOpen: false,
         title: 'ВНИМАНИЕ!',
         width: 500,
         
         modal: true,
         buttons: 
         {
            "OK": function() 
            {
               $( this ).dialog( "close" );
            }
         }
      }
   );
}

function pushError(msg_text)
{
   errors_array.push(msg_text);
   createErrorDialog();
}

function showErrorDialog()
{
   error_dialog.dialog("open");
   errors_array = [];
}