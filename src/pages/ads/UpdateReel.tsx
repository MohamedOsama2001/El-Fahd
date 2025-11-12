import PageHeadr from "@/components/common/PageHeader"
import UpdateReelForm from "@/components/froms/adsForms/UpdateReelForm"

interface Props {}

function UpdateReel(props: Props) {
    const {} = props

    return (
        <>
        <PageHeadr title="update reel" subtitle="update reel"/>
        <UpdateReelForm/>
        </>
    )
}

export default UpdateReel
