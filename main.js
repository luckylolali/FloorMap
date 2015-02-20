/**
 * Created by Elaine on 1/22/15.
 */
var json = null;

$(document).ready(function(){
    //load json data
    $.getJSON('roomInfo.json',function(result){
        json = result;
    });

    //load default img
    loadSvg("library_floor_1.svg");



    $(".floor").on('click', function(event){
        event.preventDefault();
        var detail = $("#infoDetail");
        //detail.hide();
        detail.find("p").show();
        detail.find("img").hide();
        detail.find(".room").empty();
        loadSvg($(this).data('map'));


    })

});

function loadSvg(filename){
    var showDetail = function(){
        var roomNum = $(this).attr('id');
        var room = json.rooms[roomNum];
        if(room != undefined){
            var detail = $('#infoDetail');
            detail.find('p').hide();
            detail.find('img').attr('src','images/' + room.picture).show();
            $("#roomTitle").text(room.title);
            $("#roomDetail").text(room.detail);
            var link = room.further;
            if(link != undefined){
                $("#roomLink").html(link);
            } else {
                $("#roomLink").empty();
            }

        }
    };

    $.ajax(filename, {
        dataType: "xml",
        type: "GET",
        success: function(result){
            var data = $(result).find('svg');
            data.attr("width", "100%").attr("height", "100%");
	    data.find("[id^=room]").attr("class", "active");
            $('#svgdata').empty().append(data);
            $(".main .active").on("click",function(){

                $(".highlight").attr("class","active");
                $(this).attr("class", "active highlight");
                showDetail.call(this);
            });
            $(".main .active").on('mouseenter',showDetail);

            $(".main .active").on("mouseleave",function(){
                showDetail.call($(".highlight"));
            });

            //$(".detail").height($("#svgdata").height());
        }
    })
}
