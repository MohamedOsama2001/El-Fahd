import { useForm } from "react-hook-form"
import type { any, z } from "zod"

interface Props {}

function AddProductForm(props: Props) {
    const {} = props
    const form=useForm<z.infer<typeof any>>

    return (
        <section className="bg-gray-50 py-10 ">
          <div className="bg-white rounded-md shadow-md w-[90%] md:w-[70%] lg:w-[50%] m-auto text-center p-10 space-y-5">
            <h2 className=" capitalize text-dark text-2xl font-bold">add product</h2>
            <p className="text-base text-gray">
              Add a new product to your store
            </p>
          </div>
        </section>
    )
}

export default AddProductForm
