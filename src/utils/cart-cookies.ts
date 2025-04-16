import type { CartItem } from '@/interfaces';
import Cookies from 'js-cookie';

export class CartCookiesClient {
  static getCart(): CartItem[] {
    return JSON.parse(Cookies.get('cart') ?? '[]');
  }

  static addItem(cartItem: CartItem): CartItem[] {
    const cart = CartCookiesClient.getCart();

    const itemInCart = cart.find(
      (item) =>
        item.productId === cartItem.productId && item.size === cartItem.size
    );

    if (itemInCart) {
      itemInCart.quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }

    Cookies.set('cart', JSON.stringify(cart));

    return cart;
  }

  static removeItem(productId: number, size: string): CartItem[] {
    const cart = CartCookiesClient.getCart();

    // console.log(productId, size, cart);

    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.size === size)
    );

    Cookies.set('cart', JSON.stringify(updatedCart));

    return updatedCart;
  }
}
