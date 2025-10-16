import PageHeadr from '@/components/common/PageHeader'
import AddProductForm from '@/components/froms/adsForms/AddProduct'
interface Props {}

function AddProduct(props: Props) {
    const {} = props

    return (
        <>
        <PageHeadr title='add product' subtitle='add a new product to your store'/>
        <AddProductForm/>
        </>
    )
}

export default AddProduct
