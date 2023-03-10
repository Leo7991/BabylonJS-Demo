/*
 * @description: 
 * @author: lijingru
 * @Date: 2023-03-02 16:01:37
 * @lastEditors: lijingru
 * @LastEditTime: 2023-03-09 16:30:53
 */
const routes = [
    {
        path: '/',
        name: 'index',
        title: '首页',
        component: () => import('@/components/testDemo.vue'), //.vue不能省略
    },

    {
        path: '/hello',
        name: 'hello',
        title: '哈喽',
        component: () => import('@/components/HelloWorld.vue'), //.vue不能省略
    },

    {
        path: '/demo2',
        name: 'demo2',
        title: 'demo2',
        component: () => import('@/components/testDemo2.vue'), //.vue不能省略
    }
]
export default routes
