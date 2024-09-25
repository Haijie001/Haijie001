import { createContext, useContext, useState } from "react" // 导入 React 的 createContext, useContext, useState 钩子

// 定义一个初始状态对象，包含购物车(cart)以及操作购物车的函数，这些函数初始时是空操作
const initialState = {
    cart: [], // 购物车数组，存储所有商品项
    cartItemCount: () => 0, // 计算购物车内商品数量的函数，初始为返回0
    addToCart: () => null, // 添加商品到购物车的函数，初始为不执行任何操作
    removeFromCart: () => null, // 从购物车中移除商品的函数
    increaseQuantity: () => null, // 增加商品数量的函数
    decreaseQuantity: () => null, // 减少商品数量的函数
}

// 使用 React 的 createContext 创建一个购物车上下文，用于在应用中共享购物车状态
const CartContext = createContext(initialState)

// useCart 是一个自定义 Hook，返回购物车上下文中的值，方便其他组件访问购物车相关数据
const useCart = () => useContext(CartContext)

// CartProvider 是一个组件，负责为子组件提供购物车状态和操作函数
const CartProvider = ({ children }) => {
    // 使用 useState 钩子来定义 cart 状态，并将初始状态设置为 initialState.cart
    const [cart, setCart] = useState(initialState.cart)

    // 计算购物车中所有商品的总数量，通过累加每个商品的 quantity 来实现
    const cartItemCount = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0) // reduce 累加购物车中所有商品的数量
    }

    // addToCart 函数用于将新商品添加到购物车
    const addToCart = (product) => {
        const productIdx = cart.findIndex((item) => item.product.id === product.id) // 查找购物车中是否已存在该商品
        if (productIdx !== -1) {
            increaseQuantity(product.id) // 如果商品已存在，调用 increaseQuantity 增加其数量
        } else {
            setCart([...cart, { product, quantity: 1 }]) // 如果商品不存在，向购物车中添加该商品，数量设为1
        }
    }

    // removeFromCart 函数用于从购物车中移除商品
    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.product.id !== productId)) // 过滤掉与指定 productId 匹配的商品
    }

    // increaseQuantity 函数用于增加指定商品的数量
    const increaseQuantity = (productId) => {
        const copy = cart.slice() // 创建购物车的副本
        const productIdx = copy.findIndex((item) => item.product.id === productId) // 查找该商品在购物车中的索引
        if (productIdx !== -1) {
            copy[productIdx].quantity += 1 // 增加商品数量
            setCart(copy) // 更新购物车状态
        }
    }

    // decreaseQuantity 函数用于减少指定商品的数量，数量不能小于1
    const decreaseQuantity = (productId) => {
        const copy = cart.slice() // 创建购物车的副本
        const productIdx = copy.findIndex((item) => item.product.id === productId) // 查找该商品在购物车中的索引
        if (productIdx !== -1 && copy[productIdx].quantity > 1) {
            copy[productIdx].quantity -= 1 // 减少商品数量，但不能低于1
            setCart(copy) // 更新购物车状态
        }
    }

    // 返回一个 CartContext.Provider 组件，传递购物车状态和操作函数给子组件
    return (
        <CartContext.Provider
            value={{ cart, cartItemCount, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }} // 提供上下文中的数据和操作
        >
            {children} {/* 渲染所有子组件 */}
        </CartContext.Provider>
    )
}

export { useCart, CartProvider } // 导出 useCart 自定义 Hook 和 CartProvider 组件