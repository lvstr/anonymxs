const fs = require("fs");
const setting = JSON.parse(fs.readFileSync("./src/libs/settings.json"));
prefix = setting.prefix;

exports.mess = {
  findPartner: "⌛ Sedang mencari Partner ⌛",
  partnerFound: "Partner ditemukan!",
  registerSuccess: `Berhasil melakukan Pendaftaran, silahkan ketik ${prefix}help, untuk melihat daftar Perintah`,
  error: {
    sessionNotFound: `Kamu belum mempunyai Partner, silahkan ketik ${prefix}start, untuk memulai mencari Partner`,
    partnerNotFound: `❌ Gagal, partner tidak ditemukan, silahkan ketik ${prefix}start untuk mencari Partner ❌`,
    partnerStopSession: `⚠️ Partner kamu telah menghentikan Sesi, silahkan ketik ${prefix}start untuk mencari Partner lain ⚠️`,
    stopSession: `Kamu telah menghentikan sesi, silahkan ketik ${prefix}start untuk mencari Partner lain`,
    nextSession: `⌛ Kamu telah menghentikan sesi, sedang mencari Partner lain, mohon tunggu... ⌛`,
    isSession: `❌ Gagal, kamu masih memiliki Sesi dengan Partner mu sebelumnya, ketik ${prefix}stop untuk menghentikan percakapan❌`,
    notRegistered: `❌ Gagal, kamu belum terdaftar, ketik ${prefix}help, untuk melihat daftar Command ❌`,
    isRegistered: `❌ Kamu telah terdaftar, silahkan ketik ${prefix}start untuk mencari Partner ❌`,
    isBrokenPartner: `❌ Partner kamu sedang Bermasalah, silahkan ketik ${prefix}start untuk mencari Partner lain ❌`,
    notCommand: `❌ Kamu memasukan Command yang salah, silahkan ketik ${prefix}help untuk melihat daftar Command ❌`,
    stick: `⚠️ Terjadi error saat mengirim sticker ⚠️`,
    audioMax: `❌ Gagal, kamu mengirim Audio dengan durasi lebih dari 25 detik, durasi maksimal adalah 25 detik! ❌`,
    videoMax: `❌ Gagal, kamu mengirim Video dengan durasi lebih dari 20 detik, durasi maksimal adalah 20 detik! ❌`,
    isGroup: `⚠️ Bot ini tidak bisa masuk Group, Anonymxs hanya untuk Personal Chat ⚠️`,
  },
  only: {
    owner: "❌ Perintah ini hanya bisa di gunakan oleh Owner Bot! ❌",
  },
};

exports.help = () => {
  return `List Command:

- *${prefix}register*, untuk mendaftar

- *${prefix}start*, untuk memulai mencari Partner

- *${prefix}next*, untuk menghentikan sesi dengan Partner sebelumnya dan mencari Partner baru

- *${prefix}stop*, untuk menghentikan sesi dengan Partner

- *${prefix}tnc*, Syarat dan Ketentuan Bot


*Support Anonymxs di:*

- saweria.co/rand
- trakteer.id/lvstr`;
};

exports.tnc = () => {
  return `Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan Javascript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.
Dengan menggunakan source code / bot ini maka anda setuju dengan Syarat dan Kondisi sebagai berikut:

- Source code / bot tidak menyimpan data anda di server kami.
- Source code / bot tidak bertanggung jawab atas Apa yang anda kirim ke lawan bicara anda.

- Source code / bot tidak boleh digunakan untuk layanan yang bertujuan/berkontribusi dalam: 
    • seks / perdagangan manusia
    • perjudian
    • perilaku adiktif yang merugikan 
    • kejahatan
    • kekerasan (kecuali jika diperlukan untuk melindungi keselamatan publik)
    • pembakaran hutan / penggundulan hutan
    • ujaran kebencian atau diskriminasi berdasarkan usia, jenis kelamin, identitas gender, ras, seksualitas, agama, kebangsaan


Source Code BOT : https://github.com/lvstr/Anonymxs
Baileys WhatsApp library: https://github.com/adiwajshing/Baileys

*Support Anonymxs di:*
- saweria.co/rand
- trakteer.id/lvstr

Best regards, Rand.`;
};
