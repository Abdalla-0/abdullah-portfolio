import Image from "next/image";
import Link from "next/link";

type ItemCardProps = {
  itemLink: string;
  item: { id: string; title: string; image: string };
};
const ItemCard = ({ item, itemLink }: ItemCardProps) => {
  return (
    <Link
      href={`${itemLink}`}
      key={item.id}
      className="relative p-8 bg-gray-200 rounded-xl text-center block"
    >
      <Image
        src={item.image as string}
        alt={item.title}
        width={100}
        height={100}
        className="max-w-full h-[90px] object-contain mx-auto"
      />
      <h2 className="mt-2 text-center font-bold line-clamp-1 text-sm lg:text-base">{item.title}</h2>
    </Link>
  );
};

export default ItemCard;
