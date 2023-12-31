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
          // had to add this line to make authentication work
        //   await window.ethereum.enable()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });
            // userAlice.channel.create({options})
            console.log(userAlice);


             // Create a channel
            // const response = await userAlice.channel.create({
            //   name: "nitk-Channel-for-testing",
            //   description: "Test Description for nitk team push testing",
            //   icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC",
            //   url: "https://push.org",
            // });

            // List inbox notifications
            const inboxNotifications = await userAlice.notification.list("INBOX");

            // List spam notifications
            const spamNotifications = await userAlice.notification.list("SPAM");


              // creates channel settings
            // const createChannelSettingRes = userAlice.channel.settings([
            //   {
            //     type: 1, // Boolean type
            //     default: 1,
            //     description: "Receive marketing notifications",
            //   },
            //   {
            //     type: 1, // Boolean type
            //     default: 1,
            //     description: "Receive profit notifications",
                
            //   },
            // ]);

            // creates channel settings
            // const createChannelSettingRes = await userAlice.channel.setting([
            //     {
            //     type: 1, // Boolean type
            //     default: 1,
            //     description: "Receive marketing notifications",
            //     },
            //     {
            //     type: 2, // Slider type
            //     default: 10,
            //     description: "Notify when loan health breaches",
            //     data: { upper: 100, lower: 5, ticker: 1 },
            //     },
            // ]);


            // extracting channel address . To be passed to the subscriber
            const channelInfo = await userAlice.channel.info();
            const channelAddress = channelInfo.channel;

                //creating group chat variables
                const groupName = "Example Group nitk 2 ";
                const groupDescription = "This is an example group.";
                const groupImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC"; // example base64 encoded image string
                //Wallet address of  subscribers 
                const walletAddress1 = "0x40ead570f73f472a95D57Bd95d3792E837C9b51E";
    
    
    
                // You can have an array of wallet addresses as members 
    
                const newGroup = await userAlice.chat.group.create(groupName,
                  {
                    description: groupDescription,
                    image: groupImage,
                    members: [walletAddress1],
                    admins: [],
                    private: false,
                    rules: {
                      entry: { conditions: [] },
                      chat: { conditions: [] },
                    },
                  },
                );
                
    
                //Group chatId . To be used for sending messages . This is even needed by the subscriber to send messages in the group 
                // chatID can be directly taken from DApp too 
    
                const groupChatId = newGroup.chatId;
                console.log("groupChatId =  ",groupChatId);
    
    
              // message to be sent to the group
                const sendGroupMessage = await userAlice.chat.send(groupChatId, {
                  type: "Text",
                  content: "Hello  this is my first messsage in group chat ",
                });
    
               // collect  messages  of the group 

               //change the value of 'tempGroupChatID' to the groupChatId  required by you . DONT HARDCOE
    
               const tempGroupChatID = "5b9b6346c8082d9beb121f080d103e709d31ed26f3dc882f592741beb8a55784"
              // Fetches historical messages between your instantiated user and any other user (or group). This gets you alll the messsages
    
                const groupMessages = await userAlice.chat.history(tempGroupChatID);
                console.log("groupMessages = ",groupMessages);
    
    
    
    
               
            const response1 = await userAlice.channel.send(["*"], {
                notification: {
                title: "notificaiton after receiving a sender ",
                body: "did it late night ",
                },
                //Targeting the specific notification setting
                payload: {
                  category: "1",  // Add the specific notification category 
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
