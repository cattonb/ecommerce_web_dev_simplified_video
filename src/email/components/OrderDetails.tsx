import { formatCurrency } from "@/lib/formatters";
import { Button, Column, Img, Row, Section, Text } from "@react-email/components";

type OrderDetailsProps = {
  order: {
    id: string;
    createdAt: Date;
    pricePaidInPence: number;
  };
  product: {
    imagePath: string;
    name: string;
    description: string;
  };
  downloadVerificationId: string;
};

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export function OrderDetails({ order, product, downloadVerificationId }: OrderDetailsProps) {
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Order Id</Text>
            <Text className="mt-0 mr-4">{order.id}</Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Purchased On
            </Text>
            <Text className="mt-0 mr-4">{dateFormatter.format(order.createdAt)}</Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Price Paid
            </Text>
            <Text className="mt-0 mr-4">{formatCurrency(order.pricePaidInPence / 100)}</Text>
          </Column>
        </Row>
      </Section>
      <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my4">
        <Img
          width={"100%"}
          alt={product.name}
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`}
        />
        <Row className="mt-8">
          <Column className="align-bottom">
            <Text className="text-lg font-bold m-0 mr-4">{product.name}</Text>
          </Column>
          <Column align="right">
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`}
              className="bg-black text-white px-6 py-4 rounded-lg text-lg">
              Download
            </Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text className="mb-0 text-gray-500">{product.description}</Text>
          </Column>
        </Row>
      </Section>
    </>
  );
}
