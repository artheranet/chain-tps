import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Wallet } from "@ethersproject/wallet";

export const deploy = async (deployer: Wallet | SignerWithAddress) => {
    console.log(`Deploying SimpleToken contract...`);
    const SimpleToken = await ethers.getContractFactory("SimpleToken", deployer);
    const token = await SimpleToken.deploy("SimpleToken", "STK");
    let tx = await token.deployed();
    console.log(`SimpleToken deployed to ${token.address} by ${deployer.address}`);
    await token.deployTransaction.wait();
    return token;
}
