$(function(){function t(t,i){var t=location.href,i=document.title;n(".twitter_back.share_btn",t,i),o(".facebook_back.share_btn",t,i),e(".line_back.share_btn",t,i)}function n(t,n,o){$(t).attr("href","https://twitter.com/share?shareUrl="+n+"&text="+encodeURIComponent(o)),i(t,"Twitter",n)}function o(t,n,o){$(t).attr("href","https://www.facebook.com/sharer/sharer.php?u="+n+"&t="+encodeURIComponent(o)),i(t,"Facebook",n)}function e(t,n,o){$(t).attr("href","http://line.me/R/msg/text/?"+encodeURIComponent(o+" "+n)),i(t,"LINE",n)}function i(t,n,o){$(t).on("click",function(t){var n=this;window.open(n.href,"_blank","width=600, height=600, menubar=no, toolbar=no, scrollbars=yes"),t.preventDefault()})}var r=$(window).width(),a=$(window).height();$(document).on("ready",function(){$(".regular").slick({infinite:!0,slidesToShow:3,slidesToScroll:1,prevArrow:'<div class="btn_prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>',nextArrow:'<div class="btn_next"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>',responsive:[{breakpoint:900,settings:{slidesToShow:2}},{breakpoint:500,settings:{slidesToShow:1}}]})}),window.innerWidth>=768&&($(".l-flex-col-3").parent().addClass("l-flex-parent-3"),$(".l-flex-col-4").parent().addClass("l-flex-parent-4")),$(window).on("load scroll",function(){$(".fadein-up").length>0&&$(".fadein-up").each(function(){var t=$(window).scrollTop(),n=$(this).offset().top,o=$(window).height(),e=50;o-e>n-t?$(this).addClass("active"):$(this).css("opacity","0")})}),$(window).on("load resize",function(){$('a[href^=#]a:not(".carousel-control")').click(function(){var t=500,n=$(this).attr("href"),o=$("#"==n||""==n?"html":n),e=o.offset().top;return $("html, body").animate({scrollTop:e},t,"swing"),!1});var t=$(".btn-pagetop");t.hide(),$(window).scroll(function(){$(this).scrollTop()>800?t.fadeIn():t.fadeOut()});var n=$(".side_tab");n.hide(),$(window).scroll(function(){$(this).scrollTop()>800?n.fadeIn():n.fadeOut()})});var s=location.href,l=document.title;t();var r;$(function(){$(window).on("load scroll resize",function(){r=window.innerWidth})})});