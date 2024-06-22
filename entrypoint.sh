if [ -z "${API_BASE_URL-}" ]; then
   echo "API_BASE_URL is missing. Exiting...."
   exit 1
fi

find /app/frontend/.output/public -type f -exec sed -i -e "s|ENV_API_BASE_URL|$API_BASE_URL|g" {} \;

concurrently "cd /app/backend && NODE_ENV=production yarn start" "cd /app/frontend && http-server .output/public"