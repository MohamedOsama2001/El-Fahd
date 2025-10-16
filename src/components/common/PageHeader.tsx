import { Link } from "react-router-dom";
interface IProps{
    title:string,
    subtitle:string;
}
function PageHeadr(props:IProps) {
    const {title,subtitle}=props
  return (
    <div className="bg-red-100 text-center py-10">
      <h2 className=" capitalize text-black font-bold text-2xl mb-5">
        {title}
      </h2>
      <p className="text-gray-600 text-md tracking-widest capitalize ">
        <Link to="/" className="me-2">
          Home
        </Link>
        | {subtitle}
      </p>
    </div>
  );
}

export default PageHeadr;
