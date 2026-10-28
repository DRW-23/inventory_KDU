# KDU Asset Tracker (බැරැක්ක ස්ථාවර භාණ්ඩ)

A modern, responsive web application prototype for General Sir John Kotelawala Defence University (KDU) to manage and track institutional assets, barracks inventory, and multi-departmental asset transfers.

---

## 🌟 Key Features

- **Main Asset Ledger Table (`බැරැක්ක ස්ථාවර භාණ්ඩ`)**:
  - Grouped multi-item row layout under a single bill/receipt using HTML `rowSpan`.
  - Dual-language labels (English & Sinhala) for all institutional ledger fields.
  - Subtotals and grand total calculation for grouped line items.

- **Role-Based Simulated Views**:
  - **Full Ledger (Log Office)**: Complete master ledger view with all columns.
  - **Payments (Bursar's Office)**: Focused financial view with receipt numbers, bill dates, unit costs, and total expenditure.
  - **Faculty Goods (Section View)**: Departmental distribution and asset assignments.
  - **VC Approval Queue (Vice Chancellor's Office)**: Filtered queue showing only pending entry and stock removal approvals.

- **Dynamic Filtering & Search**:
  - Filter by acquisition year.
  - Cascading **Faculty $\rightarrow$ Department** dropdown selection.
  - Real-time search across suppliers, items, receipt numbers, and codes.

- **Interactive Workflow Badges**:
  - One-click cycle through approval stages (`Request` $\rightarrow$ `Pending` $\rightarrow$ `Accept`).
  - Stock removal reason selector (`අස්ථානගතවීම්`, `අලාභ හානි වීම්`, `කල් ඉකුත් වීම්`) linked with removal approvals.
  - Toast notifications confirming state updates.

- **Add New Record Modal**:
  - Multi-item line entry per record.
  - Dynamic faculty and department selection.
  - Creatable dropdown for warranty periods (custom entries supported).
  - Auto-incrementing Index Number (`අනු අංකය`).

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vite.dev/)
- **UI Library**: [Mantine v9](https://mantine.dev/) (`@mantine/core`, `@mantine/dates`, `@mantine/hooks`, `@mantine/notifications`)
- **Icons**: [@tabler/icons-react](https://tabler.io/icons)
- **State & Tables**: [@tanstack/react-query](https://tanstack.com/query), [@tanstack/react-table](https://tanstack.com/table)
- **Styling**: Vanilla CSS with Glassmorphism, KDU Navy (`#0a0e27` to `#1a2150`) & Gold theme

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `yarn` / `pnpm`

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/DRW-23/inventory_KDU.git
cd inventory_KDU
npm install
```

### 3. Run Locally
Start the Vite development server:
```bash
npm run dev
```
The application will be accessible at:
- **Local:** `http://localhost:5173/`
- **Network (Wi-Fi/LAN):** Broadcasted on your local IPv4 address (e.g. `http://192.168.x.x:5173/`)

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 📄 License
This project is developed for educational and institutional prototyping purposes for General Sir John Kotelawala Defence University.
