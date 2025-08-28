// Firebase Configuration for AI Portfolio Website
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Your web app's Firebase configuration
// For production, these should be environment variables
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY_HERE",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN_HERE",
    projectId: process.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID_HERE",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID_HERE",
    appId: process.env.FIREBASE_APP_ID || "YOUR_APP_ID_HERE",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID_HERE"
};

// Check if Firebase is properly configured
function validateFirebaseConfig() {
    const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
    const missingFields = requiredFields.filter(field => 
        !firebaseConfig[field] || firebaseConfig[field].includes('YOUR_') || firebaseConfig[field].includes('HERE')
    );
    
    if (missingFields.length > 0) {
        console.warn('⚠️ Firebase configuration incomplete. Missing or placeholder values for:', missingFields);
        console.warn('Please set up your Firebase configuration properly.');
        return false;
    }
    
    return true;
}

// Initialize Firebase only if config is valid
let app, analytics, auth, db, storage;

if (validateFirebaseConfig()) {
    try {
        app = initializeApp(firebaseConfig);
        analytics = getAnalytics(app);
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);
        console.log('✅ Firebase initialized successfully');
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
    }
} else {
    console.warn('⚠️ Firebase not initialized due to incomplete configuration');
}

// Firebase Analytics Events
function trackEvent(eventName, parameters = {}) {
    if (analytics) {
        analytics.logEvent(eventName, parameters);
    }
}

// Track page views
function trackPageView(pageName) {
    trackEvent('page_view', {
        page_name: pageName,
        page_title: document.title
    });
}

// Track user interactions
function trackUserInteraction(action, category, label = null) {
    trackEvent('user_interaction', {
        action: action,
        category: category,
        label: label,
        timestamp: new Date().toISOString()
    });
}

// Track portfolio views
function trackPortfolioView(projectName) {
    trackEvent('portfolio_view', {
        project_name: projectName,
        category: 'portfolio'
    });
}

// Track contact form submissions
function trackContactSubmission(formType) {
    trackEvent('contact_submission', {
        form_type: formType,
        timestamp: new Date().toISOString()
    });
}

// Firebase Authentication
function initializeAuth() {
    // Sign in anonymously for basic tracking
    signInAnonymously(auth)
        .then(() => {
            console.log('Anonymous authentication successful');
        })
        .catch((error) => {
            console.error('Anonymous authentication error:', error);
        });

    // Monitor auth state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('User is signed in:', user.uid);
        } else {
            console.log('User is signed out');
        }
    });
}

// Firebase Firestore - Contact Form
async function saveContactForm(formData) {
    try {
        // Add additional metadata
        const contactData = {
            name: formData.name,
            email: formData.email,
            projectType: formData.projectType,
            message: formData.message,
            timestamp: new Date().toISOString(),
            source: 'portfolio_website',
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            pageUrl: window.location.href,
            sessionId: getSessionId(),
            ipAddress: await getClientIP(),
            status: 'new',
            priority: getPriorityLevel(formData.projectType)
        };
        
        const docRef = await addDoc(collection(db, "contacts"), contactData);
        
        console.log("✅ Contact form saved with ID: ", docRef.id);
        trackContactSubmission('portfolio_contact');
        
        // Also save to a separate collection for analytics
        await addDoc(collection(db, "contact_analytics"), {
            contactId: docRef.id,
            projectType: formData.projectType,
            timestamp: new Date().toISOString(),
            source: 'portfolio_website',
            conversion: true
        });
        
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("❌ Error saving contact form: ", error);
        return { success: false, error: error.message };
    }
}

// Get priority level based on project type
function getPriorityLevel(projectType) {
    const priorities = {
        'ai': 'high',
        'consulting': 'high',
        'web': 'medium',
        'data': 'medium'
    };
    return priorities[projectType] || 'medium';
}

// Generate session ID for tracking
function getSessionId() {
    if (!sessionStorage.getItem('sessionId')) {
        sessionStorage.setItem('sessionId', 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
    }
    return sessionStorage.getItem('sessionId');
}

// Get client IP (using a free service)
async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.log('Could not fetch IP address:', error);
        return 'unknown';
    }
}

