import Image from "next/image";
import style from "./styles.module.scss";
import {
  AnalyticsIcon,
  ArrowRight,
  BondHiveLogo,
  ChervonUp,
  EarnIcon,
  EthLogo,
  InvestIcon,
  StellarLogo,
} from "../assets";
import { GridLight, LightRay } from "../assets/bg";
import Link from "next/link";
import { connectWallet } from "../web3Function/freighter";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  isConnected,
  getPublicKey,
  signAuthEntry,
  signTransaction,
  signBlob,
  isAllowed,
  setAllowed,
  requestAccess,
} from "@stellar/freighter-api";
// import {
//   StellarWalletsKit,
//   WalletNetwork,
//   WalletType,
//   ISupportedWallet,
// } from "stellar-wallets-kit";
import {
  FreighterModule,
  ISupportedWallet,
  StellarWalletsKit,
  WalletNetwork,
  FREIGHTER_ID,
  allowAllModules,
  xBullModule,
} from "@creit.tech/stellar-wallets-kit";
import UseStore from "@/store/UseStore";
import { ERRORS } from "@/app/helpers/error";
import { Contract, TransactionBuilder } from "@stellar/stellar-sdk";
import {
  BASE_FEE,
  accountToScVal,
  getServer,
  getTxBuilder,
  simulateTx,
} from "@/app/helpers/soroban";
import { provider } from "../web3Function/soroban";
import { TESTNET_DETAILS } from "@/app/helpers/network";
import Loading from "../UI-assets/loading";
import { pool } from "@/app/constants/poolOptions";
import { formatFigures } from "../web3FiguresHelpers";

export const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: FREIGHTER_ID,
  modules: allowAllModules(),
});

