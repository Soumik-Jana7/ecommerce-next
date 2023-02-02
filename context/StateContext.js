import React, { setContext, useContext, useState, useEffect, createContext } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) =>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct, index;

    const onRemove = (product) =>{
        const newCartItems = cartItems.filter((item)=> item._id != product._id);
        setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities - product.quantity);
        setTotalPrice((prevTotalPrice)=> prevTotalPrice - product.price*product.quantity);
        setCartItems(newCartItems);
    }

    const onAdd = (product, quantity) =>{
        
        const checkProductInCart = cartItems.find((item)=> item._id === product._id);
        
        setTotalPrice((prevTotalPrice)=> prevTotalPrice + quantity*product.price);
        setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities + quantity);
        
        if(checkProductInCart){
                const updatedCartItems = cartItems.map((cartProduct)=>{
                if(cartProduct._id === product._id)return {
                    ...cartProduct, 
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);    
        }else{
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const toggleCartItemQuantity = (id, value) =>{     // this is the id of the product in cart that we want to update quantity of
        const foundProduct = cartItems.find((item)=> item._id === id);
        const index = cartItems.findIndex((product)=> product._id === id);

        const newCartItems = cartItems.filter((item)=> item._id != id); // deleting the element that we are going to update the quantity of.

        if(value === 'inc')
        {
            setCartItems([...newCartItems, {...foundProduct, quantity : foundProduct.quantity + 1}]); // updating only a specific product quantity
            setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities + 1);
            setTotalPrice((prevTotalPrice)=>prevTotalPrice + foundProduct.price);
        }else if(value === 'dec'){
            if(foundProduct.quantity > 1)
            {
                setCartItems([...newCartItems, {...foundProduct, quantity : foundProduct.quantity - 1}]);
                setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities - 1);
                setTotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price);
            }
        }
    }

    const incQty = () =>{
        setQty((prevQty)=>prevQty+1);
    }
    const decQty = () =>{
        setQty((prevQty)=>{
            if(prevQty-1 < 1)return 1;
            return prevQty -1;
        });
    }

    return (
        <Context.Provider value={{showCart, setShowCart, cartItems, totalPrice, totalQuantities,qty,  incQty, decQty, onAdd, toggleCartItemQuantity, onRemove}}>
            {children}
        </Context.Provider>    // we want the cart info is available to all the pages so we are wrapping its children with cart info
    )
}

export function useStateContext() {
    return useContext(Context);
}