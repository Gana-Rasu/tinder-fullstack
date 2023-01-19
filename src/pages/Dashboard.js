import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardSwiper } from "react-card-rotate-swiper";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";

function Dashboard() {
  // removed the null inside the usestates
  const [user, setUser] = useState([]);
  const [genderedUsers, setGenderedUsers] = useState([]);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [gender, setGender] = useState("");
  const [lastDirection, setLastDirection] = useState();

  const userId = cookie.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/user/${userId}`);
      setUser(response.data);
      setGender(response.data.gender_interest);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/gendered-users/${user?.gender_interest}`
      );
      // params: {gender: user?.gender_interest}
      // })
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    if (user != null && user.length !== 0) {
      getGenderedUsers();
    }
  }, [gender]);

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:4000/addmatch", {
        userId,
        matchedUserId,
        // user userid and the swiped userid
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedUserId) => {
    // if swiped right update the userid into the card
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  // console.log(genderedUsers);
  // console.log("last user",user);

  // let matchedUserIds = [];
  // if (user.length !== 0) {
  //   matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId);
  // }
  // const filteredGenderedUsers = genderedUsers?.filter(
  //   (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
  // );

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {/* {characters.map((character) => (
          <TinderCard
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <div
              style={{ backgroundImage: "url(" + character.url + ")" }}
              className="card"
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))} */}

              {genderedUsers.map((genderedUser) => (
                <CardSwiper
                  className="swipe"
                  key={genderedUser.first_name}
                  onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                  // onSwipe={handleSwipe}
                  preventSwipe={["up", "down"]}
                  contents={
                    <div
                      style={{
                        backgroundImage: "url(" + genderedUser.url + ")",
                      }}
                      className="card"
                    >
                      <h3>{genderedUser.first_name}</h3>
                    </div>
                  }
                />
              ))}
              <div className="swipe-info">
                {lastDirection ? <p>you swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
