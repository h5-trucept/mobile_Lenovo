"use strict";
$(function() {

	$(window).resize(function() {
		$('html').css("fontSize", $(window).innerWidth() / 16)
	});
	$(window).resize();

	/*关闭广告*/
	$('#fixed i').tap(function() {
		$('#fixed').remove();
	});

	$('#main').scrollstart(function(event) {

		  console.log($('#main').scrollTop());


		if(Math.abs($(this).offset().top) >= $('#fixed').outerHeight()) {

			$('#fixed').css("position", "fixed")
		} else {
			$('#fixed').css("position", "static")
		}
	});

	$.getJSON("json/foot_nav.json", function(da) {
		var obj = da.data.skin;
		Run(obj)

	});

	var ton = false;
	var that;

	function Run(data) {

		$('.product_nav a').tap(function() {

			for(let i = 0; i < data.length; i++) {

				$('#foot_nav ul li img').eq(i).attr("src", data[i].icon_n);

				$('#main').css("display", "block");
				$('#foot_nav ul li img').eq(0).attr("src", data[0].icon_s);
				//				$('#foot_nav ul li img').eq(1).attr("src", data[1].icon_n);
				$('#foot_nav ul li a').css("color", "#38c");
				$('#foot_nav ul li a').eq(0).css("color", "pink");

				$('#foot_nav ul li').tap(function() {
					var index = $(this).index();
					if(index==0){
						mySwiper.startAutoplay();
					}else{
						mySwiper.stopAutoplay();
					}
					if(data[i].n == index) {
						$('#foot_nav ul li img').eq(0).attr("src", data[0].icon_n);
						if(ton) {
							$('#foot_nav ul li img').eq(that).attr("src", data[that].icon_n);
						}
						$(this).find('img').attr("src", data[index].icon_s);
						that = index;
						ton = true;
					}

				});
			}
		});

		/*--------------*/
		$('.product_nav a').tap();
	}

	$('#foot_nav ul li').tap(function() {
		var index = $(this).index();
		$('#foot_nav ul li a').css("color", "#38c");
		$(this).find('a').css("color", "pink");

		$('#box>div').hide();

		$('#box>div').eq(index).show();
	});

	$('.sliden').tap(function() {
		$(this).parent().next().slideToggle(400, "linear");
		$(this).next().slideToggle(400, "linear");
	});

	$('.product_nav>a').tap(function () {
			$('#box>div:not(#main)').hide();
	})
	$('#main').scrollstart(function () {
		console.log($('#main').offset().top)
	
		if($('#main').scrollTop()>=$('#main').innerHeight()){
			
			$('.top_up').css("visibility","visible");
		}else{
			$('.top_up').css("visibility","hidden");
		};
	})
	/*------------------*/
	
	
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'horizontal',
		loop: true,
		autoplay: 800,
		// 如果需要分页器
		pagination: '.swiper-pagination',
		autoplayDisableOnInteraction: false

	});

	/*-------------------*/
	$.getJSON("json/commodity.json", function(data) {
		var n = 0;
		for(var i of data) {
			n++;
			if(n <= 4) {
				var li = $('<li><img><h4></h4><p><b></b><span></span></p></li>').appendTo($('.mer #colum1'));
			} else {
				var li = $('<li><img><h4></h4><p><b></b><span></span></p></li>').appendTo($('.mer #colum2'));
			}

			li.find('img').prop("src", i.path);
			li.find('h4').html(i.name);
			li.find('p b').html("￥" + i.price);
			li.find('p span').html(i.pricedown);

		}
	})
});