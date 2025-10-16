import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import { Outlet } from 'react-router-dom'

interface Props {}

function MainLayout(props: Props) {
    const {} = props

    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default MainLayout
