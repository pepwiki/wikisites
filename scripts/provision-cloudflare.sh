#!/bin/bash
# Cloudflare Resource Provisioning Script
# Run this after updating your API token to include D1 permissions
# Token needs: D1 Edit, KV Edit, Workers Secrets

set -euo pipefail

echo "=== Wikisites Cloudflare Provisioning ==="
echo ""

# Check if wrangler is authenticated
echo "1. Checking wrangler authentication..."
if ! bunx wrangler whoami > /dev/null 2>&1; then
  echo "ERROR: Not authenticated. Run: bunx wrangler login"
  exit 1
fi
echo "   OK: Authenticated"
echo ""

# Create D1 database
echo "2. Creating D1 database..."
D1_OUTPUT=$(bunx wrangler d1 create wikisites-db 2>&1) || {
  echo "ERROR: D1 creation failed. Ensure your API token has D1 Edit permission."
  echo "   Go to: https://dash.cloudflare.com/profile/api-tokens"
  echo "   Add permission: D1 > Edit"
  exit 1
}
D1_ID=$(echo "$D1_OUTPUT" | grep -oP 'database_id = "\K[^"]+')
echo "   OK: D1 database created (ID: $D1_ID)"
echo ""

# Run migrations
echo "3. Running D1 migrations..."
bunx wrangler d1 migrations apply wikisites-db --remote 2>&1
echo "   OK: Migrations applied"
echo ""

# Create KV namespace for cache
echo "4. Creating KV namespace (CACHE)..."
KV_CACHE_OUTPUT=$(bunx wrangler kv namespace create CACHE 2>&1)
KV_CACHE_ID=$(echo "$KV_CACHE_OUTPUT" | grep -oP 'id = "\K[^"]+')
echo "   OK: KV CACHE created (ID: $KV_CACHE_ID)"
echo ""

# Create KV namespace for push subscriptions
echo "5. Creating KV namespace (PUSH_SUBSCRIPTIONS)..."
KV_PUSH_OUTPUT=$(bunx wrangler kv namespace create PUSH_SUBSCRIPTIONS 2>&1)
KV_PUSH_ID=$(echo "$KV_PUSH_OUTPUT" | grep -oP 'id = "\K[^"]+')
echo "   OK: KV PUSH_SUBSCRIPTIONS created (ID: $KV_PUSH_ID)"
echo ""

# Generate JWT secret
echo "6. Generating JWT secret..."
JWT_SECRET=$(openssl rand -hex 32)
echo "   Generated: ${JWT_SECRET:0:8}...${JWT_SECRET: -8}"
echo ""

# Set JWT secret
echo "7. Setting JWT_SECRET..."
echo "$JWT_SECRET" | bunx wrangler secret put JWT_SECRET 2>&1
echo "   OK: JWT_SECRET set"
echo ""

# Update wrangler.toml with real IDs
echo "8. Updating wrangler.toml..."
sed -i "s|# id = \"<FILL_IN_AFTER_PROVISION>\"|id = \"$KV_CACHE_ID\"|" wrangler.toml
sed -i "s|# database_id = \"<FILL_IN_AFTER_PROVISION>\"|database_id = \"$D1_ID\"|" wrangler.toml
sed -i "s|# id = \"<FILL_IN_AFTER_PROVISION>\"|id = \"$KV_PUSH_ID\"|" wrangler.toml
echo "   OK: wrangler.toml updated"
echo ""

echo "=== Provisioning Complete ==="
echo ""
echo "Resource IDs:"
echo "  D1 Database:       $D1_ID"
echo "  KV CACHE:          $KV_CACHE_ID"
echo "  KV PUSH_SUBSCRIPTIONS: $KV_PUSH_ID"
echo "  JWT Secret:        ${JWT_SECRET:0:8}..."
echo ""
echo "Next step: bunx wrangler deploy"
