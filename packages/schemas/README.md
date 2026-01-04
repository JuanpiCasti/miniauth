# schemas

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.4. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

Start db:

```bash
docker run --name miniauth-dev-db \                                                                                                      17:49:52
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -v miniauth-dev:/var/lib/postgresql/data \
  -d postgres
  ```