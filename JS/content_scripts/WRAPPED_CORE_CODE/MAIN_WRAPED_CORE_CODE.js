/*
	WRAPPED CORE:
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

function get_marketPlaceId () {
	const marketPlaceId = 
		JSON.parse(
			localStorage[
				"MYO-LIST-ORDERS-MANIFEST"
			]
		)
		.marketplaceId;

	return marketPlaceId;
}

function press_all_request_review_btn () {
	const buttons = document.getElementsByTagName ( "app_button" );
	for ( let i = 0; i < buttons.length; i++ ) {
		buttons[i].click ();
	}
}

function lock_btn ( btn ) {
	btn.setAttribute ( 
		"disabled", 
		"true"
	);
	btn.setAttribute ( 
		"style", 
		`
		opacity: 0.4;
	    user-select: none;
	    pointer-events: none;
		` 
	);
}

function make_review_request ( order_id, callback ) {
	function get_endpoint () 
		{
			if ( location.href.split ( "sellercentral.amazon.com" ).length > 1 ) 
				{
					return "https://sellercentral.amazon.com/messaging/api/solicitations/";
				}

				else if ( location.href.split ( "sellercentral.amazon.co.uk" ).length > 1 )
						 {
						     return "https://sellercentral.amazon.co.uk/messaging/api/solicitations/";
						 }

						else if ( location.href.split ( "sellercentral.amazon.ca" ).length > 1 )
								 {
								     return "https://sellercentral.amazon.ca/messaging/api/solicitations/";
								 }
								 else 
								 	{
								 		alert ( `ENDPOINT NOT MATCHED. \n current endpoint: ${ location.href }` );
								 	}
		}

	const xhr = new XMLHttpRequest();
	const query_str = 
		get_endpoint () 						 +
		`${order_id}/` 							 +
		"productReviewAndSellerFeedback?" 		 +
		`marketplaceId=${get_marketPlaceId ()}&` +
		"buyerId=&" 							 +
		"customerType=&" 						 +
		"isReturn=false&" 						 +
		`documentReferrer=${ encodeURIComponent (`${ get_endpoint().split ( "/messaging/api/solicitations/" )[0] }/orders-v3/order/${order_id}`)}`

	xhr.open ( "GET", query_str );
	xhr.onload = ()=>{
		if ( xhr.status == 200 ) {
			console.log(
				`
				XHR STATUS: 	${xhr.status},
				XHR READYSTATE: ${xhr.readyState},
				XHR RESPONSE: 	${xhr.response},
				QUERY STRING: 	${query_str},

				CALLBACK: 		${callback}
				`
			);
			const is_sucess 		= JSON.parse ( xhr.response ).isSuccess;
			const ineligibleReason	= JSON.parse ( xhr.response ).ineligibleReason;
			let message;
			if ( ineligibleReason ) {
				const msg1 = `
								REVIEW REQUEST OUTSIDE TIME
							 `;
				const msg2 = `
								REVIEW REQUEST ALREADY SENT
							 `;
				if ( ineligibleReason == "REVIEW_REQUEST_ALREADY_SENT" ) {
					message = msg2;
				}
				else if ( ineligibleReason == "REVIEW_REQUEST_OUTSIDE_TIME_WINDOW" ) {
					message = msg1;
				}
			}
			else {
				message = `
							REVIEW REQUEST SENT!
						  `;
			}
			if ( callback ) {
				eval(callback)
			}
			//SEND THE REVIEW:
			if ( is_sucess == true ) {
				xhr.open ( "POST", query_str );
				xhr.onload =
					()=>{

					}
				xhr.setRequestHeader ( "content-type", "application/json" );
				xhr.setRequestHeader ( "x-requested-with", "A01596255MPE0V36MRSF" );
				xhr.send ("{}");
			}
		}
		else {
			console.log(
				`
				XHR STATUS: 	${xhr.status},
				XHR READYSTATE: ${xhr.readyState},
				XHR RESPONSE: 	${xhr.response},
				QUERY STRING: 	${query_str}

				CALLBACK: 		${callback}				
				`
			);
		}
	}
	xhr.send ();
}

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

function test_1(a) {
    a.setAttribute("style", "background-color: cyan;");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function eval_by_flags ( flags_arr, object_element, callback ) {
    const nonInclusive_flag = 
        {
            values:                  flags_arr.nonInclusive,
            qty:                     flags_arr.nonInclusive.length,
            expected_matched_qty:    flags_arr.nonInclusive.length,
            matched_qty:             0,
            is_total_matched:        undefined
        };
    const inclusive_flag   = 
        {
            values:                  flags_arr.inclusive,
            qty:                     flags_arr.inclusive.length,
            expected_matched_qty:    flags_arr.inclusive.length,
            matched_qty:             0,
            is_total_matched:        undefined
        }

    for ( let i = 0; i < inclusive_flag.qty; i++ ) {
        if ( object_element.innerHTML.split ( inclusive_flag.values[i] ).length > 1 ) {
            inclusive_flag.matched_qty       += 1;
            inclusive_flag.is_total_matched  = ( inclusive_flag.matched_qty == inclusive_flag.expected_matched_qty );
        }
    }
    if ( nonInclusive_flag.values.length  > 0 ) {
        for ( let i = 0; i < nonInclusive_flag.qty; i++ ) {
            if ( object_element.innerHTML.split ( nonInclusive_flag.values[i] ).length > 1 ) {
                inclusive_flag.matched_qty       -= 1;
                inclusive_flag.is_total_matched  = ( inclusive_flag.matched_qty == inclusive_flag.expected_matched_qty );
            }
        }
    }
    if ( inclusive_flag.is_total_matched == true ) {
            callback ()
    }
    /*console.log(`INCLUSIVE FLAGS: `);
    console.log(inclusive_flag);
    console.log(`NON INCLUSIVE FLAGS:`);
    console.log(nonInclusive_flag)*/
}

function main (mode_option) {
	var flags = 
	{
	    inclusive: [
	        "Payment complete"
	    ],
	    nonInclusive: [
	    	"refund-is-applied",
	    	"Refund applied",
	        "Canceled",
	        "Non-Amazon",
	        "Refund applied",
	        "Pending",
	        "Shipping",
	        "REQUEST REVIEW"
	    ]
	}

	add_request_review_all_btn ();
	var row = document.getElementsByTagName("tr");
	for ( let i = 0; i < row.length; i++ ) {
		eval_by_flags ( 
			flags, 
			row[i], 
			()=>{
				//INJECTS UI ELEMENTS FROM APP IN EACH ROW: 
				if ( row[i].getElementsByClassName("cell-body")[3] ) {
					//INJECTS ORDER ID In TABLE ROW (tr):
					row[i].setAttribute(
						"order_id", 
						row[i].
						children[2].
						children[0].
						children[0].
						children[0].
						innerHTML
					);
					const order_id = row[i].getAttribute ( "order_id" );

					add_app_elements (
						row[i].getElementsByClassName("cell-body")[3]
					);		
					row[i].getElementsByTagName("app_button")[0].
						addEventListener(
							"click", 
							()=>{
								if ( mode_option == "TEST_MODE_" ) {
									test_1 ( row[i] );
								}
								else if ( mode_option == "REQUEST_REVIEWS_MODE" ) 
								{ 
									make_review_request ( 
										order_id,
										`set_message ( document.getElementsByTagName("tr")[${i}].getElementsByTagName("app_message")[0], message, is_sucess )`
									)
								}
								lock_btn ( row[i].getElementsByTagName("app_button")[0] );
							}
						);
				}
			} 
		);
	}
}

main ( "REQUEST_REVIEWS_MODE" )