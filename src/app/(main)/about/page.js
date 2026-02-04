import styles from "@/styles/about-us.module.css";
import Breadcrumb from "@/components/modules/breadCrumb/breadCrumb";

export async function generateMetadata() {
    return {
        title: "About Us - Your Company Name",
        description: "Learn more about our story, mission, and values. We are dedicated to delivering high-quality products with a focus on customer satisfaction.",
        openGraph: {
            title: "About Us - Your Company Name",
            description: "Learn more about our story, mission, and values.",
            url: "https://yourdomain.com/about",
            siteName: "Your Company Name",
            images: [
                {
                    url: "https://yourdomain.com/images/about-og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: "About Us",
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "About Us - Your Company Name",
            description: "Learn more about our story, mission, and values.",
            images: ["https://yourdomain.com/images/about-og-image.jpg"],
        },
    };
}

const page = async () => {
    return (
        <>
            <Breadcrumb title={"About US."} />
            <div className={styles.container}>
                <div>
                    <span>About Us</span>
                    <h3>Kids Store</h3>
                    <p>
                        Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                    </p>
                </div>
                <div className={styles.main}>
                    <div>
                        <p>
                            Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                        </p>
                    </div>
                    <div>
                        <span>Kids Store</span>
                        <h3>Kids Store</h3>
                        <p>
                            Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
