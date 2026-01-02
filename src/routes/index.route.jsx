import HomePage from "../pages/HomePage";
import LayoutDefault from "../components/layout/LayoutDefault";
import Collection from "../components/products/Collection";


export const routes = [
    {
        path:"/",
        element: <LayoutDefault/>,
        children: [
            {
                path:"/",
                element: <HomePage/>
            },
            {
                path:"collection/:slug",
                element: <Collection/>
            }
        ]

    }
]