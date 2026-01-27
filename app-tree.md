/
├── db.json                          # JSON Server (Local REST API) [cite: 13]
├── src/
│   ├── app/
│   │   ├── app.module.ts            # Root module (StoreModule.forRoot) 
│   │   ├── app-routing.module.ts    # Routes & Guards [cite: 21, 22, 23]
│   │   │
│   │   ├── core/                    # Infrastructure & Security [cite: 4, 20]
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts    # Protects /ajouter & /modifier [cite: 21, 85]
│   │   │   ├── interceptors/
│   │   │   │   └── token.interceptor.ts # Injects JWT into headers [cite: 20]
│   │   │   ├── models/              # Schema Definitions [cite: 15, 16]
│   │   │   │   ├── car.model.ts
│   │   │   │   └── brand.model.ts
│   │   │   └── services/
│   │   │       ├── auth.service.ts  # DummyJSON interaction [cite: 12, 19]
│   │   │       └── car.service.ts   # JSON Server CRUD [cite: 13, 91]
│   │   │
│   │   ├── store/                   # CENTRALIZED NgRx STORE [cite: 10]
│   │   │   ├── index.ts             # Central ReducerMap & MetaReducers
│   │   │   ├── app.state.ts         # Global State Interface
│   │   │   ├── auth/                # Auth Feature State [cite: 18]
│   │   │   │   ├── auth.actions.ts  # login, logout, loginSuccess [cite: 76, 79]
│   │   │   │   ├── auth.reducer.ts  # Manages token & user info [cite: 77, 81]
│   │   │   │   ├── auth.effects.ts  # API calls & redirections [cite: 78, 82]
│   │   │   │   └── auth.selectors.ts # isLoggedIn, selectToken, selectUser
│   │   │   └── cars/                # Cars Feature State [cite: 28]
│   │   │       ├── cars.actions.ts  # CRUD actions [cite: 97, 101, 107]
│   │   │       ├── cars.reducer.ts  # Manages car list & loading status [cite: 113]
│   │   │       ├── cars.effects.ts  # JSON Server interactions [cite: 99, 105]
│   │   │       └── cars.selectors.ts # selectAllCars, selectByBrand, selectIsLoading
│   │   │
│   │   ├── shared/                  # Reusable Presentation [cite: 69]
│   │   │   ├── components/
│   │   │   │   ├── nav-header.ts    # Nav with login/logout status [cite: 70, 80]
│   │   │   │   ├── car-card.ts      # UI Card for Grid view [cite: 71]
│   │   │   │   ├── loader.ts        # Spinner for async ops [cite: 72, 113]
│   │   │   │   └── notification.ts  # Toast for success/error [cite: 73, 112]
│   │   │   └── layout/
│   │   │       └── main-layout.ts   # 2-column Layout (Sidebar/Main) [cite: 25, 27]
│   │   │
│   │   └── features/                # Feature Modules (Pages) [cite: 48]
│   │       ├── login/               # username/password form [cite: 49, 51]
│   │       ├── cars-list/           # Table/Grid view + Search/Filter [cite: 31, 32]
│   │       ├── car-details/         # Detailed info page [cite: 59, 92]
│   │       └── car-admin/           # Add/Edit Reactive Forms [cite: 64, 66]
│   │
│   ├── assets/                      # Static assets
│   └── styles.css                   # CSS / Tailwind / Material [cite: 10]
│
├── cypress/                         # E2E Tests (Cucumber) [cite: 116]
│   ├── e2e/
│   │   └── car-management.feature   # User Stories mapped to tests [cite: 74]
│   └── support/
└── karma.conf.js                    # Unit Test Config (Jasmine) [cite: 115]