# API Usage Examples

This document shows how to use the QR Code Generator API in various ways: directly in HTML, with `curl`, and from different programming languages. Both GET (query params) and POST (JSON body) methods are demonstrated.

---

## 1. Using in HTML `<img>` Tags

You can embed generated QR codes directly in your web pages:

```html
<!-- Example: vCard QR code -->
<img src="https://encode-9qc6.onrender.com/api/create/vcard?firstName=John&lastName=Doe&email=john@example.com" alt="vCard QR" />

<!-- Example: Text/URL QR code with custom colors -->
<img src="https://encode-9qc6.onrender.com/api/create/text_url?text_url=Hello%20World&fg=%23000000&bg=%23ffffff" alt="Text QR" />
```

---

## 2. Using `curl`

### GET (Query Parameters)

```sh
curl "https://encode-9qc6.onrender.com/api/create/text_url?text_url=Hello%20World"
```

### POST (JSON Body)

```sh
curl -X POST "https://encode-9qc6.onrender.com/api/create/wifi" \
  -H "Content-Type: application/json" \
  -d '{"type":"WPA","ssid":"MyNetwork","password":"mypassword"}'
```

---

## 3. Using Different Programming Languages

### JavaScript (Node.js, GET)

```js
const fetch = require('node-fetch');
fetch('https://encode-9qc6.onrender.com/api/create/text_url?text_url=Hello%20World')
  .then(res => res.arrayBuffer())
  .then(buf => require('fs').writeFileSync('qr.png', Buffer.from(buf)));
```

### JavaScript (Node.js, POST)

```js
const fetch = require('node-fetch');
fetch('https://encode-9qc6.onrender.com/api/create/wifi', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'WPA', ssid: 'MyNetwork', password: 'mypassword' })
})
  .then(res => res.arrayBuffer())
  .then(buf => require('fs').writeFileSync('wifi-qr.png', Buffer.from(buf)));
```

---

### Python (GET)

```python
import requests
response = requests.get('https://encode-9qc6.onrender.com/api/create/text_url', params={'text_url': 'Hello World'})
with open('qr.png', 'wb') as f:
    f.write(response.content)
```

### Python (POST)

```python
import requests
data = {"type": "WPA", "ssid": "MyNetwork", "password": "mypassword"}
response = requests.post('https://encode-9qc6.onrender.com/api/create/wifi', json=data)
with open('wifi-qr.png', 'wb') as f:
    f.write(response.content)
```

---

### Java (GET)

```java
import java.io.*;
import java.net.*;
public class QRGet {
    public static void main(String[] args) throws Exception {
        URL url = new URL("https://encode-9qc6.onrender.com/api/create/text_url?text_url=Hello%20World");
        InputStream in = url.openStream();
        FileOutputStream out = new FileOutputStream("qr.png");
        byte[] buf = new byte[4096];
        int n;
        while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
        in.close(); out.close();
    }
}
```

### Java (POST)

```java
import java.io.*;
import java.net.*;
public class QRPost {
    public static void main(String[] args) throws Exception {
        URL url = new URL("https://encode-9qc6.onrender.com/api/create/wifi");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);
        String json = "{\"type\":\"WPA\",\"ssid\":\"MyNetwork\",\"password\":\"mypassword\"}";
        try (OutputStream os = conn.getOutputStream()) {
            os.write(json.getBytes());
        }
        try (InputStream in = conn.getInputStream();
             FileOutputStream out = new FileOutputStream("wifi-qr.png")) {
            byte[] buf = new byte[4096];
            int n;
            while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
        }
    }
}
```

---

### C# (.NET, GET)

```csharp
using System.Net.Http;
using System.IO;
var client = new HttpClient();
var bytes = await client.GetByteArrayAsync("https://encode-9qc6.onrender.com/api/create/text_url?text_url=Hello%20World");
File.WriteAllBytes("qr.png", bytes);
```

### C# (.NET, POST)

```csharp
using System.Net.Http;
using System.Text;
using System.IO;
var client = new HttpClient();
var content = new StringContent("{\"type\":\"WPA\",\"ssid\":\"MyNetwork\",\"password\":\"mypassword\"}", Encoding.UTF8, "application/json");
var bytes = await client.PostAsync("https://encode-9qc6.onrender.com/api/create/wifi", content).Result.Content.ReadAsByteArrayAsync();
File.WriteAllBytes("wifi-qr.png", bytes);
```

---

## Notes

- Replace `localhost:8000` with your server's address if deployed elsewhere.
- The API returns PNG images by default.
- For more format examples, see `formatsExample.md`.

---