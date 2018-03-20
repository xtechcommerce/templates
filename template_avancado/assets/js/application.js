// Scroll to Top
var scrolltotop={setting:{startline:500,scrollto:0,scrollduration:1000,fadeduration:[500,100]},controlHTML:'<div class="top_button"></div>',controlattrs:{offsetx:5,offsety:15},anchorkeyword:"#top",state:{isvisible:false,shouldvisible:false},scrollup:function(){if(!this.cssfixedsupport){this.$control.css({opacity:0})}var a=isNaN(this.setting.scrollto)?this.setting.scrollto:parseInt(this.setting.scrollto);if(typeof a=="string"&&jQuery("#"+a).length==1){a=jQuery("#"+a).offset().top}else{a=0}this.$body.animate({scrollTop:a},this.setting.scrollduration)},keepfixed:function(){var c=jQuery(window);var b=c.scrollLeft()+c.width()-this.$control.width()-this.controlattrs.offsetx;var a=c.scrollTop()+c.height()-this.$control.height()-this.controlattrs.offsety;this.$control.css({left:b+"px",top:a+"px"})},togglecontrol:function(){var a=jQuery(window).scrollTop();if(!this.cssfixedsupport){this.keepfixed()}this.state.shouldvisible=(a>=this.setting.startline)?true:false;if(this.state.shouldvisible&&!this.state.isvisible){this.$control.stop().animate({opacity:1},this.setting.fadeduration[0]);this.state.isvisible=true}else{if(this.state.shouldvisible==false&&this.state.isvisible){this.$control.stop().animate({opacity:0},this.setting.fadeduration[1]);this.state.isvisible=false}}},init:function(){jQuery(document).ready(function(c){var a=scrolltotop;var b=document.all;a.cssfixedsupport=!b||b&&document.compatMode=="CSS1Compat"&&window.XMLHttpRequest;a.$body=(window.opera)?(document.compatMode=="CSS1Compat"?c("html"):c("body")):c("html,body");a.$control=c('<div id="topcontrol">'+a.controlHTML+"</div>").css({position:a.cssfixedsupport?"fixed":"absolute",bottom:a.controlattrs.offsety,right:a.controlattrs.offsetx,opacity:0,cursor:"pointer"}).attr({title:"Ir para o Topo"}).click(function(){a.scrollup();return false}).appendTo("body");if(document.all&&!window.XMLHttpRequest&&a.$control.text()!=""){a.$control.css({width:a.$control.width()})}a.togglecontrol();c('a[href="'+a.anchorkeyword+'"]').click(function(){a.scrollup();return false});c(window).bind("scroll resize",function(d){a.togglecontrol()})})}};scrolltotop.init();
// Add Brazilian Phone Supporte
$.fn.extend({
	mask_brazilian_phone: function(){
		$(this[0]).focusout(function(){
			var phone, element;
			element = $(this);
			element.unmask();
			phone = element.val().replace(/\D/g, '');
			if(phone.length > 10){
				element.mask("(99) 99999-999?9");
			} else{
				element.mask("(99) 9999-9999?9");
			}
		}).trigger('focusout');
	}
});
// Resize Function
$(window).resize(function(){
    // Positioning Popup on Resize
    if($('.modal-content').length > 0){
        $('.modal-dialog').animate({'opacity':'1'});
        popupRes($('#popup .modal-content'));
        popupRes($('#exit_popup .modal-content'));
    }
});

// Load Function
$(window).load(function(){
    if ($('#blog .blog-item').length > 0){
	    $('.blog-item .title').equalHeights();
	    $('.blog-item .resume').equalHeights();
	}
});
// Ready Function
$(document).ready(function(){
    $('.formAddCart').on('submit', function(e){
        e.preventDefault();
        var serialized = $(this).serialize();
        $.post(site_url.base+"/cart/add_to_cart", serialized, function(data){
            //console.log(data);
            var total = "R$ " + data["total"].toFixed(2).replace('.',',');
            $('#view_cartTotalItens').text(data["total_items"]);
            $('#view_cartTotalValue').text(total);
            $('#ProdModal .mod_prodaction .prodprice').html(total);
            $('#ProdModal').modal();
        }, 'json');
        return false;
    });
    
    // Positioning Popup
    setTimeout(function(){
        if($('.modal-dialog').length > 0){
            $('.modal-dialog').animate({'opacity':'1'});
            popupRes($('#popup  .modal-content'));
            popupRes($('#exit_popup  .modal-content'));
        }
    }, 200);
    
    setTimeout(function(){
        $('#flash .alert').animate({'top':'5px', 'opacity':1}, 500);
    }, 200);
    
    $('.close-alert').on('click', function(){
       $(this).closest('.alert').slideUp(); 
    });
    
    

	// Equalheight for homepage and category
	if ($('.product-list-item').length > 0){
		$('.product-list-item .prod-info').equalHeights();
		$('.product-list-item .prod-info label').equalHeights();
		$('.product-list-item .prod-info .price').equalHeights();
		$('.product-list-item .prod-info .onsight-price').equalHeights();
		$('.product-list-item .prod-image').equalHeights();
		$('.product-list-item .prod-wrapper').equalHeights();
	}

    // Image Swap
	$('.prod-wrapper').mouseover(function(){
		$(this).parent().find('.prod-action').css('display','block');
	});

	$('.prod-wrapper').mouseout(function(){
		$(this).parent().find('.prod-action').css('display','none');
	});

	$('.prod-image').mouseover(function(){
		$(this).parent().find('.prod-hover-image').css('opacity','1');
	});

	$('.prod-image').mouseout(function(){
		$(this).parent().find('.prod-hover-image').css('opacity','0');
	});

	// Link na tab do My Account
	tabs_hash();
	$(window).on('hashchange', tabs_hash); 
	
	$('.imgLiquidFill').imgLiquid({
		fill: false,
		horizontalAlign: "center",
		verticalAlign: "center"
	});
	
	search_current_selection = 0;
	search_current_url = '';

	$('#search-engine').focus(function(){
		if($('#search-results-in a').size() > 1){
			search_show();
		}
	});

	$('#top-search input').on('keyup', function(e){

		var key = e.keyCode;
		
		//Navegar pelo direcional do teclado
		if(key == 38 || key == 40 || key == 13){

			if($("#search-results a.up").size() == 0) search_current_selection = -1;
			switch(e.keyCode){
				// Para cima
				case 38:
					if(search_current_selection != -1 && search_current_selection != 0) search_current_selection--;
					break;
				// Para baixo
				case 40:
					if(search_current_selection != $("#search-results a").size()-1) search_current_selection++;
					break;
				// Enter
				case 13:
					if(search_current_url == '') $('#form-search').submit();
					if(search_current_url != '') document.location = search_current_url;
					break;
			}
			search_set_selected(search_current_selection);
		} else if(!((key >= 16 && key <= 20) || (key >= 33 && key <= 37) || key == 39 || key == 45 || (key >= 112 && key <= 145))){
			run_search_query();
		}
        
	});
	
	$('#top-search button').on('click', function(){
	   $('#form-search').submit(); 
	});

});

