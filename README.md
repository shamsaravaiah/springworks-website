# springworks-website

Mody Spring Works site clone with an AI chatbot (temporary session memory + Azure chat completions).

## Local setup

```bash
git clone https://github.com/shamsaravaiah/springworks-website.git
cd springworks-website
npm install
cp .env.example .env
# edit .env with your AZURE_API_KEY and AZURE_MODEL
npm start
```

Open http://localhost:3000

```env
PORT=3000
AZURE_ENDPOINT=https://senseijay10-3619-resource.services.ai.azure.com/openai/v1/chat/completions
AZURE_API_KEY=your_key_here
AZURE_MODEL=DeepSeek-V4-Pro
```

## Deploy on a cheap Azure VM (clone instead of copy)

On the VM (Ubuntu):

```bash
sudo apt update
sudo apt install -y nginx git
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm i -g pm2

git clone https://github.com/shamsaravaiah/springworks-website.git
cd springworks-website
npm install --omit=dev
cp .env.example .env
nano .env   # add real AZURE_API_KEY + AZURE_MODEL

pm2 start server.js --name msw
pm2 save
pm2 startup
```

Nginx (`/etc/nginx/sites-available/default`):

```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
sudo nginx -t && sudo systemctl restart nginx
```

Open `http://YOUR_VM_PUBLIC_IP`

## Notes

- `.env` is gitignored — create it on the VM after cloning
- Chatbot memory lasts for the browser/server session only
