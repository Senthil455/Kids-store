import React from 'react'
import styles from "./promoText.module.css"
export default function PromoText() {
    return (
        <div className={styles.container}>
            <video
                autoPlay
                muted
                width={700}
                loop
                src="https://videos.pexels.com/video-files/6300728/6300728-hd_1280_720_25fps.mp4">
            </video>
            <div className={styles.promo_title}>
                <span> Buy Kids Clothes,in a Proffesional Style.</span>
                <p>Dress your little ones beatifully today with Kids Store</p>
            </div>
        </div>
    )
}
