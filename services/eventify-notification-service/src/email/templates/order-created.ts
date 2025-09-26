export function generateOrderCreatedEmail(userName: string, orderId: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Created</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
      }
      .header h1 {
        color: #333333;
      }
      .content {
        font-size: 16px;
        color: #555555;
        line-height: 1.5;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #999999;
        text-align: center;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Eventify</h1>
      </div>
      <div class="content">
        <p>Hello ${userName},</p>
        <p>We are excited to inform you that your order <strong>#${orderId}</strong> has been successfully created!</p>
        <p>You can check the details of your order in your Eventify account.</p>
        <a class="btn" href="https://eventify.com/orders/${orderId}">View My Order</a>
        <p>Thank you for using Eventify. We hope you enjoy our platform!</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Eventify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}
