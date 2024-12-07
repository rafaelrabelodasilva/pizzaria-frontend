import { OrderItemProps } from "@/providers/order";

export function calculateTotalOrder(orders: OrderItemProps[]){
  //Reduce percorre toda a lista e incrementa o valor
  //Inicia com zero porém aumenta conforme a lista
  return orders.reduce((total, item) => {
    const itemTotal = parseFloat(item.product.price) * item.amount;
    return total + itemTotal
  }, 0)
}