popupRes = function(el){
    var w_h = $(window).height();
    var p_h = el.outerHeight();
    el.animate({'top': (w_h - p_h)/2 + 'px'});
}

getCookie = function(c_name){
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" cookie=" + c_name);
    if (c_start == -1) {
        c_start = c_value.indexOf("cookie=" + c_name);
    };
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

del_cookie = function(name){
    document.cookie = 'cookie=' + name + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

del_real_cookie = function(cookie,name){
    document.cookie = cookie + '=' + name + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

search_show = function(){
	$('#search-results').show();
};

search_close = function(){
	$("body").click(function(event){
		var targ = $(event.target);
		if(!targ.is('#search-results') && !targ.is('#top-search input')){
			$('#search-results').hide();
			$('#search-loader').hide();
		}
	});
};

search_mouse_navigation = function(){
	$("#search-results a").hover(function(){
		if($(this).attr('id') != ''){
			search_current_selection = $(this).attr('id').substr(14);
			search_set_selected(search_current_selection);
		}
	}, function(){
		$("#search-results a").removeClass("up");
		search_current_url = '';
	});
};

search_set_selected = function(cur_selection){
	$("#search-results a").removeClass("up");
	$("#search-results a").eq(cur_selection).addClass("up");
	search_current_url = $("#search-results a").eq(cur_selection).attr("href");
};

run_search_query = function(){
	$('#search-loader').show();
	$.post(site_url.search_ajax, { name: $('#search-engine').val(), limit: 10 },
		function(data){
			$('#search-results-in').html('');
			var count = 'Nenhum produto foi encontrado.';
			var num = 0;
			$.each(data, function(index, product){
				if(index == 'count'){
					if(product == 50){
						count = 'Foram encontrados mais de '+product+' produtos.';
					} else{
						count = 'Foram encontrados '+product+' produtos.';
					}
				} else{
					$('#search-results').show();
					if($('.search-result-'+index).length == 0){
						var saleprice = '';
						var preco = '';
						var modelo = '';
						$.each(product.categories, function(){
							modelo = this.name;
						});
						if(product.saleprice == '0.00'){
							product_price = product.price.replace(".", ",");
							preco = '<span class="price">R$ '+product_price+'</span>';
						} else{
							product_saleprice = product.saleprice.replace(".", ",");
							product_price = product.price.replace(".", ",");
							preco = '<span class="price"><span class="saleprice">R$ '+product_price+'</span> R$ '+product_saleprice+'</span>';
						}
						$('#search-results-in').append('<a href="' + site_url.base + product.slug + '" id="search-result-' + num + '" class="search-result-' + index +'">' +
															'<div class="line">' +
																'<div class="image text-center">' +
																	product.image +
																'</div>' +
																'<div class="desc">' +
																	'<span class="name">' +
																		product.name +
																	'</span>' +
																	'<span class="category">'
																		+ modelo +
																	'</span> ' +
																	preco +
																'</div>' +
																'<div class="clearfix"></div>' +
															'</div>' +
														'</a>');
						num++;
					}
				}
			});
			$('#search-results-in').append('<div class="last text-center"><a href="#" onclick="$(\'#form-search\').submit();"><strong>Listar resultados</strong><br />'+count+'</a></div>');
			$('#search-loader').hide();
			search_show();
			search_mouse_navigation();
			search_close();
	}, 'json');
};

tabs_hash = function(){
	if(window.location.hash){
		var url = window.location.hash;
		$('#mytabs a[href="'+url+'"]').tab('show')
	};
};

function isEmail(email){
    er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/; 
    if( !er.exec(email) ){
      return false;
    }else{ return true; }
}

function checkCartMail() {
    var mail=getRealCookie("cartmail");
    if (mail!="") {
        return mail;
    }
}

function getRealCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}