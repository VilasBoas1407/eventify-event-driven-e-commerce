import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('inventory')
@Controller('api/inventory')
export class InventoryController {}
