import React, { useState } from "react";
import styled from "styled-components";
import ApexChart from "./CommonPages/admin/ApexChart"


export default function Dashboard() {

    return (
        <Root>
                   <h1>hlooooooo</h1>
                  <div className="char">
                    <ApexChart/>
                  </div>
        </Root>
    )

}

const Root = styled.section` `;