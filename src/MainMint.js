import { useState } from 'react';
import { ethers, BigNumber} from 'ethers';
import { Box, Button, Flex, Input, Text} from "@chakra-ui/react"
import roboPunksNft from './RoboPunksNFT.json';

const roboPunksNFTAddress = "0x21adFcDDA1132A83A0395429e0DcCE273E96f44b";

const MainMint = ({ accounts, setAccounts }) =>{
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint(){
        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNft.abi,
                signer
            );
            try{
                const response = await contract.mint(mintAmount);
                console.log('response', response);
            }
            catch(err) {
                console.log("error", err)
            } 
        }
    }
    const handleDecrement = () =>{
        if (mintAmount <=1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () =>{
        if (mintAmount >=1) return;
        setMintAmount(mintAmount + 1);
    }

    return (
        <div>
            <h1>CactusPunks</h1>
            <p>It's 2078, Can the CactusPunks NFT save humans from destructive rampant speculation? Mint CactusPunks and Find Out!</p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement} >-</button>
                        <input type= "number" value = {mintAmount} />
                        <button onClick = {handleIncrement}>+</button>
                    </div>
                   <button onClick={handleMint}>Mint Now</button> 
                </div>
            ) : (
                <p>You must be connected to Mint</p>
            )}  
        </div>  
    );
};

export default MainMint;