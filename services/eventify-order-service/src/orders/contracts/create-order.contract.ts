import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductItemRequest {
  @ApiProperty({ description: 'ID of the product' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Quantity of the product' })
  @IsNotEmpty()
  count: number;

  @ApiProperty({ description: 'Price of the product' })
  @IsNotEmpty()
  price: number;
}

export class DeliveryAddressRequest {
  @ApiProperty({ description: 'Street of the delivery address' })
  street: string;

  @ApiProperty({ description: 'Number of the delivery address' })
  number: string;

  @ApiProperty({ description: 'Postal code of the delivery address' })
  postalCode: string;

  @ApiProperty({ description: 'City of the delivery address' })
  city: string;

  @ApiProperty({ description: 'State of the delivery address' })
  state: string;
}

export class CustomerRequest {
  @ApiProperty({ description: 'Customer ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'First name of the customer' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the customer' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email of the customer' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: DeliveryAddressRequest, description: 'Delivery address' })
  @Type(() => DeliveryAddressRequest)
  deliveryAddress: DeliveryAddressRequest;
}

export class PaymentRequest {
  @ApiProperty({ description: 'Card ID' })
  @IsString()
  cardId: string;

  @ApiProperty({ description: 'Card BIN' })
  @IsString()
  bin: string;

  @ApiProperty({ description: 'Card number token' })
  @IsString()
  numberToken: string;

  @ApiProperty({ description: 'Cardholder name' })
  @IsString()
  cardholderName: string;

  @ApiProperty({ description: 'Card security code' })
  @IsString()
  securityCode: string;

  @ApiProperty({ description: 'Card brand' })
  @IsString()
  brand: string;

  @ApiProperty({ description: 'Card expiration month' })
  @IsString()
  expirationMonth: string;

  @ApiProperty({ description: 'Card expiration year' })
  @IsString()
  expirationYear: string;
}

export class CreateOrderRequest {
  @ApiProperty({ type: [ProductItemRequest], description: 'List of products in the order' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemRequest)
  items: ProductItemRequest[];

  @ApiProperty({ type: CustomerRequest, description: 'Customer information' })
  @ValidateNested()
  @Type(() => CustomerRequest)
  customer: CustomerRequest;

  @ApiProperty({ type: PaymentRequest, description: 'Payment information' })
  @Type(() => PaymentRequest)
  @ValidateNested()
  payment: PaymentRequest;
}
