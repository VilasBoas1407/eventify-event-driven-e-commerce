import { Injectable } from '@nestjs/common';
import type { OrderCreatedEvent } from '@vilasboas1407/kafka';
import { EmailService } from 'src/email/services/email.service';
import { generateOrderCreatedEmail } from 'src/email/templates/order-created';
@Injectable()
export class HandleOrderCreatedUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(message: OrderCreatedEvent): Promise<void> {
    try {
      console.log('Order Created Event Received:', message);
      const { customerEmail, customerName, orderId } = message;
      await this.sendOrderCreatedEmail(customerEmail, customerName, orderId);
      console.log('Order Created Email Sent to:', customerEmail);
    } catch (error) {
      console.error('Error handling Order Created Event:', error);
    }
  }

  async sendOrderCreatedEmail(
    customerEmail: string,
    customerName: string,
    orderId: string,
  ) {
    const html = generateOrderCreatedEmail(customerName, orderId);

    await this.emailService.sendMail(
      customerEmail,
      'Your Order Has Been Created!',
      `Hello ${customerName}, your order #${orderId} has been created.`,
      html,
    );
  }
}
