const {
  WAConnection,
  MessageType,
  ReconnectMode,
  Presence,
  Mimetype,
} = require("@adiwajshing/baileys");
const { exec } = require("child_process");
const fs = require("fs");
const chalk = require("chalk");
const {
  generateMessageID,
  getGroupAdmins,
  getRandom,
  start,
  info,
  success,
  banner,
  close,
} = require("./src/libs/connection.js");
const moment = require("moment-timezone");
const ffmpeg = require("fluent-ffmpeg");

const mongoose = require("mongoose");
const db = require("./src/model/Contact");
mongoose.connect("mongodb://localhost:27017/anon2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};
const setting = JSON.parse(fs.readFileSync("./src/libs/settings.json"));
prefix = setting.prefix;

const starts = async () => {
  const client = new WAConnection();
  client.autoReconnect = ReconnectMode.onConnectionLost;
  client.logger.level = "warn";
  console.log(banner.string);
  //client.connectOptions.maxRetries = 10;
  client.on("qr", () => {
    console.log(
      color("[", "white"),
      color("!", "red"),
      color("]", "white"),
      color(" Scan the qr code above")
    );
  });
  fs.existsSync("./state.json") && client.loadAuthInfo("./state.json");
  client.on("connecting", () => {
    start("2", "Connecting...");
  });
  client.on("open", () => {
    success("2", "Connected");
  });
  await client.connect({ timeoutMs: 30 * 1000 });
  const authInfo = client.base64EncodedAuthInfo();
  fs.writeFileSync("./state.json", JSON.stringify(authInfo, null, "\t"));

  client.on("chat-update", async (chat) => {
    try {
      if (!chat.hasNewMessage) return;
      chat = chat.messages.all()[0];
      if (!chat.message) return;
      if (chat.key && chat.key.remoteJid == "status@broadcast") return;
      if (chat.key.fromMe) return;
      global.prefix;
      global.blocked;

      const {
        text,
        extendedText,
        contact,
        location,
        liveLocation,
        image,
        video,
        sticker,
        document,
        audio,
        product,
      } = MessageType;
      const time = moment.tz("Asia/Jakarta").format("DD/MM HH:mm:ss");
      const content = JSON.stringify(chat.message);
      const from = chat.key.remoteJid;
      const type = Object.keys(chat.message)[0];
      body =
        type === "conversation" && chat.message.conversation.startsWith(prefix)
          ? chat.message.conversation
          : type == "imageMessage" &&
            chat.message.imageMessage.caption.startsWith(prefix)
          ? chat.message.imageMessage.caption
          : type == "videoMessage" &&
            chat.message.videoMessage.caption.startsWith(prefix)
          ? chat.message.videoMessage.caption
          : type == "extendedTextMessage" &&
            chat.message.extendedTextMessage.text.startsWith(prefix)
          ? chat.message.extendedTextMessage.text
          : "";
      const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
      const args = body.trim().split(/ +/).slice(1);
      const isCmd = body.startsWith(prefix);

      mess = {
        findPartner: "⌛ Sedang mencari Partner ⌛",
        partnerFound: "Partner ditemukan!",
        registerSuccess: `Berhasil melakukan Pendaftaran, silahkan ketik ${prefix}help, untuk melihat daftar Perintah`,
        error: {
          sessionNotFound: `Kamu belum mempunyai Partner, silahkan ketik ${prefix}start, untuk memulai mencari Partner`,
          partnerNotFound: `❌ Gagal, partner tidak ditemukan, silahkan ketik ${prefix}start untuk mencari Partner ❌`,
          partnerStopSession: `⚠️ Partner kamu telah menghentikan Sesi, silahkan ketik ${prefix}start untuk mencari Partner lain ⚠️`,
          stopSession: `⌛ Kamu telah menghentikan sesi, silahkan ketik ${prefix}start untuk mencari Partner lain ⌛`,
          nextSession: `⌛ Kamu telah menghentikan sesi, sedang mencari Partner lain, mohon tunggu... ⌛`,
          isSession: `❌ Gagal, kamu masih memiliki Sesi dengan Partner mu sebelumnya, ketik ${prefix}stop untuk menghentikan percakapan❌`,
          notRegistered: `❌ Gagal, kamu belum terdaftar, silahkan daftar terlebih dahulu dengan mengetik ${prefix}register ❌`,
          isRegistered: `❌ Kamu telah terdaftar, silahkan ketik ${prefix}start untuk mencari Partner ❌`,
          isBrokenPartner: `❌ Partner kamu sedang Bermasalah, silahkan ketik ${prefix}start untuk mencari Partner lain ❌`,
          stick: `⚠️ Terjadi error saat mengirim sticker ⚠️`,
        },
        only: {
          owner: "❌ Perintah ini hanya bisa di gunakan oleh Owner Bot! ❌",
        },
      };

      //await client.updatePresence(from, Presence.available);
      const botNumber = client.user.jid;
      const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`]; // replace this with your number
      const sender = chat.key.remoteJid;
      const isOwner = ownerNumber.includes(sender);

      colors = ["red", "white", "black", "blue", "yellow", "green"];
      const isMedia = type === "imageMessage" || type === "videoMessage";
      const isChat = type === "text";
      const isQuotedImage =
        type === "extendedTextMessage" && content.includes("imageMessage");
      const isQuotedVideo =
        type === "extendedTextMessage" && content.includes("videoMessage");
      const isQuotedSticker =
        type === "extendedTextMessage" && content.includes("stickerMessage");

      // Database Query
      const findContact = async (contact) => {
        let findContact = await db.findOne({ contactId: contact });
        return findContact;
      };
      const chatContact = async () => {
        let chatContact = await db
          .findOne({ contactId: from })
          .where("partnerId")
          .ne(null);

        return chatContact;
      };
      const findContactPartner = async (contact) => {
        let findContactPartner = await db.findOne({
          status: 1,
          partnerId: contact,
        });
        return findContactPartner;
      };
      const sortPartnerId = async () => {
        return await db.findOne().sort({ status: 1 });
      };

      if (isCmd)
        console.log(
          "\x1b[1;31m~\x1b[1;37m>",
          "[\x1b[1;32mEXEC\x1b[1;37m]",
          time,
          color(command),
          "from",
          color(sender.split("@")[0]),
          "args :",
          color(args.length)
        );

      if (!isCmd) {
        findContact(from)
          .then((res) => {
            if (res.partnerId !== null) {
              console.log(
                "\x1b[1;31m~\x1b[1;37m>",
                "[\x1b[1;32mChat\x1b[1;37m]",

                time,
                color("Message"),
                "from",
                color(sender.split("@")[0]),
                "to",
                color(res.partnerId.split("@")[0]),
                "messages:",
                color(chat.message.conversation, "blue")
              );
            } else {
              console.log(
                "\x1b[1;31m~\x1b[1;37m>",
                "[\x1b[1;31mChat\x1b[1;37m]",
                time,
                color("Message"),
                "from",
                color(sender.split("@")[0])
              );
            }
          })
          .catch((err) => {
            console.log(
              "\x1b[1;31m~\x1b[1;37m>",
              "[\x1b[1;31mChat\x1b[1;37m]",
              time,
              color("Message"),
              "from",
              color(sender.split("@")[0]),
              "error:",
              color(err, "red")
            );
          });
      }

      const addMetadata = (packname, author) => {
        if (!packname) packname = "Anonymxs";
        if (!author) author = "Human";
        author = author.replace(/[^a-zA-Z0-9]/g, "");
        let name = `${author}_${packname}`;
        if (fs.existsSync(`./src/stickers/libs/${name}.exif`))
          return `./src/stickers/libs/${name}.exif`;
        const json = {
          "sticker-pack-name": packname,
          "sticker-pack-publisher": author,
        };
        const littleEndian = Buffer.from([
          0x49,
          0x49,
          0x2a,
          0x00,
          0x08,
          0x00,
          0x00,
          0x00,
          0x01,
          0x00,
          0x41,
          0x57,
          0x07,
          0x00,
        ]);
        const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00];

        let len = JSON.stringify(json).length;
        let last;

        if (len > 256) {
          len = len - 256;
          bytes.unshift(0x01);
        } else {
          bytes.unshift(0x00);
        }

        if (len < 16) {
          last = len.toString(16);
          last = "0" + len;
        } else {
          last = len.toString(16);
        }

        const buf2 = Buffer.from(last, "hex");
        const buf3 = Buffer.from(bytes);
        const buf4 = Buffer.from(JSON.stringify(json));

        const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4]);

        fs.writeFile(`./src/stickers/libs/${name}.exif`, buffer, (err) => {
          return `./src/stickers/libs/${name}.exif`;
        });
      };

      //const sendSticker = async () => {};

      if (!isCmd) {
        findContact(from)
          .then(async (res) => {
            let findContactResult = res;
            if (res.partnerId === null && res.status === 0)
              return client.sendMessage(from, mess.error.sessionNotFound, text);
            chatContact()
              .then(async (res) => {
                let contactResult = res;
                findContactPartner(contactResult.contactId)
                  .then(async (res) => {
                    if (res.contactId === contactResult.partnerId) {
                      if (type === "conversation") {
                        client.sendMessage(
                          contactResult.partnerId,
                          chat.message.conversation,
                          text
                        );
                      } else if (type == "sticker") {
                        // Premium only xixixi
                      }
                    }
                  })
                  .catch(async (err) => {
                    console.log(err);
                    findContactResult.status = 0;
                    findContactResult.partnerId = null;
                    await findContactResult.save();
                    client.sendMessage(from, mess.error.isBrokenPartner, text);
                  });
              })
              .catch(async () => {
                client.sendMessage(from, mess.error.sessionNotFound, text);
              });
          })
          .catch(() => {
            return client.sendMessage(from, mess.error.notRegistered, text);
          });
      }

      switch (command) {
        case "test":
          console.log(MessageType);
          break;
        case "help":
          client.sendMessage(from, "help", text);
          break;
        case "register":
          await findContact(from)
            .then(async (res) => {
              if (res === null) {
                await db.create({ contactId: from });
                client.sendMessage(from, mess.registerSuccess, text);
              } else {
                client.sendMessage(from, mess.error.isRegistered, text);
              }
            })
            .catch(async () => {
              client.sendMessage(from, mess.error.isRegistered, text);
            });
          break;

        case "start":
          await findContact(from)
            .then(async (res) => {
              const con = res;
              if (res.partnerId === null) {
                sortPartnerId()
                  .then(async (res) => {
                    if (res.partnerId === null) {
                      con.status = 1;
                      await con.save();
                      client.sendMessage(from, mess.findPartner, text);
                      const findPartner = new Promise((resolve, reject) => {
                        setInterval(async () => {
                          const partnerQuery = await db
                            .findOne({ status: 1, partnerId: null })
                            .where("contactId")
                            .ne(from);
                          if (partnerQuery) {
                            resolve(partnerQuery);
                          } else {
                            reject(partnerQuery);
                          }
                        }, 100);
                      });
                      findPartner
                        .then(async (res) => {
                          const finder = await db.findOne({
                            contactId: from,
                          });
                          finder.partnerId = res.contactId;
                          res.partnerId = finder.contactId;
                          await finder.save();
                          await res.save();
                          client.sendMessage(
                            res.contactId,
                            mess.partnerFound,
                            text
                          );
                          client.sendMessage(
                            res.partnerId,
                            mess.partnerFound,
                            text
                          );
                        })
                        .catch(() => {
                          setTimeout(async () => {
                            findContact(from).then(async (res) => {
                              if (res.partnerId === null) {
                                client.sendMessage(
                                  from,
                                  mess.error.partnerNotFound,
                                  text
                                );
                                res.status = 0;
                                await res.save();
                              }
                            });
                          }, 20000);
                        });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else if (res.partnerId !== null) {
                const nonNullPartnerId = await db.findOne({
                  contactId: res.partnerId,
                });
                if (nonNullPartnerId.partnerId !== res.partnerId) {
                  res.status = 0;
                  res.partnerId = null;
                  await res.save();
                  client.sendMessage(from, mess.error.isBrokenPartner, text);
                } else if (res.partnerId !== null && res.status !== 0) {
                  return client.sendMessage(from, mess.error.isSession, text);
                }
              }
            })
            .catch(() => {
              client.sendMessage(from, mess.error.notRegistered, text);
            });

          break;

        case "next":
          await findContact(from)
            .then(async (res) => {
              let con = res;
              if (res.status === 0)
                return client.sendMessage(
                  from,
                  mess.error.sessionNotFound,
                  text
                );
              findContactPartner(from)
                .then(async (res) => {
                  client.sendMessage(con.partnerId, "#next", text);
                  client.sendMessage(
                    con.partnerId,
                    mess.error.partnerStopSession,
                    text
                  );
                  con.status = 1;
                  con.partnerId = null;
                  await con.save();
                  res.partnerId = null;
                  res.status = 0;
                  await res.save();
                  client.sendMessage(from, mess.error.nextSession, text);
                  const findPartner = new Promise((resolve, reject) => {
                    setInterval(async () => {
                      const partnerQuery = await db
                        .findOne({ status: 1, partnerId: null })
                        .where("contactId")
                        .ne(from);
                      if (partnerQuery) {
                        resolve(partnerQuery);
                      } else {
                        reject(partnerQuery);
                      }
                    }, 100);
                  });
                  findPartner
                    .then(async (res) => {
                      let con = res;
                      findContact(from)
                        .then(async (res) => {
                          res.partnerId = res.contactId;
                          con.partnerId = res.contactId;
                          await res.save();
                          await con.save();
                          client.sendMessage(
                            con.contactId,
                            mess.partnerFound,
                            text
                          );
                          client.sendMessage(
                            res.partnerId,
                            mess.partnerFound,
                            text
                          );
                        })
                        .catch((err) => {
                          client.sendMessage(
                            from,
                            mess.error.notRegistered,
                            text
                          );
                        });
                    })
                    .catch(() => {
                      setTimeout(async () => {
                        findContact(from).then(async (res) => {
                          if (res.partnerId === null) {
                            client.sendMessage(
                              from,
                              mess.error.partnerNotFound,
                              text
                            );
                            res.status = 0;
                            await res.save();
                          }
                        });
                      }, 20000);
                    });
                })
                .catch(async (err) => {
                  con.status = 0;
                  con.partnerId = null;
                  await con.save();
                  client.sendMessage(from, mess.error.isBrokenPartner, text);
                });
            })
            .catch(() => {
              client.sendMessage(from, mess.error.notRegistered, text);
            });

          break;
        case "stop":
          await findContact(from)
            .then(async (res) => {
              let con = res;
              if (res.status === 0)
                return client.sendMessage(
                  from,
                  mess.error.sessionNotFound,
                  text
                );
              findContactPartner(from)
                .then(async (res) => {
                  client.sendMessage(con.partnerId, "#stop", text);
                  client.sendMessage(
                    con.partnerId,
                    mess.error.partnerStopSession,
                    text
                  );
                  con.status = 0;
                  con.partnerId = null;
                  await con.save();
                  res.status = 0;
                  res.partnerId = null;
                  await res.save();
                  client.sendMessage(from, mess.error.stopSession, text);
                })
                .catch(async (err) => {
                  con.status = 0;
                  con.partnerId = null;
                  await con.save();
                  client.sendMessage(from, mess.error.isBrokenPartner, text);
                });
            })
            .catch(() => {
              client.sendMessage(from, mess.error.notRegistered, text);
            });

          break;
        case "bc":
          const getBcUser = await db.find().select("contactId");
          if (!isOwner)
            return client.sendMessage(from, "hanya command untuk owner");

          if (isOwner) {
            bctxt = body.slice(4);
            txtbc = `*BROADCAST*\n\n${bctxt}`;
            for (let i = 0; i < getBcUser.length; i++) {
              client.sendMessage(getBcUser[i].contactId, txtbc, text);
            }
          }
          break;
        case "restart":
          const getRsUser = await db.find().select("contactId");
          if (!isOwner)
            return client.sendMessage(from, "hanya command untuk owner");

          if (isOwner) {
            bctxt = body.slice(9);
            txtbc = `*SERVER RESTARTED*\n\n*Note:* ${bctxt}`;
            for (let i = 0; i < getRsUser.length; i++) {
              client.sendMessage(getRsUser[i].contactId, txtbc, text);
            }
          }
          break;
      }
    } catch (error) {
      console.log(error);
    }
  });
};
starts();
