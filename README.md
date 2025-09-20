# QR Code Generator API

A powerful and flexible REST API for generating QR codes with support for multiple data formats including vCards, WiFi credentials, UPI payments, calendar events, and more.

## 📋 Table of Contents

- [Features](#features)
- [API Reference](#api-reference)
- [Supported QR Types](#supported-qr-types)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [License](#license)

## ✨ Features

- 🎯 **Multiple QR Code Types** - Support for 11 different QR code formats
- 🔄 **Flexible Input** - Accept data via GET query parameters or POST request body
- 🖼️ **Image Streaming** - Direct image streaming using `qrcode.toFileStream`
- ⚡ **Fast Response** - Optimized for quick QR code generation
- 📱 **Mobile-Friendly** - Generate QR codes for various mobile use cases
- 💳 **Payment Support** - Built-in support for UPI and Bitcoin payments
- 🌐 **Contact Cards** - vCard and MeCard support for easy contact sharing


## 🔧 API Reference

### Base URL
```
http://localhost:3000/api
```

### Endpoint
```
GET/POST /create/:type
```

**Parameters:**
- `type` (path parameter): The type of QR code to generate (see [Supported Types](#supported-qr-types))

**Request Methods:**
- `GET` - Data passed as query parameters
- `POST` - Data passed in request body

**Response:**
- **Success**: Image stream with `Content-Type: image/png`
- **Error**: JSON response with `{ "msg": "error message" }`

## 🎯 Supported QR Types

| Type | Description | Use Case |
|------|-------------|----------|
| `text_url` | Plain text or URL | Links, simple text |
| `vcard` | vCard contact format | Business cards, contact sharing |
| `mecard` | MeCard contact format | Simplified contact sharing |
| `wifi` | WiFi credentials | Network sharing |
| `email` | Email composition | Quick email drafting |
| `sms` | SMS message | Pre-filled text messages |
| `telephone` | Phone number | Quick dial |
| `geo_location` | Geographic coordinates | Location sharing |
| `calendar_event` | Calendar event | Event sharing |
| `bitcoin` | Bitcoin payment | Cryptocurrency transactions |
| `upi` | UPI payment (India) | Digital payments |

## 💡 Usage Examples

### 1. Text/URL QR Code

**GET Request:**
```bash
curl "http://localhost:3000/api/create/text_url?text_url=https://example.com"
```

**POST Request:**
```bash
curl -X POST http://localhost:3000/api/create/text_url \
  -H "Content-Type: application/json" \
  -d '{"text_url": "https://example.com"}'
```

### 2. WiFi QR Code

**GET Request:**
```bash
curl "http://localhost:3000/api/create/wifi?type=WPA&ssid=MyNetwork&password=mypassword"
```

**POST Request:**
```bash
curl -X POST http://localhost:3000/api/create/wifi \
  -H "Content-Type: application/json" \
  -d '{
    "type": "WPA",
    "ssid": "MyNetwork",
    "password": "mypassword"
  }'
```

### 3. vCard Contact

**POST Request:**
```bash
curl -X POST http://localhost:3000/api/create/vcard \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "orgName": "Tech Corp",
    "title": "Software Engineer",
    "telephoneCell": "+1234567890",
    "email": "john.doe@example.com",
    "url": "https://johndoe.dev"
  }'
```

### 4. UPI Payment

**POST Request:**
```bash
curl -X POST http://localhost:3000/api/create/upi \
  -H "Content-Type: application/json" \
  -d '{
    "upi_id": "example@upi",
    "name": "John Doe",
    "amount": 100,
    "currency": "INR",
    "note": "Payment for services"
  }'
```

### 5. Email QR Code

**GET Request:**
```bash
curl "http://localhost:3000/api/create/email?email=contact@example.com&subject=Hello&body=Hi there!"
```

### 6. SMS QR Code

**POST Request:**
```bash
curl -X POST http://localhost:3000/api/create/sms \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+1234567890",
    "message": "Hello from QR code!"
  }'
```

### 7. Geographic Location

**POST Request:**
```bash
curl -X POST http://localhost:3000/api/create/geo_location \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 40.7128,
    "longitude": -74.0060,
    "label": "New York City"
  }'
```

### 8. Calendar Event

**POST Request:**
```bash
curl -X POST http://localhost:3000/api/create/calendar_event \
  -H "Content-Type: application/json" \
  -d '{
    "summary": "Team Meeting",
    "dateStart": "2024-12-01T10:00:00",
    "dateEnd": "2024-12-01T11:00:00",
    "location": "Conference Room A",
    "description": "Weekly team sync"
  }'
```

### 9. Bitcoin Payment

**POST Request:**
```bash
curl -X POST http://localhost:3000/api/create/bitcoin \
  -H "Content-Type: application/json" \
  -d '{
    "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    "amount": 0.001,
    "label": "Donation",
    "message": "Thanks for your support"
  }'
```

### 10. Phone Number

**GET Request:**
```bash
curl "http://localhost:3000/api/create/telephone?telephone=+1234567890"
```

## 📊 Data Formats

### Text/URL
```typescript
{
  text_url: string;
}
```

### vCard
```typescript
{
  firstName: string;
  lastName?: string;
  orgName?: string;
  title?: string;
  telephoneCell?: string;
  telephoneWork?: string;
  email?: string;
  url?: string;
  address?: string;
}
```

### MeCard
```typescript
{
  name: string;
  telephone?: string;
  email?: string;
  address?: string;
  url?: string;
}
```

### WiFi
```typescript
{
  type: "WPA" | "WEP" | "nopass";
  ssid: string;
  password?: string;
}
```

### Email
```typescript
{
  email: string;
  subject?: string;
  body?: string;
}
```

### SMS
```typescript
{
  to: string;
  message?: string;
}
```

### Telephone
```typescript
{
  telephone: string;
}
```

### Geographic Location
```typescript
{
  latitude: number;
  longitude: number;
  label?: string;
}
```

### Calendar Event
```typescript
{
  summary: string;
  dateStart?: string;
  dateEnd?: string;
  location?: string;
  description?: string;
}
```

### Bitcoin
```typescript
{
  address: string;
  amount?: number;
  label?: string;
  message?: string;
}
```

### UPI
```typescript
{
  upi_id: string;
  name: string;
  amount: number;
  currency?: string;
  note?: string;
}
```

## ⚠️ Error Handling

The API returns errors in JSON format:

```json
{
  "msg": "Error description"
}
```

**Common Error Scenarios:**
- Invalid QR type in path parameter
- Missing required fields in request data
- Invalid data format
- Server processing errors

**Example Error Responses:**

```bash
# Missing required fields
curl -X POST http://localhost:3000/api/create/vcard \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
{
  "msg": "Required files are not given (firstName)"
}
```

```bash
# Multiple missing required fields for UPI
curl -X POST http://localhost:3000/api/create/upi \
  -H "Content-Type: application/json" \
  -d '{"upi_id": "test@upi"}'

# Response:
{
  "msg": "Required files are not given (name,amount)"
}
```

```bash
# Invalid QR type
curl http://localhost:3000/api/create/invalid_type

# Response:
{
  "msg": "Invalid QR code type: invalid_type"
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ravish Ranjan**
- GitHub: [@Ravish-Ranjan](https://github.com/Ravish-Ranjan)

## 🙏 Acknowledgments

- [qrcode](https://www.npmjs.com/package/qrcode) - QR code generation library
- [Express.js](https://expressjs.com/) - Web framework

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made by [Ravish Ranjan](https://github.com/Ravish-Ranjan)

</div>