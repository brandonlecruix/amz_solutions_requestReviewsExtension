//CREATE PUSH NOTIFICATION:
const Notification = {
    id: "tool_for_amazon",
    template: {
        type: "basic",
        iconUrl: "/assets/logo/RENDERED.png",
        title: "REQUEST REVIES for ASC IS RUNNING",
        message: "You can set it On / Off at extension 's popup",
        /*priority: 2,*/
        eventTime: Date.now()
    },
    create: (details_object)=>{
    	if ( details_object ) {
            chrome.notifications.clear(Notification.id);
	        Notification.template.iconUrl = details_object.iconUrl;
	        Notification.template.title = details_object.title;
	        Notification.template.message = details_object.message;	
    	} 
        chrome.notifications.create(
            Notification.id,
            Notification.template,
            function() {
                Notification.remove();
            }
        );
    },
    remove: ()=> {
        setTimeout(()=>{
            //chrome.notifications.clear(Notification.id);
        }, 4000);
    }
}