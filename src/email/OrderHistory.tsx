import { Body, Container, Head, Text, Html, Preview, Tailwind, Hr } from "@react-email/components";
import { OrderDetails } from "./components/OrderDetails";
import React from "react";

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    createdAt: Date;
    pricePaidInPence: number;
    downloadVerificationId: string;
    product: {
      name: string;
      imagePath: string;
      description: string;
    };
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInPence: 10000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product name",
        description: "Some description",
        imagePath: "/products/5ab18c9c-5523-4371-9dc1-49aa535bdd87-itfc.jpeg",
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInPence: 5000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product name",
        description: "Some description",
        imagePath: "/products/5ab18c9c-5523-4371-9dc1-49aa535bdd87-itfc.jpeg",
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInPence: 17138284683264,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product name",
        description: "Some description",
        imagePath: "/products/5ab18c9c-5523-4371-9dc1-49aa535bdd87-itfc.jpeg",
      },
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History and Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Text className="font-bold text-2xl">Order History</Text>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderDetails
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
