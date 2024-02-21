"use client";

import MarketingLayout from "@/components/layouts/MarketingLayout";
import Icon from "@/components/Icon";
import UngatedNavbar from "@/components/UngatedNavbar/Index";

export default function Index() {
  return (
    <MarketingLayout>
      <div
        className=" bg-cover bg-center flex flex-col page padding justify-center"
        style={{ backgroundImage: "url('/dist/images/hands.jpg')" }}
      >
        <div className="mt-40 h-full">
          <Icon iconName="logoWord" className="w-full mx-auto px-20" />
          <div className=" flex flex-row mx-auto gap-2 justify-center ">
            <p className="align-middle leading-relaxed text-white " style={{ fontSize: "var(--font-size-p-lg)" }}>
              Dating with
            </p>
            <h3>
              <i className="leading-none align-bottom text-white">dimension</i>
            </h3>
          </div>
        </div>
        <div className="items-end flex mb-16">
          <UngatedNavbar />
        </div>
      </div>
    </MarketingLayout>
  );
}
