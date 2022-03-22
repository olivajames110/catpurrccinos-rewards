import React from "react";
import { useState } from "react";
import { db } from "./firebase-config";
import { useSelector, useDispatch } from "react-redux";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { useCallback } from "react";
import { async } from "@firebase/util";
import { setUser } from "./actions/userActions";
import { login } from "./actions/loginActions";
import { checkInValid, checkInNotValid } from "./actions/checkInActions";
import { toTimestamp } from "./shared/helperFunctions";

export const useFirebase = (number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState({});

  //Database
  const [collectionName, setCollectionName] = useState("phoneNumbers");
  const colRef = collection(db, collectionName);

  //Redux
  const isLoggedIn = useSelector((state) => state.isLogged);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //Functions
  const getAllNumbers = () => {
    console.log("all phone numbers", colRef);
    getDocs(colRef).then((snapshot) => {
      console.log("snapshot", snapshot);
      let numbers = [];
      snapshot.docs.forEach((doc) => {
        numbers.push({ ...doc.data() });
      });
      console.log("numbers", numbers);
    });
  };

  const getNumber = useCallback(async (number) => {
    setIsLoading(true);
    onSnapshot(colRef, async () => {
      try {
        const docRef = doc(db, collectionName, number);
        const docSnap = await getDoc(docRef);
        const date = new Date().toLocaleString() + "";
        if (docSnap.exists()) {
          const docSnapData = docSnap.data();
          console.log("User Exists:", docSnapData);
          let userVisits = docSnapData.visits;

          dispatch(
            setUser({
              id: 0,
              number: docSnapData.number,
              points: docSnapData.points,
              redemptions: docSnapData.redemptions,
              visits: userVisits,
            })
          );

          if (userVisits.length === 0) {
            dispatch(checkInValid());
          } else {
            let previousVisit = userVisits[docSnapData.visits.length - 1];
            let yesterdayTimestamp = toTimestamp(previousVisit);
            let checkInIsValid = enoughTimeIsValid(yesterdayTimestamp);
            if (checkInIsValid) {
              console.log("True:", checkInIsValid);
              dispatch(checkInValid());
            } else {
              console.log("Not Enough Time", checkInIsValid);
              dispatch(checkInNotValid());
            }
          }

          dispatch(login());
        } else {
          const user = {
            id: "_id",
            number: number,
            points: 0,
            redemptions: [],
            visits: [],
          };
          setDoc(doc(colRef, number), user);
          console.log("New User Created");
        }
        setIsLoading(false);
      } catch (error) {
        console.log("getNumber error", error);
      }
    });
  });

  // Check In User, Give +5
  const handleUserCheckin = async (points) => {
    setIsLoading(true);
    console.log("checking In");
    const date = new Date().toLocaleString() + "";

    const docRef = doc(db, collectionName, user.number);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docSnapData = docSnap.data();

      // let userVisits = docSnapData.visits;
      // if (userVisits.length === 0) {
      //   let newVisits = [...docSnapData.visits, date];
      //   updateDoc(docRef, { points: points, visits: newVisits }).then(
      //     console.log("First Checkin completed")
      //   );
      //   setIsLoading(false);
      //   return;
      // }
      let newVisits = [...docSnapData.visits, date];
      let newPointTotal = docSnapData.points + points;

      updateDoc(docRef, { points: newPointTotal, visits: newVisits }).then(
        console.log("updated")
      );
      setIsLoading(false);
    }
  };

  // Update data
  const handleItemRedemption = async (itemName, itemPointValue) => {
    console.log("your data has been updated");
    const docRef = doc(db, collectionName, user.number);
    const docSnap = await getDoc(docRef);
    const date = new Date().toLocaleString() + "";
    if (docSnap.exists()) {
      const docSnapData = docSnap.data();
      let redemptionItem = `${date} | ${itemName} for ${itemPointValue} points`;
      let newRedemptions = [...docSnapData.redemptions, redemptionItem];
      let newPointTotal = docSnapData.points - itemPointValue;
      updateDoc(docRef, {
        points: newPointTotal,
        redemptions: newRedemptions,
      }).then(console.log("updated"));
    }
  };

  const enoughTimeIsValid = (yesterdayTime) => {
    const date = new Date().toLocaleString() + "";
    const waitTimePeriod = 86400;
    let today = toTimestamp(date);
    const timeBetween = today - yesterdayTime;
    let result = timeBetween >= waitTimePeriod ? true : false;
    return result;
  };

  // Create new user
  const createNewUser = (number) => {
    const user = {
      id: "_id",
      number: number,
      points: 0,
      redemptions: [],
      visits: [],
    };
    setDoc(doc(colRef, number), user);
  };

  return {
    isLoading,
    error,
    data,
    getNumber,
    getAllNumbers,
    handleItemRedemption,
    createNewUser,
    handleUserCheckin,
  };
};
