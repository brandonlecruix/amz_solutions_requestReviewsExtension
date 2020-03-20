/*
	GETS MARKET PLACE ID REQUIRED FOR REVIEW REQUEST WEB HTTP REQUESTS:
*/
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