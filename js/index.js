$(document).ready(function() {
    showSearch();
    showBtn();
    load();
    // showImg();

    // loadImg();
    // alert(n);
    //回到顶部功能
    $('.backTop').on('click',function() {
        $('body').animate({ scrollTop: 0 }, 800);
    });
    $('.backTop').mouseover(function() {
        $('.btn-icon').removeClass('showtext');
        $('.top-text').addClass('showtext');
    });
    $('.backTop').mouseout(function() {
        $('.btn-icon').addClass('showtext');
        $('.top-text').removeClass('showtext');
    });
    /**
     * Tab键标签切换
     * 1.绑定点击事件
     * 2.设置隐藏和显示属性，点击事件触发相应的内容显示
     */
    $(".tab-menu").each(function(index) {
        // 遍历tab按钮
        var listNode = $(this);
        $(this).click(function() {
            // 绑定点击事件
            $("div.show-index").removeClass("show-index");
            $(".selected").removeClass("selected");
            // 移除class使其隐藏
            $(".center_con>div").eq(index).addClass("show-index");
            listNode.addClass("selected");
            // 添加class使其显示
        })
    });
})



/**
 * 轮播图:
 * 1.通过改变图片盒子的位置实现图片位移
 * 2.添加显示图片的小圆点对应于图片的滚动，且小圆点能实现点击效果
 * 3.实现自动轮播
 * 4.给盒子添加hover事件，使鼠标滑动到盒子上图片停止轮播，滑出时开始轮播
 * 5.轮播图的无缝连接效果在于第一张图片和最后一张图片的衔接
 */
var i = 0;
// 图片索引
var clone = $(".focus-list>li").eq(0).clone();
$(".focus-list").append(clone);
// 克隆第一张图片并放到最后一张位置,使图片在利用css改变位置使能够更自然
var imgWidth = $(".focus-container").width();
// 获取图片盒子的宽度，方便设置滚动距离
// console.log(imgWidth);
var imgLength = $(".focus-list>li").size();
// console.log(imgLength);
// 获取图片张数
for (var j = 0; j < imgLength - 1; j++) {
    // 动态添加小圆点li标签
    $(".focus-num").append("<li></li>");
}
$(".focus-num>li").eq(0).addClass("on");
/**
 *roll:
 *1.获取图片位置来控制滚动距离
 *2.利用css改变位置实现无缝轮播
 */
function roll() {
    if (i == imgLength) {
        //btn_l按钮
        $(".focus-list").css({
            left: 0
        });
        i = 1;
    }
    if (i == -1) {
        //btn_r按钮
        $(".focus-list").css({
            left: -parseInt((imgLength - 1) * imgWidth)
        });
        i = imgLength - 2;
    }
    $(".focus-list").stop().animate({ left: -i * imgWidth }, 500);
    if (i == imgLength - 1) {
        $(".focus-num>li").eq(0).addClass("on").siblings().removeClass("on");
    } else {
        $(".focus-num>li").eq(i).addClass("on").siblings().removeClass("on");
    }
}
// 自动轮播
var auto = setInterval(function() {
    i++;
    roll();
}, 3000);


$(".focus-img").hover(function() {
    clearInterval(auto);
}, function() {
    auto = setInterval(function() {
        i++;
        roll();
    }, 3000);
});

// 鼠标滑动到小圆点上
$(".focus-num>li").hover(function() {
    var index = $(this).index();
    $(".focus-list").stop().animate({
        left: -parseInt(index * imgWidth)
    }, 500);
    $(".focus-num>li").eq(index).addClass("on").siblings().removeClass("on");
    // 给当前元素添加选中属性同时移除其他同类元素的选中属性
})

// 点击轮播
$(".btn_l").on('click',function() {
    i++;
    roll();
})
$(".btn_r").on('on',function() {
    i--;
    roll();
})


