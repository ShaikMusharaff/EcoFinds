import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { signupUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Register() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({

        displayName: "",

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

        try {

            const { data } = await signupUser(formData);

            login(data.token);

            toast.success("Registration Successful");

            navigate("/");

        }

        catch (error) {

            toast.error(
                error.response?.data?.message || "Registration Failed"
            );

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <Card className="w-[420px]">

                <CardHeader>

                    <CardTitle className="text-center text-3xl">

                        Create Account

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <Label>Name</Label>

                            <Input
                                name="displayName"
                                value={formData.displayName}
                                onChange={handleChange}
                                required
                            />

                        </div>

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
                            Register
                        </Button>

                    </form>

                    <p className="text-center mt-4">

                        Already have an account?

                        <Link
                            to="/login"
                            className="text-blue-600 ml-1"
                        >
                            Login
                        </Link>

                    </p>

                </CardContent>

            </Card>

        </div>

    );

}

export default Register;