export function formatDate(dateString, isStringified=true) {
    const date = new Date(dateString);

    if(isStringified) {
        const today = new Date();
        const yesterday = new Date();
        const days2ago = new Date();
        yesterday.setDate(today.getDate() - 1);
        days2ago.setDate(yesterday.getDate() - 1);
        
        const isSameDay = (d1, d2) => 
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    
        if (isSameDay(date, today)) {
            return "Today";
        }
    
        if (isSameDay(date, yesterday)) {
            return "Yesterday";
        }
    
        if (isSameDay(date, days2ago)) {
            return "2 Days Ago";
        }
    }


    return date.toLocaleDateString("en-US", {
        month: "short",
        day:"numeric",
        year:"numeric",
    });
}