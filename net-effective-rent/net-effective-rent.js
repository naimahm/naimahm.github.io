$(document).ready(function(){
  $('input[name="rent"]').parent().on('click', function () {
    var rentType = $(this).children()[0]['id'];
    $('#submit').button(rentType);
  });
    $("#submit").click(function(evt){
      evt.preventDefault();
      var $out = $("#output");
      var rent = $("#rent").val(), rentType = $('input[name="rent"]:checked').attr('id'), concessionLength = $("#concessionLength").val(), leaseLength = $("#leaseLength").val();
      if(rentType && rent.length && concessionLength.length && leaseLength.length){
        if($out.is(':hidden')){ $out.show(); }
        $('input').removeClass('has-error');
        var getRent = rentType === "net" ? getGrossRent : getNetEffectiveRent;
        $out.val(
          'Your '
            + (rentType === "net" ? "actual monthly rent" : "net effective rent")
            + ' will be $' +getRent(rent, concessionLength, leaseLength)+ '.');
        if($('#submit').hasClass('btn-success')){
          $('#submit').removeClass('btn-success')
              .addClass('btn-warning')
              .text('Recalculate');
        }
      }else{
        if(rent === '') $('#rent').parent().addClass('has-error');
        if(concessionLength === '') $('#concessionLength').parent().addClass('has-error');
        if(leaseLength === '') $('#leaseLength').parent().addClass('has-error');
      }
    });
	
});

function getGrossRent(netRent, concessionLength, leaseLength){
  return (leaseLength * netRent)/(leaseLength - concessionLength);
}

function getNetEffectiveRent(grossRent, concessionLength, leaseLength){
  return (grossRent) - (concessionLength * grossRent/leaseLength);
}
