/*
	CLICKS ON ALL THE ** REQUEST REVIEW ** BUTTONS IN ORDER ROWS:
*/
function press_all_request_review_btn () {
	const buttons = document.getElementsByClassName ( "request_review_btn" );
	for ( let i = 0; i < buttons.length; i++ ) {
		buttons[i].click ();
	}
}