// Firebase Firestore - Portfolio Analytics
async function savePortfolioView(projectName, projectCategory) {
    try {
        const docRef = await addDoc(collection(db, "portfolio_views"), {
            projectName: projectName,
            category: projectCategory,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        });
        
        console.log("Portfolio view saved with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error saving portfolio view: ", error);
        return { success: false, error: error.message };
    }
}

// Firebase Storage - File Upload (for future use)
async function uploadFile(file, path) {
    try {
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        console.log('File uploaded successfully:', downloadURL);
        return { success: true, url: downloadURL };
    } catch (error) {
        console.error('Error uploading file:', error);
        return { success: false, error: error.message };
    }
}

// Initialize Firebase when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize authentication
        initializeAuth();
        
        // Track initial page view
        trackPageView('home');
        
        // Track section visibility
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.id || entry.target.className;
                    trackEvent('section_view', { section_name: sectionName });
                }
            });
        }, observerOptions);
        
        // Observe all major sections
        document.querySelectorAll('section[id]').forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Track form interactions
        trackFormInteractions();
        
        // Track portfolio interactions
        trackPortfolioInteractions();
        
        console.log('✅ Firebase initialized successfully');
        
        // Dispatch custom event to notify other scripts
        window.dispatchEvent(new CustomEvent('firebaseReady'));
        
    } catch (error) {
        console.error('❌ Error initializing Firebase:', error);
    }
});

// Track form interactions
function trackFormInteractions() {
    const contactForm = document.querySelector('.ai-contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                trackEvent('form_field_focus', {
                    field_name: input.id,
                    field_type: input.type
                });
            });
            
            input.addEventListener('blur', () => {
                if (input.value.trim()) {
                    trackEvent('form_field_complete', {
                        field_name: input.id,
                        field_type: input.type,
                        has_value: true
                    });
                }
            });
        });
    }
}

// Track portfolio interactions
function trackPortfolioInteractions() {
    const portfolioItems = document.querySelectorAll('.ai-project-item, .portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectTitle = item.querySelector('.project-title, h3, h4')?.textContent || 'Unknown Project';
            const projectCategory = item.querySelector('.project-category-badge, .badge')?.textContent || 'Unknown Category';
            
            trackPortfolioView(projectTitle, projectCategory);
        });
    });
}

// Export Firebase functions for use in other scripts
window.FirebaseApp = {
    trackEvent,
    trackPageView,
    trackUserInteraction,
    trackPortfolioView,
    trackContactSubmission,
    saveContactForm,
    savePortfolioView,
    uploadFile,
    getSessionId,
    getClientIP,
    analytics,
    auth,
    db,
    storage
};

// Add global error handler for Firebase operations
window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && event.reason.message && event.reason.message.includes('firebase')) {
        console.error('Firebase error caught:', event.reason);
        event.preventDefault();
    }
});

// Add Firebase status indicator
function showFirebaseStatus(status, message) {
    const statusIndicator = document.querySelector('.firebase-status');
    if (statusIndicator) {
        statusIndicator.className = `firebase-status ${status}`;
        statusIndicator.textContent = message;
        
        setTimeout(() => {
            statusIndicator.style.opacity = '0';
        }, 3000);
    }
}

// Test Firebase connection
async function testFirebaseConnection() {
    try {
        const testDoc = await addDoc(collection(db, "connection_test"), {
            timestamp: new Date().toISOString(),
            test: true
        });
        
        // Clean up test document
        await deleteDoc(doc(db, "connection_test", testDoc.id));
        
        showFirebaseStatus('success', '✅ Firebase Connected');
        return true;
    } catch (error) {
        showFirebaseStatus('error', '❌ Firebase Error');
        console.error('Firebase connection test failed:', error);
        return false;
    }
}

// Initialize connection test after Firebase is ready
document.addEventListener('firebaseReady', function() {
    setTimeout(testFirebaseConnection, 1000);
});
