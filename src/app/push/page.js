'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import s from './push.module.css';
import { useCookies } from 'react-cookie';
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";

const ScoreboardPage = () => {
  useAuth();
  const router = useRouter();// Creating a random signer from a wallet, ideally this is the wallet you will connect
  const signer = ethers.Wallet.createRandom();
  useEffect(() => {
    async function fetchpush() {
      try {
        const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });
        const response = await userAlice.channel.send(["*"], {
            notification: {
              title: "You awesome notification",
              body: "from your amazing protocol",
            },
        });

        if (response.ok) {
          const data = await response.json();
          
        } else {
          console.error('Error in data of notification :', response.status);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
    fetchpush();
  }, [router]);

  return (
    <main className={`${s.scoreboard} pd-top`}>
    </main>
  );
};

export default ScoreboardPage;
