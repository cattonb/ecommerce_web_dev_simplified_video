import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatNumber, formatCurrency } from "@/lib/formatters";
import React from "react";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInPence: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInPence || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInPence: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0 ? 0 : (orderData._sum.pricePaidInPence || 0) / userCount / 100,
  };
}

async function getProductData() {
  const [activeCount, inActiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return {
    activeCount,
    inActiveCount,
  };
}

const AdminPage = async () => {
  const [salesDate, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subTitle={`${formatNumber(salesDate.numberOfSales)} Orders`}
        body={formatCurrency(salesDate.amount)}
      />
      <DashboardCard
        title="Customers"
        subTitle={`${formatCurrency(userData.averageValuePerUser)} Average Value`}
        body={formatNumber(userData.userCount)}
      />
      <DashboardCard
        title="Active Products"
        subTitle={`${formatNumber(productData.inActiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  subTitle: string;
  body: string;
}

function DashboardCard({ title, subTitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}

export default AdminPage;
