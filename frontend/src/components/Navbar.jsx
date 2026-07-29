import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { logout } = useAuth();

    return (

        <nav className="flex items-center justify-between p-4 border-b">

            <Link
                to="/"
                className="text-2xl font-bold text-green-600"
            >
                EcoFinds
            </Link>

            <div className="space-x-3">

                <Button
                    variant="outline"
                    asChild
                >
                    <Link to="/wishlist">Wishlist</Link>
                </Button>

                <Button
                    variant="outline"
                    asChild
                >
                    <Link to="/cart">Cart</Link>
                </Button>

                <Button
                    onClick={logout}
                >
                    Logout
                </Button>

            </div>

        </nav>

    );

}

export default Navbar;
