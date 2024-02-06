import Link from 'next/link';
import styles from './styles.module.scss';

import React from 'react';

export default function Ad() {
  return (
    <Link href="/browse">
      <div className={styles.ad}></div>
    </Link>
  );
}
