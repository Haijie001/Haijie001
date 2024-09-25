import { useEffect, useState } from "react"; // 导入 React 钩子
import { FakeStoreApi } from '../../services/fake-store-api'; // 导入 FakeStoreApi
import { useSearchParams } from "react-router-dom"; // 导入 URL 查询参数钩子
import { Item } from "../../components/item"; // 导入产品项组件
import { useCart } from "../../context/cart"; // 导入购物车上下文

import './products.css'; // 确保路径正确

// Products 组件用于显示产品列表，并支持通过查询参数进行搜索
const Products = () => {
    const [loading, setLoading] = useState(true); // 加载状态
    const [products, setProducts] = useState([]); // 产品列表
    const [query] = useSearchParams(); // 获取 URL 查询参数
    const { addToCart } = useCart(); // 获取添加到购物车的方法

    const searchQuery = query.get('q'); // 获取搜索关键字 'q'
    const [sortOrder, setSortOrder] = useState({ key: '', direction: 'asc' }); // 排序状态

    // 获取产品数据
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const products = searchQuery 
                ? await FakeStoreApi.fetchProductsBySearchQuery(searchQuery) 
                : await FakeStoreApi.fetchAllProducts();
            setProducts(products);
            setLoading(false);
        };
        fetchProducts().catch(console.error);
    }, [searchQuery]);

    // 排序函数
    const sortProducts = (key) => {
        const direction = sortOrder.key === key && sortOrder.direction === 'asc' ? 'desc' : 'asc'; // 切换排序方向
        const sortedProducts = [...products].sort((a, b) => {
            if (direction === 'asc') {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
        setSortOrder({ key, direction }); // 更新排序状态
        setProducts(sortedProducts); // 更新产品列表
    };

    // 如果没有匹配的产品，显示未找到产品的消息
    if (!loading && searchQuery && !products.length) {
        return (
            <div className="container">
                <div className="product py-2">
                    <div className="details p-3">No products found matching your query.</div>
                </div>
            </div>
        );
    }

    // 返回产品列表页面的 JSX 结构
    return (
        <div className="container">
            <div className="sort-buttons my-3">
                <button className="sort-button" onClick={() => sortProducts('price')}>
                    按价格 {sortOrder.key === 'price' && sortOrder.direction === 'asc' ? '升序' : '降序'}
                </button>
                <button className="sort-button" onClick={() => sortProducts('rating')}>
                    按评价 {sortOrder.key === 'rating' && sortOrder.direction === 'asc' ? '升序' : '降序'}
                </button>
            </div>
            <div className="products my-5">
                <div className="grid">
                    {loading ? (
                        <div className="loader" />
                    ) : (
                        products.map((product) => (
                            <Item key={product.id} data={product} addToCart={() => addToCart(product)} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export { Products }; // 导出 Products 组件