

interface GraphLayoutProps {
    images: string[];
}

const GraphLayout = ({ images }: GraphLayoutProps) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* First 4 images (2x2 on large, 1x1 on small) */}
        {images.slice(0, 4).map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Photo ${idx + 1}`}
            className="w-full max-h-[650px] object-cover rounded-2xl shadow"
          />
        ))}
      </div>

      {/* Last image (centered on large screens) */}
      {images[4] && (
        <div className="mt-4 flex justify-center">
          <img
            src={images[4]}
            alt="Photo 5"
            className="w-full lg:w-1/2 max-h-[650px] object-cover rounded-2xl shadow"
          />
        </div>
      )}
    </div>
  );
};

export default GraphLayout;
