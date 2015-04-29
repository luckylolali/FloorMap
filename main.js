/**
 * Created by Elaine on 1/22/15.
 */

var json = null;
//store the floor and room hash tag info
var tags = new Array();

$(document).ready(function(){
    var hashTag = location.hash;
    hashTag = hashTag.replace(/#*/, '');
    tags = hashTag.split("&");
    var current = tags[0] || "DrexelFloor1";
    //if browser doesn't support svg
    if(!Modernizr.svg){
        $('.fill').removeClass('fill');
        $('.main').hide();
        $('.nosvgcontainer').show();
        $('.nosvgcontainer > img').width($('.nosvgcontainer').width());
        $(".floor").on('click', function(event){
            event.preventDefault();
            var map = $(this).data('map');
            markActiveClass(map);
            $('.nosvgcontainer').find('img').attr('src','pic/' + pic + '.png');
        });
    } else {
        //if browser doesn't support flex
        if(!Modernizr.flexbox){
            alert('flexbox is not supported.');
            $(".detail").height($("#svgdata").height());
        } else {
            //load JSON data
            $.getJSON('roomInfo.json',function(result){
                json = result;
            });
            //load default map
            loadSvg(current + '.svg');

            $(".floor").on('click', function(event){
                event.preventDefault();
                originInfo();
                var map = $(this).data('map');
                //set hash tag
                //window.location.hash = map;
                loadSvg(map + '.svg');
                tags[1] = null;
                setHashTag();
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

/*This function add the active class to the building and the floor when the nav tab is clicked*/
function markActiveClass(filename){
    $('.active').removeClass('active');
    /*Mark which floor is displaying */
    if(filename.indexOf('D') >= 0){
        $('#DL').addClass('active');
        $('#pane1').addClass('active');
        if(filename.indexOf("1") >= 0){
            $('#DL1').addClass('active');
            tags[0] = "DrexelFloor1";
        } else if(filename.indexOf('2') >= 0){
            $('#DL2').addClass('active');
            tags[0] = "DrexelFloor2";
        } else{
            $('#DL3').addClass('active');
            tags[0] = "DrexelFloor3";
        }
    } else {
        $('#PLC').addClass('active');
        $('#pane2').addClass('active');
        if(filename.indexOf("1") >= 0){
            $('#PLC1').addClass('active');
            tags[0] = "PostFloor1";
        } else if(filename.indexOf('2') >= 0){
            $('#PLC2').addClass('active');
            tags[0] = "PostFloor2";
        } else{
            $('#PLC3').addClass('active');
            tags[0] = "PostFloor3";
        }
    }
}

/*Set value to location.hash */
function setHashTag(){
    if(tags[1] != null){
        location.hash = tags[0] + '&' + tags[1];
    } else {
        location.hash = tags[0]
    }
}

/*Ajax function, load floor map and add event handler*/
function loadSvg(filename){
    markActiveClass(filename);
    /*Show the detail infomation when a svg element is chosen. */
    var showDetail = function(){
        var roomNum = $(this).attr('id');
        var room = json[roomNum];
        //if this room has detail information
        if(room != undefined){
            var detail = $('#infoDetail');
            detail.find('p').hide();
            detail.find('#roomPic').show();
            detail.find('img').attr('src','images/' + room.picture).show();
            $("#roomTitle").text(room.title);

            var description = room.detail;
            if(description != undefined){
                $("#roomDetail").html(description);
            } else {
                $("#roomDetail").empty();
            }

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

    $.ajax("SVG/" + filename, {
        dataType: "xml",
        type: "GET",
        success: function(result){
            var data = $(result).find('svg');
            data.attr("width", "100%").attr("height", "100%");
            data.find("[id=active]")
                .find("[id]")
                .attr("class", "act");

            $('#svgdata').empty().append(data);

            originInfo();

            if(tags[1] != null ){
                var current = $('#'+ tags[1]);
                current.attr("class", "act highlight");
                showDetail.call(current);
            }

            $(".act").on("click",function(){
                var highLight = $(".highlight");
                if(highLight.length > 0) {
                    //if this has a highlight class, remove it
                    if(/(^|\s)highlight(\s|$)/.test($(this).attr("class"))){
                        $(this).attr("class","act");
                        tags[1] = null;
                    } else {
                        //remove highlight class from other element
                        $(".highlight").attr("class","act");
                        //add highlight class to this
                        $(this).attr("class", "act highlight");
                        tags[1] = $(this).attr('id');
                        showDetail.call($(this));
                    }
                } else {
                    $(this).attr("class", "act highlight");
                    tags[1] = $(this).attr('id');
                    showDetail.call($(this));
                }
                setHashTag();
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
                tags[1] = null;
                setHashTag();
                var link = $(this).attr("xlink:href");
                loadSvg(link);
                //setHashTag();
            });
        }
    })
}
