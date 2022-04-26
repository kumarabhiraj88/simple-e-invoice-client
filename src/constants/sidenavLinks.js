import { Dashboard, People,Receipt } from '@material-ui/icons';
//import ReceiptIcon from '@mui/icons-material/Receipt';
export const sideNav = [
	{ icon: <Dashboard className="sidenavIcon" />, routeLabel: "Dashboard", link:"/admin/dashboard" },
	{ icon: <People className="sidenavIcon" />, routeLabel: "Users", link:"/admin/users" },
	{ icon: <Receipt className="sidenavIcon" />, routeLabel: "Invoices", link:"/admin/invoices" },
]