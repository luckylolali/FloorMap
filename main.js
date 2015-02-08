/**
 * Created by Elaine on 1/22/15.
 */
//load json data
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
})();

$(document).ready(function(){

    //load default img
    loadSvg("floor_map_test.svg");

    $(".floor").on('click', function(event){
        event.preventDefault();
        loadSvg($(this).data('map'));
    })

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
            var room = json.rooms[this.id];
            if(room != undefined){
                $("#roomName").text(this.id);
                $("#roomDescription").text(room.description);
            }
        });

        $(".detail").height($("#svgdata").height());
            //$("#svgdata").html(data);
        });
}


