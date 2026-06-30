import { Category } from "@/types/category";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SingleItem = ({ item }: { item: Category }) => {
  return (
    <Link href={`/shop?category=${item.slug}`} className="group flex flex-col items-center">
      <div className="max-w-[130px] w-full bg-gray-2 h-32.5 rounded-xl flex items-center justify-center mb-4 border border-neutral-200 ring-1 ring-neutral-300 ring-offset-2 md:ring-offset-4 my-4"
        style={{
          backgroundImage: `
        radial-gradient(circle 60px at 0% 50px, #c4e0ff, transparent),
        radial-gradient(circle 60px at 100% 50px, #c4e0ff, transparent)
      `,
        }}
>
        <Image src={item.img} alt="Category" width={82} height={62} />
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
          {item.title}
        </h3>
      </div>
    </Link>
  );
};

export default SingleItem;
