export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  return `${(hours %= 12) ? hours : 12}:${minutes}`;
};

// export const degToCompass = (num) => {
//   var val = Math.round(num / 22.5);
//   var arr = [
//     "N",
//     "NNE",
//     "NE",
//     "ENE",
//     "E",
//     "ESE",
//     "SE",
//     "SSE",
//     "S",
//     "SSW",
//     "SW",
//     "WSW",
//     "W",
//     "WNW",
//     "NW",
//     "NNW",
//   ];
//   return arr[val % 16];
// };
// export const unixToLocalTime = (unixSeconds, timezoneOffset) => {
//   if (typeof unixSeconds === "string") {
//     unixSeconds = new Date(unixSeconds).getTime() / 1000; // Convert ISO 8601 string to Unix timestamp
//   }

//   if (typeof unixSeconds !== "number" || typeof timezoneOffset !== "number") {
//     console.error("Invalid input values:", { unixSeconds, timezoneOffset });
//     return "Invalid time";
//   }

//   const date = new Date((unixSeconds + timezoneOffset) * 1000);

//   if (isNaN(date.getTime())) {
//     console.error("Invalid date calculation for:", { unixSeconds, timezoneOffset });
//     return "Invalid time";
//   }

//   let hours = date.getUTCHours();
//   let minutes = date.getUTCMinutes();
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12 || 12;
//   minutes = minutes < 10 ? `0${minutes}` : minutes;

//   return `${hours}:${minutes} ${ampm}`;
// };
export const unixToLocalTime = (unixSeconds, timezoneOffset) => {
  if (typeof unixSeconds === "string") {
    unixSeconds = new Date(unixSeconds).getTime() / 1000; // Convert ISO 8601 string to Unix timestamp
  }

  if (typeof unixSeconds !== "number" || typeof timezoneOffset !== "number") {
    console.error("Invalid input values:", { unixSeconds, timezoneOffset });
    return "Invalid time";
  }

  const date = new Date((unixSeconds + timezoneOffset) * 1000);

  if (isNaN(date.getTime())) {
    console.error("Invalid date calculation for:", { unixSeconds, timezoneOffset });
    return "Invalid time";
  }

  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes} ${ampm}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW",
    "SW", "WSW", "W", "WNW", "NW", "NNW",
  ];
  return arr[val % 16];
};

export const isoToUnix = (isoDate) => Math.floor(new Date(isoDate).getTime() / 1000);
