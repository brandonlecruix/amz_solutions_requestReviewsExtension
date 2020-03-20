/*
 	target http request:

	https:/
	/
	sellercentral.amazon.com/
	orders-api/
	search?limit=5&
	offset=400&
	sort=status_asc&
	date-range=last-90&
	q=Girl&
	qt=product-name&
	forceOrdersTableRefreshTrigger=false

*/
let number_of_requests = 0;
function a (details) {
	const url = new URL(details.url);
	//const orders_load_per_request = url.search.split("limit=")[1].split("&")[0];
	number_of_requests += 1;
	if ( number_of_requests == 2 /*&& orders_load_per_request > 5*/ ) 
	{
		number_of_requests = 0;
		const code_path = "/JS/content_scripts/main.js";
		let app_test_mode = localStorage.getItem ( "TEST_MODE" );
		let app_state     = localStorage.getItem ( "APP_STATE" );
		chrome.tabs.executeScript ( {runAt: 'document_start', file: code_path} );
		if  ( app_state == "on" ) {
			if ( app_test_mode  == "on" ) {
				const code_ = 
					`setTimeout (
						()=>{
							main( "TEST_MODE_" )
						},
						900
					)`
				chrome.tabs.executeScript ( {runAt: 'document_end', code: code_} );					
			}
			else if ( app_test_mode  == "off" || app_test_mode == null ) 
			{
				const code_ = 
					`setTimeout (
						()=>{
							main( "REQUEST_REVIEWS_MODE" )
						},
						900
					)`
				chrome.tabs.executeScript ( {runAt: 'document_end', code: code_} );
			}                              	
		}
	}
	else 
	{
		//number_of_requests = 0;
	}

}

chrome.webRequest.onCompleted.addListener(
	a ,
	{
		urls: 
			[ 
				"https://sellercentral.amazon.com/orders-api/refund-status?*",

				"https://sellercentral.amazon.co.uk/orders-api/refund-status?*",

				"https://sellercentral.amazon.ca/orders-api/refund-status?*"
			]
		
	}
);