# AI Developer Portfolio Website

A modern, responsive portfolio website built with Django and Firebase, featuring AI-themed design and interactive elements.

## 🚀 Features

- **Modern AI Design**: Sleek, futuristic interface with AI-inspired animations
- **Responsive Layout**: Mobile-first design that works on all devices
- **Contact Form**: Integrated with Firebase for data storage
- **Portfolio Showcase**: Dynamic project filtering and display
- **Analytics**: Firebase Analytics integration for user behavior tracking
- **Interactive Elements**: Smooth animations, particle effects, and hover interactions

## 🛠️ Tech Stack

- **Backend**: Django 5.2.5
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Analytics**: Firebase Analytics
- **Storage**: Firebase Storage
- **Styling**: Custom CSS with CSS Variables and Animations

## 📋 Prerequisites

- Python 3.8+
- Django 5.2.5
- Firebase project
- Modern web browser

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arbabmehmood098/Profile.git
   cd Profile
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing one
   - Enable Firestore, Authentication, and Analytics
   - Copy your project configuration

5. **Configure Firebase**
   - Copy `firebase-config-template.js` to `static/js/firebase-config.js`
   - Replace placeholder values with your actual Firebase credentials
   - **Important**: Never commit `firebase-config.js` to Git

6. **Run migrations**
   ```bash
   python manage.py migrate
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```

8. **Open your browser**
   Navigate to `http://127.0.0.1:8000/`

## 🔐 Firebase Configuration

### Required Services
- **Firestore**: For storing contact form data and analytics
- **Authentication**: For anonymous user tracking
- **Analytics**: For user behavior analysis
- **Storage**: For future file uploads

### Security Rules
Make sure to set up proper Firestore security rules:

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to contacts collection
    match /contacts/{document} {
      allow read, write: if true;
    }
    
    // Allow read/write access to portfolio_views collection
    match /portfolio_views/{document} {
      allow read, write: if true;
    }
    
    // Allow read/write access to contact_analytics collection
    match /contact_analytics/{document} {
      allow read, write: if true;
    }
  }
}
```

## 📁 Project Structure

```
Profile/
├── myproject/              # Django project settings
├── portfolio/              # Main app
│   ├── templates/         # HTML templates
│   ├── static/           # Static files (CSS, JS, images)
│   └── views.py          # Django views
├── static/               # Additional static files
├── staticfiles/          # Collected static files
├── venv/                # Virtual environment
├── .gitignore           # Git ignore file
├── firebase-config-template.js  # Firebase config template
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

## 🎨 Customization

### Colors and Themes
Edit CSS variables in `static/css/style.css`:
```css
:root {
    --ai-primary: #3B82F6;      /* Electric Blue */
    --ai-secondary: #06B6D4;    /* Cyan */
    --ai-accent: #22C55E;       /* Neon Green */
    --ai-accent-alt: #8B5CF6;   /* Purple */
    --ai-dark: #0D1117;         /* Dark Navy */
}
```

### Content
- Update portfolio projects in `portfolio/templates/portfolio/single_page.html`
- Modify contact form fields as needed
- Customize animations and effects in JavaScript files

## 📱 Responsive Design

The website is fully responsive and includes:
- Mobile-first CSS approach
- Touch-friendly interactions
- Optimized for all screen sizes
- Progressive enhancement

## 🚀 Deployment

### Local Development
```bash
python manage.py runserver
```

### Production Deployment
1. Set `DEBUG = False` in settings
2. Configure production database
3. Set up proper Firebase security rules
4. Use a production web server (Gunicorn, uWSGI)
5. Configure static file serving

## 📊 Analytics and Tracking

The website includes comprehensive tracking:
- Page views and section visibility
- Form interactions and submissions
- Portfolio project views
- User behavior patterns
- Performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Arbab Mehmood**
- GitHub: [@arbabmehmood098](https://github.com/arbabmehmood098)
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- Django team for the excellent framework
- Firebase team for the powerful backend services
- Open source community for inspiration and tools

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Contact through the portfolio contact form
- Reach out via social media

---

**Note**: Remember to never commit sensitive information like API keys to version control. Always use environment variables or configuration files that are excluded from Git.
