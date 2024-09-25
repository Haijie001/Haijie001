import React from 'react'; // 导入 React 库
import ReactDOM from 'react-dom/client'; // 从 React DOM 库中导入渲染到 DOM 的功能
import { BrowserRouter } from "react-router-dom"; // 从 react-router-dom 导入 BrowserRouter 组件，用于处理路由
import './index.css'; // 导入全局样式文件
import App from './App'; // 导入主应用组件
import { CartProvider } from './context/cart'; // 导入购物车上下文提供者，用于为应用中的组件提供购物车功能

// 创建一个 React 渲染根节点，将 React 应用挂载到 id 为 "root" 的 DOM 元素上
const root = ReactDOM.createRoot(document.getElementById("root"))

// 使用 root.render 渲染整个应用
root.render(
  <React.StrictMode> {/* StrictMode 是一个用于检测潜在问题的工具，仅在开发模式下生效 */}
    <BrowserRouter> {/* 使用 BrowserRouter 包裹应用，为应用提供路由功能 */}
      <CartProvider> {/* 使用 CartProvider 包裹应用，为应用提供购物车上下文 */}
        <App /> {/* 渲染主应用组件 App */}
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
