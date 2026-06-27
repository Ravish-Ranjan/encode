const formConfigs = {
	text_url: [
		{
			name: "text_url",
			label: "Text / URL",
			type: "text",
			placeholder: "Enter text or URL",
			value: "https://encode.ravishdev.org",
			required: true,
		},
	],
	vcard: [
		{
			name: "firstName",
			label: "First Name",
			type: "text",
			value: "John",
			required: true,
		},
		{
			name: "lastName",
			label: "Last Name",
			type: "text",
			value: "Doe",
		},
		{
			name: "orgName",
			label: "Organization",
			type: "text",
			value: "Example Inc",
		},
		{
			name: "title",
			label: "Title",
			type: "text",
			value: "Developer",
		},
		{
			name: "telephoneCell",
			label: "Telephone Cell",
			type: "tel",
			value: "+9876543210",
		},
		{
			name: "telephoneWork",
			label: "Telephone Work",
			type: "tel",
			value: "+1234567890",
		},
		{
			name: "email",
			label: "Email",
			type: "email",
			value: "john@example.com",
		},
		{
			name: "url",
			label: "Website",
			type: "url",
			value: "https://example.com",
		},
		{
			name: "address",
			label: "Address",
			type: "text",
			value: "House no. 4, ABC, Delhi, India",
		},
	],
	mecard: [
		{
			name: "name",
			label: "Name",
			type: "text",
			value: "John Doe",
			required: true,
		},
		{
			name: "telephone",
			label: "Phone",
			type: "tel",
			value: "+1234567890",
		},
		{
			name: "email",
			label: "Email",
			type: "email",
			value: "john@example.com",
		},
		{
			name: "address",
			label: "Address",
			type: "text",
			value: "House no. 4, ABC, Delhi, India",
		},
		{
			name: "url",
			label: "Website",
			type: "url",
			value: "https://example.com",
		},
	],
	wifi: [
		{
			name: "type",
			label: "Security Type",
			type: "select",
			options: ["WPA", "WEP", "nopass"],
			value: "WPA",
			required: true,
		},
		{
			name: "ssid",
			label: "Network Name (SSID)",
			type: "text",
			value: "MyNetwork",
			required: true,
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			value: "mypassword",
		},
	],
	email: [
		{
			name: "email",
			label: "Email Address",
			type: "email",
			value: "someone@example.com",
			required: true,
		},
		{
			name: "subject",
			label: "Subject",
			type: "text",
			value: "Hello",
		},
		{
			name: "body",
			label: "Message Body",
			type: "textarea",
			value: "This is a test",
		},
	],
	sms: [
		{
			name: "to",
			label: "Phone Number",
			type: "tel",
			value: "+1234567890",
			required: true,
		},
		{
			name: "message",
			label: "Message",
			type: "textarea",
			value: "Hello, this is a test message",
		},
	],
	telephone: [
		{
			name: "telephone",
			label: "Phone Number",
			type: "tel",
			value: "+1234567890",
			required: true,
		},
	],
	geo_location: [
		{
			name: "latitude",
			label: "Latitude",
			type: "number",
			step: "0.0001",
			value: 28.6090549,
			required: true,
		},
		{
			name: "longitude",
			label: "Longitude",
			type: "number",
			step: "0.0001",
			value: 77.2123052,
			required: true,
		},
		{
			name: "label",
			label: "Location Name",
			type: "text",
			value: "India Gate",
		}, // Renamed from 'query'
	],
	calendar_event: [
		{
			name: "summary",
			label: "Event Title",
			type: "text",
			value: "Meeting with Client",
			required: true,
		},
		{
			name: "dateStart",
			label: "Start Time",
			type: "datetime-local",
			value: "2026-09-18T09:00",
		}, // Renamed from 'startTime'
		{
			name: "dateEnd",
			label: "End Time",
			type: "datetime-local",
			value: "2026-09-18T10:00",
		}, // Renamed from 'endTime'
		{
			name: "location",
			label: "Location",
			type: "text",
			value: "Office",
		},
		{
			name: "description",
			label: "Description",
			type: "textarea",
			value: "Project discussion",
		},
	],
	bitcoin: [
		// Renamed from 'bitcoin' to match type BitCoin
		{
			name: "address",
			label: "Wallet Address",
			type: "text",
			value: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
			required: true,
		},
		{
			name: "amount",
			label: "Amount (BTC)",
			type: "number",
			step: "0.00000001",
			value: 0.01,
		},
		{
			name: "label",
			label: "Label",
			type: "text",
			value: "Donation",
		},
		{
			name: "message",
			label: "Message",
			type: "text",
			value: "Thanks",
		},
	],
	upi: [
		{
			name: "upi_id",
			label: "UPI Address",
			type: "text",
			placeholder: "user@bank",
			value: "name@bankname",
			required: true,
		}, // Renamed from 'vpa'
		{
			name: "amount",
			label: "Amount (INR)",
			type: "number",
			value: 0,
			required: true,
		},
		{
			name: "name",
			label: "Payee Name",
			type: "text",
			value: "Ravish Ranjan",
		}, // Renamed from 'payeeName'
		{
			name: "currency",
			label: "Currency",
			type: "text",
			value: "INR",
		}, // Added to match Upi type
		{
			name: "note",
			label: "Note",
			type: "text",
			value: "Payment",
		},
	],
};

