import { create, Client } from "@open-wa/wa-automate";
import fetch from "node-fetch";
create().then((client) => start(client));

let renungan = {
  source: '',
  title: '',
  passage: '',
  content: ''
};

async function start(client) {
  client.onMessage(async (msg) => {
    var text = msg.body.toLowerCase();
    if (text.includes('testing')) {
      await request();
      await console.log('data', renungan)
      await client.sendText(msg.from,
        `${renungan.title} (${renungan.passage})`);
    }
    // if (msg.mimetype) {
    //   if (msg.caption === '!s' && msg.type === 'image') {
    //     const mediaData = await decryptMedia(msg);
    //     const imageBase64 = `data:${msg.mimetype};base64,${mediaData.toString(
    //       'base64'
    //     )}`;
    //     await client.sendImageAsSticker(msg.from, imageBase64);
    //   }
    // }
  });
}

function request() {
  fetch('https://fulk-alkitab-api.herokuapp.com/renungan/shss')
    .then(function (response) {
      response.json().then(data => {
        renungan.source = data.source;
        renungan.title = data.title;
        renungan.passage = data.passage;
        renungan.content = data.content;
      });
    }).catch(error =>
      console.log('error connect fulk api', error)
    );
}