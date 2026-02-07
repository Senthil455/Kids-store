import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from "./categories.module.css"

export default function Categories() {
    return (
        <div className="container">
            <div className={styles.category_header}
                data-aos="fade-left">
                <div className={styles.category_header__img}>
                    <Image
                        width={200}
                        height={200}
                        src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
                        alt="" />

                </div>
                <h2 className={styles.category_header__title}>Categorie</h2>
            </div>

            <div className={styles.categories_container}
                data-aos="fade-right">
                <div
                    className={styles.category_box}>
                    <div className={styles.category_box__title}>
                        <small>Kids</small>
                        <h3>Girls & Boys</h3>
                    </div>
                    <div className={styles.category_box__img}>
                        <Link href={`/products?category=Kids`}>
                            <Image
                                width={200}
                                height={200}
                                src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
                                className="avatar-image img-fluid"
                                alt="" />
                        </Link>
                    </div>
                </div>

                <div
                    className={styles.category_box}>
                    <div className={styles.category_box__title}>
                        <small>Toddlers</small>
                        <h3>Girls & Boys</h3>
                    </div>
                    <div className={styles.category_box__img}>
                        <Link href={`/products?category=Toddelers`}>
                            <Image
                                width={200}
                                height={200}
                                src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
                                className="avatar-image img-fluid"
                                alt="" />
                        </Link>
                    </div>
                </div>
                <div
                    className={styles.category_box}>
                    <div className={styles.category_box__title}>
                        <small>Shoes</small>
                        <h3>Girls & Boys</h3>
                    </div>
                    <div className={styles.category_box__img}>
                        <Link href={`/products?category=Shoes`}>
                            <Image
                                width={200}
                                height={200}
                                src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
                                className="avatar-image img-fluid"
                                alt="" />
                        </Link>
                    </div>
                </div>
                <div
                    className={styles.category_box}>
                    <div className={styles.category_box__title}>
                        <small>Baby</small>
                        <h3>Girls & Boys</h3>
                    </div>
                    <div className={styles.category_box__img}>
                        <Link href={`/products?category=Baby`}>
                            <Image
                                width={200}
                                height={200}
                                src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
                                className="avatar-image img-fluid"
                                alt="" />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
