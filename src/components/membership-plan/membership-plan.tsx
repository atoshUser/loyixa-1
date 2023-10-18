import React from "react";
import { IMembership } from "./membership-plan.props";
import moment from "moment";

const Membership = ({ subscription }: IMembership) => {
  
  // get data
  const openPortalData = async () => {
    try {
      const payload = { user_id: subscription.customer.metadata.user_id };

      const response = await fetch("/api/subscription/manage", {
        method: "POST",
        headers: { "Content:Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      window.open(data);
    } catch (error) {
      const res = error as Error;

      console.log(res.message);
    }
  };
  return (
    <div className="px-[10px]">
      <div className=" grid grid-columns-1  md:grid-cols-4 gap-x-[10px] px-[15px] mt-[15px] border border-white py-[10px] border-b-0">
        <div className="flex flex-col">
          <h3>Membership & Billing</h3>
          <button
            onClick={openPortalData}
            className="py-[5px] whitespace-nowrap mt-[10px] transition-all duration-300 transform ease-out hover:bg-white/90 active:scale-105 md:mt-[15px]   px-[15px] md:py-[10px] md:px-[20px] bg-white/70 text-black/60"
          >
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
            <div className="flex flex-col ">
              <div className="flex items-center mb-[5px] gap-x-[5px]">
                <span className="bg-white/60  font-semibold text-black/70 py-[5px] px-[10px] border border-white rounded-md">
                  {subscription.default_payment_method.card.brand}
                </span>
                <span>
                  **** **** ****
                  {subscription.default_payment_method?.card.last4}
                </span>
              </div>
              <h3>
                Your membership plan will end
                {moment(subscription.current_period_end * 1000).format(
                  "D, MMM YYYY"
                )}
              </h3>
            </div>
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
