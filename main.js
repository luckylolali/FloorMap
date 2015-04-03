/**
 * Created by Elaine on 1/22/15.
 */
var json = null;

$(document).ready(function(){
    if(!Modernizr.svg){
        $('.fill').removeClass('fill');
        $('.main').hide();
        $('.nosvgcontainer').show();
        $('.nosvgcontainer > img').width($('.nosvgcontainer').width());
        $(".floor").on('click', function(event){
            event.preventDefault();
            var map = $(this).data('map');
            markActiveClass(map);
            var pic = map.replace('svg','png');
            $('.nosvgcontainer').find('img').attr('src','pic/' + pic);
        });
    } else {
        if(!Modernizr.flexbox){
            $(".detail").height($("#svgdata").height());
        } else {
            //load JSON data
            $.getJSON('roomInfo.json',function(result){
                json = result;
            });

            //load default map
            loadSvg("DrexelFloor1.svg");

            $("#roomPic").hide();

            $(".floor").on('click', function(event){
                event.preventDefault();
                originInfo();
                loadSvg($(this).data('map'))
            })
        }
    }
});

/*This function can show the original information at the info detail panel. */
function originInfo(){
    var detail = $("#infoDetail");
    //detail.hide();
    detail.find("p").show();
    detail.find("#roomPic").hide();
    detail.find("img").hide();
    detail.find(".room").empty();
}

function markActiveClass(filename){
    $('.active').removeClass('active');
    /*Mark which floor is displaying */
    if(filename.indexOf('D') >= 0){
        $('#DL').addClass('active');
        $('#pane1').addClass('active');
        if(filename.indexOf("1") >= 0){
            $('#DL1').addClass('active');
        } else if(filename.indexOf('2') >= 0){
            $('#DL2').addClass('active');
        } else{
            $('#DL3').addClass('active');
        }
    } else {
        $('#PLC').addClass('active');
        $('#pane2').addClass('active');
        if(filename.indexOf("1") >= 0){
            $('#PLC1').addClass('active');
        } else if(filename.indexOf('2') >= 0){
            $('#PLC2').addClass('active');
        } else{
            $('#PLC3').addClass('active');
        }
    }
}

function loadSvg(filename){
    markActiveClass(filename);
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
            /*Go to the other side of the building*/
            $("#active > a").on('click', function(event){
                event.preventDefault();
                originInfo();
                var link = $(this).attr("xlink:href");
                loadSvg(link);
            });
        }
    })
}
