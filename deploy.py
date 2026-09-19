import json, hashlib, urllib.request, urllib.error, os, sys

token = os.environ.get("CLOUDFLARE_API_TOKEN", "").strip()
if not token:
    # Read from .env
    with open("C:/dev/hermes/base_server/.env") as f:
        for line in f:
            if line.startswith("CLOUDFLARE_API_TOKEN="):
                token = line.split("=", 1)[1].strip()
                break

print(f"Token: {token[:4]}...{token[-4:]} ({len(token)} chars)")

# Read file
with open('C:/dev/hermes/base_server/index.html', 'rb') as f:
    content = f.read()
    file_hash = hashlib.sha256(content).hexdigest()
    size = len(content)

url = "https://api.cloudflare.com/client/v4/accounts/8c85e2fc256c0ea2b75624d77f766dbc/pages/projects/worldwidemultivision/deployments"
body = json.dumps({"manifest": {"/index.html": {"hash": file_hash, "size": size}}}).encode('utf-8')

req = urllib.request.Request(url, data=body, method='POST')
req.add_header('Authorization', f'Bearer {token}')
req.add_header('Content-Type', 'application/json')

try:
    with urllib.request.urlopen(req) as resp:
        response = json.loads(resp.read())
        print(json.dumps(response, indent=2))
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}: {e.read().decode()}")
except Exception as e:
    print(f"Error: {e}")