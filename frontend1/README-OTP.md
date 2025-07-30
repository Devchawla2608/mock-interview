# OTP Email Verification System

This document describes the OTP (One-Time Password) email verification system implemented using EmailJS for the Mock Interview Platform.

## Overview

The OTP email verification system provides secure email verification for user registration and login processes. It uses EmailJS to send professionally formatted emails with OTP codes.

## Features

- ✅ **EmailJS Integration**: Professional email delivery service
- ✅ **6-digit OTP Codes**: Secure random number generation
- ✅ **10-minute Expiration**: Time-limited verification codes
- ✅ **Resend Functionality**: Users can request new codes
- ✅ **Beautiful UI**: Modern, responsive OTP input interface
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Loading States**: Visual feedback during operations
- ✅ **Welcome Emails**: Optional welcome emails after verification
- ✅ **Rate Limiting**: Built-in protection against abuse

## Architecture

### Frontend Components

1. **EmailJS Service** (`src/services/emailService.js`)

   - Handles email sending via EmailJS
   - Manages template parameters
   - Error handling and logging

2. **OTP Verification Hook** (`src/hooks/useOtpVerification.js`)

   - Custom React hook for OTP operations
   - Manages loading and error states
   - Provides reusable OTP functionality

3. **Enhanced OTP Modal** (`src/components/UI/OtpModal.jsx`)

   - Modern UI with countdown timer
   - Auto-focus and paste support
   - Visual feedback and error display

4. **Configuration** (`src/config/emailConfig.js`)
   - Centralized EmailJS configuration
   - Environment variable support
   - Template and content management

### Backend Integration

The system integrates with the existing backend OTP endpoints:

- `POST /api/auth/register` - User registration with OTP generation
- `POST /api/auth/send-otp` - Request new OTP for existing users
- `POST /api/auth/verify-otp` - Verify OTP and mark email as verified
- `POST /api/auth/login` - Login with email verification check

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend1
npm install @emailjs/browser
```

### 2. Configure EmailJS

Follow the detailed setup guide in `emailjs-setup.md` to:

- Create EmailJS account
- Set up email service
- Create email templates
- Get API credentials

### 3. Environment Configuration

Create `.env` file in `frontend1/`:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
REACT_APP_EMAILJS_WELCOME_TEMPLATE_ID=your_welcome_template_id
```

### 4. Test the System

1. Start the application
2. Register a new user
3. Check email for OTP
4. Verify the OTP works correctly

## Usage Examples

### Basic OTP Verification

```javascript
import useOtpVerification from "../hooks/useOtpVerification";

const MyComponent = () => {
  const { sendOtp, verifyOtp, isLoading, error } = useOtpVerification();

  const handleSendOtp = async () => {
    const success = await sendOtp("user@example.com", "John Doe");
    if (success) {
      console.log("OTP sent successfully");
    }
  };

  const handleVerifyOtp = async (otp) => {
    const success = await verifyOtp("user@example.com", otp);
    if (success) {
      console.log("Email verified successfully");
    }
  };
};
```

### Using the OTP Modal

```javascript
import { OtpModal } from "../components/UI";

const MyComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("user@example.com");

  return (
    <OtpModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      onVerify={handleVerifyOtp}
      onResend={handleResendOtp}
      loading={isLoading}
      error={error}
      email={email}
      resendLoading={resendLoading}
    />
  );
};
```

## Email Templates

### OTP Verification Template

The system includes a professional HTML email template with:

- Branded header with app name
- Clear OTP code display
- Security instructions
- Support contact information
- Responsive design

### Welcome Email Template

Optional welcome email sent after successful verification with:

- Welcome message
- Feature highlights
- Call-to-action button
- Support information

## Security Features

1. **Time-limited OTPs**: 10-minute expiration
2. **Rate Limiting**: Prevents abuse of OTP requests
3. **Secure Generation**: Cryptographically secure random numbers
4. **Environment Variables**: Secure credential management
5. **Error Handling**: No sensitive information in error messages

## Error Handling

The system handles various error scenarios:

- **Network Errors**: Connection issues with EmailJS
- **Invalid OTPs**: Wrong or expired codes
- **Service Errors**: EmailJS service issues
- **User Not Found**: Non-existent email addresses
- **Rate Limiting**: Too many requests

## Performance Considerations

- **Lazy Loading**: EmailJS loaded only when needed
- **Debounced Requests**: Prevents rapid-fire OTP requests
- **Caching**: Template parameters cached for efficiency
- **Error Recovery**: Graceful fallbacks for failures

## Monitoring and Analytics

- **Email Delivery Tracking**: Monitor EmailJS delivery rates
- **OTP Success Rates**: Track verification success/failure
- **User Experience Metrics**: Time to verify, retry rates
- **Error Logging**: Comprehensive error tracking

## Troubleshooting

### Common Issues

1. **"Service not found"**: Check EmailJS Service ID
2. **"Template not found"**: Verify Template ID
3. **"Public key invalid"**: Ensure correct Public Key
4. **Emails not sending**: Check email service configuration
5. **CORS errors**: Verify EmailJS browser setup

### Debug Mode

Enable debug logging by setting:

```javascript
// In emailService.js
console.log("EmailJS Debug:", true);
```

## Future Enhancements

- [ ] **SMS OTP Support**: Add SMS verification option
- [ ] **Biometric Verification**: Fingerprint/face recognition
- [ ] **Advanced Security**: 2FA with authenticator apps
- [ ] **Analytics Dashboard**: Detailed verification metrics
- [ ] **Custom Templates**: User-configurable email templates

## Support

For issues related to:

- **EmailJS**: Contact EmailJS support
- **OTP System**: Check error logs and configuration
- **Integration**: Verify API endpoints and credentials

## License

This OTP verification system is part of the Mock Interview Platform and follows the same licensing terms.
