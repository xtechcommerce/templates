$(document).ready(function(){
    $('.hideNew').hide();
    $('.hideNew').parent().hide();
    $('.hideNew').parents('.form-group').hide();
});

$('select[name="if:at_sight"').on("change", function(){

if($('select[name="if:at_sight"]').val() == "0"){
    $('.avista-opt').parents('.form-group').hide();
} else {
    $('.avista-opt').parents('.form-group').show();
    
}
    
});


if($('select[name="if:at_sight"]').val() == "0"){
    $('.avista-opt').parents('.form-group').hide();
} else {
    $('.avista-opt').parents('.form-group').show();
    
}

// Adjust 
if($('input[value="hed_foco"]').is(':checked')){
    $('.adjust-opt').parents('.form-group').hide();
}

$('input[name="layout:header"]').click(function(){
    if($(this).attr('value') != 'hed_foco'){
        $('.adjust-opt').parents('.form-group').slideDown();
    }else{
        $('.adjust-opt').removeClass('active').parents('.form-group').slideUp();
    }
})

// Template Settings - Opcao Personalizada

if($('input[value="est_custom"]').is(':checked')){
    $('.adv-hide').parents('.form-group').slideDown(); 
}else{
    $('.adv-hide').parents('.form-group').hide();
}

$('input[name="layout:structure"]').click(function(){
    if($(this).attr('value') == 'est_custom'){
        $('.adv-hide').parents('.form-group').slideDown();
    }else{
        $('.adv-hide').removeClass('active').parents('.form-group').slideUp();
    }
})

// SLIM

$('input[value="est_slim"]').click(function(){
    $('.adv-hide').parents('.setting-group').find('option[value="0"]').attr('selected','selected');
});

// FLUIDO

$('input[value="est_fluido"]').click(function(){
    $('.adv-hide').parents('.setting-group').find('option[value="0"]').attr('selected','selected');
    
    $('select[name="if:force_topbar"]').find('option[value="1"]').attr('selected','selected');
    $('select[name="if:force_header"]').find('option[value="1"]').attr('selected','selected');
    $('select[name="if:force_menu"]').find('option[value="1"]').attr('selected','selected');
    $('select[name="if:force_banner"]').find('option[value="1"]').attr('selected','selected');
});

// CAIXA

$('input[value="est_box"]').click(function(){
    $('.adv-hide').parents('.setting-group').find('option[value="0"]').attr('selected','selected');

    $('select[name="if:force_box"]').find('option[value="1"]').attr('selected','selected');
});

// CHECKOUT

function HideCheckout(){
    var bn = $('select[name="select:checkout_mode"]').val();
    switch(bn){
        case 'One Page Checkout':
            $('.power-checkout').parents('.form-group').slideUp();
            break;
        case 'Power Checkout':
            $('.power-checkout').parents('.form-group').slideDown();
            break;
    } 
}

// BANNERS EXTRA

function HideBan(){
    var bn = $('select[name="select:banner_extra"]').val();
    switch(bn){
        case '1':
            $('.ban-1').parents('.form-group').slideDown();
            $('.ban-2').parents('.form-group').slideUp();
            $('.ban-3').parents('.form-group').slideUp();
            break;
        case '2':
            $('.ban-1').parents('.form-group').slideDown();
            $('.ban-2').parents('.form-group').slideDown();
            $('.ban-3').parents('.form-group').slideUp();
            break;
        case '3':
            $('.ban-hide').parents('.form-group').slideDown();
            break;
        case 'Não':
            $('.ban-hide').parents('.form-group').slideUp();
    } 
}

// Run once - when opens
HideBan();
HideCheckout();

// Run in every changes
$('select[name="select:banner_extra"]').on('change', function() {
    HideBan();
});

$('select[name="select:checkout_mode"]').on('change', function() {
    HideCheckout();
});




