# Database Schema

## Users Collection
```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  age: Number,
  bio: String,
  photos: [String],
  location: String,
  interests: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Likes Collection
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  likedUserId: ObjectId (ref: User),
  createdAt: Date
}
```

## Matches Collection
```
{
  _id: ObjectId,
  user1Id: ObjectId (ref: User),
  user2Id: ObjectId (ref: User),
  matchedAt: Date
}
```

## Messages Collection
```
{
  _id: ObjectId,
  matchId: ObjectId (ref: Match),
  senderId: ObjectId (ref: User),
  content: String,
  createdAt: Date
}
```

## Reports Collection
```
{
  _id: ObjectId,
  reportedByUserId: ObjectId (ref: User),
  reportedUserId: ObjectId (ref: User),
  reason: String,
  createdAt: Date
}
```

## Donations Collection
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  amount: Number,
  paymentMethod: String,
  status: String,
  createdAt: Date
}
```
