import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { Button } from "@mui/material";
import { useAppContext } from "../controllers/AppWrapper";
import CountdownBar from "../components/CountdownBar";

function Home() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;

  return (
    <>
      <Head>
        <title>Robban&apos;s Pointless quiz</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${styles.background}`}>
        <h2>Robban&apos;s Pointless Quiz</h2>
        <Image src="/images/logo.png" alt="Logo" width={384} height={214} />
        <div className={styles.menu}>
          <Button variant="contained" style={{ width: 200, height: 50 }} onClick={() => gameHandler.requestNewGame()}>
            New game
          </Button>
          <Button variant="contained" onClick={() => gameHandler.requestToBeHost()}>Host</Button>
        </div>
      </main>
      <CountdownBar to={0} callback={() => {}}/>
    </>
  );
}

export default Home;
