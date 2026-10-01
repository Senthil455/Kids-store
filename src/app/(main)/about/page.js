import Breadcrumb from "@/components/modules/main/breadCrumb";

export const metadata = {
    title: "About Us | Kids Store",
    description: "Our story, mission and values.",
    openGraph: {
        title: "About Us | Kids Store",
        description: "Our story, mission and values.",
        type: "website",
    },
};

const page = async () => {
    return (
        <div className="page-container text-text dark:text-gray-100">
            <Breadcrumb route="about" title="About Us" />
            <div>
                <div>
                    <span className="text-sm font-semibold text-coral-400">About Us</span>
                    <h3 className="my-2.5 text-2xl font-bold sm:text-3xl">Kids Store</h3>
                    <p className="leading-8 text-gray-700 dark:text-gray-300">
                        Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-14 md:grid-cols-2 md:gap-12 lg:mt-16">
                    <div>
                        <p className="leading-8 text-gray-700 dark:text-gray-300">
                            Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                        </p>
                    </div>
                    <div className="rounded-2xl bg-coral-300 p-6 text-white shadow-card sm:p-10">
                        <span className="text-sm font-semibold text-white/85">Kids Store</span>
                        <h3 className="my-2.5 text-2xl font-bold sm:text-3xl">Kids Store</h3>
                        <p className="mt-4 leading-8">
                            Kids Store brings families a thoughtful selection of products for children. We focus on quality, friendly service, and a simple shopping experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
