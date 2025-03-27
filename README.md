# WorkWheel Connect

## Introduction
WorkWheel Connect is a comprehensive online platform designed to empower small and medium-sized enterprises (SMEs) by providing networking, collaboration, and business management tools. The platform focuses on supporting rural businesses and creating opportunities for growth.

## Features
- **Networking & Collaboration:** SMEs can connect, collaborate, and share resources.
- **Business Directory:** Advanced search and filtering options to find relevant businesses.
- **Project Management:** Tools to streamline workflows and enhance productivity.
- **User Management:** Secure login and access control for different user roles.
- **SME-Entrepreneur-Investor Portal:** A dedicated space for interactions and opportunities.

## Tech Stack
- **Frontend:** React.js-vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Auth
- **Deployment:** Vercel/Heroku

## Installation
### Prerequisites
- Node.js installed
- MongoDB setup (local/cloud)
- Firebase project configured (if using Firebase Auth)

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/gunjanghate/workwheel-connect.git
   ```
2. Navigate to the project directory:
   ```sh
   cd workwheel-connect
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add required environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   FIREBASE_API_KEY=your_firebase_api_key
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```
6. Open your browser and go to `http://localhost:3000`

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Added new feature"`
4. Push to your branch: `git push origin feature-name`
5. Submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any queries or suggestions, feel free to reach out to [Gunjan Ghate](https://github.com/gunjanghate).

