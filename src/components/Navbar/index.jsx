import styles from './styles.module.scss';
import { useState } from 'react';

export default function Navbar() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.navbar}>
        <div className={isOpen ? [`${styles.navbarButtonClose} ${styles.navbarButton}`] : styles.navbarButton} onClick={() => {setIsOpen(!isOpen)}} />
        <div className={isOpen ? [`${styles.navbarSubmenu} ${styles.navbarSubmenuVisible}`] : styles.navbarSubmenu}>
            <ul>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
            </ul>
        </div>
    </div>
  )
}
