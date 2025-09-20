# QR Code API Usage Guide

Complete guide on how to use the QR Code Generator API across different platforms and programming languages.

## 📋 Table of Contents

- [Terminal/Command Line](#terminalcommand-line)
- [Browser Usage](#browser-usage)
- [JavaScript Methods](#javascript-methods)
- [Python Methods](#python-methods)
- [HTML Image Tags](#html-image-tags)
- [Other Programming Languages](#other-programming-languages)
- [Postman/API Testing Tools](#postmanapi-testing-tools)
- [Frontend Integration Examples](#frontend-integration-examples)


## 💻 Terminal/Command Line

### Using cURL

#### GET Requests (Query Parameters)
```bash
# Simple text/URL QR code
curl "http://localhost:3000/api/create/text_url?text_url=https://github.com" \
  --output qr_code.png

# WiFi QR code
curl "http://localhost:3000/api/create/wifi?type=WPA&ssid=MyWiFi&password=secret123" \
  --output wifi_qr.png

# Email QR code
curl "http://localhost:3000/api/create/email?email=test@example.com&subject=Hello&body=Test%20message" \
  --output email_qr.png

# Phone number QR code
curl "http://localhost:3000/api/create/telephone?telephone=%2B1234567890" \
  --output phone_qr.png
```

#### POST Requests (JSON Body)
```bash
# vCard contact
curl -X POST http://localhost:3000/api/create/vcard \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "telephoneCell": "+1234567890"
  }' \
  --output vcard_qr.png

# UPI payment
curl -X POST http://localhost:3000/api/create/upi \
  -H "Content-Type: application/json" \
  -d '{
    "upi_id": "merchant@paytm",
    "name": "Merchant Name",
    "amount": 100,
    "note": "Payment for services"
  }' \
  --output upi_qr.png

# Calendar event
curl -X POST http://localhost:3000/api/create/calendar_event \
  -H "Content-Type: application/json" \
  -d '{
    "summary": "Team Meeting",
    "dateStart": "2024-12-01T10:00:00",
    "location": "Office"
  }' \
  --output event_qr.png
```

### Using wget
```bash
# Simple download
wget "http://localhost:3000/api/create/text_url?text_url=https://example.com" \
  -O qr_code.png

# With custom user agent
wget "http://localhost:3000/api/create/text_url?text_url=https://example.com" \
  --user-agent="QR-Generator-Client/1.0" \
  -O qr_code.png
```

### Using HTTPie
```bash
# GET request
http GET localhost:3000/api/create/text_url text_url=="https://example.com" > qr.png

# POST request
http POST localhost:3000/api/create/vcard \
  firstName="John" lastName="Doe" email="john@example.com" > contact.png
```

---

## 🌐 Browser Usage

### Direct URL Access
Simply paste these URLs in your browser address bar:

```
# Text/URL QR code
http://localhost:3000/api/create/text_url?text_url=https://github.com

# WiFi QR code
http://localhost:3000/api/create/wifi?type=WPA&ssid=MyNetwork&password=mypass

# Email QR code
http://localhost:3000/api/create/email?email=contact@example.com&subject=Hello

# Phone QR code
http://localhost:3000/api/create/telephone?telephone=+1234567890
```

### Browser DevTools (Console)
```javascript
// Using fetch to download QR code
fetch('http://localhost:3000/api/create/text_url?text_url=https://example.com')
  .then(response => response.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr_code.png';
    a.click();
  });
```

---

## 🟨 JavaScript Methods

### Using Fetch API (Modern)

#### GET Request
```javascript
async function generateQR(text) {
  try {
    const response = await fetch(`http://localhost:3000/api/create/text_url?text_url=${encodeURIComponent(text)}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg);
    }
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error generating QR:', error);
    throw error;
  }
}

// Usage
generateQR('https://github.com')
  .then(imageUrl => {
    const img = document.createElement('img');
    img.src = imageUrl;
    document.body.appendChild(img);
  });
```

#### POST Request
```javascript
async function generateContactQR(contactData) {
  try {
    const response = await fetch('http://localhost:3000/api/create/vcard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg);
    }
    
    return await response.blob();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage
const contactData = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  telephoneCell: "+1234567890"
};

generateContactQR(contactData)
  .then(blob => {
    const url = URL.createObjectURL(blob);
    const img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);
  });
```

### Using XMLHttpRequest (Legacy)
```javascript
function generateQRXHR(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://localhost:3000/api/create/text_url?text_url=${encodeURIComponent(url)}`);
  xhr.responseType = 'blob';
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      const imageUrl = URL.createObjectURL(xhr.response);
      callback(null, imageUrl);
    } else {
      callback(new Error('Failed to generate QR code'));
    }
  };
  
  xhr.send();
}

// Usage
generateQRXHR('https://example.com', (error, imageUrl) => {
  if (error) {
    console.error(error);
    return;
  }
  
  const img = document.createElement('img');
  img.src = imageUrl;
  document.body.appendChild(img);
});
```

### Using Axios
```javascript
import axios from 'axios';

// GET request
async function generateQRAxios(text) {
  try {
    const response = await axios.get('http://localhost:3000/api/create/text_url', {
      params: { text_url: text },
      responseType: 'blob'
    });
    
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
}

// POST request
async function generateUPIQR(upiData) {
  try {
    const response = await axios.post('http://localhost:3000/api/create/upi', upiData, {
      responseType: 'blob'
    });
    
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
}

// Usage
generateQRAxios('https://github.com')
  .then(imageUrl => console.log('QR generated:', imageUrl));

const upiData = {
  upi_id: "merchant@paytm",
  name: "Merchant",
  amount: 100
};

generateUPIQR(upiData)
  .then(imageUrl => console.log('UPI QR generated:', imageUrl));
```

---

## 🐍 Python Methods

### Using requests library

#### GET Request
```python
import requests
from PIL import Image
from io import BytesIO

def generate_qr(text, filename='qr_code.png'):
    """Generate QR code for text/URL"""
    url = 'http://localhost:3000/api/create/text_url'
    params = {'text_url': text}
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        # Save image
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f"QR code saved as {filename}")
        
        # Or display using PIL
        image = Image.open(BytesIO(response.content))
        image.show()
        
        return response.content
    else:
        error = response.json()
        raise Exception(f"Error: {error['msg']}")

# Usage
generate_qr('https://github.com', 'github_qr.png')
```

#### POST Request
```python
import requests
import json

def generate_contact_qr(contact_data, filename='contact_qr.png'):
    """Generate vCard QR code"""
    url = 'http://localhost:3000/api/create/vcard'
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, json=contact_data, headers=headers)
    
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f"Contact QR saved as {filename}")
        return response.content
    else:
        error = response.json()
        raise Exception(f"Error: {error['msg']}")

# Usage
contact_data = {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "telephoneCell": "+1234567890"
}

generate_contact_qr(contact_data, 'john_contact.png')
```

#### Complete Python Class
```python
import requests
from typing import Dict, Any, Optional
from pathlib import Path

class QRCodeGenerator:
    def __init__(self, base_url: str = 'http://localhost:3000/api'):
        self.base_url = base_url
    
    def _make_request(self, qr_type: str, data: Dict[str, Any], method: str = 'POST') -> bytes:
        """Make request to QR API"""
        url = f"{self.base_url}/create/{qr_type}"
        
        if method.upper() == 'GET':
            response = requests.get(url, params=data)
        else:
            response = requests.post(url, json=data)
        
        if response.status_code == 200:
            return response.content
        else:
            error = response.json()
            raise Exception(f"API Error: {error['msg']}")
    
    def generate_url_qr(self, url: str, filename: Optional[str] = None) -> bytes:
        """Generate QR for URL/text"""
        data = {'text_url': url}
        content = self._make_request('text_url', data, 'GET')
        
        if filename:
            Path(filename).write_bytes(content)
        
        return content
    
    def generate_wifi_qr(self, ssid: str, password: str, auth_type: str = 'WPA', 
                        filename: Optional[str] = None) -> bytes:
        """Generate WiFi QR code"""
        data = {
            'type': auth_type,
            'ssid': ssid,
            'password': password
        }
        content = self._make_request('wifi', data)
        
        if filename:
            Path(filename).write_bytes(content)
        
        return content
    
    def generate_upi_qr(self, upi_id: str, name: str, amount: float, 
                       note: Optional[str] = None, filename: Optional[str] = None) -> bytes:
        """Generate UPI payment QR code"""
        data = {
            'upi_id': upi_id,
            'name': name,
            'amount': amount
        }
        if note:
            data['note'] = note
            
        content = self._make_request('upi', data)
        
        if filename:
            Path(filename).write_bytes(content)
        
        return content

# Usage
qr_gen = QRCodeGenerator()

# Generate different types of QR codes
qr_gen.generate_url_qr('https://github.com', 'github.png')
qr_gen.generate_wifi_qr('MyWiFi', 'password123', filename='wifi.png')
qr_gen.generate_upi_qr('merchant@paytm', 'Merchant Name', 100.0, 'Payment', 'payment.png')
```

### Using urllib (No external dependencies)
```python
import urllib.request
import urllib.parse
import json

def generate_qr_urllib(text, filename='qr_code.png'):
    """Generate QR using only standard library"""
    # Encode parameters
    params = urllib.parse.urlencode({'text_url': text})
    url = f'http://localhost:3000/api/create/text_url?{params}'
    
    try:
        with urllib.request.urlopen(url) as response:
            if response.status == 200:
                data = response.read()
                with open(filename, 'wb') as f:
                    f.write(data)
                print(f"QR code saved as {filename}")
            else:
                print(f"Error: HTTP {response.status}")
    except Exception as e:
        print(f"Error: {e}")

# Usage
generate_qr_urllib('https://example.com', 'example_qr.png')
```

---

## 🏷️ HTML Image Tags

### Direct Image Tags (GET only)
```html
<!-- Simple text/URL QR code -->
<img src="http://localhost:3000/api/create/text_url?text_url=https://github.com" 
     alt="GitHub QR Code" 
     width="200" height="200">

<!-- WiFi QR code -->
<img src="http://localhost:3000/api/create/wifi?type=WPA&ssid=MyWiFi&password=secret123" 
     alt="WiFi QR Code" 
     style="max-width: 300px;">

<!-- Email QR code -->
<img src="http://localhost:3000/api/create/email?email=contact@example.com&subject=Hello&body=Hi%20there!" 
     alt="Email QR Code">

<!-- Phone number QR code -->
<img src="http://localhost:3000/api/create/telephone?telephone=%2B1234567890" 
     alt="Phone QR Code">
```

### Dynamic Image Tags with JavaScript
```html
<!DOCTYPE html>
<html>
<head>
    <title>QR Code Generator</title>
</head>
<body>
    <div id="qr-container"></div>
    
    <script>
        function createQRImage(src, alt) {
            const img = document.createElement('img');
            img.src = src;
            img.alt = alt;
            img.style.maxWidth = '250px';
            img.style.margin = '10px';
            return img;
        }
        
        const container = document.getElementById('qr-container');
        
        // Add different QR codes
        const qrCodes = [
            {
                src: 'http://localhost:3000/api/create/text_url?text_url=https://github.com',
                alt: 'GitHub QR'
            },
            {
                src: 'http://localhost:3000/api/create/wifi?type=WPA&ssid=MyWiFi&password=secret',
                alt: 'WiFi QR'
            },
            {
                src: 'http://localhost:3000/api/create/email?email=test@example.com',
                alt: 'Email QR'
            }
        ];
        
        qrCodes.forEach(qr => {
            container.appendChild(createQRImage(qr.src, qr.alt));
        });
    </script>
</body>
</html>
```

### React Component
```jsx
import React, { useState, useEffect } from 'react';

const QRCodeImage = ({ type, data, alt, ...props }) => {
  const [src, setSrc] = useState('');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const generateQR = async () => {
      try {
        let url;
        if (typeof data === 'string' || Object.keys(data).length <= 3) {
          // Use GET for simple data
          const params = new URLSearchParams(data).toString();
          url = `http://localhost:3000/api/create/${type}?${params}`;
          setSrc(url);
        } else {
          // Use POST for complex data
          const response = await fetch(`http://localhost:3000/api/create/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
          }
          
          const blob = await response.blob();
          setSrc(URL.createObjectURL(blob));
        }
      } catch (err) {
        setError(err.message);
      }
    };
    
    generateQR();
  }, [type, data]);
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return src ? <img src={src} alt={alt} {...props} /> : <div>Loading...</div>;
};

// Usage
function App() {
  return (
    <div>
      <QRCodeImage 
        type="text_url" 
        data={{text_url: "https://github.com"}} 
        alt="GitHub QR"
        style={{maxWidth: '200px'}}
      />
      
      <QRCodeImage 
        type="vcard" 
        data={{
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com"
        }} 
        alt="Contact QR"
        style={{maxWidth: '200px'}}
      />
    </div>
  );
}
```

---

## 🌍 Other Programming Languages

### PHP
```php
<?php
// GET request
function generateQRGet($text, $filename = 'qr_code.png') {
    $url = 'http://localhost:3000/api/create/text_url?' . http_build_query(['text_url' => $text]);
    
    $imageData = file_get_contents($url);
    
    if ($imageData !== false) {
        file_put_contents($filename, $imageData);
        echo "QR code saved as $filename\n";
        return $imageData;
    } else {
        throw new Exception("Failed to generate QR code");
    }
}

// POST request
function generateQRPost($type, $data, $filename = 'qr_code.png') {
    $url = "http://localhost:3000/api/create/$type";
    
    $options = [
        'http' => [
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    if ($result !== false) {
        file_put_contents($filename, $result);
        echo "QR code saved as $filename\n";
        return $result;
    } else {
        throw new Exception("Failed to generate QR code");
    }
}

// Usage
generateQRGet('https://github.com', 'github_qr.png');

$contactData = [
    'firstName' => 'John',
    'lastName' => 'Doe',
    'email' => 'john@example.com'
];
generateQRPost('vcard', $contactData, 'contact_qr.png');
?>
```

### Java
```java
import java.io.*;
import java.net.*;
import java.nio.file.*;

public class QRGenerator {
    private static final String BASE_URL = "http://localhost:3000/api/create/";
    
    public static byte[] generateQRGet(String type, String params) throws IOException {
        URL url = new URL(BASE_URL + type + "?" + params);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        
        if (conn.getResponseCode() == 200) {
            return conn.getInputStream().readAllBytes();
        } else {
            throw new IOException("HTTP " + conn.getResponseCode());
        }
    }
    
    public static byte[] generateQRPost(String type, String jsonData) throws IOException {
        URL url = new URL(BASE_URL + type);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);
        
        try (OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream())) {
            writer.write(jsonData);
        }
        
        if (conn.getResponseCode() == 200) {
            return conn.getInputStream().readAllBytes();
        } else {
            throw new IOException("HTTP " + conn.getResponseCode());
        }
    }
    
    public static void main(String[] args) throws IOException {
        // Generate URL QR
        byte[] qrData = generateQRGet("text_url", "text_url=https://github.com");
        Files.write(Paths.get("github_qr.png"), qrData);
        
        // Generate contact QR
        String contactJson = "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@example.com\"}";
        byte[] contactQR = generateQRPost("vcard", contactJson);
        Files.write(Paths.get("contact_qr.png"), contactQR);
        
        System.out.println("QR codes generated successfully!");
    }
}
```

### Go
```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "net/url"
    "os"
)

func generateQRGet(qrType, text, filename string) error {
    baseURL := "http://localhost:3000/api/create/" + qrType
    params := url.Values{}
    params.Add("text_url", text)
    
    resp, err := http.Get(baseURL + "?" + params.Encode())
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    if resp.StatusCode != 200 {
        return fmt.Errorf("HTTP %d", resp.StatusCode)
    }
    
    file, err := os.Create(filename)
    if err != nil {
        return err
    }
    defer file.Close()
    
    _, err = io.Copy(file, resp.Body)
    return err
}

func generateQRPost(qrType string, data interface{}, filename string) error {
    jsonData, err := json.Marshal(data)
    if err != nil {
        return err
    }
    
    url := "http://localhost:3000/api/create/" + qrType
    resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    if resp.StatusCode != 200 {
        return fmt.Errorf("HTTP %d", resp.StatusCode)
    }
    
    file, err := os.Create(filename)
    if err != nil {
        return err
    }
    defer file.Close()
    
    _, err = io.Copy(file, resp.Body)
    return err
}

func main() {
    // Generate URL QR
    err := generateQRGet("text_url", "https://github.com", "github_qr.png")
    if err != nil {
        fmt.Printf("Error generating URL QR: %v\n", err)
    }
    
    // Generate contact QR
    contact := map[string]string{
        "firstName": "John",
        "lastName":  "Doe",
        "email":     "john@example.com",
    }
    
    err = generateQRPost("vcard", contact, "contact_qr.png")
    if err != nil {
        fmt.Printf("Error generating contact QR: %v\n", err)
    }
    
    fmt.Println("QR codes generated successfully!")
}
```

---

## 🧪 Postman/API Testing Tools

### Postman Collection
```json
{
  "info": {
    "name": "QR Code Generator API",
    "description": "Collection for testing QR code generation"
  },
  "item": [
    {
      "name": "Text URL QR (GET)",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/create/text_url?text_url=https://github.com",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "create", "text_url"],
          "query": [
            {"key": "text_url", "value": "https://github.com"}
          ]
        }
      }
    },
    {
      "name": "vCard QR (POST)",
      "request": {
        "method": "POST",
        "header": [
          {"key": "Content-Type", "value": "application/json"}
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"firstName\": \"John\",\n  \"lastName\": \"Doe\",\n  \"email\": \"john@example.com\",\n  \"telephoneCell\": \"+1234567890\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/create/vcard",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "create", "vcard"]
        }
      }
    }
  ]
}
```

### Insomnia/Thunder Client
```json
{
  "requests": [
    {
      "name": "Generate URL QR",
      "method": "GET",
      "url": "http://localhost:3000/api/create/text_url",
      "params": [
        {"name": "text_url", "value": "https://example.com"}
      ]
    },
    {
      "name": "Generate UPI QR",
      "method": "POST",
      "url": "http://localhost:3000/api/create/upi",
      "headers": [
        {"name": "Content-Type", "value": "application/json"}
      ],
      "body": {
        "upi_id": "merchant@paytm",
        "name": "Merchant Name",
        "amount": 100,
        "note": "Payment for services"
      }
    }
  ]
}
```

---

## 🎨 Frontend Integration Examples

### Vanilla JavaScript QR Generator Form
```html
<!DOCTYPE html>
<html>
<head>
    <title>QR Code Generator</title>
    <style>
        .form-group { margin: 15px 0; }
        .form-group label { display: block; margin-bottom: 5px; }
        .form-group input, .form-group select { width: 300px; padding: 8px; }
        .qr-result { margin: 20px 0; text-align: center; }
        .qr-result img { max-width: 300px; border: 1px solid #ccc; }
        .error { color: red; }
    </style>
</head>
<body>
    <h1>QR Code Generator</h1>
    
    <form id="qr-form">
        <div class="form-group">
            <label>QR Type:</label>
            <select id="qr-type" onchange="updateForm()">
                <option value="text_url">Text/URL</option>
                <option value="wifi">WiFi</option>
                <option value="email">Email</option>
                <option value="upi">UPI Payment</option>
                <option value="vcard">Contact (vCard)</option>
            </select>
        </div>
        
        <div id="form-fields">
            <!-- Dynamic fields will be inserted here -->
        </div>
        
        <button type="submit">Generate QR Code</button>
    </form>
    
    <div class="qr-result" id="qr-result"></div>
    
    <script>
        const formConfigs = {
            text_url: [
                {name: 'text_url', label: 'Text or URL', type: 'text', required: true}
            ],
            wifi: [
                {name: 'ssid', label: 'Network Name (SSID)', type: 'text', required: true},
                {name: 'password', label: 'Password', type: 'password'},
                {name: 'type', label: 'Security', type: 'select', options: ['WPA', 'WEP', 'nopass']}
            ],
            email: [
                {name: 'email', label: 'Email Address', type: 'email', required: true},
                {name: 'subject', label: 'Subject', type: 'text'},
                {name: 'body', label: 'Message', type: 'textarea'}
            ],
            upi: [
                {name: 'upi_id', label: 'UPI ID', type: 'text', required: true},
                {name: 'name', label: 'Merchant Name', type: 'text', required: true},
                {name: 'amount', label: 'Amount', type: 'number', required: true},
                {name: 'note', label: 'Note', type: 'text'}
            ],
            vcard: [
                {name: 'firstName', label: 'First Name', type: 'text', required: true},
                {name: 'lastName', label: 'Last Name', type: 'text'},
                {name: 'email', label: 'Email', type: 'email'},
                {name: 'telephoneCell', label: 'Phone', type: 'tel'},
                {name: 'orgName', label: 'Organization', type: 'text'},
                {name: 'title', label: 'Job Title', type: 'text'}
            ]
        };

        function updateForm() {
            const type = document.getElementById('qr-type').value;
            const fieldsContainer = document.getElementById('form-fields');
            const config = formConfigs[type];
            
            fieldsContainer.innerHTML = '';
            
            config.forEach(field => {
                const group = document.createElement('div');
                group.className = 'form-group';
                
                const label = document.createElement('label');
                label.textContent = field.label + (field.required ? ' *' : '');
                group.appendChild(label);
                
                let input;
                if (field.type === 'select') {
                    input = document.createElement('select');
                    field.options.forEach(option => {
                        const opt = document.createElement('option');
                        opt.value = option;
                        opt.textContent = option;
                        input.appendChild(opt);
                    });
                } else if (field.type === 'textarea') {
                    input = document.createElement('textarea');
                    input.rows = 3;
                } else {
                    input = document.createElement('input');
                    input.type = field.type;
                }
                
                input.name = field.name;
                input.id = field.name;
                if (field.required) input.required = true;
                
                group.appendChild(input);
                fieldsContainer.appendChild(group);
            });
        }
        
        document.getElementById('qr-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const type = document.getElementById('qr-type').value;
            const formData = new FormData(e.target);
            const data = {};
            
            for (let [key, value] = of formData.entries()) {
                if (value.trim()) {
                    data[key] = value;
                }
            }
            
            try {
                const resultDiv = document.getElementById('qr-result');
                resultDiv.innerHTML = 'Generating QR code...';
                
                let response;
                
                // Use GET for simple data, POST for complex data
                if (type === 'text_url' && Object.keys(data).length === 1) {
                    const params = new URLSearchParams(data);
                    response = await fetch(`http://localhost:3000/api/create/${type}?${params}`);
                } else {
                    response = await fetch(`http://localhost:3000/api/create/${type}`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    });
                }
                
                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    
                    resultDiv.innerHTML = `
                        <img src="${imageUrl}" alt="Generated QR Code">
                        <br>
                        <a href="${imageUrl}" download="qr_code.png">Download QR Code</a>
                    `;
                } else {
                    const error = await response.json();
                    resultDiv.innerHTML = `<div class="error">Error: ${error.msg}</div>`;
                }
            } catch (error) {
                document.getElementById('qr-result').innerHTML = 
                    `<div class="error">Network error: ${error.message}</div>`;
            }
        });
        
        // Initialize form
        updateForm();
    </script>
</body>
</html>
```

### Vue.js Component
```vue
<template>
  <div class="qr-generator">
    <h2>QR Code Generator</h2>
    
    <form @submit.prevent="generateQR">
      <div class="form-group">
        <label>QR Type:</label>
        <select v-model="selectedType" @change="resetForm">
          <option v-for="type in qrTypes" :key="type.value" :value="type.value">
            {{ type.label }}
          </option>
        </select>
      </div>
      
      <component 
        :is="selectedType + 'Form'" 
        v-model="formData"
        @submit="generateQR"
      />
      
      <button type="submit" :disabled="loading">
        {{ loading ? 'Generating...' : 'Generate QR Code' }}
      </button>
    </form>
    
    <div v-if="qrImage" class="qr-result">
      <img :src="qrImage" alt="Generated QR Code" />
      <br>
      <a :href="qrImage" :download="filename">Download QR Code</a>
    </div>
    
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'QRGenerator',
  data() {
    return {
      selectedType: 'text_url',
      formData: {},
      qrImage: null,
      error: null,
      loading: false,
      qrTypes: [
        { value: 'text_url', label: 'Text/URL' },
        { value: 'wifi', label: 'WiFi' },
        { value: 'email', label: 'Email' },
        { value: 'upi', label: 'UPI Payment' },
        { value: 'vcard', label: 'Contact Card' }
      ]
    };
  },
  computed: {
    filename() {
      return `${this.selectedType}_qr.png`;
    }
  },
  methods: {
    resetForm() {
      this.formData = {};
      this.qrImage = null;
      this.error = null;
    },
    
    async generateQR() {
      this.loading = true;
      this.error = null;
      
      try {
        let response;
        const url = `http://localhost:3000/api/create/${this.selectedType}`;
        
        if (this.selectedType === 'text_url' && Object.keys(this.formData).length === 1) {
          const params = new URLSearchParams(this.formData);
          response = await fetch(`${url}?${params}`);
        } else {
          response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.formData)
          });
        }
        
        if (response.ok) {
          const blob = await response.blob();
          this.qrImage = URL.createObjectURL(blob);
        } else {
          const errorData = await response.json();
          this.error = errorData.msg;
        }
      } catch (err) {
        this.error = 'Network error: ' + err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.qr-generator {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin: 15px 0;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input, 
.form-group select, 
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.qr-result {
  text-align: center;
  margin: 20px 0;
}

.qr-result img {
  max-width: 300px;
  border: 1px solid #ccc;
}

.error {
  color: red;
  background: #ffe6e6;
  padding: 10px;
  border-radius: 4px;
}
</style>
```

### React Hook for QR Generation
```jsx
import { useState, useCallback } from 'react';

export const useQRGenerator = (baseUrl = 'http://localhost:3000/api') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const generateQR = useCallback(async (type, data, useGet = false) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      const url = `${baseUrl}/create/${type}`;
      
      if (useGet || (type === 'text_url' && typeof data === 'object' && Object.keys(data).length <= 1)) {
        const params = new URLSearchParams(data);
        response = await fetch(`${url}?${params}`);
      } else {
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg);
      }
      
      const blob = await response.blob();
      return URL.createObjectURL(blob);
      
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);
  
  return { generateQR, loading, error };
};