const DAppHeader = () => {
  // const [isConnected, setIsConnected] = useState<any>(false)
  // if (await isConnected()) {
  //   alert("User has Freighter!");
  // }
  const {
    setConnectorWalletAddress,
    connectorWalletAddress,
    userBalance,
    setUserBalance,
    setSelectedNetwork,
    transactionsStatus
  } = UseStore();
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [connectionError, setConnectionError] = React.useState(
    null as string | null
  );
  const [selectedNetwork] = React.useState(TESTNET_DETAILS);
  const connectWallet = async () => {
    const isAllowed = await setAllowed();
    if (isAllowed) {
      alert("Successfully added the app to Freighter's Allow List");
    }
    return isConnected;
  };

  const retrievePublicKey = async () => {
    if (!(await isAllowed())) {
      await connectWallet();
    }
    const checkIsConnected = await isConnected();
    const previouslyAuthorized = await isAllowed();

    try {
      if (checkIsConnected && previouslyAuthorized && !connectorWalletAddress) {
        let publicKey = await requestAccess();
        setConnectorWalletAddress(publicKey);
      }
    } catch (e) {
      console.log({ e });
    }
  };

  // Wallet Connection
  const onClick = async () => {
    setConnectionError(null);
    if (!connectorWalletAddress) {
      await kit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          try {
            // Set selected wallet,  network, and public key
            kit.setWallet(option.id);
            const publicKey = await kit.getPublicKey();

            await kit.setNetwork(WalletNetwork.TESTNET);
            setConnectorWalletAddress(publicKey);
          } catch (error) {
            console.log(error);
            setConnectionError(ERRORS.WALLET_CONNECTION_REJECTED);
          }
        },
      });
    }
  };

  const server = getServer(selectedNetwork);

  const getTokenBalance = async (
    id: string,
    txBuilder: TransactionBuilder,
    connection: any,
    destinationPubKey: string | null = null
  ) => {
    const contract = new Contract(id);
    if (!destinationPubKey) {
      return false;
    }
    const tx = txBuilder
      .addOperation(
        contract.call(
          "balance",
          ...[
            accountToScVal(destinationPubKey), // id
          ]
        )
      )
      .setTimeout(30)
      .build();

    const result = await simulateTx<string>(tx, connection);
    return ethers.formatUnits(result, pool[0].tokenDecimals);
  };

  const [isLoading, setIsLoading] = useState<Boolean | null>(null);
  const getUserBalance = async () => {
    setIsLoading(true);
    const txBuilderBalance = await getTxBuilder(
      connectorWalletAddress!,
      BASE_FEE,
      provider,
      selectedNetwork.networkPassphrase
    );
    try {
      const tokenBalanceUser: any = await getTokenBalance(pool[0].tokenAddress,
        txBuilderBalance,
        provider,
        connectorWalletAddress
      );
      setUserBalance(parseFloat(tokenBalanceUser).toFixed(2).toString());
      setIsLoading(false);
      return tokenBalanceUser;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (connectorWalletAddress) {
      setSelectedNetwork(selectedNetwork.networkPassphrase);
      getUserBalance();
    }
  }, [connectorWalletAddress,transactionsStatus]);

  useEffect(() => {
    retrievePublicKey()
  })
  return (
    <div className="w-full relative">
      <div className="">
        <Image
          src={GridLight}
          width={1152}
          height={380}
          alt="bondhive"
          className="absolute -top-20 right-10"
        />
        <Image
          src={LightRay}
          width={1152}
          height={800}
          alt="bondhive"
          className="absolute -top-52 right-[170px] flex justify-center -z-10"
        />
      </div>
      <div
        className={`${style.dapp_header} z-99  flex justify-between items-center md:px-12 px-4 max-sm:pt-7 md:h-[64px] md:border-b border-dappHeaderBorder md:bg-dappHeaderBg`}
      >
        <div className="flex items-center divide-x divide-paraDarkText gap-4">
          <Link href={"/"}>
          <div className="logo flex items-center ">
            <Image src={BondHiveLogo} width={40} height={40} alt="bondhive" />
            <p className="text-lg font-semibold text-white">Bondhive</p>
          </div>
          </Link>
          <ul className="flex justify-between gap-7 pl-3 max-lg:hidden">
          <Link href={"/app"}>
            <li className="flex items-center gap-2">
              <Image
                src={InvestIcon}
                width={20}
                height={20}
                alt="InvestIcon"
                className=""
              />
              <p className="text-[#937ED6]">Invest</p>
            </li>
            </Link>
            {/* <li className="flex items-center gap-2">
              <Image
                src={EarnIcon}
                width={20}
                height={20}
                alt="InvestIcon"
                className=""
              />
              <p className="text-paraDarkText">Markets</p>
            </li> */}
                         <Link href={"/app/markets"}>
            <li className="flex items-center gap-2 w-[200px]">
 
              <Image
                src={AnalyticsIcon}
                width={20}
                height={20}
                alt="InvestIcon"
                className=""
              />
              <p className="text-paraDarkText">Markets</p>
            </li>
            </Link>
          </ul>
        </div>
        <div className="flex justify-between items-center md:gap-5 gap-3">
          <button
            className={` button1 inline-flex items-center md:px-[16px] px-[9px] md:py-[5px] py-[4px] gap-1`}
          >
            <Image src={StellarLogo} width={19} height={32} alt="bondhive" className="bg-white rounded-full"/>
            <p className="max-sm:hidden">Stellar Testnet</p>
            <Image
              src={ChervonUp}
              width={15}
              height={15}
              alt="bondhive"
              className="max-sm:hidden"
            />
          </button>
          <button
            className={`button2 flex items-center px-[16px] max-sm:px-2 py-[5px] max-sm:py-1 max-sm:text-[11px]  h-[40px]`}
            onClick={onClick}
            // onClick={retrievePublicKey}
          >
            {connectorWalletAddress && isLoading && (
              <div className="border-r-2 pr-2 mr-2">
                <Loading />
              </div>
            )}
            {connectorWalletAddress && isLoading === false && (
              <p className="border-r-2 pr-2 mr-2 max-md:text-sm">
                {userBalance <= 0 ? "0.00" : formatFigures(userBalance, 2)}{" "}
                <span className="text-[12px]">USDC</span>
              </p>
            )}
            <p className="">
              {connectorWalletAddress
                ? `${connectorWalletAddress.substring(
                    0,
                    5
                  )}....${connectorWalletAddress.substring(
                    connectorWalletAddress.length - 5
                  )}`
                : "Connect Wallet"}
            </p>
            {/* <Image src={ArrowRight} width={13} height={13} alt="bondhive" /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DAppHeader;