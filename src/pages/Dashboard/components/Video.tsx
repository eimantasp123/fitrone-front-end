import { FaSpinner } from "react-icons/fa";
import ReactPlayer from "react-player";

interface VideoProps {
  loading: boolean;
  object: { url: string };
  setLoading: (loading: boolean) => void;
  onReady: () => void;
}

/**
 * Video Component
 */
const Video = ({ loading, object, setLoading, onReady }: VideoProps) => {
  return (
    <div className="lg:[300px] mt-3 h-[200px] w-full sm:h-[300px] md:h-[200px] xl:h-[300px] 2xl:h-[400px]">
      {loading && (
        <div className="flex h-full items-center justify-center rounded-lg bg-backgroundSecondary p-4 dark:bg-backgroundSecondary">
          <FaSpinner className="animate-spin text-2xl text-black dark:text-white" />
        </div>
      )}

      <ReactPlayer
        width={"100%"}
        height={"100%"}
        controls={true}
        playing={false}
        url={object.url}
        stopOnUnmount={true}
        onReady={onReady}
        onError={(error) => {
          console.error("ReactPlayer error:", error);
          setLoading(false);
        }}
        config={{
          youtube: {
            playerVars: { rel: 0, showinfo: 1 },
          },
        }}
      />
    </div>
  );
};

export default Video;
