import { InventoryService } from "../services/inventory.service";

const inventoryService = new InventoryService();

export async function handleOrderCreatedEvent(payload: any): Promise<void> {
  if (!payload.item || !payload.orderId) {
    throw new Error("Invalid payload: missing required fields.");
  }

  console.log(`[Handler] Processing Order #${payload.orderId}`);
  await inventoryService.deductItemFromStock(payload.item, 1);
}
