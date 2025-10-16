import { LoaderCircle } from "lucide-react"
import { Button } from "./button"
interface IProps{
    isPending:boolean;
    title:string;

}

function FormButton({isPending,title}:IProps) {

    return (
        <Button
              type="submit"
              className="bg-red w-full text-xl py-5 cursor-pointer hover:bg-red/90 transition-colors duration-300"
              disabled={isPending}
            >
                {title}
              
              {isPending && (
                <span className="flex-shrink-0 w-6">
                  <LoaderCircle className=" animate-spin !w-6 !h-6"/>
                </span>
              )}
            </Button>
    )
}

export default FormButton
