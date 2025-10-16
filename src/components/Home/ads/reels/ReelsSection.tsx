import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ads from "@/lib/queries/ads";
import cookieService from "@/utils/cookieService";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { IReelData } from "@/interface/ads";
import { FaPlus } from "react-icons/fa";
import "@/App.css"
import ReelModel from "./ReelModel";
import ReelItem from "./ReelItem";


function ReelsSection() {
  const token = cookieService.getToken()!;
  const { isAuthanticated } = useSelector((state: RootState) => state.auth);
  const { data: reels, isLoading,isError } = ads.useGetReels(token);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState<IReelData | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const swiperRef = useRef(null);
  useEffect(() => {
    let timer:ReturnType<typeof setTimeout>;
    if (isModelOpen) {
      timer = setTimeout(() => {
        setIsModelOpen(false);
        setSelectedReel(null);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [isModelOpen]);
  const handleReelClick = (reel:IReelData) => {
    setSelectedReel(reel);
    setIsModelOpen(true);
    setIsPaused(true);
  };
  const handleClose = () => {
    setIsModelOpen(false);
    setSelectedReel(null);
    setIsPaused(false);
  };
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (!isModelOpen) setIsPaused(false);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  if(isError || !token || !isAuthanticated){
    return <div className="flex justify-center w-full py-10">
    <Link to="add-reel">
      <div className="flex-shrink-0 w-32 h-32 rounded-full font-bold bg-white border-2 border-red-500 cursor-pointer flex items-center justify-center">
        <FaPlus className="me-2"/>
        Add Reel
      </div>
    </Link>
  </div>
  }
  return (
    <>
      <section className="py-10 overflow-hidden">
        <div
          className="flex gap-3"
          ref={swiperRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {(reels?.data.length??0) > 0 && (
            <div
              className={`flex gap-3 animate-slide ${isPaused ? "paused" : ""}`}
              style={{
                width: `${((reels?.data.length??0) + 1) * 32}rem`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              <div className="flex-shrink-0 w-32 h-32 rounded-full font-bold bg-white border-2 border-red-500 cursor-pointer flex items-center justify-center">
                <Link to="add-reel">
                  <FaPlus/>
                  Add Reel
                </Link>
              </div>
              {reels?.data.map((reel, idx) => (
                <ReelItem key={idx} reel={reel} onClick={()=>handleReelClick(reel)} />
              ))}
              {/* Duplicate reels for seamless looping */}
              {reels?.data.map((reel, idx) => (
                <ReelItem key={`duplicate-${idx}`} reel={reel} onClick={()=>handleReelClick(reel)} />
              ))}
            </div>
          )}
        </div>
      </section>
      {isModelOpen && selectedReel && (
        <ReelModel reel={selectedReel} onClose={handleClose}/>
      )}
    </>
  );
}

export default ReelsSection;
