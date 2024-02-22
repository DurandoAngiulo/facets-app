import Icon from "@/components/Icon";

/* TODO: Add icon to corner (but entire container will be clickable)
Figure best way to handle Summary data
How do I test if it's receiving a Summary or Response?
And should photos even be in here or would it be separate, bc the photo is just a mask */

const BeveledContainer = ({ children, className }) => {
  return (
    <div className={`${className} w-full flex-col justify-start items-start inline-flex drop-shadow-lg mb-4`}>
      <div className="w-full justify-center inline-flex">
        <Icon className="w-full" iconName="bevelTop" />
      </div>

      {/* container for content */}
      <div className=" w-full  px-4 bg-white  border-white flex-col justify-center items-start gap-1.5 flex ">
        <div className="self-stretch ">
          {children}
          {/* <p style={{ color: "var(--text)" }}>
            <i>My dream destination is.. lorem ipsum dolor sit amet aaifd...</i>
          </p>
        </div>
        <div className="self-stretch">
          <p className="semibold" style={{ fontSize: "var(--font-size-p-md)", color: "var(--brand)" }}>
            A long walk on the beach with lots of lorem ipsum
          </p> */}
        </div>
      </div>

      <div className="w-full justify-center inline-flex">
        <Icon className="w-full" iconName="bevelBottom" />
      </div>
    </div>
  );
};

export default BeveledContainer;
