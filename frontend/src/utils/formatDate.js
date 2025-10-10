export function formatDate(date) {
    if (!date) return "No date available"; // safety check
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
}


// export const formatTime = (date) => {
//     return date.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit"
//     });
// };