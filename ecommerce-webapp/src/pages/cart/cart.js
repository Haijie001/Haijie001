import { Link } from "react-router-dom" // 从 react-router-dom 库中导入 Link 组件，用于导航
import { useCart } from "../../context/cart" // 从自定义的购物车上下文中导入 useCart 钩子，获取购物车的状态和操作
import "./cart.css" // 导入购物车的样式文件

// 定义固定的运费
const SHIPPING_CHARGES = 25

// Cart 组件负责展示购物车页面，包括订单概览和付款摘要
const Cart = () => {
    // 从购物车上下文中解构出购物车数据和操作方法
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart()

    // 计算购物车商品总价，通过累加每个商品的价格乘以数量得到总金额
    const cartTotal = () => {
        return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    }

    // 定义四舍五入函数，用于格式化金额
    const round = (value, decimals) => {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals) // 使用指数运算实现小数点四舍五入
    }

    // 返回购物车页面的 JSX 结构
    return (
        <div className="cartWrapper"> {/* 包裹整个购物车页面的容器 */}
            <div className="container"> {/* 定义页面内容的容器 */}
                {/* 根据购物车中是否有商品展示不同的内容 */}
                {cart.length >= 1 ? (
                    <div className="grid my-5"> {/* 当购物车中有商品时，展示订单概览和付款摘要 */}
                        <div className="cartItem p-3"> {/* 订单概览区域 */}
                            <h2>Order Summary</h2> {/* 标题 */}
                            {/* 遍历购物车中的商品并渲染每个商品的信息 */}
                            {cart.map((item) => (
                                <div className="item" key={item.product.id}> {/* 逐个商品项 */}
                                    <div className="grid py-3"> {/* 商品项布局 */}
                                        <div className="itemImage"> {/* 商品图片 */}
                                            <img src={item.product.image} alt="" /> {/* 显示商品图片 */}
                                        </div>
                                        <div className="itemDesc"> {/* 商品描述 */}
                                            <div className="title"> {/* 商品标题 */}
                                                <Link to={"/product/" + item.product.id} className="titleLink">
                                                    {item.product.title} {/* 商品标题链接 */}
                                                </Link>
                                            </div>
                                            <span className="price">${round(item.product.price * item.quantity, 2)}</span> {/* 商品价格，小数点保留两位 */}
                                        </div>
                                        <div className="itemControl flex"> {/* 商品数量控制 */}
                                            <div>
                                                <button
                                                    onClick={() => increaseQuantity(item.product.id)} // 点击增加商品数量
                                                    className="addQty"
                                                >
                                                    +
                                                </button>
                                                <span className="mx-1">{item.quantity}</span> {/* 显示当前商品的数量 */}
                                                <button
                                                    onClick={() => decreaseQuantity(item.product.id)} // 点击减少商品数量
                                                    disabled={item.quantity === 1} // 如果商品数量为1，禁用减少按钮
                                                    className="removeQty"
                                                >
                                                    -
                                                </button>
                                                <div
                                                    className="remove my-1"
                                                    onClick={() => removeFromCart(item.product.id)} // 点击移除商品
                                                >
                                                    Remove
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="payment p-3"> {/* 付款摘要区域 */}
                            <h2>Payment Summary</h2>
                            <div className="summary py-3 my-2">
                                <div className="flex py-1">
                                    <span>Subtotal:</span> {/* 小计 */}
                                    <span className="price">${round(cartTotal(), 2)}</span> {/* 购物车商品总价 */}
                                </div>
                                <div className="flex py-1">
                                    <span>Shipping Fee:</span> {/* 运费 */}
                                    <span className="price">${SHIPPING_CHARGES}</span> {/* 固定运费 */}
                                </div>
                                <div className=" flex py-1">
                                    <span>Total:</span> {/* 总计 */}
                                    <span className="price">${round(cartTotal() + SHIPPING_CHARGES, 2)}</span> {/* 总计金额 = 商品总价 + 运费 */}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="error"> {/* 如果购物车为空，显示提示信息 */}
                        <p>&#9432; Cart is empty</p> {/* 显示购物车为空的提示 */}
                    </div>
                )}
            </div>
        </div>
    )
}

export { Cart } // 导出 Cart 组件