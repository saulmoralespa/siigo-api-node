# Siigo API Node SDK

A Node.js SDK for interacting with the Siigo API.

## Features

- Authentication and token management
- CRUD operations for Products, Clients, Invoices
- Support for Taxes, Account Groups, Document Types, Payment Types, Users, Warehouses, Cost Centers, Price Lists
- Webhook subscription and management

## Installation

```bash
npm install siigo-api-node
# or
pnpm add siigo-api-node
```

## Environment Variables

Create file .env
```bash
touch .env
```

Add variables
- SIIGO_USERNAME=your_siigo_username
- SIIGO_ACCESS_KEY=your_siigo_access_key

## Usage

```typescript
import { Siigo } from "siigo-api-node";

const siigo = new Siigo({
  username: process.env.SIIGO_USERNAME!,
  access_key: process.env.SIIGO_ACCESS_KEY!
});

// Example: Get products
(async () => {
  const products = await siigo.getProducts();
  console.log(products);
})();
```

## Available Methods

- Authentication: `getToken()`
- Products: `createProduct(payload)`, `getProducts(queries?)`, `updateProduct(id, payload)`, `deleteProduct(id)`
- Clients: `createClient(payload)`, `getClients(queries?)`, `getClientById(id)`, `updateClient(id, payload)`
- Users: `getUsers()`
- Invoices: `createInvoice(payload)`, `getInvoiceById(id)`, `updateInvoice(id, payload)`, `getPdfInvoiceById(id)`, `getErrorsInvoiceRejected(id)`, `deteleteInvoice(id)`, `annulInvoice(id)`
- Taxes: `getTaxes()`
- Account Groups: `getAccountGroups()`
- Document Types: `getDocumentTypes(queries?)`
- Payment Types: `getPaymentTypes(queries?)`
- Price Lists: `getPriceList()`
- Warehouses: `getWarehouses()`
- Cost Centers: `getCostCenter()`
- Webhooks: `subscribeWebhook(payload)`, `editWebhook(payload)`, `getWebhook()`, `deleteWebhook(id)`

## Testing

Run all tests with:

```bash
pnpm test
```

## License

[MIT](https://opensource.org/licenses/MIT)

---

For more details, see the [Siigo API documentation](https://siigoapi.docs.apiary.io/#reference).


