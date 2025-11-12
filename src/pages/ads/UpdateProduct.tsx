import PageHeadr from "@/components/common/PageHeader"
import UpdateProductForm from "@/components/froms/adsForms/UpdateProductForm"

interface Props {}

function UpdateProduct(props: Props) {
    const {} = props

    return (
        <>
        <PageHeadr title="update product" subtitle="update product"/>
        <UpdateProductForm/>
        </>
    )
}

export default UpdateProduct
