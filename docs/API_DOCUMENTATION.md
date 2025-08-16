# Whisperly API Documentation

## Overview
Whisperly provides a comprehensive REST and GraphQL API for secure, privacy-first messaging. All endpoints support end-to-end encryption with client-side key management.

## Base URLs
- REST API: `https://api.whisperly.com/v1`
- GraphQL: `https://api.whisperly.com/graphql`
- WebSocket: `wss://realtime.whisperly.com`

## Authentication
All API requests require JWT tokens with encrypted payloads.

```http
Authorization: Bearer <jwt_token>
X-Client-Version: 1.0.0
X-Device-ID: <device_uuid>
Content-Type: application/json
```

---

## User Management

### POST /auth/register
Create a new user account with device registration.

**Request:**
```json
{
  "email": "user@example.com",
  "password_hash": "encrypted_password_hash",
  "public_key": "user_public_key_pem",
  "device_info": {
    "device_id": "uuid-v4",
    "device_name": "iPhone 15 Pro",
    "device_type": "mobile",
    "push_token": "fcm_token"
  },
  "profile": {
    "display_name": "John Doe",
    "avatar_url": null
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": "usr_1234567890",
    "access_token": "jwt_access_token",
    "refresh_token": "jwt_refresh_token",
    "expires_in": 3600,
    "device_verified": true
  }
}
```

### POST /auth/login
Authenticate user and register device.

**Request:**
```json
{
  "email": "user@example.com", 
  "password_hash": "encrypted_password_hash",
  "device_info": {
    "device_id": "uuid-v4",
    "device_name": "MacBook Pro",
    "device_type": "desktop"
  }
}
```

### GET /users/profile
Get current user profile and settings.

**Response:**
```json
{
  "user_id": "usr_1234567890",
  "email": "user@example.com",
  "display_name": "John Doe",
  "avatar_url": "https://cdn.whisperly.com/avatars/usr_123.jpg",
  "public_key": "user_public_key_pem",
  "privacy_settings": {
    "read_receipts": true,
    "online_status": true,
    "profile_visibility": "contacts"
  },
  "created_at": "2024-01-15T10:30:00Z",
  "last_active": "2024-01-15T15:45:00Z"
}
```

---

## Contacts Management

### GET /contacts
Retrieve user's contact list with online status.

**Response:**
```json
{
  "contacts": [
    {
      "user_id": "usr_0987654321",
      "display_name": "Sarah Chen",
      "avatar_url": "https://cdn.whisperly.com/avatars/usr_098.jpg",
      "public_key": "contact_public_key_pem",
      "is_online": true,
      "last_seen": "2024-01-15T15:30:00Z",
      "is_verified": true,
      "added_at": "2024-01-10T08:00:00Z"
    }
  ],
  "total_count": 15
}
```

### POST /contacts
Add a new contact by email or phone.

**Request:**
```json
{
  "contact_identifier": "sarah@example.com",
  "message": "Hi! Let's connect on Whisperly"
}
```

---

## Conversations

### GET /conversations
Get user's conversation list with AI prioritization.

**Query Parameters:**
- `limit`: Number of conversations (default: 50)
- `offset`: Pagination offset
- `filter`: `all|unread|pinned|groups|direct`
- `priority`: `ai|manual|chronological`

**Response:**
```json
{
  "conversations": [
    {
      "conversation_id": "conv_1234567890",
      "type": "direct|group", 
      "participants": [
        {
          "user_id": "usr_0987654321",
          "display_name": "Sarah Chen",
          "avatar_url": "https://cdn.whisperly.com/avatars/usr_098.jpg",
          "is_online": true
        }
      ],
      "last_message": {
        "message_id": "msg_1234567890",
        "content": "encrypted_message_payload",
        "sender_id": "usr_0987654321",
        "timestamp": "2024-01-15T15:45:00Z",
        "message_type": "text|image|file|system"
      },
      "unread_count": 2,
      "is_pinned": false,
      "is_muted": false,
      "ai_priority_score": 0.85,
      "updated_at": "2024-01-15T15:45:00Z"
    }
  ],
  "ai_insights": {
    "priority_explanation": "Recent messages from close contacts",
    "suggested_actions": ["reply_to_sarah", "check_team_updates"]
  }
}
```

### POST /conversations
Create a new conversation.

**Request:**
```json
{
  "type": "direct|group",
  "participants": ["usr_0987654321", "usr_1122334455"],
  "group_info": {
    "name": "Design Team",
    "description": "Design collaboration space",
    "avatar_url": null
  },
  "initial_message": {
    "content": "encrypted_welcome_message",
    "message_type": "text"
  }
}
```

### PUT /conversations/{conversation_id}
Update conversation settings.

**Request:**
```json
{
  "is_pinned": true,
  "is_muted": false,
  "custom_title": "Project Discussion"
}
```

---

## Messages

