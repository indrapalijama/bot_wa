import { create, Client } from "@open-wa/wa-automate";
import fetch from "node-fetch";
create().then((client) => start(client));

//renungan function
var renungan = function (type) {
  let source = type == 'r' ? 'rh' : 'sh'
  return new Promise((resolve, reject) => {
    fetch(`https://fulk-alkitab-api.herokuapp.com/renungan/${source}`)
      .then(function (response) {
        response.json().then(data => {
          setTimeout(() => {
            resolve(`*${data.source}* / ${data.date}\n\n*${data.title}*\n\nBacaan Hari ini : ${data.passage}\n\n${data.content}`);
          }, 300);
        });
      })
  });
}

async function start(client) {
  client.onMessage(async (msg) => {
    var text = msg.body.toLowerCase();
    switch (text) {
      case 'halo':
        client.sendText(msg.from,
          `*Syaloom!* 
          \nsaya adalah bot yang akan mengirimkan anda renungan yang diupdate setiap harinya
          \nada 2 sumber renungan yang bisa dipilih
          \nketik "renungan harian" (tanpa tanda petik) untuk sumber pertama
          \nketik "santapan harian" (tanpa tanda petik) untuk sumber kedua`
        )
        break;
      case 'santapan harian':
        renungan('s').then(renungan => client.sendText(msg.from, renungan))
        break;

      case 'renungan harian':
        renungan('r').then(renungan => client.sendText(msg.from, renungan))
        break;

      default:
        // client.sendText(msg.from, `hello, i'm a bot`)
        break;
    }
  });
}