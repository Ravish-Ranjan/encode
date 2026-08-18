# QR Code Generator API

A flexible backend API for generating QR codes in various formats, including text, URL, vCard, MeCard, WiFi, email, SMS, telephone, geo location, calendar events, Bitcoin, and UPI.

## Features

- Generate QR codes for multiple data types
- Supports both GET (query params) and POST (JSON body) requests
- Supports versioned APIs (`/api` and `/api/v2`)
- Customizable foreground and background colors
- Built with Express, TypeScript, and QRCode

## Supported QR Formats

- Text/URL
- vCard
- MeCard
- WiFi
- Email
- SMS
- Telephone
- Geo Location
- Calendar Event
- Bitcoin
- UPI

See [FORMATS.md](FORMATS.md) for detailed format examples.

## API Endpoints

### API Versions

#### v1 (existing)

Base path: `/api`

- `GET /api/create/:type`
- `POST /api/create/:type`
- `GET /api/create` (legacy text/url-compatible route)
- `POST /api/create` (legacy text/url-compatible route)

#### v2 (new)

Base path: `/api/v2`

- `GET /api/v2/:type`
- `POST /api/v2/:type`

#### What changed in v2

- The `/create` segment was removed from endpoint paths.
- The QR type is provided directly in the versioned route path (`/api/v2/:type`).
- v1 routes are still available for backward compatibility.

### GET /api/v2/:type

Generate a QR code using query parameters.

**Example:**

>

    GET /api/v2/vcard?firstName=John&lastName=Doe&email=john@example.com

### POST /api/v2/:type

Generate a QR code using a JSON body.

**Example:**

>

    POST /api/v2/wifi Content-Type: application/json
    { "type": "WPA", "ssid": "MyNetwork", "password": "mypassword" }

### Color Customization

Add `fg` and `bg` parameters (hex color codes) to customize QR code colors.

**Example:**

>

    GET /api/v2/text_url?text_url=Hello&fg=%23000000&bg=%23ffffff

## Examples

See [examples](EXAMPLES.md)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

for docker setup go to [feature/docker](https://github.com/Ravish-Ranjan/encode/tree/feature/docker) branch

```bash
# Dependency Installation
npm install

# Development
npm run dev

#Build
npm run build

# Start (Production)
npm start
```

### Configuration

Environment variables can be set in a .env file:

>

    PORT=<PORT>
    REDIS_URL=redis://localhost:6379

### Author:

[Ravish Ranjan](https://github.com/Ravish-Ranjan)