### GET /conversations/{conversation_id}/messages
Retrieve messages with pagination and threading.

**Query Parameters:**
- `limit`: Messages per page (default: 50)
- `before`: Message ID for pagination
- `include_threads`: Include threaded replies (default: true)

**Response:**
```json
{
  "messages": [
    {
      "message_id": "msg_1234567890",
      "conversation_id": "conv_1234567890", 
      "sender_id": "usr_0987654321",
      "content": "encrypted_message_payload",
      "content_type": "text|image|file|system|reaction",
      "reply_to": "msg_0987654321",
      "thread_id": "thread_1234567890",
      "reactions": [
        {
          "emoji": "👍",
          "users": ["usr_1122334455", "usr_5566778899"],
          "count": 2
        }
      ],
      "attachments": [
        {
          "file_id": "file_1234567890",
          "filename": "design-mockup.pdf",
          "file_size": 2457600,
          "mime_type": "application/pdf",
          "encrypted_url": "https://files.whisperly.com/encrypted/file_123.enc"
        }
      ],
      "message_status": "sent|delivered|read",
      "is_edited": false,
      "timestamp": "2024-01-15T15:45:00Z",
      "edit_history": []
    }
  ],
  "has_more": true,
  "thread_summaries": [
    {
      "thread_id": "thread_1234567890", 
      "parent_message_id": "msg_0987654321",
      "reply_count": 5,
      "last_reply_at": "2024-01-15T16:00:00Z"
    }
  ]
}
```

### POST /conversations/{conversation_id}/messages
Send a new message with optimistic delivery.

**Request:**
```json
{
  "client_message_id": "client_msg_uuid",
  "content": "encrypted_message_payload",
  "content_type": "text|image|file",
  "reply_to": "msg_0987654321",
  "thread_id": "thread_1234567890",
  "attachments": [
    {
      "file_id": "file_1234567890",
      "encryption_key": "file_encryption_key"
    }
  ]
}
```

**Response:**
```json
{
  "message_id": "msg_1234567890",
  "client_message_id": "client_msg_uuid",
  "timestamp": "2024-01-15T15:45:00Z",
  "message_status": "sent",
  "optimistic_delivery": true
}
```

### PUT /messages/{message_id}
Edit or update message.

**Request:**
```json
{
  "content": "encrypted_updated_content",
  "edit_reason": "typo_correction"
}
```

### DELETE /messages/{message_id}
Delete message (with optional recall).

**Request:**
```json
{
  "delete_for": "self|everyone",
  "reason": "accidental_send"
}
```

### POST /messages/{message_id}/reactions
Add reaction to message.

**Request:**
```json
{
  "emoji": "👍",
  "action": "add|remove"
}
```

---

## File Management

### POST /files/upload
Upload and encrypt file for messaging.

**Request (multipart/form-data):**
```
file: <binary_file_data>
encryption_key: <client_generated_key>
conversation_id: conv_1234567890
```

**Response:**
```json
{
  "file_id": "file_1234567890",
  "filename": "document.pdf",
  "file_size": 2457600,  
  "mime_type": "application/pdf",
  "encrypted_url": "https://files.whisperly.com/encrypted/file_123.enc",
  "thumbnail_url": "https://files.whisperly.com/thumbs/file_123.webp",
  "expires_at": "2024-02-15T15:45:00Z"
}
```

### GET /files/{file_id}/download
Download and decrypt file.

**Response:**
```
Content-Type: application/octet-stream
Content-Disposition: attachment; filename="document.pdf"
X-Encryption-Key: <file_encryption_key>

<encrypted_file_binary_data>
```

### GET /media/search
Search media files across conversations.

**Query Parameters:**
- `query`: Search term
- `type`: `image|video|document|all`
- `conversation_id`: Filter by conversation
- `date_from`, `date_to`: Date range

---

## Device Management

### GET /devices
List user's connected devices.

**Response:**
```json
{
  "devices": [
    {
      "device_id": "dev_1234567890",
      "device_name": "iPhone 15 Pro",
      "device_type": "mobile|desktop|web",
      "is_current": true,
      "is_verified": true,
      "last_active": "2024-01-15T15:45:00Z",
      "push_enabled": true,
      "location": "San Francisco, CA",
      "added_at": "2024-01-10T08:00:00Z"
    }
  ]
}
```

### POST /devices/verify
Verify new device with existing device.

**Request:**
```json
{
  "verification_code": "123456",
  "device_public_key": "new_device_public_key_pem"
}
```

### DELETE /devices/{device_id}  
Remove device from account.

---

## AI Features

### POST /ai/summarize
Generate conversation or message summary.

**Request:**
```json
{
  "conversation_id": "conv_1234567890",
  "message_range": {
    "from_message_id": "msg_1111111111",
    "to_message_id": "msg_2222222222"
  },
  "summary_type": "brief|detailed|action_items",
  "privacy_mode": "local|cloud"
}
```

