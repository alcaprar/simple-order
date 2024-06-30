if [ -z "${API_BASE_URL-}" ]; then
   echo "API_BASE_URL is missing. Exiting...."
   exit 1
fi


concurrently "cd /home/app/backend && NODE_ENV=production yarn start" "cd /home/app/frontend && NUXT_PUBLIC_API_BASE_URL=$API_BASE_URL node .output/server/index.mjs"