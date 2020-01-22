import icon from "../img/weight"

export function getConfig() {
  //Default config
  let config = {
    num: [1, 3],
    rps: 0.2,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-40, 40],
    alpha: [0.6, 0],
    scale: [0.1, 0.9],
    position: "all",
    color: ["random", "#ff0000"],
    cross: "dead",
    // emitter: "follow",
    body: icon,
    random: 2
  };

  return config;
}
