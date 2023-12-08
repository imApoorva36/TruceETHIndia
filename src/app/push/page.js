'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import s from './push.module.css';
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";

const ScoreboardPage = () => {
  const router = useRouter();// Creating a random signer from a wallet, ideally this is the wallet you will connect
  useEffect(() => {
    async function fetchpush() {
      try {
        
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });
            const response = await userAlice.channel.send(["*"], {
                notification: {
                title: "hahahaha this is my what do u think uh, ahahahahhaahaha awesome notification",
                body: "from your amazing protocol",
                },
            });

            if (response.ok) {
            // const data = await response.json();
            
            } else {
            console.error('Error in data of notification :', response.status);
            }
        } else {
            console.error("MetaMask is not installed");
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
