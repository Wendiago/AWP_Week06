import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, TLoginSchema } from "../types/type";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const response = auth.login(data);
    } catch (error) {
      console.log("Login error: ", error);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-semibold">
          Email:{" "}
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="px-6 py-4 rounded-lg border focus:outline-offset-2 focus:outline-primary"
          name="email"
        />
        {errors.email && (
          <p className="text-destructive">{`${errors.email.message}`}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-semibold">
          Password:{" "}
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="px-6 py-4 rounded-lg border focus:outline-offset-2 focus:outline-primary"
          name="password"
        />
        {errors.password && (
          <p className="text-destructive">{`${errors.password.message}`}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-primary text-primary-foreground disabled:bg-muted py-4 rounded-lg text-lg mt-2"
      >
        Log in
      </button>

      <span className="m-[0_auto] ">
        Haven't had an account yet?{" "}
        <a
          className="text-primary font-semibold cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Sign up now
        </a>
      </span>
    </form>
  );
}
