# 🏨 YourStay Mobile 3-Phase Iteration Prototype

This project is a **3-phase prototyping copy** of the *YourStay* mobile app prototype from [another repo](https://github.com/Net-Gene/YourStay). 

It demonstrates an interactive hostel guest app focused on mobile-first use, with planned kiosk and full-system integrations in later iterations.

---

## 🚧 Iteration Phases

This project progresses through **three defined phases**, each increasing in system complexity and hardware integration:

| Phase             | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `mobile-only`     | Full standalone functionality for guest check-in, chat, and food services |
| `app-kiosk`       | Adds support for physical kiosks (e.g. wristband pickup)                   |
| `full-integration`| Real-time system sync across mobile app, kiosk, and staff devices         |

You can switch between phases in-app during development.

---

## ✨ Features (Per Phase)

### 📱 Mobile-Only (Iteration 1)
- 🔑 Guest check-in via booking reference or QR code
- 🛂 Digital travel card submission
- 💬 Multilingual chat with auto-translation
- 🍔 Food ordering interface
- 🧭 Facility usage guide

---

### 🖥️ App + Kiosk (Iteration 2)
Includes **all features from Iteration 1**, plus:
- 🏁 Check-in starts in app, completed at kiosk
- 📶 RFID/NFC wristband pickup support
- 👣 In-app guidance for kiosk usage
- 🔁 Synchronized data between app and kiosk

---

### 📡 Full Integration (Iteration 3)
Includes **all features from Iterations 1 & 2**, plus:
- ⚙️ Real-time data sync across all platforms
- 🧼 Staff-side interfaces (admin, kitchen, cleaning)
- 📊 Staff dashboard with analytics and controls

## 🔄 Switching Phases (Development)

You can toggle between:
- `mobile-only`
- `app-kiosk`
- `full-integration`

Each phase changes available components, interface behavior, and logic visibility via UI selection cards.

---

## 🧠 Built With

- **React (Next.js)** — App interface with multi-phase UI logic
- **TailwindCSS** — Utility-first styling
- **i18next** — Internationalization (i18n) support
- **Lucide Icons** — UI iconography
- **Custom Components** — Modular UI from `/components/`

---

## 🏃 Getting Started

### 1. Install dependencies

```bash
npx install
```

### 2. Start the development server

```bash
npx run dev
```

### 3. Open the app

Visit [http://localhost:3000](http://localhost:3000) in your browser.

> App also supports Android/iOS builds (if using the mobile version).

---

## 🌍 Internationalization

- Supports multi-language UI via `i18next`
- Language can be set via `?lang=xx` in the URL or from the buttons on the header of the UI
- Placeholder translations managed in `/locales/`

> ⚠️ This app is a partial prototype and may have incomplete language support, intended only to simulate a subset of the final functionality.

---

## 🛠️ Components Breakdown

| Component        | Description                                |
|------------------|--------------------------------------------|
| `CheckIn`        | Booking validation and travel card         |
| `Dashboard`      | Guest home after check-in                  |
| `FoodOrdering`   | Menu and order submission                  |
| `ChatSupport`    | Multilingual chat with staff               |
| `FacilityGuide`  | Guides for check-in, food, and amenities   |
| `AdminPanel`     | Internal staff control panel (Iteration 3) |
| `LanguageSelector`| Language toggle UI                        |

---

## 📱 Deployment Targets

- ✅ Web (Next.js SSR/SPA)
- ✅ Android & iOS (via Expo, optional)

---

## 🧩 Future Roadmap

- ✅ Iteration 1: Standalone mobile app
- ⏳ Iteration 2: Kiosk integration
- ⏳ Iteration 3: Full real-time system

---

## 🎯 Goal

Deliver a seamless, **self-service hostel experience** for guests using:
- Secure digital check-in
- Room & amenity access
- Food ordering
- Multilingual chat
- Real-time integrations (future)

---

## 🗣️ Contact

For questions, reach out to [@Net-Gene](https://github.com/Net-Gene)

---

## 🪪 License

This repository is for **internal prototyping and iteration**, not intended for production use.