const integrationSnippets = {
	"curl-get": `curl "https://encode.ravishdev.org/api/create/text_url?text_url=Hello%20World"`,
	"curl-post": `curl -X POST "https://encode.ravishdev.org/api/create/wifi" \\\n  -H "Content-Type: application/json" \\\n  -d '{"type":"WPA","ssid":"MyNetwork","password":"mypassword"}'`,
	"js-get": `const fetch = require("node-fetch");\nfetch("https://encode.ravishdev.org/api/create/text_url?text_url=Hello%20World")\n\t.then((res) => res.arrayBuffer())\n\t.then((buf) => require("fs").writeFileSync("qr.png", Buffer.from(buf)));`,
	"js-post": `const fetch = require("node-fetch");\nfetch("https://encode.ravishdev.org/api/create/wifi", {\n\tmethod: "POST",\n\theaders: { "Content-Type": "application/json" },\n\tbody: JSON.stringify({\n\t\ttype: "WPA",\n\t\tssid: "MyNetwork",\n\t\tpassword: "mypassword",\n\t}),\n})\n\t.then((res) => res.arrayBuffer())\n\t.then((buf) =>\n\t\trequire("fs").writeFileSync("wifi-qr.png", Buffer.from(buf)),\n\t);`,
	"python-get": `import requests\nresponse = requests.get('https://encode.ravishdev.org/api/create/text_url', params={'text_url': 'Hello World'})\nwith open('qr.png', 'wb') as f:\n    f.write(response.content)`,
	"python-post": `import requests\ndata = {"type": "WPA", "ssid": "MyNetwork", "password": "mypassword"}\nresponse = requests.post('https://encode.ravishdev.org/api/create/wifi', json=data)\nwith open('wifi-qr.png', 'wb') as f:\n    f.write(response.content)`,
	"java-get": `import java.io.*;\nimport java.net.*;\npublic class QRGet {\n    public static void main(String[] args) throws Exception {\n        URL url = new URL("https://encode.ravishdev.org/api/create/text_url?text_url=Hello%20World");\n        InputStream in = url.openStream();\n        FileOutputStream out = new FileOutputStream("qr.png");\n        byte[] buf = new byte[4096];\n        int n;\n        while ((n = in.read(buf)) > 0) out.write(buf, 0, n);\n        in.close(); out.close();\n    } \n}`,
	"java-post": `import java.io.*;\nimport java.net.*;\npublic class QRPost {\n    public static void main(String[] args) throws Exception {\n        URL url = new URL("https://encode.ravishdev.org/api/create/wifi");\n        HttpURLConnection conn = (HttpURLConnection) url.openConnection();\n        conn.setRequestMethod("POST");\n        conn.setRequestProperty("Content-Type", "application/json");\n        conn.setDoOutput(true);\n        String json = "{\\"type\\":\\"WPA\\",\\"ssid\\":\\"MyNetwork\\",\\"password\\":\\"mypassword\\"}";\n        try (OutputStream os = conn.getOutputStream()) {\n            os.write(json.getBytes());\n        }\n        try (InputStream in = conn.getInputStream();\n             FileOutputStream out = new FileOutputStream("wifi-qr.png")) {\n            byte[] buf = new byte[4096];\n            int n;\n            while ((n = in.read(buf)) > 0) out.write(buf, 0, n);\n        }\n    }\n}`,
	"csharp-get": `using System.Net.Http;\nusing System.IO;\nvar client = new HttpClient();\nvar bytes = await client.GetByteArrayAsync("https://encode.ravishdev.org/api/create/text_url?text_url=Hello%20World");\nFile.WriteAllBytes("qr.png", bytes);`,
	"csharp-post": `using System.Net.Http;\nusing System.Text;\nusing System.IO;\nvar client = new HttpClient();\nvar content = new StringContent("{\\"type\\":\\"WPA\\",\\"ssid\\":\\"MyNetwork\\",\\"password\\":\\"mypassword\\"}", Encoding.UTF8, "application/json");\nvar bytes = await client.PostAsync("https://encode.ravishdev.org/api/create/wifi", content).Result.Content.ReadAsByteArrayAsync();\nFile.WriteAllBytes("wifi-qr.png", bytes);`,
};

