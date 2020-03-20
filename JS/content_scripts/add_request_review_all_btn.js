/*
	ADDS THE UI ELEMENT ** REQUEST REVIEW ALL ** BUTTON TO THE WEBSITE:
*/
function add_request_review_all_btn () {
	const html_template = 
	`
		<style type="text/css">
			app_control.btn_wrapper {
			    display: flex;
			    flex-direction: column;
			}
			app_button.request_all_reviews_btn {
			    display: flex;
			    flex-direction: row;
			    background-color: #fb00ff;
			    align-items: center;
			    justify-content: center;
			    color: white;
			    font-family: "Amazon Ember",Arial,sans-serif;
			    font-size: 80%;
			    font-weight: bold;
			    height: 26px;
			    padding: 4px 0px 4px 0px;
			    border-radius: 5px;
			    filter: drop-shadow(2px 4px 6px purple);
			    visibility: visible;
			    opacity: 0.5;
			}
			app_button.request_all_reviews_btn:hover {
				opacity: 1;
			}
			app_button.request_all_reviews_btn:active {
				opacity: 1;
				filter: unset;
				padding: 6px 0px 6px 0px;
			}
		</style>
		<app_button class="request_all_reviews_btn">REQUEST REVIEW ALL</app_button>
	`;
	const app_control = document.createElement ( "app_control" );
	app_control.className = "btn_wrapper";
	app_control.innerHTML = html_template;
	app_control.
		addEventListener ( 
			"click", 
			()=>{
				press_all_request_review_btn ();
				lock_btn ( app_control );
			}
		);
	const action_panel = document.querySelector(".push-right").parentNode ? document.querySelector(".push-right").parentNode : 
	alert(`
		THIS ELEMENT WAS NOT FOUND IN THE WEB PAGE:
		
		****   document.querySelector(".push-right").parentNode   ****
	`);

	if ( !document.getElementsByTagName ( "app_control" )[0] ) 
	{
		action_panel.append ( app_control );
	}	
	else 
	{
		document.getElementsByTagName ( "app_control" )[0].remove();
		action_panel.append ( app_control );
	}
}