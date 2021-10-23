import React from "react";
import "../../styles/components/small/loading.css";
import Loader from "react-loader-spinner";
import * as COLORS from "../../styles/pallete";

export function LoadingCircle() {
  return (
    <div className='form-loader-container'>
      <div style={{ color: COLORS.C3 }}>
        <Loader
          type='Circles'
          color={COLORS.C3}
          height={"25vmin"}
          width={"25vmin"}
        />
        אנא המתן
      </div>
    </div>
  );
}

export function LoadingRings() {
  return (
    <div className='form-loader-container'>
      <div style={{ color: COLORS.C3 }}>
        <Loader
          type='Oval'
          color={COLORS.C3}
          height={"15vmin"}
          width={"15vmin"}
        />
        אנא המתן
      </div>
    </div>
  );
}
