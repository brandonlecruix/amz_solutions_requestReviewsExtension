/*
	ADDS APP / EXTENSIONS UI ELEMENTS TO THE WEBSITE ( ** REQUEST REVIEW ** ) BUTTONS:
*/

function add_app_elements ( target ) {
	const html_template = 
	`
		<style type="text/css">
			app_div.btn_wrapper {
			    position: relative;
			    display: flex;
			    flex-direction: column;
			    width: 100%;
			}
			app_button.request_review_btn {
			    display: flex;
			    flex-direction: row;
			    background-color: #fb00ff;
			    align-items: center;
			    justify-content: center;
			    color: white;
			    font-family: "Amazon Ember",Arial,sans-serif;
			    font-size: 13px;
			    font-weight: bold;
			    width: 133px;
			    height: 26px;
			    padding: 4px 0px 4px 0px;
			    border-radius: 5px;
			    filter: drop-shadow(2px 4px 6px purple);
			    margin-bottom: 8px;
			    visibility: visible;
			    opacity: 0.5;
			}
			app_button.request_review_btn:hover {
				opacity: 1;
			}
			app_button.request_review_btn:active {
				opacity: 1;
				filter: unset;
				padding: 6px 0px 6px 0px;
			}
			app_message.rr_message {
			    display: flex;
			    flex-direction: row;
			    background-color: #E91E63;
			    align-items: center;
			    justify-content: center;
			    color: white;
			    font-family: "Amazon Ember",Arial,sans-serif;
			    font-size: 12px;
			    font-weight: bold;
			    width: 125px;
			    height: 75px;
			    padding: 4px 10px 4px 12px;
			    border-radius: 11px;
			    filter: drop-shadow(2px 4px 5px #d0d0d0);
			    visibility: hidden;
			}
		</style>
		<app_button class="request_review_btn">REQUEST REVIEW</app_button>
		<app_message class="rr_message">message goes here...</app_message>
	`;
	const app_div = document.createElement("app_div");
	app_div.className = "btn_wrapper";
	app_div.innerHTML = html_template;
	target.append ( app_div );
}