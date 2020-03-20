/*
	SET MESSAGE FOR THE TINY POPUP MESSAGE IN ORDERS ROW:
*/
function set_message ( msg_recipient, message, is_sucess ) {
	msg_recipient.innerHTML = message;
	msg_recipient.style.visibility = "visible";
	if ( is_sucess == true ) {
		msg_recipient.style.backgroundColor = '#4be2a3';
	} 
	else {
		msg_recipient.style.backgroundColor = '#ff6262'
	}
}