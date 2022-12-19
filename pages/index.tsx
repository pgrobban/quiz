import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { Button } from "@mui/material";
import { NextRouter, withRouter } from "next/router";
import { useAppContext } from "../controllers/AppWrapper";

function Home({ router }: { router: NextRouter }) {

  const appContext = useAppContext();
  const { socket } = appContext;

  const handleNewGameClicked = () => {
    if (socket) {
      router.push('/new-game');
      socket.emit('new-game')
    } else {
      console.error("*** NO SOCKET...")
    }
  };

  return (
    <>
      <Head>
        <title>Robban&quot;s Pointless quiz</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h3>Robban&quot;s Pointless Quiz</h3>
        <Image src="/images/logo.png" alt="Logo" width={384} height={214} />
        <div className={styles.menu}>
          <Button variant="contained" style={{ width: 200, height: 50 }} onClick={handleNewGameClicked}>
            New game
          </Button>
          <Button variant="contained">Host</Button>
        </div>
      </main>
    </>
  );
}

export default withRouter(Home);
