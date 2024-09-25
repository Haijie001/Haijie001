import { Link } from "react-router-dom" // 从 react-router-dom 库中导入 Link 组件，用于导航

// 定义一个名为 Item 的函数组件，接收两个参数 data 和 addToCart
const Item = ({ data, addToCart }) => {

    // 解构 data 对象，提取 id, image, title, price 属性
    const { id, image, title, price } = data

    // 返回 JSX 代码，用于渲染商品卡片
    return (
        <div className="card"> {/* card 是一个包裹元素，表示商品卡片的整体结构 */}
            <div className="grid"> {/* grid 类用于布局，控制内部元素的排列方式 */}
                <div className="image"> {/* image 类用于包裹商品图片 */}
                    <img src={image} alt="" /> {/* 使用 img 标签展示商品图片 */}
                </div>
                <div className="title"> {/* title 类用于显示商品标题 */}
                    {/* 使用 Link 组件创建一个导航链接，点击时跳转到指定商品详情页 */}
                    <Link to={`/product/${id}`} className="link titleLink">
                        {title} {/* 显示商品标题 */}
                    </Link>
                </div>
                <div className="flex"> {/* flex 类用于将价格和购物车按钮水平排列 */}
                    <span className="price" style={{ marginRight: 15 }}> {/* 显示商品价格，右侧留出15px的空隙 */}
                        ${price}
                    </span>
                    {/* cart 类用于购物车图标，点击时调用 addToCart 函数 */}
                    <div className="cart" onClick={addToCart}>
                        {/* 显示购物车图标 */}
                        <img className="cartImg" src="/cart.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Item } // 导出 Item 组件