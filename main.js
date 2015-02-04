/**
 * Created by Elaine on 1/22/15.
 */
var rooms = {
    "room301":{
        "description": "this is room 301",
        "picture": "http://www.sju.edu/"
    },
    "room302":{
        "description": "this is room 302",
        "picture": "http://www.sju.edu/"
    }
};
$(document).ready(function(){
    //$("#SVGDoc").attr("data","library_floor_2.svg");
    loadSvg("floor_map_test.svg");
    $("#second").click(function(){
        //$("#SVGDoc").attr("data","library_floor_2.svg");
        loadSvg("library_floor_2.svg");
        return false;
    });

    $("#third").click(function(){
        loadSvg("library_floor_3.svg");
        return false;
    });

    $(window).resize(function(){
        $(".detail").height($("#svgdata").height());
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

        $("[id^=room]").hover(function(){
            $("#infoDetail").css("display", "block");
            var room = rooms[this.id];
            if(room != undefined){
                $("#roomName").text(this.id);
                $("#roomDescription").text(room.description);
            }
        });

        $(".detail").height($("#svgdata").height());
            //$("#svgdata").html(data);
        });
}


function getDocument()
{
    var svgDoc = $('#room_315');
    alert( svgDoc );
}