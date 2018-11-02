$(function() {
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

  // 768px以上のときdevice-widthを書き換え
  // var metalist = document.getElementsByTagName('meta');
  // for (var i = 0; i < metalist.length; i++) {
  //   var name = metalist[i].getAttribute('name');
  //   if (name && name.toLowerCase() === 'viewport') {
  //     if (window.innerWidth >= 768) {
  //       metalist[i].setAttribute('content', 'width=1200');
  //     } else {
  //       metalist[i].setAttribute('content', 'width=device-width,initial-scale=1.0,minimum-scale=1.0');
  //     }
  //   }
  // }

  // laoding
  // $('#loader-wrap ,.loader').height(windowHeight).css('display', 'block');
  // $(window).load(function() {
  //   $('#loader-wrap').delay(600).fadeOut(500);
  //   $('#loader').delay(400).fadeOut(200);
  //   $('.l-wrapper').css('opacity', '1');
  // });

  //10秒たったら強制的にロード画面を非表示
  // setTimeout(function(){
  //   $('#wrapper').css('opacity','1');
  //   $('#loader-wrap').delay(600).fadeOut(500);
  //   $('#loader').delay(400).fadeOut(200);
  // },10000);

  // swiper slide
  var swiper = new Swiper('.swiper-container', {
    zoom: true,
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 5000,
    },
    speed: 2000,
    loop: true,
  });

  // drawer
  $('.drawer').drawer({
    class: {
      nav: 'drawer-nav',
        toggle: 'drawer-toggle',
        overlay: 'drawer-overlay',
        open: 'drawer-open',
        close: 'drawer-close',
        dropdown: 'drawer-dropdown'
    },
    iscroll: {
      mouseWheel: true,
      preventDefault: false
    },
    showOverlay: true
  });

  // pc search button
  $('.header-nav-search').on('click', function() {
    $('.header-pc-search-wrap').slideToggle(function() {
      if ($(this).is(':visible')) {
        $('.contents').on('click', function() {
          $('.header-pc-search-wrap').slideUp();
        });
      }
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

    // ページ内リンク
    $('[href^="#"]' + '[href!="#"]').click(function() {
      var href = $(this).attr('href');
      var $target = $(href === '#' || href === "" ? 'html' : href);

      scroll_func($target);
      return false;
    });

    // ページのトップに戻る
    var topBtn = $('.btn-pagetop');
    topBtn.hide();
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        topBtn.fadeIn();
      } else {
        topBtn.fadeOut();
      }
    });

  });

});
