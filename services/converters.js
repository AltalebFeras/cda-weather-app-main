export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  return `${(hours %= 12) ? hours : 12}:${minutes}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const unixToLocalTime = (unixSeconds, timezoneOffset) => {
  if (typeof unixSeconds !== "number" || typeof timezoneOffset !== "number") {
    console.error("Invalid input values:", { unixSeconds, timezoneOffset });
    return "Invalid time"; // Return a default value or handle it in the UI
  }

  // Ensure the time is in milliseconds and add the timezone offset
  const date = new Date(unixSeconds * 1000 + timezoneOffset * 1000);

  if (isNaN(date.getTime())) {
    console.error("Invalid date calculation for:", { unixSeconds, timezoneOffset });
    return "Invalid time"; // Handle this scenario as well
  }

  // Extract hours and minutes from the ISO string
  let time = date.toISOString().match(/(\d{2}:\d{2})/)[0];

  // Remove leading '0' from hours if present
  return time.startsWith("0") ? time.substring(1) : time;
};

