import Link from "next/link";
import styles from "@/components/template/index/promote/promote.module.css";
import Image from "next/image";

const Promote = () => {
    return (
        <div className="container">
            <div className={styles.main}>
                <div className={styles.club_container}
                    data-aos="fade-up-right">
                    <div className={styles.img_container}>
                        <Image
                            width={400}
                            height={400}
                            data-aos="fade-left"
                            src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80" alt="" />
                    </div>
                    <div className={styles.club}>
                        <div>
                            <span>Kids Store Club</span>
                            <p> Royal Customers Of Kids Store</p>
                        </div>
                    </div>
                </div>
                <div
                    data-aos="fade-up-left"
                    className={styles.kid_container}>
                    <div className={styles.why_kid}>
                        <p className={styles.title}>Why Kids Store ?</p>
                        <p>
                            With years of experience and feedback from parents Kids Store offer a wide range of stylish and comfortable childrens clothing
                            .our mission is to make shopping easier for families by provoding trendy,high quality outfits at affordable prices
                        </p>

                        <div>
                            <Link href="/about-us">
                                <button className={styles.red_btn}>
                                    About US
                                </button>
                            </Link>
                            <Link href="/category">
                                <button>Store</button>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.img_container}>
                        <Image
                            width={400}
                            height={400} src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Promote;
