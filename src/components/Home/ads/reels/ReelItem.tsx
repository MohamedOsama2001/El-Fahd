import type { IReelData } from "@/interface/ads";

interface Props {
  reel: IReelData;
  onClick: () => void;
}

function ReelItem(props: Props) {
  const { reel, onClick } = props;

  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-32 h-32 rounded-full font-bold bg-white border-4 border-red-500 cursor-pointer flex items-center justify-center"
    >
      <img
        src={reel.mediaType === "image" ? reel.mediaUrl : "/images/video.webp"}
        alt="reel"
        className="w-full h-full rounded-full overflow-hidden object-fill"
      />
    </div>
  );
}

export default ReelItem;
