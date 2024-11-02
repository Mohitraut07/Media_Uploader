
# MediaUploader

MediaUploader is a web application that allows users to upload, manage, and share their media files effortlessly. With a clean and user-friendly interface, MediaUploader provides a fast and secure way to handle your media content.

## Features

- **User Authentication**: Sign up and log in using email/password or third-party providers like Google and GitHub.
- **Media Management**: Easily upload, organize, and manage your media files in a centralized location.
- **Fast Uploads**: Experience quick and seamless uploads regardless of file size.
- **Secure Storage**: Your files are securely stored in the cloud with encryption to ensure privacy.
- **Easy Sharing**: Share your media files with friends and colleagues with just a few clicks.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Firebase Authentication and Firestore
- **Deployment**: Vercel (or any other hosting service you choose)

## Getting Started

To get a local copy of this project up and running, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mohitraut07/Media_Uploader.git
   ```

2. Navigate into the project directory:
   ```bash
   cd media-uploader
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up Firebase:
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firebase Authentication and Firestore.
   - Create a `.env` file in the root directory and add your Firebase configuration:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

5. Start the development server:
   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Create an account or log in using your existing credentials.
- Once logged in, you can upload your media files.
- Manage your files easily from your dashboard.
- Share files by generating shareable links.

## Contributing

Contributions are welcome! If you would like to contribute to MediaUploader, please follow these steps:

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thank you to [Firebase](https://firebase.google.com/) for providing the backend services.
- Special thanks to [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/) for the frontend framework and styling.

## Demo

You can view a live demo of MediaUploader at [demo-link.com](http://your-demo-link.com).

---

