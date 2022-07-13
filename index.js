import { create, Client } from "@open-wa/wa-automate";
import fetch from "node-fetch";
create().then((client) => start(client));

const sh = new Promise((resolve, reject) => {
  fetch('https://fulk-alkitab-api.herokuapp.com/renungan/sh')
    .then(function (response) {
      response.json().then(data => {
        setTimeout(() => {
          resolve(
            `${data.title} (${data.passage})
            ${data.content}`);
        }, 300);
      });
    })
});

const rh = new Promise((resolve, reject) => {
  fetch('https://fulk-alkitab-api.herokuapp.com/renungan/rh')
    .then(function (response) {
      response.json().then(data => {
        setTimeout(() => {
          resolve(`
            ${data.title} (${data.passage})
            ${data.content}
            `);
        }, 300);
      });
    })
});

async function start(client) {
  client.onMessage(async (msg) => {
    var text = msg.body.toLowerCase();
    if (text === 'santapan harian') {
      sh.then(renungan => client.sendText(msg.from, renungan))
    }
    if (text === 'renungan harian') {
      rh.then(renungan => client.sendText(msg.from, renungan))
    }
  });
}