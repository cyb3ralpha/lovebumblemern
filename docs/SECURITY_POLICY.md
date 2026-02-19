# Security Policy

## Data Protection
- All passwords are hashed using bcryptjs
- JWT tokens expire after 7 days
- HTTPS is enforced in production
- Environment variables are used for sensitive data

## User Privacy
- User profiles are private by default
- Only matched users can see full profiles
- Messages are encrypted in transit
- User photos are stored securely on Cloudinary

## Account Security
- Two-factor authentication (2FA) can be enabled
- Rate limiting is enforced on all endpoints
- Suspicious activities are logged
- Users can delete their accounts and data

## Reporting System
- Users can report inappropriate behavior
- Admin review of reported profiles
- Automatic content moderation
- Account suspension for violations
