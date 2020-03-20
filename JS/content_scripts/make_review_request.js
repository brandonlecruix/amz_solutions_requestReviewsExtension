/*
	MAKE THE * REQUEST REVIEW * ORDER, HTTP CALL TO AMAZON WEB SERVER:
*/
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