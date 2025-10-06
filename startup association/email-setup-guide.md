# 📧 EMAIL NOTIFICATION SETUP GUIDE

## 🚀 **FASTEST SETUP (5 minutes):**

### **Option 1: Formspree (Recommended)**
1. Go to [formspree.io](https://formspree.io)
2. Sign up for free account
3. Create new form
4. Get your form ID (looks like: `xrgkqjqw`)
5. Replace `YOUR_FORM_ID` in the code with your actual ID
6. **DONE!** You'll get emails automatically

### **Option 2: EmailJS (Most Flexible)**
1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up for free account
3. Connect your email service (Gmail, Outlook, etc.)
4. Create email template
5. Get your Service ID and Template ID
6. Replace `YOUR_SERVICE_ID` and `YOUR_TEMPLATE_ID` in the code
7. **DONE!** You'll get emails automatically

## 📋 **CURRENT NOTIFICATION METHODS:**

### **✅ What Happens When Someone Registers:**

1. **📧 Email Client Opens** - Pre-filled email with all data (you send manually)
2. **🔔 Visual Alert** - Popup on the page showing new registration
3. **📊 Admin Panel** - Click 🎛️ button to see stats and export data
4. **💾 Multiple Storage** - Data saved in 4 different places
5. **📱 Monitor Dashboard** - Open `registration-monitor.html` for real-time view
6. **📄 Auto-Export** - File downloads every 5 registrations

### **✅ How to Check Registrations:**

1. **Real-time Dashboard**: Open `registration-monitor.html`
2. **Admin Panel**: Click 🎛️ button (top-right corner)
3. **Browser Console**: Check for "🚨 NEW REGISTRATION" logs
4. **Auto-downloaded Files**: Every 5 registrations
5. **Email Client**: Opens automatically with pre-filled data

## 🔧 **SETUP INSTRUCTIONS:**

### **For Formspree (Easiest):**
```javascript
// In script.js, find this line and replace YOUR_FORM_ID:
const formspreeResponse = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

### **For EmailJS (Most Features):**
```javascript
// In script.js, find these lines and replace:
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    to_email: 'your-email@example.com',
```

### **For Your Own Email:**
```javascript
// In script.js, find this line and replace:
const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
```

## 📊 **MONITORING OPTIONS:**

### **1. Real-time Dashboard**
- Open `registration-monitor.html` in your browser
- Shows live stats and registration list
- Auto-refreshes every 30 seconds
- Export buttons for immediate download

### **2. Admin Panel**
- Click 🎛️ button on the main page
- Shows statistics
- Export data as JSON or CSV
- Clear all registrations

### **3. Browser Console**
- Press F12 to open developer tools
- Look for "🚨 NEW REGISTRATION" messages
- Shows full registration data

### **4. Auto-Export Files**
- Files automatically download every 5 registrations
- Named: `demo-reboot-backup-YYYY-MM-DD.json`
- Contains all registration data

## 🎯 **RECOMMENDED SETUP:**

1. **Set up Formspree** (5 minutes) for automatic emails
2. **Open monitor dashboard** (`registration-monitor.html`) for real-time tracking
3. **Check admin panel** (🎛️ button) for stats and exports
4. **Test registration** to make sure everything works

## 📱 **MOBILE MONITORING:**

- **Monitor dashboard** works on mobile
- **Admin panel** is mobile-friendly
- **Email notifications** work on any device
- **Auto-export** works on mobile browsers

## 🚨 **EMERGENCY BACKUP:**

If all else fails, the data is still captured in:
- Browser localStorage
- Session storage
- Console logs
- Auto-export files
- Email client (manual send)

**You will NEVER lose registration data!**
