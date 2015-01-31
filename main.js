/**
 * Created by Elaine on 1/22/15.
 */
$(document).ready(function(){
    //$("#SVGDoc").attr("data","library_floor_2.svg");

    $("#second").click(function(){
        $("#SVGDoc").attr("data","library_floor_2.svg");
        return false;
    });

    $("#third").click(function(){
        $("#SVGDoc").attr("data","library_floor_3.svg");
        return false;
    });
});

function getDocument()
{
    var svgDoc = document.getElementById("SVGDoc").getSVGDocument();
    alert( svgDoc );
}