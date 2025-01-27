# PrinterServer

## Açıklama

PrinterServer, **Spring Boot** kullanılarak geliştirilmiş bir dosya yazma sunucusudur. Bu projenin amacı evde eski kablolu yazicilari
bilgisayara baglayarak kablosuz yapmakdir 

## Özellikler

- **Spring Data JPA** ile veri tabanı işlemleri.
- **Spring Security** ile güvenlik altyapısı.

- **Docker Compose** ile kolay konteyner entegrasyonu.



## Gereklilikler

- **Java 17** veya daha üstü
- **Gradle**
- **MySQL**
- **Docker Compose** (isteğe bağlı)

---

## Kurulum

1. **Projeyi Klonlayın**:
   ```bash
   git clone https://github.com/range79/printerserver
   cd FIleupload
   ```

2. **Bağımlılıkları Yükleyin**:
   ```bash
   ./gradlew clean build
   ```
   ###### NOT Eger windows kullaniyorsaniz alttaki gibi yuklemeniz gerekli
   ```shell
   gradlew.bat clean build

```
3. **Veritabanını Ayarlayın**:  
   MySQL üzerinde bir veritabanı oluşturun ve `src/main/resources/application.yaml` dosyasını düzenleyin:
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://<host>:<port>/<veritabani_adi>
       username: <kullanici_adi>
       password: <sifre>
     jpa:
       hibernate:
         ddl-auto: update # İlk kullanımda veritabanını otomatik oluşturabilir
       show-sql: true # Konsolda sorguların görünmesi için
   ```

4. **Uygulamayı Çalıştırın**:
   ```bash
   ./gradlew bootRun

   ```
   ##### Not: Windows kullanıyorsanız:
```shell
   gradlew.bat bootRun
```


---

## Kullanılan Teknolojiler

- **Spring Boot** 3.4.1
- **Spring Security**

- **MySQL**
- **Docker Compose**
- **Lombok**


---


## Katkıda Bulunma

Projenize katkıda bulunmak isteyenler için adımlar:

1. Bu projeyi fork edin.
2. Yeni bir branch oluşturun:
   ```bash
   git checkout -b ozellik/yeni-ozellik
   ```
3. Değişikliklerinizi commit edin:
   ```bash
   git commit -m "Yeni özellik eklendi."
   ```
4. Değişikliklerinizi push edin:
   ```bash
   git push origin ozellik/yeni-ozellik
   ```
5. Bir pull request (PR) gönderin.

---

## Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır. Detayları aşağıda bulabilirsiniz:



## Projedeki değişiklik günlüğü

1. **Version 0.0.1-snapshot**
    - ilk sürüm olduğundan çokta fazla sey eklemedim.



2. **Version 1.0.0-snapshot**
   - uygulama hala hazir deil ama serviceleri haziliyorum. 
   - README.md yazıldı 
   - Exception packagi olusturuldu
   - User service yeniden adlandirildi
   - Config paketi olusturuldu securityconfig config paketine tasindi
   - User sinifi userdetailsi implemente etti
```plaintext
MIT Lisansı

Copyright (c) 2025 range79

İzin, bu yazılımın bir kopyasını edinen herhangi bir kişiye, yazılımı kısıtlama olmaksızın kullanma, kopyalama, değiştirme, birleştirme, yayınlama, dağıtma, alt lisans verme ve/veya yazılımın kopyalarını satma hakkı bedelsiz olarak verilir. Ancak, yukarıdaki telif hakkı bildirimi ve bu izin bildirimi, yazılımın tüm kopyalarına veya önemli bölümlerine dahil edilmelidir.

YAZILIM "OLDUĞU GİBİ" SAĞLANIR, TİCARİLİK, BELİRLİ BİR AMACA UYGUNLUK VEYA HAK İHLALİ OLMADIĞINA DAİR HERHANGİ BİR GARANTİ OLMAKSIZIN, AÇIK YA DA ZIMNİ HİÇBİR GARANTİ VERİLMEZ. YAZILIMDAN YA DA KULLANIMINDAN KAYNAKLANAN HİÇBİR ZARARDAN, YAZARLAR VEYA TELİF HAKKI SAHİPLERİ SORUMLU DEĞİLDİR.
```

---
