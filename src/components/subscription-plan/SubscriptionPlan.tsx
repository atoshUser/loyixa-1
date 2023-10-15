import { useAuth } from "@/hooks/useAuth";
import { Button } from "@mui/material";
import Image from "next/image";
import styles from "./sub.module.css";
import { SubCard } from "..";
import { ISubPlan } from "./sub-plan.props";
const SubscriptionPlan = ({ products }: ISubPlan) => {
  const { logOut } = useAuth();

  return (
    <div className="flex flex-col h-screen ">
      <header className="px-5 py-3 border-b-2  border-white/60">
        <div className="flex justify-between items-center ">
          <div className="w-[80px] h-[80px] relative">
            <Image src={"./site-logo.svg"} alt="site-logo-image" fill />
          </div>
          <Button onClick={logOut} variant="contained" color="primary">
            Log Out
          </Button>
        </div>
      </header>
      {/* Content */}
      <div className="flex flex-col text-center mt-[15px] md:mt-[20px]">
        <h3 className="text-2xl md:text-3xl px-[5px] md:px-[10px] lg:text-4xl font-bold mb-[8px] md:mb-[15px]">
          Flexible price for teams of any size.
        </h3>
        <h4 className="text-slate-500 text-[18px] md:text-[22px] font-semibold">
          Relaxing with watching your movies and Tv programs.
        </h4>
      </div>
      {/* Sub List */}
      <ul
        className={` ${styles.list} px-[30px]   py-[15px] md:px-[50px] lg:px-[180px]`}
      >
        {products
          .map((item) => <SubCard key={item.id} product={item} />)
          .reverse()}
      </ul>
    </div>
  );
};

export default SubscriptionPlan;
