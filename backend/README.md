# Backend

This backend handles activation requests for the Vue frontend.

## Run

Use the environment variables from the root `.env.example`, then start the app from this folder:

```bash
mvn spring-boot:run
```

## Endpoints

- `POST /api/activation/check`
- `POST /api/activation/redeem`
