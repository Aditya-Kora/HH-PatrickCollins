import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js"
import { abi, contractAddress } from "./constant.js"
const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fund")
const balanceButton = document.getElementById("BalanceButton")
const withdrawutton = document.getElementById("withdrawButton")
connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        console.log("Connected")
        document.getElementById("connectButton").innerHTML = "Connected"
    } else {
        document.getElementById("connectButton").innerHTML =
            "Please install metamask"
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`Funding with ${ethAmount}`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signers = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signers)
        try {
            const transactionResponse = await contract.fund()({
                value: ethers.utils.parseEther(ethAmount),
            })
            await listenForTranactionMine(transactionResponse, provider)
            console.log("done!")
        } catch (error) {
            console.log(error)
        }
    }
}

function listenForTranactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((reolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `Completed with ${transactionReceipt.confirmations} confirmations`,
            )
            resolve()
        })
    })
}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
    }
}
async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signers = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signers)
        try {
            const transactionResponse = await contract.withdraw()
            await listenForTranactionMine(transactionResponse, provider)
        } catch (error) {
            console.log(error)
        }
    }
}
