/**
 * Created by Elaine on 1/22/15.
 */
$(document).ready(function(){
    //$("#SVGDoc").attr("data","library_floor_2.svg");
    loadSvg("library_floor_2.svg");
    $("#second").click(function(){
        //$("#SVGDoc").attr("data","library_floor_2.svg");
        loadSvg("library_floor_2.svg");
        return false;
    });

    $("#third").click(function(){
        loadSvg("library_floor_3.svg");
        return false;
    });


});

function loadSvg(filename){
    $.ajax({
        url: filename,
        settings:{
            dataType: "xml",
            type: "GET"
        }

    }).done(function(data){
            $(data).find('svg').each(function(){
                $("#svgdata").html($(this));
            });
            //$("#svgdata").html(data);
        });
}


function getDocument()
{
    var svgDoc = $('#room_315');
    alert( svgDoc );
}