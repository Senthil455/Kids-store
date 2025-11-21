import Link from "next/link";
import styles from "./order.module.css";
import Image from "next/image";

const Order = () => {
    return (
        <Link href={`/product/123`}className={styles.card}>
            <div>
                <div>
                    <p>  Order details</p>
                    <Image
                        width={200}
                        height={200}
                        src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
                        alt=""
                    />
                </div>
                <p> Completed</p>
            </div>
            <div>
                <p>8:00 2025/10/21</p>
                <p className={styles.price}>200000 $ </p>
            </div>
        </Link>
    );
};

export default Order;
