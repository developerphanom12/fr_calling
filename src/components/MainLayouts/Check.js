import React, { useState } from "react";
import Layout from "./Layout";
import VerifyOtp from "./VerifyOtp";

export default function Check() {
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleOtpVerification = (verified) => {
    setIsOtpVerified(verified);
  };

  return (
    <>
      <Layout isOtpVerified={isOtpVerified}>
        <VerifyOtp onVerification={handleOtpVerification} />
      </Layout>
    </>
  );
}
