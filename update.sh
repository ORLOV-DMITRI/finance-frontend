pm2 stop costclient && \
git merge master --ff-only && \
npm install && npm run build && \
pm2 start costclient 
