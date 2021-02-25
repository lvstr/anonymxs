<p align="center">
<a href="#"><img title="Anonymxs" src="https://img.shields.io/badge/Anonymxs | Anonymous WhatsApp Chat Bot-green?colorA=%23ff0000&colorB=%23017e40&style=for-the-badge"></a>
</p>
<p align="center">
<a href="https://github.com/lvstr"><img title="Author" src="https://img.shields.io/badge/Author-lvstr-blue.svg?style=for-the-badge&logo=github"></a>
</p>

<details align="center">
 <summary>Help me!</summary>

 [Saweria](https://saweria.co/donate/rand)
 
 [Trakteer](https://trakteer.id/lvstr)
</details>

## Clone Project ini
```bash
> git clone https://github.com/lvstr/anonymxs
```
## Install MongoDB
> <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/">Windows</a>
> <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/">MacOs</a>
> <a href="https://docs.mongodb.com/manual/administration/install-on-linux/">Linux</a>
Atau bisa menggunakan <a href="https://www.mongodb.com/cloud/atlas/efficiency?utm_source=google&utm_campaign=gs_apac_indonesia_search_core_brand_atlas_desktop&utm_term=mongo%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624350&gclid=Cj0KCQiAj9iBBhCJARIsAE9qRtAQJcOiNr05S5hAZuJL01Q7ZMEmPdEJwm7hk4-y9hrfy0N5VQfvOCgaAtsXEALw_wcB">Mongo Atlas</a>

## Config
```bash
src/libs/setting.json
{
 > "prefix": "/",
 > "ownerNumber": "62xxxxxx" //Isi nomor hp kamu
}
```
## Database Config
```bash
.env
> MONGO_URI=mongodb://localhost:27017/anonymxs //ganti sesuai ip Database, jika menggunakan localhost bisa skip
```

## Run
```bash
> cd Anonymxs
> npm i
> npm start
```

## Command & Fitur
| Anonymxs |  Command  |                       Fungsi                       |
|----------|:---------:|:--------------------------------------------------:|
|     ✅    | /register |   Mendaftar akun, pakai username? pull request :)  |
|     ✅    |   /start  |       Memulai mencari Partner (lawan Bicara)       |
|     ✅    |   /next   | Menghentikan Sesi sebelumnya dan mencari Sesi baru |
|     ✅    |   /stop   |                  Menghentikan Sesi                 |
<br>

| Anonymxs      |               Fitur              |
|---------------|:--------------------------------:|
|       ✅       |       Bicara antar Partner       |
| Bayar, xixixi | Mengirim Sticker/Sticker Animasi |
| Bayar, xixixi |          Mengirim Lokasi         |
| Bayar, xixixi |     Mengirim Foto/Gif & Video    |
| Bayar, xixixi |        Mengirim Voice Note       |

## Big Thanks to:
<a href="https://github.com/sProDev"><img src="https://img.shields.io/badge/Suluh%20Sulistiawan-For%20making%20the%20Flowchart-blue"></a><br/>
<a href="https://github.com/MhankBarBar"><img src="https://img.shields.io/badge/MhankBarBar-For%20making%20the%20Baileys%20Bot%20base%20xd-blue"></a><br/>
<a href="https://github.com/adiwajshing"><img src="https://img.shields.io/badge/adiwajshing-For%20Baileys%20Library-blue"></a>
