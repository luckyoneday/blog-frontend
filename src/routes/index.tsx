import Home from "@pages/home/index"
import Create from "@pages/create/index"
import User from "@pages/user/index"

const routes = [
  { path: "/", component: Home, exact: true },
  { path: "/create", component: Create },
  { path: "/user", component: User },
  { path: "/home", component: Home }
]

export default routes
