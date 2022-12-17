import axios from "axios";
import React,{useEffect, useState} from "react";
import { CardSwiper } from "react-card-rotate-swiper";
import ChatContainer from "../components/ChatContainer";
import {useCookies} from "react-cookie";


function Dashboard() {

  const [user,setUser] = useState(null);
  const [cookie,setCookie,removeCookie] = useCookies(['user']);

  

  const userId = cookie.UserId

  const getUser = async ()=> {
    try{
      const response = await axios.get(`http://localhost:4000/user/${userId}`)
      setUser(response.data);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getUser();
  },[])

  const characters = [
    {
      name: "Richard Hendricks",
      url: "https://i.imgur.com/oPj4A8u.jpeg",
    },
    {
      name: "Erlich Bachman",
      url: "https://i.imgur.com/Q9WPlWA.jpeg",
    },
    {
      name: "Monica Hall",
      url: "https://i.imgur.com/oPj4A8u.jpeg",
    },
    {
      name: "Jared Dunn",
      url: "https://i.imgur.com/oPj4A8u.jpeg",
    },
    {
      name: "Dinesh Chugtai",
      url: "https://i.imgur.com/oPj4A8u.jpeg",
    },
  ];
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete,direction);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  // const handleSwipe = (d) => {
  //   console.log("You swiped: " + d);
  // };

  return (
    <>
    {user && <div className="dashboard">
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

          {characters.map((character) => (
            <CardSwiper
            className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
              // onSwipe={handleSwipe}
              preventSwipe={["up", "down"]}
              contents={
                <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                  className="card"
                >
                  <h3>{character.name}</h3>
                </div>
              }
            />
          ))}
            <div className="swipe-info" >
              {lastDirection ? <p>you swiped {lastDirection}</p> : <p/> }
            </div>

        </div>
      </div>
    </div>}
    </>
  );
}

export default Dashboard;
