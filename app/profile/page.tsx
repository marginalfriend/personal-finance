import { user } from "../cashflow-tables/actions";

export default async function Page() {
  const userr = await user();

  return <h1>{userr}</h1>;
}
