function main (mode_option) {
	var flags = 
	{
	    inclusive: [
	        "Payment complete"
	    ],
	    nonInclusive: [
	    	"Refund applied</span>" ,
	    	"refund-is-applied" ,
	    	"Refund applied" ,
	        "Canceled" ,
	        "Non-Amazon" ,
	        "Refund applied" ,
	        "Pending" ,
	        "Shipping" ,
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