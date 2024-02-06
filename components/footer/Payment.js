import Image from 'next/image';
import styles from './styles.module.scss';

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
      <h3>WE ACCEPT</h3>
      <div className={styles.footer__flexwrap}>
        <Image
          src="/images/payment/visa.webp"
          alt="viscard"
          width={60}
          height={36}
        />
        <Image
          src="/images/payment/mastercard.webp"
          alt="mastercard"
          width={60}
          height={36}
        />
        <Image
          src="/images/payment/paypal.webp"
          alt="paypal"
          width={60}
          height={36}
        />
        {/* <img src="/images/payment/visa.webp" alt="visa-card" />
        <img src="/images/payment/mastercard.webp" alt="master-card" />
        <img src="/images/payment/paypal.webp" alt="visa-card" /> */}
      </div>
    </div>
  );
}
