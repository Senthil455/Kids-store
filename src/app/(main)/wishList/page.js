import Breadcrumb from "@/components/modules/main/breadCrumb";
import { getMe } from "@/utils/serverHelper";
import { paginate } from "@/utils/helper";
import WishListItems from "@/components/template/main/wishList/wishListItems";
import ProductModel from "../../../../model/product";
import { redirect } from "next/navigation";
import FavoriteModel from "../../../../model/favorite";

export const metadata = {
    title: "Favorites List - Kids Store",
    description: "View your favorite products on Kids Store. Keep track of all items you love and save them for later.",
    keywords: ["Kids Store", "Favorites", "Wishlist", "Saved Products", "Shopping"],
    authors: [{ name: "Kids Store Team" }],
    openGraph: {
        title: "Favorites List - Kids Store",
        description: "View your favorite products on Kids Store. Keep track of all items you love and save them for later.",
        url: "https://yourwebsite.com/favorites",
        siteName: "Kids Store",
        images: [{ url: "https://yourwebsite.com/images/favorites-og.jpg", width: 1200, height: 630, alt: "Favorites List" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Favorites List - Kids Store",
        description: "View your favorite products on Kids Store. Keep track of all items you love and save them for later.",
        images: ["https://yourwebsite.com/images/favorites-og.jpg"],
    },
};

const page = async ({ searchParams }) => {
    const user = await getMe()
    if (!user) redirect("/login-register")

    const searchparams = searchParams

    const wishlist = await FavoriteModel.findOne({ user: user.id })
    if (!wishlist) return null

    const paginatedData = await paginate(ProductModel, searchparams, { _id: { $in: wishlist.products } })

    return (
        <div className="page-container">
            <Breadcrumb route="Favorites" title="Favorites List" />
            <WishListItems
                nextCursor={paginatedData.nextCursor}
                limit={paginatedData.limit}
                data={JSON.parse(JSON.stringify(paginatedData.data))}
            />
        </div>
    );
};

export default page;
