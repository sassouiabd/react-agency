import { useEffect } from "react";
import CustomDropDown from "../../components/custom-drop-down/custom-drop-down.component";
import CustomTable from "../../components/custom-table/custom-table.component";

import { useDispatch, useSelector } from "react-redux";
import { S_agencyCollection } from "./agency-collection.styles";

import { setIsSignIn_act } from "../../redux/user/user.actions";
import { Button } from "@material-ui/core";

import {
  selectAgenciesIsLoading,
  selectAgenciesLoaded,
} from "../../redux/agencies/agencies.selectors";
import {
  setAgenciesData_act,
  setAgenciesIsLoading_act,
  setAgenciesLoaded_act,
} from "../../redux/agencies/agencies.actions";
import Spinner from "../../components/spinner/spinner.component";
import { getServerAdress } from "../../utils";
import { selectToken, selectUserId } from "../../redux/user/user.selectors";

export default function AgencyCollection() {
  const S = S_agencyCollection();

  const dispatch = useDispatch();

  const agencyLoaded = useSelector(selectAgenciesLoaded);
  const agenciesIsLoading = useSelector(selectAgenciesIsLoading);
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  const logout = (e) => {
    e.preventDefault();
    dispatch(setIsSignIn_act(false));
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setAgenciesIsLoading_act(true));
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("userid", userId);

        const requestOptions = {
          headers: myHeaders,
          method: "GET",
          redirect: "follow",
        };
        const serverAdress = getServerAdress();
        const response = await fetch(
          `${serverAdress}/agency/retriveAll`,
          requestOptions
        );
        const { agencies } = await response.json();

        dispatch(setAgenciesData_act(agencies));
        dispatch(setAgenciesLoaded_act(true));
        dispatch(setAgenciesIsLoading_act(false));
      } catch (err) {
        console.log(err);
      }
    };
    if (agencyLoaded === false && agenciesIsLoading === false) {
      fetchData();
    }
  });

  const isLoading = useSelector(selectAgenciesIsLoading);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={S.root}>
      <Button
        id="cy_logout"
        variant="contained"
        color="secondary"
        onClick={logout}
      >
        Logout
      </Button>
      <CustomDropDown />
      <CustomTable />
    </div>
  );
}
