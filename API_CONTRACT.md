# API_CONTRACT.md

## Auth
- **POST** `/api/auth/signup`
  - Body: `{ name, email, password }`
  - Returns: `{ token, user: { id, name, email, role } }`
- **POST** `/api/auth/login`
  - Body: `{ email, password }`
  - Returns: `{ token, user: { id, name, email, role } }`
- **GET** `/api/auth/me`
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ user: { id, name, email, role, createdAt } }`

## Floors & Tables
- **GET** `/api/floors`
  - Returns: `Array<{ id, name, tables: Array<Table> }>`
- **POST** `/api/floors`
  - Body: `{ name }`
  - Returns: `Floor`
- **POST** `/api/tables`
  - Body: `{ floorId, tableNumber, seats }`
  - Returns: `Table`
- **PUT** `/api/tables/[id]/status`
  - Body: `{ status: "EMPTY" | "OCCUPIED" | "SENT_TO_KITCHEN" | "WAITING_PAYMENT" }`
  - Returns: `Table`
