import styles from './styles.module.scss';
import { useState } from 'react';
import { MdSecurity } from 'react-icons/md';
import { BsSuitHeart } from 'react-icons/bs';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';
import UserMenu from './UserMenu';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Top({ country }) {
  const { data: session } = useSession();
  const [loggedIn, setLoggedIn] = useState(true);
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <span>
              <Link className="bg-white p-2" href={'/addDeposit'}>
                Deposit
              </Link>{' '}
            </span>
          </li>

          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {session ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <Image
                    src={session?.user.image}
                    // src="https://www.seekpng.com/png/full/138-1388103_user-login-icon-login.png"
                    alt=""
                    width={28}
                    height={28}
                  />
                  <span>{session?.user.name}</span>

                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>

                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {visible && <UserMenu loggedIn={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
