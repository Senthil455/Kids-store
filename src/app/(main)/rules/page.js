import Breadcrumb from "@/components/modules/breadCrumb/breadCrumb";
import styles from "@/styles/rules.module.css";
import Image from "next/image";

const page = async () => {
    return (
        <>
            <Breadcrumb route={"rules"} title={"Rules"} />
            <div className={styles.container_rules}>
                <Image
                    width={600}
                    height={600}
                    alt=""
                    src={"https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"}
                />
                <div className={styles.container} data-aos="fade-up">
                    <p>
                        Please review our shopping rules before placing an order. We aim to keep every purchase clear, fair, and easy to understand.
                    </p>
                    <p>
                        Please review our shopping rules before placing an order. We aim to keep every purchase clear, fair, and easy to understand.
                        <strong>
                            Response During Business Hours
                        </strong>
                    </p>
                    <p>
                        Please review our shopping rules before placing an order. We aim to keep every purchase clear, fair, and easy to understand.</p>
                    <p>
                        If You Have Any Questions ,Please Contact  Us Using The Information Below :
                    </p>
                    <p>Contact Phone And Fax : +1(940) 3001175</p>
                </div>
            </div>
        </>
    );
};

export default page;
