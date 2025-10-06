# 🚀 VERCEL DEPLOYMENT GUIDE

## ✅ **CURRENT STATUS:**
- **Project Name**: `startupnation` ✅
- **Framework**: `Other` ✅
- **Root Directory**: `./` ✅
- **Email**: `jackal.theme@gmail.com` ✅

## 🚀 **NEXT STEPS:**

### **1. Complete Vercel Deployment:**
1. Click **"Deploy"** button in Vercel
2. Wait for build to complete (2-3 minutes)
3. Get your live URL: `https://startupnation-xxx.vercel.app`

### **2. Test Your Live Site:**
1. Open the Vercel URL
2. Navigate to the Demo Reboot page
3. Test the registration form
4. Check that email notifications work

### **3. Set Up Automatic Email Notifications (Optional):**

#### **Option A: Formspree (5 minutes)**
1. Go to [formspree.io](https://formspree.io)
2. Sign up with `jackal.theme@gmail.com`
3. Create new form
4. Get form ID (e.g., `xrgkqjqw`)
5. Replace `YOUR_FORM_ID` in `script.js` line 1002
6. **DONE!** You'll get automatic emails

#### **Option B: EmailJS (10 minutes)**
1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up with `jackal.theme@gmail.com`
3. Connect Gmail service
4. Create email template
5. Get Service ID and Template ID
6. Replace in `script.js` lines 985-986
7. **DONE!** You'll get automatic emails

## 📧 **CURRENT EMAIL SETUP:**

### **✅ What Happens Now:**
1. **Email Client Opens** - Pre-filled email to `jackal.theme@gmail.com`
2. **Visual Alert** - Popup on page when someone registers
3. **Admin Panel** - Click 🎛️ button for stats
4. **Monitor Dashboard** - Real-time registration tracking
5. **Auto-Export** - Files download every 5 registrations

### **✅ How to Monitor:**
1. **Live Site**: `https://startupnation-xxx.vercel.app`
2. **Monitor Dashboard**: `https://startupnation-xxx.vercel.app/registration-monitor.html`
3. **Admin Panel**: Click 🎛️ button on main page
4. **Email**: Check `jackal.theme@gmail.com` for notifications

## 🔧 **FILES TO UPDATE AFTER DEPLOYMENT:**

### **1. Update Email Addresses:**
- In `script.js` line 974: Already updated to `jackal.theme@gmail.com`
- In `script.js` line 986: Already updated to `jackal.theme@gmail.com`

### **2. Add EmailJS (Optional):**
```javascript
// Add this to the <head> section of demo-reboot.html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

### **3. Add Formspree (Optional):**
```javascript
// Replace YOUR_FORM_ID in script.js line 1002
const formspreeResponse = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

## 📊 **MONITORING YOUR LIVE SITE:**

### **1. Real-time Stats:**
- Open: `https://startupnation-xxx.vercel.app/registration-monitor.html`
- Shows live registration count
- Updates every 30 seconds
- Export data as JSON/CSV

### **2. Admin Panel:**
- Click 🎛️ button on main page
- View statistics
- Export registrations
- Clear data if needed

### **3. Email Notifications:**
- Check `jackal.theme@gmail.com`
- Pre-filled emails for each registration
- Automatic emails (if Formspree/EmailJS set up)

## 🎯 **TESTING CHECKLIST:**

- [ ] Site loads on Vercel URL
- [ ] Demo Reboot page works
- [ ] Registration form submits
- [ ] Email client opens with pre-filled data
- [ ] Admin panel shows stats
- [ ] Monitor dashboard works
- [ ] Auto-export downloads files

## 🚨 **TROUBLESHOOTING:**

### **If Site Doesn't Load:**
1. Check Vercel deployment logs
2. Make sure all files are in root directory
3. Check for any build errors

### **If Form Doesn't Work:**
1. Check browser console (F12)
2. Look for JavaScript errors
3. Test on different browsers

### **If Emails Don't Work:**
1. Check spam folder
2. Set up Formspree or EmailJS
3. Check browser console for errors

## 🎉 **YOU'RE READY!**

Once Vercel deployment is complete, your Demo Reboot registration system will be live and ready to collect registrations!

**Live URL**: `https://startupnation-xxx.vercel.app`
**Monitor URL**: `https://startupnation-xxx.vercel.app/registration-monitor.html`
**Email**: `jackal.theme@gmail.com`
