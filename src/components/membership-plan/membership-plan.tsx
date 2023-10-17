import React from "react";
import { IMembership } from "./membership-plan.props";

const Membership = ({ subscription }: IMembership) => {
  return (
    <div className="px-[10px]">
      <div className=" grid grid-columns-1  md:grid-cols-4 gap-x-[10px] px-[15px] mt-[15px] border border-white py-[10px] border-b-0">
        <div className="flex flex-col">
          <h3>Membership & Billing</h3>
          <button className="py-[5px] whitespace-nowrap mt-[10px] transition-all duration-300 transform ease-out hover:bg-white/90 active:scale-105 md:mt-[15px]   px-[15px] md:py-[10px] md:px-[20px] bg-white/70 text-black/60">
            Cancel Membership
          </button>
        </div>
        <div className="flex flex-col  col-span-3          mt-[10px] md:mt-[15px] pb-[10px] md:pb-[15px]">
          <div className="flex flex-col w-full justify-between md:flex-row border-b border-white">
            <div>
              <p>{subscription.customer.email}</p>

              <p> Password:*****</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="font-semibold md:font-bold cursor-pointer hover:underline text-blue-500 hover:text-blue-500/50">
                Change email
              </p>
              <p className="font-semibold md:font-bold cursor-pointer hover:underline text-blue-500 hover:text-blue-500/50">
                Change password
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-[10px] md:mt-[15px]">
            <h3>Your membership plan will end 08 Augst 20023</h3>
            <ul className="flex flex-col items-end">
              <li className="transition whitespace-nowrap cursor-pointer duration-300 ease-out  text-blue-500 hover:text-blue-500/50">
                Manage payment info
              </li>
              <li className="transition duration-300 whitespace-nowrap cursor-pointer ease-out  text-blue-500 hover:text-blue-500/50">
                Add backup payment method
              </li>
              <li className="transition duration-300 ease-out whitespace-nowrap cursor-pointer  text-blue-500 hover:text-blue-500/50">
                Billing detail
              </li>
              <li className="transition duration-300 ease-out whitespace-nowrap cursor-pointer  text-blue-500 hover:text-blue-500/50">
                Change billig day
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
