import './product.css'; // 导入产品页面的样式文件
import { useEffect, useState } from "react"; // 从 React 导入 useEffect 和 useState 钩子
import { FakeStoreApi } from '../../services/fake-store-api'; // 导入 FakeStoreApi
import { Link, useParams } from "react-router-dom"; // 导入 Link 和 useParams
import { useCart } from "../../context/cart"; // 导入 useCart

// Product 组件用于显示特定产品的详细信息
// Product 组件用于显示特定产品的详细信息
const Product = () => {
    const [loading, setLoading] = useState(true); // 定义 loading 状态，表示产品数据是否正在加载
    const [product, setProduct] = useState(); // 定义 product 状态，用于存储获取到的产品数据
    const { productId } = useParams(); // 从 URL 参数中获取 productId
    const { addToCart } = useCart(); // 从购物车上下文中解构出 addToCart 方法，用于将产品添加到购物车

    // 使用 useEffect 钩子在组件加载时获取产品数据
    useEffect(() => {
        // 定义异步函数 fetchProduct 来获取产品数据
        const fetchProduct = async () => {
            setLoading(true); // 设置加载状态为 true
            const product = await FakeStoreApi.fetchProductById(productId); // 通过 productId 从 API 获取产品数据
            setProduct(product); // 将获取到的产品数据存储到 product 状态中
            setLoading(false); // 加载完成后将 loading 状态设置为 false
        }
        // 调用 fetchProduct 并处理错误
        fetchProduct().catch(console.error);
    }, [productId]); // 当 productId 变化时重新执行 useEffect

    // 如果产品加载完毕但未找到产品，显示“未找到产品”的消息
    if (!loading && !product) {
        return (
            <div className="container">
                <div className="product py-2">
                    <div className="details p-3">
                        Product not found. Please visit{" "}
                        <Link to="/" replace>
                            home
                        </Link>{" "}
                        to see all available products
                    </div>
                </div>
            </div>
        );
    }

    // 返回产品详细信息页面的 JSX 结构
    return (
        <div className="container">
            {loading ? (
                <div className={"loader"}></div>
            ) : (
                <div className="product py-2">
                    <div className="details grid p-3">
                        <div className="product-image">
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className="info">
                            <div className="description">
                                <h3>{product.title}</h3>
                                <p className="my-2">{product.description}</p>
                            </div>
                            <div className="flex">
                                <span className="price">${product.price}</span> {/* 显示原价 */}
                                {product.discount && ( // 如果存在折扣，则显示折扣价格
                                    <span className="discount-price">
                                        <span style={{ textDecoration: 'line-through', marginRight: '5px' }}>
                                            ${product.price}
                                        </span>
                                        ${product.discount.toFixed(2)} {/* 显示折扣后的价格，保留两位小数 */}
                                    </span>
                                )}
                                <span className="cart" onClick={() => addToCart(product)}>
                                    <img src="/cart.svg" alt="Add to cart" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export { Product }; // 导出 Product 组件