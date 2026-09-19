import Breadcrumb from "@/components/modules/main/breadCrumb";
import Form from "@/components/template/main/contact-us/Form";
import Map from "@/components/template/main/contact-us/map";
import Image from "next/image";

export const metadata = {
    title: "Contact Us - Kids Store",
    description: "Get in touch with Kids Store. Reach out for questions, feedback, or support. We'd love to hear from you!",
    keywords: ["Kids Store", "Contact", "Support", "Feedback", "Customer Service"],
    authors: [{ name: "Kids Store Team" }],
    openGraph: {
        title: "Contact Us - Kids Store",
        description: "Get in touch with Kids Store. Reach out for questions, feedback, or support.",
        url: "https://yourwebsite.com/contact",
        siteName: "Kids Store",
        images: [{ url: "https://yourwebsite.com/images/contact-og.jpg", width: 1200, height: 630, alt: "Contact Kids Store" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us - Kids Store",
        description: "Get in touch with Kids Store. Reach out for questions, feedback, or support.",
        images: ["https://yourwebsite.com/images/contact-og.jpg"],
    },
};

const page = async () => {
    return (
        <div className="page-container text-text dark:text-gray-100">
            <Breadcrumb route="Contact-Us" title="ContactUs" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                <div className="flex flex-col items-center justify-center gap-6">
                    <Image
                        width={200}
                        height={200}
                        alt="Slide"
                        priority
                        sizes="100vw"
                        fetchPriority="high"
                        src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
                        className="h-[140px] w-full object-contain sm:h-[180px]"
                    />
                    <Form />
                </div>
                <div className="h-[350px] overflow-hidden rounded-2xl shadow-card sm:h-[450px] md:h-full">
                    <Map />
                </div>
            </div>
        </div>
    );
};

export default page;
