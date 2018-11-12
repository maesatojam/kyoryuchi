$(function() {
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();


// トップEVENTスライダー
$(document).on('ready', function() {
  $(".regular").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow:'<div class="btn_prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>',
    nextArrow:'<div class="btn_next"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>',
     responsive: [
       {
        breakpoint: 768, //767px以下のサイズに適用
        settings: {
          slidesToShow:2
        }
      },
       {
        breakpoint: 500, //414px以下のサイズに適用
        settings: {
          slidesToShow:1
        }
       }
    ]
  });
});



  if (window.innerWidth >= 768) {
    // 小要素が.l-flex-col-3の場合、親要素にclassを追加する
    $('.l-flex-col-3').parent().addClass('l-flex-parent-3');
    // 小要素が.l-flex-col-4の場合、親要素にclassを追加する
    $('.l-flex-col-4').parent().addClass('l-flex-parent-4');
  }



  // スクロールで要素をフェードイン表示
  $(window).on('load scroll', function() {
    if ($('.fadein-up').length > 0) {
      $('.fadein-up').each(function() {
        var scrTop = $(window).scrollTop();
        var startPosition = $(this).offset().top;
        var windowHeight = $(window).height();
        var delayHeight = 50;

        if (startPosition - scrTop < windowHeight - delayHeight) {
          $(this).addClass('active');
        } else {
          $(this).css('opacity', '0');
        }
      });
    }
  });

  // ロード・ウィンドウリサイズ時
  $(window).on('load resize', function() {
    //サイズが768px以上のときviewportを'width=1200'にする


    $('a[href^=#]'+'a:not(".carousel-control")').click(function(){
      var speed = 500;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({scrollTop:position}, speed, "swing");
      return false;
    });

    // ページのトップに戻る
    var topBtn = $('.btn-pagetop');
    topBtn.hide();
    $(window).scroll(function() {
      if ($(this).scrollTop() > 800) {
        topBtn.fadeIn();
      } else {
        topBtn.fadeOut();
      }
    });

    // サイドタブ
    var sideTab = $('.side_tab');
    sideTab.hide();
    $(window).scroll(function() {
      if ($(this).scrollTop() > 800) {
        sideTab.fadeIn();
      } else {
        sideTab.fadeOut();
      }
    });

  });




  /*▼ SNSシェアの設定*/
  // SNSの各種カウントを実装するためのjavascript。
  // jqueryとgoogleアナリティクスのロード完了が前提のコードなので注意。
  /**
   * SNSシェアボタンを指定された要素の下に埋め込む
   * @param shareUrl シェアするUrl。og:shareUrlの値と一緒にすることをオススメ
   * @param description ツイート本文などに埋め込む文言
   */
  var shareUrl  = location.href;
  var description = document.title;//タイトル

  	function setSnsShare(shareUrl, description) {
  		var shareUrl  = location.href;
  		var description = document.title;
  	    setTwitterLink(".twitter_back.share_btn", shareUrl,description);
  	    setFacebookLink(".facebook_back.share_btn", shareUrl, description);
  	    setLineLink(".line_back.share_btn", shareUrl, description);
  	}


  	function setTwitterLink(shareSelector, shareUrl, description) {
  	    $(shareSelector).attr("href", "https://twitter.com/share?shareUrl=" + shareUrl + "&text=" + encodeURIComponent(description));
  	    setShareEvent(shareSelector, 'Twitter', shareUrl);
  	}


  	function setFacebookLink(shareSelector, shareUrl, description) {
  	    $(shareSelector).attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl + "&t=" + encodeURIComponent(description));
  	    setShareEvent(shareSelector, 'Facebook', shareUrl);
  	}

  	function setLineLink(shareSelector, shareUrl, description) {
  	    $(shareSelector).attr("href", "http://line.me/R/msg/text/?" + encodeURIComponent(description + " " + shareUrl));
  	    setShareEvent(shareSelector, 'LINE', shareUrl);
  	}
  	setSnsShare();
  /**
   *  シェアボタン押下時にGoogleアナリティクスへイベントを送信する
   *  @param selector イベントを付与するセレクタ
   *  @param snsName SNSの名前（Googleアナリティクス上の表示に使われる）
   *  @param shareUrl シェア対象のURL（Googleアナリティクス上の表示に使われる）
   */
   function setShareEvent(selector, snsName, shareUrl) {
       $(selector).on('click', function(e){
           var current = this;
           //　*** Googleアナリティクスにイベント送らないなら、以下のコードは不要 ***
           // 'share'の文字列は任意に変えてもよい（Googleアナリティクス上の表示文字列として使われる）
           // 'nonInteraction' : 1にしないと、直帰率がおかしくなる（イベント発行したユーザーは直帰扱いでなくなる）ので注意
           // ga('send', 'social', snsName, 'share', shareUrl, {
           //     'nonInteraction': 1
           // });
           // *** Googleアナリティクス送信ここまで ****

           // このあたりは適当に書き換えて下さい
           window.open(current.href, '_blank', 'width=600, height=600, menubar=no, toolbar=no, scrollbars=yes');
           e.preventDefault();
       });
   }
  /*▲ SNSシェアの設定*/

  var windowWidth;
  $(function(){
  $(window).on('load scroll resize',function(){
    windowWidth = window.innerWidth;
  });
  });



});
