export function parseData(gymData) {

  let webData = {};

  const parsedDate = gymData.date.substring(
    2,
    gymData.date.length - 2
  );
  const parsedArrivalTime = gymData.arrival.substring(
    2,
    gymData.arrival.length - 2
  );
  const parsedDuration = gymData.duration.substring(2, gymData.duration.length - 2);

  //Get current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  if (today === parsedDate) {
    webData.today = true;
    webData.header = "Nathan was at the gym today!";
    webData.footer = `He arrived at ${parsedArrivalTime} and was there for ${parsedDuration}.`;
  } else if (gymData.arrival === "[]") {
    webData.today = false;
    webData.header = "Nathan has not been to the gym in over 30 days!";
    webData.footer = `He's probably dead.`;
  } else {
    webData.today = false;
    webData.header = "Nathan was not at the gym today :(";
    webData.footer = `There's still time yet! He was last at the gym on ${parsedDate}.`;
  }

  return webData;
}
