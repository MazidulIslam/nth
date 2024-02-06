import db from '../../../../utils/db';
import Deposit from '../../../../models/deposit';
import { NextResponse } from 'next/server';

export default async function POST(request) {
  const { title, description } = await request.body;
  await db.connectDb();
  await Deposit.create({ title, description });
  await db.disconnectDb();
  return NextResponse.json({ message: 'Deposit Created' }, { status: 201 });
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
