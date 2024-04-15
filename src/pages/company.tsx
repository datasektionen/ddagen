import React from "react";
import {AboutCompany} from "@/components/Settings/AboutCompany";
import {GeneralInformation} from "@/components/Settings/GeneralInformation";
import {JobOffers} from "@/components/Settings/JobOffers2";
import {Contacts} from "@/components/Settings/Contacts";

export default function Company() {
  return(
    <div>
      <AboutCompany/>
      <GeneralInformation/>
      <JobOffers/>
      <Contacts/>
    </div>
  );
}