// 换肤菜单栏显示与隐藏
$('.change-skin-btn').click(function() {
    $(".skin-container").slideDown(400);
})
$('.roll-up').click(function() {
    $(".skin-container").slideUp(600);
})
$(".scroll-more-btn").click(function() {
    $(".scroll-show").css({ "display": "block" });
    $(".scroll-more-btn").css({ "display": "none" });
    $("#footer").css({ "display": "none" });
})
$('.wrapper-container,.main-container').click(function() {
    $(".skin-container").slideUp(600);
})

/**
 *顶部搜索框固定：
 *1.当鼠标滑动高度大于当前header的高度时出现固定搜索框
 *2.搜索框用slide方式滑下
 *3.滚动高度小于header时收起菜单
 */
function showSearch() {
    $(window).scroll(function() {
        var showScrollHeight = $(window).scrollTop();
        console.log(showScrollHeight);
        var searchHeight = $('#wrapper').height() - $('#header').height() * 2;
        // console.log(searchHeight);
        if (showScrollHeight > searchHeight) {
            $('.hide-search').slideDown(400);
        } else {
            $('.hide-search').hide();
        }
    });
}



/**
 *回到顶部功能实现：
 */

function showBtn() {
    $(window).scroll(function() {
        var scrollHeight = $(window).scrollTop();
        // 获取滚动高度
        // console.log(scrollHeight);
        var screenHeight = $(window).height();
        // 获取窗口高度
        // console.log(screenHeight);
        if (scrollHeight > 0) {
            $(".backTop").css({ "display": "block" });
        } else if (scrollHeight <= screenHeight) {
            $(".backTop").css({ "display": "none" });
        }
    });
}


/**
 *skin效果预览：
 *鼠标滑动到图片上预览框显示相应背景图片
 *
 */
// var curImg,bgImg;
var n;
$('.skin-img li').mouseover(function() {
        n = $(this).index();
        $('.bgimg-con').css({
            "background-image": 'url(images/Lskin' + n + '.jpg)',
            "background-position": "0 15px"
        });
        $(".bgimg-con").css("background-size", "264px 180px");
        // console.log(i);

    })
    // var eles=$('.skin-img li');
    // console.log(eles[7]);
$('.list-one img').click(function() {
    $('body').css({
        "background-image":'url(images/Lskin' + n + '.jpg)',
        "background-attachment":'fixed'
    });
    save(n);
    // alert($('body').data('getImg'));
})
$('.no-skin').click(function() {
    $('body').css({ "background-image": "none" });
});


var curImg;
function save(data) {
    localStorage.setItem('getImg',data);
}

function load() {
    curImg = localStorage.getItem('getImg');
    $('body').css(
        "background", 'url(images/Lskin' + curImg + '.jpg)'
    );
}
// window.onload = load();
// var curImg;
// 当前背景图片
// curImg=$('body').attr('background');
// $('body').data('getImg', n);
// alert(result());
// console.log(curUrl);
// showImg();


function showImg() {
    var m = $('body').data('getImg');
    alert($('body').data('getImg'));
    $('body').css(
        "background", 'url(images/Lskin' + m + '.jpg)'
    );
}



// function change(curImg){
//     $('.body').css("curBg");
// }
// function save(m){
//      $('body').data("curBg", "'background','url(images/Lskin' + m + '.jpg)'");
// }
// function loadImg(){
//     // curImg=$('body').data("curBg");
//     alert($('body').data("curBg"));
//     change(bgImg);
// }


/**
 *导航栏登录设置的hover显示
 */
$('.login').mouseenter(function() {
    $('.personal-list').addClass('show-index');
});
$('.login').mouseleave(function() {
    $('.personal-list').removeClass('show-index');
})
$('.settings').mouseenter(function() {
    $('.setting-list').addClass('show-index');
});
$('.settings').mouseleave(function() {
    $('.setting-list').removeClass('show-index');
})
$('.more').mouseenter(function() {
    $('.more-list').addClass('show-index').css({
        "height": $(window).height()
    });
});
$('.more').mouseleave(function() {
    $('.more-list').removeClass('show-index');
})
