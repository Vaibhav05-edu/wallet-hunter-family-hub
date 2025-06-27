# 🏠 Wallet Hunter – Family Hub

A full-stack React app to register Heads of Families and their members using OTP login, visualize the family structure as a tree, and save the data to Firebase Firestore.

---

## ✅ Key Features

- 🔐 OTP-based login using Firebase Authentication
- 👤 Registration form for Head of Family
- 👨‍👩‍👧‍👦 Add multiple family members with relationship links
- 🌳 Visualize the family as a tree structure
- 🧾 Export tree as PDF or image
- ☁️ Store all data securely in Firebase Firestore

---

## 📁 Folder Structure

```
src/
├── App.js
├── index.js
├── firebase/
│   └── config.js
└── components/
    ├── OTPAuth.jsx
    ├── HeadForm.jsx
    ├── FamilyForm.jsx
    ├── TreeView.jsx
    └── ExportTree.jsx
public/
└── index.html
```

---

## 🧩 Technologies Used

- React
- Firebase (Authentication & Firestore)
- Formik + Yup (Form handling and validation)
- html2canvas + jsPDF (Export to PDF/Image)

---

## ☁️ Firebase Setup

1. Go to [https://firebase.google.com](https://firebase.google.com)
2. Create a Firebase project
3. Enable:
   - Phone Authentication
   - Cloud Firestore Database
4. Copy your Firebase config and paste in:
   ```
   src/firebase/config.js
   ```

```js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { RecaptchaVerifier };
```

---

## 📤 Firestore Data Structure

```json
{
  "head": {
    "name": "John",
    "phone": "+91XXXXXXXXXX",
    "age": 45,
    ...
  },
  "family": [
    {
      "firstName": "Jane",
      "relation": "Wife",
      "age": 42,
      ...
    },
    {
      "firstName": "Aryan",
      "relation": "Son",
      "age": 17,
      ...
    }
  ],
  "phone": "+91XXXXXXXXXX",
  "createdAt": "timestamp"
}
```

---

## 📄 License

Made by **Vaibhav D**  
For Wallet Hunter Developer Assignment  
Built with ❤️ using React + Firebase
