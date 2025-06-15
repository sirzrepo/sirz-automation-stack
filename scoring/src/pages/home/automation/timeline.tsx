// components/TimelineItem.jsx

interface TimelineItemProps {
    title: string;
    description: string;
    imageSrc: string;
    side: 'left' | 'right';
    isLast?: boolean;
    // side
}

function TimelineItem({ title, description, imageSrc, side }: TimelineItemProps) {
  const isLeft = side === 'left';

  return (
    <div className={`relative flex items-center justify-center mb-16 md:mb-24 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      {/* Circle on the timeline line (only visible on medium+ screens) */}
      <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 z-10"></div>

      <div className={`w-full md:w-5/12 p-4 rounded-lg shadow-lg bg-white ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        {imageSrc && (
          <div className="mt-4 border rounded-lg overflow-hidden">
            <img src={imageSrc} alt={title} className="w-full h-auto object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}

export default TimelineItem;