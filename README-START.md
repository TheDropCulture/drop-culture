# Drop Culture — Quick Start

## Step 1: Install Node.js
- Go to https://nodejs.org
- Download the LTS version (green button)
- Install it (click Next, Next, Next)

## Step 2: Open Terminal
- **Mac**: Press Cmd+Space, type "Terminal", press Enter
- **Windows**: Press Windows key, type "cmd", press Enter

## Step 3: Navigate to this folder
```bash
cd Downloads/drop-culture
```
(Or wherever you unzipped it)

## Step 4: Install dependencies
```bash
npm install
```
Wait 1-2 minutes.

## Step 5: Start the app
```bash
npm run dev
```

## Step 6: Open your browser
Go to: http://localhost:3000

## Test Card (fake money)
- Number: 4242 4242 4242 4242
- Date: 12/30
- CVC: 123

## Shareable Payment Links (works immediately)
- http://localhost:3000/pay/basic ($10)
- http://localhost:3000/pay/premium ($25)
- http://localhost:3000/pay/deluxe ($50)

## Admin Dashboard
- http://localhost:3000/admin

## To go live later
1. Buy TheDropCulture.com
2. Email me the domain
3. I'll give you 2 DNS records to add
4. Switch Stripe key from test to live in .env
5. Done
