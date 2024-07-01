# Localgems

## Local development

From the root of the project, it will start both backend and frontend:

```bash
npm run dev
```

Local strapi admin user:

- admin@project.it
- Qwerty1234!

Local shop user:

- test@project.it
- Qwerty1234!

## Docker

To build:

```bash
docker build -t localgems .
```

To run:

```bash
docker run -p 1337:1337 -p 8080:8080 -e API_BASE_URL=http://localhost:1337 localgems
```

Using `docker compose`:

```bash
docker-compose up --build
```
