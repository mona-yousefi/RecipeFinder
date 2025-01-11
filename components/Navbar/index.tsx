import Link from "next/link";
import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.listItem}>
          <Link href="/" className={styles.items}>
            Home
          </Link>
          <Link href="./favorites" className={styles.items}>
            Favorites
          </Link>
          <Link href="./about-us" className={styles.items}>
            About Us
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
