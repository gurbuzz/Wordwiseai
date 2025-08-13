# WordWise AI

Yapay zeka destekli interaktif kelime bulmaca oyunu.

## Proje Hakkında

WordWise AI, oyuncuların yapay zeka (AI) sohbet asistanı yardımıyla kelime bulmacalarını çözdüğü, beyin jimnastiği yaptıran interaktif bir platformdur. Klasik kelime tahmin oyunlarını, Ollama ve RAG (Retrieval-Augmented Generation) gibi modern yapay zeka teknolojileriyle birleştirerek benzersiz bir deneyim sunar.

Oyuncular takıldıkları yerde ipuçları almak, strateji geliştirmek veya sadece sohbet etmek için yapay zeka ile etkileşime girebilir.

### Temel Özellikler

*   **Günlük Kelime Oyunu**: Her gün yenilenen kelimelerle zorlayıcı ve eğlenceli bir bulmaca deneyimi.
*   **Yapay Zeka Sohbet Asistanı**: Oyun sırasında ipuçları ve stratejiler sunan, Ollama ve RAG mimarisi ile güçlendirilmiş bir LLM.
*   **Kullanıcı Hesapları**: Oyuncuların ilerlemelerini kaydetmeleri ve istatistiklerini görmeleri için kullanıcı profilleri.
*   **Dinamik ve Modern Arayüz**: React ve Next.js ile geliştirilmiş hızlı ve etkileşimli bir kullanıcı deneyimi.

## Kullanılan Teknolojiler

*   **Frontend**: [Next.js](https://nextjs.org/), [React](https://react.dev/)
*   **Backend**: Next.js API Routes
*   **Yapay Zeka**: [Ollama](https://ollama.com/), RAG Mimarisi


## Başlangıç

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler

*   Node.js (v18 veya üstü)
*   npm, yarn veya pnpm
*   PostgreSQL veritabanı
*   Çalışan bir Ollama sunucusu

### Kurulum

1.  **Projeyi klonlayın:**
    ```bash
    git clone https://github.com/kullanici-adiniz/wordwise-ai.git
    cd wordwise-ai
    ```

2.  **Gerekli paketleri yükleyin:**
    ```bash
    npm install
    ```

3.  **Ortam değişkenlerini ayarlayın:**
    Proje kök dizininde `.env.local` adında bir dosya oluşturun ve aşağıdaki değişkenleri kendi yapılandırmanıza göre doldurun:
    ```env
    DATABASE_URL="postgresql://KULLANICI:SIFRE@localhost:5432/VERITABANI_ADI"
    OLLAMA_API_URL="http://localhost:11434" # Ollama sunucu adresiniz
    ```

4.  **Veritabanı migrasyonlarını çalıştırın:**
    Bu komut, veritabanı şemanızı `prisma/schema.prisma` dosyasına göre oluşturacaktır.
    ```bash
    npx prisma migrate dev
    ```

5.  **Geliştirme sunucusunu başlatın:**
    ```bash
    npm run dev
    ```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görebilirsiniz.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Atacan Gürbüz