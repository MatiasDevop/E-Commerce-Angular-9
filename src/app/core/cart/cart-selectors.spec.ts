import { CartState } from "./cart-state"
import { CartItem } from './cart-item';
import { getCartItemsCount, getIsItemAlreadyInCart } from './cart-selector';

const given = beforeEach;
const when = beforeEach;
const then = it;

describe("Cart Store Selectors", () => {
    describe("Get Cart Items Count", () => {
        let cartState: CartState;
        let result : number;
        given(() => {
            const tenApples: CartItem ={
                productId: 1,
                quantity: 10,
                imgUrl: "img/apple",
                itemTotal: 20,
                name: "apple",
                price: 2
            };
            const fiveOranges: CartItem = {
                productId: 1,
                quantity: 5,
                imgUrl: "img/orange",
                itemTotal: 20,
                name: "orange",
                price: 2
            };
            cartState = {
                cartItems: [tenApples, fiveOranges]
            };
        });
        when(() => {
            result = getCartItemsCount(cartState);
        });
        then("i can see my total cart items count", () => {
            expect(result).toBe(15);
        })
    });
    it('Can find cart item', () => {
        const itemInCart: CartItem = {
            productId: 1,
            imgUrl: "img/apple",
            itemTotal: 20,
            name: "apple",
            price: 2,
            quantity: 10,
        };
        const itemInCart1: CartItem = {
            productId: 2,
            imgUrl: "img/orange",
            itemTotal: 20,
            name: "orange",
            price: 2,
            quantity: 5,
        };
        const state: CartState = {
            cartItems:[itemInCart, itemInCart1],
        };
        const itemExist = getIsItemAlreadyInCart(2)(state);
        expect(itemExist).toBeTruthy();

        const itemExist1 = getIsItemAlreadyInCart(4)(state);
        expect(itemExist1).toBeFalsy();
    }); 
})