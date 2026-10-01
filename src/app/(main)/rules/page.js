import Breadcrumb from "@/components/modules/main/breadCrumb";
import Image from "next/image";
import connectToDB from "@/configs/db";
import { getInfo } from "@/services/public/info";

export const metadata = {
    title: "Terms & Rules | Kids Store",
    description: "Shopping rules, delivery and return policy of Kids Store.",
};

const page = async () => {
    await connectToDB();
    // contact line comes from model/info (same service as GET /api/info)
    const info = await getInfo().catch(() => null);

    return (
        <div className="page-container">
            <Breadcrumb route="rules" title="Terms & Rules" />
            <div className="grid grid-cols-1 justify-between gap-8 text-text dark:text-gray-100 md:grid-cols-[40%_1fr]">
                <Image
                    width={600}
                    height={600}
                    alt=""
                    src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
                    className="h-[260px] w-full rounded-2xl object-cover shadow-card sm:h-[380px] md:h-full"
                />
                <div data-aos="fade-up">
                    <p className="mb-0 text-justify leading-7">
                        Please review our shopping rules before placing an order. We aim to keep every purchase clear, fair, and easy to understand.
                    </p>
                    <p className="mb-5 text-justify leading-7">
                        Please review our shopping rules before placing an order. We aim to keep every purchase clear, fair, and easy to understand.
                        <strong className="mt-2 block">Response During Business Hours</strong>
                    </p>
                    <p className="mb-5 text-justify leading-7">Please review our shopping rules before placing an order. We aim to keep every purchase clear, fair, and easy to understand.</p>
                    <p className="mb-5 text-justify leading-7">If You Have Any Questions ,Please Contact Us Using The Information Below :</p>
                    {info?.phone && (
                        <p className="mb-2 text-justify leading-7">Phone: {info.phone}</p>
                    )}
                    {info?.email && (
                        <p className="mb-5 text-justify leading-7">Email: {info.email}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default page;
