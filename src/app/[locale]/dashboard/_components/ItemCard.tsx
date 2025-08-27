import Image from "next/image";

type ItemCardProps = {
  item: { id: string; title?: string; image: string };
};
const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <div
      key={item.id}
      className="relative p-8 bg-gray-200 rounded-xl text-center block"
    >
      <Image
        src={item.image as string}
        alt={item?.title || "image for project"}
        width={100}
        height={100}
        className="max-w-full h-[90px] object-contain mx-auto"
      />
      <h2 className="mt-2 text-center font-bold line-clamp-1 text-sm lg:text-base">
        {item.title}
      </h2>
    </div>
  );
};

export default ItemCard;