**Response:**
```json
{
  "summary": "The team discussed project timeline and deliverables...",
  "key_points": [
    "Project deadline moved to Jan 30th",
    "Sarah to review designs by Friday"
  ],
  "action_items": [
    {
      "task": "Review mockups",
      "assignee": "Sarah Chen", 
      "due_date": "2024-01-19T17:00:00Z"
    }
  ],
  "processed_locally": true
}
```

### POST /ai/smart-reply
Get AI-generated reply suggestions.

**Request:**
```json
{
  "conversation_id": "conv_1234567890",
  "context_messages": ["msg_1", "msg_2", "msg_3"],
  "user_preferences": {
    "tone": "professional|casual|friendly",
    "length": "short|medium|long"
  }
}
```

**Response:**
```json
{
  "suggestions": [
    "Sounds good! I'll get started on that.",
    "Thanks for the update 👍",
    "Let me review and get back to you by tomorrow."
  ],
  "confidence_scores": [0.92, 0.88, 0.85]
}
```

---

## Real-time Events (WebSocket)

### Connection
```javascript
const ws = new WebSocket('wss://realtime.whisperly.com');
ws.send(JSON.stringify({
  type: 'auth',
  token: 'jwt_access_token',
  device_id: 'uuid-v4'
}));
```

### Event Types

**Message Received:**
```json
{
  "type": "message_received",
  "data": {
    "message_id": "msg_1234567890",
    "conversation_id": "conv_1234567890",
    "sender_id": "usr_0987654321", 
    "content": "encrypted_message_payload",
    "timestamp": "2024-01-15T15:45:00Z"
  }
}
```

**Typing Indicator:**
```json
{
  "type": "typing_start|typing_stop",
  "data": {
    "conversation_id": "conv_1234567890",
    "user_id": "usr_0987654321",
    "timestamp": "2024-01-15T15:45:00Z"
  }
}
```

**Message Status Update:**
```json
{
  "type": "message_status",
  "data": {
    "message_id": "msg_1234567890",
    "status": "delivered|read",
    "timestamp": "2024-01-15T15:45:00Z"
  }
}
```

**User Presence:**
```json
{
  "type": "presence_update",
  "data": {
    "user_id": "usr_0987654321",
    "status": "online|away|busy|offline",
    "last_seen": "2024-01-15T15:45:00Z"
  }
}
```

---

## Security & Encryption

### Key Exchange
All message encryption uses Signal Protocol with:
- **Identity Keys**: Long-term Ed25519 keys for user identity
- **Signed Pre-Keys**: Medium-term Curve25519 keys, rotated weekly  
- **One-Time Pre-Keys**: Single-use Curve25519 keys for perfect forward secrecy
- **Message Keys**: Per-message AES-256-GCM encryption

### Client-Side Encryption Flow
1. Generate message key (AES-256)
2. Encrypt message content with message key
3. Encrypt message key with recipient's public key
4. Send encrypted payload to server

**Encrypted Message Payload:**
```json
{
  "encrypted_content": "base64_encrypted_message",
  "encrypted_key": "base64_encrypted_message_key", 
  "sender_identity_key": "sender_public_key",
  "message_counter": 42,
  "signature": "ed25519_signature"
}
```

---

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| Messages | 100/min | Per user |
| File Upload | 20/min | Per user |
| API Calls | 1000/hour | Per user |
| WebSocket | 500 events/min | Per connection |

---

## Error Responses

**Standard Error Format:**
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request could not be understood",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    },
    "timestamp": "2024-01-15T15:45:00Z",
    "request_id": "req_1234567890"
  }
}
```

**Common Error Codes:**
- `UNAUTHORIZED`: Invalid or expired token
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Rate limit exceeded  
- `ENCRYPTION_ERROR`: Message decryption failed
- `DEVICE_NOT_VERIFIED`: Device verification required

---

## Performance & Reliability

### Acceptance Criteria

**Performance:**
- API response time: < 200ms (95th percentile)
- Message delivery: < 500ms end-to-end
- File upload: Support up to 100MB files
- WebSocket latency: < 50ms for real-time events
- Mobile app startup: < 2 seconds to inbox

**Reliability:**  
- API uptime: 99.9% availability
- Message delivery: 99.99% success rate
- Data durability: 99.999999999% (11 9's)
- Auto-retry with exponential backoff
- Offline message queuing up to 30 days

**Accessibility:**
- WCAG 2.1 AA compliance
- Screen reader support for all interfaces
- High contrast mode support
- Keyboard navigation for all features
- Voice control integration (iOS/Android)

**Security:**
- End-to-end encryption for all messages
- Perfect forward secrecy
- Zero-knowledge server architecture  
- Regular security audits and penetration testing
- SOC 2 Type II compliance

This API provides comprehensive coverage for all Whisperly features while maintaining privacy-first principles and optimal performance.