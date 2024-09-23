import Deposit from "../../../../models/deposit";
import db from "../../../../utils/db";
import { NextResponse } from "next/server";

export default async function POST(req, res) {
  const { name, amount, payment_method, transaction_id } = await req.body;
  await db.connectDb();

  const result = await Deposit.create({
    name,
    amount,
    payment_method,
    transaction_id,
  });
  console.log(result);
  // await Deposit.updateMany(
  //   {},
  //   {
  //     $set: {
  //       amount: 1000,
  //       payment_method: "Bkash",
  //       transaction_id: "Transaction1",
  //     },
  //   }
  // );
  await db.disconnectDb();
  res.status(200).json({ message: "Deposit created Successfully." });
  // return NextResponse.json({ message: "Deposit Created" }, { status: 201 }); // This NextResponse for edge runtime not for nodejs runtime
}

// export async function GET() {
//   await db.connectDb();
//   const deposits = await Deposit.find();
//   return NextResponse.json({ deposits });
// }

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get('id');
//   await db.connectDb();
//   await Deposit.findByIdAndDelete(id);
//   return NextResponse.json({ message: 'Deposit deleted' }, { status: 200 });
// }
