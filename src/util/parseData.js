export function parseData(gymData) {
  let webData = {};

  const parsedDate = gymData["date-and-arrival"].substring(
    2,
    gymData["date-and-arrival"].length - 2
  );
  const parsedArrivalTime = gymData.title.substring(
    2,
    gymData.title.length - 2
  );
  const parsedDuration = gymData.info.substring(2, gymData.info.length - 2);

  //Get current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  if (today === parsedDate) {
    webData.today = true;
    webData.header = "Nathan was at the gym today!"
    webData.footer = `He arrived at ${parsedArrivalTime} and was there for ${parsedDuration}.`
  } else {
    webData.today = false;
    webData.header = "Nathan was not at the gym today :("
    webData.footer = `There's still time yet! He was last at the gym on ${parsedDate}.`
  }

  console.log(webData.today)
  console.log(webData.header)

  return webData;
}
