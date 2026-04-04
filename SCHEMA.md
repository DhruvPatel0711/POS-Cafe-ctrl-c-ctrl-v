# SCHEMA.md

## Core Models

### User
- `id`: UUID (Primary Key)
- `name`: String
- `email`: String (Unique)
- `passwordHash`: String
- `role`: Enum (ADMIN, CASHIER)
- `createdAt`: DateTime

### Floor
- `id`: UUID (Primary Key)
- `name`: String
- `tables`: Array of Tables (One-to-Many)

### Table
- `id`: UUID (Primary Key)
- `floorId`: UUID (Foreign Key)
- `tableNumber`: String
- `seats`: Integer
- `status`: Enum (EMPTY, OCCUPIED, SENT_TO_KITCHEN, WAITING_PAYMENT)
- `active`: Boolean

### Session
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key)
- `openedAt`: DateTime
- `closedAt`: DateTime?
- `totalSales`: Float

### Order
- `id`: UUID (Primary Key)
- `sessionId`: UUID (Foreign Key)
- `tableId`: UUID (Foreign Key)
- `status`: Enum (DRAFT, SENT_TO_KITCHEN, COMPLETED, PAID)
- `orderNumber`: String (Unique)
- `source`: Enum (CASHIER, SELF_ORDER)

### OrderItem
- `id`: UUID (Primary Key)
- `orderId`: UUID (Foreign Key)
- `productId`: UUID (Foreign Key)
- `quantity`: Integer
- `unitPrice`: Float
- `kitchenStatus`: Enum (TO_COOK, PREPARING, COMPLETED)

### Product
- `id`: UUID (Primary Key)
- `name`: String
- `category`: String
- `price`: Float
- `unit`: String
- `tax`: Float
- `active`: Boolean
- `variants`: Array of ProductVariants

### Payment
- `id`: UUID (Primary Key)
- `orderId`: UUID (Foreign Key, Unique)
- `method`: Enum (CASH, DIGITAL, UPI)
- `amount`: Float
- `paidAt`: DateTime
