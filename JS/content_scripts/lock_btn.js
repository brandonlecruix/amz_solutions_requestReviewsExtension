/*
	LOCKS A BUTTON AFTER BEING CLICKED, AND PREVENT A DUPLICATE ACTION CALLBACK:
*/
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