# Org Chart Validator

## 📌 Overview
The **Org Chart Validator** is a React-based tool that validates organizational hierarchy from a CSV file. It checks for role-based validation and detects cycles in reporting structures to ensure a valid org chart.

## 🚀 Features
- ✅ **CSV Upload:** Upload an organization chart in CSV format.
- ✅ **Role Validation:** Ensures correct reporting relationships:
  - **Root** should not report to anyone.
  - **Admin** should report only to **Root**.
  - **Manager** should report only to **Admin** or another **Manager**.
  - **Caller** should report only to a **Manager**.
- ✅ **Cycle Detection:** Prevents loops where an employee indirectly reports to themselves.
- ✅ **User-Friendly UI:** Styled with Tailwind CSS for better readability.
- ✅ **Error Reporting:** Displays validation errors in red.

## 📂 Project Structure
```
org-chart-validator/
│-- src/
│   │-- components/
│   │   │-- OrgChartValidator.jsx
│   │-- App.js
│   │-- index.js
│-- public/
│-- package.json
│-- README.md
```

## 🔧 Installation & Usage
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/org-chart-validator.git
cd org-chart-validator
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Run the Project
```sh
npm start
```

## 📑 CSV Format Example
The CSV file should be structured as follows:
```csv
FullName,Email,Role,ReportsTo
Alice Johnson,alice@example.com,Root,
Bob Smith,bob@example.com,Admin,alice@example.com
Charlie Davis,charlie@example.com,Manager,bob@example.com
David Lee,david@example.com,Caller,charlie@example.com
```

## 🛠️ Built With
- **React.js** - Frontend library
- **Papaparse** - CSV Parsing
- **Tailwind CSS** - Styling

## 🏆 Key Functionalities
- **handleFileUpload** → Reads and parses CSV files.
- **validateData** → Checks for incorrect reporting structures.
- **hasCycle** → Uses DFS to detect cycles in the org chart.

## 📝 License
This project is licensed under the MIT License.

## 🤝 Contributing
Contributions are welcome! Feel free to submit a PR.

## 📞 Contact
For questions or feedback, reach out at **sushil812.dev@gmail.com**.

