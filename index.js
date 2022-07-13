import { create, Client } from "@open-wa/wa-automate";
import fetch from "node-fetch";
// import puppeteer from "puppeteer";
create().then((client) => start(client));

const conn = new Promise((resolve, reject) => {
  fetch('https://fulk-alkitab-api.herokuapp.com/renungan/sh')
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
    if (text === 'renungan hari ini') {
      conn.then(renungan => client.sendText(msg.from, renungan))
    }
  });
}