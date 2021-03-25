import Home from "@pages/home/index"
import Edit from "@pages/edit/index"
import User from "@pages/user/index"
import Detail from "@pages/detail/index"

const routes = [
  { path: "/", component: Home, exact: true },
  { path: "/user", component: User },
  { path: "/home", component: Home, loadData: Home.loadData },
  { path: "/edit/:hash", component: Edit, exact: true },
  { path: "/detail/:hash", component: Detail, exact: true }
]

export default routes
