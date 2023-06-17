import React from "react";
import Image from "next/image";
import photoNotFaund from "../../public/photoNotFaund.png";

export default function UserInfo() {
  return (
    <div className="w-screen h-fit ml-4 mb-4">
      <h2 className="text-center font-bold">Ваш личный кабинет</h2>
      <div className=" flex  ">
        <div className=" bg-slate-400 h-fit w-fit rounded-md shadow-xl">
          <Image
            src={photoNotFaund}
            alt=""
            width={155}
            height={75}
          />
        </div>
        <div className="ml-6">
          <form action="">
            <h3>Имя</h3>
            <input
              className="block w-64 py-2 px-4 border rounded-xl border-slate-400 mb-4 text-sm shadow-md"
              type="text"
              placeholder="Please enter your name"
            />
            <h3>Номер телефона</h3>
            <input
              className="block w-64 py-2 px-4 border rounded-xl border-slate-400 mb-4 text-sm shadow-md"
              type="text"
              placeholder="Please enter your number"
            />
            <h3>Ваш Email</h3>
            <input
              className="block w-64 py-2 px-4 border rounded-xl border-slate-400 shadow-md text-sm"
              type="text"
              placeholder="Please enter your mail address"
            />
            <button className=" mt-4 rounded-lg py-2 px-4 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
