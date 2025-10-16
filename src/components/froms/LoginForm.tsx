import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@/validations/authValidation";
import { LOGIN_FORM_INPUTS } from "@/constant";
import auth from "@/lib/queries/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import FormButton from "../ui/FormButton";
function LoginForm() {
  const {mutateAsync:loginMutate,isPending}=auth.useLogin()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {reset}=form
  const onSubmit = async (loginData:z.infer<typeof loginSchema>) => {
    try{
      const {data:user}=await loginMutate(loginData)
      dispatch(
        login({
          token:user.token,
          role:user.role
        })
      )
      reset()
      toast.success('Logged in successfully.')
      return navigate("/",{replace:true})
    }
    catch(e:any){
      const errorMessage=e?.response?.data?.message
      toast.error(errorMessage)
    }
  };

  return (
    <section className="bg-gray-50 py-10 lg:py-30 ">
      <div className="bg-white rounded-md shadow-md w-[90%] md:w-[70%] lg:w-[50%] m-auto text-center p-10 space-y-5">
        <h2 className=" capitalize text-dark text-2xl font-bold">login</h2>
        <p className="text-base text-gray">
          Welcome back! Please login to your account
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {LOGIN_FORM_INPUTS.map((input)=>(
                <FormField
                key={input.name}
                control={form.control}
                name={input.name as keyof z.infer<typeof loginSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">{input.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={input.placeholder}
                        type={input.type}
                        className="py-5 focus:ring-1 focus:ring-red"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              ></FormField>
            ))}
            <FormButton isPending={isPending} title="Login"/>
            <p className=" capitalize">
              don't have an account?{" "}
              <Link to="/register" className="text-red hover:underline">
                register
              </Link>{" "}
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default LoginForm;
