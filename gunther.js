function showForm() {
	$('#upper').slideUp(300);
	$('#mail').slideDown(300) 
}

function hideForm() {
	$('#mail_form')[0].reset();
	$('#mail').slideUp(300);
	$('#upper').slideDown(300);
	$('#error').html('');
	$('#error').hide();
}

$(document).ready(function() {
	$('#error').hide();
	$('#notice').hide();
	$('#mail').hide();
  
  $('#contact').click( function() { 
  	showForm();
  });

	$('#submit').click( function() {
		$.post("contact.php", $("#mail_form").serialize(),
			function(data){
				if (data.status == "OK") {
					$('#notice').html(data.notice);
					$('#notice').fadeIn(200).delay(4000).fadeOut(2000);
					hideForm();
				}
				else {
					$('#error').html(data.notice);
					$('#error').fadeIn(200);
				}
			}, "json");
	});
	$('#cancel').click( function() {
		hideForm();
	})
});