const STAGE_RULES = [
  { name: "main sequence", min: 0, max: Infinity, tempFactor: 1.0, sizeFactor: 1 },
  { name: "subgiant", min: 1.5, max: 3, tempFactor: 0.9, sizeFactor: 3 },
  { name: "giant", min: 0.5, max: Infinity, tempFactor: 0.8, sizeFactor: 5 },
  { name: "horizontal branch", min: 0.5, max: 2.5, tempFactor: 0.85, sizeFactor: 4 },
  { name: "supergiant", min: 8, max: Infinity, tempFactor: 0.7, sizeFactor: 10 },
  { name: "white dwarf", min: 0.08, max: 8, tempFactor: 1.5, sizeFactor: 0.6 },
  { name: "neutron star", min: 8, max: 20, tempFactor: 20, sizeFactor: 0.3 },
  { name: "black hole", min: 20, max: Infinity, tempFactor: 0, sizeFactor: 0 }
];

const STAGE_ORDER = [
  "main sequence",
  "subgiant",
  "giant",
  "horizontal branch",
  "supergiant",
  "white dwarf",
  "neutron star",
  "black hole"
];

const TYPE_COLOR = {
  O: "#9bbcff",
  B: "#a6d0ff",
  A: "#cfe5ff",
  F: "#fff4cc",
  G: "#ffd27f",
  K: "#ff9b4a",
  M: "#ff5a3d"
};

const TYPE_TEMP = {
  O: 40000,
  B: 20000,
  A: 8500,
  F: 6500,
  G: 5800,
  K: 4500,
  M: 3200
};

export class StarModel {
  constructor(mass, type){
    this.mass = mass;
    this.type = type;
    this.stage = "main sequence";
    this.size = 1;
    this.age = 0;
    this.stageTime = 0;
    this.stageDuration = 5; 
    this.lifeTime = 0;
    this.lifeDuration = 60; 

    this.temp = TYPE_TEMP[type];
    this.color = TYPE_COLOR[type]

  }


findNextStage(stage, mass) {
  const currentIndex = STAGE_ORDER.indexOf(stage);

  for (let i = currentIndex + 1; i < STAGE_ORDER.length; i++) {

    const stage = STAGE_RULES.find(s => s.name === STAGE_ORDER[i]);;

    if (mass >= stage.min && mass < stage.max) {
      return STAGE_ORDER[i];
    }
  }

  return stage; 
}

getStageRule(stageName) {
  return STAGE_RULES.find(s => s.name === stageName);
}

updateProperties() {
  const next = this.findNextStage(this.stage, this.mass);

  if (next !== this.stage) {
    this.stage = next;
  }

  const rule = this.getStageRule(this.stage);

  this.size = rule.sizeFactor;
  this.temperature = this.temp * rule.tempFactor;

  this.type = this.getSpectralType(this.temperature);
  this.color = TYPE_COLOR[this.type];
}


  update(mass, type){
    this.mass = mass;
    this.type = type;
    this.stages = "main sequence";
  }


  getSpectralType(temp) {
  if (temp >= 30000) return "O";
  if (temp >= 10000) return "B";
  if (temp >= 7500) return "A";
  if (temp >= 6000) return "F";
  if (temp >= 5200) return "G";
  if (temp >= 3700) return "K";
  return "M";
}

}