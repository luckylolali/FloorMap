/**
 * Created by Elaine on 1/22/15.
 */
$(document).ready(function(){
    $(".st5").mouseenter(function(){
     alert(this.id);
    });
});

function loadMap(object){

}
function getDocument()
{
    var svgDoc = document.getElementById("SVGDoc").getSVGDocument();
    alert( svgDoc );
}