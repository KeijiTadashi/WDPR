//https://www.reactshark.com/blog/guide-react-date-format
export function formatDate(dateTime) {
    console.log(`DATETIME: ${dateTime}`);
    const months = {
        0: "Januari",
        1: "Februari",
        2: "Maart",
        3: "April",
        4: "Mei",
        5: "Juni",
        6: "Juli",
        7: "Augustus",
        8: "September",
        9: "Oktober",
        10: "November",
        11: "December",
    };
    const days = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
    const d = new Date(dateTime);
    const year = d.getFullYear();
    const date = d.getDate();
    const monthIndex = d.getMonth();
    const monthName = months[monthIndex];
    const dayName = days[d.getDay()];
    const formatted = `${dayName} - ${date} ${monthName} ${year}`;
    return formatted.toString();
}

export function formatTime(dateTime) {
    const d = new Date(dateTime);
    const hours = d.getHours();
    const min = d.getMinutes();
    return `${hours < 10 ? "0" + hours : hours}:${min < 10 ? "0" + min : min}`;
}
