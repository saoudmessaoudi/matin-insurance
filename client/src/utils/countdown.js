export default (endDate, inversed = false) => {
    let diff;
    if(!inversed)
        diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
    else
        diff = (Date.parse(new Date()) - Date.parse(new Date(endDate)) ) / 1000;

    //   countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
        years: 0,
        months: 0,
        weeks:0,
        days: 0,
        hours: 0,
        min: 0,
        sec: 0,
        millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
        timeLeft.years = Math.floor(diff / (365.25 * 86400));
        if(timeLeft.years === 1 && inversed)
            return " last year {none}"
        const word = (timeLeft.years === 1) ? " year" : " years";
        return timeLeft.years + word;
    }
    if(diff >= 2419200) {
        timeLeft.months = Math.floor(diff / 2419200);
        if(timeLeft.months === 1 && inversed)
            return " last month {none}"
        const word = (timeLeft.months === 1) ? " month" : " months";
        return timeLeft.months + word;
    }
    if (diff >= 604800) {
        timeLeft.weeks = Math.floor(diff / 604800);
        if(timeLeft.weeks === 1 && inversed)
            return " last week{none}"
        const word = (timeLeft.weeks === 1) ? " week" : " weeks";
        return timeLeft.weeks + word;
    }
    if (diff >= 86400) { // 24 * 60 * 60
        timeLeft.days = Math.floor(diff / 86400);
        if(timeLeft.days === 1 && inversed)
            return " yesterday {none}"
        const word = (timeLeft.days === 1) ? " day" : " days";
        return timeLeft.days + word;
    }
    if(inversed)
        return " earlier today{none}"
    return "0 days";


}