import type { Metadata } from "next";
import ProductsCatalogue from "@/components/products/ProductsCatalogue";
import { getProductsMetadata, getProductsJsonLd } from "./seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getProductsMetadata({ locale: params.locale });
}

export default function ProductsPage({ params }: Props) {
  const jsonLd = getProductsJsonLd(params.locale);
  return <ProductsCatalogue locale={params.locale} jsonLd={jsonLd} />;
}