let currentType = "text_url";
const baseUrl = "https://encode.ravishdev.org";
let qrUrl = ""

function renderFormFields() {
	const container = document.getElementById("form-fields");
	const config = formConfigs[currentType];

	container.innerHTML = config
		.map((field) => {
			// Clean up the required condition since it's now a true boolean in config
			const isRequired = field.required === true;
			const requiredAttr = isRequired ? "required" : "";
			const asteriskHtml = `<span class="${isRequired ? "text-red-500 font-mono" : "hidden"}">*</span>`;

			if (field.type === "select") {
				return `
                <div class="space-y-sm">
                  <label class="block font-label-caps text-label-caps text-on-surface-variant">${field.label} ${asteriskHtml}</label>
                  <select name="${field.name}" ${requiredAttr} class="w-full bg-surface border border-border-muted rounded-DEFAULT px-sm py-xs font-code-sm text-code-sm text-on-surface focus:border-primary focus:outline-none">
                    ${field.options.map((opt) => `<option value="${opt}" ${opt === field.value ? "selected" : ""}>${opt}</option>`).join("")}
                  </select>
                </div>
              `;
			} else if (field.type === "textarea") {
				return `
                <div class="space-y-sm">
                  <label class="block font-label-caps text-label-caps text-on-surface-variant">${field.label} ${asteriskHtml}</label>
                  <textarea name="${field.name}" ${requiredAttr} class="w-full bg-surface border border-border-muted rounded-DEFAULT px-sm py-xs font-code-sm text-code-sm text-on-surface focus:border-primary focus:outline-none" rows="3">${field.value}</textarea>
                </div>
              `;
			} else if (field.type === "datetime-local") {
				return `
                <div class="space-y-sm">
                  <label class="block font-label-caps text-label-caps text-on-surface-variant">${field.label} ${asteriskHtml}</label>
                  <input type="datetime-local" name="${field.name}" ${requiredAttr} value="${field.value} " class="w-full bg-surface border border-border-muted rounded-DEFAULT px-sm py-xs font-code-sm text-code-sm text-on-surface focus:border-primary focus:outline-none" />
                </div>
              `;
			}

			return `
              <div class="space-y-sm">
                <label class="block font-label-caps text-label-caps text-on-surface-variant">${field.label} ${asteriskHtml}</label>
                <input type="${field.type}" name="${field.name}" ${field.step ? `step="${field.step}"` : ""} placeholder="${field.placeholder || ""}" ${requiredAttr} value="${field.value}" class="w-full bg-surface border border-border-muted rounded-DEFAULT px-sm py-xs font-code-sm text-code-sm text-on-surface focus:border-primary focus:outline-none" />
              </div>
            `;
		})
		.join("");

	document
		.querySelectorAll(
			"#form-fields input, #form-fields select, #form-fields textarea",
		)
		.forEach((el) => {
			el.addEventListener("change", generateQR);
			el.addEventListener("input", generateQR);
		});
}

