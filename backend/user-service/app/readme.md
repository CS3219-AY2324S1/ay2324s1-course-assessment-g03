# User service

Service to manage user profiles and question submissions.

## Setup

### Local

```bash
npm i
npm run dev
```

### Docker

```bash
docker build -t user-service .
docker run -p 8000:80 user-service
```

### Environment Variables

Create a `.env.development` file in the root directory of the project. A `.env.example` has been provided.
