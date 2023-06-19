import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "../../styles/components/Account/Profile.module.css";
import photoNotFound from "../../public/photoNotFound.png";

const Profile: React.FC = () => {
  // Assume user data is available
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    photo: photoNotFound,
    // Additional user data
  };

  return (
    <div className={styles.profile}>
      <div className={styles.imageProfile}>
        <Image
          src={user.photo}
          alt=""
          width={150}
        />
      </div>
      <div className={styles.userInfo}>
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
      </div>

      {/* Additional user details */}
      <Link href="./account/settings">Настройки профиля</Link>
    </div>
  );
};

export default Profile;
