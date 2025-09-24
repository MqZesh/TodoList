# TodoList App

Bu proje, React ve Redux kullanarak geliştirdiğim full-stack bir Todo App'tir. Uygulama, modern web teknolojileri kullanılarak güvenli kimlik doğrulama sistemi ile birlikte geliştirilmiştir ve state yönetimini öğrenmek amacıyla oluşturulmuştur.

## Özellikler

### Frontend Özellikleri

- Görev ekleme, silme ve tamamlandı olarak işaretleme
- Todo listesi Redux Toolkit ile yönetiliyor
- Responsive ve kullanıcı dostu arayüz
- Gerçek zamanlı form validasyonu

### Backend Özellikleri

- Güvenli kullanıcı kayıt ve giriş sistemi
- JWT tabanlı kimlik doğrulama
- PostgreSQL veritabanı entegrasyonu
- Bcrypt ile şifre hashleme
- Cookie tabanlı oturum yönetimi
- Otomatik token doğrulama ve yönlendirme

### Güvenlik Özellikleri

- HTTP-only cookie'ler ile XSS koruması
- Bcrypt ile güvenli şifre saklama
- JWT token doğrulama middleware'i
- Otomatik oturum yönetimi

## Teknolojiler

### Frontend

- React
- Redux Toolkit
- Vite
- TailwindCSS

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- Bcrypt
- Cookie-parser

### DevOps

- Docker
- Docker Compose

## Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- PostgreSQL
- Docker (opsiyonel)

### Manuel Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/MqZesh/TodoList
```

### Docker ile Kurulum

1. Docker Compose ile tüm servisleri başlatın:

```bash
docker-compose up -d
```

## Kullanım

### Kimlik Doğrulama

- Yeni kullanıcı kaydı oluşturun veya mevcut hesabınızla giriş yapın
- Sistem otomatik olarak JWT token oluşturacak ve güvenli cookie'lerde saklayacak
- Token süresi dolduğunda otomatik olarak login sayfasına yönlendirileceksiniz

### Todo Yönetimi

- Ana sayfada todo eklemek için input alanına görev başlığı girin ve ekle butonuna basın
- Görevleri tamamlandı olarak işaretleyebilir veya silebilirsiniz
- Tüm değişiklikler Redux Toolkit state ile yönetilir ve veritabanına kaydedilir
- Oturumunuz devam ettiği sürece verileriniz güvenli bir şekilde saklanır

### Güvenlik

- Tüm şifreler Bcrypt ile hashlenmiş olarak saklanır
- JWT tokenları HTTP-only cookie'lerde güvenli bir şekilde tutulur
- Sayfa yenilemeleri ve tarayıcı kapatma/açma durumlarında oturum korunur

## Proje Yapısı

```
TodoList/
├── frontend/          # React frontend uygulaması
├── backend/           # Node.js backend API
├── docker-compose.yml # Docker konfigürasyonu
└── README.md         # Bu dosya
```

## API Endpoints

### Authentication

- `POST /auth/register` - Kullanıcı kaydı
- `POST /auth/login` - Kullanıcı girişi
- `GET /auth/verify` - Token doğrulama
- `POST /auth/logout` - Çıkış yapma

## Amaç

Bu proje, React ve Redux Toolkit kullanılarak geliştirilmiş full-stack bir Todo uygulamasıdır. Modern frontend teknolojileri, güvenli backend mimarisi, veritabanı yönetimi ve containerization konularında kapsamlı bir öğrenme deneyimi sunmaktadır. Proje, state yönetimi, kimlik doğrulama, API entegrasyonu ve güvenlik best practice'leri üzerine odaklanmıştır.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
