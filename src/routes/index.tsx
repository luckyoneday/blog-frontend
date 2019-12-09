import Home from "@pages/home/index"
import Create from "@pages/create/index"
import User from "@pages/user/index"

const routes = [
  { path: "/create", component: Create, exact: true },
  { path: "/user", component: User, exact: true },
  { path: "/home", component: Home, exact: true }
]

export default routes
