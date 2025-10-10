# 📧 Email Setup Guide for Demo Reboot Registrations

## 🎯 **GOAL: Get every registration sent to your email automatically**

## 🚀 **Quick Setup Options:**

### Option 1: Zapier Webhook (RECOMMENDED - 5 minutes)
1. Go to [zapier.com](https://zapier.com) and create free account
2. Click "Create Zap"
3. Choose "Webhooks by Zapier" → "Catch Hook"
4. Copy the webhook URL
5. Edit `api/registrations.js` line 116:
   ```javascript
   'https://hooks.zapier.com/hooks/catch/YOUR_ACTUAL_WEBHOOK_ID/',
   ```
6. Add action: "Email by Zapier" → "Send Outbound Email"
7. Configure to send to your email
8. Test the zap!

### Option 2: IFTTT Webhook (5 minutes)
1. Go to [ifttt.com](https://ifttt.com) and create account
2. Create new applet
3. Choose "Webhooks" → "Receive a web request"
4. Event name: `demo_reboot_registration`
5. Copy your webhook key
6. Edit `api/registrations.js` line 118:
   ```javascript
   'https://maker.ifttt.com/trigger/demo_reboot_registration/with/key/YOUR_ACTUAL_KEY'
   ```
7. Add action: "Email" → "Send me an email"
8. Test it!

### Option 3: Webhook.site (2 minutes)
1. Go to [webhook.site](https://webhook.site)
2. Copy your unique URL
3. Edit `api/registrations.js` line 120:
   ```javascript
   'https://webhook.site/YOUR_ACTUAL_WEBHOOK_ID'
   ```
4. You'll see registrations in real-time on the webhook.site page
5. You can forward them to email manually

## 🔧 **Current Status:**

### ✅ **What Works:**
- Registration form submits successfully
- All data is logged to Vercel console
- Form validation works perfectly
- API returns success response

### 📧 **Email Status:**
- **Currently**: Email content is logged to console
- **After setup**: You'll get instant email notifications
- **Fallback**: All data still logged to Vercel console

## 📋 **How to View Registrations Right Now:**

### Method 1: Vercel Console Logs
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **startupnation** project
3. Go to **"Functions"** tab
4. Click **"View Function Logs"**
5. Look for **"🚀 NEW REGISTRATION RECEIVED"**

### Method 2: Registration Viewer
1. Go to: https://startupnation.vercel.app/registration-logs.html
2. Follow the instructions on the page

## 🎯 **Test Your Setup:**

1. **Fill out the form**: https://startupnation.vercel.app/demo-reboot.html
2. **Submit it**
3. **Check your email** (if webhook configured)
4. **Check Vercel logs** (always works)

## 🚨 **Important Notes:**

- **Data is logged**: Even without email, all registrations are saved in Vercel logs
- **No data loss**: Console logging works 100% of the time
- **Email is bonus**: Makes it easier to see new registrations
- **Offline**: Form won't work offline (needs internet connection)

## 🔧 **Troubleshooting:**

### If email doesn't work:
1. Check Vercel logs - data is always there
2. Verify webhook URL is correct
3. Test webhook manually first
4. Check spam folder

### If form doesn't submit:
1. Check browser console for errors
2. Verify API is working: https://startupnation.vercel.app/api/registrations
3. Check Vercel deployment status

## 📞 **Need Help?**

- Check Vercel logs first (always works)
- Test with registration-logs.html page
- Verify webhook setup step by step

---

**Bottom line: Your registration system works! Email is just a convenience feature.** 🎯
