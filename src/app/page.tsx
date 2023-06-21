import axios from "axios";
import { cookies } from "next/headers";

const getUser = async (): Promise<IUser | null> => {
  try {
    const response = await fetch(`${process.env.domain}/api/users/me`, {
      cache: "no-store",
      headers: {
        Cookie: `token=${cookies().get("token")?.value}`,
      },
    });

    const jsonResponse = await response.json();

    if (response.status !== 200) {
      throw new Error(jsonResponse.error);
    }

    return jsonResponse.data;
  } catch (error) {
    return null;
  }
};

const Home = async () => {
  const user = await getUser();
  return (
    <div>
      <h1>Heyyy {user?.userName}</h1>
      <h1>Welcome To NEXT JS AUTHENTICATION</h1>
    </div>
  );
};

export default Home;
