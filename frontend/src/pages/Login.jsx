import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser, googleLogin } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    try {
        const response = await loginUser(formData);

        console.log("SUCCESS:", response);
        console.log("DATA:", response.data);

        login(response.data.token);

        toast.success("Login Successful");

        navigate("/");

    } catch (error) {
        console.log("ERROR:", error);

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Response:", error.response.data);
        }

        toast.error(
            error.response?.data?.message || "Login Failed"
        );
    }
};

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <Card className="w-[420px]">

                <CardHeader>

                    <CardTitle className="text-center text-3xl">

                        EcoFinds Login

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <Label>Email</Label>

                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div>

                            <Label>Password</Label>

                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Login
                        </Button>

                    </form>

                    <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={googleLogin}
                    >
                        Continue with Google
                    </Button>

                    <p className="text-center mt-4">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="text-blue-600 ml-1"
                        >
                            Register
                        </Link>

                    </p>

                </CardContent>

            </Card>

        </div>

    );

}

export default Login;