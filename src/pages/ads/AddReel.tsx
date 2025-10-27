import PageHeadr from "@/components/common/PageHeader"
import { AddReelForm } from "@/components/froms/adsForms/AddReelForm"


interface Props {}

function AddReel(props: Props) {
    const {} = props

    return (
        <>
        <PageHeadr title="add reel" subtitle="add reel"/>
        <AddReelForm/>
        </>

    )
}

export default AddReel
