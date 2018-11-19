function initialize(id){
  var map = viewGoogleMap(id,null,true);
}

var gmap;
var tMarker;


var viewGoogleMap = function(id, option, isNumberPin){

  var openInfoWindow;
  var markerData;
  var markerArray = new Array();
  var ClearMarkerArray = new google.maps.MVCArray();


  //resizeWindow();

  var setMarkerClickListener = function(marker, markerData) {
  	 google.maps.event.addListener(marker, 'mouseover', function(event) {
      if (openInfoWindow) {
        openInfoWindow.close();
      }
      var offset = new google.maps.Size(-15, 15);
      openInfoWindow = new google.maps.InfoWindow({
        content:markerData.content,
        pixelOffset: offset
      });
      google.maps.event.addListener(openInfoWindow,'closeclick',function(){
        openInfoWindow = null;
      })
      openInfoWindow.open(marker.getMap(), marker);

    });

  };

  //リンクとマーカーを連動
  var setLinkClickEvent = function(lnk, marker){
    lnk.bind('click', function(){
      google.maps.event.trigger(marker, 'mouseover');
    });
  }

  //マーカー生成
  var setMarkerData = function(markerData) {

  	var lnk = null;
  	$('#spot_list > ul').empty();

    for (var i = 0; i < markerData.length; i++) {

      var icon = new google.maps.MarkerImage('/wp/wp-content/themes/kyoryuchi/assets/js/img/mapya.png',
       new google.maps.Size(64,64),
       new google.maps.Point(0,0),
       new google.maps.Point(16,32),
       new google.maps.Size(32,32)
       );

      var marker = new google.maps.Marker({
        position: markerData[i].position,
        title: markerData[i].title,
        map: gmap,
        icon: icon,
        id: markerData[i].id
      });

      // マーカークリックイベント作成
      setMarkerClickListener(marker, markerData[i], true);
      markerArray.push(marker);


      lnk = $('<li>').attr("id", markerData[i].id);
      lnk = $('<li>').append($('<a href="javascript:void(0)"/>').text(markerData[i].title));
      $('#spot_list > ul').append(lnk);
      setLinkClickEvent(lnk, marker);

    }
  };


  var refreshMarker = function(){

    $('#spot_list > ul > li').remove();

    var json_file;
    //if($('#cat').val() != ""){
    json_file = "/wp/wp-content/themes/kyoryuchi/assets/js/json/shop.json";
    //}else{
      //json_file = "./json/none.json";
    //}

    $.ajax({
      url: json_file,
      type: 'get',
      dataType: 'json',
      scriptCharset: 'utf-8',
      cache: false,
      timeout: 10000,
      error: function(){
        console.log('Miss..');
      },
      success: function(pdata){

        //console.log(pdata[0]);
        var markerData = new Array();
        for(var iLoop = 0; iLoop < pdata.length; iLoop++)
        {

          cat_ary = pdata[iLoop].cat.split(",");
          if($.inArray(location.hash.replace("#", ""), cat_ary) >= 0){

         //var content =  "<a href='https://www.google.com/maps/search/?api=1&query=Google&query_place_id=" + pdata[iLoop].place_id + "' target='_blank'>" + pdata[iLoop].name + "</a>";
         var content =  "<a href='" + pdata[iLoop].url + "' target='_blank'>" + pdata[iLoop].name + "</a>";

          markerData.push({
            position: new google.maps.LatLng(pdata[iLoop].lat, pdata[iLoop].lng),
            title: pdata[iLoop].name,
            cat: pdata[iLoop].cat,
            content: content,
            id:pdata[iLoop].place_id
          });
        }


        if(markerData.length > 0){
          setMarkerData(markerData);
        }

        }

      }
    });

  }

  option = option ? option : {};
  if(id == null){
    return;
  }

  var mapOption = {
    zoom: option.zoom || 17,
    center:option.center || new google.maps.LatLng(34.688417,135.193494),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl: true,
    zoomControl: true,
    scaleControl: true,
    streetViewControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.DEFAULT
    }
  };

  gmap = new google.maps.Map(document.getElementById(id), mapOption);


  var styles = [{
  "stylers":[
  { "saturation":'-60' },
  { "hue":'#cc9966' }
  ]

  },
  {
  featureType:'poi.park',
  elementType:'geometry.fill',
  stylers:[{color:'#cbdfad' }]
  },
  {
  featureType:'poi.business',
  stylers:[{visibility: 'off' }]
  }
  ];

  gmap.setOptions({styles: styles});


  google.maps.event.addListener(gmap, 'idle', function(){
    refreshMarker();
    //カテゴリ名表示
    $("#cat_name").html($("a[href = " + location.hash + "]").text());
    //resizeWindow();
  });



}


  $(function(){
    //カテゴリ選択ボタン
    $('.cat li').click(function() {
      //$("#cat_name").html($(this).text());
      initialize('map_custmomize');
      //window.alert($(this).attr('id'));
      //window.alert($(this).text());
    });
  });




//============================================
//
//============================================

function setZoomLimit(map, mapTypeId){

  var mapTypeRegistry = map.mapTypes;


  var mapType = mapTypeRegistry.get(mapTypeId);

  mapType.maxZoom = 17;
  mapType.minZoom = 11;
}


//============================================
//
//============================================
function resizeWindow(){
	var mapdiv = document.getElementById("map_custmomize");
	// mapdiv.style.width = "100%";
	// mapdiv.style.height = "590px";

}






//============================================
//IE8 forEach対応
//============================================


// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function( callback, thisArg ) {

    var T, k;

    if ( this == null ) {
      throw new TypeError( " this is null or not defined" );
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0; // Hack to convert O.length to a UInt32

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ( {}.toString.call(callback) != "[object Function]" ) {
      throw new TypeError( callback + " is not a function" );
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if ( thisArg ) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while( k < len ) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then

      if ( k in O ) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call( T, kValue, k, O );
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}
