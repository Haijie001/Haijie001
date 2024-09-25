import { Link } from "react-router-dom" // 从 react-router-dom 库中导入 Link 组件，用于页面导航

// NotFound 组件用于显示 404 页面未找到的提示信息
const NotFound = () => {
    return (
        <div className="container"> {/* 页面内容的外层容器 */}
            <div className="product py-2"> {/* 内部布局容器，包含提示信息 */}
                <div className="details p-3"> {/* 提示信息的文本区域 */}
                    {/* 显示 "Page not found" 的文本提示 */}
                    Page not found. Go to{" "} 
                    <Link to="/" replace> {/* 使用 Link 组件创建链接，点击后导航到首页 */}
                        homepage
                    </Link>
                    .
                </div>
            </div>
        </div>
    )
}

export { NotFound } // 导出 NotFound 组件