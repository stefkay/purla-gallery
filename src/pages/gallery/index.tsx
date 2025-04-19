import {Product} from "@/interfaces/product";
import {sanityClient} from "@/sanity/lib/client";
import { urlFor } from '@/sanity/lib/imageUrl';
import {allProductsQuery} from "@/sanity/lib/queries";
import Link from 'next/link'
import Image from 'next/image'
import '@/styles/globals.scss'
import {useRouter} from "next/router";

export async function getStaticProps() {
    const products: Product[] = await sanityClient.fetch(allProductsQuery)
    return { props: { products } }
}

const Gallery = ({products}: {products: Product[]}) => {
    const { locale = 'en' } = useRouter()
    const currency = locale === 'bg' ? 'лв.' : '€';

    return (
        <div>
            {products.map((product) => (
                <div key={product._id}>
                        {product.images?.[0] && (
                            <Image
                                src={urlFor(product.images[0]).width(600).height(600).url()}
                                alt={product.title[locale]}
                                width={200}
                                height={200}
                                className="rounded"
                            />
                        )}
                        <Link href={`/gallery/${product.slug.current}`}><h2
                            className="text-xl mt-2">{product.title[locale]}</h2>
                        </Link>
                        <p className="text-gray-500">{product.price[locale]} {currency}</p>
                </div>
            ))}
        </div>
    )
}

export default Gallery;