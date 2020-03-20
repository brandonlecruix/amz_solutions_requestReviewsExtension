const TURN_ON_OFF_APP_TOGGLE = document.getElementsByClassName ( "APP_STATE_TOGGLE" )[0];
const TEST_MODE_TOGGLE 		 = document.getElementsByClassName ( "TEST_MODE_TOGGLE" )[0];
const REQUEST_REVIEWS_TOGGLE = document.getElementsByClassName ( "REQUEST_REVIEWS_TOGGLE" )[0];


function set_state ( APP_OPTIONS_STATES_OR_APP_STATES ) {
	/* SAVE **APP_OPTIONS_STATES_OR_APP_STATES** STATE IN APP MEMORY */
	if ( localStorage.getItem ( APP_OPTIONS_STATES_OR_APP_STATES  ) == null ) {
		 localStorage.setItem ( APP_OPTIONS_STATES_OR_APP_STATES ,     "off" );
	}

	if ( localStorage.getItem ( APP_OPTIONS_STATES_OR_APP_STATES ) == "off" ) {
		 localStorage.setItem ( APP_OPTIONS_STATES_OR_APP_STATES,     "on" );
	}
	else if ( localStorage.getItem ( APP_OPTIONS_STATES_OR_APP_STATES ) == "on" ) 
	{
			  localStorage.setItem ( APP_OPTIONS_STATES_OR_APP_STATES,     "off" );
	}
	console.log(
		`${APP_OPTIONS_STATES_OR_APP_STATES} = ${ localStorage.getItem ( APP_OPTIONS_STATES_OR_APP_STATES ) }`
	)
}

function show_toggles_as_last_ON_state ( toggle_element, SAVED_STATE ) {
	if ( localStorage.getItem ( SAVED_STATE  ) == "on" ) {
		 toggle_element.checked = true;
	}
}

show_toggles_as_last_ON_state ( TURN_ON_OFF_APP_TOGGLE, "APP_STATE" );
show_toggles_as_last_ON_state ( TEST_MODE_TOGGLE, 		"TEST_MODE" );
show_toggles_as_last_ON_state ( REQUEST_REVIEWS_TOGGLE, "REQUEST_REVIEWS_MODE" );

TURN_ON_OFF_APP_TOGGLE.addEventListener(
	"change", 
	()=>{
		set_state ( "APP_STATE" );
		//FIRES NOTIFICATION:
		const notification_object = 
		{
			iconUrl: chrome.runtime.getURL ( "/assets/logo/RENDERED.png" ) ,
			title:   `EXTENSION IS: ${localStorage.getItem ( "APP_STATE" )}` ,
			message: "Amazon Seller 's central tool."
		}
		Notification.create ( notification_object );
	}
);
TEST_MODE_TOGGLE.addEventListener(
	"change", 
	()=>{
		set_state ( "TEST_MODE" );
		if ( REQUEST_REVIEWS_TOGGLE.checked == true  ) {
			REQUEST_REVIEWS_TOGGLE.click();
		}
		//FIRES NOTIFICATION:
		const notification_object = 
		{
			iconUrl: chrome.runtime.getURL ( "/assets/logo/RENDERED.png" ) ,
			title:   `Test mode is activated, RELOAD THE PAGE` ,
			message: "This mode will allow you to check the extension functionality without Requesting Reviews"
		}
		Notification.create ( notification_object );
	}
);
REQUEST_REVIEWS_TOGGLE.addEventListener(
	"change", 
	()=>{
		set_state ( "REQUEST_REVIEWS_MODE" );
		if ( TEST_MODE_TOGGLE.checked == true  ) {
			TEST_MODE_TOGGLE.click();
		}
		//FIRES NOTIFICATION:
		const notification_object = 
		{
			iconUrl: chrome.runtime.getURL ( "/assets/logo/RENDERED.png" ) ,
			title:   `REVIEW REQUESTS is activated, RELOAD THE PAGE` ,
			message: "You can Request Reviews with few clicks or even ONE click ;)"
		}
		Notification.create ( notification_object );
	}
);

