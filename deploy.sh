SSH_KEY_PATH="login.pub"
SERVER="discord@10.0.0.90"

echo "Deploying"
ssh -i $SSH_KEY_PATH $SERVER 'bash -i'  <<-'ENDSSH'
    cd ohowebot
    git pull
    pm2 stop ohowebot
    rm -rf node_modules
    npm install
    npm run clean
    npm run build:ts
    pm2 start ohowebot
    pm2 save
    exit
ENDSSH
echo "Done"