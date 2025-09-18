## Types of Qrcode formats

1. VCard
>
    BEGIN:VCARD
    VERSION:3.0
    N:Doe;John;;;
    FN:John Doe
    ORG:Example Inc.
    TITLE:Developer
    TEL;TYPE=cell:+1234567890
    TEL;TYPE=work:+0987654321
    EMAIL:john@example.com
    URL:https://example.com
    ADR:;;123 Main St;City;State;12345;Country
    END:VCARD
---
2. MeCard
>
    MECARD:N:Doe,John;TEL:+1234567890;EMAIL:john@example.com;ADR:123 Main St,City;URL:https://example.com;;
---
3. Wifi
> 
    WIFI:T:WPA;S:MyNetwork;P:mypassword;;
---
4. email
> 
    mailto:someone@example.com?subject=Hello&body=This%20is%20a%20test
---
5. sms
>
    SMSTO:+1234567890:Hello, this is a test message
---
6. telephone
>
    TEL:+1234567890
---
6. geo location
>
    geo:37.7749,-122.4194?q=San+Francisco
---
7. event calendar
>
    BEGIN:VEVENT
    SUMMARY:Meeting with Client
    DTSTART:20250918T090000Z
    DTEND:20250918T100000Z
    LOCATION:Office
    DESCRIPTION:Project discussion
    END:VEVENT
---
8. bitcoin
>
    bitcoin:1BoatSLRHtKNngkdXEeobR76b53LETtpyT?amount=0.01&label=Donation&message=Thanks
---
9. text_url
>
    "sample text" / "http://domain.com"
10. UPI
>
    upi://pay?pa=<VPA>&pn=<Name>&am=<Amount>&cu=INR&tn=<Note>