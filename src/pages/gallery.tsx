import {Product} from "@/interfaces/product";
import {sanityClient} from "@/sanity/lib/client";
import { urlFor } from '@/sanity/lib/imageUrl';
import {allProductsQuery} from "@/sanity/lib/queries";
import Link from 'next/link'
import Image from 'next/image'

export async function getStaticProps() {
    const products: Product[] = await sanityClient.fetch(allProductsQuery)
    return { props: { products } }
}

const Gallery = ({products}: {products: Product[]}) => {
    console.log(products)

    return (
        <div>
            {products.map((product) => (
                <Link key={product._id} href={`/products/${product.slug.current}`}>
                    <div className="border rounded p-4 hover:shadow-lg transition">
                        {product.images?.[0] && (
                            <Image
                                src={urlFor(product.images[0]).width(600).height(600).url()}
                                alt={product.title.en}
                                width={600}
                                height={600}
                                className="rounded"
                            />
                        )}
                        <h2 className="text-xl mt-2">{product.title.en}</h2>
                        <p className="text-gray-500">{product.price.en}</p>
                        <p className="text-gray-500">{product.description.en}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Gallery;