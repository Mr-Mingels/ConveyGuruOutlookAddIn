export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    if (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    ) {
        return formatTime(date);
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((now - date) / oneDay));
    if (diffDays < 7 && date.getDay() < now.getDay()) {
        return getDayOfWeek(date);
    }

    if (date.getFullYear() === now.getFullYear()) {
        return getMonthAndDay(date);
    }

    return `${getMonthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
};

const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
};

const getDayOfWeek = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
};

const getMonthAndDay = (date) => `${getMonthName(date.getMonth())} ${date.getDate()}`;

const getMonthName = (monthIndex) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthIndex];
};

