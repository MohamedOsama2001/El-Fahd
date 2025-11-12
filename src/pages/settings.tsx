import PageHeadr from "@/components/common/PageHeader"
import auth from "@/lib/queries/auth"
import cookieService from "@/utils/cookieService"
import { Link } from "react-router-dom"

function Settings() {
    const token=cookieService.getToken()!
const {data:userData}=auth.useGetProfile(token)
    return (
        <>
        <PageHeadr title="settings" subtitle="Manage your account details and preferences"/>
        <section className="bg-gray-50 py-20">
                <div className="bg-white shadow-md rounded-lg p-8 mx-4 md:container md:mx-auto">
                    <h2 className="font-bold text-2xl text-black">Account Information
                    </h2>
                    <p className="text-base text-gray-500 mt-2">Manage your account details and preferences
                    </p>
                    {/* email */}
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-base font-medium text-black">Email</label>
                        <div className="flex justify-between items-center">
                        <input type="email" value={userData?.data.email} id="email" className="mt-1 border border-none text" />
                        <button  className="bg-white border border-gray-300 text-black px-2 py-1 rounded-md capitalize hover:bg-gray-100 transition-colors duration-300">
                            change
                        </button>
                        </div>
                    </div>
                    {/* update password */}
                    <div className="mt-5">
                        <p className="text-base font-bold text-black">Update your password</p>
                        <Link to={"/update-password"} className="bg-red px-4 py-2 rounded-md text-white inline-block mt-3 hover:bg-red/90 transition-colors duration-300">Update Password</Link>
                    </div>
                    
                </div>
            </section>

        </>
    )
}

export default Settings
