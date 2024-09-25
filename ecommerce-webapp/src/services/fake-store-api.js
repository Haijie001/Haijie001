// 定义 FakeStoreApi 对象，包含三个用于获取产品数据的异步方法
const FakeStoreApi = {
    // fetchAllProducts 方法：从 API 获取所有产品数据
    fetchAllProducts: async () => {
        const res = await fetch('https://fakestoreapi.com/products'); // 通过 fetch 请求从指定的 API 获取所有产品数据
        const result = await res.json(); // 将响应结果转换为 JSON 格式

        // 为每个产品添加一个 discount 字段，假设折扣为 10%
        return result.map(product => ({
            ...product,
            discount: product.price * 0.9 // 计算折扣价格，这里假设是原价的 90%
        }));
    },

    // fetchProductById 方法：根据产品 ID 获取单个产品的数据
    fetchProductById: async (productId) => {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`); // 根据产品 ID 向 API 发送请求获取特定产品的数据
        const result = await res.json(); // 将响应结果转换为 JSON 格式
        
        // 为单个产品添加一个 discount 字段
        return {
            ...result,
            discount: result.price * 0.9 // 计算折扣价格
        };
    },

    // fetchProductsBySearchQuery 方法：根据查询关键字搜索产品
    fetchProductsBySearchQuery: async (query) => {
        const res = await fetch("https://fakestoreapi.com/products"); // 发送请求获取所有产品数据
        const result = await res.json(); // 将响应结果转换为 JSON 格式
        
        // 使用 filter 方法筛选出标题中包含搜索关键字的产品，并将搜索关键字转换为小写以实现大小写不敏感的搜索
        return result
            .filter(product => product.title.toLowerCase().includes(query))
            .map(product => ({
                ...product,
                discount: product.price * 0.9 // 添加折扣价格
            }));
    },
}

export { FakeStoreApi } // 导出 FakeStoreApi 对象