// Usage in React component
function QRGeneratorComponent() {
  const { generateQR, loading, error } = useQRGenerator();
  const [qrImage, setQrImage] = useState(null);
  
  const handleGenerateURL = async () => {
    try {
      const imageUrl = await generateQR('text_url', { text_url: 'https://github.com' });
      setQrImage(imageUrl);
    } catch (err) {
      console.error('Failed to generate QR:', err);
    }
  };
  
  const handleGenerateContact = async () => {
    try {
      const imageUrl = await generateQR('vcard', {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      });
      setQrImage(imageUrl);
    } catch (err) {
      console.error('Failed to generate QR:', err);
    }
  };
  
  return (
    <div>
      <button onClick={handleGenerateURL} disabled={loading}>
        Generate URL QR
      </button>
      <button onClick={handleGenerateContact} disabled={loading}>
        Generate Contact QR
      </button>
      
      {loading && <p>Generating QR code...</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {qrImage && <img src={qrImage} alt="QR Code" style={{maxWidth: '300px'}} />}
    </div>
  );
}
```

## 🔗 URL Encoding Reference

When using GET requests, special characters need to be properly encoded:

```javascript
// Special characters that need encoding
const examples = {
  space: ' ' → '%20',
  plus: '+' → '%2B',
  ampersand: '&' → '%26',
  hash: '#' → '%23',
  question: '?' → '%3F',
  equals: '=' → '%3D',
  percent: '%' → '%25'
};

// JavaScript encoding
const encodedText = encodeURIComponent('Hello World!'); // 'Hello%20World!'

// Manual URL for complex text
const complexText = 'Check out: https://example.com?param=value&other=123';
const encoded = encodeURIComponent(complexText);
const url = `http://localhost:3000/api/create/text_url?text_url=${encoded}`;
```

## 📱 Mobile App Integration

### React Native
```javascript
import { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';

export default function QRGenerator() {
  const [qrUri, setQrUri] = useState(null);
  
  const generateQR = async (text) => {
    try {
      const response = await fetch(
        `http://your-server.com/api/create/text_url?text_url=${encodeURIComponent(text)}`
      );
      
      if (response.ok) {
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = () => setQrUri(reader.result);
        reader.readAsDataURL(blob);
      } else {
        const error = await response.json();
        Alert.alert('Error', error.msg);
      }
    } catch (err) {
      Alert.alert('Network Error', err.message);
    }
  };
  
  return (
    <View style={{ padding: 20 }}>
      <Button 
        title="Generate GitHub QR" 
        onPress={() => generateQR('https://github.com')} 
      />
      {qrUri && (
        <Image 
          source={{ uri: qrUri }} 
          style={{ width: 200, height: 200, marginTop: 20 }} 
        />
      )}
    </View>
  );
}
```

### Flutter/Dart
```dart
import 'dart:typed_data';
import 'package:http/http.dart' as http;

class QRGenerator {
  static const String baseUrl = 'http://localhost:3000/api/create';
  
  static Future<Uint8List?> generateQR(String type, Map<String, dynamic> data) async {
    try {
      Uri url;
      http.Response response;
      
      if (type == 'text_url' && data.length == 1) {
        // GET request
        final params = Uri(queryParameters: data.map((k, v) => MapEntry(k, v.toString())));
        url = Uri.parse('$baseUrl/$type${params.query.isNotEmpty ? '?' + params.query : ''}');
        response = await http.get(url);
      } else {
        // POST request
        url = Uri.parse('$baseUrl/$type');
        response = await http.post(
          url,
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode(data),
        );
      }
      
      if (response.statusCode == 200) {
        return response.bodyBytes;
      } else {
        print('Error: ${response.body}');
        return null;
      }
    } catch (e) {
      print('Network error: $e');
      return null;
    }
  }
}

// Usage
final qrData = await QRGenerator.generateQR('text_url', {'text_url': 'https://github.com'});
if (qrData != null) {
  // Display image using Image.memory(qrData)
}
```

---

## 🏁 Summary

This guide covers comprehensive usage of the QR Code Generator API across multiple platforms and programming languages. Each method provides flexibility for different use cases:

- **Terminal/CLI**: Perfect for automation and scripting
- **Browser**: Direct image display and download
- **JavaScript**: Frontend integration and dynamic generation
- **Python**: Server-side processing and batch operations
- **HTML**: Direct embedding and dynamic loading
- **Other Languages**: Cross-platform compatibility
- **Mobile**: Native app integration

Choose the method that best fits your application's architecture and requirements. All examples include proper error handling and demonstrate both GET and POST request patterns where applicable.