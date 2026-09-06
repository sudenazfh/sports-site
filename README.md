# Sports Site

Kıbrıs'taki spor etkinlikleri için etkinlik platformu. Kullanıcılar etkinliklere kayıt olur, organizatörler (agent) etkinlik oluşturur, admin onaylar. Tasarım Figma'dan birebir kodlanmıştır.

## Kurulum

Gereken tek şey [Node.js](https://nodejs.org) (v20+).

```bash
git clone https://github.com/sudenazfh/sports-site.git
cd sports-site
npm install
```

## Çalıştırma

İki terminal aç, ikisi de açık kalsın:

```bash
# Terminal 1 — backend (API, port 3001)
npm run server

# Terminal 2 — frontend (site, port 5173)
npm run dev
```

Tarayıcıda **http://localhost:5173** adresini aç.

## Test hesapları

Şifre hepsinde `123456`:

| E-posta | Rol | Gördüğü panel |
|---|---|---|
| `deniz@sports.com` | Kullanıcı | Etkinliklere göz at, kayıt ol, favorile, mesajlaş |
| `agent@sports.com` | Organizatör | Etkinlik oluştur/yayınla, katılımcı yönet, gelir takibi |
| `admin@sports.com` | Admin | Etkinlik onayla/reddet, hesap yönetimi, sistem geliri |

"Create a new account" ile yeni kullanıcı da açabilirsin. Giriş yapmadan gezinmek için: http://localhost:5173/visitor

## Nasıl çalışır?

**Frontend** (`src/`): React + Vite + Tailwind CSS. Her ekran `src/pages/` altında bir dosya, ortak parçalar (menü, etkinlik kartı, filtre çubuğu) `src/components/` altında. Sayfalar veriyi `/api` üzerinden backend'den çeker; backend kapalıysa `src/data/mock.js` içindeki örnek veriyle çalışmaya devam eder.

**Backend** (`server/`): Express API. Giriş/kayıt (şifreler bcrypt ile hashlenır, oturum JWT cookie), etkinlikler, kayıt + sahte ödeme, üyelik, mesajlaşma, favoriler, bildirimler ve admin onay akışı burada. Veri `server/db.json` dosyasında saklanır — ilk çalıştırmada örnek verilerle kendiliğinden oluşur, silersen sıfırdan seed'lenir.

**Etkinlik yaşam döngüsü:** organizatör etkinlik oluşturur (taslak veya yayınla) → yayınlanan etkinlik admin onayına düşer → admin onaylarsa sitede herkese görünür.

## Notlar

- Ödeme sahtedir (kart bilgisi doğrulanmaz), gerçek para geçmez.
- `figma-export/` klasörü (tasarım PNG'leri) boyutundan dolayı repoya dahil değildir.
