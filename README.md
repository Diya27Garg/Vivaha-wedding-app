# Vivaha - Wedding Planner App 💍

A beautiful and intuitive web application built for couples to plan their dream wedding. It guides the couple through a smooth onboarding process and helps them organize personal details, wedding information, and budget preferences.

## ✨ Features

- **Beautiful Multi-Step Onboarding** for couples
  - Personal Information (Name, DOB, Address, etc.)
  - Wedding Details (Date, City, Zip Code)
  - Budget Selection
- Role-based flow (Couple Onboarding)
- Persistent user data using localStorage
- Responsive and elegant UI with soft pink & maroon theme
- React Router for smooth navigation
- Deployed on Vercel

## 🛠 Tech Stack

- **Frontend**: React.js (Vite)
- **Routing**: React Router DOM
- **Styling**: Custom CSS-in-JS (inline styles with DM Sans + DM Serif Display fonts)
- **Deployment**: Vercel
- **State Management**: React `useState` + localStorage persistence

## 🚀 Live Demo

[View Live App] https://vivaha-wedding-app-8hus.vercel.app/


- Onboarding Step 1 – Personal Details
- Onboarding Step 2 – Wedding Information
- Onboarding Step 3 – Budget Selection
- Home Dashboard

## 🏠 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Diya2726/vivaha-wedding-app.git
   cd vivaha-wedding-app

Install dependencies:Bashnpm install
Run the development server:Bashnpm run dev
Open http://localhost:5173 in your browser.

📁 Project Structure
textvivaha-wedding-app/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── vercel.json          # SPA routing configuration
├── package.json
└── README.md
🔧 Key Implementation Notes

Onboarding Flow: New users are redirected to /onboarding after login/role selection. Once completed, they are marked as onboarded: true and redirected to /home.
Persistence: User data is saved in localStorage so the state survives page refreshes.
Vercel Deployment: Added vercel.json with rewrites for React Router to work correctly on production.

🚀 Deployment
The app is deployed on Vercel with automatic deployments from the main branch.
To deploy manually:
Bashnpm run build
🤝 Contributing
Contributions, issues, and feature requests are welcome!

Fork the project
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License
This project is open-source and available under the MIT License.
❤️ Made with Love
Built with passion for Indian weddings 💕
Feel free to use it as a template for your own wedding planning app!
