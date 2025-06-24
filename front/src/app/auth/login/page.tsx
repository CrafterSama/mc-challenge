import { LoginForm } from "@/components/modules/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginForm />
        <div className="text-center">
          {/*<p className="text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link href={ROUTES.REGISTER} className="font-medium text-primary hover:underline">
              Regístrate aquí
            </Link>
          </p>*/}
        </div>
      </div>
    </div>
  );
}
