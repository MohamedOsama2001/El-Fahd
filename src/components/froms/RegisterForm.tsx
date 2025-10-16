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
import { registerSchema } from "@/validations/authValidation";
import { REGISTER_FORM_INPUT } from "@/constant";
import auth from "@/lib/queries/auth";
import { toast } from "react-toastify";
import FormButton from "../ui/FormButton";
function RegisterForm() {
  const { mutateAsync: register, isPending } = auth.useRegister();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  const {reset}=form
  const onSubmit = async (userData: z.infer<typeof registerSchema>) => {
    try {
      await register(userData);
      reset()
      toast.success("Account created succefully plz login now.");
      return navigate("/login",{replace:true});
    } catch (e:any) {
      const errorMessage=e?.response?.data?.message
      toast.error(errorMessage)
      console.log(e);
    }
  };

  return (
    <section className="bg-gray-50 py-10 lg:py-30 ">
      <div className="bg-white rounded-md shadow-md w-[90%] md:w-[70%] lg:w-[50%] m-auto text-center p-10 space-y-5">
        <h2 className=" capitalize text-dark text-2xl font-bold">register</h2>
        <p className="text-base text-gray">
          Join our community to buy and sell items
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {REGISTER_FORM_INPUT.map((input) => (
              <FormField
                key={input.name}
                control={form.control}
                name={input.name as keyof z.infer<typeof registerSchema>}
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
            <FormButton isPending={isPending} title="Register"/>
            <p className=" capitalize">
              already have an account?{" "}
              <Link to="/login" className="text-red hover:underline">
                login
              </Link>{" "}
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default RegisterForm;
