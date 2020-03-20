/*
    METHOD TO RUN CALLBACKS / FUNCTIONS THAT INTERACT 
    WITH SPECIFIED HTML ELEMENT BY CERTAINLY CONDITIONS ** FLAGS ** 
    THAT INVOLVES THAT HTML ELEMENT.
*/
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