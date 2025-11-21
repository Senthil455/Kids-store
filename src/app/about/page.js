import styles from "@/styles/about-us.module.css";
import Navbar from "@/components/modules/navbar/navbar";
import Banner from "@/components/template/index/banner/banner";
import Breadcrumb from "@/components/modules/breadCrumb/breadCrumb";
import Footer from "@/components/modules/footer/footer";

const page = async () => {
    return (
        <>
            <Navbar />
            <Banner />
            <Breadcrumb title={
                "About US."} />
            <div className={styles.container}>
                <section>
                    <div>
                        <span>About Us</span>
                        <p>Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.</p>
                    </div>
                    <p>
                        Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                    </p>
                    <p>
                        Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                    </p>
                </section>
                <main className={styles.main}>
                    <div>
                        <p>
                            Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                        </p>
                        <p>
                            Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                        </p>
                        <p>
                            Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                        </p>
                        <p>Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.</p>
                    </div>
                    <div>
                        <span>Kids Store</span>
                        <h2>Kids Store</h2>
                        <p>
                            Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                        </p>
                        <p>
                            Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                        </p>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default page;
