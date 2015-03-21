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

    $("#roomPic").hide();

    $(".floor").on('click', function(event){
        event.preventDefault();
        originInfo();
        loadSvg($(this).data('map'));


    })

});

/*This function can use the original information at the info detail pane. */
function originInfo(){
    var detail = $("#infoDetail");
    //detail.hide();
    detail.find("p").show();
    detail.find("#roomPic").hide();
    detail.find("img").hide();
    detail.find(".room").empty();
}

function loadSvg(filename){
    /*Show the detail infomation when a svg element is chosen. */
    var showDetail = function(){
        var roomNum = $(this).attr('id');
        var room = json.rooms[roomNum];
        //if this room has detail information
        if(room != undefined){
            var detail = $('#infoDetail');
            detail.find('p').hide();
            detail.find('#roomPic').show();
            detail.find('img').attr('src','images/' + room.picture).show();
            $("#roomTitle").text(room.title);
            $("#roomDetail").html(room.detail);
            var link = room.further;
            if(link != undefined){
                var theLink = $(link.link);
                //var theLink = $("<a target=\"_blank\"></a>");
                //theLink.attr("href", "http://" + link.website);
                theLink.text(link.click);
                $("#roomLink").html(theLink);
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
	        data.find("[id=active]")
                .find("[id]")
                .attr("class", "act");

            $('#svgdata').empty().append(data);
            $(".act").on("click",function(){

                var highLight = $(".highlight");
                if(highLight.length > 0) {
                    //if this has a highlight class, remove it
                    if(/(^|\s)highlight(\s|$)/.test($(this).attr("class"))){
                        $(this).attr("class","act");
                    } else {
                        //remove highlight class from other element
                        $(".highlight").attr("class","act");
                        //add highlight class to this
                        $(this).attr("class", "act highlight");
                        showDetail.call($(this));
                    }

                } else {
                    $(this).attr("class", "act highlight");
                    showDetail.call($(this));
                }

            });
            $(".act").on('mouseenter',showDetail);

            $(".act").on("mouseleave",function(){
                var highLight = $(".highlight");
                if(highLight.length > 0) {
                    showDetail.call($(".highlight"));
                } else {
                    originInfo();
                }

            });

            $( "#roomLink > a" ).on("click", function( event ) {
                event.preventDefault();
            });



            //$(".detail").height($("#svgdata").height());
        }
    })
}
