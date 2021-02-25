const cfonts = require("cfonts");
const spin = require("spinnies");
const Crypto = require("crypto");

const randomBytes = (length) => {
  return Crypto.randomBytes(length);
};

const generateMessageID = () => {
  return randomBytes(10).toString("hex").toUpperCase();
};

const getGroupAdmins = (participants) => {
  admins = [];
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : "";
  }
  return admins;
};

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};

const spinner = {
  interval: 120,
  frames: [
    "🕐",
    "🕑",
    "🕒",
    "🕓",
    "🕔",
    "🕕",
    "🕖",
    "🕗",
    "🕘",
    "🕙",
    "🕚",
    "🕛",
  ],
};

let globalSpinner;

const getGlobalSpinner = (disableSpins = false) => {
  if (!globalSpinner)
    globalSpinner = new spin({
      color: "blue",
      succeedColor: "green",
      spinner,
      disableSpins,
    });
  return globalSpinner;
};

spins = getGlobalSpinner(false);

const start = (id, text) => {
  spins.add(id, { text: text });
};
const info = (id, text) => {
  spins.update(id, { text: text });
};
const success = (id, text) => {
  spins.succeed(id, { text: text });
};

const close = (id, text) => {
  spins.fail(id, { text: text });
};

const banner = cfonts.render("ANONYMXS|ANONYMOUS|WHATSAPP|BOT", {
  font: "chrome",
  color: "candy",
  align: "center",
  gradient: ["red", "yellow"],
  lineHeight: 3,
});

module.exports = {
  generateMessageID,
  getGroupAdmins,
  getRandom,
  start,
  info,
  success,
  banner,
  close,
};
