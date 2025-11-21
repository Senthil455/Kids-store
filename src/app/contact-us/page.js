import Breadcrumb from "@/components/modules/breadCrumb/breadCrumb";
import styles from "@/styles/contact-us.module.css";
import Navbar from "@/components/modules/navbar/navbar";
import Footer from "@/components/modules/footer/footer";
import Form from "@/components/template/contactUs/form/Form";
import Map from "@/components/template/contactUs/form/map";
import Image from "next/image";
const page = async () => {

    return (
        <>
            <Navbar />
            <Breadcrumb route={"Contact-Us"} title={"ContactUs"} />
            <div className={styles.container}>
                <div className={styles.contents}>
                    <Image
                        width={200}
                        height={200}
                        alt="Slide"
                        priority
                        sizes="100vw"
                        fetchPriority="high"
                        src={"https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"}
                    />
                    <Form />
                </div>
                <div>
                    <Map />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default page;
