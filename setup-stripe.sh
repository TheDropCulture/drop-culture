#!/bin/bash
# Drop Culture Stripe Setup Helper
# Usage: bash setup-stripe.sh

echo ""
echo "========================================"
echo "  Drop Culture - Stripe Setup"
echo "========================================"
echo ""
echo "This script will update your Stripe API keys."
echo "Get your keys from: https://dashboard.stripe.com"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    exit 1
fi

read -p "Enter your Stripe Secret Key (starts with sk_test_ or sk_live_): " SECRET_KEY

if [ -z "$SECRET_KEY" ]; then
    echo "Error: No key entered. Setup cancelled."
    exit 1
fi

# Update the SECRET KEY
sed -i "s|STRIPE_SECRET_KEY=.*|STRIPE_SECRET_KEY=$SECRET_KEY|" .env

echo ""
read -p "Enter your Stripe Publishable Key (optional, press Enter to skip): " PUB_KEY
if [ ! -z "$PUB_KEY" ]; then
    sed -i "s|STRIPE_PUBLISHABLE_KEY=.*|STRIPE_PUBLISHABLE_KEY=$PUB_KEY|" .env
fi

echo ""
read -p "Enter your Stripe Webhook Secret (optional, press Enter to skip): " WEBHOOK_SECRET
if [ ! -z "$WEBHOOK_SECRET" ]; then
    sed -i "s|STRIPE_WEBHOOK_SECRET=.*|STRIPE_WEBHOOK_SECRET=$WEBHOOK_SECRET|" .env
fi

echo ""
echo "========================================"
echo "  Keys updated successfully!"
echo "========================================"
echo ""
echo "Next steps:"
echo "  1. Run: npm run build"
echo "  2. Deploy the app"
echo "  3. Test with: yoursite.com/pay/basic"
echo ""
echo "Test card: 4242 4242 4242 4242 | Any future date | Any 3-digit CVC"
echo ""