function generateQR() {
	const fields = document.querySelectorAll(
		"#form-fields input, #form-fields select, #form-fields textarea",
	);
	const fgColor = document.getElementById("fg-text").value || "000000";
	const bgColor = document.getElementById("bg-text").value || "ffffff";

	const params = new URLSearchParams();
	params.append("fg", "#" + fgColor);
	params.append("bg", "#" + bgColor);

	fields.forEach((field) => {
		if (field.value) {
			params.append(field.name, field.value);
		}
	});

	const url = `${baseUrl}/api/create/${currentType}?${params.toString()}`;
    document.getElementById("live-demo-url").innerText = url.trim();
    qrUrl = url.trim();
	document.getElementById("qr-preview").src = url;
}

function updateColorInputs(pickerId, textId) {
	const picker = document.getElementById(pickerId);
	const text = document.getElementById(textId);

	picker.addEventListener("change", (e) => {
		const hex = e.target.value.slice(1);
		text.value = hex;
		generateQR();
	});

	text.addEventListener("change", (e) => {
		let val = e.target.value.replace("#", "");
		if (val.length === 6) {
			picker.value = "#" + val;
			generateQR();
		}
	});
}

document.getElementById("type-tabs").addEventListener("click", (e) => {
	const button = e.target.closest("button");
	if (button && button.dataset.type) {
		currentType = button.dataset.type;
		document.querySelectorAll("#type-tabs button").forEach((btn) => {
			btn.classList.remove(
				"border-primary",
				"text-primary",
				"border-b-2",
				"animate-pulse",
			);
			btn.classList.add(
				"text-on-surface-variant",
				"hover:text-on-surface",
			);
		});
		button.classList.add("border-b-2", "border-primary", "text-primary");
		button.classList.remove(
			"text-on-surface-variant",
			"hover:text-on-surface",
		);
		renderFormFields();
		generateQR();
	}
});

const codeBlock = document.getElementById("integration-code");

let codeContent = 'curl "https://encode.ravishdev.org/api/create/text_url?text_url=Hello%20World';
document.getElementById("integration-tabs").addEventListener("click", (e) => {
	const button = e.target.closest("button");
	if (button && button.dataset.lang) {
		const lang = button.dataset.lang;
		document.querySelectorAll("#integration-tabs button").forEach((btn) => {
			btn.classList.remove("border-b-2", "border-primary", "text-white");
			btn.classList.add(
				"text-outline-variant",
				"text-white/70",
				"hover:text-white",
			);
		});
		button.classList.add("border-b-2", "border-primary", "text-white");
		button.classList.remove(
			"text-outline-variant",
			"text-white/70",
			"hover:text-white",
		);

		if (integrationSnippets[lang]) {
			codeBlock.textContent = integrationSnippets[lang];
			codeContent = integrationSnippets[lang];
		}
	}
});

document.getElementById("copy-url").addEventListener("click",async function(e) {
    try {
        await navigator.clipboard.writeText(qrUrl);
        window.alert('URL copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
});

document.getElementById("copy-integration").addEventListener("click",async function(e) {
    try {
        await navigator.clipboard.writeText(codeContent);
        window.alert('Code copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy code: ', err);
    }
});

updateColorInputs("fg-color", "fg-text");
updateColorInputs("bg-color", "bg-text");
renderFormFields();
generateQR();

codeBlock.textContent = integrationSnippets["curl-get"];
