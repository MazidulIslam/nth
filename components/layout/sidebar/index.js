import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
//-----------------------
import {
  MdArrowForwardIos,
  MdOutlineCategory,
  MdSpaceDashboard,
} from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { IoListCircleSharp, IoNotificationsSharp } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import { FaThList } from "react-icons/fa";
import { BsPatchPlus } from "react-icons/bs";
import {
  RiCoupon3Fill,
  RiLogoutCircleFill,
  RiSettingsLine,
} from "react-icons/ri";
//-----------------------
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toggleSidebar } from "../../../store/ExpandSlice";
import AddDeposit from "@/pages/deposit";
export default function Sidebar() {
  const router = useRouter();
  const route = router.pathname.split("/")[1];
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const expand = expandSidebar.expandSidebar;
  const handleExpand = () => {
    dispatch(toggleSidebar());
  };
  return (
    <div className={`${styles.sidebar} ${expand ? styles.opened : ""}`}>
      <div className={styles.sidebar__toggle} onClick={() => handleExpand()}>
        <div
          style={{
            transform: `${expand ? "rotate(180deg)" : ""}`,
            transition: "all .2s",
          }}
        >
          <MdArrowForwardIos />
        </div>
      </div>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__header}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.sidebar__user}>
          <img src={session?.user?.image} alt="" />
          <div className={styles.show}>
            <span>Welcome back 👋</span>
            <span>{session?.user?.name}</span>
          </div>
        </div>
        <ul className={styles.sidebar__list}>
          <li className={route == undefined ? styles.active : ""}>
            <Link href="/">
              <MdSpaceDashboard />
              <span className={styles.show}>Dashboard</span>
            </Link>
          </li>
          <li className={route == "deposit" ? styles.active : ""}>
            <Link href="/deposit">
              <FcSalesPerformance />
              <span className={styles.show}>
                {/* <AddDeposit /> */}
                Deposit
              </span>
            </Link>
          </li>
          <li className={route == "investment" ? styles.active : ""}>
            <Link href="/investment">
              <IoListCircleSharp />
              <span className={styles.show}>Investment</span>
            </Link>
          </li>
          <li className={route == "profit" ? styles.active : ""}>
            <Link href="/profit">
              <AiFillMessage />
              <span className={styles.show}>Profit</span>
            </Link>
          </li>
          <li className={route == "user" ? styles.active : ""}>
            <Link href="/user">
              <ImUsers />
              <span className={styles.show}>Users</span>
            </Link>
          </li>
        </ul>
        {/* <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Product</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li className={route == "product/all" ? styles.active : ""}>
              <Link href="/admin/dashboard/product/all">
                <FaThList />
                <span className={styles.show}>All Products</span>
              </Link>
            </li>
            <li className={route == "product/create" ? styles.active : ""}>
              <Link href="/admin/dashboard/product/create">
                <BsPatchPlus />
                <span className={styles.show}>Create Product</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Categories / Subs</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li className={route == "categories" ? styles.active : ""}>
              <Link href="/admin/dashboard/categories">
                <MdOutlineCategory />
                <span className={styles.show}>Categories</span>
              </Link>
            </li>
            <li className={route == "subCategories" ? styles.active : ""}>
              <Link href="/admin/dashboard/subCategories">
                <div style={{ transform: "rotate(180deg)" }}>
                  <MdOutlineCategory />
                </div>
                <span className={styles.show}>Sub-Categories</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Coupons</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li className={route == "coupons" ? styles.active : ""}>
              <Link href="/admin/dashboard/coupons">
                <RiCoupon3Fill />
                <span className={styles.show}>Coupons</span>
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <ul
            className={`${styles.sidebar__list} ${
              expand ? styles.nav_flex : ""
            }`}
          >
            <li>
              <Link href="">
                <RiSettingsLine />
              </Link>
            </li>
            <li>
              <Link href="">
                <IoNotificationsSharp />
              </Link>
            </li>
            <li>
              <Link href="">
                <AiFillMessage />
              </Link>
            </li>
            <li>
              <Link href="">
                <RiLogoutCircleFill />
              </Link>
            </li>
          </ul>
        </nav> */}
      </div>
    </div>
  );
}
