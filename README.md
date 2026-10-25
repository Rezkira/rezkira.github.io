# 🤖 YZ Rehber

Yapay zekâ hakkında Türkçe, tek sayfalık statik tanıtım sitesi.

## Özellikler

- Animasyonlu sinir ağı arka planı (canvas)
- Koyu / açık tema
- YZ türleri sekmeleri, kullanım alanları, tarihçe zaman çizelgesi
- YZ ekosistemi: Skill, MCP, CLI açıklamaları; popüler asistanlar tablosu; MCP sunucuları
- Aramalı YZ sözlüğü (20 terim)
- Mini quiz
- Mobil uyumlu, framework yok (saf HTML/CSS/JS)

## Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `index.html` | Sayfa içeriği |
| `style.css` | Stiller |
| `script.js` | Animasyon, tema, sekmeler, quiz |
| `.nojekyll` | GitHub Pages'in Jekyll işlemesini kapatır |

## Yerelde çalıştırma

`index.html` dosyasına çift tıkla.

## GitHub Pages'te yayınlama

1. GitHub'da yeni bir repo oluştur (ör. `yz-rehber`).
2. Bu klasördeki tüm dosyaları repoya yükle:
   ```bash
   git init
   git add .
   git commit -m "feat: ilk sürüm"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADIN/yz-rehber.git
   git push -u origin main
   ```
3. Repo → **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main` / `/ (root)` → **Save**.
4. Birkaç dakika sonra site şu adreste açılır: `https://KULLANICI_ADIN.github.io/yz-rehber/`
