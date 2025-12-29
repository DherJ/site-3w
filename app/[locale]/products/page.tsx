
import ProductsCatalogue from "@/components/products/ProductsCatalogue";

export default function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {

  const locale = params.locale;

  return (
    <ProductsCatalogue locale={locale} />
  );
}
