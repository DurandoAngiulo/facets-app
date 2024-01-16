import { Timestamp } from "firebase/firestore";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// const formatFullDate = (timestamp ?: Timestamp) => {
//   // If timestamp is not provided, return an empty string or some default text
//   if (!timestamp) return "No date provided";

//   const dateObject = timestamp.toDate(); // This is the correct conversion
//   const monthIndex = dateObject.getMonth();
//   const formattedDate = `${months[monthIndex]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

//   return formattedDate;
// };

// const formatFullDate = (timestamp: Timestamp) => {
//   if (!timestamp) return "No date provided";

//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const dateObject = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
//   const monthIndex = dateObject.getMonth(); // Get the index of the month in the array

//   // Create the formatted date string
//   const formattedDate = `${months[monthIndex]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

//   return formattedDate;
// };

const getTimeStamp = () => {
  const timestamp = Timestamp.fromDate(new Date());
  return timestamp;
};

export { getTimeStamp };
