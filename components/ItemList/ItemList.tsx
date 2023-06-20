import React from "react";
import ItemCard from "./ItemCard";
import styles from "../../styles/components/ItemList.module.css";
import Rectangle12 from "../../public/users/Rectangle12.png";
import photo from "../../public/users/photo";

const data = [
  {
    id: 1,
    title: "Fjallraven - Foldsack  ",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
    userImage: photo.Rectangle12,
    ownerName: "Inga",
  },
  {
    id: 2,
    title: "Mens Casual",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
    userImage: photo.Rectangle13,
    ownerName: "Sveta",
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
    userImage: photo.Rectangle14,
    ownerName: "Angel",
  },
  {
    id: 4,
    title: "Mens Casual ",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 },
    userImage: photo.Rectangle15,
    ownerName: "Sweet",
  },
  {
    id: 5,
    title: "Gold & Silver Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelry",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 },
    userImage: photo.Rectangle16,
    ownerName: "Sonya",
  },
  {
    id: 6,
    title: "Solid Gold Petite",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelry",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 },
    userImage: photo.Rectangle18,
    ownerName: "Victoria",
  },
  {
    id: 7,
    title: "White Gold Plated",
    price: 9.99,
    description: "Classic  Diamond Promise Ring for Her",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3, count: 400 },
    userImage: photo.Rectangle19,
    ownerName: "Eva",
  },
  {
    id: 8,
    title: "Pierced Owl Rose ",
    price: 10.99,
    description: "Rose Gold Plated  Steel",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 1.9, count: 100 },
    userImage: photo.Rectangle31,
    ownerName: "Vera",
  },
  {
    id: 9,
    title: "WD Hard Drive USB3.0",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 3.3, count: 203 },
    userImage: photo.Rectangle33,
    ownerName: "Natally",
  },
];

interface ItemListProps {
  items: any;
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div>
      <div className={styles.itemList}>
        {data.map((item: { id: React.Key | null | undefined }) => (
          <ItemCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
