import { Link } from "react-router-dom"; // 导入 Link 组件，用于在应用内创建导航链接
import { useState } from "react"; // 从 React 导入 useState 钩子，用于管理组件内部的状态

// NavBar 组件：接收 onSearch 和 cartItemCount 作为 props
// onSearch 是一个函数，用于处理搜索操作
// cartItemCount 表示购物车中的商品数量
const NavBar = ({ onSearch, cartItemCount }) => {
    const [searchQuery, setSearchQuery] = useState(''); // 定义 searchQuery 状态，用于存储搜索框中的输入内容

    // handleSubmit 函数：当用户点击搜索按钮时触发
    const handleSubmit = () => {
        // 如果搜索框中有有效的输入内容（去掉空格后长度大于 0）
        if (searchQuery.trim().length) {
            onSearch(searchQuery.trim()); // 调用 onSearch 函数，将搜索关键字传递给父组件
        }
        setSearchQuery(''); // 清空搜索框
    };

    // 返回导航栏的 JSX 结构
    return (
        <div className="wrapper">
            <header className="container">
                <div className="header py-2">
                    <div className="grid">
                        {/* 点击品牌名称时，使用 Link 组件跳转到主页 */}
                        <Link to="/" className="link">
                            <h1 className="brand">E-commerce</h1> {/* 网站的品牌名称 */}
                        </Link>
                        <div className="formContainer">
                            {/* 搜索表单 */}
                            <form className="search">
                                <div className="form-control">
                                    {/* 输入框用于输入搜索关键字，值绑定到 searchQuery 状态 */}
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)} // 当输入框内容变化时更新 searchQuery 状态
                                        placeholder="Search products..." // 提示用户输入搜索内容
                                    />
                                </div>
                                {/* 搜索按钮，点击时触发 handleSubmit 函数 */}
                                <button type="button" className="search-btn" onClick={handleSubmit}>
                                    Search
                                </button>
                            </form>
                        </div>
                        {/* 购物车链接，点击时跳转到购物车页面 */}
                        <Link to="/cart" className="link headerCart">
                            <img className="cartImg" src="/cart.svg" alt="cart" /> {/* 购物车图标 */}
                            {/* 如果购物车中有商品，显示商品数量 */}
                            {cartItemCount > 0 && (
                                <div className="cartCounter">
                                    {/* 如果购物车商品数量小于等于 9，则显示具体数量；否则显示 "9+" */}
                                    {cartItemCount <= 9 ? cartItemCount : "9+"}
                                </div>
                            )}
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
};

export { NavBar }; // 导出 NavBar 组件