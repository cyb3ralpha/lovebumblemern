# API Documentation

## Authentication Endpoints

### Register
- **POST** `/api/auth/register`
- Body: `{ name, email, password }`

### Login
- **POST** `/api/auth/login`
- Body: `{ email, password }`

### Logout
- **POST** `/api/auth/logout`

## User Endpoints

### Get Profile
- **GET** `/api/user/profile/:id`

### Update Profile
- **PUT** `/api/user/profile/:id`
- Body: User profile data

### Upload Photo
- **POST** `/api/user/upload-photo`
- Body: FormData with image file

## Discover Endpoints

### Get Recommendations
- **GET** `/api/discover/recommendations`

### Filter Profiles
- **POST** `/api/discover/filter`
- Body: Filter criteria

## Match Endpoints

### Get Matches
- **GET** `/api/match/matches`

### Unmatch User
- **POST** `/api/match/unmatch/:matchId`

## Chat Endpoints

### Get Messages
- **GET** `/api/chat/messages/:matchId`

### Send Message
- **POST** `/api/chat/send/:matchId`
- Body: `{ content }`

### Delete Message
- **DELETE** `/api/chat/message/:messageId`

## Donation Endpoints

### Process Donation
- **POST** `/api/donation/donate`
- Body: `{ amount, paymentMethod }`

### Get Donation History
- **GET** `/api/donation/history`
