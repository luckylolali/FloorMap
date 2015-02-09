/**
 * Created by Elaine on 1/22/15.
 */
//load json data
/*
var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'roomInfo.json',
        'dataType': "json",
        'success': function (result) {
            json = result;
        }
    });
    return json;
})();*/
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
        loadSvg($(this).data('map'));
    })

});
/*
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
            var room = json.rooms[this.id];
            if(room != undefined){
                $("#roomName").text(this.id);
                $("#roomDescription").text(room.description);
            }
        });

        $(".detail").height($("#svgdata").height());
            //$("#svgdata").html(data);
        });
}*/

function loadSvg(filename){
    var showDetail = function(){
        var roomNum = $(this).attr('id');
        var room = json.rooms[roomNum];
        if(room != undefined){
            $("#roomName").text(roomNum);
            $("#roomDescription").text(room.description);
        }
    };

    $.ajax(filename, {
        dataType: "xml",
        type: "GET",
        success: function(result){
            var data = $(result).find('svg');
            $('#svgdata').empty().append(data);
            $("[id^=room]").on('mouseenter',showDetail);
            $(".detail").height($("#svgdata").height());
        }
    })
}
