# Crane Brothers Payments

This web application enables users to make manual payments via Windcave. It is designed for seamless integration with the Windcave Hosted Payment Page and provides a simple, branded experience for Crane Brothers customers and staff.

## Features

- **Manual Payment Portal:** Users can initiate payments through a secure, Windcave-hosted payment page.
- **Automated Result Handling:** Payment results are processed and displayed to users, and successful transactions trigger notification emails to the Crane Brothers team.
- **API-Driven:** All payment and result handling is managed via dedicated API routes.

## Technologies Used

- **Next.js** – Provides the React framework with built-in server-side rendering and API routes, simplifying both frontend and backend logic in a single codebase.
- **React** – For building interactive user interfaces.
- **TypeScript** – Adds static typing to JavaScript, improving code quality and maintainability.
- **Windcave** – Used as the payment gateway for secure, PCI-compliant payment processing. [Windcave API Documentation](https://www.windcave.com/developer-e-commerce-api-rest)
- **Sendgrid** – For reliable transactional email delivery to notify staff of successful payments. [Sendgrid Documentation](https://www.twilio.com/docs/sendgrid)

## Project Structure

```
crane-brothers-payments-ts/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── create/        # /api/create – Initiates Windcave session
│   │   │   ├── result/        # /api/result – Handles Windcave FPRN webhook
│   │   │   └── session/       # /api/session – Fetches payment result
│   │   ├── result/            # /result page – Displays payment outcome
│   │   ├── layout.tsx         # App layout
│   │   └── page.tsx           # Home page
│   ├── lib/
│   │   ├── windcave.ts        # Windcave API client/helpers
│   │   └── sendgrid.ts        # Sendgrid email helpers
│   ├── types/                 # TypeScript types
│   └── utils/                 # Utility functions
├── public/                    # Static assets (logo, fonts)
├── .env                       # Environment variables (not committed)
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## API Routes

### 1. `/api/create`

- **Purpose:** Initiates a new Windcave payment session.
- **How it works:**
  - Receives payment details from the frontend.
  - Creates a session with Windcave and returns a Hosted Payment Page URL.
  - The user is redirected to this URL to complete the transaction.

### 2. `/api/result`

- **Purpose:** Notifies the backend that a payment has been completed.
- **How it works:**

  - This endpoint is called by Windcave’s FPRN (Final Payment Result Notification) webhook after a transaction is completed.
  - The webhook sends a GET request containing the `sessionId` as a query parameter.
  - The endpoint does **not** contain the transaction result itself. Instead, it uses the `sessionId` to look up the payment result from Windcave.
  - If the payment is successful (`reCo == '00'`), the API sends a result email to the Crane Brothers team using Sendgrid.
  - This ensures that staff are notified of successful payments in real time.

  **About FPRN:**  
  The FPRN (Final Payment Result Notification) is a webhook mechanism provided by Windcave. After a user completes a payment on the Hosted Payment Page, Windcave sends a GET request to this endpoint with the `sessionId`, ensuring your backend is reliably informed of all payment completions, even if the user does not return to your site.

  - [Windcave Hosted Payment Page Documentation](https://www.windcave.com/developer-redirect)
  - [Windcave FPRN Documentation](https://www.windcave.com/developer-redirect#final-payment-result-notification)

### 3. `/api/session`

- **Purpose:** Fetches the result of a payment session.
- **How it works:**
  - Used by the `/result` page, which is where users are redirected after completing payment on Windcave.
  - Returns the transaction result for display to the user.

## Result Page (`/result`)

- After payment, users are redirected to the `/result` page.
- This page fetches the transaction result via `/api/session` and displays whether the payment was approved or declined, along with transaction details.
- The transaction result is determined by checking if `reCo == '00'` (approved).

## Environment Variables

The following environment variables are required (values to be provided separately):

- `BASE_URL` – The base URL of your deployment (used for API calls)
- `WINDCAVE_MERCHANT_ID` – Windcave merchant ID
- `WINDCAVE_SECRET` – Windcave secret key
- `SENDGRID_API_KEY` – Sendgrid API key

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**  
   Create a `.env` file with the necessary credentials and settings.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## How to Test

- **Manual Testing:**

  1. Start the development server.
  2. Navigate to the home page and submit a payment.
  3. Complete the payment on the Windcave Hosted Payment Page.
  4. After payment, you should be redirected to the `/result` page, which will display the transaction outcome.
  5. If the payment is successful, check that a notification email is sent to the Crane Brothers team (requires valid Sendgrid setup).

- **API Testing:**
  - You can use tools like Postman to simulate GET requests to `/api/result` with a valid `sessionId` to test webhook handling.

## Troubleshooting / Common Issues

- **Windcave Credentials:**
  - Ensure `WINDCAVE_MERCHANT_ID` and `WINDCAVE_SECRET` are correct for the environment (sandbox vs. production).
- **Sendgrid Email Delivery:**
  - Make sure `SENDGRID_API_KEY` is valid and the sender email is verified in your Sendgrid account.
- **CORS Issues:**
  - If you encounter CORS errors, check your Next.js API route configuration and Windcave settings.
- **Webhook Not Firing:**
  - Ensure your deployment is accessible from the public internet so Windcave can reach the `/api/result` endpoint.
- **Environment Variables Not Loaded:**
  - Double-check your `.env` file and restart the server after making changes.

## Deployment

This app is built with Next.js and can be deployed to any platform that supports Node.js.
