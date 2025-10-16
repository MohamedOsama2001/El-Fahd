interface Props {
    title:string;
}

function SectionTitle(props: Props) {
    const {title} = props

    return (
        <h2 className="font-bold text-2xl text-center capitalize text-gray-900 font-mono">
          {title}
        </h2>
    )
}

export default SectionTitle
