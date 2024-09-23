import styles from "../styles/Home.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import TopicsList from "../../components/TopicsList";
import Navbar from "../../components/Navbar";
import Layout from "../../components/layout";

export default function Home({ country }) {
  const { data: session } = useSession();
  console.log(session);
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  return (
    <>
      {session ? (
        // <Layout>
        <div>
          <Header country={country} />
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
          {/* <Footer country={country} /> */}
        </div>
      ) : (
        // </Layout>
        // <Layout>
        <div>
          <Header country={country} />
          {/* <Navbar />
            <div className={styles.home}>
              <div className={styles.container}>
                <TopicsList />
              </div>
            </div> */}
          <div className="flex">
            <h1>Not signed in</h1> <br />
            <button onClick={() => signIn()}>Sign in</button>
          </div>
          <Footer country={country} />
        </div>
        // </Layout>
      )}
    </>
  );
}

export async function getServerSideProps() {
  let data = await axios
    .get(`https://api.ipregistry.co/?key=${process.env.COUNTRY_API}`)
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      // country: { name: data.name, code: data.code, flag: data.flag.emojitwo },
      country: {
        name: "Bangladesh",
        code: "BD",
        flag: "https://www.seekpng.com/png/full/270-2704243_quality-hd-good-photos-of-bangladesh-flag-bangladesh.png",
      },
    },
  };
}
