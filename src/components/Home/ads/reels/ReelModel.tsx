import type { IReelData } from '@/interface/ads'
import { IoMdClose } from 'react-icons/io'

interface Props {
    reel:IReelData;
    onClose:()=>void
}

function ReelModel(props: Props) {
    const {reel,onClose} = props

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-4 max-w-lg w-full">
            {/* Close Button */}
            <button
              className="absolute -top-4 -right-4 hover:bg-red-400 bg-red-500 rounded-full w-10 h-10 text-red-500 hover:text-red-700"
              onClick={onClose}
            >
              <IoMdClose className="text-white"/>
            </button>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-200 mb-4">
              <div
                className="h-full bg-red-500"
                style={{
                  animation: "progress 10s linear forwards",
                }}
              ></div>
            </div>

            {/* Media Content */}
            <div className="flex justify-center items-center">
              {reel.mediaType === "image" ? (
                <img
                  src={reel.mediaUrl}
                  alt="reel"
                  className="max-w-full max-h-96 object-contain"
                />
              ) : (
                <video
                  src={reel.mediaUrl}
                  autoPlay
                  controls
                  className="max-w-full max-h-96 object-contain"
                />
              )}
            </div>
          </div>
        </div>
    )
}

export default ReelModel
