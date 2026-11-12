import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "@/auth/store/auth.store";
import { useState, type SubmitEvent } from "react";

export const RegisterPage = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {


  const navigate = useNavigate();
  const { register } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);

  const handleRegister = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPosting(true)

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;


    const isValid = await register(email, password, fullName);

    if (isValid) {
      navigate('/');
      return;
    }
    else {
      toast.error('Correo o/y contraseña no válidos')
    }


  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <CustomLogo />
                <p className="text-balance text-muted-foreground">
                  Registrar nuevo usuario
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Nombre</Label>
                <Input id="name" type="text" placeholder="Nombre" name="fullName" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="mail@google.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*********"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="text-center text-sm">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/auth/login"
                  className="underline underline-offset-4"
                >
                  Inicia sesión
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Haciendo click estás de acuerdo con <a href="#">Términos </a> y{" "}
        <a href="#">Condiciones</a>.
      </div>
    </div>
  );
};
