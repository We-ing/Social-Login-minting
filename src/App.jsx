import Web3Auths from "../src/components/Web3Auths";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NftPage } from "../src/components/Nftpage";
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import Web3 from "web3";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import Modal from "react-modal";
import contractABI from "./MatzipABI.json";

const clientId =
  "BB1s5KTZ1_VhejYP4hX4thugMCW3ISbufpkuuogDZwYeV2trLmHGMsil49UIBzSq2D7-xm1Bq6zYr9vNlxjCsjI";
const contractAddress = "0x71985009d3Cc9A5F5E474C681Ad660720dCD26e0";

const chainConfig = {
  chainNamespace: "eip155",
  chainId: "0xaa36a7",
  rpcTarget: process.env.REACT_APP_API,
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider: privateKeyProvider,
});

const etherscan = "https://sepolia.etherscan.io/address/";

function App() {
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userAddress, setUserAddress] = useState();
  const [isSendingETH, setIsSendingETH] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 지갑이 1개 이상 보유한 tokenId 배열로 받아오기
  const [ownedTokenIds, setOwnedTokenIds] = useState([]);
  // {ownedTokenIds[0].png}
  // "https://testnets.opensea.io/" + "userAddress"
  useEffect(() => {
    const checkOwnedTokens = async () => {
      if (!userAddress || !provider) return;

      const web3 = new Web3(provider);
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      let ownedIds = [];

      for (let tokenId = 1; tokenId <= 6; tokenId++) {
        try {
          const balance = await contract.methods
            .balanceOf(userAddress, tokenId)
            .call();
          if (parseInt(balance) > 0) {
            ownedIds.push(tokenId);
          }
        } catch (error) {
          console.error(
            `Error fetching balance for token ID ${tokenId}:`,
            error
          );
        }
        setOwnedTokenIds(ownedIds);
      }
    };
    checkOwnedTokens();
  }, [userAddress, provider]);

  // 첫 로딩 시 web3auth 연결
  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        if (!web3auth.connected) {
          const web3authProvider = await web3auth.connect();
          setProvider(web3authProvider);
          await getAccounts(web3authProvider);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  // web3auth 소셜 로그인
  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  // 사용자 지갑 주소 확인
  const getAccounts = async (web3Provider) => {
    if (!web3Provider) {
      console.error("Provider is not initialized yet.");
      return;
    }
    const web3 = new Web3(web3Provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      setUserAddress(accounts[0]);
    } else {
      console.error("No accounts found.");
    }
  };

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/1"
          element={
            <Web3Auths
              web3auth={web3auth}
              provider={provider}
              setProvider={setProvider}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              userAddress={userAddress}
              setUserAddress={setUserAddress}
              isSendingETH={isSendingETH}
              setIsSendingETH={setIsSendingETH}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
        <Route
          path="/2"
          element={
            <Web3Auths
              web3auth={web3auth}
              provider={provider}
              setProvider={setProvider}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              userAddress={userAddress}
              setUserAddress={setUserAddress}
              isSendingETH={isSendingETH}
              setIsSendingETH={setIsSendingETH}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
        <Route
          path="/3"
          element={
            <Web3Auths
              web3auth={web3auth}
              provider={provider}
              setProvider={setProvider}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              userAddress={userAddress}
              setUserAddress={setUserAddress}
              isSendingETH={isSendingETH}
              setIsSendingETH={setIsSendingETH}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
        <Route
          path="/4"
          element={
            <Web3Auths
              web3auth={web3auth}
              provider={provider}
              setProvider={setProvider}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              userAddress={userAddress}
              setUserAddress={setUserAddress}
              isSendingETH={isSendingETH}
              setIsSendingETH={setIsSendingETH}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
        <Route
          path="/5"
          element={
            <Web3Auths
              web3auth={web3auth}
              provider={provider}
              setProvider={setProvider}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              userAddress={userAddress}
              setUserAddress={setUserAddress}
              isSendingETH={isSendingETH}
              setIsSendingETH={setIsSendingETH}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
        <Route
          path="/6"
          element={
            <Web3Auths
              web3auth={web3auth}
              provider={provider}
              setProvider={setProvider}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              userAddress={userAddress}
              setUserAddress={setUserAddress}
              isSendingETH={isSendingETH}
              setIsSendingETH={setIsSendingETH}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
        <Route path="/nft" element={<NftPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
